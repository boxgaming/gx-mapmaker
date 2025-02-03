Import Gfx From "lib/graphics/2d.bas"
Import Dom From "lib/web/dom.bas"
Import FS  From "lib/io/fs.bas"
Import MNU From "menu.bas"
Import Console From "lib/web/console.bas"
Console.LogLevel Console.NONE
Title "GX Map Maker"

Const MAP = 1
Const TILES = 2
Type Rect
    x As Long
    y As Long
    width As Long
    height As Long
End Type

Dim Shared As Rect tileSel, tileSelBack, frameTileSel, tsCursor 
tileSel.x = 0
tileSel.y = 0
tileSel.width = 1
tileSel.height = 1
tsCursor.x = 0
tsCursor.y = 0
tsCursor.width = 1
tsCursor.height = 1
Dim Shared As Integer selectedLayer: selectedLayer = 1
Dim Shared As Integer mapSelMode, mapSelSizing, tileSelSizing, animationMode
Dim Shared As Integer mapLoaded, resizing, painting, deleting, scale, tscale: scale = 1: tscale = 1
Dim Shared As Object leftPanel, rightPanel, topPanel, statusBar, tileset, layerContents
Dim Shared As Object cboLayer, cboEditLayer, btnLayerAdd, lblMapSize, resizePanel
Dim Shared As Object lblTileId, chkTileAnimated, lstTileFrames, txtFPS, panelAnimate, tilePanelOffset: tilePanelOffset = 330
Dim Shared As Object btnAddFrame, btnRemoveFrame
Dim Shared As Long tilesetImage, tilesetSource, lastMouseZoom
Dim Shared As Object timg
Dim Shared As Object dlg, dlgNew, dlgRTS, dlgAbout, dlgMsg, txtTSImage, txtMapRows, txtMapColumns
ReDim Shared As Integer layerLocks(0)
Dim Shared As Object mnuSave, mnuMapZoomIn, mnuMapZoomOut, mnuMapResize, mnuTSReplace, mnuTSZoomIn, mnuTSZoomOut
Dim Shared As String mapFilename
tilesetImage = _NewImage(100, 100, 32)
tilesetSource = _CopyImage(tilesetImage)

Dim Shared As String imgLayerShow, imgLayerHide, imgLayerLock, imgLayerUnlock, imgLayerDelete
GXSceneCreate Dom.Container().clientWidth, Dom.Container().clientHeight

InitControls

GXSceneStart


css:
Data ".mm-dialog { padding: 2px; border: outset 2px; background-color: #efefef; color: #000 }"
Data ".mm-dialog, .mm-dialog table, .mm-dialog input, .mm-dialog button {"
Data "font-family: dosvga !important; font-size: 16px !important; text-align: left }"
Data ".mm-dialog input { padding: 3px }"
Data ".mm-dialog button { padding: 3px }"
Data ".mm-dialog .title { padding: 8px; background-color:#00007b; color: #fff; user-select: none }"

dlg_container:
Data "<div class='title'>"
Data "</div><div style='border: 1px solid #ccc; padding: 8px;'>"

dlg_new:
Data "<table>"
Data "<tr><td>Columns:</td><td><input id='new-columns' size='5' style='text-align:right'/></td></tr>"
Data "<tr><td>Rows:</td><td><input id='new-rows' size='5' style='text-align:right'/></td></tr>"
Data "<tr><td>Layers:</td><td><input id='new-layers' size='5' style='text-align:right'/></td></tr>"
Data "<tr><td>Tileset Image:</td><td><input id='new-tileset-image'/><button id='new-load-tileset-image' style='letter-spacing:-3px'>...</button>"
Data "<tr><td>Tileset Width:</td><td><input id='new-tileset-width' style='text-align:right'/></td></tr>"
Data "<tr><td>Tileset Height:</td><td><input id='new-tileset-height' style='text-align:right'/></td></tr>"
Data "<tr><td>Isometric?</td><td><input id='new-isometric' type='checkbox'/></td></tr>"
Data "</table><hr/>"
Data "<button id='new-create-map' style='font-family:dosvga; font-size: 16px; padding: 8px'>Create Map</button> "
Data "<button id='new-cancel' style='font-family:dosvga; font-size: 16px; padding: 8px'>Cancel</button>"
Data "</div>"

dlg_rts:
Data "<table>"
Data "<tr><td>Tileset Image:</td><td><input id='rts-tileset-image'/><button id='rts-load-tileset-image' style='letter-spacing:-3px'>...</button>"
Data "<tr><td>Tileset Width:</td><td><input id='rts-tileset-width' size='5' style='text-align:right'/></td></tr>"
Data "<tr><td>Tileset Height:</td><td><input id='rts-tileset-height' size='5' style='text-align:right'/></td></tr>"
Data "</table><hr/>"
Data "<button id='rts-replace-tileset' style='font-family:dosvga; font-size: 16px; padding: 8px'>Replace Tileset</button> "
Data "<button id='rts-cancel' style='font-family:dosvga; font-size: 16px; padding: 8px'>Cancel</button>"
Data "</div>"

dlg_about:
Data "<div style='min-width:250px'>GX Map Maker</div>"
Data "<div>Version: 0.8.0</div><br/>"
Data "<div><span style='font-family:courier new,sans-serif; font-size:18px'>&copy;</span> 2024 boxgaming</div><hr/>"
Data "<button id='about-ok' style='font-family:dosvga; font-size: 16px; padding: 8px'> OK </button>"
Data "</div>"

dlg_msg:
Data "<div class='title' id='msg-title'></div>"
Data "<div style='border: 1px solid #ccc; padding: 8px;'>"
Data "<div id='msg-body' style='max-width:500px'></div><hr/>"
Data "<button id='msg-ok' style='font-family:dosvga; font-size: 16px; padding: 8px'> OK </button>"
Data "</div>"


Sub GXOnGameEvent (e As GXEvent)
    Select Case e.event
        Case GXEVENT_UPDATE: OnUpdate
        Case GXEVENT_DRAWBG: Cls
        Case GXEVENT_DRAWSCREEN: OnDrawScreen
    End Select
End Sub

Sub OnUpdate (e As GXEvent)
    If Not mapLoaded Then Exit Sub
    
    If _Resize Then 
        ResizeControls e
    End If
    
    'If resizing Then Exit Sub
    
    If painting Then
        PaintTiles
    ElseIf deleting Then
        DeleteTiles
    End If
    
    If mapSelSizing And Not GXMapIsometric Then
        Dim r As Rect
        r = GetTilePosAt(_MouseX, _MouseY)
        tileSel.width = r.x - tileSel.x + 1
        tileSel.height = r.y - tileSel.y + 1
    End If
    
    If GXKeyDown(GXKEY_X) Or GXKeyDown(GXKEY_DELETE) Then
        deleting = GX_TRUE
    Else
        deleting = GX_FALSE
    End If
    
    If GXKeyDown(GXKEY_D) Then
        GXSceneMove (GXTilesetWidth * 1), 0
    ElseIf GXKeyDown(GXKEY_A) Then
        GXSceneMove -GXTilesetWidth, 0
    ElseIf GXKeyDown(GXKEY_S) Then
        GXSceneMove 0, (GXTilesetHeight * 1)
    ElseIf GXKeyDown(GXKEY_W) Then
        GXSceneMove 0, -GXTilesetHeight
    End If
    
    Dim mw As Integer: mw = _MouseWheel
    If GXKeyDown(GXKEY_LCTRL) Or GXKeydown(GXKEY_RCTRL) Then
        If mw < 0 Then
            OnMapZoomIn
        ElseIf mw > 0 Then
            OnMapZoomOut
        End If
    End If
