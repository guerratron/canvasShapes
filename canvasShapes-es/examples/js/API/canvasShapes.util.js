/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.util.js' (METHODS) Otros métodos útiles para la librería, algunos para compatibilidad con el motor Javascript.
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.util.js' (METHODS) Otros métodos útiles para la librería, algunos para compatibilidad con el motor Javascript.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: UTIL
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    /** FUNCIÓN ESTÁTICA:: Comprobar si ya se ha creado algún objeto de esta clase, bien sea diréctamente a través del constructor o
     * bien a través del Patrón singleton (PolyArea.getInstance(conf)). */
    function isPolyAreaUsed() { return ((typeof (canvasShapes.PolyArea.count)).toUpperCase() === "NUMBER"); }
    canvasShapes.isPolyAreaUsed = isPolyAreaUsed;
    /**
    * FUNCIÓN ESTÁTICA:: Esta función solo debe utilizarse antes de crear ningún objeto 'PolyArea'.
    * Comprueba si el sistema se encuentra preparado para trabajar con estos tipos de objetos. Utiliza en bucle el Patrón singleton.
    * Calcula un total numérico de forma cíclica (el número de veces indicado) comprobando las instancias tomadas y sus contadores internos,
    * en caso de algún desajuste se irían acumulando pequeños errores de cálculo y fracasaría la comprobación.
    * Al final realiza una comprobación de este total con el resultado que debería obtenerse [total == cont*(cont+1)]
    * Aunque la función se encuentra optimizada, hay que tener en cuenta que debe instanciar el número de veces pasado como
    * parámetro un objeto 'PolyArea', esto consume recursos, así que intentar no extralimitar el contador pasado; por ejemplo
    * más de 100 000 sería excesivo para comprobar que realmente ESTÁ FUNCIONANDO OK.
    * @return Retorna TRUE o FALSE. También puede retornar 0 si detecta que existen objetos previamente creados. */
    function isAllOk(cont) {
        /* COMPROBACION DEL FUNCIONAMIENTO DEL PATRON SINGLETON. La primera vez lo Crea, las demás lo Instancia. */
        cont = cont || 5;
        //LIMITA EL CONTADOR
        cont = (cont > 100000) ? 100000 : ((cont < 1) ? 1 : cont);
        var utilizado = canvasShapes.isPolyAreaUsed();
        //EVITA QUE SE DESTRUYAN OBJETOS PREVIAMENTE CREADOS
        if (utilizado) {
            alert("ADVERTENCIA:: ESTE MÉTODO ÚNICAMENTE PUEDE INVOCARSE SI NO EXISTE NINGÚN OBJETO 'PolyArea' CREADO. DE OTRA FORMA LO ELIMINARÍA !!");
            return false;
        }
        try {
            var creado = canvasShapes.PolyArea.count;
            var instanciado = canvasShapes.getCountInstances();
            var total = (utilizado ? (1 + creado + instanciado) : 0); //0
            //alert("- UTILIZADO: "+utilizado+"\r\n · CREADO: "+creado+" veces\r\n · INSTANCIADO: "+instanciado+" veces\r\n · TOTAL: "+total);
            for (var i = 0; i < cont; i++) {
                var poli = canvasShapes.getInstance();
                utilizado = canvasShapes.isPolyAreaUsed();
                creado = canvasShapes.PolyArea.count;
                instanciado = canvasShapes.getCountInstances();
                total += (utilizado ? (1 + creado + instanciado) : 0) + i; //total +=1+1+i //2, 5, 9, 14, 20
            }
            //alert("- UTILIZADO: "+utilizado+"\r\n · CREADO: "+creado+" vez\r\n · INSTANCIADO: "+instanciado+" veces\r\n · TOTAL: "+total);
            canvasShapes.destroyInstance();
            return (total === (cont * (cont + 1))); //SALIDA NORMAL [total == cont*(cont+1)]
        }
        catch (e) {
            return false;
        }
    }
    canvasShapes.isAllOk = isAllOk;
    /** Retorna un número 'n' flotante redondeado al número de decimales indicado en 'decimals'.
    * Método para formatear números en coma flotante hasta X decimales */
    function toDecimals(floatNumber, decimals) {
        return parseFloat((Math.round(floatNumber * Math.pow(10, decimals)) / Math.pow(10, decimals)) + "");
    }
    canvasShapes.toDecimals = toDecimals;
    /** Función que establece en el link de descarga la imágen del canvas en base64 */
    function downCanvasImage(canvasId) {
        try {
            var canvas = document.getElementById(canvasId);
            (canvas.parentNode).getElementsByTagName("a")[0].setAttribute("href", canvas.toDataURL());
        }
        catch (e) {
            alert("No se encuentra el canvas con Id: " + canvasId);
        }
    }
    canvasShapes.downCanvasImage = downCanvasImage;
    /** Calcula cuantos pixels corresponden a cada fracción del canvas. (calculado en cuanto su ancho) */
    function calcFractionValor(canvas, fraccion) {
        return canvas.width / fraccion;
    }
    canvasShapes.calcFractionValor = calcFractionValor;
    /** Calcula el valor 'COMPUTADO' (FICTICIO) para las 'x', de utilidad para el dibujo sobre la superficie del canvas.
      * WARNING:: Este valor no se corresponde con el valor real para operaciones como áreas, distancias, perímetros, ... */
    function toXComputed(self, x) {
        //VALOR REAL = x
        //PROPORTION
        x *= self.proportionX;
        //INVERT
        x *= (self.invertX ? -1 : 1);
        //TRANSLATE
        var canvasW = self.getCanvas().width; //pixels
        if (self.coordinatesCentred) {
            x += canvasW / 2;
        }
        //VALOR COMPUTADO (FICTICIO)
        return x;
    }
    canvasShapes.toXComputed = toXComputed;
    /** Calcula el valor 'COMPUTADO' (FICTICIO) para las 'y', de utilidad para el dibujo sobre la superficie del canvas.
      * WARNING:: Este valor no se corresponde con el valor real para operaciones como áreas, distancias, perímetros, ... */
    function toYComputed(self, y) {
        //VALOR REAL = y
        //PROPORTION
        y *= self.proportionY;
        //INVERT
        y *= (self.invertY ? -1 : 1);
        //TRANSLATE
        var canvasH = self.getCanvas().height; //pixels
        if (self.coordinatesCentred) {
            y += canvasH / 2;
        }
        //VALOR COMPUTADO (FICTICIO)
        return y;
    }
    canvasShapes.toYComputed = toYComputed;
    /** Calcula el valor 'REAL' para las 'x' desde un valor computado.
     *  El valor retornado es el valor real para operaciones como áreas, distancias, perímetros, ... */
    function fromXComputed(self, xComputed) {
        //VALOR COMPUTADO = xComputed
        //UN-TRANSLATE
        var canvasW = self.getCanvas().width; //pixels
        if (self.coordinatesCentred) {
            xComputed -= canvasW / 2;
        }
        //INVERT
        xComputed *= (self.invertX ? -1 : 1);
        //PROPORTION
        xComputed /= self.proportionX;
        //VALOR REAL
        return xComputed;
    }
    canvasShapes.fromXComputed = fromXComputed;
    /** Calcula el valor 'REAL' para las 'y' desde un valor computado.
     *  El valor retornado es el valor real para operaciones como áreas, distancias, perímetros, ... */
    function fromYComputed(self, yComputed) {
        //VALOR COMPUTADO = xComputed
        //UN-TRANSLATE
        var canvasH = self.getCanvas().height; //pixels
        if (self.coordinatesCentred) {
            yComputed -= canvasH / 2;
        }
        //INVERT
        yComputed *= (self.invertY ? -1 : 1);
        //PROPORTION
        yComputed /= self.proportionY;
        //VALOR REAL
        return yComputed;
    }
    canvasShapes.fromYComputed = fromYComputed;
    //FUNCIONES DE COMPATIBILIDAD CROSS-BROWSER PARA OBTENER X e Y DE LOS EVENTOS
    /** Obtiene un array con los valores de X e Y obtenido del objeto 'evento' pasado como parámetro.
      * Es Cross-Browser y representa las coordenadas donde se encuentra situado el cursor del ratón. */
    function getEventXY(event) {
        var x = 0, y = 0;
        /*
        if (event.page) {
            x = (event.page.x) - canvas.offsetLeft; //($("canvas1").offsetLeft);
            y = (event.page.y) - canvas.offsetTop; //($("canvas1").offsetTop);
        } else if (event.layerX) {
            x = (event.layerX) - canvas.offsetLeft; //($("canvas1").offsetLeft);
            y = (event.layerY) - canvas.offsetTop; //($("canvas1").offsetTop);
        }
         */
        /*
          if(event.page){
            realX=event.page.x;
            realY=event.page.y;
            x = (event.page.x) - canvas.offsetLeft;//($("canvas1").offsetLeft);
            y = (event.page.y) - canvas.offsetTop;//($("canvas1").offsetTop);
          }else if(event.layerX){
            realX=event.layerX;
            realY=event.layerY;
            x = (event.layerX) - canvas.offsetLeft;//($("canvas1").offsetLeft);
            y = (event.layerY) - canvas.offsetTop;//($("canvas1").offsetTop);
          }
        */
        return [x, y];
        //return canvasShapes.getEventPageXY(event);
        //return canvasShapes.getEventOffsetXY(event, true);
    }
    canvasShapes.getEventXY = getEventXY;
    /** (pageX, pageY): W3C: " Mouse position relative to the html document "
      * Obtiene un array con los valores de X e Y, obtenido del objeto 'evento' pasado como parámetro.
      * Es Cross-Browser y representa las coordenadas donde se encuentra situado el cursor del ratón en relación al documento HTML. */
    function getEventPageXY(e) {
        e = e || window.event;
        var pageX = e.pageX;
        var pageY = e.pageY;
        if (pageX === undefined) {
            pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return [pageX, pageY];
    }
    canvasShapes.getEventPageXY = getEventPageXY;
    /** (offsetX, offsetY): W3C: " Mouse position relative to the target element. "
      * Obtiene un array con los valores de X e Y, obtenido del objeto 'evento' pasado como parámetro.
      * Es Cross-Browser y representa las coordenadas donde se encuentra situado el cursor del ratón en
      * relación al elemento referenciado por el evento. (El 'target' del evento). */
    function getEventOffsetXY(e, withBorders) {
        e = e || window.event;
        var target = e.target || e.srcElement, style = target.currentStyle || window.getComputedStyle(target, null), borderLeftWidth = 0, borderTopWidth = 0, rect = target.getBoundingClientRect();
        if (withBorders) {
            borderLeftWidth = parseInt(style['borderLeftWidth'], 10);
            borderTopWidth = parseInt(style['borderTopWidth'], 10);
        }
        var offsetX = e.clientX - borderLeftWidth - rect.left, offsetY = e.clientY - borderTopWidth - rect.top;
        return [offsetX, offsetY];
    }
    canvasShapes.getEventOffsetXY = getEventOffsetXY;
    //OTROS MÉTODOS DE UTILIDAD
    /** TRUCO "polyfill" (aka "shim")
    * Alias del moderno 'Object.create(...)'.
    * Compatibilidad con motores Javascript antiguos donde no existía la posibilidad de Object.create(..) */
    function crearObjeto(proto) {
        function Ctor() { }
        Ctor.prototype = proto;
        return new Ctor();
    }
    canvasShapes.crearObjeto = crearObjeto;
    function __extends(d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p)) {
                d[p] = b[p];
            }
        ;
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    }
    canvasShapes.__extends = __extends;
    //-----------------------------------------
    //FUNCTIONES EXTERNAS Y NO-ATADAS AL OBJETO
    //-----------------------------------------
    /** Emula el comportamiento de Array.indexOf(..) en navegadores antiguos que no lo soporten (lease IE<8) */
    if (!Array.indexOf) {
        Array.prototype.indexOf = function (obj) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
    }
    /** Emula el comportamiento de Array.contains(..) en navegadores antiguos que no lo soporten (lease IE<8) */
    if (!Array.contains) {
        Array.prototype.contains = function (arr, x) {
            return arr.filter(function (elem) { return elem === x; }).length > 0;
        };
    }
    /** Suprime valores duplicados en un array.
      * FROM: http://www.etnassoft.com/2011/06/24/array-unique-eliminar-valores-duplicados-de-un-array-en-javascript/
      * Esto convertido a Cristiano sería:
      * function(elemento_a_mirar_si_añado_al_array,indice_del_elemeno_que_estoy_mirando,array_con_los_elementos_ya_añadidos){
      *     return array_con_los_elementos_ya_añadidos.indexOf(
      *         elemento_a_mirar_si_añado_al_array,
      *         indice_del_elemeno_que_estoy_mirando+1
      *     )<0;
      * }
      */
    if (!Array.unique) {
        Array.prototype.unique = function (a) {
            return function () { return this.filter(a); };
        }(function (a, b, c) {
            return c.indexOf(a, b + 1) < 0;
        });
    }
})(canvasShapes || (canvasShapes = {}));
// END MODULE: UTIL 
