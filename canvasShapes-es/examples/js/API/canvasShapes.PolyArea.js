/// <reference path="canvasShapes.ts" />
/// <reference path="canvasShapes.Options.ts" />
/// <reference path="canvasShapes.objLanguage.ts" />
/// <reference path="canvasShapes.objects.ts" />
/// <reference path="canvasShapes.util.ts" />
/// <reference path="canvasShapes.shapes.ts" />
/// <reference path="canvasShapes.events.ts" />
/// <reference path="canvasShapes.draw.ts" />
/// <reference path="canvasShapes.UI.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.PolyArea.js' (MAIN-OBJECT-CLASS) Clase principal que alberga los objetos de dibujado. Hijos: Polígonos, Segmentos y Puntos
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.PolyArea.js' (MAIN-OBJECT-CLASS) Clase principal que alberga los objetos de dibujado. Hijos: Polígonos, Segmentos y Puntos
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: POLYAREA
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    //CLASE PRINCIPAL INTERNA PRIVADA POLYAREA
    var PolyArea = (function () {
        /** CONSTRUCTOR */
        function PolyArea(conf) {
            if (conf === void 0) { conf = {}; }
            //VARIABLES PRIVADAS
            var _conf = canvasShapes.buildOptions(conf);
            var _name = "PolyArea";
            var _id = _name + "-" + _conf.timestamp + "-" + Math.floor((Math.random() * 100) + 1); //_conf.id;
            var _children = { "Points": [], "Segments": [], "Polygons": [] };
            var _canvas = _conf.canvas;
            //var _context: CanvasRenderingContext2D = null;
            var _container = _conf.container;
            var _proportion = 1;
            var _super = null;
            var _parent = null;
            ///////
            //GETTERs & SETTERs DE LAS VARIABLES PRIVADAS
            /** Método Getter para tomar el id de este objeto. ATENCION: NO ES EL ID DEL CANVAS.
            * @see this.getCanvasId() */
            this.getId = function () { return _id; };
            /** Método Setter para establecer el id de este elemento. Implica un refresco de alguna de sus partes. */
            this.setId = function (id) {
                if ((typeof (id)).toUpperCase() !== "UNDEFINED") {
                    _id = id;
                    this.update();
                }
            };
            /** Método Getter para tomar el nombre de este elemento. */
            this.getName = function () { return _name; };
            /** Método Setter para establecer el nombre de este elemento. Implica un refresco de alguna de sus partes. */
            this.setName = function (name) {
                if ((typeof (name)).toUpperCase() !== "UNDEFINED") {
                    _name = name;
                    this.update();
                }
            };
            /** Método GETTER para obtener la configuracion de este objeto */
            this.getConf = function () { return _conf; };
            this.setConf = function (conf) {
                if ((typeof (conf)).toUpperCase() !== "UNDEFINED") {
                    _conf = canvasShapes.buildOptions(conf);
                    this.recreate();
                    this.update();
                }
            };
            /** Método Getter para tomar los hijos (shapes) Points, Segments and Polygons en forma de un objeto de arrays. */
            this.getChildren = function () { return _children; };
            this.setChildren = function (children, no_sanitizar) {
                if (children) {
                    _children = children;
                    this.shapes = children;
                    if (!no_sanitizar) {
                        this.update();
                    }
                }
            };
            /** Método Getter para tomar el canvas HTML que está ligado a su id . */
            this.getCanvas = function () { return _canvas; };
            /** Método Setter para uso interno, no utilizar, provocaría cambios indeterminados. */
            this.setCanvas = function (canvas) { _canvas = canvas; };
            /** Método Getter para tomar el contexto de dibujo que está ligado a su canvas . */
            this.getContext = function () { return _canvas.getContext("2d", { alpha: true }); };
            this.getContainer = function () { return _container; };
            //VARIBALES PÚBLICAS
            //OPCIONES NO-UI
            /** Objeto para traducciones de los textos. Si se ha especificado en la configuracion coincidirá con este, sinó, se tomará uno interno */
            this.objLanguage = canvasShapes.objLanguage(this.getConf().language); //this.getConf().objLanguage; //|| this.objLanguage( this.getConf() );
            this.cartesianArt = canvasShapes.cartesianArt;
            //OPCIONES UI ANTES DEL CANVAS
            //BLOQUES
            /** Muestra la interfaz gráfica con botonera de menú, campos de acciones e información útil. */
            this.showBody = _conf.showBody;
            this.polyAreaHeader = _conf.polyAreaHeader;
            this.polyAreaFooter = _conf.polyAreaFooter;
            this.canvasDataTitle = _conf.canvasDataTitle;
            this.canvasDataInfo = _conf.canvasDataInfo;
            this.canvasDataIntro = _conf.canvasDataIntro;
            this.canvasDataOptions = _conf.canvasDataOptions;
            //BUTTONS
            this.showUIButtons = _conf.showUIButtons;
            this.btnCanvasFlag = _conf.btnCanvasFlag;
            this.btnCanvasRedraw = _conf.btnCanvasRedraw;
            this.btnCanvasZoom = _conf.btnCanvasZoom;
            this.btnCanvasOptions = _conf.btnCanvasOptions;
            this.btnDownCanvasImage = _conf.linkDownCanvasImage;
            //this.linkDownCanvasImage = _conf.linkDownCanvasImage;
            this.btnCanvasClean = _conf.btnCanvasClean;
            this.btnCanvasReset = _conf.btnCanvasReset;
            this.canvasDataButtons = _conf.canvasDataButtons;
            //OTHERS
            this.cleanAllIfEmpty = _conf.cleanAllIfEmpty;
            //CANVAS OPTIONS
            /** Rejillas */
            this.grid = _conf.grid;
            /** Ejes */
            this.axes = _conf.axes;
            /** Fracción de cada cuadrícula de la Rejilla. Si no se desea Rejilla dejar en 0 */
            this.fractionGrid = _conf.fractionGrid || 0.1;
            this.canvasWidth = _conf.canvasWidth;
            this.canvasHeight = _conf.canvasHeight;
            //COORDINATES
            this.autoProportion = _conf.autoProportion;
            /** Igual a equalProportion. */
            this.deformation = _conf.deformation || !this.autoProportion; //_conf.deformation || true;
            /** Obliga a la figura a ocupar el alto y el ancho del canvas (DEFORMACIÓN), por defecto FALSE. Sinónimo de 'deformation' */
            this.equalProportion = _conf.equalProportion || this.deformation;
            /** Proporción a aplicar a los puntos de las figuras para que se ajusten al canvas.
              * Conforme se vayan añadiendo puntos se deberá recalcular esta proporción. */
            this.proportionX = _conf.proportionX || 1;
            this.proportionX_OLD = this.proportionX;
            /** Proporción a aplicar a los puntos de las figuras para que se ajusten al canvas.
              * Conforme se vayan añadiendo puntos se deberá recalcular esta proporción. */
            this.proportionY = _conf.proportionY || 1;
            this.proportionY_OLD = this.proportionY;
            /** Inversión del valor del eje X. Por defecto FALSE */
            this.invertX = _conf.invertX;
            /** Inversión del valor del eje Y. Por defecto TRUE ya que las ordenadas crecen inversamente, osea, hacia abajo. */
            this.invertY = _conf.invertY;
            //OTHERS
            /** Número de decimales de aproximación para los cálculos y representaciones. */
            this.decimals = _conf.decimals;
            this.canvasZoomed = 0;
            this.zoomIn = _conf.zoomIn || 50;
            this.zoomOut = _conf.zoomOut || this.zoomIn;
            /** Permite añadir puntos dinámicamente mediante clicks del ratón. */
            this.mousePoints = _conf.mousePoints;
            /** Muestra información de puntos y segmentos dinámicamente mediante la situación del ratón. */
            this.mouseInfo = _conf.mouseInfo;
            /** Permite arrastrar puntos dinámicamente mediante el ratón. */
            this.mouseDrop = _conf.mouseDrop;
            /** Mostrar los Nombres de las figuras. */
            this.showNames = _conf.showNames;
            //FREEDRAW
            /** Permite el dibujado libre con el ratón. */
            this.freeDraw = _conf.freeDraw || false;
            this.freeDrawSize = _conf.freeDrawSize || 3;
            this.freeDrawColor = _conf.freeDrawColor || "black";
            this.freeDrawRounded = _conf.freeDrawRounded || true;
            /** Cuadrar las dimensiones del canvas (Ref. width), por defecto TRUE. */
            this.canvasSquared = _conf.canvasSquared;
            /** Centrar las coordenadas del Canvas. Retiene el estado de centrado (translación) de las coordenadas. */
            this.coordinatesCentred = _conf.coordinatesCentred;
            /** Rejillas Frontal (1º Plano) */
            this.gridFront = _conf.gridFront;
            /** Ejes Frontal (1º Plano) */
            this.axesFront = _conf.axesFront;
            /** Relleno de los polígonos */
            this.fill = _conf.fill;
            /** Retiene el estado del botón del ratón. */
            this.mousedown = false;
            /** Retiene el estado del dibujo a mano alzada. */
            this.freeDrawON = false;
            //FIN DE OPCIONES
            /** Objeto que retiene las formas 'Point, Segment y Polygon' que pertenecen a este objeto */
            this.shapes = { Points: [], Segments: [], Polygons: [] };
            /** Objeto que se utiliza para retener el foco en el arrastre sobre el objeto activo. */
            this.shapesDrop = { "Point": null, "Segment": null, "Polygon": null };
            /** Se utiliza para retener las coordenadas originales en el arrastre sobre el objeto activo. */
            this.oldCoordinates = null;
            this.selected = true;
            this.enabled = true;
            this.valid = true;
            if (!_canvas) {
                canvasShapes.assignCanvas(this);
            }
            /** El contexto del canvas de dibujado. */
            //_context = (((_canvas !== null) && _canvas.getContext) ? _canvas.getContext('2d') : null);
            _container = (_container ? _container : _canvas.parentNode);
            /** Función interna privada para establecer la proporción. Se utiliza en el inicializador. */
            //ASSIGN PROPORTION
            /*var proportion = 0.95;
            var canvasW = _canvas.width * proportion; //pixels
            var canvasH = _canvas.height * proportion; //pixels
            var propX = canvasW / 2;
            var propY = canvasH / 2;
            //TOMAMOS LA PROPORCION MENOR
            _proportion = Math.min(propX, propY);*/
            //canvasShapes.getBody(this);//, _container);
            //INICIALIZACIÓN DEL CANVAS
            var context = this.getContext();
            //COORDINATES CENTRED
            if (context) {
                this.setCentred(this.coordinatesCentred);
                context.save();
            }
            /** Gradiente de Relleno de los polígonos */
            this.gradient = _conf.gradient || (function (canvas, ctx) {
                var gradient = null;
                if (canvas && ctx) {
                    gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                    gradient.addColorStop(0, 'black');
                    gradient.addColorStop(1, 'white');
                }
                return gradient;
            })(_canvas, context);
            canvasShapes.PolyArea.count = canvasShapes.PolyArea.count++;
            //CHILDREN CLASS
            this.Point = null;
            this.Segment = null;
            this.Polygon = null;
        }
        //MÉTODOS DE UTILIDAD
        /** Función de utilidad para comprobar si se tiene un canvas y un contexto correcto. */
        PolyArea.prototype.test = function () {
            var __TAG = this.getTAG() + "::TEST::";
            //var c="CONTEXT "+(this.context ? "OK!" : "FAIL!");
            //var ca="CANVAS "+(this.canvas ? "OK!" : "FAIL!");
            //return __TAG + "\r\n" + ca + ", " + c;
            return (this.getCanvas() && this.getContext());
        };
        PolyArea.prototype.prepare = function () {
            //COORDINATES CENTRED
            //this.setCoordinatesCentred(!this.coordinatesCentred);
            this.sanitize();
            //REJILLAS
            canvasShapes.drawGrid(this, this.grid);
            //EJES
            canvasShapes.drawAxes(this, this.axes);
        };
        /** Sanea los arrays de figuras creadas, suprimiendo los nulos y no válidos. Retorna el objeto de figuras (getChildren()) */
        PolyArea.prototype.sanitize = function () {
            //PUNTOS, SEGMENTOS Y POLÍGONOS
            var copyShapes = { Points: [], Segments: [], Polygons: [] };
            var children = this.getChildren();
            for (var s in children) {
                if (children.hasOwnProperty(s)) {
                    copyShapes[s] = [];
                    for (var i = 0; i < children[s].length; i++) {
                        if (!(children[s][i]) || !(children[s][i].valido)) {
                            continue;
                        }
                        copyShapes[s].push(children[s][i]);
                    }
                }
            }
            this.setChildren(copyShapes, true);
            return children;
        };
        PolyArea.prototype.update = function () {
            this.sanitize();
        };
        PolyArea.prototype.recreate = function () {
            this.update();
        };
        /** Limpia completamente el canvas */
        PolyArea.prototype.canvasClean = function () {
            this.getCanvas().width = this.getCanvas().width;
            //this.setCoordinatesCentred(this.coordinatesCentred);
            //return _context;
            return this.getContext();
        };
        /** Pone a cero este objeto sin hijos */
        PolyArea.prototype.reset = function () {
            this.setChildren({ "Points": [], "Segments": [], "Polygons": [] });
            this.setShapes({ "Points": [], "Segments": [], "Polygons": [] });
            this.setShapesDrop({ "Point": null, "Segment": null, "Polygon": null });
        };
        ;
        //API PUBLICA
        //GETTERs && SETTERs PUBLICOS
        PolyArea.prototype.setDeformation = function (deformation) {
            this.deformation = deformation;
            this.equalProportion = deformation;
            this.getConf().deformation = deformation;
            this.getConf().equalProportion = deformation;
        };
        ;
        /** Sinónimo y duplicado de setChildren(..) */
        PolyArea.prototype.setShapes = function (shapes) {
            this.setChildren(shapes);
        };
        PolyArea.prototype.setShapesDrop = function (shapes_drop) {
            this.shapesDrop = shapes_drop;
        };
        PolyArea.prototype.setGrid = function (grid) {
            this.grid = grid;
            this.getConf().grid = grid;
        };
        PolyArea.prototype.setAxes = function (axes) {
            this.axes = axes;
            this.getConf().axes = axes;
        };
        PolyArea.prototype.setFraction = function (fractionGrid) {
            this.fractionGrid = fractionGrid;
            this.getConf().fractionGrid = fractionGrid;
        };
        PolyArea.prototype.setDecimals = function (decimals) {
            this.decimals = decimals;
            this.getConf().decimals = decimals;
        };
        PolyArea.prototype.setShowNames = function (showNames) {
            this.showNames = showNames;
            this.getConf().showNames = showNames;
            this.getPoints().forEach(function (p) {
                p.showName = showNames;
            });
            this.getSegments().forEach(function (s) {
                s.showName = showNames;
            });
            this.getPolygons().forEach(function (p) {
                p.showName = showNames;
            });
        };
        PolyArea.prototype.setFreeDraw = function (freeDraw) {
            this.freeDraw = freeDraw;
            this.getConf().freeDraw = freeDraw;
        };
        PolyArea.prototype.setAutoProportion = function (autoProportion) {
            this.autoProportion = autoProportion;
            this.getConf().autoProportion = autoProportion;
        };
        //PROPORCIONES
        /** Un valor FLOAT indicando la proporción tanto de las coordenadas X como Y. Establece el mismo valor
        * para 'proportionX' y 'proportionY'; AUNQUE EL VALOR ORIGINAL DE 'X' e 'Y' NO VARÍA. */
        PolyArea.prototype.setProportion = function (proportion) {
            if (proportion) {
                this.proportionX = proportion;
                this.proportionY = proportion;
            }
        };
        /** Un valor FLOAT indicando la proporción de las coordenadas X solamente. AUNQUE EL VALOR ORIGINAL DE 'X' NO VARÍA.
      * @see setProportion(..)
      * @see setProportionY(..) */
        PolyArea.prototype.setProportionX = function (proportion) {
            if (proportion) {
                this.proportionX = proportion;
            }
        };
        /** Un valor FLOAT indicando la proporción de las coordenadas Y solamente. AUNQUE EL VALOR ORIGINAL DE 'Y' NO VARÍA.
        * @see setProportion(..)
        * @see setProportionX(..) */
        PolyArea.prototype.setProportionY = function (proportion) {
            if (proportion) {
                this.proportionY = proportion;
            }
        };
        //PROPAGACIÓN DE LA PROPORCION
        /** Establece la proporción a utilizar en todos los puntos de este objeto para que se ajusten a las
        * dimensiones del canvas de forma proporcional. Si especificamos 'rellenar=true' significará que deseamos
        * que la figura RELLENE u ocupe la mayor superficie del canvas posible (dentro de sus coordenadas), esto
        * implicará una DEFORMACIÓN de la figura para adaptarse al canvas pero quizás sea útil para ampliar zonas
        * que de otra forma no se aprecian bien.
        * Por otro lado si especificamos 'rellenar=false' (por defecto) se le aplicará la misma proporción en X
        * que en Y, representando de esta forma la figura REAL. Aún así, todo esto depende de la 'cuadratura' del canvas.
        * ATENCIÓN: Estas medidas y proporciones se consideran PIXELS ya que la intención es utilizarlas
        * con el objetivo de su representación gráfica (normálmente en su método 'draw()'), independientemente
        * que se haya pensado en utilizar otras unidades de medida, esto no influirá en cálculos posteriores
        * ya que en realidad no se cambian las coordenadas reales de los puntos, sólo se implementa de forma
        * visual en la representación gráfica del canvas. */
        PolyArea.prototype.setPointsProportion = function (rellenar) {
            if ((typeof rellenar).toUpperCase() === "UNDEFINED") {
                rellenar = this.deformation;
            }
            //LAS MEDIDAS SE REFIEREN A PIXELS
            var proporcionX = this.proportionX_OLD;
            var proporcionY = this.proportionY_OLD;
            var coordMax = canvasShapes.getCoordinatesMax(this, 0);
            coordMax = isFinite(coordMax) ? coordMax : ((this.getCanvas().width * 0.95) / 2);
            var coordMin = canvasShapes.getCoordinatesMax(this, 1);
            coordMin = isFinite(coordMin) ? coordMin : ((this.getCanvas().height * 0.95) / 2);
            if (this.autoProportion) {
                proporcionX = ((this.getCanvas().width * 0.95) / 2) / coordMax;
                proporcionY = ((this.getCanvas().height * 0.95) / 2) / coordMin;
            }
            //alert(proporcionX + ", " + proporcionY);
            //TOMAMOS LA PROPORCION MENOR
            var proporcion = Math.min(proporcionX, proporcionY);
            this.setProportionX((rellenar ? proporcionX : proporcion));
            this.setProportionY((rellenar ? proporcionY : proporcion));
        };
        //INVERSION
        /** Un valor BOOLEAN indicando si invertir (cambiar el signo) el valor tanto de las coordenadas X como Y de los Puntos.
        * Establece el mismo valor para 'invertX' e 'invertY'; AUNQUE EL VALOR ORIGINAL DE LAS COORDENADAS 'X' e 'Y' DE LOS PUNTOS NO VARÍA. */
        PolyArea.prototype.setInvert = function (invert) {
            this.invertX = invert;
            this.invertY = invert;
            //this.spreadInvert();
        };
        /** Un valor BOOLEAN indicando si invertir (cambiar el signo) el valor de las coordenadas X de los Puntos.
        * AUNQUE EL VALOR ORIGINAL DE LAS COORDENADAS 'X' DE LOS PUNTOS NO VARÍA. */
        PolyArea.prototype.setInvertX = function (invert) {
            this.invertX = invert;
            //this.spreadInvert();
        };
        /** Un valor BOOLEAN indicando si invertir (cambiar el signo) el valor de las coordenadas Y de los Puntos.
        * AUNQUE EL VALOR ORIGINAL DE LAS COORDENADAS 'Y' DE LOS PUNTOS NO VARÍA. */
        PolyArea.prototype.setInvertY = function (invert) {
            this.invertY = invert;
            //this.spreadInvert();
        };
        //PROPAGACIÓN DE LA INVERSION
        /** Establece la inversión a utilizar en todos los puntos de este objeto para que se ajusten a las
        * pecualiares características del canvas (ordenadas positivas hacia abajo).
        * ATENCIÓN: La implementación de este método es con fines gráficos, (normálmente en su método 'draw()'),
        * esto no influirá en cálculos posteriores ya que en realidad no se cambian las coordenadas reales de
        * los puntos, sólo se implementa de forma visual en la representación gráfica del canvas. */
        PolyArea.prototype.setPointsInversion = function () {
            this.setInvertX(this.invertX);
            this.setInvertY(this.invertY);
        };
        PolyArea.prototype.setCentred = function (centred) {
            var ctx = this.getContext();
            if (ctx) {
                var x = -0.5;
                x += (centred ? (this.getCanvas().width / 2) : 0);
                var y = -0.5;
                y += (centred ? (this.getCanvas().height / 2) : 0);
                ctx.translate(x, y);
            }
        };
        //PUBLIC METHODS
        PolyArea.prototype.coordinates = function (withProportion, withInvert) {
            var pointsXY = [];
            //APLICA PROPORCIONES E INVERSIONES (SOLO PARA EL CÁLCULO)
            for (var j in this.getChildren()) {
                if (this.getChildren().hasOwnProperty(j) && (j === "Points")) {
                    this.getChildren()[j].forEach(function (s) {
                        var xy = s.coordinates(withProportion, withInvert);
                        for (var i = 0; i < xy.length; i++) {
                            pointsXY.push(xy[i]);
                        }
                        //alert(j+" - "+pointsXY[0]);
                    }, this);
                }
            }
            return pointsXY;
        };
        PolyArea.prototype.getCoordinates = function () {
            return this.coordinates(true, true);
        };
        PolyArea.prototype.coordinatesXY = function () {
            var xs = [], ys = [];
            for (var j in this.getChildren()) {
                if (this.getChildren().hasOwnProperty(j) && (j === "Points")) {
                    this.getChildren()[j].forEach(function (s) {
                        var xy = s.coordinatesXY();
                        for (var i = 0; (i < xy[0].length) && (i < xy[1].length); i++) {
                            xs.push(xy[0][i]);
                            ys.push(xy[1][i]);
                        }
                    }, this);
                }
            }
            return [xs, ys];
        };
        PolyArea.prototype.getCoordinatesXY = function () {
            return this.coordinatesXY();
        };
        //METODOS PUBLICOS DEL OBJETO. NO HEREDABLES A LAS FIGURAS
        /** Sinónimo de 'getChildren()'.
          * Retorna un array con todas las formas creadas individualmente o a través de sus figuras 'padres'. */
        PolyArea.prototype.getShapes = function () { return this.getChildren(); };
        /** Retorna un array con todos los puntos creados, individualmente o a través de sus figuras 'padres'. */
        PolyArea.prototype.getPoints = function () { return this.getChildren().Points; };
        ;
        /** Retorna un array con todos los segmentos creados. */
        PolyArea.prototype.getSegments = function () { return this.getChildren().Segments; };
        ;
        /** Retorna un array con todos los polígonos creados. */
        PolyArea.prototype.getPolygons = function () { return this.getChildren().Polygons; };
        ;
        PolyArea.prototype.addPoint = function (point) {
            var existe = false;
            for (var i = 0; i < this.getChildren().Points.length; i++) {
                if (this.getChildren().Points[i].isEqual(point)) {
                    existe = true;
                    break;
                }
            }
            if (!existe && point.valido) {
                this.getChildren().Points.push(point);
                this.setPointsProportion(this.deformation);
                this.setPointsInversion();
            }
        };
        PolyArea.prototype.addSegment = function (segment) {
            var existe = false;
            for (var i = 0; i < this.getChildren().Segments.length; i++) {
                if (this.getChildren().Segments[i].isEqual(segment)) {
                    existe = true;
                    break;
                }
            }
            if (!existe && segment.valido) {
                this.getChildren().Segments.push(segment);
                var self = this;
                segment.getChildren().forEach(function (p) {
                    if (p) {
                        self.addPoint(p);
                    }
                });
            }
        };
        PolyArea.prototype.addPolygon = function (polygon) {
            var existe = false;
            for (var i = 0; i < this.getChildren().Polygons.length; i++) {
                if (this.getChildren().Polygons[i].isEqual(polygon)) {
                    existe = true;
                    break;
                }
            }
            if (!existe && polygon.valido) {
                this.getChildren().Polygons.push(polygon);
                var self = this;
                polygon.getChildren().forEach(function (s) {
                    if (s) {
                        self.addSegment(s);
                    }
                });
            }
        };
        //DISTANCIAS
        /** PERIMETRO. (THEOREMA DE PITÁGORAS). Alias de 'distance(..)'
        * Retorna la suma de las distancias de todos los puntos que componen este poligono suponiendolo CERRADO, calculada entre todos los
        * dos Puntos de cada uno de los segmentos.
        * NO se tienen en cuenta ni las proporciones, ni la inversión.
        * OBSERVACIÓN: La medida tomada coincidirá con la del método 'distance(..)' siempre que no existan ni proporciones ni inversiones
        */
        PolyArea.prototype.perimeter = function (withProportion, withInvert) {
            //[[[-4,4], [-4,-4], [4,-4], [4,4]]]
            var perimetro = 0; // Accumulates perimetro in the loop
            /*for(var j in this.getChildren()){
              if(this.getChildren().hasOwnProperty(j)){
                this.getChildren()[j].forEach(function(s) {
                  perimetro += s.perimeter(withProportion, withInvert);
                }, this);
              }
            }*/
            var segmentos = [];
            this.getPolygons().forEach(function (p) {
                perimetro += p.perimeter(withProportion, withInvert);
                segmentos = segmentos.concat(p.getChildren());
            }, this);
            this.getSegments().forEach(function (s) {
                var leido = false;
                segmentos.forEach(function (s2) {
                    if (s.getId() === s2.getId()) {
                        leido = true;
                    }
                });
                if (!leido) {
                    perimetro += s.perimeter(withProportion, withInvert);
                }
            }, this);
            segmentos = null; //NULLIFY
            return perimetro;
        };
        /** SUMA TODAS LAS ÁREAS DE LAS FIGURAS. EVIDENTEMENTE SOLO CUENTA EL ÁREA DE LOS POLÍGONOS Y FIGURAS CERRADAS */
        PolyArea.prototype.area = function (withProportion, withInvert) {
            var area = 0; // Accumulates area in the loop
            //APLICA PROPORCIONES E INVERSIONES (SOLO PARA EL CÁLCULO)
            for (var j in this.getChildren()) {
                if (this.getChildren().hasOwnProperty(j)) {
                    this.getChildren()[j].forEach(function (s) {
                        area += s.area(withProportion, withInvert);
                    }, this);
                }
            }
            return area;
        };
        PolyArea.prototype.draw = function () {
            //alert("PolyArea.draw()");
            canvasShapes.redraw(this);
        };
        /** Variable estática empleada como contador de objetos que se han CREADO (NO INSTANCIADO) a través del constructor. */
        PolyArea.count = 0;
        return PolyArea;
    })();
    canvasShapes.PolyArea = PolyArea;
})(canvasShapes || (canvasShapes = {}));
// END MODULE: POLYAREA 
