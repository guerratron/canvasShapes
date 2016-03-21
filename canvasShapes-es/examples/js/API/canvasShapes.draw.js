/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.draw.js' (METHODS) Métodos de dibujado del canvas, entre otros, los ejes de coordenadas.
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.draw.js' (METHODS) Métodos de dibujado del canvas, entre otros, los ejes de coordenadas.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: DRAW
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    /** Dibuja una rejilla de cuadrículas */
    function drawGrid(self, grid) {
        var canvas = self.getCanvas();
        var ctx = self.getContext();
        var fraccion = self.fractionGrid;
        grid = (grid && (fraccion > 0)) || (self.grid && (fraccion > 0));
        var canvasW = canvas.width; //pixels
        var canvasH = canvas.height; //pixels
        var iniW = (canvas.width - canvas.height * 0.95) / 2;
        var iniH = (canvas.height - canvas.height * 0.95) / 2;
        //var centred=self.coordinatesCentred; //TEMPORAL
        if (grid) {
            //ctx.save();
            //DESCENTRAR MOMENTANEAMENTE
            //if(centred) { canvasShapes.toDescentered(self); }
            //canvasShapes.toDescentered(self);
            //self.setCentred(false);
            //VERTICALES
            var decima = canvasW * fraccion;
            ctx.fillStyle = 'hotpink';
            var i;
            for (i = (canvasW / 2) + 0.5; i <= (canvasW - iniW); i += decima) {
                ctx.fillRect(i, iniH, 0.2, canvasH - iniH); //EJE Y RIGHT
            }
            for (i = (canvasW / 2) + 0.5; i >= iniW; i -= decima) {
                ctx.fillRect(i, iniH, 0.2, canvasH - iniH); //EJE Y LEFT
            }
            //HORIZONTALES
            decima = canvasH * fraccion;
            for (i = (canvasH / 2) + 0.5; i <= (canvasH - iniH); i += decima) {
                ctx.fillRect(iniW, i, canvasW - iniW, 0.2); //EJE X BOTTOM
            }
            for (i = (canvasH / 2) + 0.5; i >= iniH; i -= decima) {
                ctx.fillRect(iniW, i, canvasW - iniW, 0.2); //EJE X UP
            }
            //CENTRO
            ctx.arc(canvasW / 2 + 1, canvasH / 2 + 1, 2, 0, Math.PI * 2, true);
            ctx.fill();
        }
        //self.coordinatesCentred=centred;
        return ctx;
    }
    canvasShapes.drawGrid = drawGrid;
    /** Dibuja los ejes */
    function drawAxes(self, axes) {
        var canvas = self.getCanvas();
        var ctx = self.getContext();
        axes = axes || self.axes;
        var canvasW = canvas.width; //pixels
        var canvasH = canvas.height; //pixels
        var iniW = canvas.width - canvas.width * 0.95;
        var iniH = canvas.height - canvas.height * 0.95;
        //var centred=self.coordinatesCentred; //TEMPORAL
        if (axes) {
            //ctx.save();
            canvasShapes.updateAxesText(self);
            //DESCENTRAR MOMENTANEAMENTE
            //if(centred) { canvasShapes.toDescentered(self); }
            //canvasShapes.toDescentered(self);
            //self.setCentred(false);
            //EJES
            //ctx.restore();
            ctx.fillStyle = 'deepPink';
            //self.ctx.beginPath();
            //ctx.translate(canvasW, canvasH);
            ctx.fillRect(iniW, canvasH / 2 + 0.5, canvasW - iniW, 0.5); //EJE X
            ctx.fillRect(canvasW / 2 + 0.5, iniH, 0.5, canvasH - iniH); //EJE Y
        }
        //self.coordinatesCentred=centred;
        return ctx;
    }
    canvasShapes.drawAxes = drawAxes;
    /** Dibuja los textos de los ejes */
    function updateAxesText(self) {
        var canvas = self.getCanvas();
        var ctx = self.getContext();
        var canvasW = canvas.width; //pixels
        var canvasH = canvas.height; //pixels
        var iniW = canvas.width - canvas.width * 0.95;
        var iniH = canvas.height - canvas.height * 0.95;
        //var centred=self.coordinatesCentred; //TEMPORAL
        if (self.axes) {
            //ctx.save();
            //DESCENTRAR MOMENTANEAMENTE
            //if(centred) { canvasShapes.toDescentered(self); }
            //canvasShapes.toDescentered(self);
            //self.setCentred(false);
            //CALCULA EL MAXIMO DE LAS X O Y PARA EL TEXTO DE LOS EJES
            var maxPoint = canvasShapes.getCoordinatesMax(self, -1, true);
            //alert(maxPoint);
            //alert("DRAW - UPDATE-AXES-TEXT"+maxPoint);
            var maxPointX = self.equalProportion ? canvasShapes.getCoordinatesMax(self, 0, true) : maxPoint;
            var maxPointY = self.equalProportion ? canvasShapes.getCoordinatesMax(self, 1, true) : maxPoint;
            maxPointX = canvasShapes.toDecimals(maxPointX, self.decimals);
            maxPointY = canvasShapes.toDecimals(maxPointY, self.decimals);
            //TEXTO X [maxSize]
            ctx.font = "italic 14px Calibri";
            ctx.lineWidth = 1;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            // stroke color
            //self.ctx.strokeStyle = 'blue';
            //self.ctx.strokeText(self.name, p.x, p.y);
            ctx.strokeStyle = "deepPink"; //self.color;
            //self.ctx.fillText(self.name, p.x+(self.size*2), p.y+(self.size*2));
            ctx.strokeText("X", canvasW - iniW / 2, canvasH / 2 - iniH / 2);
            ctx.strokeText("Y", canvasW / 2 - iniW / 2, iniH / 2);
            //COMO NO FUNCIONA EN CANVAS \u0010\u0013
            ctx.font = "italic 8px Calibri";
            ctx.strokeText("[ " + maxPointX + " ]", canvasW - iniW, canvasH / 2 + 10);
            ctx.strokeText("[ " + maxPointY + " ]", canvasW / 2 + 14, iniH / 2);
        }
        //self.coordinatesCentred=centred;
        return ctx;
    }
    canvasShapes.updateAxesText = updateAxesText;
    /** Dibuja todas los puntos creados en el canvas. Sirve para actualizar valores también. */
    function drawPoints(self) {
        for (var i = 0; i < self.getChildren().Points.length; i++) {
            self.getChildren().Points[i].draw();
        }
    }
    canvasShapes.drawPoints = drawPoints;
    /** Dibuja todos los segmentos creados en el canvas. Sirve para actualizar valores también. */
    function drawSegments(self) {
        for (var i = 0; i < self.getChildren().Segments.length; i++) {
            self.getChildren().Segments[i].draw();
        }
    }
    canvasShapes.drawSegments = drawSegments;
    /** Dibuja todos los segmentos creados en el canvas. Sirve para actualizar valores también. */
    function drawPolygons(self) {
        for (var i = 0; i < self.getChildren().Polygons.length; i++) {
            self.getChildren().Polygons[i].draw();
        }
    }
    canvasShapes.drawPolygons = drawPolygons;
    /** Dibuja todas las formas creadas en el canvas. Sirve para actualizar valores también. */
    function drawShapes(self, TAG) {
        //TAG = "canvasShapes->drawShapes()::("+self.drawShapes.caller.name+")::["+TAG+"]::";
        for (var s in self.getChildren()) {
            if (self.getChildren().hasOwnProperty(s)) {
                for (var i = 0; i < self.getChildren()[s].length; i++) {
                    //self.shapes[s][i].draw(TAG);
                    self.getChildren()[s][i].draw();
                }
            }
        }
    }
    canvasShapes.drawShapes = drawShapes;
    /** Redibuja todo el canvas. Sirve para actualizar valores también. */
    function redraw(self) {
        if (!self) {
            self = canvasShapes.getInstance();
        }
        if (!self) {
            return false;
        }
        var TAG = "canvasShapes->redraw()::(" + redraw.caller.name + ")::"; //+self.getTAG()+"::";
        self.canvasClean();
        if (self.grid && !self.gridFront) {
            canvasShapes.drawGrid(self, self.grid);
        }
        if (self.axes && !self.axesFront) {
            canvasShapes.drawAxes(self, self.axes);
        }
        self.setPointsProportion(self.deformation);
        self.setPointsInversion();
        //self.drawPoints();
        //self.drawSegments();
        //self.drawPolygons();
        //self.getContext().save();
        //if(self.coordinatesCentred) { self.setCentred(true); }
        canvasShapes.drawShapes(self, TAG);
        //self.getContext().restore();
        if (self.grid && self.gridFront) {
            canvasShapes.drawGrid(self, self.grid);
        }
        if (self.axes && self.axesFront) {
            canvasShapes.drawAxes(self, self.axes);
        }
        if (self.showBody) {
            canvasShapes.updateOut(self);
        } //SALIDA
        /*alert("Points: "+self.getPoints().length +
        "\nSegments: "+self.getSegments().length +
        "\nPolygons: "+self.getPolygons().length);*/
        return true;
    }
    canvasShapes.redraw = redraw;
    /** Actualiza todos los valores para la interfaz gráfica. */
    function updateOut(self) {
        if (self.canvasDataInfo) {
            var perimeter = self.getCanvas().parentNode.parentNode.getElementsByClassName("perimeter")[0];
            perimeter.innerHTML = canvasShapes.toDecimals(self.perimeter(), self.decimals) + "";
            var area = self.getCanvas().parentNode.parentNode.getElementsByClassName("area")[0];
            area.innerHTML = canvasShapes.toDecimals(self.area(), self.decimals);
        }
        if (self.canvasDataIntro) {
            var x = [], y = [];
            var coords = self.getCoordinates();
            for (var i in coords) {
                //coords[i][0] = canvasShapes.toDecimals(coords[i][0], self.decimals);
                //coords[i][1] = canvasShapes.toDecimals(coords[i][1], self.decimals);
                if (!isNaN(coords[i][0])) {
                    x.push(coords[i][0]);
                }
                if (!isNaN(coords[i][1])) {
                    y.push(coords[i][1]);
                }
            }
            var xs = self.getCanvas().parentNode.parentNode.getElementsByClassName("coordinatesXs")[0];
            xs.value = (x.length > 0) ? ("[ " + x.join(", ") + " ]") : "";
            var ys = self.getCanvas().parentNode.parentNode.getElementsByClassName("coordinatesYs")[0];
            ys.value = (y.length > 0) ? ("[ " + y.join(", ") + " ]") : "";
            coords = [];
            var cs, ps;
            for (var j = 0; j < self.getPolygons().length; j++) {
                ps = self.getPolygons()[j].getPoints();
                cs = [];
                for (var k = 0; k < ps.length; k++) {
                    if (ps[k] !== null) {
                        cs.push("[" + ps[k].coordinates() + "]");
                    }
                }
                coords.push("[" + cs.join(", ") + "]");
            }
            //[[[100,50], [-100,50], [20,20]]]
            var xy = self.getCanvas().parentNode.parentNode.getElementsByClassName("coordinatesXY")[0];
            //xy.value = (coords.length>0) ? ("[[" + coords.join("], [") + "]]") : "";
            xy.value = (coords.length > 0) ? ("[" + coords.join(", ") + "]") : "";
        }
    }
    canvasShapes.updateOut = updateOut;
})(canvasShapes || (canvasShapes = {}));
// END MODULE: DRAW 
