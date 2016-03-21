/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.shapes.js' (METHODS) Funciones que atañen diréctamente a las figuras de dibujado.
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.shapes.js' (METHODS) Funciones que atañen diréctamente a las figuras de dibujado.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: SHAPES
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    //AÑADIDO Y CREACIÓN DE SHAPES
    //PUNTOS
    /** Añade unas coordenadas como Punto Primitivo al array de puntos.
          * También establece posibles proporciones e inversión. Retorna el punto tras su inserción. */
    function addXY(self, x, y) {
        var p = new canvasShapes.PolyArea.Point(self);
        //if(self.getPoints().length>0) alert("POLYAREA:addXY():: "+self.getPoints()[0].getId()+" == "+p.getId());
        p.setX(x);
        p.setY(y);
        //alert("POLYAREA:addXY():: ["+ p.getX() +","+ p.getY()+"]");
        //AÑADE ESTE PUNTO AL ARRAY SI NO EXISTÍA (NO PUEDE EXISTIR PORQUE LO ACABAMOS DE CREAR!!)
        return addPoint(self, p);
    }
    canvasShapes.addXY = addXY;
    /** Añade un punto al array de puntos, si no existía anteriormente.
          * También establece posibles proporciones e inversión.
          * Retorna el mismo punto tras su inserción.
          * ATENCIÓN:: No llamar desde este método a Point.toCollection() pues crearía recursión. */
    function addPoint(self, point) {
        //point.setId ( point.getId() || (new Date().getTime()+"-"+Math.floor((Math.random() * 100) + 1)) );
        //AÑADE ESTE PUNTO AL ARRAY SI NO EXISTÍA
        var existe = false;
        for (var i = 0; i < self.getPoints().length; i++) {
            //alert("POLYAREA:addPoint():: "+self.getPoints()[i].getId()+" == "+point.getId());
            if (self.getPoints()[i].getId() === point.getId()) {
                existe = true;
            }
        }
        //alert("POLYAREA:addPoint():: ["+ point.getX() +","+ point.getY()+"] - EXISTE="+existe1+", VALIDO="+point.valido);
        if (!existe && point.valido) {
            self.getPoints().push(point);
            //alert("POLYAREA:addPoint():: PUSH:: "+self.getPoints().length+" , "+self.getPoints()[0].getId());
            //alert("POLYAREA:addPoint():: ["+ point.getX() +","+ point.getY()+"]");
            //PROPORCIÓN E INVERSIÓN
            self.setPointsProportion(self.equalProportion);
            self.setPointsInversion();
        }
        return point;
    }
    canvasShapes.addPoint = addPoint;
    /** Crear puntos desde un array de coordenadas X e Y y los añade al array de puntos de este objeto. Retorna el array de puntos construido.
          * El array de entrada se espera en la forma: XY=[ [x1, x1, ..., xn], ..., [y1, y2, ..., yn] ]
          * ATENCIÓN: Asegurarse que las coordenadas pasadas son correctas ya que este método no tiene posibilidad alguna de
          * comprobar la duplicidad de los puntos creados. */
    function addPointsFromXY(self, arrayXY) {
        arrayXY = arrayXY || [[], []];
        var points = [];
        for (var i = 0; i < arrayXY[0].length; i++) {
            if (arrayXY[0] && arrayXY[1]) {
                points.push(addXY(self, arrayXY[0][i], arrayXY[1][i]));
            }
        }
        return points;
    }
    canvasShapes.addPointsFromXY = addPointsFromXY;
    /** Crear puntos desde un array de pares de coordenadas de Punto y los añade al array de puntos de este objeto. Retorna el array de puntos construido.
          * El array de entrada se espera en la forma: XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]
          * ATENCIÓN: Asegurarse que las coordenadas pasadas son correctas ya que este método no tiene posibilidad alguna de
          * comprobar la duplicidad de los puntos creados. */
    function addPointsFromCoordinates(self, coordinates) {
        coordinates = coordinates || [];
        var points = [];
        for (var i = 0; i < coordinates.length; i++) {
            //alert("POLYAREA:addPointsFromCoordinates():: "+i+" - ["+coordinates[i][0] +","+ coordinates[i][1]+"]");
            if (coordinates[i] && (coordinates[i].length > 1)) {
                points.push(addXY(self, coordinates[i][0], coordinates[i][1]));
            }
        }
        return points;
    }
    canvasShapes.addPointsFromCoordinates = addPointsFromCoordinates;
    /** Añade los puntos pasados al array de puntos de este objeto.
          * El array de entrada se espera en la forma: XY=[ point_1, point_2, ..., point_n ]
          * ATENCIÓN: Este método SI COMPRUEBA la duplicidad de los puntos creados, si ya existiesen con aterioridad no se añadirán. */
    function addPointsFromPointsArray(self, arrayPoints) {
        for (var i = 0; i < arrayPoints.length; i++) {
            addPoint(self, arrayPoints[i]); //en este método se realizan las comprobaciones //TODO:: podría realizarse mediante 'concat(..)'
        }
    }
    canvasShapes.addPointsFromPointsArray = addPointsFromPointsArray;
    //SEGMENTOS
    /** Añade un segmento al array de formas, si no existía con aterioridad.
          * También propaga la inserción de sus hijos y establece posibles proporciones e inversión.
          * Retorna el segmento tras su inserción.
          * ATENCIÓN:: No llamar desde este método a Segment.toCollection() pues crearía recursión. */
    function addSegment(self, segment) {
        if (!segment) {
            return null;
        }
        //segment.setId( segment.getId() || (new Date().getTime()+"-"+Math.floor((Math.random() * 100) + 1)) );
        //AÑADE ESTE SEGMENTO AL ARRAY SI NO EXISTÍA
        var existe = false;
        for (var i = 0; i < self.getSegments().length; i++) {
            if (self.getSegments()[i].getId() === segment.getId()) {
                existe = true;
            }
        }
        if (!existe && segment.valido) {
            self.getSegments().push(segment);
            //PROPORCIÓN E INVERSIÓN
            self.setPointsProportion(self.equalProportion);
            self.setPointsInversion();
        }
        return segment;
    }
    canvasShapes.addSegment = addSegment;
    /** Crear un segmento desde dos puntos.
          * Como entrada se esperan los dos puntos y se retornará el Segmento construido.
          * ATENCIÓN: Este método NO COMPRUEBA la duplicidad del segmento creado, aunque SI la de sus puntos hijos, si ya existiesen con
          * aterioridad no se añadirán. */
    function addSegmentFromPoints(self, point1, point2) {
        if (!point1 || !point2) {
            return null;
        }
        var segment = new canvasShapes.PolyArea.Segment(self);
        segment.setP1(point1);
        segment.setP2(point2);
        addSegment(self, segment);
        return segment;
    }
    canvasShapes.addSegmentFromPoints = addSegmentFromPoints;
    /** Crear segmentos desde un array de coordenadas X e Y y los añade al array de segmentos de este objeto. Retorna el array de segmentos construido.
          * Hay que tener en cuenta que el punto final de un segmento será el inicial del siguiente segmento y, además, quedará atado el punto final
          * del último segmento con el punto inicial del primer segmento (CIERRE CIRCULAR).
          * El array de entrada se espera en la forma: XY=[ [x1, x1, ..., xn], ..., [y1, y2, ..., yn] ]
          * ATENCIÓN: Asegurarse que las coordenadas pasadas son correctas ya que este método no tiene posibilidad alguna de
          * comprobar la duplicidad de los segmentos creados. */
    function addSegmentsFromXY(self, arrayXY, closed) {
        return addSegmentsFromPointsArray(self, addPointsFromXY(self, arrayXY), closed);
    }
    canvasShapes.addSegmentsFromXY = addSegmentsFromXY;
    /** Crear segmentos desde un array de pares de coordenadas de Punto y los añade al array de segmentos de este objeto. Retorna el array de segmentos construido.
          * Hay que tener en cuenta que el punto final de un segmento será el inicial del siguiente segmento y, además, quedará atado el punto final
          * del último segmento con el punto inicial del primer segmento (CIERRE CIRCULAR).
          * El array de entrada se espera en la forma: XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]
          * ATENCIÓN: Asegurarse que las coordenadas pasadas son correctas ya que este método no tiene posibilidad alguna de
          * comprobar la duplicidad de los segmentos creados. */
    function addSegmentsFromCoordinates(self, coordinates, closed) {
        return addSegmentsFromPointsArray(self, addPointsFromCoordinates(self, coordinates), closed);
    }
    canvasShapes.addSegmentsFromCoordinates = addSegmentsFromCoordinates;
    /** Crear segmentos desde un array de puntos y los añade al array de segmentos de este objeto, teniendo en cuenta que el punto final de un
          * segmento será el inicial del siguiente segmento, y (si closed es true [por defecto TRUE]) quedará atado el punto final del último segmento
          * con el punto inicial del primer segmento (CIERRE CIRCULAR). Retorna el array de segmentos construido.
          * El array de entrada se espera en la forma: XY=[ point_1, point_2, ..., point_n ], y se retornará un array de Segmentos.
          * ATENCIÓN: Este método NO COMPRUEBA la duplicidad de los segmentos creados, aunque SI la de sus puntos hijos, si ya existiesen con
          * aterioridad no se añadirán. */
    function addSegmentsFromPointsArray(self, arrayPoints, closed) {
        if (!arrayPoints || (arrayPoints.length === 0)) {
            return [];
        }
        closed = ((typeof (closed)).toUpperCase() === "UNDEFINED") ? true : closed;
        var segments = [];
        for (var i = 1; i < arrayPoints.length; i++) {
            //var segment=self.addSegmentFromPoints(self.addXY(arrayPoints[i-1][0], arrayPoints[i-1][1]),
            //  self.addXY(arrayPoints[i][0], arrayPoints[i][1]));
            var segment = addSegmentFromPoints(self, arrayPoints[i - 1], arrayPoints[i]);
            //var segment=self.addSegmentFromPoints(arrayPoints[i-1], arrayPoints[i]);
            segments.push(segment);
            //VERIFICA QUE EL PUNTO DEL ÚLTIMO SEGMENTO TENGA OTRA COORDENADA DISTINTA AL PUNTO DEL PRIMER SEGMENTO
            var distinto = (segment.getP2().getX() !== segments[0].getP1().getX()) ||
                (segment.getP2().getY() !== segments[0].getP1().getY());
            //CIERRE CIRCULAR
            if (closed && (i === (arrayPoints.length - 1)) && distinto) {
                segments.push(addSegmentFromPoints(self, segment.getP2(), segments[0].getP1()));
            }
        }
        /*for(var i=0; i<segments.length; i++){
              var segment=segments[i];
              alert(segment.getP1().getName()+"-"+segment.getP2().getName());
            }*/
        return segments;
    }
    canvasShapes.addSegmentsFromPointsArray = addSegmentsFromPointsArray;
    /** Añade segmentos desde un array de segmentos al array de segmentos del objeto.
          * El array de entrada se espera en la forma: XY=[ segment_1, segment_2, ..., segment_n ]
          * ATENCIÓN: Este método SI COMPRUEBA la duplicidad de los segmentos creados (aunque no su naturaleza), si ya existiesen con
          * aterioridad no se añadirán. */
    function addSegmentsFromSegmentsArray(self, arraySegments) {
        for (var i = 0; i < arraySegments.length; i++) {
            addSegment(self, arraySegments[i]); //en este método se realizan las comprobaciones y propagación a sus hijos
        }
    }
    canvasShapes.addSegmentsFromSegmentsArray = addSegmentsFromSegmentsArray;
    /** Divide un semento en otros dos segmentos con un punto en común. Suprime el segmento pasado como parametro.
         *  NO UTILIZARLO EN SEGMENTOS DE UN POLIGONO */
    function divideSegmentFromPoint(self, segment, newPoint) {
        if (!segment || !newPoint) {
            return null;
        }
        //self._super.addPoint(newPoint);
        //var firstPoint=segment.getP1();
        //var lastPoint=segment.getP2();
        //var firstSeg=self.addSegmentFromPoints(firstPoint, newPoint);
        var firstSeg = addSegmentFromPoints(self, segment.getP1(), newPoint);
        var lastSeg = addSegmentFromPoints(self, newPoint, segment.getP2());
        //lastSeg.selected=true;
        //self.unSelectShapesAll();
        //self.selectShapes([lastSeg]);
        //COMPROBAMOS SI PERTENECE A UN POLÍGONO EXISTENTE
        self.getPolygons().forEach(function (p) {
            p.getChildren().forEach(function (s) {
                if (s.getId() === segment.getId()) {
                    p.addSegment(firstSeg);
                    p.addSegment(lastSeg);
                }
            });
        });
        //ELIMINAMOS EL ÚLTIMO SEGMENTO (lo vamos a partir en dos) pero no sus puntos
        segment.remove(false); //self.removeSegment(segment, false);
    }
    canvasShapes.divideSegmentFromPoint = divideSegmentFromPoint;
    //POLÍGONOS
    /** Añade un poligono al array de formas, si no existía con aterioridad.
          * También propaga la inserción de sus hijos y establece posibles proporciones e inversión.
          * Retorna el polígono tras su inserción.
          * ATENCIÓN:: No llamar desde este método a Polygon.toCollection() pues crearía recursión. */
    function addPolygon(self, polygon) {
        if (!polygon) {
            return null;
        }
        //polygon.setId( polygon.getId() || (new Date().getTime()+"-"+Math.floor((Math.random() * 100) + 1)) );
        //AÑADE ESTE POLÍGONO AL ARRAY SI NO EXISTÍA
        var existe = false;
        for (var i = 0; i < self.getPolygons().length; i++) {
            if (self.getPolygons()[i].getId() === polygon.getId()) {
                existe = true;
            }
        }
        if (!existe && polygon.valido) {
            self.getPolygons().push(polygon);
            //PROPORCIÓN E INVERSIÓN
            self.setPointsProportion(self.equalProportion);
            self.setPointsInversion();
        }
        //polygon.selected=true;
        //self.unSelectShapesAll();
        //self.selectShapes([polygon]);
        return polygon;
    }
    canvasShapes.addPolygon = addPolygon;
    /** Crear UN polígono desde un array de coordenadas X e Y y lo añade al array de polígonos de este objeto, es recurrente y añade
          * todos los hijos creados si no existían con anterioridad. El parámetro 'closed' indica si cerrar el polígono con un último
          * segmento que irá desde el punto final creado al punto inicial, cerrando así la forma geométrica construida. Retorna el polígono creado.
          * El array de entrada se espera en la forma: XY=[ [x1, x1, ..., xn], ..., [y1, y2, ..., yn] ]
          * ATENCIÓN: Asegurarse que las coordenadas pasadas son correctas ya que este método no tiene posibilidad alguna de
          * comprobar la duplicidad de los segmentos creados. */
    function addPolygonFromXY(self, arrayXY, closed) {
        var polygon = new canvasShapes.PolyArea.Polygon(self);
        //RESETEA LAS LETRAS
        canvasShapes.ABC.reset();
        polygon.setChildren(addSegmentsFromXY(self, arrayXY, closed));
        addPolygon(self, polygon);
        return polygon;
    }
    canvasShapes.addPolygonFromXY = addPolygonFromXY;
    /** Crear UN polígono desde un array de pares de coordenadas de Puntos y lo añade al array de polígonos de este objeto, es recurrente y añade
          * todos los hijos creados si no existían con anterioridad. El parámetro 'closed' indica si cerrar el polígono con un último
          * segmento que irá desde el punto final creado al punto inicial, cerrando así la forma geométrica construida. Retorna el polígono creado.
          * El array de entrada se espera en la forma: XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]
          * ATENCIÓN: Asegurarse que las coordenadas pasadas son correctas ya que este método no tiene posibilidad alguna de
          * comprobar la duplicidad de los segmentos creados. */
    function addPolygonFromCoordinates(self, coordinates, closed) {
        //if(!coordinates || (coordinates.length < 3)) return false;
        var polygon = new canvasShapes.PolyArea.Polygon(self);
        //RESETEA LAS LETRAS
        canvasShapes.ABC.reset();
        polygon.setChildren(addSegmentsFromCoordinates(self, coordinates, closed));
        addPolygon(self, polygon);
        return polygon;
    }
    canvasShapes.addPolygonFromCoordinates = addPolygonFromCoordinates;
    /** Igual a 'addPolygonFromCoordinates(..)' pero se esperan coordenadas en formato de múltiples polígonos:
     * XY=[ [[x1, y1], [x2, y2], ..., [xn, yn]], [[xx1, yy1], [xx2, yy2], ..., [xxn, yyn]], ... ] */
    function addPolygonsFromCoordinates(self, coordinates, closed) {
        var polygons = [];
        for (var i = 0; i < coordinates.length; i++) {
            polygons.push(addPolygonFromCoordinates(self, coordinates[i], closed));
        }
        return polygons;
    }
    canvasShapes.addPolygonsFromCoordinates = addPolygonsFromCoordinates;
    /** Crear UN polígono desde un array de puntos y lo añade al array de polígonos de este objeto, es recurrente y añade
          * todos los hijos creados si no existían con anterioridad. El parámetro 'closed' indica si cerrar el polígono con un último
          * segmento que irá desde el punto final creado al punto inicial, cerrando así la forma geométrica construida. Retorna el polígono creado.
          * El array de entrada se espera en la forma: XY=[ point_1, point_2, ..., point_n ]
          * ATENCIÓN: Este método NO COMPRUEBA la duplicidad de los polígonos creados, aunque SI la de sus hijos (puntos), si ya
          * existiesen con aterioridad no se añadirán. */
    function addPolygonFromPointsArray(self, arrayPoints, closed) {
        var polygon = new canvasShapes.PolyArea.Polygon(self);
        //RESETEA LAS LETRAS
        canvasShapes.ABC.reset();
        polygon.setChildren(addSegmentsFromPointsArray(self, arrayPoints, closed));
        addPolygon(self, polygon);
        return polygon;
    }
    canvasShapes.addPolygonFromPointsArray = addPolygonFromPointsArray;
    /** Crear UN polígono desde un array de segmentos y lo añade al array de polígonos de este objeto, es recurrente y añade
          * todos los hijos creados si no existían con anterioridad. Retorna el polígono creado.
          * El parámetro 'closed' indica si cerrar el polígono con un último segmento que irá desde el punto final del último segmento al punto inicial
          * del primer segmento, cerrando así la forma geométrica construida.
          * El array de entrada se espera en la forma: XY=[ segment_1, segment_2, ..., segment_n ]
          * ATENCIÓN: Este método NO COMPRUEBA la duplicidad de los polígonos creados, aunque SI la de sus hijos (puntos y segmentos), si ya existiesen
          * con aterioridad no se añadirán. */
    function addPolygonFromSegmentsArray(self, arraySegments, closed) {
        //if(!arraySegments && (arraySegments.length==0)) return false;
        closed = ((typeof (closed)).toUpperCase() === "UNDEFINED") ? true : closed;
        var polygon = new canvasShapes.PolyArea.Polygon(self);
        for (var i = 0; i < arraySegments.length; i++) {
            polygon.getChildren().push(arraySegments[i]);
            //VERIFICA QUE EL PUNTO DEL ÚLTIMO SEGMENTO TENGA OTRA COORDENADA DISTINTA AL PUNTO DEL PRIMER SEGMENTO
            var distinto = (arraySegments[i].getP2().getX() !== polygon.getChildren()[0].getP1().getX()) || (arraySegments[i].getP2().getY() !== polygon.getChildren()[0].getP1().getY());
            if (closed && (i === (arraySegments.length - 1)) && distinto) {
                //polygon.segs.push( addSegmentFromPoints(self, arraySegments[i].getP2(), polygon.getChildren()[0].getP1()) );
                polygon.getChildren().push(addSegmentFromPoints(self, arraySegments[i].getP2(), polygon.getChildren()[0].getP1()));
            }
        }
        addPolygon(self, polygon);
        return polygon;
    }
    canvasShapes.addPolygonFromSegmentsArray = addPolygonFromSegmentsArray;
    /** Añade polígonos desde un array de polígonos al array de polígonos de este objeto.
          * El array de entrada se espera en la forma: XY=[ polygon_1, polygon_2, ..., polygon_n ]
          * ATENCIÓN: Este método SI COMPRUEBA la duplicidad de los polígonos creados (aunque no su naturaleza), si ya existiesen con
          * aterioridad no se añadirán. */
    function addPolygonsFromPolygonsArray(self, arrayPolygons) {
        for (var i = 0; i < arrayPolygons.length; i++) {
            addPolygon(self, arrayPolygons[i]); //en este método se realizan las comprobaciones y propagación a sus hijos
        }
    }
    canvasShapes.addPolygonsFromPolygonsArray = addPolygonsFromPolygonsArray;
    //FIN DE CREACIÓN DE SHAPES
    //MANIPULACIÓN DE SHAPES
    /** Método de nivel superior. Agrupa polígonos. Se le debe pasar el objeto PolyArea. */
    function shapesGrouped(self) {
        if (!(self instanceof canvasShapes.PolyArea)) {
            self = this;
        } //cuando se le llama a través del super-método 'bind()'
        var polsSel = getSelected(self, "Polygon");
        var coords = [];
        var newPol = null;
        var i = 0;
        var arr = null;
        //POLÍGONOS
        if (polsSel.length > 1) {
            for (i = 0; i < polsSel.length; i++) {
                //SUPRIMES EL ÚLTIMO SEGMENTO PARA QUE ENCAJEN LOS NUEVOS POLÍGONOS
                if (polsSel[i].getChildren().length > 0) {
                    polsSel[i].getChildren()[polsSel[i].getChildren().length - 1].remove(true);
                }
                arr = polsSel[i].coordinates();
                coords = coords.concat(arr);
                coords.pop(); //SUPRIMES EL ÚLTIMO SEGMENTO PARA QUE ENCAJEN LOS NUEVOS POLÍGONOS
                polsSel[i].remove(true);
            }
            //AGRUPA TODOS LOS POLÍGONOS SELECCIONADOS EN UNO
            if (coords.length > 0) {
                newPol = addPolygonFromCoordinates(self, coords, true);
                polsSel = [newPol];
            }
        }
        var segsSel = getSelected(self, "Segment");
        var pointsSel = getSelected(self, "Point");
        coords = [];
        //SEGMENTOS
        if (segsSel.length > 0) {
            //PRIMERO OBTENER LAS COORDENADAS DE LOS SEGMENTOS
            for (i = 0; i < segsSel.length; i++) {
                //alert(segsSel[i].getId()+" :: "+segsSel[i].coordinates());
                arr = segsSel[i].coordinates();
                coords = coords.concat(arr);
            }
            if (polsSel.length > 0) {
                //AGRUPA TODOS LOS SEGEMENTOS SELECCIONADOS EN UN POLÍGONO SELECCIONADO
                if (coords.length > 0) {
                    //concatena las coordenadas de los segmentos con la del polígono
                    arr = polsSel[0].coordinates();
                    arr.pop(); //SUPRIMES EL ÚLTIMO SEGMENTO PARA QUE ENCAJEN LOS NUEVOS
                    coords = coords.concat(arr);
                    polsSel[0].remove(true);
                    newPol = addPolygonFromCoordinates(self, coords, true);
                    polsSel = [newPol];
                }
            }
            else {
                //CONVERTIR LOS SEGMENTOS EN UN POLÍGONO
                //newPol = addPolygonFromCoordinates(self, coords, true);
                newPol = addPolygonFromSegmentsArray(self, segsSel, true);
                polsSel = [newPol];
            }
        }
        //canvasShapes.redraw();
        self.draw();
    }
    canvasShapes.shapesGrouped = shapesGrouped;
    /** Funcion común para calcular la distancia entre dos puntos ('PolyArea.Point') */
    function distanceP1P2(p1, p2) {
        //PITAGORAS. HIPOTENUSA
        var perimetro = Math.pow(Math.pow(p1.getX() - p2.getX(), 2) + Math.pow(p1.getY() - p2.getY(), 2), 1 / 2);
        return Math.abs(parseFloat(perimetro + ""));
    }
    canvasShapes.distanceP1P2 = distanceP1P2;
    /** Funcion común para calcular la distancia media entre dos puntos ('PolyArea.Point'), osea el centro de un segmento.
    * Retorna un punto con las coordenadas centradas. */
    function mediumP1P2(p1, p2) {
        if (!p1 || !p2) {
            return null;
        }
        var $parent = p1.getParent();
        var p = new canvasShapes.PolyArea.Point($parent);
        p.setX((p1.getX() + p2.getX()) / 2);
        p.setY((p1.getY() + p2.getY()) / 2);
        return p;
    }
    canvasShapes.mediumP1P2 = mediumP1P2;
    /** Método estático que se utiliza para dibujar a mano. Es llamado normálmente desde los eventos,
    * al tener activada la opción de 'freeDraw' */
    function drawPointsFreeDraw(self, x, y) {
        //ctx.clearRect(0, 0, $("canvas1").width, $("canvas1").height);
        if ((self instanceof canvasShapes.PolyArea) && self.mousedown && self.freeDraw && self.freeDrawON) {
            var ctx = self.getContext();
            x = (Math.ceil(x / 2) * 2) - 2;
            y = (Math.ceil(y / 2) * 2) - 2;
            x = canvasShapes.toXComputed(self, x);
            y = canvasShapes.toYComputed(self, y);
            ctx.beginPath();
            ctx.strokeStyle = self.freeDrawColor;
            ctx.fillStyle = self.freeDrawColor;
            //ctx.arc(x, y, 2, Math.PI*2, 0, true);
            //ctx.arc(x+1, y+1, 2, 0, Math.PI*2 , true);
            //ctx.fillRect(x, y, 6, 4);
            if (self.freeDrawRounded) {
                ctx.arc(x, y, self.freeDrawSize, Math.PI * 2, 0, true);
            }
            else {
                ctx.rect(x, y, self.freeDrawSize, self.freeDrawSize);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            return true;
        }
        return false;
    }
    canvasShapes.drawPointsFreeDraw = drawPointsFreeDraw;
    /** Método estático para encontrar un punto con las mismas coordenadas que otro pasado como parámetro.  */
    function getPointFromCoordinates(self, point, toleranciaX, toleranciaY) {
        if (!point) {
            return null;
        }
        var x = point.getX();
        var y = point.getY();
        var puntos = self.getPoints();
        for (var i = 0; i < puntos.length; i++) {
            if (point.getId() === puntos[i].getId()) {
                continue;
            }
            if ((puntos[i].getX() > (x - toleranciaX)) && (puntos[i].getX() < (x + toleranciaX)) &&
                (puntos[i].getY() > (y - toleranciaY)) && (puntos[i].getY() < (y + toleranciaY))) {
                return puntos[i];
            }
        }
        return null;
    }
    canvasShapes.getPointFromCoordinates = getPointFromCoordinates;
    //MANEJO DE COORDENADAS
    /** Sinónimo de 'getCoordinates()'
   * OBTIENE UN ARRAY CON TODAS LOS PARES DE X e Y DE LOS PUNTOS DE TODOS SUS OBJETOS.
   * Retorna las coordenadas de todos los puntos que intervienen en este objeto.
   * El array retornado de salida se entregará en la forma XY = [ [x1, y1], [x2, y2], ..., [xn, yn] ]
   */
    function coordinates(self, withProportion, withInvert) {
        return self.coordinates(withProportion, withInvert);
    }
    canvasShapes.coordinates = coordinates;
    /** Sinónimo de 'coordinates()'
    * Retorna las coordenadas de todos los puntos que intervienen en este objeto en la forma: XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ] */
    function getCoordinates(self) {
        return coordinates(self, true, true);
        //return this._children.Points.slice(0);  //clona el array
    }
    canvasShapes.getCoordinates = getCoordinates;
    /** MÉTODO RECURSIVO!!
    * ESTABLECE LAS COORDENADAS A LAS PASADAS COMO PARÁMETRO. ATENCIÓN!! ELIMINA LAS COORDNADAS ANTERIORES!!
    * Las coordenadas pasadas deben estar en el formato: XY=[ [[x1, y1], [x2, y2], ..., [xn, yn]], [...] ]
    * Este metodo creará un Polígono (abierto o cerrado) con sus Puntos y Segmentos.
    * El parámetro 'unReset' sólo se utiliza internamente en la recursión, NO UTILIZAR EXTERNAMENTE. */
    function setCoordinates(self, XY, closed) {
        resetShapes(self);
        var p;
        if (XY.push && (XY.length > 0)) {
            if (XY[0].push && (XY[0].length > 0)) {
                if (XY[0][0].push && (XY[0][0].length > 0)) {
                    p = addPolygonsFromCoordinates(self, XY, closed);
                }
            }
        }
    }
    canvasShapes.setCoordinates = setCoordinates;
    /** Sinónimo de 'getCoordinatesXY()'
   * OBTIENE UN ARRAY CON TODAS LAS X e Y DE LOS PUNTOS QUE COMPONEN LOS POLÍGONOS.
   * Convierte un array de los puntos de coordenadas x,y de los segmentos en un array con todas las coordenadas separando
   * las x de las y, osea que retorna un array con dos elementos: un array de x, un array de y.
   * De esta forma se encuentra más preparado para la funcion 'area', símplemente llamando a la función de esta manera:
   * var XY=coordinatesXY();
   * var area = area(XY[0], XY[1]);
   * Los array con los que se trabajarán se espera que sean de la forma: xy = [ [x1, y1], [x2, y2], ..., [xn, yn] ]
   * El array retornado de salida se entregará en la forma XY = [ [x1, x2, ..., xn], [y1, y2, ..., yn] ]
   */
    function coordinatesXY(self) {
        return self.coordinatesXY();
    }
    canvasShapes.coordinatesXY = coordinatesXY;
    /** Sinónimo de 'coordinatesXY()'
    * Retorna las coordenadas de todos los puntos que intervienen en este objeto en la forma: XY=[ [x1, x2, ..., xn], [y1, y2, ..., yn] ] */
    function getCoordinatesXY(self) {
        return coordinatesXY(self);
    }
    canvasShapes.getCoordinatesXY = getCoordinatesXY;
    /** ESTABLECE LAS COORDENADAS A LAS PASADAS COMO PARÁMETRO. ATENCIÓN!! ELIMINA LAS COORDNADAS ANTERIORES!!
    * Las coordenadas pasadas deben estar en el formato: XY=[ [x1, x2, ..., xn], [y1, y2, ..., yn] ]
    * Este metodo creará un Polígono (abierto o cerrado) con sus Puntos y Segmentos. */
    function setCoordinatesXY(self, XsYs, closed) {
        resetShapes(self);
        addPolygonFromXY(self, XsYs, closed);
        //this.sanitize();
    }
    canvasShapes.setCoordinatesXY = setCoordinatesXY;
    /** Retorna el número mayor de entre todas las coordenadas del array (en la forma XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]) de todos los
  * puntos que intervienen en este objeto.
  * El parámetro 'index' especifica si comparar sólamente las 'X' (0) o las 'Y' (1), o de Ambas (-1). Por defecto de ambas
  * El parámetro 'absolute=false' especifica si tener en cuenta signos o sólo valores Absolutos (absolute=true), por defecto TRUE. */
    function getCoordinatesMax(self, index, absolute) {
        index = ((typeof (index)).toUpperCase() !== "UNDEFINED") ? index : -1;
        absolute = ((typeof (absolute)).toUpperCase() !== "UNDEFINED") ? absolute : true;
        var xy = getCoordinates(self);
        var max = -Infinity;
        for (var i = 0; i < xy.length; i++) {
            var miniXY = xy[i]; //.split(",");
            for (var j = 0; j < miniXY.length; j++) {
                var condicion = ((index === 0) ? ((j === 0) || (j % 2 === 0)) : ((index === 1) ? (j % 2 !== 0) : (true)));
                if (condicion) {
                    var microXY = (absolute ? Math.abs(miniXY[j]) : miniXY[j]);
                    //var maxOld=max;
                    max = Math.max(max, microXY);
                }
            }
        }
        return max;
    }
    canvasShapes.getCoordinatesMax = getCoordinatesMax;
    /** Retorna el número menor de entre todas las coordenadas del array (en la forma XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]) de todos los
  * puntos que intervienen en este objeto.
  * El parámetro 'index' especifica si comparar sólamente las 'X' (0) o las 'Y' (1), o de Ambas (-1). Por defecto de ambas
  * El parámetro 'absolute=false' especifica si tener en cuenta signos o sólo valores Absolutos (absolute=true), por defecto TRUE. */
    function getCoordinatesMin(self, index, absolute) {
        index = ((typeof (index)).toUpperCase() !== "UNDEFINED") ? index : -1;
        absolute = ((typeof (absolute)).toUpperCase() !== "UNDEFINED") ? absolute : true;
        var xy = getCoordinates(self);
        var min = Infinity;
        for (var i = 0; i < xy.length; i++) {
            var miniXY = xy[i]; //.split(",");
            for (var j = 0; j < miniXY.length; j++) {
                var condicion = ((index === 0) ? ((j === 0) || (j % 2 === 0)) : ((index === 1) ? (j % 2 !== 0) : (true)));
                if (condicion) {
                    var microXY = (absolute ? Math.abs(miniXY[j]) : miniXY[j]);
                    var minOld = min;
                    min = Math.min(min, microXY);
                }
            }
        }
        return min;
    }
    canvasShapes.getCoordinatesMin = getCoordinatesMin;
    /** MÉTODO PÚBLICO POR NECESIDAD PERO PRIVADO EN SU UTILIZACIÓN. NO UTILIZAR PÚBLICAMENTE, SÓLO AL INICIALIZAR
    * EN 'prepare(..)' Y EN MÉTODOS 'draw(..)'. Centra los ejes de coordenadas en el canvas */
    function setCoordinatesCentred(self, centred) {
        self.coordinatesCentred = centred;
        if (centred) {
            //TRANSLADA LAS COORDENADAS AL CENTRO DEL CANVAS
            self.getContext().translate((self.getCanvas().width / 2) - 0.5, (self.getCanvas().height / 2) - 0.5);
        }
        else {
            //RESTAURA LA TRANSLACIÓN DE LAS COORDENADAS DEL CENTRO DEL CANVAS AL ORIGEN 0,0
            self.getContext().translate(-(self.getCanvas().width / 2) + 0.5, -(self.getCanvas().height / 2) + 0.5);
        }
        self.getContext().save();
    }
    canvasShapes.setCoordinatesCentred = setCoordinatesCentred;
    /** Conmuta la translación (EL CENTRADO) de los ejes de coordenadas al centro del canvas o al punto (0,0) en función de la variable 'coordinatesCentred' */
    function toggleCentered(self) {
        if (self.coordinatesCentred) {
            //RESTAURA LA TRANSLACIÓN DE LAS COORDENADAS DEL CENTRO DEL CANVAS AL ORIGEN 0,0
            toDescentered(self);
        }
        else {
            //TRANSLADA LAS COORDENADAS AL CENTRO DEL CANVAS
            toCentered(self);
        }
    }
    canvasShapes.toggleCentered = toggleCentered;
    /** Translada (CENTRA) el centro de los ejes de coordenadas al centro del canvas, si no lo estuvieran ya. */
    function toCentered(self) {
        if (!self.coordinatesCentred) {
            //TRANSLADA LAS COORDENADAS AL CENTRO DEL CANVAS
            self.getContext().translate((self.getCanvas().width / 2) - 0.5, (self.getCanvas().height / 2) - 0.5);
            self.getContext().save();
            self.coordinatesCentred = true;
        }
    }
    canvasShapes.toCentered = toCentered;
    /** Translada (DESCENTRA) el centro de los ejes de coordenadas al punto (0,0) del canvas, si no lo estuvieran ya. */
    function toDescentered(self) {
        if (self.coordinatesCentred) {
            //RESTAURA LA TRANSLACIÓN DE LAS COORDENADAS DEL CENTRO DEL CANVAS AL ORIGEN 0,0
            //self.getContext().translate(-(self.getCanvas().width/2)-0.5, -(self.getCanvas().height/2)-0.5);
            self.getContext().translate(-0.5, -0.5);
            self.getContext().save();
            self.coordinatesCentred = false;
        }
    }
    canvasShapes.toDescentered = toDescentered;
    /** Busca y retorna los elementos que se encuentren seleccionados.
          * Puede buscarse por polígonos, segmentos o puntos o bien todos a la vez, dependiendo
          * del parámetro pasado. (POLYGON, SEGMENT, POINT, ALL) */
    function getSelected(self, shapeType) {
        shapeType || (shapeType = "POLYGON");
        shapeType = shapeType.toUpperCase();
        shapeType = (shapeType.substr(-1, 1) === "S") ? shapeType.substr(0, shapeType.length - 1) : shapeType;
        var shapesSelected = [];
        var i = 0;
        if ((shapeType === "POLYGON") || (shapeType === "ALL")) {
            for (i = 0; i < self.getPolygons().length; i++) {
                if (self.getPolygons()[i].selected) {
                    //return this._children.Polygons[i];
                    shapesSelected.push(self.getPolygons()[i]);
                }
            }
        }
        if ((shapeType === "SEGMENT") || (shapeType === "ALL")) {
            for (i = 0; i < self.getSegments().length; i++) {
                if (self.getSegments()[i].selected) {
                    //return this._children.Segments[i];
                    shapesSelected.push(self.getSegments()[i]);
                }
            }
        }
        if ((shapeType === "POINT") || (shapeType === "ALL")) {
            for (i = 0; i < self.getPoints().length; i++) {
                if (self.getPoints()[i].selected) {
                    //return this._children.Points[i];
                    shapesSelected.push(self.getPoints()[i]);
                }
            }
        }
        return shapesSelected;
    }
    canvasShapes.getSelected = getSelected;
    /** Marca como SELECCIONADOS a todos los shapes pasados como parámetro (debe ser un array de shapes).
         * Si se aporta como segundo parámetro TRUE, entonces modificará al resto, de otra forma no.
         * @param shapes <Array> Debe ser un array de shapes (polígonos, segmentos o puntos)
         * @param only <Boolean> True para deseleccionar el resto, False el resto se quedarán como están
         * @see selectShapesAll()
         * @see unSelectShapes()
         * @see unSelectShapesAll() */
    function selectShapes(self, shapes, only) {
        if (!shapes) {
            return;
        }
        if (only) {
            unSelectShapesAll(self);
        }
        for (var i = 0; i < shapes.length; i++) {
            if (shapes[i]) {
                shapes[i].selected = false;
            }
        }
    }
    canvasShapes.selectShapes = selectShapes;
    /** Marca como SELECCIONADOS a todos los shapes existentes.
         * @see selectShapes()
         * @see unSelectShapes()
         * @see unSelectShapesAll() */
    function selectShapesAll(self) {
        if (!(self instanceof canvasShapes.PolyArea)) {
            self = this;
        } //cuando se le llama a través del super-método 'bind()'
        var i = 0;
        for (i = 0; i < self.getPoints().length; i++) {
            self.getPoints()[i].selected = true;
        }
        for (i = 0; i < self.getSegments().length; i++) {
            self.getSegments()[i].selected = true;
        }
        for (i = 0; i < self.getPolygons().length; i++) {
            self.getPolygons()[i].selected = true;
        }
    }
    canvasShapes.selectShapesAll = selectShapesAll;
    /** Marca como DES-SELECCIONADOS a todos los shapes pasados como parámetro (debe ser un array de shapes).
         * Si se aporta como segundo parámetro TRUE, entonces modificará al resto, de otra forma no.
         * @param shapes <Array> Debe ser un array de shapes (polígonos, segmentos o puntos)
         * @param only <Boolean> True para seleccionar el resto, False el resto se quedarán como están
         * @see selectShapes()
         * @see selectShapesAll()
         * @see unSelectShapesAll() */
    function unSelectShapes(self, shapes, only) {
        if (!shapes) {
            return;
        }
        if (only) {
            selectShapesAll(self);
        }
        for (var i = 0; i < shapes.length; i++) {
            if (shapes[i]) {
                shapes[i].selected = false;
            }
        }
    }
    canvasShapes.unSelectShapes = unSelectShapes;
    /** Marca como DES-SELECCIONADOS a todos los shapes existentes.
         * @see selectShapes()
         * @see selectShapesAll()
         * @see unSelectShapes() */
    function unSelectShapesAll(self) {
        var i = 0;
        for (i = 0; i < self.getPoints().length; i++) {
            self.getPoints()[i].setSelected(false);
        }
        for (i = 0; i < self.getSegments().length; i++) {
            self.getSegments()[i].setSelected(false);
        }
        for (i = 0; i < self.getPolygons().length; i++) {
            self.getPolygons()[i].setSelected(false);
        }
    }
    canvasShapes.unSelectShapesAll = unSelectShapesAll;
    /** Comprueba si existe la figura pasada como parámetro en los arrays de shapes */
    function existsShape(self, shape) {
        if (!shape) {
            return false;
        }
        var i = 0;
        for (i = 0; i < self.getPolygons().length; i++) {
            if (self.getPolygons()[i].getId() === shape.getId()) {
                return true;
            }
        }
        for (i = 0; i < self.getSegments().length; i++) {
            if (self.getSegments()[i].getId() === shape.getId()) {
                return true;
            }
        }
        for (i = 0; i < self.getPoints().length; i++) {
            if (self.getPoints()[i].getId() === shape.getId()) {
                return true;
            }
        }
        return false;
    }
    canvasShapes.existsShape = existsShape;
    //DESTRUCCIÓN DE SHAPES
    function resetShapes(self) {
        self.setChildren({ Points: [], Segments: [], Polygons: [] });
        self.setShapes({ Points: [], Segments: [], Polygons: [] });
        self.setShapesDrop({ "Point": null, "Segment": null, "Polygon": null });
    }
    canvasShapes.resetShapes = resetShapes;
    function removePoint(self, point) {
        point.remove(true);
        //point=null;
        //this.redraw();
    }
    canvasShapes.removePoint = removePoint;
    function removeSegment(self, segment) {
        segment.remove(true);
        //segment=null;
        //this.redraw();
    }
    canvasShapes.removeSegment = removeSegment;
    function removePolygon(self, polygon) {
        polygon.remove(true);
        //polygon=null;
        //this.redraw();
    }
    canvasShapes.removePolygon = removePolygon;
})(canvasShapes || (canvasShapes = {}));
// END MODULE: SHAPES 
