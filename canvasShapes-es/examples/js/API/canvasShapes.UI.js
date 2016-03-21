/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.UI.js' (METHODS) Métodos de construcción de toda la GUI de la librería "PolyArea".
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.UI.js' (METHODS) Métodos de construcción de toda la GUI de la librería "PolyArea".
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: UI
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    /** Función interna privada para establecer el canvas. Se utiliza en el inicializador. */
    function assignCanvas(self) {
        if (!(self instanceof canvasShapes.PolyArea)) {
            self = canvasShapes.getInstance();
        }
        var _canvas = self.getCanvas();
        var _conf = self.getConf();
        var contenedor = document.createElement("div");
        var padre = null; //$(document.body);
        var canvasId = "";
        var msg = "NO INTENCIONADO 1";
        try {
            if (_conf.id) {
                _canvas = document.getElementById(_conf.id); //$(configuration.id);
                msg = "NO INTENCIONADO 2";
                if (_canvas.tagName.toLowerCase() !== "canvas") {
                    //Quizás el id se corresponda con el elemento padre donde se desea introducir un nuevo canvas
                    padre = _canvas; //$(configuration.id);
                    msg = "NO INTENCIONADO 3";
                    //Modificamos su id
                    //padre.setProperty("id", padre.getProperty("id")+" "+configuration.id+"-father");
                    //_conf.id = _conf.id + "-" + id;
                    _canvas = padre.getElementsByTagName("canvas")[0]; //TOMA EL PRIMER ELEMENTO CANVAS
                    canvasId = _canvas.id;
                    msg = "INTENCIONADO";
                }
            }
            else {
                throw "Error Intencionado";
            }
        }
        catch (e) {
            //alert("fallo "+msg);
            //SI AUN ASI EL ID SIGUE SIENDO NULO O UNDEFINED:
            //_conf.id = _conf.id || id;
            _canvas = document.createElement("canvas"); //new Element("canvas");
            _canvas.innerHTML = '<p id="canvasNoAvailable">' + self.objLanguage.MSG_CANVAS_NO_AVAILABLE + '</p>'; //_canvas.set("html", '<p id="canvasNoAvailable"></p>');
        }
        finally {
            if (padre !== null) {
                padre.appendChild(contenedor); //padre.adopt(this._canvas);
            }
            //padre.setProperty("id", padre.getProperty("id")+" "+this._conf.id+"-father");
            if (_canvas !== null) {
                _canvas.id = canvasId ? canvasId : self.getId(); //_conf.id; //this._canvas.setProperties({"id": this._conf.id, "class": "canvas-PolyArea"});
                //this._canvas.className="canvas-PolyArea";
                _canvas.setAttribute("class", "canvas-PolyArea canvasPolyArea");
            }
            contenedor.setAttribute("id", "container-" + _conf.id);
            contenedor.setAttribute("class", "canvas-container polyAreaContainer");
            var noscript = document.createElement("noscript");
            noscript.appendChild(document.createTextNode(self.objLanguage.MSG_JAVASCRIPT_NO_AVAILABLE));
            contenedor.appendChild(noscript);
            if (_canvas !== null) {
                self._parent = contenedor;
                //RECURSO PARA PODER ACCEDER AL OBJETO POLYAREA DESDE DENTRO DEL CANVAS.
                _canvas["getPolyArea"] = function () { return self; };
                self.setCanvas(_canvas);
                //CUADRAR CANVAS
                _canvas.width = _conf.canvasWidth;
                _canvas.height = _conf.canvasHeight;
                if (_conf.canvasSquared) {
                    _canvas.height = _canvas.width;
                }
                //CUERPO PRINCIPAL POLYAREA
                if (self.showBody) {
                    contenedor = getBody(self, contenedor); //, _canvas.outerHTML);
                }
                else {
                    contenedor.appendChild(_canvas);
                }
                //CREA EL ELMENTO INFORMATIVO TOOLTIP
                var tooltip = document.createElement("span");
                tooltip.setAttribute("style", "position:absolute; left:0; top:0; background:navajoWhite");
                tooltip.setAttribute("id", "tooltip-" + _canvas.getAttribute("id"));
                //tooltip.appendChild(document.createTextNode("&hellip;"));
                tooltip.innerHTML = "&hellip;";
                contenedor.appendChild(tooltip);
                //AÑADIR PUNTOS CON CLICK
                if (_conf.mousePoints) {
                    canvasShapes.addEvent(_canvas, "click", canvasShapes.mouseClickEvent);
                }
                //MOSTRAR INFO CON MOVE / RETIRAR INFO CON OUT
                if (_conf.mouseInfo) {
                    canvasShapes.addEvent(_canvas, "mousemove", canvasShapes.mouseMoveEvent);
                    canvasShapes.addEvent(_canvas, "mouseout", canvasShapes.mouseOutEvent);
                }
                //MOUSE-DOWN / MOUSE-UP
                if (_conf.mouseDrop) {
                    canvasShapes.addEvent(_canvas, "mousedown", canvasShapes.mouseDownEvent);
                    canvasShapes.addEvent(_canvas, "mouseup", canvasShapes.mouseUpEvent);
                }
            }
        }
        return contenedor;
    }
    canvasShapes.assignCanvas = assignCanvas;
    /** Metodo que retorna el cuerpo completo DOMHTML. Se le debe pasar el objeto canvasShapes.PolyArea y el texto HTML que representa el canvas. */
    function getBody(self, container) {
        self.objLanguage || (self.objLanguage = canvasShapes.objLanguage);
        inyectCSS_Style();
        var _canvas = self.getCanvas();
        var _conf = self.getConf();
        if (!container) {
            container = document.createElement("div");
            container.className = "polyAreaContainer";
        }
        if (self.polyAreaHeader) {
            container.appendChild(document.createComment("<!-- POLYAREA HEADER -->"));
            var div1 = document.createElement("div");
            div1.className = "header";
            if (_conf.showTitle) {
                var h3_1 = document.createElement("h3");
                h3_1.className = "title";
                //h3_1.appendChild(document.createTextNode( self.objLanguage.TITLE +" " ));
                h3_1.innerHTML = self.objLanguage.TITLE + " ";
                if (_conf.showSubTitle) {
                    var span1 = document.createElement("span");
                    span1.className = "subTitle";
                    //span1.appendChild(document.createTextNode( self.objLanguage.SUBTITLE ));
                    span1.innerHTML = self.objLanguage.SUBTITLE;
                    h3_1.appendChild(span1);
                }
                div1.appendChild(h3_1);
            }
            container.appendChild(div1);
            container.appendChild(document.createComment("<!-- END POLYAREA HEADER -->"));
        }
        var br1 = document.createElement("br");
        br1.className = "clearFix";
        container.appendChild(br1);
        container.appendChild(document.createComment("<!-- POLYAREA BODY -->"));
        var div2 = document.createElement("div");
        div2.className = "body";
        //BUTTONS
        if (self.showUIButtons) {
            div2.appendChild(document.createComment("<!-- POLYAREA BUTTONS -->"));
            var div3 = document.createElement("div");
            div3.className = "buttons";
            //IDIOMA DEL CANVAS
            if (self.btnCanvasFlag) {
                //BANDERA
                var i111 = document.createElement("i");
                i111.className = "icon icon16 canvasBtnFlag";
                i111.title = self.objLanguage.CANVAS_FLAG_COUNTRY_TITLE;
                i111.style.backgroundImage = "url(" + canvasShapes.icos["FLAG_" + self.objLanguage.COUNTRY] + ")";
                div3.appendChild(i111);
            }
            //REDIBUJAR EL CANVAS
            if (self.btnCanvasRedraw) {
                var i1 = document.createElement("i");
                i1.className = "icon icon16 canvasBtnRefresh";
                i1.title = self.objLanguage.CANVAS_REFRESH_TITLE;
                i1.style.backgroundImage = "url(" + canvasShapes.icos["REFRESH2"] + ")";
                canvasShapes.addEvent(i1, "click", function canvasRefreshListener() {
                    canvasShapes.redraw(self);
                });
                div3.appendChild(i1);
            }
            //ZOOM EL CANVAS
            if (self.btnCanvasZoom) {
                function canvasZoomListener(zoomType) {
                    zoomType || (zoomType = "IN");
                    if (zoomType === "IN") {
                        this.getCanvas().width += this.zoomIn;
                        this.getCanvas().height += this.zoomIn;
                        this.canvasZoomed++;
                    }
                    else {
                        this.getCanvas().width -= this.zoomOut;
                        this.getCanvas().height -= this.zoomOut;
                        this.canvasZoomed--;
                    }
                    in44.value = this.getCanvas().width;
                    in444.value = this.getCanvas().height;
                    canvasShapes.redraw(this);
                }
                //ZOOM-RESTORE
                var i2 = document.createElement("i");
                i2.className = "icon icon16 canvasBtnZoomRestore";
                i2.title = self.objLanguage.CANVAS_ZOOM_RESTORE_TITLE;
                i2.style.backgroundImage = "url(" + canvasShapes.icos["ZOOM_RESTORE"] + ")";
                canvasShapes.addEvent(i2, "click", function canvasZoomRestoreListener() {
                    var zoomType = (self.canvasZoomed > 0) ? "OUT" : "IN";
                    var copyCanvasZoomed = Math.abs(self.canvasZoomed);
                    for (var j = 0; j < copyCanvasZoomed; j++) {
                        canvasZoomListener.call(self, zoomType);
                    }
                    self.canvasZoomed = 0;
                    //canvasShapes.redraw(self);
                });
                div3.appendChild(i2);
                //ZOOM-IN
                var i22 = document.createElement("i");
                i22.className = "icon icon16 canvasBtnZoomIn";
                i22.title = self.objLanguage.CANVAS_ZOOM_IN_TITLE;
                i22.style.backgroundImage = "url(" + canvasShapes.icos["ZOOM_IN"] + ")";
                canvasShapes.addEvent(i22, "click", canvasZoomListener.bind(self, "IN"));
                div3.appendChild(i22);
                //ZOOM-OUT
                var i222 = document.createElement("i");
                i222.className = "icon icon16 canvasBtnZoomOut";
                i222.title = self.objLanguage.CANVAS_ZOOM_OUT_TITLE;
                i222.style.backgroundImage = "url(" + canvasShapes.icos["ZOOM_OUT"] + ")";
                canvasShapes.addEvent(i222, "click", canvasZoomListener.bind(self, "OUT"));
                div3.appendChild(i222);
            }
            //OPCIONES DEL CANVAS
            if (self.btnCanvasOptions) {
                var i3 = document.createElement("i");
                i3.className = "icon icon16 showCanvasOptions";
                i3.title = self.objLanguage.CANVAS_OPTIONS_TITLE;
                i3.style.backgroundImage = "url(" + canvasShapes.icos["COG"] + ")";
                canvasShapes.addEvent(i3, "click", function canvasOptionsListener() {
                    if (div4.style.display === "none") {
                        div4.style.display = "block";
                    }
                    else {
                        div4.style.display = "none";
                    }
                });
                div3.appendChild(i3);
            }
            //DESCARGAR EL CANVAS
            if (self.btnDownCanvasImage) {
                var a1 = document.createElement("a");
                a1.className = "icon icon16 downCanvasImage";
                //a1.id = "down-" + _canvas.id;
                a1.title = self.objLanguage.CANVAS_DOWNLOAD_TITLE;
                a1.href = "#";
                a1.download = "polyarea-" + _canvas.id + ".png";
                a1.style.backgroundImage = "url(" + canvasShapes.icos["DOWNLOAD"] + ")";
                //a1.onclick = "javascript: canvasShapes.PolyArea.downCanvasImage('" + _canvas.getAttribute("id") + "')";
                canvasShapes.addEvent(a1, "click", function downCanvasListener() {
                    a1.href = _canvas.toDataURL();
                });
                div3.appendChild(a1);
            }
            //LIMPIAR LA SUPERFICIE DEL CANVAS
            if (self.btnCanvasClean) {
                var i4 = document.createElement("i");
                i4.className = "icon icon16 canvasBtnClear";
                i4.title = self.objLanguage.CANVAS_CLEAN_TITLE;
                i4.style.backgroundImage = "url(" + canvasShapes.icos["BROOM"] + ")";
                canvasShapes.addEvent(i4, "click", function canvasClearListener() {
                    self.canvasClean();
                });
                div3.appendChild(i4);
            }
            //BORRAR EL CANVAS
            if (self.btnCanvasReset) {
                var i5 = document.createElement("i");
                i5.className = "icon icon16 canvasBtnReset";
                i5.title = self.objLanguage.CANVAS_RESET_TITLE;
                i5.style.backgroundImage = "url(" + canvasShapes.icos["TRASH3"] + ")";
                canvasShapes.addEvent(i5, "click", function canvasClearListener() {
                    var sels = canvasShapes.getSelected(self, "All");
                    if (sels.length > 0) {
                        for (var i = 0; i < sels.length; i++) {
                            if (sels[i]) {
                                sels[i].remove(true);
                            }
                        }
                    }
                    else {
                        if (self.cleanAllIfEmpty) {
                            self.resetShapes();
                        }
                    }
                    canvasShapes.redraw(self);
                });
                div3.appendChild(i5);
            }
            div2.appendChild(document.createComment("<!-- END POLYAREA BUTTONS -->"));
            div2.appendChild(div3);
        }
        //END BUTTONS
        //CANVAS
        div2.appendChild(document.createComment("<!-- BEGIN Canvas POLYAREA -->"));
        var div22 = document.createElement("div");
        div22.className = "canvasContainer";
        div22.appendChild(_canvas);
        div2.appendChild(div22);
        div2.appendChild(document.createComment("<!-- END Canvas POLYAREA -->"));
        //END CANVAS
        //BEGIN CANVAS DATA
        div2.appendChild(document.createComment("<!-- BEGIN CANVAS DATA -->"));
        var div4 = document.createElement("div");
        div4.className = "canvasData";
        div4.style.display = "none";
        if (self.canvasDataTitle) {
            var p1 = document.createElement("p");
            p1.className = "canvasDataTitle";
            p1.appendChild(document.createTextNode("CANVAS DATA: "));
            var p2 = document.createElement("p");
            p2.className = "clearFix";
            div4.appendChild(p1);
            div4.appendChild(p2);
        }
        if (self.canvasDataButtons) {
            div4.appendChild(document.createComment("<!-- BEGIN CANVAS DATA BUTTONS -->"));
            var div44 = document.createElement("div");
            div44.className = "buttonsData";
            //HIDE/SHOW COORDINATES
            var i71 = document.createElement("i");
            i71.className = "icon icon16 inline viewCoordinates";
            canvasShapes.addEvent(i71, "click", function viewCoordinatesListener() {
                var display = (div8.style.display === "none") ? "block" : "none";
                div8.style.display = display;
                div11.style.display = display;
            });
            i71.title = self.objLanguage.TITLE_VIEW_COORDINATES;
            i71.style.backgroundImage = "url(" + canvasShapes.icos["XY"] + ")";
            //div71.innerHTML = self.objLanguage.LABEL_VIEW_COORDINATES;
            div44.appendChild(i71);
            //COORDINATES GROUPED
            var i72 = document.createElement("i");
            i72.className = "icon icon16 inline groupCoordinates";
            canvasShapes.addEvent(i72, "click", canvasShapes.shapesGrouped.bind(self));
            i72.title = self.objLanguage.TITLE_GROUPED;
            i72.style.backgroundImage = "url(" + canvasShapes.icos["LAYERS"] + ")";
            //div71.innerHTML = self.objLanguage.LABEL_VIEW_COORDINATES;
            div44.appendChild(i72);
            //SELECT ALL SHAPES
            var i73 = document.createElement("i");
            i73.className = "icon icon16 inline selectAll";
            canvasShapes.addEvent(i73, "click", function selectShapesAllListener() {
                canvasShapes.selectShapesAll(self);
                canvasShapes.redraw(self);
            });
            i73.title = self.objLanguage.TITLE_SELECT_ALL;
            i73.style.backgroundImage = "url(" + canvasShapes.icos["SELECT"] + ")";
            //div71.innerHTML = self.objLanguage.LABEL_SELECT_ALL;
            div44.appendChild(i73);
            div4.appendChild(div44);
            div4.appendChild(document.createComment("<!-- END CANVAS DATA BUTTONS -->"));
        }
        //INFO
        if (self.canvasDataInfo) {
            div4.appendChild(document.createComment("<!-- BEGIN CANVAS INFO -->"));
            var div5 = document.createElement("div");
            div5.className = "canvasInfo";
            var p3 = document.createElement("p");
            p3.className = "canvasDataTitle";
            p3.appendChild(document.createTextNode("INFO: "));
            div5.appendChild(p3);
            var span7 = document.createElement("span");
            span7.className = "solution";
            //PERIMETER
            var span8 = document.createElement("span");
            span8.appendChild(document.createTextNode(self.objLanguage.SPAN_PERIMETER_TEXT + ": "));
            var span9 = document.createElement("span");
            span9.className = "perimeter";
            span9.appendChild(document.createTextNode("0"));
            span8.appendChild(span9);
            span7.appendChild(span8);
            //AREA
            var span10 = document.createElement("span");
            span10.appendChild(document.createTextNode(self.objLanguage.SPAN_AREA_TEXT + ": "));
            var span11 = document.createElement("span");
            span11.className = "area";
            span11.appendChild(document.createTextNode("0"));
            span10.appendChild(span11);
            span7.appendChild(span10);
            div5.appendChild(span7);
            div4.appendChild(div5);
            div4.appendChild(document.createComment("<!-- END CANVAS INFO -->"));
        }
        //INTRO
        if (self.canvasDataIntro) {
            div4.appendChild(document.createComment("<!-- BEGIN CANVAS INTRO -->"));
            var div6 = document.createElement("div");
            div6.className = "canvasIntro";
            var p4 = document.createElement("p");
            p4.className = "canvasDataTitle";
            p4.appendChild(document.createTextNode("INTRO DATA: "));
            div6.appendChild(p4);
            //EXAMPLES
            var div7 = document.createElement("div");
            div7.className = "canvasDataExamples";
            var a2 = document.createElement("a");
            a2.className = "button buttonSmall canvasDataBtnEjemplo1";
            a2.href = "#";
            a2.appendChild(document.createTextNode(self.objLanguage.INPUT_VALUE_EXAMPLE1));
            canvasShapes.addEvent(a2, "click", function linkExample1Listener() {
                var coordX = [4, 4, 8, 8, -4, -4];
                var coordY = [6, -4, -4, -8, -8, 6];
                canvasShapes.setCoordinatesXY(self, [coordX, coordY], true);
                canvasShapes.redraw(self);
            });
            div7.appendChild(a2);
            var a3 = document.createElement("a");
            a3.href = "http://www.mathopenref.com/coordpolygonarea2.html";
            a3.target = "blank"; //NO VÁLIDO EN HTML5
            a3.title = self.objLanguage.INPUT_TITLE_LINK_EXAMPLE1;
            a3.appendChild(document.createTextNode("?"));
            div7.appendChild(a3);
            var a4 = document.createElement("a");
            a4.className = "button buttonSmall canvasDataBtnEjemplo2";
            a4.href = "#";
            a4.appendChild(document.createTextNode(self.objLanguage.INPUT_VALUE_EXAMPLE2));
            canvasShapes.addEvent(a4, "click", function linkExample2Listener() {
                var coords = [[[3, 4], [5, 6], [9, 5], [12, 8], [5, 11]]];
                canvasShapes.setCoordinates(self, coords, true);
                canvasShapes.redraw(self);
            });
            div7.appendChild(a4);
            var a5 = document.createElement("a");
            a5.href = "https://es.wikipedia.org/wiki/F%C3%B3rmula_del_%C3%A1rea_de_Gauss";
            a5.target = "_blank"; //NO VÁLIDO EN HTML5
            a5.title = self.objLanguage.INPUT_TITLE_LINK_EXAMPLE2;
            a5.appendChild(document.createTextNode("?"));
            div7.appendChild(a5);
            var a6 = document.createElement("a");
            a6.className = "button buttonSmall canvasDataBtnEjemploOthers";
            a6.href = "#";
            a6.appendChild(document.createTextNode(self.objLanguage.INPUT_VALUE_EXAMPLE_OTHERS));
            canvasShapes.addEvent(a6, "click", function linkExampleOthersListener() {
                var coords = [[[3, 4], [5, 6], [9, 5], [12, 8], [5, 11]]];
                //MAPLE LEAF, HALLOWEEN PUMPKIN, BAT, CAT, GHOST
                var sel = prompt("Seleccionar un ejemplo: (MAPLE LEAF, HALLOWEEN PUMPKIN, BAT, CAT, GHOST)", "Maple Leaf");
                coords = self.cartesianArt[sel.toUpperCase().replace(" ", "_")];
                coords || (coords = self.cartesianArt["MAPLE_LEAF"]); //Hoja de Arce por defecto
                //coords = eval(coords); //pasar de texto a array
                coords = JSON.parse(coords + "");
                canvasShapes.setCoordinates(self, coords, true);
                canvasShapes.redraw(self);
            });
            div7.appendChild(a6);
            var a7 = document.createElement("a");
            a7.href = "????";
            a7.title = self.objLanguage.INPUT_TITLE_LINK_EXAMPLE_OTHERS;
            a7.appendChild(document.createTextNode("?"));
            div7.appendChild(a7);
            div6.appendChild(div7);
            div6.appendChild(document.createComment("<!-- END CANVAS EXAMPLES -->"));
            //COORDENADAS
            div6.appendChild(document.createComment("<!-- BEGIN INTRO COORDINATES -->"));
            var div8 = document.createElement("div");
            div8.className = "introData coordinatesXsYs_string";
            div8.style.display = "none";
            var div9 = document.createElement("div");
            div9.className = "inline inline6";
            var lab1 = document.createElement("label");
            lab1.htmlFor = "coordinatesXs";
            lab1.appendChild(document.createTextNode("Xs [x1, x2, ..., xn]: "));
            div9.appendChild(lab1);
            var txt1 = document.createElement("textarea");
            txt1.className = "coordinatesXs";
            txt1.name = "coordinatesXs";
            txt1.title = self.objLanguage.INPUT_TITLE_XS;
            txt1.rows = "3";
            txt1.placeholder = "[ x1, x2, ..., xn ]";
            canvasShapes.addEvent(txt1, "change", function updateXsListener() {
                var coordsXY = self.getCoordinatesXY();
                var coords = txt1.value.replace("[", "").replace("]", "").split(",");
                var x;
                try {
                    for (var i = 0; i < coords.length; i++) {
                        x = parseFloat(coords[i].replace(" ", ""));
                        if (!isNaN(x)) {
                            coordsXY[0].splice(i, 1, x); //SI EXISTE LA SOBREESCRIBE, SINO LA CREA
                        }
                    }
                    //alert("long. TXT: "+ coords.length + ", long. Array: "+ coordsXY[0].length);
                    coordsXY[0].splice(coords.length, (coordsXY[0].length - coords.length)); //BORRA LOS ITEMS SOBRANTES X
                    coordsXY[1].splice(coords.length, (coordsXY[1].length - coords.length)); //BORRA LOS ITEMS SOBRANTES Y
                    for (var j = 0; j < (coordsXY[0].length - coordsXY[1].length); j++) {
                        coordsXY[1].push(0);
                    }
                    canvasShapes.setCoordinatesXY(self, coordsXY, true);
                }
                catch (e) {
                    alert("Warning!! COORDINATES: WRONG FORMED");
                }
                finally {
                    canvasShapes.redraw(self);
                }
            });
            div9.appendChild(txt1);
            div8.appendChild(div9);
            var div10 = document.createElement("div");
            div10.className = "inline inline6";
            var lab2 = document.createElement("label");
            lab2.htmlFor = "coordinatesXs";
            lab2.appendChild(document.createTextNode("Ys [y1, y2, ..., yn]: "));
            div10.appendChild(lab2);
            var txt2 = document.createElement("textarea");
            txt2.className = "coordinatesYs";
            txt2.name = "coordinatesYs";
            txt2.title = self.objLanguage.INPUT_TITLE_YS;
            txt2.rows = "3";
            txt2.placeholder = "[ y1, y2, ..., yn ]";
            canvasShapes.addEvent(txt2, "change", function updateXsListener() {
                var coordsXY = self.getCoordinatesXY();
                var coords = txt2.value.replace("[", "").replace("]", "").split(",");
                var y;
                try {
                    for (var i = 0; i < coords.length; i++) {
                        y = parseFloat(coords[i].replace(" ", ""));
                        if (!isNaN(y)) {
                            coordsXY[1].splice(i, 1, y); //SI EXISTE LA SOBREESCRIBE, SINO LA CREA
                        }
                    }
                    //alert("long. TXT: "+ coords.length + ", long. Array: "+ coordsXY[0].length);
                    coordsXY[0].splice(coords.length, (coordsXY[0].length - coords.length)); //BORRA LOS ITEMS SOBRANTES X
                    coordsXY[1].splice(coords.length, (coordsXY[1].length - coords.length)); //BORRA LOS ITEMS SOBRANTES Y
                    for (var j = 0; j < (coordsXY[1].length - coordsXY[0].length); j++) {
                        coordsXY[0].push(0);
                    }
                    canvasShapes.setCoordinatesXY(self, coordsXY, true);
                }
                catch (e) {
                    alert("Warning!! COORDINATES: WRONG FORMED");
                }
                finally {
                    canvasShapes.redraw(self);
                }
            });
            div10.appendChild(txt2);
            div8.appendChild(div10);
            var p5 = document.createElement("p");
            p5.className = "clearFix";
            div8.appendChild(p5);
            div6.appendChild(div8);
            var div11 = document.createElement("div");
            div11.className = "introData coordinatesXY_array";
            div11.style.display = "none";
            var lab3 = document.createElement("label");
            lab3.htmlFor = "coordinatesXY";
            lab3.appendChild(document.createTextNode("XY [x1, y1], [x2, y2], ..., [xn, yn]: "));
            div11.appendChild(lab3);
            var br2 = document.createElement("br");
            div11.appendChild(br2);
            var txt3 = document.createElement("textarea");
            txt3.className = "coordinatesXY";
            txt3.name = "coordinatesXY";
            txt3.title = self.objLanguage.INPUT_TITLE_XY;
            txt3.rows = "3";
            txt3.placeholder = "[ [x1, y1], [x2, y2], ..., [xn, yn] ]";
            canvasShapes.addEvent(txt3, "change", function updateXsListener() {
                /*canvasShapes.setCoordinates(self, eval(txt3.value), true);*/
                if (txt3.value.length > 0) {
                    try {
                        var coordsJSON = JSON.parse(txt3.value);
                        canvasShapes.setCoordinates(self, coordsJSON, true);
                    }
                    catch (e) {
                        alert("COORDINATES ERROR !! \n" + e.message);
                    }
                }
                else {
                    canvasShapes.resetShapes(self);
                }
                canvasShapes.redraw(self);
            });
            div11.appendChild(txt3);
            div6.appendChild(div11);
            div6.appendChild(document.createComment("<!-- END INTRO COORDINATES -->"));
            div4.appendChild(div6);
            div4.appendChild(document.createComment("<!-- END CANVAS INTRO -->"));
        }
        //OPTIONS
        if (self.canvasDataOptions) {
            div4.appendChild(document.createComment("<!-- BEGIN CANVAS OPTIONS -->"));
            var div12 = document.createElement("div");
            div12.className = "canvasOptions";
            var p6 = document.createElement("p");
            p6.className = "canvasDataTitle";
            p6.appendChild(document.createTextNode(self.objLanguage.FIELDSET_OPTIONS + ": "));
            div12.appendChild(p6);
            div12.appendChild(document.createComment("<!-- BEGIN CANVAS OPTIONS DATA -->"));
            var div13 = document.createElement("div");
            div13.className = "canvasOptionsData";
            //CANVAS
            var f1 = document.createElement("fieldset");
            var leg4 = document.createElement("legend");
            leg4.innerHTML = "CANVAS";
            f1.appendChild(leg4);
            //GRID
            var lab5 = document.createElement("label");
            lab5.htmlFor = "canvasGrid";
            //lab5.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_GRID + ": "));
            lab5.className = "labelIcon labelIcon16";
            lab5.style.backgroundImage = "url(" + canvasShapes.icos["GRID"] + ")";
            lab5.title = self.objLanguage.LABEL_INPUT_GRID;
            f1.appendChild(lab5);
            var in2 = document.createElement("input");
            in2.type = "checkbox";
            in2.className = "canvasGrid";
            in2.name = "canvasGrid";
            in2.title = self.objLanguage.INPUT_TITLE_GRID;
            //in2.value = true;
            in2.checked = self.grid;
            canvasShapes.addEvent(in2, "change", function chkGridListener(ev) {
                self.setGrid(ev.target.checked);
                canvasShapes.redraw(self);
            });
            f1.appendChild(in2);
            //AXES
            var lab6 = document.createElement("label");
            lab6.htmlFor = "canvasAxes";
            //lab6.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_AXES + ": "));
            lab6.className = "labelIcon labelIcon16";
            lab6.style.backgroundImage = "url(" + canvasShapes.icos["AXES"] + ")";
            lab6.title = self.objLanguage.LABEL_INPUT_AXES;
            f1.appendChild(lab6);
            var in3 = document.createElement("input");
            in3.type = "checkbox";
            in3.className = "canvasAxes";
            in3.name = "canvasAxes";
            in3.title = self.objLanguage.INPUT_TITLE_AXES;
            //in3.value = true;
            in3.checked = self.axes;
            canvasShapes.addEvent(in3, "change", function chkAxesListener(ev) {
                self.setAxes(ev.target.checked);
                canvasShapes.redraw(self);
            });
            f1.appendChild(in3);
            //FRACTION
            var lab7 = document.createElement("label");
            lab7.htmlFor = "canvasFraction";
            //lab7.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_FRACTION + ": "));
            lab7.className = "labelIcon labelIcon16";
            lab7.style.backgroundImage = "url(" + canvasShapes.icos["FRACTION"] + ")";
            lab7.title = self.objLanguage.LABEL_INPUT_FRACTION;
            f1.appendChild(lab7);
            var in4 = document.createElement("input");
            in4.type = "text";
            in4.className = "canvasFraction";
            in4.name = "canvasFraction";
            in4.title = self.objLanguage.INPUT_TITLE_FRACTION;
            in4.value = canvasShapes.toDecimals(self.fractionGrid, self.decimals);
            in4.size = 4;
            canvasShapes.addEvent(in4, "change", function txtFractionListener(ev) {
                self.setFraction(ev.target.value);
                canvasShapes.redraw(self);
            });
            f1.appendChild(in4);
            //CANVAS-WIDTH
            var lab77 = document.createElement("label");
            lab77.htmlFor = "canvasWidth";
            //lab7.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_FRACTION + ": "));
            lab77.className = "labelIcon labelIcon16";
            lab77.style.backgroundImage = "url(" + canvasShapes.icos["RULER_WIDTH"] + ")";
            lab77.title = self.objLanguage.LABEL_INPUT_WIDTH;
            f1.appendChild(lab77);
            var in44 = document.createElement("input");
            in44.type = "text";
            in44.className = "canvasWidth";
            in44.name = "canvasWidth";
            in44.title = self.objLanguage.INPUT_TITLE_WIDTH;
            in44.value = self.getCanvas().width;
            in44.size = 4;
            canvasShapes.addEvent(in44, "change", function txtWidthListener(ev) {
                self.getCanvas().width = parseInt(ev.target.value);
                canvasShapes.redraw(self);
            });
            f1.appendChild(in44);
            //CANVAS-HEIGHT
            var lab777 = document.createElement("label");
            lab777.htmlFor = "canvasHeight";
            //lab7.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_FRACTION + ": "));
            lab777.className = "labelIcon labelIcon16";
            lab777.style.backgroundImage = "url(" + canvasShapes.icos["RULER_HEIGHT"] + ")";
            lab777.title = self.objLanguage.LABEL_INPUT_HEIGHT;
            f1.appendChild(lab777);
            var in444 = document.createElement("input");
            in444.type = "text";
            in444.className = "canvasHeight";
            in444.name = "canvasHeight";
            in444.title = self.objLanguage.INPUT_TITLE_HEIGHT;
            in444.value = self.getCanvas().height;
            in444.size = 4;
            canvasShapes.addEvent(in444, "change", function txtHeightListener(ev) {
                self.getCanvas().height = parseInt(ev.target.value);
                canvasShapes.redraw(self);
            });
            f1.appendChild(in444);
            div13.appendChild(f1);
            //COORDINATES
            var f2 = document.createElement("fieldset");
            var leg3 = document.createElement("legend");
            leg3.innerHTML = "COORDINATES";
            f2.appendChild(leg3);
            //PROPORTION_AUTO && DEFORMATION
            var lab12 = document.createElement("label");
            lab12.htmlFor = "canvasProportionAuto";
            //lab12.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_PROPORTION_AUTO + ": "));
            lab12.className = "labelIcon labelIcon16";
            lab12.style.backgroundImage = "url(" + canvasShapes.icos["MAGIC"] + ")";
            lab12.title = self.objLanguage.LABEL_INPUT_PROPORTION_AUTO;
            f2.appendChild(lab12);
            var in9 = document.createElement("input");
            in9.type = "checkbox";
            in9.className = "canvasProportionAuto";
            in9.name = "canvasProportionAuto";
            in9.title = self.objLanguage.INPUT_TITLE_PROPORTION_AUTO;
            //in9.value = true;
            in9.checked = self.autoProportion;
            canvasShapes.addEvent(in9, "change", function chkAutoProportionListener(ev) {
                self.setAutoProportion(ev.target.checked);
                self.setDeformation(!ev.target.checked);
                canvasShapes.redraw(self);
            });
            f2.appendChild(in9);
            //PROPORTION_X
            var lab10 = document.createElement("label");
            lab10.htmlFor = "canvasProportionX";
            //lab10.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_PROPORTION_X + ": "));
            lab10.className = "labelIcon labelIcon16";
            lab10.style.backgroundImage = "url(" + canvasShapes.icos["PROPORTION_X"] + ")";
            lab10.title = self.objLanguage.LABEL_INPUT_PROPORTION_X;
            f2.appendChild(lab10);
            var in7 = document.createElement("input");
            in7.type = "text";
            in7.className = "canvasProportionX";
            in7.name = "canvasProportionX";
            in7.title = self.objLanguage.INPUT_TITLE_PROPORTION_X;
            in7.value = canvasShapes.toDecimals(self.proportionX, self.decimals);
            in7.size = 4;
            canvasShapes.addEvent(in7, "change", function txtProportionXListener(ev) {
                self.proportionX_OLD = ev.target.value;
                self.setProportionX(ev.target.value);
                canvasShapes.redraw(self);
            });
            f2.appendChild(in7);
            //PROPORTION_Y
            var lab11 = document.createElement("label");
            lab11.htmlFor = "canvasProportionY";
            //lab11.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_PROPORTION_Y + ": "));
            lab11.className = "labelIcon labelIcon16";
            lab11.style.backgroundImage = "url(" + canvasShapes.icos["PROPORTION_Y"] + ")";
            lab11.title = self.objLanguage.LABEL_INPUT_PROPORTION_Y;
            f2.appendChild(lab11);
            var in8 = document.createElement("input");
            in8.type = "text";
            in8.className = "canvasProportionY";
            in8.name = "canvasProportionY";
            in8.title = self.objLanguage.INPUT_TITLE_PROPORTION_Y;
            in8.value = canvasShapes.toDecimals(self.proportionY, self.decimals);
            in8.size = 4;
            canvasShapes.addEvent(in8, "change", function txtProportionYListener(ev) {
                self.proportionY_OLD = ev.target.value;
                self.setProportionY(ev.target.value);
                canvasShapes.redraw(self);
            });
            f2.appendChild(in8);
            //INVERT_X
            var lab13 = document.createElement("label");
            lab13.htmlFor = "canvasInvertX";
            //lab13.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_INVERTER_X + ": "));
            lab13.className = "labelIcon labelIcon16";
            lab13.style.backgroundImage = "url(" + canvasShapes.icos["INVERT_X"] + ")";
            lab13.title = self.objLanguage.LABEL_INPUT_INVERTER_X;
            f2.appendChild(lab13);
            var in10 = document.createElement("input");
            in10.type = "checkbox";
            in10.className = "canvasInvertX";
            in10.name = "canvasInvertX";
            in10.title = self.objLanguage.INPUT_TITLE_INVERTER_X;
            //in10.value = false;
            in10.checked = self.invertX;
            canvasShapes.addEvent(in10, "change", function chkInvertXListener(ev) {
                self.setInvertX(ev.target.checked);
                canvasShapes.redraw(self);
            });
            f2.appendChild(in10);
            //INVERT_Y
            var lab14 = document.createElement("label");
            lab14.htmlFor = "canvasInvertY";
            //lab14.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_INVERTER_Y + ": "));
            lab14.className = "labelIcon labelIcon16";
            lab14.style.backgroundImage = "url(" + canvasShapes.icos["INVERT_Y"] + ")";
            lab14.title = self.objLanguage.LABEL_INPUT_INVERTER_Y;
            f2.appendChild(lab14);
            var in11 = document.createElement("input");
            in11.type = "checkbox";
            in11.className = "canvasInvertY";
            in11.name = "canvasInvertY";
            in11.title = self.objLanguage.INPUT_TITLE_INVERTER_Y;
            //in11.value = false;
            in11.checked = self.invertY;
            canvasShapes.addEvent(in11, "change", function chkInvertYListener(ev) {
                self.setInvertY(ev.target.checked);
                canvasShapes.redraw(self);
            });
            f2.appendChild(in11);
            div13.appendChild(f2);
            //OTHERs
            var f22 = document.createElement("fieldset");
            var leg2 = document.createElement("legend");
            leg2.innerHTML = "OTHERs";
            f22.appendChild(leg2);
            //DECIMALS
            var lab8 = document.createElement("label");
            lab8.htmlFor = "canvasDecimals";
            //lab8.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_DECIMALS + ": "));
            lab8.className = "labelIcon labelIcon16";
            lab8.style.backgroundImage = "url(" + canvasShapes.icos["DECIMALS"] + ")";
            lab8.title = self.objLanguage.LABEL_INPUT_DECIMALS;
            f22.appendChild(lab8);
            var in5 = document.createElement("input");
            in5.type = "text";
            in5.className = "canvasDecimals";
            in5.name = "canvasDecimals";
            in5.title = self.objLanguage.INPUT_TITLE_DECIMALS;
            in5.value = self.decimals;
            in5.size = 3;
            canvasShapes.addEvent(in5, "change", function txtDecimalsListener(ev) {
                self.setDecimals(ev.target.value);
                canvasShapes.redraw(self);
            });
            f22.appendChild(in5);
            //ZOOM-SIZE
            var lab88 = document.createElement("label");
            lab88.htmlFor = "canvasZoomSize";
            //lab9.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_FREEDRAW + ": "));
            lab88.className = "labelIcon labelIcon16";
            lab88.style.backgroundImage = "url(" + canvasShapes.icos["ZOOM_SIZE"] + ")";
            lab88.title = self.objLanguage.LABEL_INPUT_ZOOM_SIZE;
            f22.appendChild(lab88);
            var in66 = document.createElement("input");
            in66.type = "text";
            in66.className = "canvasZoomSize";
            in66.name = "canvasZoomSize";
            in66.title = self.objLanguage.INPUT_TITLE_ZOOM_SIZE;
            in66.value = parseInt(self.zoomIn + self.zoomOut) / 2;
            in66.size = "4";
            canvasShapes.addEvent(in66, "change", function txtZoomSizeListener(ev) {
                self.zoomIn = parseInt(ev.target.value, 10);
                self.zoomOut = self.zoomIn;
            });
            f22.appendChild(in66);
            //MOUSE-DROP
            var lab888 = document.createElement("label");
            lab888.htmlFor = "canvasMouseDrop";
            //lab8.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_DECIMALS + ": "));
            lab888.className = "labelIcon labelIcon16";
            lab888.style.backgroundImage = "url(" + canvasShapes.icos["MOUSE_DROP"] + ")";
            lab888.title = self.objLanguage.LABEL_INPUT_MOUSE_DROP;
            f22.appendChild(lab888);
            var in666 = document.createElement("input");
            in666.type = "checkbox";
            in666.className = "canvasMouseDrop";
            in666.name = "canvasMouseDrop";
            in666.title = self.objLanguage.INPUT_TITLE_MOUSE_DROP;
            in666.checked = self.mouseDrop;
            canvasShapes.addEvent(in666, "change", function chkMouseDropListener(ev) {
                self.mouseDrop = ev.target.checked;
            });
            f22.appendChild(in666);
            //MOUSE-INFO
            var lab8888 = document.createElement("label");
            lab8888.htmlFor = "canvasMouseInfo";
            //lab8.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_DECIMALS + ": "));
            lab8888.className = "labelIcon labelIcon16";
            lab8888.style.backgroundImage = "url(" + canvasShapes.icos["INFO2"] + ")";
            lab8888.title = self.objLanguage.LABEL_INPUT_MOUSE_INFO;
            f22.appendChild(lab8888);
            var in6666 = document.createElement("input");
            in6666.type = "checkbox";
            in6666.className = "canvasMouseInfo";
            in6666.name = "canvasMouseInfo";
            in6666.title = self.objLanguage.INPUT_TITLE_MOUSE_INFO;
            in6666.checked = self.mouseInfo;
            canvasShapes.addEvent(in6666, "change", function chkMouseInfoListener(ev) {
                self.mouseInfo = ev.target.checked;
            });
            f22.appendChild(in6666);
            //MOUSE-POINTS
            var lab88888 = document.createElement("label");
            lab88888.htmlFor = "canvasMousePoints";
            //lab8.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_DECIMALS + ": "));
            lab88888.className = "labelIcon labelIcon16";
            lab88888.style.backgroundImage = "url(" + canvasShapes.icos["MOUSE_POINT"] + ")";
            lab88888.title = self.objLanguage.LABEL_INPUT_MOUSE_POINTS;
            f22.appendChild(lab88888);
            var in66666 = document.createElement("input");
            in66666.type = "checkbox";
            in66666.className = "canvasMousePoints";
            in66666.name = "canvasMousePoints";
            in66666.title = self.objLanguage.INPUT_TITLE_MOUSE_POINTS;
            in66666.checked = self.mousePoints;
            canvasShapes.addEvent(in66666, "change", function chkMousePointsListener(ev) {
                self.mousePoints = ev.target.checked;
            });
            f22.appendChild(in66666);
            //SHOW-NAMES
            var lab888888 = document.createElement("label");
            lab888888.htmlFor = "canvasShowNames";
            //lab8.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_DECIMALS + ": "));
            lab888888.className = "labelIcon labelIcon16";
            lab888888.style.backgroundImage = "url(" + canvasShapes.icos["TEXT"] + ")";
            lab888888.title = self.objLanguage.LABEL_INPUT_SHOW_NAMES;
            f22.appendChild(lab888888);
            var in666666 = document.createElement("input");
            in666666.type = "checkbox";
            in666666.className = "canvasShowNames";
            in666666.name = "canvasShowNames";
            in666666.title = self.objLanguage.INPUT_TITLE_SHOW_NAMES;
            in666666.checked = self.showNames;
            canvasShapes.addEvent(in666666, "change", function chkShowNamesListener(ev) {
                self.setShowNames(ev.target.checked);
                canvasShapes.redraw(self);
            });
            f22.appendChild(in666666);
            //SHAPES-COLOR
            var lab8888888 = document.createElement("label");
            lab8888888.htmlFor = "canvasColorShapes";
            //lab8.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_DECIMALS + ": "));
            lab8888888.className = "labelIcon labelIcon16";
            lab8888888.style.backgroundImage = "url(" + canvasShapes.icos["COLOR"] + ")";
            lab8888888.title = self.objLanguage.LABEL_INPUT_COLOR_SHAPES;
            f22.appendChild(lab8888888);
            var in6666666 = document.createElement("input");
            in6666666.type = "text";
            in6666666.className = "canvasColorShapes";
            in6666666.name = "canvasColorShapes";
            in6666666.title = self.objLanguage.INPUT_TITLE_COLOR_SHAPES;
            in6666666.size = "5";
            in6666666.value = "green";
            canvasShapes.addEvent(in6666666, "change", function txtColorShapesListener(ev) {
                canvasShapes.getSelected(self, "ALL").forEach(function (f) {
                    var color = ev.target.value.split(",");
                    if (f.getTAG().toUpperCase === "POINT") {
                        if (color.length < 1) {
                            color[0] = "black";
                        }
                        if (color.length < 2) {
                            color[1] = "red";
                        }
                        f.color = color;
                    }
                    else {
                        if (color.length < 1) {
                            color[0] = "green";
                        }
                        f.color = color[0].replace(" ", "");
                    }
                });
                canvasShapes.redraw(self);
            });
            f22.appendChild(in6666666);
            div13.appendChild(f22);
            //FREEDRAW
            var f3 = document.createElement("fieldset");
            var leg1 = document.createElement("legend");
            leg1.innerHTML = "FREE DRAW";
            f3.appendChild(leg1);
            var lab9 = document.createElement("label");
            lab9.htmlFor = "canvasFreeDraw";
            //lab9.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_FREEDRAW + ": "));
            lab9.className = "labelIcon labelIcon16";
            lab9.style.backgroundImage = "url(" + canvasShapes.icos["DRAW"] + ")";
            lab9.title = self.objLanguage.LABEL_INPUT_FREEDRAW;
            f3.appendChild(lab9);
            var in6 = document.createElement("input");
            in6.type = "checkbox";
            in6.className = "canvasFreeDraw";
            in6.name = "canvasFreeDraw";
            in6.title = self.objLanguage.INPUT_TITLE_FREEDRAW;
            //in6.value = false;
            in6.checked = this.freeDraw;
            canvasShapes.addEvent(in6, "change", function chkFreeDrawListener(ev) {
                self.setFreeDraw(ev.target.checked);
            });
            f3.appendChild(in6);
            var lab93 = document.createElement("label");
            lab93.htmlFor = "canvasFreeDrawRounded";
            //lab93.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_FREEDRAW_ROUNDED + ": "));
            lab93.className = "labelIcon labelIcon16";
            lab93.style.backgroundImage = "url(" + canvasShapes.icos["ROUNDED"] + ")";
            lab93.title = self.objLanguage.LABEL_INPUT_FREEDRAW_ROUNDED;
            f3.appendChild(lab93);
            var in63 = document.createElement("input");
            in63.type = "checkbox";
            in63.className = "canvasFreeDrawRounded";
            in63.name = "canvasFreeDrawRounded";
            in63.title = self.objLanguage.INPUT_TITLE_FREEDRAW_ROUNDED;
            in63.checked = self.freeDrawRounded;
            canvasShapes.addEvent(in63, "change", function chkFreeDrawRoundedListener(ev) {
                self.freeDrawRounded = ev.target.checked;
            });
            f3.appendChild(in63);
            var lab91 = document.createElement("label");
            lab91.htmlFor = "canvasFreeDrawSize";
            //lab91.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_FREEDRAW_SIZE + ": "));
            lab91.className = "labelIcon labelIcon16";
            lab91.style.backgroundImage = "url(" + canvasShapes.icos["SIZE"] + ")";
            lab91.title = self.objLanguage.LABEL_INPUT_FREEDRAW_SIZE;
            f3.appendChild(lab91);
            var in61 = document.createElement("input");
            in61.type = "text";
            in61.className = "canvasFreeDrawSize";
            in61.name = "canvasFreeDrawSize";
            in61.title = self.objLanguage.INPUT_TITLE_FREEDRAW_SIZE;
            in61.value = self.freeDrawSize;
            in61.size = "3";
            canvasShapes.addEvent(in61, "change", function chkFreeDrawSizeListener(ev) {
                self.freeDrawSize = ev.target.value;
            });
            f3.appendChild(in61);
            var lab92 = document.createElement("label");
            lab92.htmlFor = "canvasFreeDrawColor";
            //lab92.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_FREEDRAW_COLOR + ": "));
            lab92.className = "labelIcon labelIcon16";
            lab92.style.backgroundImage = "url(" + canvasShapes.icos["PALETTE"] + ")";
            lab92.title = self.objLanguage.LABEL_INPUT_FREEDRAW_COLOR;
            f3.appendChild(lab92);
            var in62 = document.createElement("input");
            in62.type = "text";
            in62.className = "canvasFreeDrawColor";
            in62.name = "canvasFreeDrawColor";
            in62.title = self.objLanguage.INPUT_TITLE_FREEDRAW_COLOR;
            in62.value = self.freeDrawColor;
            in62.size = "8";
            canvasShapes.addEvent(in62, "change", function chkFreeDrawColorListener(ev) {
                self.freeDrawColor = ev.target.value;
            });
            f3.appendChild(in62);
            div13.appendChild(f3);
            div12.appendChild(div13);
            div12.appendChild(document.createComment("<!-- END CANVAS OPTIONS DATA -->"));
            div4.appendChild(div12);
            div4.appendChild(document.createComment("<!-- END CANVAS OPTIONS -->"));
        }
        var p7 = document.createElement("p");
        p7.className = "clearFix";
        div4.appendChild(p7);
        div2.appendChild(div4);
        div2.appendChild(document.createComment("<!-- END CANVAS DATA -->"));
        var p70 = document.createElement("p");
        p70.className = "clearFix";
        div2.appendChild(p70);
        //END CANVAS DATA
        container.appendChild(div2);
        //END BODY
        //FOOTER
        if (self.polyAreaFooter) {
            container.appendChild(document.createComment("<!-- POLYAREA FOOTER -->"));
            var div25 = document.createElement("div");
            div25.className = "canvasFooter";
            if (_conf.showCredits) {
                div25.appendChild(document.createComment("<!-- POLYAREA CREDITS -->"));
                var p8 = document.createElement("p");
                p8.className = "credits";
                //p8.appendChild(document.createTextNode( self.objLanguage.CREDITS ));
                p8.innerHTML = self.objLanguage.CREDITS2;
                div25.appendChild(p8);
                div25.appendChild(document.createComment("<!-- END POLYAREA CREDITS -->"));
            }
            container.appendChild(div25);
            container.appendChild(document.createComment("<!-- END POLYAREA FOOTER -->"));
        }
        //END FOOTER
        return container;
    }
    canvasShapes.getBody = getBody; //END GET-BODY
    function inyectCSS_Style() {
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        style.innerHTML = getCSS();
        document.getElementsByTagName("head")[0].appendChild(style);
    }
    function getCSS() {
        /*var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
        document.getElementsByTagName("head")[0].appendChild(fileref)*/
        var css = [];
        css.push('/*<![CDATA[*/');
        css.push('/* CanvasShapes - PolyArea: Juan Jose Guerra Haba <dinertron@gmail.com> 2016 */');
        css.push('.polyAreaContainer{border:1px ridge maroon;border-radius:10px;box-shadow:4px 4px 6px maroon;width:98%;margin:auto;background:whiteSmoke;text-align:center}');
        css.push('.polyAreaContainer .header{max-width:90%;background:lightYellow;margin:auto;margin-top:4px;padding:2px}');
        css.push('.polyAreaContainer .header span{margin:2px;font-size:smaller;color:darkGray}');
        css.push('.polyAreaContainer .credits{font-size:xx-small;padding:0;vertical-align:middle;opacity:0.7}');
        css.push('.polyAreaContainer .credits:hover{opacity:1;background:lightYellow}');
        css.push('.polyAreaContainer .credits:first-child{margin:auto}');
        css.push('.polyAreaContainer .body{max-width:98%;background:white;margin:auto}');
        css.push('.polyAreaContainer .body .title{width:60%;float:left;margin:2px;padding:1px}');
        css.push('.polyAreaContainer .canvasContainer{float:left}');
        css.push('.polyAreaContainer .canvasPolyArea{background:lightYellow;margin:0 2%;margin-top:0;border:1px solid orange;border-radius:8px;overflow:auto}');
        css.push('.polyAreaContainer .noCanvas{background:yellow;padding:5px;border:1px solid orange;border-radius:8px;box-shadow:2px 2px 2px orange}');
        css.push('.polyAreaContainer .canvasData{display:none;border:1px solid gray;border-radius:8px;box-shadow:2px 2px 4px gray;float:left;width:50%}');
        css.push('@media (max-width: 920px){.polyAreaContainer .canvasData{width:40%}}');
        css.push('@media (max-width: 680px){.polyAreaContainer .canvasData{width:98%}}');
        css.push('.polyAreaContainer .canvasDataTitle{float:left;background:aquaMarine;border:1px solid navy;border-radius:8px;box-shadow:1px 1px 2px navy;color:navy;font-weight:bolder;margin:0;padding:0 2px;font-size:smaller}');
        css.push('.polyAreaContainer .canvasInfo{border:1px solid blue;border-radius:4px;padding:4px;margin:4px;text-align:center}');
        css.push('.polyAreaContainer .canvasIntro{border:1px solid blue;border-radius:4px;padding:4px;margin:4px;text-align:center}');
        css.push('.polyAreaContainer .introData{border:1px solid blue;border-radius:4px;padding:4px;margin:4px;text-align:center;background:whiteSmoke}');
        css.push('.polyAreaContainer .introData label{font-size:smaller;font-weight:bolder;padding:2px;background:navajoWhite}');
        css.push('.polyAreaContainer .introData textarea{text-align:left;font-size:smaller;width:90%}');
        css.push('.polyAreaContainer .canvasOptions{border:1px solid blue;border-radius:4px;padding:4px;margin:4px;text-align:center}');
        css.push('.polyAreaContainer .canvasOptionsData{border:1px solid blue;border-radius:4px;padding:4px;margin:4px;text-align:left;font-size:smaller}');
        css.push('.polyAreaContainer .canvasOptionsData fieldset{border:1px solid blue;border-radius:4px;padding:4px;margin:auto;width:95%;text-align:center;background:lightYellow}');
        css.push('.polyAreaContainer .canvasOptionsData fieldset legend{color:lightGray;font-size:smaller;background:#333333;padding:2px}');
        css.push('.polyAreaContainer .canvasOptionsData input{font-size:smaller;padding:2px;margin:2px;border:1px solid blue;border-radius:4px}');
        css.push('.polyAreaContainer .canvasOptionsData input[type="checkbox"]{outline:1px solid blue}');
        css.push('.polyAreaContainer .perimeter,.polyAreaContainer .area{font-size:larger;background:darkGreen;color:whiteSmoke;border:1px solid darkGreen;border-radius:8px;box-shadow:1px 2px 2px darkGreen;padding:2px 6px;margin:4px}');
        css.push('.polyAreaContainer .area{background:darkRed;color:whiteSmoke;border:1px solid darkRed;box-shadow:1px 2px 2px darkRed}');
        css.push('.polyAreaContainer .inline{display:block;float:left;margin:auto;padding:2px}.polyAreaContainer .inline4{width:33%}.polyAreaContainer .inline6{width:46%}');
        css.push('.polyAreaContainer .bordered{border:1px solid gray}.polyAreaContainer .clearFix{clear:both;margin:0}');
        css.push('.polyAreaContainer .buttons{float:left}.polyAreaContainer .buttonsData{float:right;right:2%;position:relative}');
        css.push('.polyAreaContainer .button{font-size:larger;font-weight:bolder;background:gray;color:white;border-left:1px solid lightGray;border-top:1px solid lightGray;border-right:1px solid darkGray;border-bottom:1px solid darkGray;border-radius:8px;box-shadow:2px 4px 4px #333333;padding:4px;margin:1px;text-decoration:none}');
        css.push('.polyAreaContainer .button:hover{font-weight:normal;color:#333333;background:navajoWhite;border-left-color:darkGray;border-top-color:darkGray;border-right-color:lightGray;border-bottom-color:lightGray;box-shadow:1px 2px 2px #333333;cursor:pointer}');
        css.push('.polyAreaContainer .buttonBlue{background:blue;color:white;border-left-color:lightBlue;border-top-color:lightBlue;border-right-color:navy;border-bottom-color:navy}');
        css.push('.polyAreaContainer .buttonBlue:hover{background:navy;border-left-color:black;border-top-color:black;border-right-color:lightBlue;border-bottom-color:lightBlue;/*box-shadow-color:lightBlue*/}');
        css.push('.polyAreaContainer .buttonNavajo{background:lightYellow;color:maroon;border-left-color:yellow;border-top-color:yellow;border-right-color:navajoWhite;border-bottom-color:navajoWhite}');
        css.push('.polyAreaContainer .buttonNavajo:hover{background:navajoWhite;border-left-color:maroon;border-top-color:maroon;border-right-color:lightYellow;border-bottom-color:lightYellow;/*box-shadow-color:yellow*/}');
        css.push('.polyAreaContainer .buttonSmall{font-size:smaller;padding:2px;box-shadow:1px 1px 2px}');
        css.push('.polyAreaContainer .button img{width:100%;height:100%;text-decoration:none;margin:0;padding:0}');
        css.push('.polyAreaContainer .buttonImage16m{width:16px;height:16px;display:inline-block}');
        css.push('.polyAreaContainer .buttonImage24{width:24px;display:inline-block}');
        css.push('.polyAreaContainer .icon{margin:2px;padding:0;display:block;width:100%;height:100%;border:4px solid lightGray;background-color:lightGray;border-radius:8px;box-shadow:1px 1px 2px darkGray;outline:none}');
        css.push('.polyAreaContainer .icon:hover{box-shadow:none;background-color:navajoWhite;border-color:navajoWhite;outline:1px solid;cursor:pointer}');
        css.push('.polyAreaContainer .icon16{width:16px;height:16px;border-radius:4px}');
        css.push('.polyAreaContainer .labelIcon{margin:0 2px 0 4px;padding:0;display:inline-block;width:100%;height:100%;outline:none;background:navajoWhite}');
        css.push('.polyAreaContainer .labelIcon16{width:16px;height:16px}');
        css.push('.polyAreaContainer .logo{margin:2px;padding:0;width:100%;height:100%;border-radius:8px;box-shadow:1px 1px 2px darkGray;text-decoration:none;outline:none;float:left}');
        css.push('.polyAreaContainer .logo:hover{background-color:yellow}.polyAreaContainer .logo9{width:9px;height:9px;border-radius:1px}.polyAreaContainer .logo12{width:12px;height:12px;border-radius:2px}.polyAreaContainer .logo16{width:16px;height:16px;border-radius:4px}');
        css.push('.polyAreaContainer .logoGuerratron{background:url("data:image/gif;base64,R0lGODlhEAAQAOMMABUQEL4aF38yEmZXVCRmmU9mHf9ERVqrLM2Ue/uUMpSwwvrKgP///////////////yH5BAEKAA8ALAAAAAAQABAAAARY8J1HZb31jIzx+SDQXUg4XuCnnFT6JfCydAdBHIAgxAhmEwpCIAAbLESV34+YAMyQD+VAMNT1oEGbYhAwdFfQKEABEBkezjD6QaYI2OuLaPXYPHqsvP4SAQA7")}');
        css.push('.polyAreaContainer .logoPolyArea{background:url("data:image/gif;base64,R0lGODlhEAAQAKECAAcJBOIeFP///////yH5BAEKAAIALAAAAAAQABAAAAI0lC8RyAeqQHMPAtmuVEIz/11HNHUctEwoWrJcmaQiPIPZ3OEUNqbI24toWMGApgI0JJW+AgA7")}');
        css.push('/* END CanvasShapes - PolyArea */');
        css.push('/*]]>*/');
        return css.join("\n");
    }
})(canvasShapes || (canvasShapes = {}));
// END MODULE: UI 
