/// <reference path="canvasShapes.PolyArea.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.PolyArea.Segment.js' (OBJECT-CLASS) Objeto de dibujado Segmento en el canvas.
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.PolyArea.Segment.js' (OBJECT-CLASS) Objeto de dibujado Segmento en el canvas.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: SEGMENT
var canvasShapes;
(function (canvasShapes) {
    var PolyArea;
    (function (PolyArea) {
        "use-strict";
        //CLASE DERIVADA INTERNA PRIVADA SEGMENT
        /**
        * OBJETO SEGMENTO CON PARAMETROS Y METODO DE DIBUJADO EN EL CONTEXTO DE DIBUJO PASADO.
        * <p>Permite representar un segmento en las coordenadas de los puntos pasados como parámetros,
        * de color y tamaño variable según los parámetros establecidos.</p>
        * <p>Al constructor se le debe pasar el objeto padre (POLYAREA) del que se obtendrá el contexto "canvasContext" y
        * el objeto superior (CANVASSHAPES).
        * Si se detecta que el contexto es nulo, los métodos de dibujo no representaran nada en el canvas (evidentemente), aunque
        * tampoco presentarán errores, símplemente su método 'draw()' regresará 'FALSE'.</p>
        * PARÁMETROS:
        * <ul>
        *   <li>'p1' y 'p2' POINT representan los puntos extremos del segmento.</li>
        *   <li>size NUMBER el tamaño (GRUESO) de la línea del semento (en pixels)</li>
        *   <li>proportionX NUMBER la proporcion de las coordenadas X de este segmento. Aunque no afecta a los cálculos, al dibujarlo si
        *       se tendrá en cuenta, resultando un valor de la multiplicación de la X de los Puntos por esta proporcion; AUNQUE EL VALOR
        *       ORIGINAL DE LAS 'X' EN LOS PUNTOS NO VARÍA. (por defecto 1)</li>
        *   <li>proportionY NUMBER la proporcion de las coordenadas Y de este segmento. Aunque no afecta a los cálculos, al dibujarlo si
        *       se tendrá en cuenta, resultando un valor de la multiplicación de la Y de los Puntos por esta proporcion; AUNQUE EL VALOR
        *       ORIGINAL DE LAS 'Y' EN LOS PUNTOS NO VARÍA. (por defecto 1)</li>
        *   <li>invertX BOOLEAN invertir o no las coordenadas X de los Puntos. Sólo al dibujarlo se tendrá en cuenta, resultando un
        *       valor invertido de las coordenadas 'X' de los Puntos (cambiado de signo); AUNQUE EL VALOR ORIGINAL DE LAS COORDENADAS 'X'
        *       DE LOS PUNTOS NO VARÍA. (por defecto 'false')</li>
        *   <li>invertX BOOLEAN invertir o no las coordenadas Y de los Puntos. Sólo al dibujarlo se tendrá en cuenta, resultando un
        *       valor invertido de las coordenadas 'Y' de los Puntos (cambiado de signo); AUNQUE EL VALOR ORIGINAL DE LAS COORDENADAS 'Y'
        *       DE LOS PUNTOS NO VARÍA. (por defecto 'false')</li>
        *   <li>type ARRAY un array de dos cadenas que representan el estilo para 'lineCap' y 'lineJoin', puede
        *       tomar alguna de las siguientes cadenas: lineCap = ['butt','round','square'];  lineJoin = ['round','bevel','miter'];</li>
        *  <li>drawPoints BOOLEAN indica si dibujar también sus Puntos extremos o no. (por defecto SI)</li>
        *   <li>ctx CONTEXT el contexto pasado al constructor. (o en su defecto el global)</li>
        * </ul>
        * MÉTODOS:
        * <ul>
        *   <li>clone()
        *        Clona el elemento sin referencias. Retorna una copia exacta de este Segmento, pero es otro objeto.</li>
        *   <li>setProportion( proportion )
        *        Un valor FLOAT indicando la proporción tanto de P1 como P2. Establece el mismo valor para 'proportionX'
        *        y 'proportionY'.</li>
        *   <li>setInvert( invert )
        *        Un valor BOOLEAN indicando si invertir (cambiar el signo) el valor tanto de las coordenadas X como Y de los Puntos.
        *        Establece el mismo valor para 'invertX' e 'invertY'; AUNQUE EL VALOR ORIGINAL DE LAS COORDENADAS 'X' e 'Y' DE LOS
        *        PUNTOS NO VARÍA.</li>
        *   <li>draw()
        *        Se encarga de dibujar el semento y sus puntos correspondientes en el canvas con sus parámetros establecidos.
        *        También se tiene en cuenta la proporcion.
        *        Retorna 'false' si no se detecta un contexto, de otro modo retorna el propio objeto 'this' para
        *        permitir 'chaining'.</li>
        *   <li>... entre otros. </li>
        * </ul>
        */
        var Segment = (function () {
            function Segment($parent, $super) {
                //super($super.getConf());
                //if($super instanceof canvasShapes.PolyArea) { }
                if (!$super) {
                    $super = $parent || canvasShapes.getInstance();
                }
                var _TAG = "Segment";
                var _name = ""; //canvasShapes.ABC.next(); //SOLICITUD ESTÁTICA DE NUEVA LETRA
                var _id = (_TAG + "[" + _name + "]-" + (new Date().getTime()) + "-" + Math.floor((Math.random() * 100) + 1));
                var _children = []; //SIN HIJOS
                /** Se refiere al objeto de orden superior 'PolyArea' al que pertenece. */
                var _super = $super || $parent; //= canvasShapes.getInstance();
                /** Se refiere al objeto 'shape' padre al que pertenece. No tiene porqué coincidir con '_super'. */
                var _parent = $parent || $super; //= canvasShapes.getInstance();
                if ((_super === null) && (_parent === null)) {
                    return null;
                }
                var _p1 = null;
                var _p2 = null;
                var _info = "";
                /////
                _children = [_p1, _p2];
                //GETTERs && SETTERs DE VARIABLES PRIVADAS
                /** Muestra, tan sólo con intención informativa, el sello de esta clase, la etiqueta exclusiva '_TAG' */
                this.getTAG = function () { return _TAG; };
                this.getId = function () { return _id; };
                this.setId = function (id) {
                    _id = id;
                    this.update();
                };
                this.getName = function () { return _name; };
                this.setName = function (name) {
                    if ((typeof (name)).toUpperCase() !== "UNDEFINED") {
                        _name = name;
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
                    _parent.addSegment(this);
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
                    INFO.push("LONG: " + canvasShapes.toDecimals(this.distance(), _parent.decimals));
                    if (this.enabled) {
                        INFO.push("E");
                    } //ENABLED
                    if (this.valido) {
                        INFO.push("V");
                    } //VALID
                    _info = _name;
                    if (_p1 && _p2) {
                        _info += "[(" + canvasShapes.toDecimals(_p1.getX(), _parent.decimals) +
                            ", " + canvasShapes.toDecimals(_p1.getY(), _parent.decimals) +
                            "), (" + canvasShapes.toDecimals(_p2.getX(), _parent.decimals) +
                            ", " + canvasShapes.toDecimals(_p2.getY(), _parent.decimals) +
                            ")] :: <br />";
                    }
                    _info += " {" + INFO.join(", ") + "}";
                };
                this.getP1 = function () { return _p1; };
                this.setP1 = function (p1) {
                    if (p1 && p1.valido) {
                        _p1 = p1;
                        _children[0] = _p1;
                        //this.refreshHtml();
                        if ((_children.length === 2) && _children[1]) {
                            this.update();
                        }
                    }
                };
                this.getP2 = function () { return _p2; };
                this.setP2 = function (p2) {
                    if (p2 && p2.valido) {
                        _p2 = p2;
                        _children[1] = _p2;
                        //this.refreshHtml();
                        if ((_children.length === 2) && _children[0]) {
                            this.update();
                        }
                    }
                    return this;
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
                        var p = _children[i];
                        if (p && p.valido) {
                            children.push(p);
                            this.getSuper().addPoint(p);
                        }
                    }
                    _children = children;
                    /*
                    if(_children.length < 2){
                        this.setSelected(false);
                        this.setEnabled(false);
                        this.setValido(false);
                    }else{
                        for(var i=0; i<_children.length; i++){
                            _children[i].setSelected(this.selected);
                            _children[i].setEnabled(this.enabled);
                            _children[i].setValido(this.valido);
                        }
                    }
    */
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
                this.color = "green";
                this.drawChildren = _parent.getConf().segmentsDrawChildren; //true;
                this.type = ["round", "round"]; //[lineCap, lineJoin] ==> lineCap = ['butt','round','square'];  lineJoin = ['round','bevel','miter'];
                this.drawPoints = _parent.getConf().drawPoints; //true;
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
                this.buildInfo();
                //_parent.addPoint(this);
            }
            /** Clona el elemento sin referencias.
              * Retorna una copia exacta de este Punto (con otro id y otro name), pero es otro objeto. */
            Segment.prototype.clone = function () {
                var s = new canvasShapes.PolyArea.Segment(this.getSuper()); //this.this.this.getSuper().Polygon();
                if (this.getP1()) {
                    s.setP1(this.getP1().clone());
                }
                if (this.getP2()) {
                    s.setP2(this.getP2().clone());
                }
                //s.setChildren([s.getP1(), s.getP2()]);
                s.setName(this.getName());
                s.showName = this.showName;
                s.size = this.size;
                s.setProportionX(this.proportionX);
                s.setProportionY(this.proportionY);
                s.setInvertX(this.invertX);
                s.setInvertY(this.invertY);
                s.border = this.border;
                s.color = this.color;
                s.drawChildren = this.drawChildren; //pol.drawSegments=this.drawSegments;
                s.type = this.type;
                s.drawPoints = this.drawPoints;
                s.ctx = this.ctx;
                s.fill = this.fill;
                s.gradient = this.gradient;
                s.setSelected(this.selected);
                s.setEnabled(this.enabled);
                s.setValido(this.valido);
                //s.setParent(this.getParent());
                return s;
            };
            //OWN METHODS
            /** Retorna un array de coordenadas del punto que interesa que detecte para mostrar la informacion (TOOLTIP) */
            Segment.prototype.getTooltipXY = function () {
                var p = this.getCentralPoint();
                if (p) {
                    return [p.getX(), p.getY()];
                }
                else {
                    return null;
                }
            };
            //PUBLIC METHODS
            Segment.prototype.setProportion = function (proportion) {
                this.proportionX = proportion;
                this.proportionY = proportion;
            };
            Segment.prototype.setInvert = function (invert) {
                this.invertX = invert;
                this.invertY = invert;
            };
            //DISTANCIAS
            /** Retorna la distancia calculada entre los dos Puntos. Alias de 'perimeter(..)'.
            * no se tienen en cuenta ni las proporciones, ni la inversión.*/
            Segment.prototype.distance = function () { return this.perimeter(); };
            /** PERIMETRO. (THEOREMA DE PITÁGORAS)
            * Retorna la suma de las distancias de todos los puntos que componen este poligono suponiendolo CERRADO, calculada entre todos los
            * dos Puntos de cada uno de los segmentos.
            * NO se tienen en cuenta ni las proporciones, ni la inversión.
            * OBSERVACIÓN: La medida tomada coincidirá con la del método 'distance(..)' siempre que no existan ni proporciones ni inversiones
            */
            Segment.prototype.perimeter = function () {
                var perimetro = 0;
                if (!this.getP1() || !this.getP2()) {
                    return perimetro;
                }
                //PITAGORAS. HIPOTENUSA
                perimetro = Math.pow(Math.pow(parseFloat(this.getP2().getX() + "") - parseFloat(this.getP1().getX() + ""), 2) +
                    Math.pow(parseFloat(this.getP2().getY() + "") - parseFloat(this.getP1().getY() + ""), 2), 1 / 2);
                return Math.abs(parseFloat(perimetro + ""));
            };
            ;
            /** Sinónimo de 'perimeter()' */
            Segment.prototype.getPerimeter = function () { return this.perimeter(); };
            /** ELEMENTO UNIDIMENSIONAL, NO TIENE ÁREA */
            Segment.prototype.area = function () { return 0; };
            /** Sinónimo de 'area()' */
            Segment.prototype.getArea = function () { return this.area(); };
            /**
            * Retorna un array de pares de coordenadas X e Y de los dos puntos que componen este segmento.
            * El array retornado de salida se entregará en la forma XY = [ [x1, y1], [x2, y2] ] */
            Segment.prototype.coordinates = function () {
                if (!this.getP1() || !this.getP2()) {
                    return [];
                }
                var pointsXY = [];
                //var xy=[ this.p1.coordinates(withProportion, withInvert), this.p2.coordinates(withProportion, withInvert) ];
                this.getChildren().forEach(function (p) {
                    pointsXY.push(p.coordinates()[0]);
                }, this);
                return pointsXY;
            };
            /**
            * OBTIENE UN ARRAY CON TODAS LAS X e Y DE LOS PUNTOS QUE COMPONEN ESTE SEGMENTO. (un array con dos arrays de dos elementos)
            * Convierte un array de los puntos de coordenadas x,y de los puntos en este segmento, en un array con todas las coordenadas
            * separando las x de las y, osea que retorna un array con dos elementos: un array de x (a su vez de dos elementos), un array
            * de y (a su vez de dos elementos).
            * Esta función se espera sea de utilidad símplemente para el polígono al que pertenece, por ejemplo para calcular el área.
            * Los array con los que se trabajarán se espera que sean de la forma: xy = [ [x1, y1], [x2, y2] ]
            * El array retornado de salida se entregará en la forma XY = [ [x1, x2], [y1, y2] ]
            */
            Segment.prototype.coordinatesXY = function () {
                if (!this.getP1() || !this.getP2()) {
                    return [];
                }
                //return [ [this.p1.getX(), this.p2.getX()], [this.p1.getY(), this.p2.getY()] ];
                var xs = [], ys = [];
                this.getChildren().forEach(function (p) {
                    var xy = p.coordinatesXY();
                    xs.push(xy[0][0]);
                    ys.push(xy[1][0]);
                }, this);
                return [xs, ys];
            };
            /** SIN PALABRAS: Toma el punto central */
            Segment.prototype.getCentralPoint = function () {
                return canvasShapes.mediumP1P2(this.getP1(), this.getP2());
            };
            /** Retorna un array de los puntos que contiene. */
            Segment.prototype.getPoints = function () {
                //return [this.p1, this.p2];
                return this.getChildren();
            };
            /** Desplaza el segmento (todos sus hijos) una cantidad de coordenadas x e y.
             * Actúa como si se desplazase el segmento al completo desde su eje de gravedad (Punto central) */
            Segment.prototype.move = function (x, y) {
                this.getChildren().forEach(function (p) {
                    p.move(x, y); //DESPLAZAR EL PUNTO SUMÁNDOLE ESTAS COORDENADAS
                }, this);
                this.update();
                return this;
            };
            /** Mueve el punto central del segmento (y todos sus hijos) a las coordenadas x e y. */
            Segment.prototype.moveTo = function (x, y) {
                var centralPoint = this.getCentralPoint();
                var newX = x - centralPoint.getX();
                var newY = y - centralPoint.getY();
                centralPoint = null; //NULLIFY
                this.getChildren().forEach(function (p) {
                    p.move(newX, newY); //DESPLAZAR EL PUNTO SUMÁNDOLE LA DIFERENCIA DE COORDENADAS
                }, this);
                this.update();
                return this;
            };
            /** Se borra del array de segmentos, y si el parámetro es verdadero, también borrará a sus hijos (puntos). */
            Segment.prototype.remove = function (spread) {
                var s1 = -1;
                for (var i = 0; i < this.getSuper().getChildren().Segments.length; i++) {
                    if (this.getSuper().getChildren().Segments[i].getId() === this.getId()) {
                        s1 = i;
                    }
                }
                if (s1 > -1) {
                    this.removeChildren(spread);
                    //if(this.getElement() && this.getElement().parentNode) { this.getElement().parentNode.removeChild(this.getElement()); }
                    this.getSuper().getChildren().Segments.splice(s1, 1);
                    this.setValido(false);
                    //this.getParent().sanitize();
                    //this.getParent().redraw();
                    this.getSuper().sanitize();
                    this.getSuper().draw();
                }
            };
            /** Borra todos los puntos que contiene, si el parámetro es verdadero. */
            Segment.prototype.removeChildren = function (spread) {
                if (spread && this.getP1() && this.getP2()) {
                    this.getP1().remove(spread);
                    this.getP2().remove(spread);
                    this.setP1(null);
                    this.setP2(null);
                }
            };
            /** Comprueba si otro punto es el mismo que este. Tiene que tener el mimo 'id' y las mismas coordenadas. */
            Segment.prototype.isEqual = function (segment) {
                return (this.isEqualCoordinates(segment) && (segment.getId() === this.getId()));
            };
            /** Comprueba si otro punto tiene las mismas coordenadas que este. */
            Segment.prototype.isEqualCoordinates = function (segment) {
                return ((segment.getP1().getX() === this.getP1().getX()) && (segment.getP1().getY() === this.getP1().getY()) &&
                    (segment.getP2().getX() === this.getP2().getX()) && (segment.getP2().getY() === this.getP2().getY()));
            };
            /** Representa (dibujandolo) el segmento (con sus puntos) en su contexto. */
            Segment.prototype.draw = function () {
                //alert("PolyArea.Point.draw()");
                //PUNTO
                if (this.getParent().getConf().drawSegments) {
                    var ctx = this.getContext();
                    if (!this.valido || !ctx) {
                        return null;
                    }
                    if (!this.getP1() || !this.getP2()) {
                        return false;
                    }
                    this.setName(this.getName() || (this.getP1().getName() + this.getP2().getName()));
                    this.getSuper().setPointsProportion();
                    //variables shortcuts
                    var p1X = this.getP1().getXComputed();
                    var p1Y = this.getP1().getYComputed();
                    var p2X = this.getP2().getXComputed();
                    var p2Y = this.getP2().getYComputed();
                    ctx.beginPath();
                    //SEGMENTO
                    ctx.fillStyle = "black";
                    var color = (this.selected) ? "orange" : this.color;
                    ctx.strokeStyle = color;
                    // Filled segment
                    ctx.lineWidth = this.size;
                    ctx.lineCap = this.type[0];
                    ctx.lineJoin = this.type[1];
                    ctx.beginPath();
                    ctx.moveTo(p1X, p1Y);
                    ctx.lineTo(p2X, p2Y);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill(); //llamando a fill se cierra la ruta
                    //if(this.showName){
                    if (this.showName) {
                        //TEXTO
                        var p = this.getCentralPoint();
                        ctx.font = "italic " + (this.size * 8 + 4) + 'pt Calibri';
                        ctx.lineWidth = 1;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        // stroke color
                        //ctx.strokeStyle = 'blue';
                        //ctx.strokeText(this.name, p.x, p.y);
                        ctx.fillStyle = "blue"; //this.color;
                        //ctx.fillText(this.name, p.x+(this.size*2), p.y+(this.size*2));
                        ctx.fillText(this.getName(), p.getXComputed(), p.getYComputed());
                        //ctx.fillText(this.name,  p.x+5, p.y+5, this.size*10);
                        ctx.strokeStyle = "blue";
                        var dim = ctx.measureText(this.getName());
                        //ctx.strokeRect(p.x-(this.size*4+4)/2, p.y-(this.size*4+4), dim.width, (this.size*4+4)+this.size);
                        ctx.strokeRect(p.getXComputed() - (this.size * 4 + 4) / 2, p.getYComputed() - (this.size * 4 + 4), dim.width, 0.5);
                    }
                    ctx.closePath();
                    /*if(this.showName){
                        //TEXTO
                        ctx.fillStyle="#333333";
                        ctx.font = "bold "+(this.size*5)+'pt "Times New Roman"';
                        ctx.lineWidth = 1;
                        ctx.textAlign="center";
                        ctx.textBaseline="middle";
                        ctx.fillText(this.getName(), p.getXComputed()+5, p.getYComputed()+5);
                    }*/
                    //DIBUJA HIJOS
                    if (this.drawPoints && this.drawChildren) {
                        this.getP1().draw();
                        this.getP2().draw();
                    }
                    return this;
                }
            };
            return Segment;
        })();
        PolyArea.Segment = Segment;
    })(PolyArea = canvasShapes.PolyArea || (canvasShapes.PolyArea = {}));
})(canvasShapes || (canvasShapes = {}));
// END MODULE: SEGMENT 
