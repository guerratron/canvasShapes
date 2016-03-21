/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.events.js' (METHODS) Eventos implementados en los objetos "PolyArea" del canvas.
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.events.js' (METHODS) Eventos implementados en los objetos "PolyArea" del canvas.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: EVENTS
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    /** COMPATIBILIZADOR DE EVENTOS
     * donde 'elem' es el elemento sobre el que se quiere establecer la escucha, 'enventType' el evento (sin prefijo 'on')
     * y 'handler' la función a ejecutar
     * Se retorna el objeto 'Util' para permitir 'chaining' */
    function addEvent(elem, eventType, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(eventType, handler, false);
        }
        else if (elem.attachEvent) {
            elem.attachEvent('on' + eventType, handler);
        }
        else {
            alert("NO PUEDEN ASOCIARSE EVENTOS AL ELEMENTO");
        }
        //return this;
    }
    canvasShapes.addEvent = addEvent;
    /** COMPATIBILIZADOR DE EVENTOS
    * donde 'elem' es el elemento sobre al que se le quiere quitar la escucha, 'enventType' el evento (sin prefijo 'on')
    * y 'handler' la función a suprimir.
    * Se retorna el objeto 'Util' para permitir 'chaining' */
    function removeEvent(elem, eventType, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(eventType, handler, false);
        }
        else if (elem.detachEvent) {
            elem.detachEvent('on' + eventType, handler);
        }
        else {
            elem[eventType] = null;
        }
        //return this;
    }
    canvasShapes.removeEvent = removeEvent;
    /** COMPATIBILIZADOR DE EVENTOS
    * donde 'elem' es el elemento sobre el que se quiere averiguar si existe el evento y 'enventType' es el evento (sin prefijo 'on')
    * a comprobar su existencia. */
    function hasEvent(elem, eventType) {
        eventType = (elem.attachEvent) ? "on" + eventType : eventType;
        var comprobacion1 = (typeof elem[eventType] === "function");
        var comprobacion2 = (elem[eventType] !== undefined);
        var comprobacion3 = elem.hasOwnProperty(eventType);
        return comprobacion1 || comprobacion2;
    }
    canvasShapes.hasEvent = hasEvent;
    //MOUSE-CLICK - MousePoints
    function mouseClickEvent(event) {
        var canvas = event.target;
        var self = canvas.getPolyArea();
        if (self.mousedown) {
            self.mousedown = false;
            return false;
        }
        if (self.shapeDrop && (self.shapeDrop.Point || self.shapeDrop.Segment || self.shapeDrop.Polygon)) {
            return false;
        }
        if (!(self.mousePoints) || self.freeDraw) {
            return false;
        }
        var x = 0;
        var y = 0;
        if (canvas) {
            var xy = canvasShapes.getEventOffsetXY(event, true); //canvasShapes.getEventXY(event);
            x = xy[0];
            y = xy[1];
        }
        else {
            alert("NO SE ADMITE 'canvas'");
            return;
        }
        //CALCULAR X e Y PROPORCIONADAS CON LAS COORDENADAS ESTABLECIDAS EN EL CANVAS
        x = ((x * 1 / self.proportionX) - ((canvas.width / 2) * (1 / self.proportionX))) * (self.invertX ? -1 : 1);
        y = ((y * 1 / self.proportionY) - ((canvas.height / 2) * (1 / self.proportionY))) * (self.invertY ? -1 : 1);
        var shapes = null;
        var p = new canvasShapes.PolyArea.Point(self);
        p.setX(x);
        p.setY(y);
        //POLIGONOS
        shapes = canvasShapes.getSelected(self, "Polygon");
        if (shapes && (shapes.length > 0)) {
            shapes[0].addPoint(p);
        }
        else {
            //SEGMENTOS
            shapes = canvasShapes.getSelected(self, "Segment");
            if (shapes && (shapes.length > 0)) {
                canvasShapes.divideSegmentFromPoint(self, shapes[0], p);
            }
            else {
                //PUNTOS
                self.addPoint(p);
            }
        }
        //REDIBUJAR EL CANVAS
        //canvasShapes.redraw();
        self.draw();
        return false;
    }
    canvasShapes.mouseClickEvent = mouseClickEvent;
    //MOUSE-MOVE - MouseInfo
    function mouseMoveEvent(event) {
        var canvas = event.target;
        var self = canvas.getPolyArea();
        //if(!self.mousePoints) { return false; }
        var tooltip = document.getElementById("tooltip-" + canvas.id);
        tooltip.style.padding = "4px";
        tooltip.style.boxShadow = "1px 1px 2px orange";
        tooltip.style.borderRadius = "6px";
        tooltip.style.fontSize = "smaller";
        //var tooltipX=tooltip.style.left;
        //var tooltipY=tooltip.style.top;
        var encontrado = false;
        var realX = 0, realY = 0;
        var x = 0, y = 0;
        if (canvas) {
            var realXY = canvasShapes.getEventPageXY(event);
            realX = realXY[0];
            realY = realXY[1];
            var xy = canvasShapes.getEventOffsetXY(event, true);
            x = xy[0];
            y = xy[1];
        }
        else {
            alert("NO SE ADMITE 'canvas'");
            return;
        }
        //TOLERANCIA PARA QUE EL TOOLTIP NO SALGA DEL CANVAS
        var toleranciaX = (x > (canvas.width / 2)) ? 50 : 0;
        var toleranciaY = (y > (canvas.height / 2)) ? 50 : 0;
        //CALCULAR X e Y PROPORCIONADAS CON LAS COORDENADAS ESTABLECIDAS EN EL CANVAS
        x = ((x * 1 / self.proportionX) - ((canvas.width / 2) * (1 / self.proportionX))) * (self.invertX ? -1 : 1);
        y = ((y * 1 / self.proportionY) - ((canvas.height / 2) * (1 / self.proportionY))) * (self.invertY ? -1 : 1);
        //x = canvasShapes.toXComputed(self, x);
        //y = canvasShapes.toYComputed(self, y);
        var fraccionX = (self.fractionGrid * (canvas.width * (1 / self.proportionX))) / 3;
        var fraccionY = (self.fractionGrid * (canvas.height * (1 / self.proportionY))) / 3;
        //FREEDRAW
        if (self.freeDraw) {
            //canvasShapes.drawPointsFreeDraw(self, x - canvas.width/2, y - canvas.height/2);
            canvasShapes.drawPointsFreeDraw(self, x, y);
            tooltip.style.visibility = "hidden";
            return false;
        }
        if (self.mouseInfo) {
            for (var shapes in self.getChildren()) {
                //if(shapes === "Polygons"){
                for (var i = 0; i < self.getChildren()[shapes].length; i++) {
                    if (encontrado) {
                        break;
                    }
                    var shape = self.getChildren()[shapes][i];
                    var tooltipXY = shape.getTooltipXY();
                    if ((x < (tooltipXY[0] + fraccionX / 2)) && (x > (tooltipXY[0] - fraccionX / 2)) &&
                        (y < (tooltipXY[1] + fraccionY / 2)) && (y > (tooltipXY[1] - fraccionY / 2))) {
                        tooltip.innerHTML = shape.getInfo();
                        tooltip.style.left = (realX + fraccionX - toleranciaX) + "px";
                        tooltip.style.top = (realY + fraccionY - toleranciaY) + "px";
                        //tooltip.style.fontSize="large";
                        if (!self.freeDraw) {
                            tooltip.style.visibility = "visible";
                        }
                        encontrado = true;
                        //self.selectShapes([shape], true);
                        //shape.selected=true;
                        break;
                    }
                }
                //}
                if (encontrado) {
                    break;
                }
            }
        }
        else {
            encontrado = true;
        }
        var difX, difY;
        if (self.mouseDrop && self.mousedown && self.shapesDrop.Point) {
            //COMPROBAR SI SE DESPLAZA SOBRE OTRO PUNTO
            var p = canvasShapes.getPointFromCoordinates(self, self.shapesDrop.Point, fraccionX, fraccionY);
            //if(p) alert(p+" :: "+x+", "+y+" - "+fraccionX+", "+fraccionY);
            if (p) {
                if (self.oldCoordinates) {
                    var oldX = self.oldCoordinates[0][0];
                    var oldY = self.oldCoordinates[0][1];
                    //self.shapesDrop.Point.setX(oldX);
                    //self.shapesDrop.Point.setY(oldY);
                    self.shapesDrop.Point.moveTo(oldX, oldY);
                }
                var seg = canvasShapes.addSegmentFromPoints(self, self.shapesDrop.Point, p);
                seg.setSelected(false);
                //self.mousedown = false;
                //self.mouseDrop=false;
                self.shapesDrop.Point = null;
                //self.mousedown=false;
                //self.mouseup=true;
                self.oldCoordinates = null;
                self.draw();
            }
            else {
                self.shapesDrop.Point.setX(x);
                self.shapesDrop.Point.setY(y);
                //self.selectShapes([self.shapesDrop.Point], true);
                self.shapesDrop.Point.selected = true;
            }
        }
        else if (self.mouseDrop && self.mousedown && self.shapesDrop.Segment) {
            //var centro=self.shapesDrop.Segment.getCentralPoint();
            //difX=x-centro.getX();
            //difY=y-centro.getY();
            //DESPLAZAR EL SEGMENTO A ESTAS COORDENADAS
            //self.shapesDrop.Segment.moveTo(difX, difY);
            self.shapesDrop.Segment.moveTo(x, y);
            //self.selectShapes([self.shapesDrop.Segment], true);
            self.shapesDrop.Segment.selected = true;
        }
        else if (self.mouseDrop && self.mousedown && self.shapesDrop.Polygon) {
            //var centroide=self.shapesDrop.Polygon.centroide();
            //difX=x-centroide[0];
            //difY=y-centroide[1];
            //DESPLAZAR EL POLÍGONO A ESTAS COORDENADAS
            //self.shapesDrop.Polygon.move(difX, difY);
            self.shapesDrop.Polygon.moveTo(x, y);
            //self.selectShapes([self.shapesDrop.Polygon], true);
            self.shapesDrop.Polygon.selected = true;
        }
        //REDIBUJAR EL CANVAS
        if (encontrado && self.mouseDrop && self.mousedown) {
            self.draw();
        }
        return false;
    }
    canvasShapes.mouseMoveEvent = mouseMoveEvent;
    //MOUSE-DOWN
    function mouseDownEvent(event) {
        var canvas = event.target;
        var self = canvas.getPolyArea();
        //if(!self.mousePoints) { return; }
        self.mouseup = false;
        //self.mousedown=true;
        var encontrado = false;
        self.shapesDrop = { "Point": null, "Segment": null, "Polygon": null };
        var realX = 0, realY = 0;
        var x = 0, y = 0;
        if (canvas) {
            var realXY = canvasShapes.getEventPageXY(event);
            realX = realXY[0];
            realY = realXY[1];
            var xy = canvasShapes.getEventOffsetXY(event, true);
            x = xy[0];
            y = xy[1];
        }
        else {
            alert("NO SE ADMITE 'canvas'");
            return;
        }
        //CALCULAR X e Y PROPORCIONADAS CON LAS COORDENADAS ESTABLECIDAS EN EL CANVAS
        x = ((x * 1 / self.proportionX) - ((canvas.width / 2) * (1 / self.proportionX))) * (self.invertX ? -1 : 1);
        y = ((y * 1 / self.proportionY) - ((canvas.height / 2) * (1 / self.proportionY))) * (self.invertY ? -1 : 1);
        //x = canvasShapes.toXComputed(self, x);
        //y = canvasShapes.toYComputed(self, y);
        var fraccionX = (self.fractionGrid * (canvas.width * (1 / self.proportionX))) / 2;
        var fraccionY = (self.fractionGrid * (canvas.height * (1 / self.proportionY))) / 2;
        //FREEDRAW
        if (self.freeDraw) {
            self.freeDrawON = true;
            self.mousedown = true;
            //if(canvasShapes.drawPointsFreeDraw(self, x - self.getCanvas().width/2, y - self.getCanvas().height/2)){ return false; }
            if (canvasShapes.drawPointsFreeDraw(self, x, y)) {
                return false;
            }
        }
        for (var shapes in self.getChildren()) {
            //if(shapes === "Polygons"){
            for (var i = 0; i < self.getChildren()[shapes].length; i++) {
                var shape = self.getChildren()[shapes][i];
                //if(shape.selected) {
                /*var shapeX=0, shapeY=0;
                if(shapes === "Points"){
                    shapeX=shape.getX();
                    shapeY=shape.getY();
                } else if(shapes === "Segments"){
                    shapeX=shape.getCentralPoint().getX();
                    shapeY=shape.getCentralPoint().getY();
                } else if(shapes === "Polygons"){ //PARA LOS POLIGONOS ...
                  shapeX=shape.centroide()[0];
                  shapeY=shape.centroide()[1];
                  //alert(shape.getId()+" :: "+shapeX+", "+shapeY);
                }*/
                var tooltipXY = shape.getTooltipXY();
                if (!encontrado &&
                    (x < (tooltipXY[0] + fraccionX / 2)) && (x > (tooltipXY[0] - fraccionX / 2)) &&
                    (y < (tooltipXY[1] + fraccionY / 2)) && (y > (tooltipXY[1] - fraccionY / 2))) {
                    self.shapesDrop[shapes.substring(0, shapes.length - 1)] = shape;
                    self.oldCoordinates = shape.coordinates();
                    encontrado = true;
                    self.mousedown = true;
                    //DESELECCIONAR TODAS LAS FIGURAS SI NO SE ENCUENTRA PULSADA LA TECLA CTR
                    /*alert("Keycode of key pressed: "+
                            "keycode: " + event.keyCode +
                            ", which: "+ event.which +
                            ", ctrlKey: "+event.ctrlKey +
                            ", altKey: "+event.altKey +
                            ", metaKey: "+event.metaKey +
                            ", shiftKey: "+event.shiftKey +
                            ", button: "+ event.button);
                    */
                    var preSelected = shape.selected;
                    if (!event.ctrlKey) {
                        canvasShapes.selectShapes(self, [], true); //self, shapes, only
                    }
                    shape.selected = !preSelected;
                    if (!event.ctrlKey) {
                        canvasShapes.redraw(self);
                    }
                    else {
                        shape.draw();
                    }
                    break;
                }
                //}
                if (encontrado) {
                    break;
                }
            }
            //}
            if (encontrado) {
                break;
            }
        }
        //alert(self.shapesDrop.Segment+", "+ self.shapesDrop.Point);
    }
    canvasShapes.mouseDownEvent = mouseDownEvent;
    //MOUSE-UP
    function mouseUpEvent(event) {
        var canvas = event.target;
        var self = canvas.getPolyArea();
        //self.mousedown=false;
        self.mouseup = true;
        //self.selectShapes([self.getSelected()], true);
        /*
        if(!self.mousePoints) return;
        self.mousedown = false;
        self.mouseup=true;*/
        if (self.freeDraw) {
            self.freeDrawON = false;
        }
    }
    canvasShapes.mouseUpEvent = mouseUpEvent;
    //MOUSE-OUT
    function mouseOutEvent(event) {
        var canvas = event.target;
        var self = canvas.getPolyArea();
        //self.selectShapes([self.getSelected()], true);
        /*
        if(!self.mousePoints) return;
        self.mousedown = false;
        self.mouseup=true;*/
        var tooltip = document.getElementById("tooltip-" + canvas.id);
        tooltip.innerHTML = "..";
        tooltip.style.left = "0";
        tooltip.style.top = "0";
        tooltip.style.visibility = "hidden";
        if (self.freeDraw) {
            self.freeDrawON = false;
        }
    }
    canvasShapes.mouseOutEvent = mouseOutEvent;
    // ENABLE SHAPES EVENTS CONTROLS
    /** Permite los eventos en los Puntos */
    function startPointEvents(self, p) {
        if (p) {
            p.startEvents();
        }
        else {
            self.eventOnPointCreate = true;
            self.eventOnPointDraw = true;
            self.eventOnPointRemove = true;
            self.eventOnPointClone = true;
            self.eventOnPointRefresh = true;
            self.eventOnPointX = true;
            self.eventOnPointY = true;
            self.eventOnPointName = true;
        }
    }
    canvasShapes.startPointEvents = startPointEvents;
    /** Deniega los eventos en los Puntos */
    function stopPointEvents(self, p) {
        if (p) {
            p.stopEvents();
        }
        else {
            self.eventOnPointCreate = false;
            self.eventOnPointDraw = false;
            self.eventOnPointRemove = false;
            self.eventOnPointClone = false;
            self.eventOnPointRefresh = false;
            self.eventOnPointX = false;
            self.eventOnPointY = false;
            self.eventOnPointName = false;
        }
    }
    canvasShapes.stopPointEvents = stopPointEvents;
})(canvasShapes || (canvasShapes = {}));
// END MODULE: EVENTS 