End Sub

Sub OnDrawScreen
    If Not mapLoaded Then Exit Sub
    
    DrawMapCursor
    DrawTileset
    DrawMapBorder
End Sub

Sub DrawMapBorder
    ' draw a bounding rectangle around the border of the map
    Dim bheight As Long
    Dim bwidth As Long
    Dim rwidth As Long
    Dim rheight As Long
    If GXMapIsometric Then
        bheight = (GXMapRows - 1) * (GXTilesetWidth / 4)
        bwidth = GXMapColumns * GXTilesetWidth - (GXTilesetWidth / 2)
        rheight = (txtMapRows.value - 1) * (GXTilesetWidth / 4)
        rwidth = txtMapColumns.value * GXTilesetWidth - (GXTilesetWidth / 2)
    Else
        bheight = GXMapRows * GXTilesetHeight
        bwidth = GXMapColumns * GXTilesetWidth
        rheight = txtMapRows.value * GXTilesetHeight
        rwidth = txtMapColumns.value * GXTilesetWidth
    End If

    Line (-GXSceneX - 1, -GXSceneY - 1)-(bwidth - GXSceneX, bheight - GXSceneY), _RGB(100, 100, 100), B
    If resizing Then
        Line (-GXSceneX - 1, -GXSceneY - 1)-(rwidth - GXSceneX, rheight - GXSceneY), _RGB(255, 255, 100), B
    End If
End Sub

Sub InitMenu (parent As Object)
    Dim As Object main, menu
    main = MNU.CreateMenu(parent)

    menu = MNU.AddMenu(main, "File")
    MNU.AddMenuItem menu, "New", sub_OnNew
    MNU.AddSeparator menu
    MNU.AddMenuItem menu, "Open", sub_OnOpen
    mnuSave = MNU.AddMenuItem(menu, "Save", sub_OnSave)
    'Dom.Alert mnuSave.classList
    MNU.EnableMenuItem mnuSave, GX_FALSE
    'MNU.AddMenuItem menu, "Save As..."
    'MNU.AddSeparator menu
    'MNU.AddMenuItem menu, "Close"
    
    menu = MNU.AddMenu(main, "Map")
    mnuMapZoomIn = MNU.AddMenuItem(menu, "Zoom In", sub_OnMapZoomIn)
    MNU.EnableMenuItem mnuMapZoomIn, GX_FALSE
    mnuMapZoomOut = MNU.AddMenuItem(menu, "Zoom Out", sub_OnMapZoomOut)
    MNU.EnableMenuItem mnuMapZoomOut, GX_FALSE
    MNU.AddSeparator menu
    mnuMapResize = MNU.AddMenuItem(menu, "Resize Map", sub_OnMapResize)
    MNU.EnableMenuItem mnuMapResize, GX_FALSE
    
    menu = MNU.AddMenu(main, "Tileset")
    mnuTSReplace = MNU.AddMenuItem(menu, "Replace Tileset Image", sub_OnTilesetReplace)
    MNU.EnableMenuItem mnuTSReplace, GX_FALSE
    MNU.AddSeparator menu
    mnuTSZoomIn = MNU.AddMenuItem(menu, "Zoom In", sub_OnTilesetZoomIn)
    MNU.EnableMenuItem mnuTSZoomIn, GX_FALSE
    mnuTSZoomOut = MNU.AddMenuItem(menu, "Zoom Out", sub_OnTilesetZoomOut)
    MNU.EnableMenuItem mnuTSZoomOut, GX_FALSE
    
    menu = MNU.AddMenu(main, "Help")
    MNU.AddMenuItem menu, "View", sub_OnHelpView
    MNU.AddSeparator menu
    MNU.AddMenuItem menu, "About...", sub_OnHelpAbout
End Sub

