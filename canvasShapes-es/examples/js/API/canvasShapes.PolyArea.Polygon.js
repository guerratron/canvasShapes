/// <reference path="canvasShapes.PolyArea.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.PolyArea.Polygon.js' (OBJECT-CLASS) Objeto de dibujado Polígono en el canvas.
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.PolyArea.Polygon.js' (OBJECT-CLASS) Objeto de dibujado Polígono en el canvas.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: POLYGON
var canvasShapes;
(function (canvasShapes) {
    var PolyArea;
    (function (PolyArea) {
        "use-strict";
        //CLASE DERIVADA INTERNA PRIVADA POLYGON
        /** 'Polygon' (OBJECT) - Figura gráfica Polígono, necesita un contexto (canvas) donde representarse,
        *   contiene hijos: Segmentos y Puntos. */
        var Polygon = (function () {
            function Polygon($parent, $super) {
                //super($super.getConf());
                //if($super instanceof canvasShapes.PolyArea) { }
                if (!$super) {
                    $super = $parent || canvasShapes.getInstance();
                }
                var _TAG = "Polygon";
                var _name = ""; //canvasShapes.ABC.next(); //SOLICITUD ESTÁTICA DE NUEVA LETRA
                var _id = (_TAG + "[" + _name + "]-" + (new Date().getTime()) + "-" + Math.floor((Math.random() * 100) + 1));
                var _children = [];
                /** Se refiere al objeto de orden superior 'PolyArea' al que pertenece. */
                var _super = $super || $parent; //= canvasShapes.getInstance();
                /** Se refiere al objeto 'shape' padre al que pertenece. No tiene porqué coincidir con '_super'. */
                var _parent = $parent || $super; //= canvasShapes.getInstance();
                if ((_super === null) && (_parent === null)) {
                    return null;
                }
                var _info = "";
                /////
                //GETTERs && SETTERs DE VARIABLES PRIVADAS
                /** Muestra, tan sólo con intención informativa, el sello de esta clase, la etiqueta exclusiva '_TAG' */
                this.getTAG = function () { return _TAG; };
                /** Método Getter para tomar el id de este objeto. ATENCION: NO ES EL ID DEL CANVAS. */
                this.getId = function () { return (_TAG + "[" + _name + "]-" + (new Date().getTime()) + "-" + Math.floor((Math.random() * 100) + 1)); };
                this.setId = function (id) {
                    _id = id;
                    this.update();
                };
                /** Método Getter para tomar el nombre de este elemento. */
                this.getName = function () { return _name; };
                /** Método Setter para establecer el nombre de este elemento. Implica un refresco de alguna de sus partes. */
                this.setName = function (name) {
                    if ((typeof (name)).toUpperCase() !== "UNDEFINED") {
                        _name = name;
                        _id = this.getId();
                        //this.refreshHtml();
                        this.buildInfo();
                    }
                };
                this.getChildren = function () { return _children; };
                this.setChildren = function (children) {
                    if (children) {
                        this.removeChildren(true);
                        _children = children;
                        this.update();
                    }
                };
                /** Se refiere al objeto de orden superior 'PolyArea' al que pertenece. */
                this.getSuper = function () { return _super; };
                /** Se refiere al objeto 'shape' padre al que pertenece. No tiene porqué coincidir con '_super'. */
                this.getParent = function () { return _parent; };
                /** Al establecer el padre es cuando se le añade como hijo desde aquí. */
                this.setParent = function (parent) {
                    _parent = parent;
                    _parent.addPolygon(this);
                    this.buildInfo();
                };
                this.getCanvas = function () { return _parent.getCanvas(); };
                this.getContext = function () { return _parent.getContext(); };
                this.getInfo = function () { return _info; };
                this.setInfo = function (info) {
                    _info = info;
                };
                this.buildInfo = function () {
                    var INFO = [];
                    if (this.enabled) {
                        INFO.push("E");
                    } //ENABLED
                    if (this.valido) {
                        INFO.push("V");
                    } //VALID
                    _info = _name;
                    INFO.push("LONG: " + canvasShapes.toDecimals(this.distance(), _parent.decimals));
                    INFO.push("AREA: " + canvasShapes.toDecimals(this.area(), _parent.decimals));
                    INFO.push("SEGS: " + _children.length);
                    var centroide = this.centroide();
                    INFO.push("<br />CENT: (" + canvasShapes.toDecimals(centroide[0], _parent.decimals) +
                        ", " + canvasShapes.toDecimals(centroide[1], _parent.decimals) + ")");
                    _info += " {" + INFO.join(", ") + "}";
                };
                /** PUBLICO: Método GETTER para obtener la configuracion de este objeto. En realidad obtiene la conf. heredada */
                this.getConf = function () {
                    return _super.getConf();
                };
                this.update = function () {
                    this.sanitizeChildren();
                    //this.refreshHtml();
                    this.buildInfo();
                };
                /** Método que depura y sanitiza los hijos permitiendo únicamente los válidos. */
                this.sanitizeChildren = function () {
                    var children = [];
                    for (var i = 0; i < _children.length; i++) {
                        var s = _children[i];
                        if (s && s.valido) {
                            s.setSelected(this.selected);
                            s.setEnabled(this.enabled);
                            s.setValido(this.valido);
                            children.push(s);
                            this.getSuper().addSegment(s);
                        }
                    }
                    _children = children;
                    return children;
                };
                ///PROPIEDADES PUBLICAS
                this.size = 1;
                this.showName = _parent.showNames;
                this.proportionX = _parent.proportionX;
                this.proportionY = _parent.proportionY;
                this.invertX = _parent.invertX;
                this.invertY = _parent.invertY;
                this.border = "navy";
                this.color = "lightBlue";
                this.drawChildren = _parent.getConf().polygonsDrawChildren; //true;
                this.type = ["round", "round"]; //[lineCap, lineJoin] ==> lineCap = ['butt','round','square'];  lineJoin = ['round','bevel','miter'];
                this.drawSegments = _parent.getConf().drawSegments; //true;
                this.ctx = _parent.getContext(); //this.this._super.getContext();
                this.fill = _super.fill;
                this.gradient = _parent.gradient;
                //this._super.unSelectShapesAll();
                this.selected = true;
                this.setSelected = function (value) {
                    this.selected = value;
                    this.buildInfo();
                };
                this.enabled = true;
                this.setEnabled = function (value) {
                    this.enabled = value;
                    this.buildInfo();
                };
                this.valido = true;
                this.setValido = function (value) {
                    this.valido = value;
                    this.valid = value;
                    this.buildInfo();
                };
                this.valid = this.valido;
                _id = this.getId();
                this.buildInfo();
                //_parent.addPoint(this);
            }
            /** Clona el elemento sin referencias.
              * Retorna una copia exacta de este Punto (con otro id y otro name), pero es otro objeto. */
            Polygon.prototype.clone = function () {
                var pol = new canvasShapes.PolyArea.Polygon(this.getSuper()); //this.this.this.getSuper().Polygon();
                this.getChildren().forEach(function (s) {
                    //for(s in this.segs){
                    pol.getChildren().push(s.clone());
                }, this);
                //s.setChildren([s.getP1(), s.getP2()]);
                pol.setName(this.getName());
                pol.showName = this.showName;
                pol.size = this.size;
                pol.setProportionX(this.proportionX);
                pol.setProportionY(this.proportionY);
                pol.setInvertX(this.invertX);
                pol.setInvertY(this.invertY);
                pol.border = this.border;
                pol.color = this.color;
                pol.drawChildren = this.drawChildren; //pol.drawSegments=this.drawSegments;
                pol.type = this.type;
                pol.drawSegments = this.drawSegments;
                pol.ctx = this.ctx;
                pol.fill = this.fill;
                pol.gradient = this.gradient;
                pol.setSelected(this.selected);
                pol.setEnabled(this.enabled);
                pol.setValido(this.valido);
                //pol.setParent(this.getParent());
                return pol;
            };
            //OWN METHODS
            /** Retorna un array de coordenadas del punto que interesa que detecte para mostrar la informacion (TOOLTIP) */
            Polygon.prototype.getTooltipXY = function () {
                return this.centroide();
            };
            //PUBLIC METHODS
            Polygon.prototype.setProportion = function (proportion) {
                this.proportionX = proportion;
                this.proportionY = proportion;
            };
            Polygon.prototype.setInvert = function (invert) {
                this.invertX = invert;
                this.invertY = invert;
            };
            //DISTANCIAS
            /** DISTANCIA.
            * Alias de 'perimeter(..)'. Se mantiene por compatibilidad con hijos.
            * @see this.perimeter(Boolean, Boolean)
            */
            Polygon.prototype.distance = function () { return this.perimeter(); };
            /** PERIMETRO. (THEOREMA DE PITÁGORAS). Alias de 'distance(..)'
            * Retorna la suma de las distancias de todos los puntos que componen este poligono suponiendolo CERRADO, calculada entre todos los
            * dos Puntos de cada uno de los segmentos.
            * NO se tienen en cuenta ni las proporciones, ni la inversión.
            * OBSERVACIÓN: La medida tomada coincidirá con la del método 'distance(..)' siempre que no existan ni proporciones ni inversiones
            */
            Polygon.prototype.perimeter = function () {
                var perimetro = 0;
                this.getChildren().forEach(function (s) {
                    perimetro += s.perimeter();
                }, this);
                return Math.abs(parseFloat(perimetro + ""));
            };
            ;
            /** Sinónimo de 'perimeter()' */
            Polygon.prototype.getPerimeter = function () { return this.perimeter(); };
            /** IDEA TOMADA DE: http://www.mathopenref.com/coordpolygonarea2.html
            * FUNCIÓN PARA CALCULAR EL ÁREA DE UN POLÍGONO (Regular / Irregular). Sólo polígonos Rectos, no Curvos.
            * Es lo mismo que decir que puede utilizarse para calcular cualquier figura geométrica plana, 2D, recta y cerrada, con aristas y
            * vértices. Osea, cualquiera a partir del triángulo (éste incluido).
            * Sirve para cualquier polígono: Regular-Irregular. Se basa en la fórmula del 'Teorema de Gauss', también conocido como
            * 'método de la lazada'.
            * Trabaja con dos arrays de las coordenadas (agrupadas) de los puntos que representarían a este polígono,
            * agrupando Xs e Ys en sendos arrays: [[x1, x2, x3, ...], [y1, y2, y3, ...]]. Este array puede obtenerse con el método 'coordinatesXY()'
            * ATENCIÓN: Falla en casos de figuras excepcionales (que se sobre-expongan o crucen).
            * NO SE TIENEN EN CUENTA NI PROPORCIÓN NI INVERSIÓN
            * EJ.:
            * var xPts = [4,  4,  8,  8, -4,-4];
            * var yPts = [6, -4, -4, -8, -8, 6];
            * var a = area(xPts, yPts, 6);
            * alert("Area  = " + a); // Area = 128
            * OTRO EJEMPLO DE LA WIKIPEDIA: https://es.wikipedia.org/wiki/F%C3%B3rmula_del_%C3%A1rea_de_Gauss
            * xs=[5,12,9,5,3]
            * ys=[11,8,5,6,4]
            * @return {number} the area of the polygon
            */
            Polygon.prototype.area = function () {
                var area = 0; // Accumulates area in the loop
                var xs = this.coordinatesXY()[0];
                var ys = this.coordinatesXY()[1];
                var numPoints = Math.min(xs.length, ys.length);
                for (var i = 0, j = (numPoints - 1); i < numPoints; i++) {
                    area += parseFloat(((parseFloat(xs[j] + "") + parseFloat(xs[i] + "")) * (parseFloat(ys[j] + "") - parseFloat(ys[i] + ""))) + "");
                    j = i; //j es el vértice anterior a i
                }
                return Math.abs(parseFloat((area / 2) + ""));
            };
            /** Sinónimo de 'area()' */
            Polygon.prototype.getArea = function () { return this.area(); };
            /**
            * OBTIENE UN ARRAY CON TODAS LOS PARES DE X e Y DE LOS PUNTOS QUE COMPONEN ESTE POLÍGONO.
            * Retorna un array de pares de coordenadas X e Y de los puntos que componen este polígono.
            * El array retornado de salida se entregará en la forma XY = [ [x1, y1], [x2, y2], ..., [xn, yn] ]
            */
            Polygon.prototype.coordinates = function () {
                var pointsXY = [];
                this.getChildren().forEach(function (s) {
                    var xy = s.coordinates();
                    for (var i = 0; i < xy.length; i++) {
                        pointsXY.push(xy[i]);
                    }
                }, this);
                return pointsXY;
            };
            /**
            * OBTIENE UN ARRAY CON TODAS LAS X e Y DE LOS PUNTOS QUE COMPONEN ESTE POLÍGONO.
            * Convierte un array de los puntos de coordenadas x,y de los segmentos en un array con todas las coordenadas separando
            * las x de las y, osea que retorna un array con dos elementos: un array de x, un array de y.
            * De esta forma se encuentra más preparado para la funcion 'area', símplemente llamando a la función de esta manera:
            * var XY=coordinatesXY();
            * var area = area(XY[0], XY[1]);
            * Los array con los que se trabajarán se espera que sean de la forma: xy = [ [x1, y1], [x2, y2], ..., [xn, yn] ]
            * El array retornado de salida se entregará en la forma XY = [ [x1, x2, ..., xn], [y1, y2, ..., yn] ]
            */
            Polygon.prototype.coordinatesXY = function () {
                var xs = [], ys = [];
                this.getChildren().forEach(function (s) {
                    var xy = s.coordinatesXY();
                    if (xy.length > 1) {
                        //ambos arrays (x e y) deberían ser parejos en longitud. Por si acaso, sólo se tiene en cuenta el más corto
                        for (var i = 0; (i < xy[0].length) && (i < xy[1].length); i++) {
                            xs.push(xy[0][i]);
                            ys.push(xy[1][i]);
                        }
                    }
                }, this);
                return [xs, ys];
            };
            /** Punto central (BARICENTRO, GRAVICENTRO) gravitatorio del polígono. Retorna las coordenadas de ese punto */
            Polygon.prototype.centroide = function () {
                //BARICENTRO
                var XY = this.coordinatesXY();
                var n = XY[0].length;
                var Xs = 0, Ys = 0;
                for (var i = 0; i < n; i++) {
                    Xs += XY[0][i];
                    Ys += XY[1][i];
                }
                return [Xs / n, Ys / n];
            };
            /** Retorna un array de los puntos que contiene. (SIN TENER EN CUENTA REPETIDOS) */
            Polygon.prototype.getPoints = function () {
                var points = [];
                this.getChildren().forEach(function (s) {
                    var ps = s.getPoints();
                    for (var i = 0; i < points.length; i++) {
                        if ((ps.length > 0) && (points[i].getId() === ps[0].getId())) {
                            ps.shift();
                        }
                        if ((ps.length > 1) && (points[i].getId() === ps[1].getId())) {
                            ps.pop();
                        }
                    }
                    points = points.concat(ps);
                }, this);
                return points;
            };
            /** Retorna un array de los segmentos que contiene. Aquí es sinónimo de 'getChildren()' */
            Polygon.prototype.getSegments = function () {
                return this.getChildren();
            };
            ;
            /** Desplaza el polígono (todos sus hijos) una cantidad de coordenadas x e y.
            * Actúa como si se desplazase el polígono al completo desde su eje de gravedad o Baricentro (CENTROIDE) */
            Polygon.prototype.move = function (x, y) {
                this.getChildren().forEach(function (s) {
                    s.move(x, y); //DESPLAZAR EL PUNTO SUMÁNDOLE ESTAS COORDENADAS
                }, this);
                this.update();
                return this;
            };
            /** Mueve el punto central del polígono (y todos sus hijos) a las coordenadas x e y.
             * Actúa como si se desplazase el polígono al completo desde su eje de gravedad o Baricentro (CENTROIDE) */
            Polygon.prototype.moveTo = function (x, y) {
                //var centroide: canvasShapes.PolyArea.Point = new canvasShapes.PolyArea.Point(this.super());
                var centroideXY = this.centroide();
                //centroide.setX(centroideXY[0]);
                //centroide.setY(centroideXY[1]);
                var newX = x - centroideXY[0];
                var newY = y - centroideXY[1];
                //centroide = null; //NULLIFY
                this.getChildren().forEach(function (s) {
                    s.move(newX, newY); //DESPLAZAR EL PUNTO SUMÁNDOLE LA DIFERENCIA DE COORDENADAS
                }, this);
                this.update();
                return this;
            };
            /** Elimina este objeto (con posible propagación hacia hijos y nietos, ...) */
            Polygon.prototype.remove = function (spread) {
                for (var i = 0; i < this.getSuper().getPolygons().length; i++) {
                    if (this.getSuper().getPolygons()[i].getId() === this.getId()) {
                        this.removeChildren(spread);
                        //                if(this.getElement() && this.getElement().parentNode) { this.getElement().parentNode.removeChild(this.getElement()); }
                        this.getSuper().getPolygons().splice(i, 1);
                        this.setValido(false);
                        //this.getParent().sanitize();
                        //this.getParent().redraw();
                        this.getSuper().sanitize();
                        this.getSuper().draw();
                        break;
                    }
                }
            };
            /** Elimina hijos (con posible propagación hacia nietos, ...) */
            Polygon.prototype.removeChildren = function (spread) {
                if (spread) {
                    while (this.getChildren().length > 0) {
                        this.getChildren()[0].remove(spread);
                        this.getChildren().splice(0, 1);
                    }
                }
            };
            /** Elimina un segmento hijo pasado como parámetro (con posible propagación hacia nietos, ...) */
            Polygon.prototype.removeSegment = function (segment, spread) {
                //var self=this;
                for (var i = 0; i < this.getChildren().slice(0).length; i++) {
                    var s = this.getChildren()[i];
                    if (segment.getId() === s.getId()) {
                        s.remove(spread);
                        this.getChildren().splice(i, 1);
                    }
                }
                //this._children.pop();
            };
            /** Añade un punto al Polígono. MANTIENE TODOS SUS HIJOS ANTERIORES.
            * Aunque no elimina ningún hijo, esto obliga a reconstruirlo en parte.*/
            Polygon.prototype.addPoint = function (newPoint) {
                if (!newPoint) {
                    return;
                }
                if (this.getChildren().length > 2) {
                    this.getParent().addPoint(newPoint);
                    var firstSeg = this.getChildren()[0];
                    var lastSeg = this.getChildren()[this.getChildren().length - 1];
                    var firstPoint = firstSeg.getP1();
                    var lastPoint = lastSeg.getP1();
                    //var firstPoint=lastSeg.getP1();
                    //var lastPoint=lastSeg.getP2();
                    //var firstName=firstPoint.getName().toString();
                    //var lastName=newPoint.getName().toString();
                    //ELIMINAMOS EL ÚLTIMO SEGMENTO (lo vamos a partir en dos) pero no sus puntos
                    this.removeSegment(lastSeg, false);
                    //this._children.pop();
                    //alert(this.getSegments().length);
                    //CREAMOS DOS SEGMENTOS
                    var newSegment1 = new canvasShapes.PolyArea.Segment(this, this.getSuper());
                    newSegment1.setP1(lastPoint);
                    newSegment1.setP2(newPoint);
                    var newSegment2 = new canvasShapes.PolyArea.Segment(this, this.getSuper());
                    newSegment2.setP1(newPoint);
                    newSegment2.setP2(firstPoint);
                    //AÑADE LOS NUEVOS SEGMENTOS CREADOS
                    this.addSegment(newSegment1);
                    this.addSegment(newSegment2);
                }
            };
            /** Añade un segmento al Polígono. MANTIENE TODOS SUS HIJOS ANTERIORES.
            * Aunque no elimina ningún hijo, esto obliga a reconstruirlo en parte.*/
            Polygon.prototype.addSegment = function (newSegment) {
                this.getChildren().push(newSegment);
                //alert(newSegment.getP1().getId()+", "+newSegment.getP2().getId());
                //newSegment.toCollection();
                this.getParent().addSegment(newSegment);
                this.update();
                //PROPORCIÓN E INVERSIÓN
                //this.getSuper().setPointsProportion(this.getSuper().equalProportion);
                //this.getSuper().setPointsInversion();
            };
            /** Comprueba si otro punto es el mismo que este. Tiene que tener el mimo 'id' y las mismas coordenadas. */
            Polygon.prototype.isEqual = function (polygon) {
                return (this.isEqualCoordinates(polygon) && (polygon.getId() === this.getId()));
            };
            /** Comprueba si otro punto tiene las mismas coordenadas que este. */
            Polygon.prototype.isEqualCoordinates = function (polygon) {
                /*var equalCoordinates: boolean = false;
                this.getChildren().forEach(function(s: canvasShapes.PolyArea.Segment) {
                       //equalCoordinates &&= s.isEqualCoordinates(s);
                }, this);
                return equalCoordinates;*/
                return (this.coordinates() + "") === (polygon.coordinates() + "");
            };
            /** Representa (dibujandolo) el polígono (con sus puntos y segmentos) en su contexto. */
            Polygon.prototype.draw = function () {
                //alert("PolyArea.Point.draw()");
                //POLÍGONO
                if (this.getParent().getConf().drawPolygons) {
                    var ctx = this.getContext();
                    if (!this.valido || !ctx) {
                        return null;
                    }
                    this.getSuper().setPointsProportion();
                    //variables shortcuts
                    var segs = this.getSegments();
                    //NOMBRE
                    var name = "";
                    segs.forEach(function (s) {
                        name += "_" + s.getName();
                        s.showName = this.showName; // || s.showName;
                    }, this);
                    this.setName(this.getName() || name);
                    var color = (this.selected) ? "orange" : this.color;
                    this.fill = true;
                    if (this.gradient) {
                        this.gradient.addColorStop(0, color);
                        this.gradient.addColorStop(1, this.border);
                        ctx.fillStyle = (this.fill ? this.gradient : this.color); //"black";
                    }
                    else {
                        ctx.fillStyle = this.color;
                    }
                    ctx.strokeStyle = this.border;
                    // Filled segment
                    ctx.lineWidth = this.size;
                    ctx.lineCap = this.type[0];
                    ctx.lineJoin = this.type[1];
                    //SEGMENTOS
                    ctx.beginPath();
                    //ctx.beginPath();
                    if ((segs.length > 0) && segs[0].getP1()) {
                        ctx.moveTo(segs[0].getP1().getXComputed(), segs[0].getP1().getYComputed());
                    } //pop()
                    for (var i = 0; i < segs.length; i++) {
                        if (segs[i].getP1() && segs[i].getP2()) {
                            ctx.lineTo(segs[i].getP1().getXComputed(), segs[i].getP1().getYComputed());
                            ctx.lineTo(segs[i].getP2().getXComputed(), segs[i].getP2().getYComputed());
                        }
                    }
                    //ctx.moveTo(sClon[0].p1.x, sClon[0].p1.y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill(); //llamando a fill se cierra la ruta
                    //TEXTO
                    /*
                var p=this.this._super.mediumP1P2(this.p1, this.p2);
                ctx.font = "italic "+(this.size*8+4)+'pt Calibri';
                ctx.lineWidth = 1;
                ctx.textAlign="center";
                ctx.textBaseline="middle";
                // stroke color
                //ctx.strokeStyle = 'blue';
                //ctx.strokeText(this.name, p.x, p.y);
                ctx.fillStyle = "blue";//this.color;
                //ctx.fillText(this.name, p.x+(this.size*2), p.y+(this.size*2));
                ctx.fillText(this.name, p.x, p.y);
                //ctx.fillText(this.name,  p.x+5, p.y+5, this.size*10);
                ctx.strokeStyle="blue";
                var dim=ctx.measureText(this.name);
                //ctx.strokeRect(p.x-(this.size*4+4)/2, p.y-(this.size*4+4), dim.width, (this.size*4+4)+this.size);
                ctx.strokeRect(p.x-(this.size*4+4)/2, p.y-(this.size*4+4), dim.width, 0.5);
      
                ctx.closePath();
                */
                    //BARICENTRO // CENTROIDE
                    var centroide = this.centroide();
                    //COMPUTAR
                    centroide[0] = canvasShapes.toXComputed(this.getSuper(), centroide[0]);
                    centroide[1] = canvasShapes.toYComputed(this.getSuper(), centroide[1]);
                    ctx.beginPath();
                    ctx.fillStyle = this.color;
                    ctx.arc(centroide[0], centroide[1], this.size * 2, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                    ctx.restore();
                    //DIBUJA LOS HIJOS
                    if (this.drawChildren && this.drawSegments) {
                        segs.forEach(function (s) {
                            s.draw();
                        }, this);
                    }
                    return this;
                }
            };
            return Polygon;
        })();
        PolyArea.Polygon = Polygon;
    })(PolyArea = canvasShapes.PolyArea || (canvasShapes.PolyArea = {}));
})(canvasShapes || (canvasShapes = {}));
// END MODULE: POLYGON 
