/// <reference path="canvasShapes.PolyArea.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.PolyArea.Point.js' (OBJECT-CLASS) Objeto de dibujado Punto en el canvas.
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.PolyArea.Point.js' (OBJECT-CLASS) Objeto de dibujado Punto en el canvas.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: POINT
var canvasShapes;
(function (canvasShapes) {
    var PolyArea;
    (function (PolyArea) {
        "use-strict";
        //CLASE DERIVADA INTERNA PRIVADA POINT
        /**
          * OBJETO PUNTO CON PROPIEDADES Y METODO DE DIBUJADO EN EL CONTEXTO DE DIBUJO PASADO.
          * EXTIENDE DE 'PolyArea' para tener acceso a variables y objetos GETTER básicos (this, canvas, context, ...)
          * <p>Al constructor se le puede pasar el contexto de dibujo (canvasContext), de otra forma
          * se intentará utilizar el contexto global 'ctx', aún así si se detecta que el contexto
          * es nulo los métodos de dibujo no representaran nada en el canvas (evidentemente), aunque
          * tampoco presentarán errores, símplemente su método 'draw()' regresará 'FALSE'.</p>
          * <p>Permite representar un punto (redondo, cuadrado, con halo, ...) en las coordenadas
          * indicadas en 'x' e 'y', de color y tamaño variable según los parámetros establecidos.</p>
          * PARÁMETROS / PROPIEDADES:
          * <ul>
          *   <li>'x' e 'y' NUMBER representan las coordenadas en el canvas.</li>
          *   <li>size NUMBER el tamaño del punto (en pixels)</li>
          *   <li>proportionX NUMBER la proporcion de las coordenadas X de este punto. Al dibujarlo se tendrá en cuenta, resultando un
          *       valor de la multiplicación de X por esta proporcion; AUNQUE EL VALOR ORIGINAL DE 'X' NO VARÍA. (por defecto 1)</li>
          *   <li>proportionY NUMBER la proporcion de las coordenadas Y de este punto. Al dibujarlo se tendrá en cuenta, resultando un
          *       valor de la multiplicación de Y por esta proporcion; AUNQUE EL VALOR ORIGINAL DE 'Y' NO VARÍA. (por defecto 1)</li>
          *   <li>invertX BOOLEAN invertir o no las coordenadas X de este punto. Al dibujarlo se tendrá en cuenta, resultando un
          *       valor invertido de X (cambiado de signo); AUNQUE EL VALOR ORIGINAL DE 'X' NO VARÍA. (por defecto 'false')</li>
          *   <li>invertY BOOLEAN invertir o no las coordenadas Y de este punto. Al dibujarlo se tendrá en cuenta, resultando un
          *       valor invertido de Y (cambiado de signo); AUNQUE EL VALOR ORIGINAL DE 'Y' NO VARÍA. (por defecto 'false')</li>
          *   <li>color ARRAY contiene un array con los colores del punto interior y su círculo exterior: color=[innerColor, outerColor]</li>
          *   <li>type STRING una de las siguientes cadenas: "round", "roundBox", "quad", "quadBox"</li>
          *   <li>ctx CONTEXT el contexto pasado al constructor. (o en su defecto el global)</li>
          * </ul>
          * MÉTODOS:
          * <ul>
          *   <li>clone()
          *        Clona el elemento sin referencias. Retorna una copia exacta de este Punto, pero es otro objeto.</li>
          *   <li>setProportion( proportion )
          *        Un valor FLOAT indicando la proporción tanto de las coordenadas X como Y. Establece el mismo valor
          *        para 'proportionX' y 'proportionY'; AUNQUE EL VALOR ORIGINAL DE 'X' e 'Y' NO VARÍA.</li>
          *   <li>setInvert( invert )
          *        Un valor BOOLEAN indicando si invertir (cambiar el signo) el valor tanto de las coordenadas X como Y.
          *        Establece el mismo valor para 'invertX' y 'invertY'; AUNQUE EL VALOR ORIGINAL DE 'X' e 'Y' NO VARÍA.</li>
          *   <li>draw()
          *        Se encarga de dibujar el punto en el canvas con sus parámetros establecidos.
          *        También se tiene en cuenta la proporcion e inversión.
          *        Retorna 'false' si no se detecta un contexto, de otro modo retorna el propio objeto 'this' para
          *        permitir 'chaining'.</li>
          * </ul>
          */
        var Point = (function () {
            function Point($parent, $super) {
                //super($super.getConf());
                //if($super instanceof canvasShapes.PolyArea) { }
                if (!$super) {
                    $super = $parent || canvasShapes.getInstance();
                }
                var _TAG = "Point";
                var _name = canvasShapes.ABC.next(); //SOLICITUD ESTÁTICA DE NUEVA LETRA
                var _id = (_TAG + "[" + _name + "]-" + (new Date().getTime()) + "-" + Math.floor((Math.random() * 100) + 1));
                var _children = []; //SIN HIJOS
                /** Se refiere al objeto de orden superior 'PolyArea' al que pertenece. */
                var _super = $super || $parent; //= canvasShapes.getInstance();
                /** Se refiere al objeto 'shape' padre al que pertenece. No tiene porqué coincidir con '_super'. */
                var _parent = $parent || $super; //= canvasShapes.getInstance();
                if ((_super === null) && (_parent === null)) {
                    return null;
                }
                var _x = 0;
                var _y = 0;
                var _info = "";
                /////
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
                        this.update();
                    }
                };
                this.getChildren = function () { return _children; };
                this.setChildren = function (children) {
                    /*if(children) {
                      this.removeChildren(true);
                      _children=children;
                      this.update();
                    }*/
                };
                /** Se refiere al objeto de orden superior 'PolyArea' al que pertenece. */
                this.getSuper = function () { return _super; };
                /** Se refiere al objeto 'shape' padre al que pertenece. No tiene porqué coincidir con '_super'. */
                this.getParent = function () { return _parent; };
                /** Al establecer el padre es cuando se le añade como hijo desde aquí. */
                this.setParent = function (parent) {
                    _parent = parent;
                    _parent.addPoint(this);
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
                    _info = _name +
                        " (" + canvasShapes.toDecimals(_x, _parent.decimals) +
                        ", " + canvasShapes.toDecimals(_y, _parent.decimals) + ") :: " +
                        "{" + INFO.join(",") + "}";
                };
                this.getX = function () { return _x; };
                this.setX = function (x) {
                    _x = x;
                    this.buildInfo();
                };
                this.getY = function () { return _y; };
                this.setY = function (y) {
                    _y = y;
                    this.buildInfo();
                };
                this.update = function () {
                    this.sanitizeChildren();
                    //this.refreshHtml();
                    this.buildInfo();
                };
                /** Método que depura y sanitiza los hijos permitiendo únicamente los válidos. */
                this.sanitizeChildren = function () {
                    /*var children=[];
                    for(var i=0; i<_children.length; i++){
                      var p=_children[i];
                      if(p && p.valido) { children.push(p); }
                    }
                    _children = children;
                    return children;
                    */
                    return [];
                };
                ///PROPIEDADES PUBLICAS
                this.size = 2;
                this.showName = _parent.showNames;
                this.proportionX = _parent.proportionX;
                this.proportionY = _parent.proportionY;
                this.invertX = _parent.invertX;
                this.invertY = _parent.invertY;
                this.border = "navy";
                this.color = ["black", "red"];
                this.drawChildren = _parent.getConf().pointsDrawChildren; //true
                this.type = "roundBox";
                this.ctx = _parent.getContext(); //this.this._super.getContext();
                this.fill = _super.fill;
                this.gradient = _parent.gradient;
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
            Point.prototype.clone = function () {
                var p = new canvasShapes.PolyArea.Point(this.getSuper()); //this.this.this.getSuper().Polygon();
                p.setX(this.getX());
                p.setY(this.getY());
                p.setName(this.getName());
                p.showName = this.showName;
                p.size = this.size;
                p.setProportionX(this.proportionX);
                p.setProportionY(this.proportionY);
                p.setInvertX(this.invertX);
                p.setInvertY(this.invertY);
                p.border = this.border;
                p.color = this.color;
                p.drawChildren = this.drawChildren; //pol.drawSegments=this.drawSegments;
                p.type = this.type;
                p.ctx = this.ctx;
                p.fill = this.fill;
                p.gradient = this.gradient;
                p.setSelected(this.selected);
                p.setEnabled(this.enabled);
                p.setValido(this.valido);
                //p.setParent(this.getParent());
                return p;
            };
            //OWN METHODS
            Point.prototype.getXComputed = function () {
                /*//X REAL
                var x: number = this.getX();
                //PROPORTION
                x *= this.getSuper().proportionX;
                //INVERT
                x *= (this.invertX ? -1 : 1);
                //TRANSLATE
                var canvasW: number = this.getCanvas().width; //pixels
                if(this.getSuper().coordinatesCentred){
                    x += canvasW/2;
                }*/
                return canvasShapes.toXComputed(this.getSuper(), this.getX());
            };
            Point.prototype.getYComputed = function () {
                /*//Y REAL
                var y: number = this.getY();
                //PROPORTION
                y *= this.getSuper().proportionY;
                //INVERT
                y *= (this.invertY ? -1 : 1);
                //TRANSLATE
                var canvasH: number = this.getCanvas().height; //pixels
                if(this.getSuper().coordinatesCentred){
                    y += canvasH/2;
                }*/
                return canvasShapes.toYComputed(this.getSuper(), this.getY());
            };
            /** Retorna un array de coordenadas del punto que interesa que detecte para mostrar la informacion (TOOLTIP) */
            Point.prototype.getTooltipXY = function () {
                return [this.getX(), this.getY()];
            };
            //PUBLIC METHODS
            Point.prototype.setProportion = function (proportion) {
                this.proportionX = proportion;
                this.proportionY = proportion;
            };
            Point.prototype.setInvert = function (invert) {
                this.invertX = invert;
                this.invertY = invert;
            };
            Point.prototype.area = function () { return 0; };
            Point.prototype.getArea = function () { return this.area(); };
            Point.prototype.perimeter = function () { return 0; };
            Point.prototype.getPerimeter = function () { return this.perimeter(); };
            /**
            * Retorna un array de pares de coordenadas X e Y de este punto.
            * El array retornado de salida se entregará en la forma XY = [[x, y]]
            */
            Point.prototype.coordinates = function (withProportion, withInvert) {
                return [[canvasShapes.toDecimals(this.getX(), this.getSuper().decimals),
                        canvasShapes.toDecimals(this.getY(), this.getSuper().decimals)]];
            };
            /** Retorna un array de coordenadas X e Y de este punto separadas.
            * El array retornado de salida se entregará en la forma XY = [[x], [y]] */
            Point.prototype.coordinatesXY = function () {
                return [[canvasShapes.toDecimals(this.getX(), this.getSuper().decimals)],
                    [canvasShapes.toDecimals(this.getY(), this.getSuper().decimals)]];
            };
            /** Desplaza el punto una cantidad de coordenadas x e y. */
            Point.prototype.move = function (x, y) {
                //DESPLAZAR EL PUNTO SUMÁNDOLE ESTAS COORDENADAS
                this.moveTo((this.getX() + x), (this.getY() + y));
                return this;
            };
            /** Desplaza el punto a las coordenadas x e y. */
            Point.prototype.moveTo = function (x, y) {
                //DESPLAZAR EL PUNTO A ESTAS COORDENADAS
                this.setX(x);
                this.setY(y);
                return this;
            };
            /** Se borra del array de puntos, y si el parámetro es verdadero, también borrará a sus hijos (NO TIENE). */
            Point.prototype.remove = function (spread) {
                var p1 = -1;
                for (var i = 0; i < this.getSuper().getChildren().Points.length; i++) {
                    if (this.getSuper().getChildren().Points[i].getId() === this.getId()) {
                        p1 = i;
                    }
                }
                if (p1 > -1) {
                    this.removeChildren(spread);
                    //if(this.getElement() && this.getElement().parentNode) { this.getElement().parentNode.removeChild(this.getElement()); }
                    this.getSuper().getChildren().Points.splice(p1, 1);
                    this.setValido(false);
                    //this.getParent().sanitize();
                    //this.getParent().redraw();
                    this.getSuper().sanitize();
                    this.getSuper().draw();
                }
            };
            /** Borra todos los hijos (NO TIENE) */
            Point.prototype.removeChildren = function (spread) {
            };
            /** Comprueba si otro punto es el mismo que este. Tiene que tener el mimo 'id' y las mismas coordenadas. */
            Point.prototype.isEqual = function (point) {
                return (this.isEqualCoordinates(point) && (point.getId() === this.getId()));
            };
            /** Comprueba si otro punto tiene las mismas coordenadas que este. */
            Point.prototype.isEqualCoordinates = function (point) {
                return ((point.getY() === this.getY()) && (point.getX() === this.getX()));
            };
            /** Representa (dibujandolo) el punto en su contexto. */
            Point.prototype.draw = function () {
                //alert("PolyArea.Point.draw()");
                if (this.getParent().getConf().drawPoints) {
                    //PUNTO
                    var ctx = this.getContext();
                    if (!this.valido || !ctx) {
                        return null;
                    }
                    this.getSuper().setPointsProportion();
                    var x = this.getXComputed();
                    var y = this.getYComputed();
                    //alert("REAL: x="+this.getX()+", y="+this.getY()+"\nCOMPUTED: x="+x+", y="+y);
                    //ctx.save();
                    //this.getSuper().setCentred(true);
                    var color1 = (this.selected) ? "orange" : this.color[0];
                    var color2 = (this.selected) ? "red" : this.color[1];
                    ctx.fillStyle = color1; //innerColor
                    // Filled circle
                    ctx.beginPath();
                    switch (this.type) {
                        case "round":
                        case "roundBox":
                            ctx.arc(x, y, this.size, 0, Math.PI * 2, true); // Outer circle
                            break;
                        case "quad":
                        case "quadBox":
                            ctx.fillRect(x, y, this.size, this.size);
                            break;
                        default:
                    }
                    ctx.fill(); //llamando a fill se cierra la ruta
                    ctx.strokeStyle = color2; //outerColor
                    // Stroked circle
                    ctx.beginPath();
                    switch (this.type) {
                        case "roundBox":
                            ctx.arc(x, y, this.size * 2, 0, Math.PI * 2, true); // Outer circle
                            break;
                        case "quadBox":
                            ctx.fillRect(x, y, this.size * 2, this.size * 2);
                            break;
                        default:
                    }
                    ctx.closePath();
                    ctx.stroke(); //antes de stroke es necesario cerrar
                    if (this.showName) {
                        //TEXTO
                        ctx.fillStyle = "#333333";
                        ctx.font = "bold " + (this.size * 5) + 'pt "Times New Roman"';
                        ctx.lineWidth = 1;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(this.getName(), x + 5, y + 5);
                    }
                    //ctx.restore();
                    //DIBUJA HIJOS
                    if (this.drawChildren) {
                    }
                    return this;
                }
            };
            return Point;
        })();
        PolyArea.Point = Point;
    })(PolyArea = canvasShapes.PolyArea || (canvasShapes.PolyArea = {}));
})(canvasShapes || (canvasShapes = {}));
//END MODULE: POINT 
