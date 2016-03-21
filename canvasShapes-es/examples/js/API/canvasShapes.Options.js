/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.Options.js' (OBJECT) Construcción de las Opciones.
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.Options.js' (OBJECT) Construcción de las Opciones.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: OPTIONS
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    /** Modulo PolyAreaOptions para construir las opciones que necesita el objeto PolyArea, donde en realidad, la única opción imprescindible
    * es el atributo 'id' (string).
    * Contiene un interfaz interno 'OptionsBase' (el esqueleto) que define como debe ser el objeto 'options' y una clase constructora
    * 'Options' de este tipo de objetos, con métodos de filtrado y construcción de las opciones.
    * Pero por rapidez, aparte de la clase anterior, se ha incluido también el método 'buildOptions(options?: OptionsBase)' al que
    * acceder a través del nameSpace.
    * EJEMPLO:
    * var opts=PolyAreaOptions.buildOptions({id:"21-ES", language:"Esperanto"});
    * for(var p in opts){
    *   alert(p +" = "+ opts[p]);
    * }
    * */
    var Options = (function () {
        /** Constructor de la Clase Options para construir objetos de opciones para la clase PolyArea. */
        function Options(options) {
            /** Sello de las opciones */
            var _TAG = "Options";
            //METODOS PRIVADOS
            /** Método interno para uso exclusivo del constructor, Retorna un objeto Options básico, reseteado. */
            var _initialize = function () {
                //Math.floor((Math.random() * 100) + 1)=ENTRE 1 Y 100 //Date.getMilliseconds(), Date.getTime()
                var t = new Date().getTime();
                var aleat = Math.floor((Math.random() * 100) + 1);
                return {
                    /** Sello identificador de tiempo (Formato Unix TimeStamp). */
                    timestamp: t,
                    /** Id del elemento generalmente contenedor de toda la interfaz gráfica para PolyArea.
                    * También puede ser el ID de un canvas existente para poder embeberlo y manejarlo. */
                    id: ("PolyArea-" + t + "-" + aleat),
                    /** Las configuraciones originales pasadas en la construcción, sin rellenar los omitidos. */
                    original: null,
                    /** Será el contexto del canvas. No es necesario pasarlo, lo detectará automáticamente. */
                    ctx: null,
                    /** Lenguage o idioma de la interfaz gráfica. Por defecto Inglés. */
                    language: "en-GB",
                    /** Objeto de dibujado Canvas. Normálmente se generará automáticamente. */
                    canvas: null,
                    /** Viene a ser el contenedor de toda la interfaz gráfica PolyArea. */
                    container: null,
                    //OPTIONS UI
                    /** Indica si mostrar el título en la UI */
                    showTitle: true,
                    /** Indica si mostrar el subtítulo en la UI */
                    showSubTitle: true,
                    /** Indica si mostrar los créditos en la UI.
                    * Se agradecería que se permitan visualizar los créditos de alguna forma a modo de reconocimiento.
                    * ¡ Qué menos, diría Yo ! */
                    showCredits: true,
                    //BLOQUES
                    /** Muestra toda la interfaz gráfica con botonera de menú, campos de acciones e información útil. */
                    showBody: true,
                    /** Zona superior de la UI. Contiene entre otros el título y subtítulo */
                    polyAreaHeader: true,
                    /** Zona inferior de la UI. Contiene básicamente los créditos */
                    polyAreaFooter: true,
                    /** Mostrar el título del Canvas */
                    canvasDataTitle: false,
                    /** Mostrar la zona informativa de la UI */
                    canvasDataInfo: true,
                    /** Mostrar la zona de coordenadas gráficas en la UI, para introdución de datos. */
                    canvasDataIntro: true,
                    /** Mostrar la zona de opciones de la UI */
                    canvasDataOptions: true,
                    /** Mostrar la zona de los botones principales de la UI */
                    canvasDataButtons: true,
                    //BUTTONS
                    /** Mostrar los botones principales de la UI */
                    showUIButtons: true,
                    /** Mostrar el botón de Idioma de la UI. Muestra la bandera identificativa del idioma,
                    * de momento no tiene acciones asociadas. */
                    btnCanvasFlag: true,
                    /** Mostrar el botón de Refresco o Redibujado de la UI para el canvas. */
                    btnCanvasRedraw: true,
                    /** Mostrar el botón del Zoom de la UI */
                    btnCanvasZoom: true,
                    /** Mostrar el botón de opciones (Mostrar las Opciones) de la UI */
                    btnCanvasOptions: true,
                    /** Permite la descarga del canvas como imágen */
                    linkDownCanvasImage: true,
                    /** Mostrar el botón de descarga como imágen del canvas en la UI */
                    btnDownCanvasImage: true,
                    /** Mostrar el botón de limpiar la superficie del canvas (SIN PÉRDIDA DE DATOS) en la UI */
                    btnCanvasClean: true,
                    /** Mostrar el botón de resetear (CON PÉRDIDA DE DATOS) el canvas en la UI */
                    btnCanvasReset: true,
                    //OTHERS
                    /** Esta opción permite limpiar todo el canvas mediante el botón de 'Reset',
                    * aún si no existe ninguna figura seleccionada. */
                    cleanAllIfEmpty: false,
                    //CANVAS OPTIONS
                    /** Rejillas */
                    grid: true,
                    /** Ejes */
                    axes: true,
                    /** Fracción de cada cuadrícula de la Rejilla. Si no se desea Rejilla dejar en 0 */
                    fractionGrid: 0.1,
                    /** Ancho inicial del canvas (en pixels). Por defecto 300 px */
                    canvasWidth: 300,
                    /** Alto inicial del canvas (en pixels). Por defecto 300 px.
                    * Si se marca la opción 'canvasSquared' a true, el alto se igualará al ancho, obviando el valor aquí introducido. */
                    canvasHeight: 300,
                    //COORDINATES
                    /** Permite que las figuras geométricas se adapten a las dimensiones del canvas sin sobrepasarlo.
                    * Es lo contrario de 'deformation' o de 'equalProportion' */
                    autoProportion: true,
                    /** Igual a equalProportion. Lo contrario de autoProportion. */
                    deformation: false,
                    /** Obliga a la figura a ocupar el alto y el ancho del canvas (DEFORMACIÓN), por defecto FALSE.
                    * Sinónimo de 'deformation', lo contrario de 'autoPorportion' */
                    equalProportion: false,
                    /** Proporción a aplicar a los puntos de las figuras para que se ajusten al canvas.
                    * Conforme se vayan añadiendo puntos se deberá recalcular esta proporción. */
                    proportionX: "1.0",
                    //proportionX_OLD: 1,
                    /** Proporción a aplicar a los puntos de las figuras para que se ajusten al canvas.
                    * Conforme se vayan añadiendo puntos se deberá recalcular esta proporción. */
                    proportionY: "1.0",
                    //this.proportionY_OLD = this.proportionY;
                    /** Inversión del valor del eje X. Por defecto FALSE */
                    invertX: false,
                    /** Inversión del valor del eje Y. Por defecto TRUE ya que las ordenadas crecen inversamente, osea, hacia abajo. */
                    invertY: true,
                    //OTHERS
                    /** Número de decimales de aproximación para los cálculos y representaciones. */
                    decimals: 2,
                    //this.canvasZoomed = 0;
                    /** Saltos de Zoom al agrandar */
                    zoomIn: 50,
                    /** Saltos de Zoom al alejar. Normálmente igual a 'zoomIn' */
                    zoomOut: 50,
                    //OPCIONES RELACIONADAS CON EVENTOS
                    /** Permite añadir puntos dinámicamente mediante clicks del ratón. */
                    mousePoints: true,
                    /** Muestra información de puntos y segmentos dinámicamente mediante la situación del ratón. */
                    mouseInfo: true,
                    /** Permite arrastrar puntos dinámicamente mediante el ratón. */
                    mouseDrop: true,
                    /** Mostrar los Nombres de las figuras. */
                    showNames: true,
                    //FREEDRAW - DIBUJO LIBRE A MANO ALZADA
                    /** Activa el dibujado libre con el ratón. */
                    freeDraw: false,
                    /** Tamaño del trazo en el dibujado libre. */
                    freeDrawSize: 3,
                    /** Color del trazo en el dibujado libre. */
                    freeDrawColor: "black",
                    /** Tipo de pincel a utilizar en el trazado libre (Redondeado o cuadrado). */
                    freeDrawRounded: true,
                    /** Cuadrar las dimensiones del canvas (Ref. width), por defecto TRUE. */
                    canvasSquared: true,
                    /** Centrar las coordenadas del Canvas. Retiene el estado de centrado (translación) de las coordenadas. */
                    coordinatesCentred: true,
                    /** Rejillas Frontal (1º Plano) */
                    gridFront: true,
                    /** Ejes Frontal (1º Plano) */
                    axesFront: true,
                    /** Relleno de los polígonos */
                    fill: true,
                    /** Objeto de Gradiente de Relleno de los polígonos.
                    * Se construye, por ejemplo, con el método 'createLinearGradient(...)' del contexto del canvas. */
                    gradient: null,
                    //NUEVAS
                    /** Indica si los puntos creados deben dibujar a sus hijos.
                    * Sin efecto puesto que los puntos no tienen hijos, de momento. */
                    pointsDrawChildren: true,
                    /** Indica si los segmentos creados deben dibujar a sus hijos (los puntos). */
                    segmentsDrawChildren: true,
                    /** Indica si los polígonos creados deben dibujar a sus hijos (los segmentos). */
                    polygonsDrawChildren: true,
                    /** Indica si dibujar los puntos creados de cualquier figura. */
                    drawPoints: true,
                    /** Indica si dibujar los segmentos creados de cualquier polígono. */
                    drawSegments: true,
                    /** Indica si dibujar los polígonos creados. */
                    drawPolygons: true
                };
            };
            /** método interno para sanitizar las opciones pasadas */
            var _merge = function (options) {
                for (var p in options) {
                    if (_options.hasOwnProperty(p)) {
                        _options[p] = options[p];
                    }
                }
                /*if(options && options.original){
                    options.original = null;
                }*/
                _options.original = options;
                return _options;
            };
            /**  objeto que retendrá las opciones ya sanitizadas */
            var _options = _initialize();
            if (options && (typeof options).toUpperCase() === "OBJECT") {
                _options = _merge(options);
            }
            //API PÚBLICA
            /** Obtiene las opciones */
            this.getOptions = function () { return _options; };
            /** Resetea las opciones */
            this.resetOptions = function () { _options = _initialize(); };
            /** Obtiene el Sello de este módulo */
            this.getTAG = function () { return _TAG; };
        }
        return Options;
    })();
    canvasShapes.Options = Options; //FIN DE CLASE OPTIONS
    /** Función 'ATAJO' para obtener unas opciones válidas para el objeto PolyArea sin tener que crear objetos
    * PolyAreaOptions.Options.
    * @params <OptionsBase> options : El objeto a preparar para utilizarlo como opciones en PolyArea.
    * @return <OptionsBase> El objeto de opciones compatible para PolyArea. */
    function buildOptions(options) {
        return new canvasShapes.Options(options).getOptions(); //new Options(options).getOptions();
    }
    canvasShapes.buildOptions = buildOptions;
})(canvasShapes || (canvasShapes = {}));
//END MODULE: OPTIONS 