Sub InitControls
    Dim footer As Object
    footer = Dom.Get("gx-footer")
    footer.style.height = "0px"
    
    Dim As Object imgLayerAdd, imgLayerInsert
    imgLayerShow = DataURL("img/layer-show.svg")
    imgLayerHide = DataURL("img/layer-hide.svg")
    imgLayerLock = DataURL("img/layer-lock.svg")
    imgLayerUnlock = DataURL("img/layer-unlock.svg")
    imgLayerAdd = DataURL("img/layer-add.svg")
    imgLayerInsert = DataURL("img/layer-insert.svg")
    imgLayerDelete = DataURL("img/layer-delete.svg")
    
    Dim main, container
    main = Dom.GetImage(0)
    main.style.border = "1px solid #999"
    main.style.backgroundColor = "#000"
    Dom.Event main, "mousedown", sub_OnMapMouseDown
    Dom.Event main, "mouseup", sub_OnMapMouseUp

    container = Dom.Container()
    container.style.overflow = "hidden"
    container.style.textAlign = "left"
    container.style.backgroundColor = "#efefef"
    container.style.border = "0"
    container.style.fontFamily = "dosvga"
    container.style.fontSize = "16px"
    container.style.color = "#333"
    
    topPanel = Dom.Create("div")
    InitMenu topPanel
    
    leftPanel = Dom.Create("div")
    leftPanel.style.color = "#333"
    leftPanel.style.position = "absolute"
    Dom.Add main, leftPanel
  
    rightPanel = Dom.Create("div", topPanel)
    rightPanel.style.position = "absolute"
    rightPanel.style.right = "0px"
    rightPanel.style.top = "25px"
    
    Dim As Object layerPanel, lpl, lpc, btnAdd, layerTable, thead, tbody, imgAdd, imgInsert
    layerPanel = Dom.Create("div", rightPanel)
    layerPanel.style.userSelect = "none"
    lpl = Dom.Create("div", layerPanel, "Layers")
    lpl.style.padding = "5px"
    btnAdd = Dom.Create("button", lpl)
    btnAdd.style.float = "right"
    btnAdd.style.padding = "1px 3px"
    btnAdd.style.marginRight = "2px"
    btnAdd.style.marginTop = "-3px"
    btnAdd.title = "Add New Layer"
    imgAdd = Dom.Create("img", btnAdd)
    imgAdd.src = imgLayerAdd
    imgAdd.style.width = "12px"
    imgAdd.style.height = "12px"    
    btnInsert = Dom.Create("button", lpl)
    btnInsert.style.float = "right"
    btnInsert.style.padding = "0px 2px"
    btnInsert.style.marginRight = "2px"
    btnInsert.style.marginTop = "-3px"
    btnInsert.title = "Insert Layer Before Selected"
    imgInsert = Dom.Create("img", btnInsert)
    imgInsert.src = imgLayerInsert
    imgInsert.style.width = "14px"
    imgInsert.style.height = "14px"
    lpc = Dom.Create("div", layerPanel)
    lpc.style.border = "inset 1px"
    lpc.style.backgroundColor = "#fff"
    lpc.style.height = "200px"
    lpc.style.marginRight = "5px"
    lpc.style.overflowY = "auto"
    layerTable = Dom.Create("table", lpc)
    layerTable.style.width = "100%"
    layerTable.style.borderCollapse = "collapse"
    layerTable.style.fontSize = "13px"
    layerTable.style.fontFamily = "sans-serif"
    layerContents = Dom.Create("tbody", layerTable)
    Dom.Event btnAdd, "click", sub_OnAddLayer
    Dom.Event btnInsert, "click", sub_OnInsertLayer
    
    Dim As Object hsplit1
    hsplit1 = Dom.Create("div", rightPanel)
    hsplit1.style.height = "5px"
    
    Dim As Object tsLabel
    tsLabel = Dom.Create("div", rightPanel, "Tileset")
    tileset = Dom.Create("div", rightPanel)
    tileset.style.border = "1px solid #999"
    tileset.style.overflow = "auto"
    tileset.style.backgroundColor = "#000"
    'Dim As Object timg
    timg = Dom.GetImage(tilesetImage)
    Dom.Add timg, tileset
    Dom.Event tileset, "mousedown", sub_OnTilesetSelStart
    Dom.Event tileset, "mouseup", sub_OnTilesetSelEnd
    Dom.Event tileset, "mousemove", sub_OnTilesetMouseMove
    
    ' Selected Tile Properties
    Dim As Object tlabel, d, d2
    tlabel = Dom.Create("div", rightPanel, "Tile: ")
    tlabel.style.marginTop = "5px"
    lblTileId = Dom.Create("span", tlabel, "")
    d = Dom.Create("div", tlabel)
    Dom.Create "span", d, "Animate"
    d.style.float = "right"
    d.style.paddingRight = "5px"
    d.style.whiteSpace = "nowrap"
    chkTileAnimated = Dom.Create("input", d)
    chkTileAnimated.type = "checkbox"
    chkTileAnimated.style.verticalAlign = "bottom"
    chkTileAnimated.style.marginLeft = "5px"
    chkTileAnimated.disabled = true
    Dom.Event chkTileAnimated, "change", sub_OnChkAnimate
    d = Dom.Create("div", rightPanel)
    d.style.display = "none"
    d.style.gridTemplateColumns = "auto 125px"
    d.style.height = "115px"
    d.style.border = "1px inset #fff"
    d.style.marginTop = "5px"
    d.style.marginRight = "5px"
    panelAnimate = d
    lstTileFrames = Dom.Create("select", d)
    lstTileFrames.size = 4
    lstTileFrames.style.margin = "10px"
    lstTileFrames.style.fontFamily = "dosvga"
    lstTileFrames.style.fontSize = "16px"
    Dom.Event lstTileFrames, "change", sub_OnTileFrameChange
    d = Dom.Create("div", d)
    d.style.padding = "10px"
    d.style.paddingLeft = "0"
    d2 = Dom.Create("div", d)
    d2.style.marginBottom = "5px"
    d2.style.textAlign = "right"
    Dom.Create "span", d2, "FPS: "
    txtFPS = Dom.Create("input", d2)
    txtFPS.type = "number"
    txtFPS.min = 1
    txtFPS.style.width = "40px"
    txtFPS.style.fontFamily = "dosvga"
    txtFPS.style.fontSize = "16px"
    Dom.Event txtFPS, "change", sub_OnTileFPSChange
    btnAddFrame = Dom.Create("button", d, "Add Frame")
    btnAddFrame.style.marginBottom = "5px"
    btnAddFrame.style.width = "115px"
    btnAddFrame.style.paddingTop = "4px"
    btnAddFrame.style.paddingBottom = "4px"
    btnAddFrame.style.fontFamily = "dosvga"
    btnAddFrame.style.fontSize = "16px"
    Dom.Event btnAddFrame, "click", sub_OnAddFrame
    btnRemoveFrame = Dom.Create("button", d, "Remove Frame")
    btnRemoveFrame.style.width = "115px"
    btnRemoveFrame.style.paddingTop = "4px"
    btnRemoveFrame.style.paddingBottom = "4px"
    btnRemoveFrame.style.fontFamily = "dosvga"
    btnRemoveFrame.style.fontSize = "16px"
    btnRemoveFrame.disabled = true
    Dom.Event btnRemoveFrame, "click", sub_OnRemoveFrame
    
    
    ' Resize Map Panel
    resizePanel = Dom.Create("div", topPanel)
    resizePanel.style.position = "absolute"
    resizePanel.style.right = "0px"
    resizePanel.style.top = "25px"
    resizePanel.style.padding = "10px"
    Dim As Object mlbl, mbtn, mp
    mlbl = Dom.Create("div", resizePanel, "Resize Map")
    mlbl.style.paddingBottom = "15px"
    mp = Dom.Create("div", resizePanel)
    mp.style.paddingBottom = "5px"
    mlbl = Dom.Create("span", mp, "Columns:")
    mlbl.style.display = "inline-block"
    mlbl.style.width = "70px"
    mlbl.style.color = "#666"
    txtMapColumns = Dom.Create("input", mp)
    txtMapColumns.style.width = "50px"
    txtMapColumns.style.fontFamily = "dosvga"
    txtMapColumns.style.fontSize = "16px"
    mp = Dom.Create("div", resizePanel)
    mp.style.paddingBottom = "5px"
    mlbl = Dom.Create("span", mp, "Rows:")
    mlbl.style.display = "inline-block"
    mlbl.style.width = "70px"
    mlbl.style.color = "#666"
    txtMapRows = Dom.Create("input", mp)
    txtMapRows.style.width = "50px"
    txtMapRows.style.fontFamily = "dosvga"
    txtMapRows.style.fontSize = "16px"
    Dom.Create "hr", resizePanel
    mp = Dom.Create("div", resizePanel)
    btn = Dom.Create("button", mp, "Resize Map")
    btn.style.fontFamily = "dosvga"
    btn.style.fontSize = "16px"
    btn.style.marginRight = "5px"
    Dom.Event btn, "click", sub_OnCommitMapResize
    btn = Dom.Create("button", mp, "Cancel")
    btn.style.fontFamily = "dosvga"
    btn.style.fontSize = "16px"
    Dom.Event btn, "click", sub_OnCancelResize
    resizePanel.style.display = "none"
    Dom.Event txtMapRows, "input", sub_MapResizeRefresh
    Dom.Event txtMapColumns, "input", sub_MapResizeRefresh
   
    Dim statusPanel
    statusPanel = Dom.Create("div")
    statusPanel.style.border = "1px solid #ccc"
    statusPanel.style.backgroundColor = "#ddd"
    statusPanel.style.position = "absolute"
    statusPanel.style.bottom = "0px"
    statusPanel.style.right = "0px"
    statusPanel.style.left = "0px"
    statusBar = Dom.Create("div", statusPanel, "")
    statusBar.style.height = "16px"
    statusBar.style.padding = "4px"
    statusBar.style.color = "#333"
    
    Dom.Event window, "resize", sub_ResizeControls
    ResizeControls
    
    ' Initialize dialogs
    Dim As String s
    Dim As Object style
    
    Restore css
    style = Dom.Create("style", document.head)
    style.innerText = ReadDataLines(6)

    dlgNew = Dom.Create("dialog")
    dlgNew.className = "mm-dialog"
    Restore dlg_container: s = ReadDataLines(1) + "Create New Map" + ReadDataLines(1)
    Restore dlg_new: s = s + ReadDataLines(11)
    dlgNew.innerHTML = s
    Dom.Event "new-load-tileset-image", "click", sub_OnUploadTileset
    Dom.Event "new-create-map", "click", sub_OnCreateMap
    Dom.Event "new-cancel", "click", sub_OnClose
    dlgNew.columns = Dom.Get("new-columns")
    dlgNew.rows = Dom.Get("new-rows")
    dlgNew.layers = Dom.Get("new-layers")
    dlgNew.tsImage =  Dom.Get("new-tileset-image")
    dlgNew.tsWidth = Dom.Get("new-tileset-width")
    dlgNew.tsHeight = Dom.Get("new-tileset-height")
    dlgNew.iso = Dom.Get("new-isometric")


    dlgRTS = Dom.Create("dialog")
    dlgRTS.className = "mm-dialog"
    Restore dlg_container: s = ReadDataLines(1) + "Replace Tileset Image" + ReadDataLines(1)
    Restore dlg_rts: s = s + ReadDataLines(8)
    dlgRTS.innerHTML = s
    dlgRTS.tsImage = Dom.Get("rts-tileset-image")
    dlgRTS.tsWidth = Dom.Get("rts-tileset-width")
    dlgRTS.tsHeight = Dom.Get("rts-tileset-height")
    Dom.Event "rts-load-tileset-image", "click", sub_OnUploadTileset
    Dom.Event "rts-replace-tileset", "click", sub_OnReplaceTileset
    Dom.Event "rts-cancel", "click", sub_OnClose

    dlgAbout = Dom.Create("dialog")
    dlgAbout.className = "mm-dialog"
    Restore dlg_container: s = ReadDataLines(1) + "About" + ReadDataLines(1)
    Restore dlg_about: s = s + ReadDataLines(5)
    dlgAbout.innerHTML = s
    Dom.Event "about-ok", "click", sub_OnClose
    
    dlgMsg = Dom.Create("dialog")
    dlgMsg.className = "mm-dialog"
    Restore dlg_msg
    dlgMsg.innerHTML = ReadDataLines(5)
    Dom.Event "msg-ok", "click", sub_OnMsgClose
