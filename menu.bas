Export CreateMenu, AddMenu, AddMenuItem, EnableMenuItem, AddSeparator
ImportCss "menu.css"

Dom.Event document, "click", sub_OnDocClick

Dim As Object container
container = Dom.Container()


Sub OnMenu (event As Object)
    Dim As Object rect, menu, pos, prect
    $If Javascript Then
        rect = event.target.getBoundingClientRect();
        prect = container.getBoundingClientRect();
    $End If
    menu = event.target
    If menu.parentMenu.rootMenu Then
        menu.menu.style.left = (rect.left - prect.left) + "px"
        menu.menu.style.top = (rect.bottom - prect.top - 1) + "px"
    Else
        menu.menu.style.left = (rect.right - prect.left + 2) + "px"
        menu.menu.style.top = (rect.top - prect.top) + "px"
    End If
    HideMenus
    Dim m As Object
    m = menu.parentMenu
    While m And m.rootMenu = undefined
        m.style.display = "block"
        m = m.parentMenu
    Wend
    menu.menu.style.display = "block"
End Sub

Sub OnMenuItem (event As Object)
    If event.target.callback Then
		If event.target.disabled <> true Then
        $If Javascript Then
            event.target.callback(event);
        $End If
		End If
    End If
    HideMenus
End Sub

Sub OnDocClick (event As Object)
    Dim isDropMenu
    $If Javascript Then
        isDropMenu = event.target.classList.contains("menu-item") ? -1 : 0;
    $End If
    If Not isDropMenu Then
        HideMenus
    End If
End Sub


Function CreateMenu (parentElement As Object, insertBefore As Object)
    If parentElement = undefined And insertBefore = undefined Then
        insertBefore = Dom.GetImage(0)
    End If
    Dim menu As Object
    menu = Dom.Create("div", parentElement, , , insertBefore)
    menu.rootMenu = true
    AddClass menu, "menu"
    AddClass menu, "rootmenu"

    CreateMenu = menu
End Function

Function AddMenu (parentMenu As Object, mname As String)
    Dim menu As Object
    If parentMenu.menu Then
        parentMenu = parentMenu.menu
    End If
    menu = Dom.Create("div", parentMenu, mname)
    AddClass menu, "menu-item"
    Dom.Event menu, "click", sub_OnMenu

    If parentMenu.rootMenu = undefined Then
        AddClass menu, "submenu"
    End If
    
    menu.menu = Dom.Create("div")
    AddClass menu.menu, "menu"
    AddClass menu.menu, "dropmenu"

    menu.parentMenu = parentMenu
    
    AddMenu = menu
End Function

Sub AddMenuItem (menu As Object, mname As String, mevent As Object)
    Dim As Object mitem
    mitem = AddMenuItem(menu, mname, mevent)
End Sub

Function AddMenuItem (menu As Object, mname As String, mevent As Object)
    Dim As Object mitem
    mitem = Dom.Create("div", menu.menu, mname)
    AddClass mitem, "menu-item"
    If mevent Then
        mitem.callback = mevent
        Dom.Event mitem, "click", sub_OnMenuItem
    End If
    
    mitem.parentMenu = menu
    
    AddMenuItem = mitem
End Function

Sub EnableMenuItem (menu As Object, enabled As Integer)
	If enabled Then
		RemoveClass menu, "disabled"
		menu.disabled = 0
	Else
		AddClass menu, "disabled"
		menu.disabled = -1
	End If
End Sub

Sub AddSeparator (menu As Object)
    Dim As Object separator
    separator = Dom.Create("div", menu.menu)
    AddClass separator, "menu-separator"
End Sub

Sub HideMenus
    $If Javascript Then
        var menus = document.getElementsByClassName("dropmenu");
        for (var i=0; i < menus.length; i++) {
            menus[i].style.display = "none";
        }
    $End If
End Sub

Sub ImportCss (filename As String)
    Dim As String css, fline
    'Dim fileFound
    '$If Javascript Then
    '    var vfs = GX.vfs();
    '    fileFound = vfs.getNode(filename, vfs.rootDirectory());
    '$End If

    'If fileFound Then
    Open filename for Input As #1
    Line Input #1, fline
    While Not EOF(1)
        css = css + Chr(10) + fline
        Line Input #1, fline
    Wend
    Close #1
    'Else
    '    var res = Fetch(filename)
    '    css = res.text
    'End If
    
    AddCss css
End Sub

Sub AddCss (css As String)
    Dim As Object style
    style = Dom.Create("style", document.head)
    style.innerText = css
End Sub

Sub AddClass (element As Object, className As String)
    $If Javascript Then
        element.classList.add(className);
    $End If
End Sub

Sub RemoveClass (element As Object, className As String)
	$If Javascript Then
		element.classList.remove(className);
	$End If
End Sub
