/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.js' (NAMESPACE) Espacio de nombres de la librería de dibujado "PolyArea"
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
//tsc --out canvasShapes2.js canvasShapes.ts canvasShapes.PolyArea.ts canvasShapes.Point.ts
//http://www.typescriptlang.org/Handbook#classes-privatepublic-modifiers
//http://www.typescriptlang.org/Playground/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.js' (NAMESPACE) Espacio de nombres de la librería de dibujado "PolyArea"
*----------------------------------------------------------------------------------------------------*/
//
// BEGIN MODULE: CANVAS-SHAPES MAIN
//
/** Módulo principal de la libería PolyArea. Crea el objeto sobre el que manejar todo el PolyArea.
 * Con esta librería pueden crearse objetos PolyArea que viene a ser un conglomerado de figuras geométricas agrupadas
 * como Puntos, Segmentos y Polígonos. Aunque pueden tratarse de forma individual, está pensada para un tratamiento
 * jerárquico de las figuras: "Polígonos PADRES de Segmentos y estos PADRES de Puntos".
 * Su representación gráfica está basada en un eje de coordenadas 'ficticio' dibujado sobre un 'canvas' con implementación
 * de una serie de eventos que nos permiten rediseñar las figuras una vez mostradas, así, de forma dinámica, podemos variar
 * la posición de los puntos en el eje con el cursor del ratón.
 * Posee numerosos métodos de utilidad y propiedades de configuración para mostrar las figuras y realizar cálculos
 * sobre ellas (perímetros, áreas, representación de nombres, colores, relleno, ...). El constructor admite un objeto de
 * configuración con parámetros tales como el 'id' del elemento 'canvas' (de esta forma puede utilizarse uno préviamente
 * creado), proporciones, inversiones, ejes, rejillas, ... (Una lista completa en la ayuda de esta librería).
 * DESTACABLE:
 *  - Cross-Browser
 *  - Íntegramente POO, posibilidad de utilización SINGLETON.
 *  - Internacionalizada, con posibilidad de añadido de más idiomas
 *  - Maleable y áltamente configurable.
 *  - Representación y manejo dinámico de figuras geométricas.
 *  - Cálculos de magnitudes principales: Perímetros y Áreas.
 *  - Posibilidad de empleo 'figura a figura' o mediante un 'jerarquizado de figuras'.
 */
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    var _TAG = "PolyArea";
    //PATRÓN SINGLETON
    /** Variable que retiene el módulo PolyArea como patrón Singleton */
    var _instance = null;
    var _countInstances = 0;
    function getInstance(conf) {
        if (conf === void 0) { conf = {}; }
        var poly = null;
        //if(! isPolyAreaUsed()) {
        if (_instance) {
            poly = _instance;
            _countInstances++;
        }
        else {
            poly = new canvasShapes.PolyArea(conf);
            _instance = poly;
        }
        return poly;
    }
    canvasShapes.getInstance = getInstance;
    /** Método Setter ESTÁTICO para establecer el objeto estático '_instance'. */
    function setInstance(obj) {
        if (obj instanceof canvasShapes.PolyArea) {
            _instance = obj;
            _countInstances = 1;
        }
    }
    canvasShapes.setInstance = setInstance;
    function hasInstance() {
        return (_instance instanceof canvasShapes.PolyArea);
    }
    canvasShapes.hasInstance = hasInstance;
    function destroyInstance() {
        _instance = null;
        _countInstances = 0;
    }
    canvasShapes.destroyInstance = destroyInstance;
    function getCountInstances() {
        return _countInstances;
    }
    canvasShapes.getCountInstances = getCountInstances;
    //API PUBLICA
    /** Construye y Renderiza un nuevo objeto PolyArea construido con las opciones pasadas, y lo retorna.
      * @return canvasShapes.PolyArea */
    function render(config) {
        return new canvasShapes.PolyArea(config);
    }
    canvasShapes.render = render;
    //OTROS MÓDULOS
    canvasShapes.Options = null;
    canvasShapes.objectLanguage = null;
    canvasShapes.objects = null;
    canvasShapes.shapes = null;
    canvasShapes.UI = null;
    canvasShapes.util = null;
    canvasShapes.events = null;
    canvasShapes.draw = null;
    canvasShapes.PolyArea = null;
})(canvasShapes || (canvasShapes = {}));
// END MODULE: CANVAS-SHAPES MAIN 