End Sub

Sub RefreshLayers
    layerContents.innerHTML = "";
    Dim l As Integer
    For l = 1 To GXMapLayers
        Dim tr As Object
        tr = AddLayerRow(layerContents, l)
        If l = selectedLayer Then
            tr.style.border = "1px solid #666"
            tr.style.backgroundColor = "#efefef"
        End If
    Next l
End Sub

Sub SelectLayer(event As Object)
    Dim element As Object
    element = event.target
    If element.nodeName <> "TD" Then element = element.parentNode
    selectedLayer = element.gxLayer
    ' replace this with less brute force
    RefreshLayers
End Sub

Function AddLayerRow(tbody As Object, layer As Integer, title As String)
    Dim As String imgShow, imgLock
    Dim tr As Object
    tr = Dom.Create("tr", tbody)
    
    If GXMapLayerVisible(layer) Then imgShow = imgLayerShow Else imgShow = imgLayerHide
    If layerLocks(layer) Then imgLock = imgLayerLock Else imgLock = imgLayerUnlock
    AddLayerCell layer, tr, layer, 8
    AddLayerCell layer, tr, "<" + "img id='layer-show-" + layer + "' src='" + imgShow + "' width='16' title='Toggle Layer Visibility' style='cursor:pointer'/>", 16
    AddLayerCell layer, tr, "<" + "img id='layer-lock-" + layer + "' src='" + imgLock + "' width='11' title='Lock the Layer for Edit' style='cursor:pointer'/>", 14
    Dim label As String
    If title = undefined Then
        label = "<i>Layer " + Str$(layer) + "</i>"
    Else
        label = title
    End If
    AddLayerCell layer, tr, label
    AddLayerCell layer, tr, "<" + "img id='layer-delete-" + layer + "' src='" + imgLayerDelete + "' width='16' title='Delete Layer' style='cursor:pointer'/>", 16
    AddLayerRow = tr

    Dim img As Object
    img = Dom.Get("layer-show-" + layer)
    img.gxLayer = layer
    Dom.Event img, "click", sub_OnClickLayerShow

    img = Dom.Get("layer-lock-" + layer)
    img.gxLayer = layer
    Dom.Event img, "click", sub_OnClickLayerLock

    img = Dom.Get("layer-delete-" + layer)
    img.gxLayer = layer
    Dom.Event img, "click", sub_OnClickLayerDelete
End Function

Sub AddLayerCell(layer, tr, html, width)
    Dim td As Object
    td = Dom.Create("td", tr, html)
    If width <> undefined Then 
        td.style.width = width + "px"
        td.style.textAlign = "center"
    End If
    td.style.border = "1px inset #efefef"
    td.style.padding = "2px 4px"
    td.style.cursor = "default"

    td.gxLayer = layer
    Dom.Event td, "click", sub_SelectLayer
End Sub

Sub ResizeControls (e)
    ' Position the tileset control
    Dim twidth As Integer
    twidth = 500 'GXTilesetColumns * GXTilesetWidth * tscale
    Dim maxwidth As Integer
    Dim minwidth As Integer
    minwidth = 300
    maxwidth = Dom.Container().clientWidth / 3
    If maxwidth < minwidth Then
        maxwidth = minwidth
    End If
    If twidth < minwidth Then
        twidth = minwidth
    ElseIf twidth >= maxwidth Then
        twidth = maxwidth
    End If
    
    tileset.style.width = twidth + "px"
    'tileset.style.height = (Dom.Container().clientHeight - 303) + "px"
    'tileset.style.height = (Dom.Container().clientHeight - 330) + "px"
    'tileset.style.height = (Dom.Container().clientHeight - 450) + "px"
    tileset.style.height = (Dom.Container().clientHeight - tilePanelOffset) + "px"
    
    resizePanel.style.width = (twidth - 16) + "px"
    
    GXSceneResize Dom.Container().clientWidth - twidth - 8, Dom.Container().clientHeight - 54
End Sub

