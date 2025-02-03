async function __qbjs_run() {
async function _Gfx() {
/* static method variables: */ 

   const DEFAULT  =   "butt"; 
   const ROUND  =   "round"; 
   const SQUARE  =   "square"; 

async function sub_RotoZoom(centerX/*LONG*/,centerY/*LONG*/,img/*LONG*/,xScale/*SINGLE*/,yScale/*SINGLE*/,rotation/*SINGLE*/) {
if (QB.halted()) { return; }; centerX = Math.round(centerX); centerY = Math.round(centerY); img = Math.round(img); 
   var newImage = 0;  /* LONG */ 
   var imgWidth = 0;  /* SINGLE */ var imgHeight = 0;  /* SINGLE */ 
   imgWidth =  (QB.func__Width(  img));
   imgHeight =  (QB.func__Height(  img));
   var destImg = 0;  /* LONG */ 
   destImage =  QB.func__Dest();
   //-------- BEGIN JS native code block --------
        var origImg = QB.getImage(img);
        var cx = imgWidth / 2.0;
        var cy = imgHeight / 2.0;
        var destImg = QB.getImage(destImg);
        var ctx = destImg.getContext("2d");
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((Math.PI / 180) * rotation);
        ctx.scale(xScale, yScale);
        ctx.drawImage(origImg, -cx, -cy);
        ctx.restore();
//-------- END JS native code block --------
}
async function sub_SaveImage(imageId/*LONG*/,filepath/*STRING*/) {
if (QB.halted()) { return; }; imageId = Math.round(imageId); 
   //-------- BEGIN JS native code block --------
        var vfs = QB.vfs();
        var filename = vfs.getFileName(filepath);
        var ppath = vfs.getParentPath(filepath);
        var pnode = null;
        if (ppath == "") { pnode = QB.vfsCwd(); }
        else { pnode = vfs.getNode(ppath, QB.vfsCwd()); }
        if (!pnode) {
            throw Object.assign(new Error("Path not found: [" + ppath + "]"), { _stackDepth: 1 });
        }
        var img = QB.getImage(imageId);
        var f = vfs.createFile(filename, pnode);
        var complete = false;
        await img.toBlob(async function(b) {
            var ab = await b.arrayBuffer();
            vfs.writeData(f, ab);
            complete = true;
        });
        while (!complete) {
            await GX.sleep(10);
        }
//-------- END JS native code block --------
}
async function sub_FillCircle(x/*LONG*/,y/*LONG*/,radius/*LONG*/,clr/*_UNSIGNED LONG*/) {
if (QB.halted()) { return; }; x = Math.round(x); y = Math.round(y); radius = Math.round(radius); clr = Math.round(clr); 
   var destImg = 0;  /* LONG */ 
   destImg =  QB.func__Dest();
   if ( clr ==   undefined ) {
      clr =  QB.func__DefaultColor();
   }
   //-------- BEGIN JS native code block --------
        var c = QB.colorToRGB(clr);
        var ctx = QB.getImage(destImg).getContext("2d");
        ctx.fillStyle = c.rgba();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
//-------- END JS native code block --------
}
async function sub_Ellipse(x/*LONG*/,y/*LONG*/,radiusX/*LONG*/,radiusY/*LONG*/,rotation/*INTEGER*/,clr/*_UNSIGNED LONG*/) {
if (QB.halted()) { return; }; x = Math.round(x); y = Math.round(y); radiusX = Math.round(radiusX); radiusY = Math.round(radiusY); rotation = Math.round(rotation); clr = Math.round(clr); 
   await sub__Ellipse(  x,    y,    radiusX,    radiusY,    rotation,    clr,    false);
}
async function sub_FillEllipse(x/*LONG*/,y/*LONG*/,radiusX/*LONG*/,radiusY/*LONG*/,rotation/*INTEGER*/,clr/*_UNSIGNED LONG*/) {
if (QB.halted()) { return; }; x = Math.round(x); y = Math.round(y); radiusX = Math.round(radiusX); radiusY = Math.round(radiusY); rotation = Math.round(rotation); clr = Math.round(clr); 
   await sub__Ellipse(  x,    y,    radiusX,    radiusY,    rotation,    clr,    true);
}
async function sub__Ellipse(x/*LONG*/,y/*LONG*/,radiusX/*LONG*/,radiusY/*LONG*/,rotation/*INTEGER*/,clr/*_UNSIGNED LONG*/,fill/*SINGLE*/) {
if (QB.halted()) { return; }; x = Math.round(x); y = Math.round(y); radiusX = Math.round(radiusX); radiusY = Math.round(radiusY); rotation = Math.round(rotation); clr = Math.round(clr); 
   var destImg = 0;  /* LONG */ 
   destImg =  QB.func__Dest();
   if ( rotation ==   undefined ) {
      rotation =   0;
   }
   if ( clr ==   undefined ) {
      clr =  QB.func__DefaultColor();
   }
   //-------- BEGIN JS native code block --------
        var c = QB.colorToRGB(clr);
        var ctx = QB.getImage(destImg).getContext("2d");
        if (fill) { 
            ctx.fillStyle = c.rgba();
        } else {
            ctx.strokeStyle = c.rgba();
            ctx.lineWidth = QB.defaultLineWidth();
        }
        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, rotation * (Math.PI / 180), 0, 2 * Math.PI);
        if (fill) { 
            ctx.fill();
        } else { 
            ctx.stroke();
        }
//-------- END JS native code block --------
}
async function sub_Triangle(x1/*LONG*/,y1/*LONG*/,x2/*LONG*/,y2/*LONG*/,x3/*LONG*/,y3/*LONG*/,clr/*_UNSIGNED LONG*/) {
if (QB.halted()) { return; }; x1 = Math.round(x1); y1 = Math.round(y1); x2 = Math.round(x2); y2 = Math.round(y2); x3 = Math.round(x3); y3 = Math.round(y3); clr = Math.round(clr); 
   await sub__Triangle(  x1,    y1,    x2,    y2,    x3,    y3,    clr,    false);
}
async function sub_FillTriangle(x1/*LONG*/,y1/*LONG*/,x2/*LONG*/,y2/*LONG*/,x3/*LONG*/,y3/*LONG*/,clr/*_UNSIGNED LONG*/) {
if (QB.halted()) { return; }; x1 = Math.round(x1); y1 = Math.round(y1); x2 = Math.round(x2); y2 = Math.round(y2); x3 = Math.round(x3); y3 = Math.round(y3); clr = Math.round(clr); 
   await sub__Triangle(  x1,    y1,    x2,    y2,    x3,    y3,    clr,    true);
}
async function sub__Triangle(x1/*LONG*/,y1/*LONG*/,x2/*LONG*/,y2/*LONG*/,x3/*LONG*/,y3/*LONG*/,clr/*_UNSIGNED LONG*/,fill/*SINGLE*/) {
if (QB.halted()) { return; }; x1 = Math.round(x1); y1 = Math.round(y1); x2 = Math.round(x2); y2 = Math.round(y2); x3 = Math.round(x3); y3 = Math.round(y3); clr = Math.round(clr); 
   var destImg = 0;  /* LONG */ 
   destImg =  QB.func__Dest();
   if ( clr ==   undefined ) {
      clr =  QB.func__DefaultColor();
   }
   //-------- BEGIN JS native code block --------
        var c = QB.colorToRGB(clr);
        var ctx = QB.getImage(destImg).getContext("2d");
        if (fill) { 
            ctx.fillStyle = c.rgba();
        } else {
            ctx.strokeStyle = c.rgba();
            ctx.lineWidth = QB.defaultLineWidth();
        }
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x1, y1);
        if (fill) { 
            ctx.fill();
        } else { 
            ctx.stroke();
        }
//-------- END JS native code block --------
}
async function sub_RoundRect(x/*LONG*/,y/*LONG*/,w/*LONG*/,h/*LONG*/,radius/*INTEGER*/,clr/*_UNSIGNED LONG*/) {
if (QB.halted()) { return; }; x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h); radius = Math.round(radius); clr = Math.round(clr); 
   await sub__RoundRect(  x,    y,    w,    h,    radius,    clr,    false);
}
async function sub_FillRoundRect(x/*LONG*/,y/*LONG*/,w/*LONG*/,h/*LONG*/,radius/*INTEGER*/,clr/*_UNSIGNED LONG*/) {
if (QB.halted()) { return; }; x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h); radius = Math.round(radius); clr = Math.round(clr); 
   await sub__RoundRect(  x,    y,    w,    h,    radius,    clr,    true);
}
async function sub__RoundRect(x/*LONG*/,y/*LONG*/,w/*LONG*/,h/*LONG*/,radius/*INTEGER*/,clr/*_UNSIGNED LONG*/,fill/*SINGLE*/) {
if (QB.halted()) { return; }; x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h); radius = Math.round(radius); clr = Math.round(clr); 
   var destImg = 0;  /* LONG */ 
   destImg =  QB.func__Dest();
   if ( clr ==   undefined ) {
      clr =  QB.func__DefaultColor();
   }
   //-------- BEGIN JS native code block --------
        var c = QB.colorToRGB(clr);
        var ctx = QB.getImage(destImg).getContext("2d");
        if (fill) { 
            ctx.fillStyle = c.rgba();
        } else {
            ctx.strokeStyle = c.rgba();
            ctx.lineWidth = QB.defaultLineWidth();
        }
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, radius);
        if (fill) { 
            ctx.fill();
        } else { 
            ctx.stroke();
        }