Function GetTilePosAt (x As Integer, y As Integer)
    Dim r As Rect
    If Not GXMapIsometric Then
        r.x = Fix((x + GXSceneX) / GXTilesetWidth)
        r.y = Fix((y + GXSceneY) / GXTilesetHeight)
    Else
        x = x + GXSceneX' / scale ' - Control(id).Left
        y = y + GXSceneY'/ scale ' - Control(id).Top
        
        Dim tileWidthHalf As Integer
        tileWidthHalf = GXTilesetWidth / 2
        Dim tileHeightHalf As Integer
        tileHeightHalf = GXTilesetWidth / 2
        Dim sx As Long
        sx = x / tileWidthHalf
        
        Dim offset As Integer
        If sx Mod 2 = 1 Then
            offset = tileWidthHalf
        Else
            offset = 0
        End If

        r.y = _Round((2 * y) / tileHeightHalf) '+ _Round((2 * GXSceneY) / tileHeightHalf)
        r.x = _Round((x - offset) / GXTilesetWidth) '+ _Round(GXSceneX / GXTilesetWidth)
    End If
    
    GetTilePosAt = r
End Function

Function GetControlAtMousePos
    Dim mx As Long, my As Long
    mx = _MouseX
    my = _MouseY

    Dim As Object mapRect, tileRect
    mapRect = GetBoundingRect(Dom.GetImage(0))
    tileRect = GetBoundingRect(Dom.GetImage(tilesetImage))

    GetControlAtMousePos = 0

    If mx > mapRect.Left And mx < mapRect.Left + mapRect.Width And _
       my > mapRect.Top And my < mapRect.Top + mapRect.Height Then
        GetControlAtMousePos = MAP

    ElseIf mx > tileRect.Left And mx < tileRect.Left + tileRect.Width And _
          my > tileRect.Top And my < tileRect.Top + tileRect.Height Then
        GetControlAtMousePos = TILES
    End If
End Function

Sub LoadMap (filename As String)
    GXMapLoad filename
    UpdateMap "_gxtmp/tileset.png"
End Sub

Sub UpdateMap (tilesetPath)
    tilesetSource = _LoadImage(tilesetPath)
    ZoomTileset
    
    Dim map As Long
    map = Dom.GetImage(0)
    map.style.cursor = "none"
    
    mapLoaded = GX_TRUE
    RefreshLayers
End Sub

Function GetBoundingRect (element As Object)
    Dim As Object rect, prect
    $If Javascript Then
        rect = event.target.getBoundingClientRect();
        prect = container.getBoundingClientRect();
    $End If
    
    rect.Width = rect.right - rect.left
    rect.Height = rect.bottom = rect.top
    rect.Left = rect.left - prect.left
    rect.Top = rect.top - prect.top
    
    GetBoundingRect = rect
End Function

Function DataURL(filepath As String)
    $If Javascript Then
        var vfs = GX.vfs();
        var file = vfs.getNode(filepath, vfs.rootDirectory());
        if (file) {
            DataURL = vfs.getDataURL(file);
        }
        else {
            DataURL = filepath;
        }
    $End If
End Function

Sub PaintTiles
    If layerLocks(selectedLayer) Then
        Exit Sub
    End If
    If GXMapIsometric Then
        PutTileIso
        Exit Sub
    End If

    Dim As Long mx, my, tx, ty, tile
    mx = Fix((GXMouseX + GXSceneX) / GXTilesetWidth)
    my = Fix((GXMouseY + GXSceneY) / GXTilesetHeight)
    
    For ty = 0 To tileSel.height - 1
        For tx = 0 To tileSel.width - 1
            If mapSelMode Then
                tile = GXMapTile(tileSel.x + tx, tileSel.y + ty, selectedLayer)
                Console.Log tx + "," + ty + "-" + selectedLayer + ":" + tile
            Else
                tile = (tileSel.y + ty) * GXTilesetColumns + tileSel.x + tx + 1
            End If
            GXMapTile mx + tx, my + ty, selectedLayer, tile
        Next tx
    Next ty
End Sub

Sub PutTileIso ()
    Dim x As Integer, y As Integer, sx As Integer
    Dim tx As Integer, ty As Integer
    Dim tile As Integer

    Dim tpos As GXPosition
    tpos = GetTilePosAt(_MouseX, _MouseY)
    SetStatus "(" + STR$(tpos.x) + "," + STR$(tpos.y) + ")"
    sx = tpos.x
    y = tpos.y

    For ty = 0 To tileSel.height - 1
        x = sx
        For tx = 0 To tileSel.width - 1
            If mapSelMode Then
                tile = GXMapTile(tileSel.x + tx, tileSel.y + ty, selectedLayer)
            Else
                tile = (tileSel.y + ty) * GXTilesetColumns + tileSel.x + tx + 1
            End If
            GXMapTile x, y, selectedLayer, tile
            x = x + 1
        Next tx
        y = y + 1
    Next ty
End Sub

Sub DeleteTiles
    If layerLocks(selectedLayer) Then
        Exit Sub
    End If
    If Not GXMapIsometric Then
        Dim As Long mx, my, tx, ty, tile
        mx = Fix((GXMouseX + GXSceneX) / GXTilesetWidth)
        my = Fix((GXMouseY + GXSceneY) / GXTilesetHeight)
    
        For ty = 0 To tileSel.height - 1
            For tx = 0 To tileSel.width - 1
                tile = (tileSel.y + ty) * GXTilesetColumns + tileSel.x + tx + 1
                GXMapTile mx + tx, my + ty, selectedLayer, 0
            Next tx
        Next ty
    Else
        Dim tpos As Rect
        tpos = GetTilePosAt(_MouseX, _MouseY)
        GXMapTile tpos.x, tpos.y, selectedLayer, 0        
    End If
End Sub

Sub DrawMapCursor
    Dim As Integer tx, ty, cx, cy
    Dim As _Unsigned Long ccolor
    Dim As Integer cstyle, cstyle2

    If Not GXMapIsometric Then
        If mapSelSizing Then
            tx = tileSel.x
            ty = tileSel.y
            cx = tx * GXTilesetWidth - GXSceneX
            cy = ty * GXTilesetHeight - GXSceneY
        Else
            tx = Fix(GXMouseX / GXTilesetWidth)
            ty = Fix(GXMouseY / GXTilesetHeight)
            cx = tx * GXTilesetWidth
            cy = ty * GXTilesetHeight
        End If
        w = tileSel.width * GXTilesetWidth' * scale
        h = tileSel.height * GXTilesetHeight' * scale
    
        Gfx.LineWidth 2 / scale
        Gfx.InvertRect cx, cy, w, h
    Else
        Dim cstyle As Integer
        cstyle = &B1010101010101010
        Dim tpos As Rect
        tpos = GetTilePosAt(_MouseX, _MouseY)
        'Line (_MouseX, _MouseY)-Step(10, 10), 15, B
        Dim columnOffset As Long
        If tpos.y Mod 2 = 1 Then
            columnOffset = 0
        Else
            columnOffset = GXTilesetWidth / 2
        End If

        Dim rowOffset As Long
        rowOffset = (tpos.y + 1) * _Round(GXTilesetHeight - GXTilesetWidth / 4)

        Dim As Long tx, ty, topY, midY, midX, rightX, bottomY, halfWidth
        tx = _Round(tpos.x * GXTilesetWidth - columnOffset - GXSceneX)
        ty = _Round(tpos.y * GXTilesetHeight - rowOffset - GXSceneY)
        
        topY = ty + (GXTilesetHeight - GXTilesetWidth / 2)
        midY = ty + (GXTilesetHeight - GXTilesetWidth / 4)
        midX = tx + GXTilesetWidth / 2
        rightX = tx + GXTilesetWidth * 1
        bottomY = ty + GXTilesetHeight * 1
        halfWidth = GXTilesetWidth / 2

        ccolor = _RGB(200, 200, 200)
        
        Line (tx, midY - halfWidth)-(tx, midY), ccolor, , cstyle
        Line (rightX, midY - halfWidth)-(rightX, midY), ccolor, , cstyle
        Line (midX, topY - halfWidth)-(midX, bottomY), ccolor, , cstyle
        
        Line (tx, midY - halfWidth)-(midX, topY - halfWidth), ccolor, , cstyle
        Line (midX, topY - halfWidth)-(rightX, midY - halfWidth), ccolor, , cstyle
        Line (rightX, midY - halfWidth)-(midX, bottomY - halfWidth), ccolor, , cstyle
        Line (midX, bottomY - halfWidth)-(tx, midY - halfWidth), ccolor, , cstyle
                    
        Line (tx, midY)-(midX, topY), ccolor
        Line (midX, topY)-(rightX, midY), ccolor
        Line (rightX, midY)-(midX, bottomY), ccolor
        Line (midX, bottomY)-(tx, midY), ccolor    
    End If
    If Not mapSelSizing Then 
        DrawMapSelection
    End If

End Sub

Sub DrawMapSelection
    If Not mapSelMode Then 
        Exit Sub
    End If
    
    If Not GXMapIsometric Then
        Dim As Integer x, y, w, h
        x = tileSel.x * GXTilesetWidth - GXSceneX
        y = tileSel.y * GXTilesetHeight - GXSceneY
        w = tileSel.width * GXTilesetWidth
        h = tileSel.height * GXTilesetHeight
    
        Line (x, y)-Step(w, h), 14, B
    Else
        Dim cstyle As Integer
        cstyle = &B1010101010101010
        'Line (_MouseX, _MouseY)-Step(10, 10), 15, B
        Dim columnOffset As Long
        If tileSel.y Mod 2 = 1 Then
            columnOffset = 0
        Else
            columnOffset = GXTilesetWidth / 2
        End If

        Dim rowOffset As Long
        rowOffset = (tileSel.y + 1) * _Round(GXTilesetHeight - GXTilesetWidth / 4)

        Dim As Long tx, ty, topY, midY, midX, rightX, bottomY, halfWidth
        tx = _Round(tileSel.x * GXTilesetWidth - columnOffset - GXSceneX)
        ty = _Round(tileSel.y * GXTilesetHeight - rowOffset - GXSceneY)
        
        topY = ty + (GXTilesetHeight - GXTilesetWidth / 2)
        midY = ty + (GXTilesetHeight - GXTilesetWidth / 4)
        midX = tx + GXTilesetWidth / 2
        rightX = tx + GXTilesetWidth * 1
        bottomY = ty + GXTilesetHeight * 1
        halfWidth = GXTilesetWidth / 2

        ccolor = 14 '_RGB(244, 200, 200)
        
        Line (tx, midY - halfWidth)-(tx, midY), ccolor, , cstyle
        Line (rightX, midY - halfWidth)-(rightX, midY), ccolor, , cstyle
        Line (midX, topY - halfWidth)-(midX, bottomY), ccolor, , cstyle
        
        Line (tx, midY - halfWidth)-(midX, topY - halfWidth), ccolor, , cstyle
        Line (midX, topY - halfWidth)-(rightX, midY - halfWidth), ccolor, , cstyle
        Line (rightX, midY - halfWidth)-(midX, bottomY - halfWidth), ccolor, , cstyle
        Line (midX, bottomY - halfWidth)-(tx, midY - halfWidth), ccolor, , cstyle
                    
        Line (tx, midY)-(midX, topY), ccolor
        Line (midX, topY)-(rightX, midY), ccolor
        Line (rightX, midY)-(midX, bottomY), ccolor
        Line (midX, bottomY)-(tx, midY), ccolor    
    End If

End Sub

Sub DrawTileset
    _Source tilesetImage
    _Dest tilesetImage
    Cls
    _PutImage , tilesetSource

    ' Draw the tileset selection
    If Not mapSelMode Then
        Dim As Integer x, y, w, h
        x = tileSel.x * GXTilesetWidth * tscale
        y = tileSel.y * GXTilesetHeight * tscale
        w = tileSel.width * GXTilesetWidth * tscale
        h = tileSel.height * GXTilesetHeight * tscale
        Line (x, y)-Step(w, h), 14, B
        
        If lstTileFrames.selectedIndex > 0 Then
            Dim As Integer tile, dx, dy
            tile = lstTileFrames.value
            dy = Fix(tile / GXTilesetColumns)
            dx = tile % GXTilesetColumns - 1
            x = dx * GXTilesetWidth * tscale
            y = dy * GXTilesetHeight * tscale
            SetStatus tile
            Line (x, y)-Step(w, h), 11, B
        End If
    End If
    
    ' Draw the tileset cursor
    x = tsCursor.x * GXTilesetWidth * tscale
    y = tsCursor.y * GXTilesetHeight * tscale
    w = tsCursor.width * GXTilesetWidth * tscale
    h = tsCursor.height * GXTilesetHeight * tscale
    Gfx.InvertRect x, y, w, h
    _Source 0
    _Dest 0
End Sub

Sub SetStatus (text As String)
    statusBar.innerHTML = text
End Sub

Sub OnAddLayer
    GXMapLayerAdd
    RefreshLayers
End Sub

Sub OnInsertLayer
    GXMapLayerInsert selectedLayer
    RefreshLayers
End Sub

Sub OnClickLayerShow(event As Object)
    Dim layer As Integer
    layer = event.target.gxLayer
    GXMapLayerVisible layer, Not GXMapLayerVisible(layer)
End Sub

Sub OnClickLayerLock(event As Object)
    Dim layer As Integer
    layer = event.target.gxLayer
    layerLocks(layer) = Not layerLocks(layer)
    RefreshLayers
End Sub

Sub OnClickLayerDelete(event As Object)
    Dim layer As Integer
    layer = event.target.gxLayer
    If Dom.Confirm("This will permanently delete the layer. Continue?") Then
        GXMapLayerRemove layer
        RefreshLayers
    End If
End Sub

Sub OnTilesetReplace
    dlgRTS.tsWidth.value = GXTilesetWidth
    dlgRTS.tsHeight.value = GXTilesetHeight
    dlgRTS.tsImage.value = ""
    ShowDialog dlgRTS
End Sub

Sub OnTilesetZoomIn
    tscale = tscale + 1
    MNU.EnableMenuItem mnuTSZoomOut, GX_TRUE
    ZoomTileset
End Sub