//-------- END JS native code block --------
}
async function sub_InvertRect(x/*LONG*/,y/*LONG*/,width/*LONG*/,height/*LONG*/,fill/*INTEGER*/) {
if (QB.halted()) { return; }; x = Math.round(x); y = Math.round(y); width = Math.round(width); height = Math.round(height); fill = Math.round(fill); 
   var destImg = 0;  /* LONG */ 
   destImg =  QB.func__Dest();
   //-------- BEGIN JS native code block --------
        var ctx = QB.getImage(destImg).getContext("2d");
        ctx.beginPath();
        ctx.globalCompositeOperation="difference";
        if (fill) {
            ctx.fillStyle = "white";
            ctx.rect(x, y, width, height);
            ctx.fill();
        }
        else {
            ctx.lineWidth = QB.defaultLineWidth();
            ctx.strokeStyle = "white";
            ctx.rect(x, y, width, height);
            ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";
//-------- END JS native code block --------
}
async function sub_Shadow(clr/*LONG*/,offsetX/*LONG*/,offsetY/*LONG*/,blur/*LONG*/) {
if (QB.halted()) { return; }; clr = Math.round(clr); offsetX = Math.round(offsetX); offsetY = Math.round(offsetY); blur = Math.round(blur); 
   var destImg = 0;  /* LONG */ 
   destImg =  QB.func__Dest();
   if ( offsetX ==   undefined ) {
      offsetX =   0;
   }
   if ( offsetY ==   undefined ) {
      offsetY =   0;
   }
   if ( blur ==   undefined ) {
      blur =   0;
   }
   if ( clr ==   undefined ) {
      clr =  QB.func__DefaultColor();
   }
   //-------- BEGIN JS native code block --------
        var c = QB.colorToRGB(clr);
        var ctx = QB.getImage(destImg).getContext("2d");
        ctx.shadowBlur = blur;
        ctx.shadowColor = c.rgba();
        ctx.shadowOffsetX = offsetX;
        ctx.shadowOffsetY = offsetY;
//-------- END JS native code block --------
}
async function sub_ShadowOff() {
if (QB.halted()) { return; }; 
   var destImg = 0;  /* LONG */ 
   destImg =  QB.func__Dest();
   //-------- BEGIN JS native code block --------
        var ctx = QB.getImage(destImg).getContext("2d");
        ctx.shadowBlur = 0;
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
//-------- END JS native code block --------
}
async function sub_LineWidth(w/*LONG*/) {
if (QB.halted()) { return; }; w = Math.round(w); 
   //-------- BEGIN JS native code block --------
        QB.defaultLineWidth(w);
//-------- END JS native code block --------
}
async function func_LineWidth() {
if (QB.halted()) { return; }; 
var LineWidth = null;
   //-------- BEGIN JS native code block --------
        LineWidth = QB.defaultLineWidth();
//-------- END JS native code block --------
return LineWidth;
}
async function sub_LineCap(cap/*STRING*/) {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        var ctx = QB.getImage(QB.func__Dest()).getContext("2d");
        ctx.lineCap = cap;
//-------- END JS native code block --------
}
async function func_LineCap() {
if (QB.halted()) { return; }; 
var LineCap = null;
   //-------- BEGIN JS native code block --------
        var ctx = QB.getImage(QB.func__Dest()).getContext("2d");
        LineCap = ctx.lineCap;
//-------- END JS native code block --------
return LineCap;
}
async function sub_LineDash(dashLen/*INTEGER*/,dashSpace/*INTEGER*/) {
if (QB.halted()) { return; }; dashLen = Math.round(dashLen); dashSpace = Math.round(dashSpace); 
   //-------- BEGIN JS native code block --------
        var ctx = QB.getImage(QB.func__Dest()).getContext("2d");
        if (dashLen > 0) {
            var dl = dashLen;
            var ds = dashLen;
            if (dashSpace > 0) {
                ds = dashSpace;
            }
            ctx.setLineDash([dl, ds])
        }
        else {
            ctx.setLineDash([])
        }
//-------- END JS native code block --------
}
async function sub_LineDashOff() {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        var ctx = QB.getImage(QB.func__Dest()).getContext("2d");
        ctx.setLineDash([])
//-------- END JS native code block --------
}
async function sub_Curve(sx/*LONG*/,sy/*LONG*/,cx/*LONG*/,cy/*LONG*/,ex/*LONG*/,ey/*LONG*/,clr/*_UNSIGNED LONG*/) {
if (QB.halted()) { return; }; sx = Math.round(sx); sy = Math.round(sy); cx = Math.round(cx); cy = Math.round(cy); ex = Math.round(ex); ey = Math.round(ey); clr = Math.round(clr); 
   if ( clr ==   undefined ) {
      clr =  QB.func__DefaultColor();
   }
   //-------- BEGIN JS native code block --------
        var c = QB.colorToRGB(clr);
        var ctx = QB.getImage(QB.func__Dest()).getContext("2d");
        ctx.strokeStyle = c.rgba();
        ctx.lineWidth = QB.defaultLineWidth();
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.quadraticCurveTo(cx, cy, ex, ey);
        ctx.stroke();    
//-------- END JS native code block --------
}
async function sub_Bezier(sx/*LONG*/,sy/*LONG*/,cx1/*LONG*/,cy1/*LONG*/,cx2/*LONG*/,cy2/*LONG*/,ex/*LONG*/,ey/*LONG*/,clr/*_UNSIGNED LONG*/) {
if (QB.halted()) { return; }; sx = Math.round(sx); sy = Math.round(sy); cx1 = Math.round(cx1); cy1 = Math.round(cy1); cx2 = Math.round(cx2); cy2 = Math.round(cy2); ex = Math.round(ex); ey = Math.round(ey); clr = Math.round(clr); 
   if ( clr ==   undefined ) {
      clr =  QB.func__DefaultColor();
   }
   //-------- BEGIN JS native code block --------
        var c = QB.colorToRGB(clr);
        var ctx = QB.getImage(QB.func__Dest()).getContext("2d");
        ctx.strokeStyle = c.rgba();
        ctx.lineWidth = QB.defaultLineWidth();
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey);
        ctx.stroke();    
//-------- END JS native code block --------
}
return {
DEFAULT: DEFAULT,
ROUND: ROUND,
SQUARE: SQUARE,
sub_RotoZoom: sub_RotoZoom,
sub_SaveImage: sub_SaveImage,
sub_Triangle: sub_Triangle,
sub_FillTriangle: sub_FillTriangle,
sub_RoundRect: sub_RoundRect,
sub_FillRoundRect: sub_FillRoundRect,
sub_InvertRect: sub_InvertRect,
sub_Shadow: sub_Shadow,
sub_ShadowOff: sub_ShadowOff,
sub_LineWidth: sub_LineWidth,
func_LineWidth: func_LineWidth,
sub_LineCap: sub_LineCap,
func_LineCap: func_LineCap,
sub_LineDash: sub_LineDash,
sub_LineDashOff: sub_LineDashOff,
sub_FillCircle: sub_FillCircle,
sub_Ellipse: sub_Ellipse,
sub_FillEllipse: sub_FillEllipse,
sub_Curve: sub_Curve,
sub_Bezier: sub_Bezier,
};
}
const Gfx = await _Gfx();
async function _Dom() {
/* static method variables: */ 

   //-------- BEGIN JS native code block --------
    if (QB._domElements) {
        var e = null;    
        while (e = QB._domElements.pop()) {
            e.remove();
        }
    }
    else { 
        QB._domElements = []; 
    }
    if (QB._domEvents) {
        while (e = QB._domEvents.pop()) {
            e.target.removeEventListener(e.eventType, e.callbackFn);
        }
    }
    else {
        QB._domEvents = [];
    }
//-------- END JS native code block --------

async function sub_Alert(text/*STRING*/) {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        alert(text);
//-------- END JS native code block --------
}
async function func_Confirm(text/*STRING*/) {
if (QB.halted()) { return; }; 
var Confirm = null;
   //-------- BEGIN JS native code block --------
        Confirm = confirm(text) ? -1 : 0;
//-------- END JS native code block --------
return Confirm;
}
async function sub_Add(e/*OBJECT*/,parent/*OBJECT*/,beforeElement/*OBJECT*/) {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        if (parent == undefined || parent == "") {
            parent = await func_Container(); 
        }
        else if (typeof parent == "string") {
            parent = document.getElementById(parent);
        }
        if (beforeElement == undefined || beforeElement == "") {
            beforeElement = null;
        }
        else if (typeof beforeElement == "string") {
            beforeElement = document.getElementById(beforeElement);
        }
        parent.insertBefore(e, beforeElement);
//-------- END JS native code block --------
}
async function func_Create(etype/*STRING*/,parent/*OBJECT*/,content/*STRING*/,eid/*STRING*/,beforeElement/*OBJECT*/) {
if (QB.halted()) { return; }; 
var Create = null;
   //-------- BEGIN JS native code block --------
        var e = document.createElement(etype); 
        if (eid != undefined && eid != "") {
            e.id = eid;
        }
        e.className = "qbjs";
        if (content != undefined) {
            if (e.value != undefined) {
                e.value = content;
            }
            if (e.innerHTML != undefined) {
                e.innerHTML = content;
            }
        }
        QB._domElements.push(e);
        await sub_Add(e, parent, beforeElement);
        Create = e;
//-------- END JS native code block --------
return Create;
}
async function sub_Create(etype/*STRING*/,parent/*OBJECT*/,content/*STRING*/,eid/*STRING*/,beforeElement/*OBJECT*/) {
if (QB.halted()) { return; }; 
   var e = 0;  /* SINGLE */ 
   e =  (await func_Create(  etype,    parent,    content,    eid,    beforeElement));
}
async function sub_Event(target/*OBJECT*/,eventType/*STRING*/,callbackFn/*OBJECT*/) {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        if (typeof target == "string") {
            target = document.getElementById(target);
        }
        var callbackWrapper = async function(event) {
            var result = await callbackFn(event);
            if (result == false) {
                event.preventDefault();
            }
            return result;
        }
        target.addEventListener(eventType, callbackWrapper);
        QB._domEvents.push({ target: target, eventType: eventType, callbackFn: callbackWrapper});
//-------- END JS native code block --------
}
async function func_Container() {
if (QB.halted()) { return; }; 
var Container = null;
   //-------- BEGIN JS native code block --------
        Container = document.getElementById("gx-container");
//-------- END JS native code block --------
return Container;
}
async function func_Get(eid/*STRING*/) {
if (QB.halted()) { return; }; 
var Get = null;
   //-------- BEGIN JS native code block --------
        Get = document.getElementById(eid);
//-------- END JS native code block --------
return Get;
}
async function func_GetImage(imageId/*INTEGER*/) {
if (QB.halted()) { return; }; imageId = Math.round(imageId); 
var GetImage = null;
   //-------- BEGIN JS native code block --------
        GetImage = QB.getImage(imageId);
//-------- END JS native code block --------
return GetImage;
}
async function sub_Remove(e/*OBJECT*/) {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        if (typeof e == "string") {
            e = document.getElementById(e);
        }
        if (e != undefined && e != null) {
            e.remove();
        }
//-------- END JS native code block --------
}
async function func_Prompt(text/*STRING*/,defaultValue/*STRING*/) {
if (QB.halted()) { return; }; 
var Prompt = null;
   var result = '';  /* STRING */ 
   //-------- BEGIN JS native code block --------
        result = prompt(text, defaultValue);
        if (!result) { result = ""; }
//-------- END JS native code block --------
   Prompt =   result;;
return Prompt;
}
return {
sub_Add: sub_Add,
sub_Alert: sub_Alert,
func_Confirm: func_Confirm,
sub_Create: sub_Create,
func_Create: func_Create,
sub_Event: sub_Event,
func_Container: func_Container,
func_Get: func_Get,
func_GetImage: func_GetImage,
sub_Remove: sub_Remove,
func_Prompt: func_Prompt,
};
}
const Dom = await _Dom();
async function _FS() {
/* static method variables: */ 

   const ALL  =    0; 
   const FILE  =    1; 
   const DIRECTORY  =    2; 

async function func_ListDirectory(dirpath/*STRING*/,listMode/*INTEGER*/) {
if (QB.halted()) { return; }; listMode = Math.round(listMode); 
var ListDirectory = null;
   if ( dirpath ==   undefined ) {
      dirpath =  "";
   }
   if ( listMode ==   undefined ) {
      listMode =   ALL;
   }
   var children = {};  /* OBJECT */ 
   //-------- BEGIN JS native code block --------
        var vfs = QB.vfs();
        var pnode = null;
        if (dirpath == "") {
            pnode = QB.vfsCwd();
        }
        else {
            pnode = vfs.getNode(dirpath, QB.vfsCwd());
        }
        if (!pnode) {
            throw Object.assign(new Error("Path not found: [" + dirpath + "]"), { _stackDepth: 1 });
        }
        var mode = null;
        if (listMode == DIRECTORY) {
            mode = vfs.DIRECTORY;
        }
        else if (listMode == FILE) {
            mode = vfs.FILE;
        }
        children = vfs.getChildren(pnode, mode);
//-------- END JS native code block --------
   var type = 0;  /* SINGLE */ var i = 0;  /* INTEGER */ 
   var results = QB.initArray([{l:0,u:children.length}], {});  /* OBJECT */ 
   var ___v5334240 = 0; ___l7055475: for ( i=  0 ;  i <=  children.length -  1;  i= i + 1) { if (QB.halted()) { return; } ___v5334240++;   if (___v5334240 % 100 == 0) { await QB.autoLimit(); }
      QB.arrayValue(results, [ i + 1]).value .name =   children[i].name;
      //-------- BEGIN JS native code block --------
            if (children[i].type == vfs.FILE) { 
                type = FILE;
            }
            else {
                type = DIRECTORY;
            }
//-------- END JS native code block --------
      QB.arrayValue(results, [ i + 1]).value .type =   type;
   } 
   ListDirectory =   results;
return ListDirectory;
}
async function sub_DownloadFile(filepath/*STRING*/) {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        var vfs = QB.vfs();
        var file = vfs.getNode(filepath, QB.vfsCwd());
        if (!file || file.type != vfs.FILE) {
            throw Object.assign(new Error("File not found: [" + filepath + "]"), { _stackDepth: 1 });
        }
        await QB.downloadFile(new Blob([file.data]), file.name);
//-------- END JS native code block --------
}
async function sub_UploadFile(destpath/*STRING*/,filter/*STRING*/,fnCallback/*OBJECT*/) {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        var vfs = QB.vfs();
        var parentDir = null;
        if (destpath == "/") {
            parentDir = QB.vfs().rootDirectory();
            destpath = "";
        }
        else if (destpath == undefined || destpath == "") {
            parentDir = QB.vfsCwd();
        }
        else {
            parentDir = vfs.getNode(destpath, QB.vfsCwd());
            if (!parentDir) {
                throw Object.assign(new Error("Path not found: [" + destpath + "]"), { _stackDepth: 1 });
            }
            else if (parentDir && parentDir.type != vfs.DIRECTORY) {
                throw Object.assign(new Error("Path is not a directory: [" + destpath + "]"), { _stackDepth: 1 });
            }
        }
        var fileInput = document.getElementById("upload-file-input");
        if (fileInput == null) {
            fileInput = document.createElement("input");
            fileInput.id = "upload-file-input";
            fileInput.type = "file";
        }
        fileInput.value = null;
        if (filter != undefined) {
            fileInput.accept = filter;
        }
        fileInput.onchange = function(event) {
            if (event.target.files.length > 0) {
                var f = event.target.files[0];
                var fr = new FileReader();
                fr.onload = function() {
                    var file = vfs.createFile(f.name, parentDir);
                    vfs.writeData(file, fr.result);
                    if (fnCallback) {
                        fnCallback(vfs.fullPath(file));
                    }
                }
                fr.readAsArrayBuffer(f);
            }
        };
        fileInput.click();
//-------- END JS native code block --------
}
return {
ALL: ALL,
FILE: FILE,
DIRECTORY: DIRECTORY,
func_ListDirectory: func_ListDirectory,
sub_DownloadFile: sub_DownloadFile,
sub_UploadFile: sub_UploadFile,
};
}
const FS = await _FS();
async function _MNU() {
/* static method variables: */ 

   await sub_ImportCss( "menu.css");
   await Dom.sub_Event(  document ,   "click"  ,    sub_OnDocClick);
   var container = {};  /* OBJECT */ 
   container =  (await Dom.func_Container());

async function sub_OnMenu(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   var rect = {};  /* OBJECT */ var menu = {};  /* OBJECT */ var pos = {};  /* OBJECT */ var prect = {};  /* OBJECT */ 
   //-------- BEGIN JS native code block --------
        rect = event.target.getBoundingClientRect();
        prect = container.getBoundingClientRect();
//-------- END JS native code block --------
   menu =   event.target;
   if ( menu.parentMenu.rootMenu ) {
      menu.menu.style.left =  ( rect.left -  prect.left)  + "px";
      menu.menu.style.top =  ( rect.bottom -  prect.top -  1)  + "px";
   } else {
      menu.menu.style.left =  ( rect.right -  prect.left +  2)  + "px";
      menu.menu.style.top =  ( rect.top -  prect.top)  + "px";
   }
   await sub_HideMenus();
   var m = {};  /* OBJECT */ 
   m =   menu.parentMenu;
   var ___v2895625 = 0; ___l5795186: while ( m &  m.rootMenu ==   undefined) { if (QB.halted()) { return; }___v2895625++;   if (___v2895625 % 100 == 0) { await QB.autoLimit(); }
      m.style.display =  "block";
      m =   m.parentMenu;
   }
   menu.menu.style.display =  "block";
}
async function sub_OnMenuItem(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   if ( event.target.callback ) {
      if ( event.target.disabled !=   true ) {
         //-------- BEGIN JS native code block --------
            event.target.callback(event);
//-------- END JS native code block --------
      }
   }
   await sub_HideMenus();
}
async function sub_OnDocClick(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   var isDropMenu = 0;  /* SINGLE */ 
   //-------- BEGIN JS native code block --------
        isDropMenu = event.target.classList.contains("menu-item") ? -1 : 0;
//-------- END JS native code block --------
   if (~ isDropMenu) {
      await sub_HideMenus();
   }
}
async function func_CreateMenu(parentElement/*OBJECT*/,insertBefore/*OBJECT*/) {
if (QB.halted()) { return; }; 
var CreateMenu = null;
   if ( parentElement ==   undefined &  insertBefore ==   undefined ) {
      insertBefore =  (await Dom.func_GetImage(  0));
   }
   var menu = {};  /* OBJECT */ 
   menu =  (await Dom.func_Create( "div"  ,    parentElement, undefined, undefined,    insertBefore));
   menu.rootMenu =   true;
   await sub_AddClass(  menu,   "menu");
   await sub_AddClass(  menu,   "rootmenu");
   CreateMenu =   menu;
return CreateMenu;
}
async function func_AddMenu(parentMenu/*OBJECT*/,mname/*STRING*/) {
if (QB.halted()) { return; }; 
var AddMenu = null;
   var menu = {};  /* OBJECT */ 
   if ( parentMenu.menu ) {
      parentMenu =   parentMenu.menu;
   }
   menu =  (await Dom.func_Create( "div"  ,    parentMenu,    mname));
   await sub_AddClass(  menu,   "menu-item");
   await Dom.sub_Event(  menu,   "click"  ,    sub_OnMenu);
   if ( parentMenu.rootMenu ==   undefined ) {
      await sub_AddClass(  menu,   "submenu");
   }
   menu.menu =  (await Dom.func_Create( "div"));
   await sub_AddClass(  menu.menu ,   "menu");
   await sub_AddClass(  menu.menu ,   "dropmenu");
   menu.parentMenu =   parentMenu;
   AddMenu =   menu;
return AddMenu;
}
async function sub_AddMenuItem(menu/*OBJECT*/,mname/*STRING*/,mevent/*OBJECT*/) {
if (QB.halted()) { return; }; 
   var mitem = {};  /* OBJECT */ 
   mitem =  (await func_AddMenuItem(  menu,    mname,    mevent));
}
async function func_AddMenuItem(menu/*OBJECT*/,mname/*STRING*/,mevent/*OBJECT*/) {
if (QB.halted()) { return; }; 
var AddMenuItem = null;
   var mitem = {};  /* OBJECT */ 
   mitem =  (await Dom.func_Create( "div"  ,    menu.menu ,    mname));
   await sub_AddClass(  mitem,   "menu-item");
   if ( mevent) {
      mitem.callback =   mevent;
      await Dom.sub_Event(  mitem,   "click"  ,    sub_OnMenuItem);
   }
   mitem.parentMenu =   menu;
   AddMenuItem =   mitem;
return AddMenuItem;
}
async function sub_EnableMenuItem(menu/*OBJECT*/,enabled/*INTEGER*/) {
if (QB.halted()) { return; }; enabled = Math.round(enabled); 
   if ( enabled) {
      await sub_RemoveClass(  menu,   "disabled");
      menu.disabled =   0;
   } else {
      await sub_AddClass(  menu,   "disabled");
      menu.disabled =   - 1;
   }
}
async function sub_AddSeparator(menu/*OBJECT*/) {
if (QB.halted()) { return; }; 
   var separator = {};  /* OBJECT */ 
   separator =  (await Dom.func_Create( "div"  ,    menu.menu));
   await sub_AddClass(  separator,   "menu-separator");
}
async function sub_HideMenus() {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        var menus = document.getElementsByClassName("dropmenu");
        for (var i=0; i < menus.length; i++) {
            menus[i].style.display = "none";
        }
//-------- END JS native code block --------
}
async function sub_ImportCss(filename/*STRING*/) {
if (QB.halted()) { return; }; 
   var css = '';  /* STRING */ var fline = '';  /* STRING */ 
   await QB.sub_Open(filename, QB.INPUT, 1);
   var ___v3019480 = new Array(1); await QB.sub_LineInputFromFile(1, ___v3019480);  fline = ___v3019480[0]; 
   var ___v140176 = 0; ___l7747401: while (~(QB.func_EOF(  1))) { if (QB.halted()) { return; }___v140176++;   if (___v140176 % 100 == 0) { await QB.autoLimit(); }
      css =   css + (QB.func_Chr(  10))  +  fline;
      var ___v7607236 = new Array(1); await QB.sub_LineInputFromFile(1, ___v7607236);  fline = ___v7607236[0]; 
   }
   QB.sub_Close(1);
   await sub_AddCss(  css);
}
async function sub_AddCss(css/*STRING*/) {
if (QB.halted()) { return; }; 
   var style = {};  /* OBJECT */ 
   style =  (await Dom.func_Create( "style"  ,    document.head));
   style.innerText =   css;
}
async function sub_AddClass(element/*OBJECT*/,className/*STRING*/) {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        element.classList.add(className);
//-------- END JS native code block --------
}
async function sub_RemoveClass(element/*OBJECT*/,className/*STRING*/) {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
		element.classList.remove(className);
//-------- END JS native code block --------
}
return {
func_CreateMenu: func_CreateMenu,
func_AddMenu: func_AddMenu,
sub_AddMenuItem: sub_AddMenuItem,
func_AddMenuItem: func_AddMenuItem,
sub_EnableMenuItem: sub_EnableMenuItem,
sub_AddSeparator: sub_AddSeparator,
};
}
const MNU = await _MNU();
async function _Console() {
/* static method variables: */ 

   const NONE  =   "NONE"; 
   const FATAL  =   "FATAL"; 
   const ERROR  =   "ERROR"; 
   const WARN  =   "WARN"; 
   const INFO  =   "INFO"; 
   const DEBUG  =   "DEBUG"; 
   const TRACE  =   "TRACE"; 
   const ALL  =   "ALL"; 
   var levelMap = QB.initArray([{l:0,u:0}], 0);  /* SINGLE */ 
   QB.arrayValue(levelMap, [ NONE]).value =   0;
   QB.arrayValue(levelMap, [ FATAL]).value =   1;
   QB.arrayValue(levelMap, [ ERROR]).value =   2;
   QB.arrayValue(levelMap, [ WARN]).value =   3;
   QB.arrayValue(levelMap, [ INFO]).value =   4;
   QB.arrayValue(levelMap, [ DEBUG]).value =   5;
   QB.arrayValue(levelMap, [ TRACE]).value =   6;
   QB.arrayValue(levelMap, [ ALL]).value =   7;
   var level = 0;  /* INTEGER */ 
   level =   4;

async function sub_LogLevel(newLevel/*SINGLE*/) {
if (QB.halted()) { return; }; 
   level =  QB.arrayValue(levelMap, [ newLevel]).value;
}
async function func_LogLevel() {
if (QB.halted()) { return; }; 
var LogLevel = null;
   LogLevel =   level;
return LogLevel;
}
async function sub_Log(msg/*STRING*/,msgType/*STRING*/) {
if (QB.halted()) { return; }; 
   if ( msgType ==   undefined ) {
      msgType =   INFO;
   }
   var ll = 0;  /* INTEGER */ 
   ll =  QB.arrayValue(levelMap, [ msgType]).value;
   if ( ll > level) {
      return;
   }
   //-------- BEGIN JS native code block --------
        var t = document.querySelector("#warning-container table");
        if (!t || IDE.mode() != "ide") { 
            console.log(msgType + ":" + msg);
            return; 
        }
        var errorLine = await IDE.getErrorLine(new Error(), 1);
        var tr = document.createElement("tr");
        IDE.addWarningCell(tr, msgType);
        IDE.addWarningCell(tr, ":");
        IDE.addWarningCell(tr, errorLine);
        IDE.addWarningCell(tr, ":");
        IDE.addWarningCell(tr, await func_EscapeHtml(msg), "99%");
        tr.codeLine = errorLine - 1;
        tr.onclick = IDE.gotoWarning;
        t.append(tr);
        var container = document.getElementById("output-content");
        container.scrollTop = container.scrollHeight;
        IDE.changeTab("console");
        IDE.showConsole(true);
//-------- END JS native code block --------
}
async function sub_Echo(msg/*STRING*/) {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        var t = document.querySelector("#warning-container table");
        if (!t || IDE.mode() != "ide") {
            console.log(msg); 
            return;
        }
        var tr = document.createElement("tr");
        IDE.addWarningCell(tr, await func_EscapeHtml(msg));
        tr.firstChild.colSpan = "5";
        t.append(tr);
        var container = document.getElementById("output-content");
        container.scrollTop = container.scrollHeight;
        IDE.changeTab("console");
        IDE.showConsole(true);
//-------- END JS native code block --------
}
async function func_EscapeHtml(text/*STRING*/) {
if (QB.halted()) { return; }; 
var EscapeHtml = null;
   text =  (GXSTR.replace(  text,   "&"  ,   "&amp;"));
   text =  (GXSTR.replace(  text,   "<"  ,   "&lt;"));
   text =  (GXSTR.replace(  text,   ">"  ,   "&gt;"));
   text =  (GXSTR.replace(  text,   (QB.func_Chr(  34))  ,   "&quot;"));
   text =  (GXSTR.replace(  text,   "'"  ,   "&#039;"));
   EscapeHtml =   text;
return EscapeHtml;
}
return {
NONE: NONE,
FATAL: FATAL,
ERROR: ERROR,
WARN: WARN,
INFO: INFO,
DEBUG: DEBUG,
TRACE: TRACE,
ALL: ALL,
sub_Log: sub_Log,
sub_LogLevel: sub_LogLevel,
func_LogLevel: func_LogLevel,
sub_Echo: sub_Echo,
};
}
const Console = await _Console();
/* static method variables: */ 
QB.start(); QB.setTypeMap({ GXPOSITION:[{ name: 'x', type: 'LONG' }, { name: 'y', type: 'LONG' }], GXDEVICEINPUT:[{ name: 'deviceId', type: 'INTEGER' }, { name: 'deviceType', type: 'INTEGER' }, { name: 'inputType', type: 'INTEGER' }, { name: 'inputId', type: 'INTEGER' }, { name: 'inputValue', type: 'INTEGER' }], FETCHRESPONSE:[{ name: 'ok', type: 'INTEGER' }, { name: 'status', type: 'INTEGER' }, { name: 'statusText', type: 'STRING' }, { name: 'text', type: 'STRING' }], RECT:[{ name: 'x', type: 'LONG' }, { name: 'y', type: 'LONG' }, { name: 'width', type: 'LONG' }, { name: 'height', type: 'LONG' }]});
    await GX.registerGameEvents(sub_GXOnGameEvent);