Sub OnTilesetZoomOut
    If tscale > 1 Then
        tscale = tscale - 1
    End If
    If tscale = 1 Then
        MNU.EnableMenuItem mnuTSZoomOut, GX_FALSE
    End If
    ZoomTileset
End Sub

Sub ZoomTileset
    Dim As Integer w, h
    w = Width(tilesetSource) * tscale
    h = Height(tilesetSource) * tscale
    Dim As Object oldImg, newImg
    oldImg = Dom.GetImage(tilesetImage)
    tilesetImage = NewImage(w, h)
    newImg = Dom.GetImage(tilesetImage)
    Dom.Remove oldImg
    Dom.Add newImg, tileset
End Sub

Sub OnTilesetSelStart(event As Object)
    mapSelMode = GX_FALSE
    tileSel.x = tsCursor.x
    tileSel.y = tsCursor.y
    tileSel.width = 1
    tileSel.height = 1
    tileSel.sizing = GX_TRUE
End Sub

Sub OnTilesetSelEnd(event As Object)
    tileSel.sizing = GX_FALSE

    If animationMode Then
        Dim As Integer tile, firstTileId
        firstTileId = lblTileId.innerHTML
        tile = (tileSel.y) * GXTilesetColumns + tileSel.x + 1
        GXTilesetAnimationAdd firstTileId, tile
        tileSel.x = tileSelBack.x 
        tileSel.y = tileSelBack.y
    End If

    UpdateSelectedTile
End Sub

Sub OnTileFPSChange
    GXTilesetAnimationSpeed lblTileId.innerHTML, txtFPS.value
End Sub

Sub OnTileFrameChange
    If lstTileFrames.selectedIndex > 0 Then
        btnRemoveFrame.disabled = false
    Else
        btnRemoveFrame.disabled = true
    End If
End Sub

Sub UpdateSelectedTile
    If tileSel.width > 1 Or tileSel.height > 1 Or mapSelMode Then
        lblTileId.innerHTML = ""
        chkTileAnimated.checked = false
        chkTileAnimated.disabled = true
        tilePanelOffset = 330
    Else
        Dim As Integer tile
        tile = (tileSel.y) * GXTilesetColumns + tileSel.x + 1
        lblTileId.innerHTML = tile
        Dim As Integer frames(0)
        Dim As Integer fcount
        fcount = GXTilesetAnimationFrames(tile, frames)
        chkTileAnimated.disabled = false
        If fcount > 0 Then
            chkTileAnimated.checked = true
            panelAnimate.style.display = "grid"
            tilePanelOffset = 450
            
            lstTileFrames.innerHTML = ""
            Dim i As Integer
            Dim s As String
            For i = 1 To fcount
                Dim opt As Object
                opt = Dom.Create("option")
                opt.value = frames(i)
                
                opt.innerHTML = Right$("   " + i, 3) + " : " + frames(i)
                'opt.innerHTML = GXSTR_Replace(s, " ", "&nbsp;")
                opt.style.paddingLeft = "5px"
                opt.style.paddingTop = "2px"
                opt.style.whiteSpace = "pre"
                Dom.Add opt, lstTileFrames
            Next i
        Else
            chkTileAnimated.checked = false
            panelAnimate.style.display = "none"
            tilePanelOffset = 330
        End If
        txtFPS.value = GXTilesetAnimationSpeed(tile)
        If animationMode Then
            animationMode = GX_FALSE
            lstTileFrames.selectedIndex = fcount - 1
            btnRemoveFrame.disabled = false
        Else
            btnRemoveFrame.disabled = true
        End If
        ResizeControls
    End If
End Sub

Sub OnTilesetMouseMove(event As Object)
    If Not mapLoaded Then 
        Exit Sub
    End If
    tsCursor.x = Fix(event.offsetX / (GXTilesetWidth * tscale))
    tsCursor.y = Fix(event.offsetY / (GXTilesetHeight * tscale))
    If tileSel.sizing Then
        If Not GXMapIsometric Then
            tileSel.width = tsCursor.x - tileSel.x + 1
            tileSel.height = tsCursor.y - tileSel.y + 1
            If tileSel.width < 1 Then 
                tileSel.width = 1
            End If
            If tileSel.height < 1 Then 
                tileSel.height = 1
            End If
        End If
    End If
End Sub

Sub OnMapMouseDown(event As Object)
    If GXKeyDown(GXKEY_LSHIFT) Or GXKeyDown(GXKEY_RSHIFT) Then
        mapSelMode = GX_TRUE
        mapSelSizing = GX_TRUE
        Dim r As Rect
        r = GetTilePosAt(_MouseX, _MouseY)
        Console.Log "s: " + r.x + ", " + r.y
        tileSel.x = r.x
        tileSel.y = r.y
        tileSel.width = 1
        tileSel.height = 1
    Else
        painting = GX_TRUE
    End If
End Sub

Sub OnMapMouseUp(event As Object)
    If mapSelSizing Then
        mapSelSizing = GX_FALSE
        r = GetTilePosAt(_MouseX, _MouseY)
        Console.Log "e: " + r.x + ", " + r.y
        tileSel.width = r.x - tileSel.x + 1
        tileSel.height = r.y - tileSel.y + 1
        UpdateSelectedTile
    Else
       painting = GX_FALSE
    End If
End Sub

Sub OnNew
    ' set initial default values
    dlgNew.columns.value = 100
    dlgNew.rows.value = 100
    dlgNew.layers.value = 1
    dlgNew.tsImage.value = ""
    dlgNew.tsWidth.value = 16
    dlgNew.tsHeight.value = 16
    dlgNew.iso.checked = false

    ShowDialog dlgNew
End Sub

Sub OnCreateMap
    Dim iso As Integer
    If dlgNew.iso.checked Then
        iso = GX_TRUE
    End If
    
    Console.Log "Columns: " + dlgNew.columns.value
    Console.Log "Rows:    " + dlgNew.rows.value
    Console.Log "Layers:  " + dlgNew.layers.value
    Console.Log "Image:   " + dlgNew.tsImage.value
    Console.Log "Width:   " + dlgNew.tsWidth.value
    Console.Log "Height:  " + dlgNew.tsHeight.value
    Console.Log "ISO:     " + iso

    'Dom.Alert Val(dlgNew.layers.value)

    If Val(dlgNew.columns.value) < 1 Then
        MsgBox "Please specify a value greater than 0.", "Invalid Entry for Columns"
        Exit Sub
    ElseIf Val(dlgNew.rows.value) < 1 Then
        MsgBox "Please specify a value greater than 0.", "Invalid Entry for Rows"
        Exit Sub
    ElseIf Val(dlgNew.layers.value) < 1 Then
        MsgBox "Please specify a value greater than 0.", "Invalid Entry for Layers"
        Exit Sub
    ElseIf dlgNew.tsImage.value = "" Then
        MsgBox "Please select a Tileset Image.", "Tileset Image is Required"
        Exit Sub
    ElseIf Val(dlgNew.tsWidth.value) < 1 Then
        MsgBox "Please specify a value greater than 0.", "Invalid Entry for Tileset Width"
        Exit Sub
    ElseIf Val(dlgNew.tsHeight.value) < 1 Then
        MsgBox "Please specify a value greater than 0.", "Invalid Entry for Tileset Height"
        Exit Sub
    End If

    GXTilesetCreate "/_gxtmp/" + dlgNew.tsImage.value, dlgNew.tsWidth.value, dlgNew.tsHeight.value
    GXMapCreate dlgNew.columns.value, dlgNew.rows.value, dlgNew.layers.value
    If dlgNew.iso.checked Then
        GXMapIsometric GX_TRUE
    Else
        GXMapIsometric GX_FALSE
    End If
    UpdateMap "_gxtmp/" + dlgNew.tsImage.value

    MkDir "map"
    mapFilename = "map/newmap.gxm"
    mapLoaded = GX_TRUE

    ResetMap
    OnClose
End Sub


Sub OnReplaceTileset
    Console.Log "Image:  " + dlgRTS.tsImage.value
    Console.Log "Width:  " + dlgRTS.tsWidth.value
    Console.Log "Height: " + dlgRTS.tsHeight.value

    If dlgRTS.tsImage.value = "" Then
        MsgBox "Please select a Tileset Image.", "Tileset Image is Required"
        Exit Sub
    ElseIf Val(dlgRTS.tsWidth.value) < 1 Then
        MsgBox "Please specify a value greater than 0.", "Invalid Entry for Tileset Width"
        Exit Sub
    ElseIf Val(dlgRTS.tsHeight.value) < 1 Then
        MsgBox "Please specify a value greater than 0.", "Invalid Entry for Tileset Height"
        Exit Sub
    End If

    GXTilesetCreate "/_gxtmp/" + dlgRTS.tsImage.value, dlgRTS.tsWidth.value, dlgRTS.tsHeight.value
    
    tilesetSource = LoadImage("/_gxtmp/" + dlgRTS.tsImage.value)
    ZoomTileset
    
    OnClose
End Sub

Sub OnOpen
    MkDir "map"
    FS.UploadFile "map", ".gxm", sub_OnOpenComplete
End Sub

Sub OnOpenComplete (fullpath As String)
    mapFilename = fullpath
    LoadMap fullpath
    SetStatus "Map loaded."
    Kill fullpath
    ResetMap
End Sub

Sub ResetMap
    GXScenePos 0, 0
    MNU.EnableMenuItem mnuSave, GX_TRUE
    MNU.EnableMenuItem mnuMapZoomIn, GX_TRUE
    If scale > 1 Then
        MNU.EnableMenuItem mnuMapZoomOut, GX_TRUE
    End If
    MNU.EnableMenuItem mnuMapResize, GX_TRUE
    MNU.EnableMenuItem mnuTSReplace, GX_TRUE
    MNU.EnableMenuItem mnuTSZoomIn, GX_TRUE
    If tscale > 1 Then 
        MNU.EnableMenuItem mnuTSZoomOut, GX_TRUE
    End If
    ReDim layerLocks(GXMapLayers) As Integer
End Sub

Sub OnSave
    GXMapSave mapFilename
    FS.DownloadFile mapFilename    
    SetStatus "Map saved."
End Sub


Sub OnHelpView
    $If Javascript Then
        window.open("https://github.com/boxgaming/gx/wiki/Map-Maker", "_blank");
    $End If
End Sub

Sub OnHelpAbout
    ShowDialog dlgAbout
End Sub

Sub OnMapZoomIn
    scale = scale + 1
    MNU.EnableMenuItem mnuMapZoomOut, GX_TRUE
    GXSceneScale scale
    ResizeControls
End Sub

Sub OnMapZoomOut
    If scale > 1 Then
        scale = scale - 1
    End If
    If scale = 1 Then
        MNU.EnableMenuItem mnuMapZoomOut, GX_FALSE
    End If
    GXSceneScale scale
    ResizeControls
End Sub


Sub OnMapResize
    txtMapColumns.value = GXMapColumns
    txtMapRows.value = GXMapRows
    resizing = GX_TRUE
    rightPanel.style.display = "none"
    resizePanel.style.display = "block"
    $If Javascript Then
        QB.end();
    $End If
    GXSceneStop
    GXSceneDraw
End Sub

Sub OnCommitMapResize
    GXMapResize txtMapColumns.value, txtMapRows.value
    OnCancelResize
End Sub
    
Sub MapResizeRefresh
    GXSceneDraw
End Sub

Sub OnCancelResize
    resizing = GX_FALSE
    rightPanel.style.display = "block"
    resizePanel.style.display = "none"
    GXSceneStart
End Sub

Sub OnChkAnimate
    Dim As Integer firstTileId
    firstTileId = lblTileId.innerHTML

    If chkTileAnimated.checked Then
        GXTilesetAnimationCreate firstTileId, 5
    Else
        GXTilesetAnimationRemove firstTileId
    End If
    UpdateSelectedTile
End Sub

Sub OnAddFrame
    animationMode = GX_TRUE
    tileSelBack.x = tileSel.x
    tileSelBack.y = tileSel.y
End Sub

Sub OnRemoveFrame
    Dim As Integer firstTileId, tileId
$If Javascript Then
    firstTileId = lstTileFrames.options[0].value;

    GX.tilesetAnimationRemove(firstTileId);
    GX.tilesetAnimationCreate(firstTileId, txtFPS.value);
    
    for (var i=1; i < lstTileFrames.options.length; i++) {
        var tileId = lstTileFrames.options[i].value;
        if (i != lstTileFrames.selectedIndex) {
            GX.tilesetAnimationAdd(firstTileId, tileId);
        }
    }
$End If

    UpdateSelectedTile
End Sub

' Dialog Methods
' ------------------------------------------------------------------
Function ReadDataLines (lines As Integer)
    Dim As String text, s
    Dim As Integer i
    For i = 1 To lines
        Read s
        text = text + s
    Next i
    ReadDataLines = text
End Function

Sub OnUploadTileset (event As Object)
    Mkdir "_gxtmp"
    txtTSImage = event.target.previousSibling
    FS.UploadFile "_gxtmp", ".png", sub_OnTilesetUploadComplete 
End Sub

Sub OnTilesetUploadComplete(filename As String)
    txtTSImage.value = Mid$(filename, 9)
End Sub

Sub MsgBox (msgText As String, msgTitle As String)
    Dim As Object mtext, mtitle
    mtext = Dom.Get("msg-body")
    mtext.innerHTML = msgText
    If msgTitle Then
        mtitle = Dom.Get("msg-title")
        mtitle.innerHTML = msgTitle
    'Else
    '    mtitle.innerHTML = "&nbsp;"
    End If
$If Javascript Then
    dlgMsg.showModal();
$End If
End Sub

Sub ShowDialog (currDlg As Object)
    dlg = currDlg
$If Javascript Then
    dlg.showModal();
    QB.end();
$End If
    GXSceneStop
End Sub

Sub OnClose
$If Javascript Then
    dlg.close();
$End If
    GXSceneStart
End Sub

Sub OnMsgClose
$If Javascript Then
    dlgMsg.close();
$End If
End Sub