QB.setData([".mm-dialog { padding: 2px; border: outset 2px; background-color: #efefef; color: #000 }",".mm-dialog, .mm-dialog table, .mm-dialog input, .mm-dialog button {","font-family: dosvga !important; font-size: 16px !important; text-align: left }",".mm-dialog input { padding: 3px }",".mm-dialog button { padding: 3px }",".mm-dialog .title { padding: 8px; background-color:#00007b; color: #fff; user-select: none }","<div class='title'>","</div><div style='border: 1px solid #ccc; padding: 8px;'>","<table>","<tr><td>Columns:</td><td><input id='new-columns' size='5' style='text-align:right'/></td></tr>","<tr><td>Rows:</td><td><input id='new-rows' size='5' style='text-align:right'/></td></tr>","<tr><td>Layers:</td><td><input id='new-layers' size='5' style='text-align:right'/></td></tr>","<tr><td>Tileset Image:</td><td><input id='new-tileset-image'/><button id='new-load-tileset-image' style='letter-spacing:-3px'>...</button>","<tr><td>Tileset Width:</td><td><input id='new-tileset-width' style='text-align:right'/></td></tr>","<tr><td>Tileset Height:</td><td><input id='new-tileset-height' style='text-align:right'/></td></tr>","<tr><td>Isometric?</td><td><input id='new-isometric' type='checkbox'/></td></tr>","</table><hr/>","<button id='new-create-map' style='font-family:dosvga; font-size: 16px; padding: 8px'>Create Map</button> ","<button id='new-cancel' style='font-family:dosvga; font-size: 16px; padding: 8px'>Cancel</button>","</div>","<table>","<tr><td>Tileset Image:</td><td><input id='rts-tileset-image'/><button id='rts-load-tileset-image' style='letter-spacing:-3px'>...</button>","<tr><td>Tileset Width:</td><td><input id='rts-tileset-width' size='5' style='text-align:right'/></td></tr>","<tr><td>Tileset Height:</td><td><input id='rts-tileset-height' size='5' style='text-align:right'/></td></tr>","</table><hr/>","<button id='rts-replace-tileset' style='font-family:dosvga; font-size: 16px; padding: 8px'>Replace Tileset</button> ","<button id='rts-cancel' style='font-family:dosvga; font-size: 16px; padding: 8px'>Cancel</button>","</div>","<div style='min-width:250px'>GX Map Maker</div>","<div>Version: 0.6.0</div><br/>","<div><span style='font-family:courier new,sans-serif; font-size:18px'>&copy;</span> 2025 boxgaming</div><hr/>","<button id='about-ok' style='font-family:dosvga; font-size: 16px; padding: 8px'> OK </button>","</div>","<div class='title' id='msg-title'></div>","<div style='border: 1px solid #ccc; padding: 8px;'>","<div id='msg-body' style='max-width:500px'></div><hr/>","<button id='msg-ok' style='font-family:dosvga; font-size: 16px; padding: 8px'> OK </button>","</div>"]);
QB.setDataLabel('CSS',  0);
QB.setDataLabel('DLG_CONTAINER',  6);
QB.setDataLabel('DLG_NEW',  8);
QB.setDataLabel('DLG_RTS',  20);
QB.setDataLabel('DLG_ABOUT',  28);
QB.setDataLabel('DLG_MSG',  33);
   await Console.sub_LogLevel(  Console.NONE);
   QB.sub__Title( "GX Map Maker");
   const MAP  =    1; 
   const TILES  =    2; 
   
   var tileSel = {x:0,y:0,width:0,height:0};  /* RECT */ var tileSelBack = {x:0,y:0,width:0,height:0};  /* RECT */ var frameTileSel = {x:0,y:0,width:0,height:0};  /* RECT */ var tsCursor = {x:0,y:0,width:0,height:0};  /* RECT */ 
   tileSel.x =   0;
   tileSel.y =   0;
   tileSel.width =   1;
   tileSel.height =   1;
   tsCursor.x =   0;
   tsCursor.y =   0;
   tsCursor.width =   1;
   tsCursor.height =   1;
   var selectedLayer = 0;  /* INTEGER */ 
   selectedLayer =   1;
   var mapSelMode = 0;  /* INTEGER */ var mapSelSizing = 0;  /* INTEGER */ var tileSelSizing = 0;  /* INTEGER */ var animationMode = 0;  /* INTEGER */ 
   var mapLoaded = 0;  /* INTEGER */ var resizing = 0;  /* INTEGER */ var painting = 0;  /* INTEGER */ var deleting = 0;  /* INTEGER */ var scale = 0;  /* INTEGER */ var tscale = 0;  /* INTEGER */ 
   scale =   1;
   tscale =   1;
   var leftPanel = {};  /* OBJECT */ var rightPanel = {};  /* OBJECT */ var topPanel = {};  /* OBJECT */ var statusBar = {};  /* OBJECT */ var tileset = {};  /* OBJECT */ var layerContents = {};  /* OBJECT */ 
   var cboLayer = {};  /* OBJECT */ var cboEditLayer = {};  /* OBJECT */ var btnLayerAdd = {};  /* OBJECT */ var lblMapSize = {};  /* OBJECT */ var resizePanel = {};  /* OBJECT */ 
   var lblTileId = {};  /* OBJECT */ var chkTileAnimated = {};  /* OBJECT */ var lstTileFrames = {};  /* OBJECT */ var txtFPS = {};  /* OBJECT */ var panelAnimate = {};  /* OBJECT */ var tilePanelOffset = {};  /* OBJECT */ 
   tilePanelOffset =   330;
   var btnAddFrame = {};  /* OBJECT */ var btnRemoveFrame = {};  /* OBJECT */ 
   var tilesetImage = 0;  /* LONG */ var tilesetSource = 0;  /* LONG */ var lastMouseZoom = 0;  /* LONG */ 
   var timg = {};  /* OBJECT */ 
   var dlg = {};  /* OBJECT */ var dlgNew = {};  /* OBJECT */ var dlgRTS = {};  /* OBJECT */ var dlgAbout = {};  /* OBJECT */ var dlgMsg = {};  /* OBJECT */ var txtTSImage = {};  /* OBJECT */ var txtMapRows = {};  /* OBJECT */ var txtMapColumns = {};  /* OBJECT */ 
   var layerLocks = QB.initArray([{l:0,u:0}], 0);  /* INTEGER */ 
   var mnuSave = {};  /* OBJECT */ var mnuMapZoomIn = {};  /* OBJECT */ var mnuMapZoomOut = {};  /* OBJECT */ var mnuMapResize = {};  /* OBJECT */ var mnuTSReplace = {};  /* OBJECT */ var mnuTSZoomIn = {};  /* OBJECT */ var mnuTSZoomOut = {};  /* OBJECT */ 
   var mapFilename = '';  /* STRING */ 
   tilesetImage =  (QB.func__NewImage(  100 ,    100 ,    32));
   tilesetSource =  (QB.func__CopyImage(  tilesetImage));
   var imgLayerShow = '';  /* STRING */ var imgLayerHide = '';  /* STRING */ var imgLayerLock = '';  /* STRING */ var imgLayerUnlock = '';  /* STRING */ var imgLayerDelete = '';  /* STRING */ 
   GX.sceneCreate( (await Dom.func_Container()) .clientWidth ,   (await Dom.func_Container()) .clientHeight);
   await sub_InitControls();
   await GX.sceneStart();

async function sub_GXOnGameEvent(e/*GXEVENT*/) {
if (QB.halted()) { return; }; 
   var ___v8144900 =  e.event; switch (___v8144900) {
      case  GX.EVENT_UPDATE: 
      await sub_OnUpdate();
      break; case  GX.EVENT_DRAWBG: 
      QB.sub_Cls(undefined, undefined);
      break; case  GX.EVENT_DRAWSCREEN: 
      await sub_OnDrawScreen();
   break; }
}
async function sub_OnUpdate(e/*GXEVENT*/) {
if (QB.halted()) { return; }; 
   if (~ mapLoaded) {
      return;
   }
   if (QB.func__Resize()) {
      await sub_ResizeControls(  e);
   }
   if ( painting) {
      await sub_PaintTiles();
   } else if ( deleting) {
      await sub_DeleteTiles();
   }
   if ( mapSelSizing & ~GX.mapIsometric()) {
      var r = {x:0,y:0,width:0,height:0};  /* RECT */ 
      r =  (await func_GetTilePosAt( QB.func__MouseX(),   QB.func__MouseY()));
      tileSel.width =   r.x -  tileSel.x +  1;
      tileSel.height =   r.y -  tileSel.y +  1;
   }
   if ((GX.keyDown(  GX.KEY_X))  | (GX.keyDown(  GX.KEY_DELETE))  ) {
      deleting =   GX.TRUE;
   } else {
      deleting =   GX.FALSE;
   }
   if ((GX.keyDown(  GX.KEY_D))  ) {
      GX.sceneMove( (GX.tilesetWidth() *  1)  ,    0);
   } else if ((GX.keyDown(  GX.KEY_A))  ) {
      GX.sceneMove(  -GX.tilesetWidth(),    0);
   } else if ((GX.keyDown(  GX.KEY_S))  ) {
      GX.sceneMove(  0 ,   (GX.tilesetHeight() *  1));
   } else if ((GX.keyDown(  GX.KEY_W))  ) {
      GX.sceneMove(  0 ,    -GX.tilesetHeight());
   }
   var mw = 0;  /* INTEGER */ 
   mw =  QB.func__MouseWheel();
   if ((GX.keyDown(  GX.KEY_LCTRL))  | (GX.keyDown(  GX.KEY_RCTRL))  ) {
      if ( mw < 0 ) {
         await sub_OnMapZoomIn();
      } else if ( mw > 0 ) {
         await sub_OnMapZoomOut();
      }
   }
}
async function sub_OnDrawScreen() {
if (QB.halted()) { return; }; 
   if (~ mapLoaded) {
      return;
   }
   await sub_DrawMapCursor();
   await sub_DrawTileset();
   await sub_DrawMapBorder();
}
async function sub_DrawMapBorder() {
if (QB.halted()) { return; }; 
   var bheight = 0;  /* LONG */ 
   var bwidth = 0;  /* LONG */ 
   var rwidth = 0;  /* LONG */ 
   var rheight = 0;  /* LONG */ 
   if (GX.mapIsometric()) {
      bheight =  (GX.mapRows() -  1)  * (GX.tilesetWidth() /  4);
      bwidth =  GX.mapColumns() * GX.tilesetWidth() - (GX.tilesetWidth() /  2);
      rheight =  ( txtMapRows.value -  1)  * (GX.tilesetWidth() /  4);
      rwidth =   txtMapColumns.value * GX.tilesetWidth() - (GX.tilesetWidth() /  2);
   } else {
      bheight =  GX.mapRows() * GX.tilesetHeight();
      bwidth =  GX.mapColumns() * GX.tilesetWidth();
      rheight =   txtMapRows.value * GX.tilesetHeight();
      rwidth =   txtMapColumns.value * GX.tilesetWidth();
   }
   QB.sub_Line(false,   -GX.sceneX() -  1 ,   -GX.sceneY() -  1, false,  bwidth - GX.sceneX() ,   bheight - GX.sceneY(),   (QB.func__RGB(  100 ,    100 ,    100))  , 'B', undefined);
   if ( resizing) {
      QB.sub_Line(false,   -GX.sceneX() -  1 ,   -GX.sceneY() -  1, false,  rwidth - GX.sceneX() ,   rheight - GX.sceneY(),   (QB.func__RGB(  255 ,    255 ,    100))  , 'B', undefined);
   }
}
async function sub_InitMenu(parent/*OBJECT*/) {
if (QB.halted()) { return; }; 
   var main = {};  /* OBJECT */ var menu = {};  /* OBJECT */ 
   main =  (await MNU.func_CreateMenu(  parent));
   menu =  (await MNU.func_AddMenu(  main,   "File"));
   await MNU.sub_AddMenuItem(  menu,   "New"  ,    sub_OnNew);
   await MNU.sub_AddSeparator(  menu);
   await MNU.sub_AddMenuItem(  menu,   "Open"  ,    sub_OnOpen);
   mnuSave =  (await MNU.func_AddMenuItem(  menu,   "Save"  ,    sub_OnSave));
   await MNU.sub_EnableMenuItem(  mnuSave,    GX.FALSE);
   menu =  (await MNU.func_AddMenu(  main,   "Map"));
   mnuMapZoomIn =  (await MNU.func_AddMenuItem(  menu,   "Zoom In"  ,    sub_OnMapZoomIn));
   await MNU.sub_EnableMenuItem(  mnuMapZoomIn,    GX.FALSE);
   mnuMapZoomOut =  (await MNU.func_AddMenuItem(  menu,   "Zoom Out"  ,    sub_OnMapZoomOut));
   await MNU.sub_EnableMenuItem(  mnuMapZoomOut,    GX.FALSE);
   await MNU.sub_AddSeparator(  menu);
   mnuMapResize =  (await MNU.func_AddMenuItem(  menu,   "Resize Map"  ,    sub_OnMapResize));
   await MNU.sub_EnableMenuItem(  mnuMapResize,    GX.FALSE);
   menu =  (await MNU.func_AddMenu(  main,   "Tileset"));
   mnuTSReplace =  (await MNU.func_AddMenuItem(  menu,   "Replace Tileset Image"  ,    sub_OnTilesetReplace));
   await MNU.sub_EnableMenuItem(  mnuTSReplace,    GX.FALSE);
   await MNU.sub_AddSeparator(  menu);
   mnuTSZoomIn =  (await MNU.func_AddMenuItem(  menu,   "Zoom In"  ,    sub_OnTilesetZoomIn));
   await MNU.sub_EnableMenuItem(  mnuTSZoomIn,    GX.FALSE);
   mnuTSZoomOut =  (await MNU.func_AddMenuItem(  menu,   "Zoom Out"  ,    sub_OnTilesetZoomOut));
   await MNU.sub_EnableMenuItem(  mnuTSZoomOut,    GX.FALSE);
   menu =  (await MNU.func_AddMenu(  main,   "Help"));
   await MNU.sub_AddMenuItem(  menu,   "View"  ,    sub_OnHelpView);
   await MNU.sub_AddSeparator(  menu);
   await MNU.sub_AddMenuItem(  menu,   "About..."  ,    sub_OnHelpAbout);
}
async function sub_InitControls() {
if (QB.halted()) { return; }; 
   var footer = {};  /* OBJECT */ 
   footer =  (await Dom.func_Get( "gx-footer"));
   footer.style.height =  "0px";
   var imgLayerAdd = {};  /* OBJECT */ var imgLayerInsert = {};  /* OBJECT */ 
   imgLayerShow =  (await func_DataURL( "img/layer-show.svg"));
   imgLayerHide =  (await func_DataURL( "img/layer-hide.svg"));
   imgLayerLock =  (await func_DataURL( "img/layer-lock.svg"));
   imgLayerUnlock =  (await func_DataURL( "img/layer-unlock.svg"));
   imgLayerAdd =  (await func_DataURL( "img/layer-add.svg"));
   imgLayerInsert =  (await func_DataURL( "img/layer-insert.svg"));
   imgLayerDelete =  (await func_DataURL( "img/layer-delete.svg"));
   var main = 0;  /* SINGLE */ var container = 0;  /* SINGLE */ 
   main =  (await Dom.func_GetImage(  0));
   main.style.border =  "1px solid #999";
   main.style.backgroundColor =  "#000";
   await Dom.sub_Event(  main,   "mousedown"  ,    sub_OnMapMouseDown);
   await Dom.sub_Event(  main,   "mouseup"  ,    sub_OnMapMouseUp);
   container =  (await Dom.func_Container());
   container.style.overflow =  "hidden";
   container.style.textAlign =  "left";
   container.style.backgroundColor =  "#efefef";
   container.style.border =  "0";
   container.style.fontFamily =  "dosvga";
   container.style.fontSize =  "16px";
   container.style.color =  "#333";
   topPanel =  (await Dom.func_Create( "div"));
   await sub_InitMenu(  topPanel);
   leftPanel =  (await Dom.func_Create( "div"));
   leftPanel.style.color =  "#333";
   leftPanel.style.position =  "absolute";
   await Dom.sub_Add(  main,    leftPanel);
   rightPanel =  (await Dom.func_Create( "div"  ,    topPanel));
   rightPanel.style.position =  "absolute";
   rightPanel.style.right =  "0px";
   rightPanel.style.top =  "25px";
   var layerPanel = {};  /* OBJECT */ var lpl = {};  /* OBJECT */ var lpc = {};  /* OBJECT */ var btnAdd = {};  /* OBJECT */ var layerTable = {};  /* OBJECT */ var thead = {};  /* OBJECT */ var tbody = {};  /* OBJECT */ var imgAdd = {};  /* OBJECT */ var imgInsert = {};  /* OBJECT */ 
   layerPanel =  (await Dom.func_Create( "div"  ,    rightPanel));
   layerPanel.style.userSelect =  "none";
   lpl =  (await Dom.func_Create( "div"  ,    layerPanel,   "Layers"));
   lpl.style.padding =  "5px";
   btnAdd =  (await Dom.func_Create( "button"  ,    lpl));
   btnAdd.style.float =  "right";
   btnAdd.style.padding =  "1px 3px";
   btnAdd.style.marginRight =  "2px";
   btnAdd.style.marginTop =  "-3px";
   btnAdd.title =  "Add New Layer";
   imgAdd =  (await Dom.func_Create( "img"  ,    btnAdd));
   imgAdd.src =   imgLayerAdd;
   imgAdd.style.width =  "12px";
   imgAdd.style.height =  "12px";
   btnInsert =  (await Dom.func_Create( "button"  ,    lpl));
   btnInsert.style.float =  "right";
   btnInsert.style.padding =  "0px 2px";
   btnInsert.style.marginRight =  "2px";
   btnInsert.style.marginTop =  "-3px";
   btnInsert.title =  "Insert Layer Before Selected";
   imgInsert =  (await Dom.func_Create( "img"  ,    btnInsert));
   imgInsert.src =   imgLayerInsert;
   imgInsert.style.width =  "14px";
   imgInsert.style.height =  "14px";
   lpc =  (await Dom.func_Create( "div"  ,    layerPanel));
   lpc.style.border =  "inset 1px";
   lpc.style.backgroundColor =  "#fff";
   lpc.style.height =  "200px";
   lpc.style.marginRight =  "5px";
   lpc.style.overflowY =  "auto";
   layerTable =  (await Dom.func_Create( "table"  ,    lpc));
   layerTable.style.width =  "100%";
   layerTable.style.borderCollapse =  "collapse";
   layerTable.style.fontSize =  "13px";
   layerTable.style.fontFamily =  "sans-serif";
   layerContents =  (await Dom.func_Create( "tbody"  ,    layerTable));
   await Dom.sub_Event(  btnAdd,   "click"  ,    sub_OnAddLayer);
   await Dom.sub_Event(  btnInsert ,   "click"  ,    sub_OnInsertLayer);
   var hsplit1 = {};  /* OBJECT */ 
   hsplit1 =  (await Dom.func_Create( "div"  ,    rightPanel));
   hsplit1.style.height =  "5px";
   var tsLabel = {};  /* OBJECT */ 
   tsLabel =  (await Dom.func_Create( "div"  ,    rightPanel,   "Tileset"));
   tileset =  (await Dom.func_Create( "div"  ,    rightPanel));
   tileset.style.border =  "1px solid #999";
   tileset.style.overflow =  "auto";
   tileset.style.backgroundColor =  "#000";
   timg =  (await Dom.func_GetImage(  tilesetImage));
   await Dom.sub_Add(  timg,    tileset);
   await Dom.sub_Event(  tileset,   "mousedown"  ,    sub_OnTilesetSelStart);
   await Dom.sub_Event(  tileset,   "mouseup"  ,    sub_OnTilesetSelEnd);
   await Dom.sub_Event(  tileset,   "mousemove"  ,    sub_OnTilesetMouseMove);
   var tlabel = {};  /* OBJECT */ var d = {};  /* OBJECT */ var d2 = {};  /* OBJECT */ 
   tlabel =  (await Dom.func_Create( "div"  ,    rightPanel,   "Tile: "));
   tlabel.style.marginTop =  "5px";
   lblTileId =  (await Dom.func_Create( "span"  ,    tlabel,   ""));
   d =  (await Dom.func_Create( "div"  ,    tlabel));
   await Dom.sub_Create( "span"  ,    d,   "Animate");
   d.style.float =  "right";
   d.style.paddingRight =  "5px";
   d.style.whiteSpace =  "nowrap";
   chkTileAnimated =  (await Dom.func_Create( "input"  ,    d));
   chkTileAnimated.type =  "checkbox";
   chkTileAnimated.style.verticalAlign =  "bottom";
   chkTileAnimated.style.marginLeft =  "5px";
   chkTileAnimated.disabled =   true;
   await Dom.sub_Event(  chkTileAnimated,   "change"  ,    sub_OnChkAnimate);
   d =  (await Dom.func_Create( "div"  ,    rightPanel));
   d.style.display =  "none";
   d.style.gridTemplateColumns =  "auto 125px";
   d.style.height =  "115px";
   d.style.border =  "1px inset #fff";
   d.style.marginTop =  "5px";
   d.style.marginRight =  "5px";
   panelAnimate =   d;
   lstTileFrames =  (await Dom.func_Create( "select"  ,    d));
   lstTileFrames.size =   4;
   lstTileFrames.style.margin =  "10px";
   lstTileFrames.style.fontFamily =  "dosvga";
   lstTileFrames.style.fontSize =  "16px";
   await Dom.sub_Event(  lstTileFrames,   "change"  ,    sub_OnTileFrameChange);
   d =  (await Dom.func_Create( "div"  ,    d));
   d.style.padding =  "10px";
   d.style.paddingLeft =  "0";
   d2 =  (await Dom.func_Create( "div"  ,    d));
   d2.style.marginBottom =  "5px";
   d2.style.textAlign =  "right";
   await Dom.sub_Create( "span"  ,    d2,   "FPS: ");
   txtFPS =  (await Dom.func_Create( "input"  ,    d2));
   txtFPS.type =  "number";
   txtFPS.min =   1;
   txtFPS.style.width =  "40px";
   txtFPS.style.fontFamily =  "dosvga";
   txtFPS.style.fontSize =  "16px";
   await Dom.sub_Event(  txtFPS,   "change"  ,    sub_OnTileFPSChange);
   btnAddFrame =  (await Dom.func_Create( "button"  ,    d,   "Add Frame"));
   btnAddFrame.style.marginBottom =  "5px";
   btnAddFrame.style.width =  "115px";
   btnAddFrame.style.paddingTop =  "4px";
   btnAddFrame.style.paddingBottom =  "4px";
   btnAddFrame.style.fontFamily =  "dosvga";
   btnAddFrame.style.fontSize =  "16px";
   await Dom.sub_Event(  btnAddFrame,   "click"  ,    sub_OnAddFrame);
   btnRemoveFrame =  (await Dom.func_Create( "button"  ,    d,   "Remove Frame"));
   btnRemoveFrame.style.width =  "115px";
   btnRemoveFrame.style.paddingTop =  "4px";
   btnRemoveFrame.style.paddingBottom =  "4px";
   btnRemoveFrame.style.fontFamily =  "dosvga";
   btnRemoveFrame.style.fontSize =  "16px";
   btnRemoveFrame.disabled =   true;
   await Dom.sub_Event(  btnRemoveFrame,   "click"  ,    sub_OnRemoveFrame);
   resizePanel =  (await Dom.func_Create( "div"  ,    topPanel));
   resizePanel.style.position =  "absolute";
   resizePanel.style.right =  "0px";
   resizePanel.style.top =  "25px";
   resizePanel.style.padding =  "10px";
   var mlbl = {};  /* OBJECT */ var mbtn = {};  /* OBJECT */ var mp = {};  /* OBJECT */ 
   mlbl =  (await Dom.func_Create( "div"  ,    resizePanel,   "Resize Map"));
   mlbl.style.paddingBottom =  "15px";
   mp =  (await Dom.func_Create( "div"  ,    resizePanel));
   mp.style.paddingBottom =  "5px";
   mlbl =  (await Dom.func_Create( "span"  ,    mp,   "Columns:"));
   mlbl.style.display =  "inline-block";
   mlbl.style.width =  "70px";
   mlbl.style.color =  "#666";
   txtMapColumns =  (await Dom.func_Create( "input"  ,    mp));
   txtMapColumns.style.width =  "50px";
   txtMapColumns.style.fontFamily =  "dosvga";
   txtMapColumns.style.fontSize =  "16px";
   mp =  (await Dom.func_Create( "div"  ,    resizePanel));
   mp.style.paddingBottom =  "5px";
   mlbl =  (await Dom.func_Create( "span"  ,    mp,   "Rows:"));
   mlbl.style.display =  "inline-block";
   mlbl.style.width =  "70px";
   mlbl.style.color =  "#666";
   txtMapRows =  (await Dom.func_Create( "input"  ,    mp));
   txtMapRows.style.width =  "50px";
   txtMapRows.style.fontFamily =  "dosvga";
   txtMapRows.style.fontSize =  "16px";
   await Dom.sub_Create( "hr"  ,    resizePanel);
   mp =  (await Dom.func_Create( "div"  ,    resizePanel));
   btn =  (await Dom.func_Create( "button"  ,    mp,   "Resize Map"));
   btn.style.fontFamily =  "dosvga";
   btn.style.fontSize =  "16px";
   btn.style.marginRight =  "5px";
   await Dom.sub_Event(  btn ,   "click"  ,    sub_OnCommitMapResize);
   btn =  (await Dom.func_Create( "button"  ,    mp,   "Cancel"));
   btn.style.fontFamily =  "dosvga";
   btn.style.fontSize =  "16px";
   await Dom.sub_Event(  btn ,   "click"  ,    sub_OnCancelResize);
   resizePanel.style.display =  "none";
   await Dom.sub_Event(  txtMapRows,   "input"  ,    sub_MapResizeRefresh);
   await Dom.sub_Event(  txtMapColumns,   "input"  ,    sub_MapResizeRefresh);
   var statusPanel = 0;  /* SINGLE */ 
   statusPanel =  (await Dom.func_Create( "div"));
   statusPanel.style.border =  "1px solid #ccc";
   statusPanel.style.backgroundColor =  "#ddd";
   statusPanel.style.position =  "absolute";
   statusPanel.style.bottom =  "0px";
   statusPanel.style.right =  "0px";
   statusPanel.style.left =  "0px";
   statusBar =  (await Dom.func_Create( "div"  ,    statusPanel,   ""));
   statusBar.style.height =  "16px";
   statusBar.style.padding =  "4px";
   statusBar.style.color =  "#333";
   await Dom.sub_Event(  window ,   "resize"  ,    sub_ResizeControls);
   await sub_ResizeControls();
   var s = '';  /* STRING */ 
   var style = {};  /* OBJECT */ 
   QB.sub_Restore('CSS');
   style =  (await Dom.func_Create( "style"  ,    document.head));
   style.innerText =  (await func_ReadDataLines(  6));
   dlgNew =  (await Dom.func_Create( "dialog"));
   dlgNew.className =  "mm-dialog";
   QB.sub_Restore('DLG_CONTAINER');
   s =  (await func_ReadDataLines(  1))  + "Create New Map"  + (await func_ReadDataLines(  1));
   QB.sub_Restore('DLG_NEW');
   s =   s + (await func_ReadDataLines(  11));
   dlgNew.innerHTML =   s;
   await Dom.sub_Event( "new-load-tileset-image"  ,   "click"  ,    sub_OnUploadTileset);
   await Dom.sub_Event( "new-create-map"  ,   "click"  ,    sub_OnCreateMap);
   await Dom.sub_Event( "new-cancel"  ,   "click"  ,    sub_OnClose);
   dlgNew.columns =  (await Dom.func_Get( "new-columns"));
   dlgNew.rows =  (await Dom.func_Get( "new-rows"));
   dlgNew.layers =  (await Dom.func_Get( "new-layers"));
   dlgNew.tsImage =  (await Dom.func_Get( "new-tileset-image"));
   dlgNew.tsWidth =  (await Dom.func_Get( "new-tileset-width"));
   dlgNew.tsHeight =  (await Dom.func_Get( "new-tileset-height"));
   dlgNew.iso =  (await Dom.func_Get( "new-isometric"));
   dlgRTS =  (await Dom.func_Create( "dialog"));
   dlgRTS.className =  "mm-dialog";
   QB.sub_Restore('DLG_CONTAINER');
   s =  (await func_ReadDataLines(  1))  + "Replace Tileset Image"  + (await func_ReadDataLines(  1));
   QB.sub_Restore('DLG_RTS');
   s =   s + (await func_ReadDataLines(  8));
   dlgRTS.innerHTML =   s;
   dlgRTS.tsImage =  (await Dom.func_Get( "rts-tileset-image"));
   dlgRTS.tsWidth =  (await Dom.func_Get( "rts-tileset-width"));
   dlgRTS.tsHeight =  (await Dom.func_Get( "rts-tileset-height"));
   await Dom.sub_Event( "rts-load-tileset-image"  ,   "click"  ,    sub_OnUploadTileset);
   await Dom.sub_Event( "rts-replace-tileset"  ,   "click"  ,    sub_OnReplaceTileset);
   await Dom.sub_Event( "rts-cancel"  ,   "click"  ,    sub_OnClose);
   dlgAbout =  (await Dom.func_Create( "dialog"));
   dlgAbout.className =  "mm-dialog";
   QB.sub_Restore('DLG_CONTAINER');
   s =  (await func_ReadDataLines(  1))  + "About"  + (await func_ReadDataLines(  1));
   QB.sub_Restore('DLG_ABOUT');
   s =   s + (await func_ReadDataLines(  5));
   dlgAbout.innerHTML =   s;
   await Dom.sub_Event( "about-ok"  ,   "click"  ,    sub_OnClose);
   dlgMsg =  (await Dom.func_Create( "dialog"));
   dlgMsg.className =  "mm-dialog";
   QB.sub_Restore('DLG_MSG');
   dlgMsg.innerHTML =  (await func_ReadDataLines(  5));
   await Dom.sub_Event( "msg-ok"  ,   "click"  ,    sub_OnMsgClose);
}
async function sub_RefreshLayers() {
if (QB.halted()) { return; }; 
   layerContents.innerHTML =  "" ;;
   var l = 0;  /* INTEGER */ 
   var ___v453528 = 0; ___l7090379: for ( l=  1 ;  l <= GX.mapLayers();  l= l + 1) { if (QB.halted()) { return; } ___v453528++;   if (___v453528 % 100 == 0) { await QB.autoLimit(); }
      var tr = {};  /* OBJECT */ 
      tr =  (await func_AddLayerRow(  layerContents,    l));
      if ( l ==   selectedLayer) {
         tr.style.border =  "1px solid #666";
         tr.style.backgroundColor =  "#efefef";
      }
   } 
}
async function sub_SelectLayer(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   var element = {};  /* OBJECT */ 
   element =   event.target;
   if ( element.nodeName !=  "TD"  ) {
      element =   element.parentNode;
   }
   selectedLayer =   element.gxLayer;
   await sub_RefreshLayers();
}
async function func_AddLayerRow(tbody/*OBJECT*/,layer/*INTEGER*/,title/*STRING*/) {
if (QB.halted()) { return; }; layer = Math.round(layer); 
var AddLayerRow = null;
   var imgShow = '';  /* STRING */ var imgLock = '';  /* STRING */ 
   var tr = {};  /* OBJECT */ 
   tr =  (await Dom.func_Create( "tr"  ,    tbody));
   if ((GX.mapLayerVisible(  layer))  ) {
      imgShow =   imgLayerShow;
   } else {
      imgShow =   imgLayerHide;
   }
   if (QB.arrayValue(layerLocks, [ layer]).value  ) {
      imgLock =   imgLayerLock;
   } else {
      imgLock =   imgLayerUnlock;
   }
   await sub_AddLayerCell(  layer,    tr,    layer,    8);
   await sub_AddLayerCell(  layer,    tr,   "<"  + "img id='layer-show-"  +  layer + "' src='"  +  imgShow + "' width='16' title='Toggle Layer Visibility' style='cursor:pointer'/>"  ,    16);
   await sub_AddLayerCell(  layer,    tr,   "<"  + "img id='layer-lock-"  +  layer + "' src='"  +  imgLock + "' width='11' title='Lock the Layer for Edit' style='cursor:pointer'/>"  ,    14);
   var label = '';  /* STRING */ 
   if ( title ==   undefined ) {
      label =  "<i>Layer "  + (QB.func_Str(  layer))  + "</i>";
   } else {
      label =   title;
   }
   await sub_AddLayerCell(  layer,    tr,    label);
   await sub_AddLayerCell(  layer,    tr,   "<"  + "img id='layer-delete-"  +  layer + "' src='"  +  imgLayerDelete + "' width='16' title='Delete Layer' style='cursor:pointer'/>"  ,    16);
   AddLayerRow =   tr;
   var img = {};  /* OBJECT */ 
   img =  (await Dom.func_Get( "layer-show-"  +  layer));
   img.gxLayer =   layer;
   await Dom.sub_Event(  img,   "click"  ,    sub_OnClickLayerShow);
   img =  (await Dom.func_Get( "layer-lock-"  +  layer));
   img.gxLayer =   layer;
   await Dom.sub_Event(  img,   "click"  ,    sub_OnClickLayerLock);
   img =  (await Dom.func_Get( "layer-delete-"  +  layer));
   img.gxLayer =   layer;
   await Dom.sub_Event(  img,   "click"  ,    sub_OnClickLayerDelete);
return AddLayerRow;
}
async function sub_AddLayerCell(layer/*SINGLE*/,tr/*SINGLE*/,html/*SINGLE*/,width/*SINGLE*/) {
if (QB.halted()) { return; }; 
   var td = {};  /* OBJECT */ 
   td =  (await Dom.func_Create( "td"  ,    tr,    html));
   if ( width !=   undefined ) {
      td.style.width =   width + "px";
      td.style.textAlign =  "center";
   }
   td.style.border =  "1px inset #efefef";
   td.style.padding =  "2px 4px";
   td.style.cursor =  "default";
   td.gxLayer =   layer;
   await Dom.sub_Event(  td,   "click"  ,    sub_SelectLayer);
}
async function sub_ResizeControls(e/*SINGLE*/) {
if (QB.halted()) { return; }; 
   var twidth = 0;  /* INTEGER */ 
   twidth =   500;
   var maxwidth = 0;  /* INTEGER */ 
   var minwidth = 0;  /* INTEGER */ 
   minwidth =   300;
   maxwidth =  (await Dom.func_Container()) .clientWidth /  3;
   if ( maxwidth < minwidth) {
      maxwidth =   minwidth;
   }
   if ( twidth < minwidth) {
      twidth =   minwidth;
   } else if ( twidth >=  maxwidth) {
      twidth =   maxwidth;
   }
   tileset.style.width =   twidth + "px";
   tileset.style.height =  ((await Dom.func_Container()) .clientHeight -  tilePanelOffset)  + "px";
   resizePanel.style.width =  ( twidth -  16)  + "px";
   GX.sceneResize( (await Dom.func_Container()) .clientWidth -  twidth -  8 ,   (await Dom.func_Container()) .clientHeight -  54);
}
async function func_GetTilePosAt(x/*INTEGER*/,y/*INTEGER*/) {
if (QB.halted()) { return; }; x = Math.round(x); y = Math.round(y); 
var GetTilePosAt = null;
   var r = {x:0,y:0,width:0,height:0};  /* RECT */ 
   if (~GX.mapIsometric()) {
      r.x =  (QB.func_Fix( ( x + GX.sceneX())  / GX.tilesetWidth()));
      r.y =  (QB.func_Fix( ( y + GX.sceneY())  / GX.tilesetHeight()));
   } else {
      x =   x + GX.sceneX();
      y =   y + GX.sceneY();
      var tileWidthHalf = 0;  /* INTEGER */ 
      tileWidthHalf =  GX.tilesetWidth() /  2;
      var tileHeightHalf = 0;  /* INTEGER */ 
      tileHeightHalf =  GX.tilesetWidth() /  2;
      var sx = 0;  /* LONG */ 
      sx =   x /  tileWidthHalf;
      var offset = 0;  /* INTEGER */ 
      if ( sx %  2 ==   1 ) {
         offset =   tileWidthHalf;
      } else {
         offset =   0;
      }
      r.y =  (QB.func__Round( ( 2 *  y)  /  tileHeightHalf));
      r.x =  (QB.func__Round( ( x -  offset)  / GX.tilesetWidth()));
   }
   GetTilePosAt =   r;
return GetTilePosAt;
}
async function func_GetControlAtMousePos() {
if (QB.halted()) { return; }; 
var GetControlAtMousePos = null;
   var mx = 0;  /* LONG */ var my = 0;  /* LONG */ 
   mx =  QB.func__MouseX();
   my =  QB.func__MouseY();
   var mapRect = {};  /* OBJECT */ var tileRect = {};  /* OBJECT */ 
   mapRect =  (await func_GetBoundingRect( (await Dom.func_GetImage(  0))));
   tileRect =  (await func_GetBoundingRect( (await Dom.func_GetImage(  tilesetImage))));
   GetControlAtMousePos =   0;
   if ( mx > mapRect.Left &  mx < mapRect.Left +  mapRect.Width &  my > mapRect.Top &  my < mapRect.Top +  mapRect.Height ) {
      GetControlAtMousePos =   MAP;
   } else if ( mx > tileRect.Left &  mx < tileRect.Left +  tileRect.Width &  my > tileRect.Top &  my < tileRect.Top +  tileRect.Height ) {
      GetControlAtMousePos =   TILES;
   }
return GetControlAtMousePos;
}
async function sub_LoadMap(filename/*STRING*/) {
if (QB.halted()) { return; }; 
   await GX.mapLoad(  filename);
   await sub_UpdateMap( "_gxtmp/tileset.png");
}
async function sub_UpdateMap(tilesetPath/*SINGLE*/) {
if (QB.halted()) { return; }; 
   tilesetSource =  (await QB.func__LoadImage(  tilesetPath));
   await sub_ZoomTileset();
   var map = 0;  /* LONG */ 
   map =  (await Dom.func_GetImage(  0));
   map.style.cursor =  "none";
   mapLoaded =   GX.TRUE;
   await sub_RefreshLayers();
}
async function func_GetBoundingRect(element/*OBJECT*/) {
if (QB.halted()) { return; }; 
var GetBoundingRect = null;
   var rect = {};  /* OBJECT */ var prect = {};  /* OBJECT */ 
   //-------- BEGIN JS native code block --------
        rect = event.target.getBoundingClientRect();
        prect = container.getBoundingClientRect();
//-------- END JS native code block --------
   rect.Width =   rect.right -  rect.left;
   rect.Height =   rect.bottom ==   rect.top;
   rect.Left =   rect.left -  prect.left;
   rect.Top =   rect.top -  prect.top;
   GetBoundingRect =   rect;
return GetBoundingRect;
}
async function func_DataURL(filepath/*STRING*/) {
if (QB.halted()) { return; }; 
var DataURL = null;
   //-------- BEGIN JS native code block --------
        var vfs = GX.vfs();
        var file = vfs.getNode(filepath, vfs.rootDirectory());
        if (file) {
            DataURL = vfs.getDataURL(file);
        }
        else {
            DataURL = filepath;
        }
//-------- END JS native code block --------
return DataURL;
}
async function sub_PaintTiles() {
if (QB.halted()) { return; }; 
   if (QB.arrayValue(layerLocks, [ selectedLayer]).value  ) {
      return;
   }
   if (GX.mapIsometric()) {
      await sub_PutTileIso();
      return;
   }
   var mx = 0;  /* LONG */ var my = 0;  /* LONG */ var tx = 0;  /* LONG */ var ty = 0;  /* LONG */ var tile = 0;  /* LONG */ 
   mx =  (QB.func_Fix( (GX.mouseX() + GX.sceneX())  / GX.tilesetWidth()));
   my =  (QB.func_Fix( (GX.mouseY() + GX.sceneY())  / GX.tilesetHeight()));
   var ___v8626193 = 0; ___l4140327: for ( ty=  0 ;  ty <=  tileSel.height -  1;  ty= ty + 1) { if (QB.halted()) { return; } ___v8626193++;   if (___v8626193 % 100 == 0) { await QB.autoLimit(); }
      var ___v3735362 = 0; ___l7904800: for ( tx=  0 ;  tx <=  tileSel.width -  1;  tx= tx + 1) { if (QB.halted()) { return; } ___v3735362++;   if (___v3735362 % 100 == 0) { await QB.autoLimit(); }
         if ( mapSelMode) {
            tile =  (GX.mapTile(  tileSel.x +  tx,    tileSel.y +  ty,    selectedLayer));
            await Console.sub_Log(  tx + ","  +  ty + "-"  +  selectedLayer + ":"  +  tile);
         } else {
            tile =  ( tileSel.y +  ty)  * GX.tilesetColumns() +  tileSel.x +  tx +  1;
         }
         GX.mapTile(  mx +  tx,    my +  ty,    selectedLayer,    tile);
      } 
   } 
}
async function sub_PutTileIso() {
if (QB.halted()) { return; }; 
   var x = 0;  /* INTEGER */ var y = 0;  /* INTEGER */ var sx = 0;  /* INTEGER */ 
   var tx = 0;  /* INTEGER */ var ty = 0;  /* INTEGER */ 
   var tile = 0;  /* INTEGER */ 
   var tpos = {x:0,y:0};  /* GXPOSITION */ 
   tpos =  (await func_GetTilePosAt( QB.func__MouseX(),   QB.func__MouseY()));
   await sub_SetStatus( "("  + (QB.func_Str(  tpos.x))  + ","  + (QB.func_Str(  tpos.y))  + ")");
   sx =   tpos.x;
   y =   tpos.y;
   var ___v8714458 = 0; ___l9619532: for ( ty=  0 ;  ty <=  tileSel.height -  1;  ty= ty + 1) { if (QB.halted()) { return; } ___v8714458++;   if (___v8714458 % 100 == 0) { await QB.autoLimit(); }
      x =   sx;
      var ___v9495566 = 0; ___l562369: for ( tx=  0 ;  tx <=  tileSel.width -  1;  tx= tx + 1) { if (QB.halted()) { return; } ___v9495566++;   if (___v9495566 % 100 == 0) { await QB.autoLimit(); }
         if ( mapSelMode) {
            tile =  (GX.mapTile(  tileSel.x +  tx,    tileSel.y +  ty,    selectedLayer));
         } else {
            tile =  ( tileSel.y +  ty)  * GX.tilesetColumns() +  tileSel.x +  tx +  1;
         }
         GX.mapTile(  x,    y,    selectedLayer,    tile);
         x =   x +  1;
      } 
      y =   y +  1;
   } 
}
async function sub_DeleteTiles() {
if (QB.halted()) { return; }; 
   if (QB.arrayValue(layerLocks, [ selectedLayer]).value  ) {
      return;
   }
   if (~GX.mapIsometric()) {
      var mx = 0;  /* LONG */ var my = 0;  /* LONG */ var tx = 0;  /* LONG */ var ty = 0;  /* LONG */ var tile = 0;  /* LONG */ 
      mx =  (QB.func_Fix( (GX.mouseX() + GX.sceneX())  / GX.tilesetWidth()));
      my =  (QB.func_Fix( (GX.mouseY() + GX.sceneY())  / GX.tilesetHeight()));
      var ___v5248684 = 0; ___l3640187: for ( ty=  0 ;  ty <=  tileSel.height -  1;  ty= ty + 1) { if (QB.halted()) { return; } ___v5248684++;   if (___v5248684 % 100 == 0) { await QB.autoLimit(); }
         var ___v535045 = 0; ___l7671117: for ( tx=  0 ;  tx <=  tileSel.width -  1;  tx= tx + 1) { if (QB.halted()) { return; } ___v535045++;   if (___v535045 % 100 == 0) { await QB.autoLimit(); }
            tile =  ( tileSel.y +  ty)  * GX.tilesetColumns() +  tileSel.x +  tx +  1;
            GX.mapTile(  mx +  tx,    my +  ty,    selectedLayer,    0);
         } 
      } 
   } else {
      var tpos = {x:0,y:0,width:0,height:0};  /* RECT */ 
      tpos =  (await func_GetTilePosAt( QB.func__MouseX(),   QB.func__MouseY()));
      GX.mapTile(  tpos.x ,    tpos.y ,    selectedLayer,    0);
   }
}
async function sub_DrawMapCursor() {
if (QB.halted()) { return; }; 
   var tx = 0;  /* INTEGER */ var ty = 0;  /* INTEGER */ var cx = 0;  /* INTEGER */ var cy = 0;  /* INTEGER */ 
   var ccolor = 0;  /* _UNSIGNED LONG */ 
   var cstyle = 0;  /* INTEGER */ var cstyle2 = 0;  /* INTEGER */ 
   if (~GX.mapIsometric()) {
      if ( mapSelSizing) {
         tx =   tileSel.x;
         ty =   tileSel.y;
         cx =   tx * GX.tilesetWidth() - GX.sceneX();
         cy =   ty * GX.tilesetHeight() - GX.sceneY();
      } else {
         tx =  (QB.func_Fix( GX.mouseX() / GX.tilesetWidth()));
         ty =  (QB.func_Fix( GX.mouseY() / GX.tilesetHeight()));
         cx =   tx * GX.tilesetWidth();
         cy =   ty * GX.tilesetHeight();
      }
      w =   tileSel.width * GX.tilesetWidth();
      h =   tileSel.height * GX.tilesetHeight();
      await Gfx.sub_LineWidth(  2 /  scale);
      await Gfx.sub_InvertRect(  cx,    cy,    w ,    h);
   } else {
      var cstyle = 0;  /* INTEGER */ 
      cstyle =   QB.func_Val('&B1010101010101010') ;
      var tpos = {x:0,y:0,width:0,height:0};  /* RECT */ 
      tpos =  (await func_GetTilePosAt( QB.func__MouseX(),   QB.func__MouseY()));
      var columnOffset = 0;  /* LONG */ 
      if ( tpos.y %  2 ==   1 ) {
         columnOffset =   0;
      } else {
         columnOffset =  GX.tilesetWidth() /  2;
      }
      var rowOffset = 0;  /* LONG */ 
      rowOffset =  ( tpos.y +  1)  * (QB.func__Round( GX.tilesetHeight() - GX.tilesetWidth() /  4));
      var tx = 0;  /* LONG */ var ty = 0;  /* LONG */ var topY = 0;  /* LONG */ var midY = 0;  /* LONG */ var midX = 0;  /* LONG */ var rightX = 0;  /* LONG */ var bottomY = 0;  /* LONG */ var halfWidth = 0;  /* LONG */ 
      tx =  (QB.func__Round(  tpos.x * GX.tilesetWidth() -  columnOffset - GX.sceneX()));
      ty =  (QB.func__Round(  tpos.y * GX.tilesetHeight() -  rowOffset - GX.sceneY()));
      topY =   ty + (GX.tilesetHeight() - GX.tilesetWidth() /  2);
      midY =   ty + (GX.tilesetHeight() - GX.tilesetWidth() /  4);
      midX =   tx + GX.tilesetWidth() /  2;
      rightX =   tx + GX.tilesetWidth() *  1;
      bottomY =   ty + GX.tilesetHeight() *  1;
      halfWidth =  GX.tilesetWidth() /  2;
      ccolor =  (QB.func__RGB(  200 ,    200 ,    200));
      QB.sub_Line(false,  tx ,   midY -  halfWidth, false,  tx ,   midY,    ccolor, undefined,    cstyle);
      QB.sub_Line(false,  rightX ,   midY -  halfWidth, false,  rightX ,   midY,    ccolor, undefined,    cstyle);
      QB.sub_Line(false,  midX ,   topY -  halfWidth, false,  midX ,   bottomY,    ccolor, undefined,    cstyle);
      QB.sub_Line(false,  tx ,   midY -  halfWidth, false,  midX ,   topY -  halfWidth,    ccolor, undefined,    cstyle);
      QB.sub_Line(false,  midX ,   topY -  halfWidth, false,  rightX ,   midY -  halfWidth,    ccolor, undefined,    cstyle);
      QB.sub_Line(false,  rightX ,   midY -  halfWidth, false,  midX ,   bottomY -  halfWidth,    ccolor, undefined,    cstyle);
      QB.sub_Line(false,  midX ,   bottomY -  halfWidth, false,  tx ,   midY -  halfWidth,    ccolor, undefined,    cstyle);
      QB.sub_Line(false,  tx ,   midY, false,  midX ,   topY,    ccolor, undefined, undefined);
      QB.sub_Line(false,  midX ,   topY, false,  rightX ,   midY,    ccolor, undefined, undefined);
      QB.sub_Line(false,  rightX ,   midY, false,  midX ,   bottomY,    ccolor, undefined, undefined);
      QB.sub_Line(false,  midX ,   bottomY, false,  tx ,   midY,    ccolor, undefined, undefined);
   }
   if (~ mapSelSizing) {
      await sub_DrawMapSelection();
   }
}
async function sub_DrawMapSelection() {
if (QB.halted()) { return; }; 
   if (~ mapSelMode) {
      return;
   }
   if (~GX.mapIsometric()) {
      var x = 0;  /* INTEGER */ var y = 0;  /* INTEGER */ var w = 0;  /* INTEGER */ var h = 0;  /* INTEGER */ 
      x =   tileSel.x * GX.tilesetWidth() - GX.sceneX();
      y =   tileSel.y * GX.tilesetHeight() - GX.sceneY();
      w =   tileSel.width * GX.tilesetWidth();
      h =   tileSel.height * GX.tilesetHeight();
      QB.sub_Line(false,  x ,   y, true,  w ,   h,    14 , 'B', undefined);
   } else {
      var cstyle = 0;  /* INTEGER */ 
      cstyle =   QB.func_Val('&B1010101010101010') ;
      var columnOffset = 0;  /* LONG */ 
      if ( tileSel.y %  2 ==   1 ) {
         columnOffset =   0;
      } else {
         columnOffset =  GX.tilesetWidth() /  2;
      }
      var rowOffset = 0;  /* LONG */ 
      rowOffset =  ( tileSel.y +  1)  * (QB.func__Round( GX.tilesetHeight() - GX.tilesetWidth() /  4));
      var tx = 0;  /* LONG */ var ty = 0;  /* LONG */ var topY = 0;  /* LONG */ var midY = 0;  /* LONG */ var midX = 0;  /* LONG */ var rightX = 0;  /* LONG */ var bottomY = 0;  /* LONG */ var halfWidth = 0;  /* LONG */ 
      tx =  (QB.func__Round(  tileSel.x * GX.tilesetWidth() -  columnOffset - GX.sceneX()));
      ty =  (QB.func__Round(  tileSel.y * GX.tilesetHeight() -  rowOffset - GX.sceneY()));
      topY =   ty + (GX.tilesetHeight() - GX.tilesetWidth() /  2);
      midY =   ty + (GX.tilesetHeight() - GX.tilesetWidth() /  4);
      midX =   tx + GX.tilesetWidth() /  2;
      rightX =   tx + GX.tilesetWidth() *  1;
      bottomY =   ty + GX.tilesetHeight() *  1;
      halfWidth =  GX.tilesetWidth() /  2;
      ccolor =   14;
      QB.sub_Line(false,  tx ,   midY -  halfWidth, false,  tx ,   midY,    ccolor , undefined,    cstyle);
      QB.sub_Line(false,  rightX ,   midY -  halfWidth, false,  rightX ,   midY,    ccolor , undefined,    cstyle);
      QB.sub_Line(false,  midX ,   topY -  halfWidth, false,  midX ,   bottomY,    ccolor , undefined,    cstyle);
      QB.sub_Line(false,  tx ,   midY -  halfWidth, false,  midX ,   topY -  halfWidth,    ccolor , undefined,    cstyle);
      QB.sub_Line(false,  midX ,   topY -  halfWidth, false,  rightX ,   midY -  halfWidth,    ccolor , undefined,    cstyle);
      QB.sub_Line(false,  rightX ,   midY -  halfWidth, false,  midX ,   bottomY -  halfWidth,    ccolor , undefined,    cstyle);
      QB.sub_Line(false,  midX ,   bottomY -  halfWidth, false,  tx ,   midY -  halfWidth,    ccolor , undefined,    cstyle);
      QB.sub_Line(false,  tx ,   midY, false,  midX ,   topY,    ccolor, undefined, undefined);
      QB.sub_Line(false,  midX ,   topY, false,  rightX ,   midY,    ccolor, undefined, undefined);
      QB.sub_Line(false,  rightX ,   midY, false,  midX ,   bottomY,    ccolor, undefined, undefined);
      QB.sub_Line(false,  midX ,   bottomY, false,  tx ,   midY,    ccolor, undefined, undefined);
   }
}
async function sub_DrawTileset() {
if (QB.halted()) { return; }; 
   QB.sub__Source(  tilesetImage);
   QB.sub__Dest(  tilesetImage);
   QB.sub_Cls(undefined, undefined);
   QB.sub__PutImage(false, undefined, undefined, false, undefined, undefined,    tilesetSource, undefined, false, undefined, undefined, false, undefined, undefined, false);
   if (~ mapSelMode) {
      var x = 0;  /* INTEGER */ var y = 0;  /* INTEGER */ var w = 0;  /* INTEGER */ var h = 0;  /* INTEGER */ 
      x =   tileSel.x * GX.tilesetWidth() *  tscale;
      y =   tileSel.y * GX.tilesetHeight() *  tscale;
      w =   tileSel.width * GX.tilesetWidth() *  tscale;
      h =   tileSel.height * GX.tilesetHeight() *  tscale;
      QB.sub_Line(false,  x ,   y, true,  w ,   h,    14 , 'B', undefined);
      if ( lstTileFrames.selectedIndex > 0 ) {
         var tile = 0;  /* INTEGER */ var dx = 0;  /* INTEGER */ var dy = 0;  /* INTEGER */ 
         tile =   lstTileFrames.value;
         dy =  (QB.func_Fix(  tile / GX.tilesetColumns()));
         dx =   tile %GX.tilesetColumns() -  1;
         x =   dx * GX.tilesetWidth() *  tscale;
         y =   dy * GX.tilesetHeight() *  tscale;
         await sub_SetStatus(  tile);
         QB.sub_Line(false,  x ,   y, true,  w ,   h,    11 , 'B', undefined);
      }
   }
   x =   tsCursor.x * GX.tilesetWidth() *  tscale;
   y =   tsCursor.y * GX.tilesetHeight() *  tscale;
   w =   tsCursor.width * GX.tilesetWidth() *  tscale;
   h =   tsCursor.height * GX.tilesetHeight() *  tscale;
   await Gfx.sub_InvertRect(  x,    y,    w,    h);
   QB.sub__Source(  0);
   QB.sub__Dest(  0);
}
async function sub_SetStatus(text/*STRING*/) {
if (QB.halted()) { return; }; 
   statusBar.innerHTML =   text;
}
async function sub_OnAddLayer() {
if (QB.halted()) { return; }; 
   GX.mapLayerAdd();
   await sub_RefreshLayers();
}
async function sub_OnInsertLayer() {
if (QB.halted()) { return; }; 
   GX.mapLayerInsert(  selectedLayer);
   await sub_RefreshLayers();
}
async function sub_OnClickLayerShow(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   var layer = 0;  /* INTEGER */ 
   layer =   event.target.gxLayer;
   GX.mapLayerVisible(  layer,   ~(GX.mapLayerVisible(  layer)));
}
async function sub_OnClickLayerLock(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   var layer = 0;  /* INTEGER */ 
   layer =   event.target.gxLayer;
   QB.arrayValue(layerLocks, [ layer]).value =  ~QB.arrayValue(layerLocks, [ layer]).value;
   await sub_RefreshLayers();
}
async function sub_OnClickLayerDelete(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   var layer = 0;  /* INTEGER */ 
   layer =   event.target.gxLayer;
   if ((await Dom.func_Confirm( "This will permanently delete the layer. Continue?"))  ) {
      GX.mapLayerRemove(  layer);
      await sub_RefreshLayers();
   }
}
async function sub_OnTilesetReplace() {
if (QB.halted()) { return; }; 
   dlgRTS.tsWidth.value =  GX.tilesetWidth();
   dlgRTS.tsHeight.value =  GX.tilesetHeight();
   dlgRTS.tsImage.value =  "";
   await sub_ShowDialog(  dlgRTS);
}
async function sub_OnTilesetZoomIn() {
if (QB.halted()) { return; }; 
   tscale =   tscale +  1;
   await MNU.sub_EnableMenuItem(  mnuTSZoomOut,    GX.TRUE);
   await sub_ZoomTileset();
}
async function sub_OnTilesetZoomOut() {
if (QB.halted()) { return; }; 
   if ( tscale > 1 ) {
      tscale =   tscale -  1;
   }
   if ( tscale ==   1 ) {
      await MNU.sub_EnableMenuItem(  mnuTSZoomOut,    GX.FALSE);
   }
   await sub_ZoomTileset();
}
async function sub_ZoomTileset() {
if (QB.halted()) { return; }; 
   var w = 0;  /* INTEGER */ var h = 0;  /* INTEGER */ 
   w =  (QB.func__Width(  tilesetSource))  *  tscale;
   h =  (QB.func__Height(  tilesetSource))  *  tscale;
   var oldImg = {};  /* OBJECT */ var newImg = {};  /* OBJECT */ 
   oldImg =  (await Dom.func_GetImage(  tilesetImage));
   tilesetImage =  (QB.func__NewImage(  w,    h));
   newImg =  (await Dom.func_GetImage(  tilesetImage));
   await Dom.sub_Remove(  oldImg);
   await Dom.sub_Add(  newImg,    tileset);
}
async function sub_OnTilesetSelStart(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   mapSelMode =   GX.FALSE;
   tileSel.x =   tsCursor.x;
   tileSel.y =   tsCursor.y;
   tileSel.width =   1;
   tileSel.height =   1;
   tileSel.sizing =   GX.TRUE;
}
async function sub_OnTilesetSelEnd(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   tileSel.sizing =   GX.FALSE;
   if ( animationMode) {
      var tile = 0;  /* INTEGER */ var firstTileId = 0;  /* INTEGER */ 
      firstTileId =   lblTileId.innerHTML;
      tile =  ( tileSel.y)  * GX.tilesetColumns() +  tileSel.x +  1;
      GX.tilesetAnimationAdd(  firstTileId,    tile);
      tileSel.x =   tileSelBack.x;
      tileSel.y =   tileSelBack.y;
   }
   await sub_UpdateSelectedTile();
}
async function sub_OnTileFPSChange() {
if (QB.halted()) { return; }; 
   GX.tilesetAnimationSpeed(  lblTileId.innerHTML ,    txtFPS.value);
}
async function sub_OnTileFrameChange() {
if (QB.halted()) { return; }; 
   if ( lstTileFrames.selectedIndex > 0 ) {
      btnRemoveFrame.disabled =   false;
   } else {
      btnRemoveFrame.disabled =   true;
   }
}
async function sub_UpdateSelectedTile() {
if (QB.halted()) { return; }; 
   if ( tileSel.width > 1 |  tileSel.height > 1 |  mapSelMode) {
      lblTileId.innerHTML =  "";
      chkTileAnimated.checked =   false;
      chkTileAnimated.disabled =   true;
      tilePanelOffset =   330;
   } else {
      var tile = 0;  /* INTEGER */ 
      tile =  ( tileSel.y)  * GX.tilesetColumns() +  tileSel.x +  1;
      lblTileId.innerHTML =   tile;
      var frames = QB.initArray([{l:0,u:0}], 0);  /* INTEGER */ 
      var fcount = 0;  /* INTEGER */ 
      fcount =  (GX.tilesetAnimationFrames(  tile,    frames));
      chkTileAnimated.disabled =   false;
      if ( fcount > 0 ) {
         chkTileAnimated.checked =   true;
         panelAnimate.style.display =  "grid";
         tilePanelOffset =   450;
         lstTileFrames.innerHTML =  "";
         var i = 0;  /* INTEGER */ 
         var s = '';  /* STRING */ 
         var ___v4687001 = 0; ___l5924582: for ( i=  1 ;  i <=  fcount;  i= i + 1) { if (QB.halted()) { return; } ___v4687001++;   if (___v4687001 % 100 == 0) { await QB.autoLimit(); }
            var opt = {};  /* OBJECT */ 
            opt =  (await Dom.func_Create( "option"));
            opt.value =  QB.arrayValue(frames, [ i]).value;
            opt.innerHTML =  (QB.func_Right( "   "  +  i,    3))  + " : "  + QB.arrayValue(frames, [ i]).value;
            opt.style.paddingLeft =  "5px";
            opt.style.paddingTop =  "2px";
            opt.style.whiteSpace =  "pre";
            await Dom.sub_Add(  opt,    lstTileFrames);
         } 
      } else {
         chkTileAnimated.checked =   false;
         panelAnimate.style.display =  "none";
         tilePanelOffset =   330;
      }
      txtFPS.value =  (GX.tilesetAnimationSpeed(  tile));
      if ( animationMode) {
         animationMode =   GX.FALSE;
         lstTileFrames.selectedIndex =   fcount -  1;
         btnRemoveFrame.disabled =   false;
      } else {
         btnRemoveFrame.disabled =   true;
      }
      await sub_ResizeControls();
   }
}
async function sub_OnTilesetMouseMove(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   if (~ mapLoaded) {
      return;
   }
   tsCursor.x =  (QB.func_Fix(  event.offsetX / (GX.tilesetWidth() *  tscale)));
   tsCursor.y =  (QB.func_Fix(  event.offsetY / (GX.tilesetHeight() *  tscale)));
   if ( tileSel.sizing ) {
      if (~GX.mapIsometric()) {
         tileSel.width =   tsCursor.x -  tileSel.x +  1;
         tileSel.height =   tsCursor.y -  tileSel.y +  1;
         if ( tileSel.width < 1 ) {
            tileSel.width =   1;
         }
         if ( tileSel.height < 1 ) {
            tileSel.height =   1;
         }
      }
   }
}
async function sub_OnMapMouseDown(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   if ((GX.keyDown(  GX.KEY_LSHIFT))  | (GX.keyDown(  GX.KEY_RSHIFT))  ) {
      mapSelMode =   GX.TRUE;
      mapSelSizing =   GX.TRUE;
      var r = {x:0,y:0,width:0,height:0};  /* RECT */ 
      r =  (await func_GetTilePosAt( QB.func__MouseX(),   QB.func__MouseY()));
      await Console.sub_Log( "s: "  +  r.x + ", "  +  r.y);
      tileSel.x =   r.x;
      tileSel.y =   r.y;
      tileSel.width =   1;
      tileSel.height =   1;
   } else {
      painting =   GX.TRUE;
   }
}
async function sub_OnMapMouseUp(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   if ( mapSelSizing) {
      mapSelSizing =   GX.FALSE;
      r =  (await func_GetTilePosAt( QB.func__MouseX(),   QB.func__MouseY()));
      await Console.sub_Log( "e: "  +  r.x + ", "  +  r.y);
      tileSel.width =   r.x -  tileSel.x +  1;
      tileSel.height =   r.y -  tileSel.y +  1;
      await sub_UpdateSelectedTile();
   } else {
      painting =   GX.FALSE;
   }
}
async function sub_OnNew() {
if (QB.halted()) { return; }; 
   dlgNew.columns.value =   100;
   dlgNew.rows.value =   100;
   dlgNew.layers.value =   1;
   dlgNew.tsImage.value =  "";
   dlgNew.tsWidth.value =   16;
   dlgNew.tsHeight.value =   16;
   dlgNew.iso.checked =   false;
   await sub_ShowDialog(  dlgNew);
}
async function sub_OnCreateMap() {
if (QB.halted()) { return; }; 
   var iso = 0;  /* INTEGER */ 
   if ( dlgNew.iso.checked ) {
      iso =   GX.TRUE;
   }
   await Console.sub_Log( "Columns: "  +  dlgNew.columns.value);
   await Console.sub_Log( "Rows:    "  +  dlgNew.rows.value);
   await Console.sub_Log( "Layers:  "  +  dlgNew.layers.value);
   await Console.sub_Log( "Image:   "  +  dlgNew.tsImage.value);
   await Console.sub_Log( "Width:   "  +  dlgNew.tsWidth.value);
   await Console.sub_Log( "Height:  "  +  dlgNew.tsHeight.value);
   await Console.sub_Log( "ISO:     "  +  iso);
   if ((QB.func_Val(  dlgNew.columns.value))  < 1 ) {
      await sub_MsgBox( "Please specify a value greater than 0."  ,   "Invalid Entry for Columns");
      return;
   } else if ((QB.func_Val(  dlgNew.rows.value))  < 1 ) {
      await sub_MsgBox( "Please specify a value greater than 0."  ,   "Invalid Entry for Rows");
      return;
   } else if ((QB.func_Val(  dlgNew.layers.value))  < 1 ) {
      await sub_MsgBox( "Please specify a value greater than 0."  ,   "Invalid Entry for Layers");
      return;
   } else if ( dlgNew.tsImage.value ==  ""  ) {
      await sub_MsgBox( "Please select a Tileset Image."  ,   "Tileset Image is Required");
      return;
   } else if ((QB.func_Val(  dlgNew.tsWidth.value))  < 1 ) {
      await sub_MsgBox( "Please specify a value greater than 0."  ,   "Invalid Entry for Tileset Width");
      return;
   } else if ((QB.func_Val(  dlgNew.tsHeight.value))  < 1 ) {
      await sub_MsgBox( "Please specify a value greater than 0."  ,   "Invalid Entry for Tileset Height");
      return;
   }
   await GX.tilesetCreate( "/_gxtmp/"  +  dlgNew.tsImage.value ,    dlgNew.tsWidth.value ,    dlgNew.tsHeight.value);
   GX.mapCreate(  dlgNew.columns.value ,    dlgNew.rows.value ,    dlgNew.layers.value);
   if ( dlgNew.iso.checked ) {
      GX.mapIsometric(  GX.TRUE);
   } else {
      GX.mapIsometric(  GX.FALSE);
   }
   await sub_UpdateMap( "_gxtmp/"  +  dlgNew.tsImage.value);
   QB.sub_MkDir( "map");
   mapFilename =  "map/newmap.gxm";
   mapLoaded =   GX.TRUE;
   await sub_ResetMap();
   await sub_OnClose();
}
async function sub_OnReplaceTileset() {
if (QB.halted()) { return; }; 
   await Console.sub_Log( "Image:  "  +  dlgRTS.tsImage.value);
   await Console.sub_Log( "Width:  "  +  dlgRTS.tsWidth.value);
   await Console.sub_Log( "Height: "  +  dlgRTS.tsHeight.value);
   if ( dlgRTS.tsImage.value ==  ""  ) {
      await sub_MsgBox( "Please select a Tileset Image."  ,   "Tileset Image is Required");
      return;
   } else if ((QB.func_Val(  dlgRTS.tsWidth.value))  < 1 ) {
      await sub_MsgBox( "Please specify a value greater than 0."  ,   "Invalid Entry for Tileset Width");
      return;
   } else if ((QB.func_Val(  dlgRTS.tsHeight.value))  < 1 ) {
      await sub_MsgBox( "Please specify a value greater than 0."  ,   "Invalid Entry for Tileset Height");
      return;
   }
   await GX.tilesetCreate( "/_gxtmp/"  +  dlgRTS.tsImage.value ,    dlgRTS.tsWidth.value ,    dlgRTS.tsHeight.value);
   tilesetSource =  (await QB.func__LoadImage( "/_gxtmp/"  +  dlgRTS.tsImage.value));
   await sub_ZoomTileset();
   await sub_OnClose();
}
async function sub_OnOpen() {
if (QB.halted()) { return; }; 
   QB.sub_MkDir( "map");
   await FS.sub_UploadFile( "map"  ,   ".gxm"  ,    sub_OnOpenComplete);
}
async function sub_OnOpenComplete(fullpath/*STRING*/) {
if (QB.halted()) { return; }; 
   mapFilename =   fullpath;
   await sub_LoadMap(  fullpath);
   await sub_SetStatus( "Map loaded.");
   QB.sub_Kill(  fullpath);
   await sub_ResetMap();
}
async function sub_ResetMap() {
if (QB.halted()) { return; }; 
   GX.scenePos(  0 ,    0);
   await MNU.sub_EnableMenuItem(  mnuSave,    GX.TRUE);
   await MNU.sub_EnableMenuItem(  mnuMapZoomIn,    GX.TRUE);
   if ( scale > 1 ) {
      await MNU.sub_EnableMenuItem(  mnuMapZoomOut,    GX.TRUE);
   }
   await MNU.sub_EnableMenuItem(  mnuMapResize,    GX.TRUE);
   await MNU.sub_EnableMenuItem(  mnuTSReplace,    GX.TRUE);
   await MNU.sub_EnableMenuItem(  mnuTSZoomIn,    GX.TRUE);
   if ( tscale > 1 ) {
      await MNU.sub_EnableMenuItem(  mnuTSZoomOut,    GX.TRUE);
   }
   QB.resizeArray(layerLocks, [{l:0,u:GX.mapLayers()}], 0, false);  /* INTEGER */ 
}
async function sub_OnSave() {
if (QB.halted()) { return; }; 
   GX.mapSave(  mapFilename);
   await FS.sub_DownloadFile(  mapFilename);
   await sub_SetStatus( "Map saved.");
}
async function sub_OnHelpView() {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
        window.open("https://github.com/boxgaming/gx/wiki/Map-Maker", "_blank");
//-------- END JS native code block --------
}
async function sub_OnHelpAbout() {
if (QB.halted()) { return; }; 
   await sub_ShowDialog(  dlgAbout);
}
async function sub_OnMapZoomIn() {
if (QB.halted()) { return; }; 
   scale =   scale +  1;
   await MNU.sub_EnableMenuItem(  mnuMapZoomOut,    GX.TRUE);
   GX.sceneScale(  scale);
   await sub_ResizeControls();
}
async function sub_OnMapZoomOut() {
if (QB.halted()) { return; }; 
   if ( scale > 1 ) {
      scale =   scale -  1;
   }
   if ( scale ==   1 ) {
      await MNU.sub_EnableMenuItem(  mnuMapZoomOut,    GX.FALSE);
   }
   GX.sceneScale(  scale);
   await sub_ResizeControls();
}
async function sub_OnMapResize() {
if (QB.halted()) { return; }; 
   txtMapColumns.value =  GX.mapColumns();
   txtMapRows.value =  GX.mapRows();
   resizing =   GX.TRUE;
   rightPanel.style.display =  "none";
   resizePanel.style.display =  "block";
   //-------- BEGIN JS native code block --------
        QB.end();
//-------- END JS native code block --------
   GX.sceneStop();
   GX.sceneDraw();
}
async function sub_OnCommitMapResize() {
if (QB.halted()) { return; }; 
   GX.mapResize(  txtMapColumns.value ,    txtMapRows.value);
   await sub_OnCancelResize();
}
async function sub_MapResizeRefresh() {
if (QB.halted()) { return; }; 
   GX.sceneDraw();
}
async function sub_OnCancelResize() {
if (QB.halted()) { return; }; 
   resizing =   GX.FALSE;
   rightPanel.style.display =  "block";
   resizePanel.style.display =  "none";
   await GX.sceneStart();
}
async function sub_OnChkAnimate() {
if (QB.halted()) { return; }; 
   var firstTileId = 0;  /* INTEGER */ 
   firstTileId =   lblTileId.innerHTML;
   if ( chkTileAnimated.checked ) {
      GX.tilesetAnimationCreate(  firstTileId,    5);
   } else {
      GX.tilesetAnimationRemove(  firstTileId);
   }
   await sub_UpdateSelectedTile();
}
async function sub_OnAddFrame() {
if (QB.halted()) { return; }; 
   animationMode =   GX.TRUE;
   tileSelBack.x =   tileSel.x;
   tileSelBack.y =   tileSel.y;
}
async function sub_OnRemoveFrame() {
if (QB.halted()) { return; }; 
   var firstTileId = 0;  /* INTEGER */ var tileId = 0;  /* INTEGER */ 
   //-------- BEGIN JS native code block --------
    firstTileId = lstTileFrames.options[0].value;
    GX.tilesetAnimationRemove(firstTileId);
    GX.tilesetAnimationCreate(firstTileId, txtFPS.value);
    for (var i=1; i < lstTileFrames.options.length; i++) {
        var tileId = lstTileFrames.options[i].value;
        if (i != lstTileFrames.selectedIndex) {
            GX.tilesetAnimationAdd(firstTileId, tileId);
        }
    }
//-------- END JS native code block --------
   await sub_UpdateSelectedTile();
}
async function func_ReadDataLines(lines/*INTEGER*/) {
if (QB.halted()) { return; }; lines = Math.round(lines); 
var ReadDataLines = null;
   var text = '';  /* STRING */ var s = '';  /* STRING */ 
   var i = 0;  /* INTEGER */ 
   var ___v6226967 = 0; ___l2981654: for ( i=  1 ;  i <=  lines;  i= i + 1) { if (QB.halted()) { return; } ___v6226967++;   if (___v6226967 % 100 == 0) { await QB.autoLimit(); }
      var ___v6478212 = new Array( 1); QB.sub_Read(___v6478212);  s = ___v6478212[ 0]; 
      text =   text +  s;
   } 
   ReadDataLines =   text;
return ReadDataLines;
}
async function sub_OnUploadTileset(event/*OBJECT*/) {
if (QB.halted()) { return; }; 
   QB.sub_MkDir( "_gxtmp");
   txtTSImage =   event.target.previousSibling;
   await FS.sub_UploadFile( "_gxtmp"  ,   ".png"  ,    sub_OnTilesetUploadComplete);
}
async function sub_OnTilesetUploadComplete(filename/*STRING*/) {
if (QB.halted()) { return; }; 
   txtTSImage.value =  (QB.func_Mid(  filename,    9));
}
async function sub_MsgBox(msgText/*STRING*/,msgTitle/*STRING*/) {
if (QB.halted()) { return; }; 
   var mtext = {};  /* OBJECT */ var mtitle = {};  /* OBJECT */ 
   mtext =  (await Dom.func_Get( "msg-body"));
   mtext.innerHTML =   msgText;
   if ( msgTitle) {
      mtitle =  (await Dom.func_Get( "msg-title"));
      mtitle.innerHTML =   msgTitle;
   }
   //-------- BEGIN JS native code block --------
    dlgMsg.showModal();
//-------- END JS native code block --------
}
async function sub_ShowDialog(currDlg/*OBJECT*/) {
if (QB.halted()) { return; }; 
   dlg =   currDlg;
   //-------- BEGIN JS native code block --------
    dlg.showModal();
    QB.end();
//-------- END JS native code block --------
   GX.sceneStop();
}
async function sub_OnClose() {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
    dlg.close();
//-------- END JS native code block --------
   await GX.sceneStart();
}
async function sub_OnMsgClose() {
if (QB.halted()) { return; }; 
   //-------- BEGIN JS native code block --------
    dlgMsg.close();
//-------- END JS native code block --------
}

}