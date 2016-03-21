/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Library of creation, manipulation and calculation of plane geometric figures.
*   File: 'canvasShapes.shapes.js' (METHODS) Functions that are directly relevant to the drawing shapes.
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Keep credits, please.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
//tsc --out canvasShapes2.js canvasShapes.ts canvasShapes.PolyArea.ts canvasShapes.Point.ts
//http://www.typescriptlang.org/Handbook#classes-privatepublic-modifiers
//http://www.typescriptlang.org/Playground/
//
// BEGIN MODULE: CANVAS-SHAPES MAIN
//
/** PolyArea main module library. It create the object you handle all the PolyArea.
  * With this library you can create objects PolyArea becomes a conglomeration of geometric figures grouped as points, segments
  * and Polygons. Although they can be treated individually, it is intended for treatment Hierarchy of figures: "Polygons PARENTS
  * of Segment and these PARENTS of Points".
  * Its graphical representation is based on an axis of 'fictitious' coordinates drawn on a 'canvas' with implementation of a series
  * of events that allow us to redesign the figures once displayed, so dynamically, we can vary the position of the points the axis
  * with the mouse cursor.
  * It has numerous utility methods and properties configuration to display the shapes and calculations on them (perimeters, areas,
  * show names, colors, fill, ...). The constructor supports a configuration object with parameters such as the 'id' of the 'canvas'
  * element (so you can use one previously created), proportions, inverts, axes, grids, ... (A complete list in the help this library).
  * OUTSTANDING:
  *  - Cross-Browser
  *  - Full OOP, possibility of using SINGLETON.
  *  - Internationalized, with the possibility of adding more languages.
  *  - Malleable and highly configurable.
  *  - Representation and dynamic handling of geometric shapes.
  *  - Calculation of magnitudes main: area, perimeter, distance, ...
  *  - Employability 'shape to shape' or through a 'nested heritage shapes'.
  */
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    var _TAG = "PolyArea";
    //BEGIN SINGLETON PATTERN
    /** Variable retaining the PolyArea module as Singleton pattern */
    var _instance = null;
    var _countInstances = 0;
    /** STATIC getter method to get or create the static object '_instance'. */
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
    /** STATIC setter method to set the static object '_instance'. */
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
    //PUBLIC API
    /** Builds and Renders a new PolyArea object built with passed options, and return it.
      * @return canvasShapes.PolyArea */
    function render(config) {
        return new canvasShapes.PolyArea(config);
    }
    canvasShapes.render = render;
    //OTHERS MODULES
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

/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.Options.js' (OBJECT) Build Options.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: OPTIONS
(function (canvasShapes) {
    "use-strict";
    /** PolyAreaOptions Module to build the options you need the PolyArea object, where in reality, the only essential option is the
      * 'id' (string) attribute.
      * Contains an internal interface 'Options Base' (the skeleton) which should be defined as the 'options' object and a construction
      * class 'Options' for this type of objects with filtering methods and construction of the options.
      * But quickly, apart from the previous class, it has also included the 'buildOptions method' (options ?: OptionsBase) to be accessed
      * through the nameSpace.
      * EXAMPLE:
      * var opts=PolyAreaOptions.buildOptions({id:"DIV-21-EN", language:"Esperanto"});
      * for(var p in opts){
      *   alert(p +" = "+ opts[p]);
      * }
      */
    var Options = (function () {
        /** Options Class Constructor to build options objects for PolyArea class. */
        function Options(options) {
            /** Options seal */
            var _TAG = "Options";
            //PRIVATES METHODS
            /** Internal method for constructor use, Returns a basic options object, reseted. */
            var _initialize = function () {
                var t = new Date().getTime();
                var aleat = Math.floor((Math.random() * 100) + 1);
                return {
                    /** Time seal (Unix TimeStamp Format). */
                    timestamp: t,
                    /** Id container element of entire graphical interface for PolyArea object. It may also be
                      * the ID of an existing canvas to embed it and handle it. */
                    id: ("PolyArea-" + t + "-" + aleat),
                    /** The original settings passed in construction, unfilled omitted. */
                    original: null,
                    /** It will be the context of the canvas. No need to pass it, will be automatically detect it. */
                    ctx: null,
                    /** Language of graphic interface. Default English. */
                    language: "en-GB",
                    /** Canvas drawing object. Usually it will generated automatically. */
                    canvas: null,
                    /** It becomes the PolyArea container of entire graphical interface. */
                    container: null,
                    //OPTIONS UI
                    /** Indicates whether to show the title in the UI */
                    showTitle: true,
                    /** Specifies whether to display the subtitle in the UI */
                    showSubTitle: true,
                    /** Indicates whether to show credits in the UI.
                      * It would be appreciated allowed to display the credits in some way as a recognition.
                      * What least, I would say! */
                    showCredits: true,
                    //BLOCKS
                    /** Displays all graphical interface with menu buttons, action fields and useful information. */
                    showBody: true,
                    /** Upper area of the UI. Contains among others the title and subtitle */
                    polyAreaHeader: true,
                    /** Bottom area of the UI. Basically it contains the credits */
                    polyAreaFooter: true,
                    /** Show Canvas Title */
                    canvasDataTitle: false,
                    /** Show the informative area of UI */
                    canvasDataInfo: true,
                    /** Show graphics coordinates area in the UI, for input data. */
                    canvasDataIntro: true,
                    /** Show UI options area */
                    canvasDataOptions: true,
                    /** Show main buttons area of UI */
                    canvasDataButtons: true,
                    //BUTTONS
                    /** Show UI main buttons */
                    showUIButtons: true,
                    /** Show UI language button. It show the flag language, currently it has no associated actions. */
                    btnCanvasFlag: true,
                    /** Show UI refresh / redraw button to canvas. */
                    btnCanvasRedraw: true,
                    /** Show UI zoom button */
                    btnCanvasZoom: true,
                    /** Show UI "show options" button */
                    btnCanvasOptions: true,
                    /** Allow canvas donwload to image */
                    linkDownCanvasImage: true,
                    /** Show "canvas download" button in UI */
                    btnDownCanvasImage: true,
                    /** Show clean button for clean the canvas surface (WITHOUT LOSING DATA) */
                    btnCanvasClean: true,
                    /** Show reset button of canvas (WITH LOSING DATA) */
                    btnCanvasReset: true,
                    //OTHERS
                    /** This option allow to clean all canvas through the 'Reset' button, even if there isn't any selected shape */
                    cleanAllIfEmpty: false,
                    //CANVAS OPTIONS
                    /** Grids */
                    grid: true,
                    /** Axes */
                    axes: true,
                    /** Fraction of each Grid square. If wish not Grid, let it zero (0) */
                    fractionGrid: 0.1,
                    /** Initial canvas width (pixels). 300px default */
                    canvasWidth: 300,
                    /** Initial canvas height (pixels). 300px default.
                    * If 'canvasSquared' option is checked, the height will be equal to width,  Si se marca la opción 'canvasSquared' a true, el alto se igualará al ancho, obviating the value entered here. */
                    canvasHeight: 300,
                    //COORDINATES
                    /** This allow that shapes fit to canvas dimensions without exceeding it. This is the opposite to 'deformation' or 'equalProportion' options. */
                    autoProportion: true,
                    /** Equal to 'equalProportion' option. This is the opposite to 'autoProportion'. */
                    deformation: false,
                    /** It force to shape to fit with and height canvas (DEFORMATION), FALSE by default.
                    * It is synonymous of 'deformation', the opposite of 'autoProportion'. */
                    equalProportion: false,
                    /** Points (X) proportion of shapes to fit them to canvas. As you add points this ratio must be recalculated. */
                    proportionX: "1.0",
                    //proportionX_OLD: 1,
                    /** Points (Y) proportion of shapes to fit them to canvas. As you add points this ratio must be recalculated. */
                    proportionY: "1.0",
                    /** Inversion of X axe value. FALSE by default.*/
                    invertX: false,
                    /** Inversion of Y axe value. TRUE by default, since the ordinates grow inversely, that is, down. */
                    invertY: true,
                    //OTHERS
                    /** Number of decimals approximation for calculations and presentations. */
                    decimals: 2,
                    /** Zoom step to magnify */
                    zoomIn: 50,
                    /** Zoom step to belittle. This is equal to 'zoomIn', usually. */
                    zoomOut: 50,
                    //OPCIONES RELACIONADAS CON EVENTOS
                    /** This allow dynamically add points through mouse clicks. */
                    mousePoints: true,
                    /** Show dynamically information for points and segments through the mouse situation */
                    mouseInfo: true,
                    /** This allow dynamically drag points with mouse. */
                    mouseDrop: true,
                    /** Show the shapes names. */
                    showNames: true,
                    //FREEDRAW - DIBUJO LIBRE A MANO ALZADA
                    /** This allow free drawing with mouse. */
                    freeDraw: false,
                    /** Stroke size for free drawing. */
                    freeDrawSize: 3,
                    /** Stroke color for free drawing */
                    freeDrawColor: "black",
                    /** Brush type to use for free drawing (Rounded or Squared). */
                    freeDrawRounded: true,
                    /** Square the Canvas dimension (Ref. width), default TRUE. */
                    canvasSquared: true,
                    /** Centred the Canvas coordinates. This hold the state of coordinates centred (translation) */
                    coordinatesCentred: true,
                    /** Frontal Grid (Foreground) */
                    gridFront: true,
                    /** Frontal Axes (Foreground) */
                    axesFront: true,
                    /** Polygons Filled */
                    fill: true,
                    /** Gradient object of filled. This makes it, by example, with 'createLinearGradient(...)' method of canvas context. */
                    gradient: null,
                    //NUEVAS
                    /** Indicate if the created points must drawing his children. Of no effect, becose the points hasn't children, for now. */
                    pointsDrawChildren: true,
                    /** Indicate if the created segments must drawing his children. (the points). */
                    segmentsDrawChildren: true,
                    /** Indicate if the created polygons must drawing his children. (the segments). */
                    polygonsDrawChildren: true,
                    /** Indicate if it must drawing the created points of whichever shape. */
                    drawPoints: true,
                    /** Indicate if it must drawing the created segments of whichever polygon. */
                    drawSegments: true,
                    /** Indicate if it must drawing the created polygons. */
                    drawPolygons: true,
                };
            };
            /** Internal method for sanitize the passed options */
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
            /** This is the object which hold the sanitized options */
            var _options = _initialize();
            if (options && (typeof options).toUpperCase() === "OBJECT") {
                _options = _merge(options);
            }
            //PUBLIC API
            /** Get options */
            this.getOptions = function () { return _options; };
            /** Reset options */
            this.resetOptions = function () { _options = _initialize(); };
            /** Get this module's seal */
            this.getTAG = function () { return _TAG; };
        }
        return Options;
    })();
    canvasShapes.Options = Options; //END OPTIONS CLASS
    /** 'SHORTCUT' function for get valid options to the PolyArea object, without must build object "PolyAreaOptions".
      * @params <OptionsBase> options : The object which unready for using at PolyArea options.
      * @return <OptionsBase> The compatible options object for PolyArea. */
    function buildOptions(options) {
        return new canvasShapes.Options(options).getOptions(); //new Options(options).getOptions();
    }
    canvasShapes.buildOptions = buildOptions;
})(canvasShapes || (canvasShapes = {}));
//END MODULE: OPTIONS

/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.objLanguage.js' (OBJECT) Returns an object that implements the language strings for translation.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: LANGUAGE
(function (canvasShapes) {
    "use-strict";
    /** Object with the language strings. If you not pass any option, it takes on the English language by default.
      * It has next items, and any more:
      * <ul>
      *   <li>GENERICS [OPTIONAL]: TITLE, CREDITS, SUBTITLE</li>
      *   <li>FORM:
      *      <ul>
      *         <li>POINTS: FIELDSET_POINTS_ARRAY, FIELDSET_POINTS_EXAMPLES, FIELDSET_POINTS, INPUT_TITLE_XS, INPUT_TITLE_YS,
      *            INPUT_VALUE_CREAR_PUNTOS, INPUT_TITLE_CREAR_PUNTOS, INPUT_VALUE_BORRAR_PUNTOS, INPUT_TITLE_BORRAR_PUNTOS,
      *            INPUT_VALUE_EXAMPLE1, INPUT_TITLE_LINK_EXAMPLE1, INPUT_VALUE_EXAMPLE2, INPUT_TITLE_LINK_EXAMPLE2, LABEL_INPUT_XY,
      *            INPUT_TITLE_XY, BUTTON_TITLE_BORRAR_PUNTO</li>
      *         <li>OPTIONS: FIELDSET_OPTIONS, LABEL_INPUT_DEFORMATION, INPUT_TITLE_DEFORMATION, LABEL_INPUT_GRID, INPUT_TITLE_GRID,
      *            LABEL_INPUT_FRACTION, INPUT_TITLE_FRACTION, LABEL_INPUT_AXES, INPUT_TITLE_AXES, LABEL_INPUT_FREEDRAW, INPUT_TITLE_FREEDRAW,
      *            LABEL_INPUT_PROPORTION_X, INPUT_TITLE_PROPORTION_X, LABEL_INPUT_PROPORTION_Y, INPUT_TITLE_PROPORTION_Y, LABEL_INPUT_PROPORTION_AUTO,
      *            INPUT_TITLE_PROPORTION_AUTO, LABEL_INPUT_INVERTER_X, INPUT_TITLE_INVERTER_X, LABEL_INPUT_INVERTER_Y,
      *            INPUT_TITLE_INVERTER_Y, LABEL_INPUT_DECIMALS, INPUT_TITLE_DECIMALS</li>
      *      </ul>
      *   </li>
      *   <li>CANVAS: INPUT_VALUE_CANVAS_DRAW, INPUT_TITLE_CANVAS_DRAW, INPUT_VALUE_CANVAS_CLEAN, INPUT_TITLE_CANVAS_CLEAN,
      *       SPAN_SOLUTION_TEXT, SPAN_PERIMETER_TEXT, SPAN_AREA_TEXT, IMG_TITLE_CANVAS_ZOOM, LINK_TITLE_CANVAS_DOWNLOAD,
      *       LINK_TEXT_CANVAS_DOWNLOAD, MSG_CANVAS_NO_AVAILABLE
      *   </li>
      *   <li> &hellip; </li>
      * </ul>
      */
    function objLanguage(lang) {
        lang || (lang = "en-GB");
        //ENGLISH DEFAULT
        var retornar = {
            //HEADER
            "TITLE": 'POLYAREA',
            "CREDITS": '<p><em>POLYGON AREA. Juan José Guerra Haba - 2015 - <a href="mailto:dinertron@gmail.com">dinertron@gmail.com</a></em>&emsp;' +
                '<span style="border:1px solid gray; width:350px; font-size:xx-small; padding:2px;">' +
                '<span>FORMULAS:</span> &emsp; <a href="https://es.wikipedia.org/wiki/F%C3%B3rmula_del_%C3%A1rea_de_Gauss">GAUSS Wiki</a>&emsp; ' +
                '  <a href="http://www.mathopenref.com/coordpolygonarea2.html">REGULAR/IRREGULAR POLYGON</a>' +
                '</span></p>' +
                '<p style="clear:both;">&nbsp;</p>',
            "CREDITS2": '<p><em style="float:left;">POLYAREA &trade;</em> <i class="logo logo16 logoPolyArea" title="PolyArea"></i> ' +
                '<em style="float:left;">&emsp;</em>' +
                '<em style="float:left;">2015 &copy; Juan José Guerra Haba</em> ' +
                '<em style="float:left;">&emsp;</em>' +
                '<a href="mailto:dinertron@gmail.com" title="author"><i class="logo logo16 logoGuerratron"></i></a><i class="clearFix">&nbsp;</i></p>',
            "SUBTITLE": 'Polygons Area',
            //END HEADER
            //BUTTONS
            "COUNTRY": 'ENGLAND',
            "CANVAS_FLAG_COUNTRY_TITLE": 'English',
            "CANVAS_DRAW_TITLE": 'Canvas Draw',
            "CANVAS_REFRESH_TITLE": 'Canvas Refresh',
            "CANVAS_ZOOM_TITLE": 'Canvas Zoom',
            "CANVAS_ZOOM_RESTORE_TITLE": 'No-Zoom',
            "CANVAS_ZOOM_IN_TITLE": 'Canvas Zoom-In',
            "CANVAS_ZOOM_OUT_TITLE": 'Canvas Zoom-Out',
            "CANVAS_OPTIONS_TITLE": 'Show / hide the options',
            "CANVAS_DOWNLOAD_TITLE": 'Download canvas image',
            "CANVAS_CLEAN_TITLE": 'To clean Canvas surface',
            "CANVAS_RESET_TITLE": 'Canvas Reset. WARNING: data losing!',
            //END BUTTONS
            //CANVAS
            "MSG_JAVASCRIPT_NO_AVAILABLE": 'Sorry, but your browser does not support or disabled JAVASCRIPT, which is essential to play this explanatory.',
            "MSG_CANVAS_NO_AVAILABLE": 'Sorry, but your browser does not support the HTML element "canvas," which is essential to play this explanatory.',
            //END CANVAS
            //INFO DATA
            "SPAN_PERIMETER_TEXT": 'Perimeter:',
            "SPAN_AREA_TEXT": 'Area:',
            //END INFO DATA
            //INPUT DATA
            "INPUT_TITLE_XS": 'X-type values separated by commas, to create all points in the polygon, that is, its vertices',
            "INPUT_TITLE_YS": 'Y-type values separated by commas, to create all points in the polygon, that is, its vertices',
            "INPUT_TITLE_XY": 'Points (x,y) values separated by commas, to create all points in the polygon, that is, its vertices',
            "INPUT_VALUE_EXAMPLE1": 'Example1',
            "INPUT_TITLE_LINK_EXAMPLE1": 'example1 it use in << mathopenref >>',
            "INPUT_VALUE_EXAMPLE2": 'Example2',
            "INPUT_TITLE_LINK_EXAMPLE2": 'example2 it use in << WikiPedia >>',
            "INPUT_VALUE_EXAMPLE_OTHERS": 'Others',
            "INPUT_TITLE_LINK_EXAMPLE_OTHERS": 'other examples used in web...',
            //END INPUT DATA
            //OPTIONS
            "LABEL_VIEW_COORDINATES": 'View Coordinates:',
            "TITLE_VIEW_COORDINATES": 'show / hide the coordinates inputs',
            "TITLE_GROUPED": 'Shapes grouped',
            "TITLE_SELECT_ALL": 'Select All shapes',
            "FIELDSET_OPTIONS": 'OPTIONS:',
            "LABEL_INPUT_DEFORMATION": 'Deformation:',
            "INPUT_TITLE_DEFORMATION": 'This deforms X and Y axes',
            "LABEL_INPUT_GRID": 'Grid:',
            "INPUT_TITLE_GRID": 'show the coordinates grid',
            "LABEL_INPUT_FRACTION": 'Fraction:',
            "INPUT_TITLE_FRACTION": 'how many fraction of canvas dimensions take each grating. (fractions of 0 to 1)',
            "LABEL_INPUT_AXES": 'Axes:',
            "INPUT_TITLE_AXES": 'show the coordinates axes',
            "LABEL_INPUT_WIDTH": 'Width:',
            "INPUT_TITLE_WIDTH": 'canvas width',
            "LABEL_INPUT_HEIGHT": 'Height:',
            "INPUT_TITLE_HEIGHT": 'canvas height',
            "LABEL_INPUT_PROPORTION_X": 'X-Proportion:',
            "INPUT_TITLE_PROPORTION_X": 'proportion to multiply the X coordinate axis',
            "LABEL_INPUT_PROPORTION_Y": 'Y-Proportion:',
            "INPUT_TITLE_PROPORTION_Y": 'proportion to multiply the Y coordinate axis',
            "LABEL_INPUT_PROPORTION_AUTO": 'Auto-Proportion:',
            "INPUT_TITLE_PROPORTION_AUTO": 'set automatically proportion of X and Y coordinates to show the complete picture and that it fits the canvas',
            "LABEL_INPUT_INVERTER_X": 'X-Inverter:',
            "INPUT_TITLE_INVERTER_X": 'inverter the X axe coordinates',
            "LABEL_INPUT_INVERTER_Y": 'Y-Inverter:',
            "INPUT_TITLE_INVERTER_Y": 'inverter the Y axe coordinates',
            "LABEL_INPUT_DECIMALS": 'Decimals:',
            "INPUT_TITLE_DECIMALS": 'how many decimals to work',
            "LABEL_INPUT_ZOOM_SIZE": 'Zoom Size:',
            "INPUT_TITLE_ZOOM_SIZE": 'increment/decrement canvas zoom',
            "LABEL_INPUT_MOUSE_DROP": 'Drop:',
            "INPUT_TITLE_MOUSE_DROP": 'It enable To Drop',
            "LABEL_INPUT_MOUSE_INFO": 'Info:',
            "INPUT_TITLE_MOUSE_INFO": 'Show shape information',
            "LABEL_INPUT_MOUSE_POINTS": 'Points:',
            "INPUT_TITLE_MOUSE_POINTS": 'It enable add Points with mouse',
            "LABEL_INPUT_SHOW_NAMES": 'Names:',
            "LABEL_INPUT_COLOR_SHAPES": 'Shapes Color',
            "INPUT_TITLE_COLOR_SHAPES": 'Shapes Color (HTML) of painting. Array [borders, background] is avaible ',
            "INPUT_TITLE_SHOW_NAMES": 'Show names of shapes',
            "LABEL_INPUT_FREEDRAW": 'Free Draw:',
            "INPUT_TITLE_FREEDRAW": 'Enable Free draw painting',
            "LABEL_INPUT_FREEDRAW_SIZE": 'Size:',
            "INPUT_TITLE_FREEDRAW_SIZE": 'Point size of painting',
            "LABEL_INPUT_FREEDRAW_COLOR": 'Color:',
            "INPUT_TITLE_FREEDRAW_COLOR": 'Point color (HTML) of painting',
            "LABEL_INPUT_FREEDRAW_ROUNDED": 'Rounded:',
            "INPUT_TITLE_FREEDRAW_ROUNDED": 'Rounded point of painting'
        };
        switch (lang.toUpperCase()) {
            case "ES":
            case "SP":
            case "ES-SP":
            case "ES-ES":
                //SPANISH
                retornar = {
                    "TITLE": 'POLYAREA',
                    "CREDITS": '<p><em>ÁREAS DE POLÍGONOS. Juan José Guerra Haba - 2015 - <a href="mailto:dinertron@gmail.com">dinertron@gmail.com</a></em>&emsp;' +
                        '<span style="border:1px solid gray; width:350px; font-size:xx-small; padding:2px;">' +
                        '<span>FÓRMULAS:</span> &emsp; <a href="https://es.wikipedia.org/wiki/F%C3%B3rmula_del_%C3%A1rea_de_Gauss">GAUSS Wiki</a>&emsp; ' +
                        '  <a href="http://www.mathopenref.com/coordpolygonarea2.html">POLÍGONO REGULAR/IRREGULAR</a>' +
                        '</span></p>' +
                        '<p style="clear:both;">&nbsp;</p>',
                    "CREDITS2": '<p><em style="float:left;">POLYAREA &trade;</em> <i class="logo logo16 logoPolyArea" title="PolyArea"></i> ' +
                        '<em style="float:left;">&emsp;</em>' +
                        '<em style="float:left;">2015 &copy; Juan José Guerra Haba</em> ' +
                        '<em style="float:left;">&emsp;</em>' +
                        '<a href="mailto:dinertron@gmail.com" title="author"><i class="logo logo16 logoGuerratron"></i></a><i class="clearFix">&nbsp;</i></p>',
                    "SUBTITLE": 'Áreas de Polígonos',
                    //END HEADER
                    //BUTTONS
                    "COUNTRY": 'SPAIN',
                    "CANVAS_FLAG_COUNTRY_TITLE": 'Español',
                    "CANVAS_DRAW_TITLE": 'Dibujar el Canvas',
                    "CANVAS_REFRESH_TITLE": 'Refrescar el Canvas',
                    "CANVAS_ZOOM_TITLE": 'Zoom al Canvas',
                    "CANVAS_ZOOM_RESTORE_TITLE": 'Sin Zoom',
                    "CANVAS_ZOOM_IN_TITLE": 'Aumentar el Zoom al Canvas',
                    "CANVAS_ZOOM_OUT_TITLE": 'Disminuir el Zoom al Canvas',
                    "CANVAS_OPTIONS_TITLE": 'Mostrar / Ocultar las opciones',
                    "CANVAS_DOWNLOAD_TITLE": 'Descargar imágen del Canvas',
                    "CANVAS_CLEAN_TITLE": 'Limpiar el Canvas',
                    "CANVAS_RESET_TITLE": 'Reiniciar el Canvas. CUIDADO: Esto eliminará cualquier coordenada introducida',
                    //END BUTTONS
                    //CANVAS
                    "MSG_JAVASCRIPT_NO_AVAILABLE": 'Lo sentimos pero su navegador NO SOPORTA o NO TIENE ACTIVADO JAVASCRIPT, el cual es imprescindible para reproducir este explicativo.',
                    "MSG_CANVAS_NO_AVAILABLE": 'Lo sentimos pero su navegador NO SOPORTA el elemento HTML "canvas", el cual es imprescindible para reproducir este explicativo.',
                    //END CANVAS
                    //INFO DATA
                    "SPAN_PERIMETER_TEXT": 'Perímetro:',
                    "SPAN_AREA_TEXT": 'Área:',
                    //END INFO DATA
                    //INPUT DATA
                    "INPUT_TITLE_XS": 'escriba los valores de X separados por comas, para todos los puntos a crear en el polígono, osea, sus Vértices',
                    "INPUT_TITLE_YS": 'escriba los valores de Y separados por comas, para todos los puntos a crear en el polígono, osea, sus Vértices',
                    "INPUT_TITLE_XY": 'Puntos (x, y), valores separados por comas, para todos los puntos a crear en el polígono, osea, sus Vértices',
                    "INPUT_VALUE_EXAMPLE1": 'Ejemplo1',
                    "INPUT_TITLE_LINK_EXAMPLE1": 'ejemplo1 utilizado en << mathopenref >>',
                    "INPUT_VALUE_EXAMPLE2": 'Ejemplo2',
                    "INPUT_TITLE_LINK_EXAMPLE2": 'ejemplo2 utilizado en la << WikiPedia >>',
                    "INPUT_VALUE_EXAMPLE_OTHERS": 'Otros',
                    "INPUT_TITLE_LINK_EXAMPLE_OTHERS": 'otros ejemplos utilizados en la web ...',
                    //END INPUT DATA
                    //OPTIONS
                    "LABEL_VIEW_COORDINATES": 'Ver Coordenadas:',
                    "TITLE_VIEW_COORDINATES": 'Mostrar u ocultar los inputs de coordenadas',
                    "TITLE_GROUPED": 'Agrupar figuras',
                    "TITLE_SELECT_ALL": 'Seleccionar todas las figuras',
                    "FIELDSET_OPTIONS": 'OPCIONES:',
                    "LABEL_INPUT_DEFORMATION": 'Deformación:',
                    "INPUT_TITLE_DEFORMATION": 'Deformar los ejes X e Y',
                    "LABEL_INPUT_GRID": 'Rejilla:',
                    "INPUT_TITLE_GRID": 'mostrar la rejilla de coordenadas',
                    "LABEL_INPUT_FRACTION": 'Fracción:',
                    "INPUT_TITLE_FRACTION": 'que fracción de las dimensiones del canvas tomarán cada enrejillado. (fracciones de 0 a 1)',
                    "LABEL_INPUT_AXES": 'Ejes:',
                    "INPUT_TITLE_AXES": 'mostrar los ejes de coordenadas',
                    "LABEL_INPUT_WIDTH": 'Ancho:',
                    "INPUT_TITLE_WIDTH": 'ancho del canvas',
                    "LABEL_INPUT_HEIGHT": 'Alto:',
                    "INPUT_TITLE_HEIGHT": 'alto del canvas',
                    "LABEL_INPUT_PROPORTION_X": 'Proporción-X:',
                    "INPUT_TITLE_PROPORTION_X": 'proporcion a multiplicar el eje X de coordenadas',
                    "LABEL_INPUT_PROPORTION_Y": 'Proporción-Y:',
                    "INPUT_TITLE_PROPORTION_Y": 'proporcion a multiplicar el eje Y de coordenadas',
                    "LABEL_INPUT_PROPORTION_AUTO": 'Auto-Proporción:',
                    "INPUT_TITLE_PROPORTION_AUTO": 'proporcionar de forma automática los ejes X e Y de coordenadas para mostrar la imágen al completo y que se adapte al canvas',
                    "LABEL_INPUT_INVERTER_X": 'Invertir X:',
                    "INPUT_TITLE_INVERTER_X": 'invertir el eje X de coordenadas',
                    "LABEL_INPUT_INVERTER_Y": 'Invertir Y:',
                    "INPUT_TITLE_INVERTER_Y": 'invertir el eje Y de coordenadas',
                    "LABEL_INPUT_DECIMALS": 'Decimales:',
                    "INPUT_TITLE_DECIMALS": 'con cuántos decimales trabajar',
                    "LABEL_INPUT_ZOOM_SIZE": 'Incr. Zoom:',
                    "INPUT_TITLE_ZOOM_SIZE": 'incremento/decremento en pixels del canvas al realizar Zoom',
                    "LABEL_INPUT_MOUSE_DROP": 'Arrastar:',
                    "INPUT_TITLE_MOUSE_DROP": 'Permite la acción arrastrar',
                    "LABEL_INPUT_MOUSE_INFO": 'Info:',
                    "INPUT_TITLE_MOUSE_INFO": 'Muestra información de las figuras',
                    "LABEL_INPUT_MOUSE_POINTS": 'Puntos:',
                    "INPUT_TITLE_MOUSE_POINTS": 'Permite añadir puntos con el ratón',
                    "LABEL_INPUT_SHOW_NAMES": 'Nombres:',
                    "INPUT_TITLE_SHOW_NAMES": 'Mostrar nombres de figuras',
                    "LABEL_INPUT_COLOR_SHAPES": 'Color de las Figuras',
                    "INPUT_TITLE_COLOR_SHAPES": 'Color de las formas (en HTML) del dibujo. Se permite un array [bordes, fondo]. ',
                    "LABEL_INPUT_FREEDRAW": 'A Mano:',
                    "INPUT_TITLE_FREEDRAW": 'Permitir el Dibujo libre. Dibuja a mano alzada.',
                    "LABEL_INPUT_FREEDRAW_SIZE": 'Tamaño:',
                    "INPUT_TITLE_FREEDRAW_SIZE": 'Tamaño deseado del punto de dibujo.',
                    "LABEL_INPUT_FREEDRAW_COLOR": 'Color:',
                    "INPUT_TITLE_FREEDRAW_COLOR": 'Color (HTML) deseado del punto de dibujo.',
                    "LABEL_INPUT_FREEDRAW_ROUNDED": 'Redondo:',
                    "INPUT_TITLE_FREEDRAW_ROUNDED": 'Forma redondeada del punto de dibujo.'
                };
                break;
            case "EN":
            case "EN-GB":
            case "EN-US":
                //ALREADY DEFINED
                break;
            default: //ENGLISH DEFAULT
        }
        return retornar;
    }
    canvasShapes.objLanguage = objLanguage;
})(canvasShapes || (canvasShapes = {}));
//END MODULE: LANGUAGE

/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.objects.js' (OBJECTS) Object utility: "cartesianArt", "icos", "ABC", ...
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: OBJECTS
(function (canvasShapes) {
    "use-strict";
    //cartesianArt
    /** Object with artistic drawing examples through cartesians coordinates.
      * From: http://www.mateslibres.com/geometria/arte_puntos_coordenadas_001.php  */
    canvasShapes.cartesianArt = (function () {
        return {
            "MAPLE_LEAF": "[[[1, -3], [5, -4], [4, -3], [9, 1], [7, 2], [8, 5], [5, 4], [5, 5], [3, 4], [4, 9], [2, 7], " +
                "[0, 10], [-2, 7], [-4, 8], [-3, 3], [-5, 6], [-5, 4], [-8, 5], [-7, 2], [-9, 1], [-4, -3], " +
                "[-5, -4], [0, -3], [2, -7], [2, -6], [1, -3]]]",
            "HALLOWEEN_PUMPKIN": "[[[-1, 16], [-3, 22], [0, 23], [2, 15], [3, 13], [2, 14], [1, 13], [0, 14], [-1, 13], [-1, 14], " +
                "[-2, 14], [-1, 16]], [[9, 12], [12, 8], [14, 3], [15, -2], [15, -8], [13, -14], [11, -17], " +
                "[9, -20], [5, -22], [0, -23], [-4, -22], [-7, -21], [-9, -20],[-12, -18], [-14, -15], [-15, -12], " +
                "[-16, -6], [-15, 1], [-14, 5], [-12, 9], [-10, 12]], [[2, 15], [3, 14], [6, 14], [9, 12], [7, 12], " +
                "[8, 10], [4, 12], [3, 10], [1, 12], [-2, 9], [-3, 12], [-7, 10], [-5, 13], [-10, 12], [-7, 14], " +
                "[-6, 14], [-4, 15], [-2, 15], [-1, 16]], [[-4, 1], [-7, 1], [-4, 6], [-4, 1]], [[5, 1], [7, 3], " +
                "[4, 6], [5, 1]], [[-2, -4], [0, 1], [2, -4], [-2, -4]], [[2, -7], [4, -11], [6, -7], [8, -9], " +
                "[11, -7], [9, -11], [6, -17], [3, -14], [0, -19], [-4, -14], [-6, -16], [-9, -10], [-10, -5], " +
                "[-7, -9], [-6, -8], [-5, -11], [-3, -8], [0, -11], [2, -7]]]",
            "BAT": "[[[3, 3], [5, -1], [6, -2], [8, 0], [10, 4], [12, 8], [13, 12], [13, 16], [15, 15], [19, 15], [22, 15], " +
                "[24, 15], [26, 16], [25, 14], [23, 10], [22, 6], [19, 5], [17, 3], [16, 1], [15, -3], [15, -7], [13, -8], " +
                "[11, -10], [9, -12], [8, -14], [7, -18], [5, -16], [1, -14], [0, -14], [-4, -15], [-6, -17], [-8, -15], " +
                "[-10, -13], [-11, -12], [-12, -12], [-13, -12], [-14, -13], [-17, -15], [-18, -15], [-22, -13], [-24, -12], " +
                "[-25, -12], [-27, -13], [-25, -11], [-23, -8], [-21, -5], [-19, 0], [-15, -2], [-12, -4], [-10, -5], " +
                "[-7, -6], [-4, -6], [-1, -6], [-1, -3], [-2, 1], [0, -1], [1, 0], [2, 0], [3, 1], [3, 3]]]",
            "CAT": "[[[0, 26], [3, 27], [7, 28], [15, 29], [20, 28], [25, 27], [31, 25], [35, 23], [36, 23], [37, 24], [38, 28], " +
                "[38, 37], [45, 30], [56, 30], [60, 33], [62, 34], [64, 35], [63, 25], [62, 21], [63, 16], [61, 13], [56, 8], " +
                "[54, 5], [50, -4], [39, -21], [35, -40], [36, -45], [37, -46], [39, -47], [40, -48], [40, -50], [32, -50], " +
                "[31, -48], [30, -40], [29, -30], [27, -24], [27, -30], [26, -44], [25, -46], [23, -48], [21, -48], " +
                "[20, -47], [19, -45], [19, -40], [20, -35], [20, -30], [18, -25], [15, -19], [12, -15], [10, -16], [7, -20], " +
                "[-5, -34], [1, -41], [2, -42], [5, -42], [7, -44], [6, -46], [-1, -46], [-16, -32], [-19, -36], [-14, -44], " +
                "[-11, -45], [-10, -46], [-10, -48], [-11, -49], [-17, -49], [-18, -48], [-27, -32], [-27, -30], [-27, -15], " +
                "[-29, -9], [-32, -4], [-35, -4], [-40, -3], [-46, 0], [-50, 3], [-54, 8], [-56, 14], [-56, 18], [-55, 22], " +
                "[-53, 26], [-50, 30], [-46, 33], [-40, 37], [-37, 38], [-34, 38], [-33, 37], [-37, 35], [-46, 27], " +
                "[-49, 21], [-50, 19], [-50, 15], [-47, 10], [-43, 6], [-36, 3], [-33, 3], [-30, 6], [-26, 10], [-21, 15], " +
                "[-15, 20], [-9, 23], [-4, 25], [0, 26]], [[53, 17], [54, 18], [56, 19], [60, 18], [57, 16], [54, 16], " +
                "[53, 17]], [[42, 20], [47, 19], [48, 18], [47, 16], [45, 16], [43, 18], [42, 20]]]",
            "GHOST": "[[[6, 5], [8, 7], [9, 9], [10, 11], [11, 14], [12, 21], [13, 36], [14, 39], [15, 41], [17, 43], " +
                "[20, 44], [25, 45], [29, 45], [33, 43], [35, 41], [36, 38], [36, 31], [35, 16], [35, 13], [36, 9], " +
                "[38, 6], [36, 5], [33, 4], [27, 5], [25, 6], [22, 6], [20, 5], [17, 4], [13, 3], [10, 3], [7, 4], " +
                "[6, 5]]]" //FANTASMA
        };
    })(); //END OBJ CartesianArt
    /** Base64 icons to attach the 'src' attribute in images, the 'href' attribute in labels 'a', or for use in CSS in the background as 'url (...)' */
    canvasShapes.icos = (function () {
        /** Prefix (header) Base64 images, GIF format (16X16) */
        var prefImg64GIFx16 = "data:image/gif;base64,R0lGODlhEAAQ";
        /** Prefix (header) Base64 images based in GIF format monochrome(16x16) */
        var prefImg64GIF = prefImg64GIFx16 + "AIABAAAAAP///yH5BAEKAAEALAAAAAAQABAAAAI";
        return {
            /*"PREF":           prefImg64GIF, /*Prefix monochrome GIF format. Don't use externally */
            VER: "data:image/gif;base64,R0lGODlhCAAIAIABAAAAAP///yH5BAEKAAEALAAAAAAIAAgAAAINjGEZgIqtVjxTOsZqKgA7",
            GUERRATRON: prefImg64GIFx16 + "AOMMABUQEL4aF38yEmZXVCRmmU9mHf9ERVqrLM2Ue/uUMpSwwvrKgP///////////////yH5BAEKAA8ALAAAAAAQABAAAARY8J1HZb31jIzx+SDQXUg4XuCnnFT6JfCydAdBHIAgxAhmEwpCIAAbLESV34+YAMyQD+VAMNT1oEGbYhAwdFfQKEABEBkezjD6QaYI2OuLaPXYPHqsvP4SAQA7",
            LOGO: prefImg64GIFx16 + "AKECAAcJBOIeFP///////yH5BAEKAAIALAAAAAAQABAAAAI0lC8RyAeqQHMPAtmuVEIz/11HNHUctEwoWrJcmaQiPIPZ3OEUNqbI24toWMGApgI0JJW+AgA7",
            //
            "ADJUST": prefImg64GIF + "njI9pwKDtAlNoyktd3G/1E1EeJoJhuZwlh54q9rKaOEtvtTWPjioFADs=",
            "ADJUST1": prefImg64GIF + "ljI9pwLodoItgxVkr0nvew2GWB4akdI5eaHaJmYkaqkBM++BkAQA7",
            "ADJUST2": prefImg64GIF + "rjI9pwIztQlQLLGmTy7a9fWFclH0QZZaoqFLQdIxy2MEehylgvpJn/FspCgA7",
            "ADJUST3": prefImg64GIF + "pjI9pwIztQlMrTnrBUlruD3ZJJ1JHZD5lSmLn83oyLF+chY64LUGpWQAAOw==",
            "AXES": prefImg64GIF + "mjANwy5ja1nvRJIcjvKge7n1QaI2lZp4MKCnTC8cyy4prmrU3GhYAOw==",
            "AXES2": prefImg64GIF + "sjAEWuKrITnMQPrcSi4merl1dhnnPiIVfyZIpupbR2W7Vjef6OL8UHKP5DAUAOw==",
            "BROOM": prefImg64GIF + "gjI+pywzQ0IMxzGpfnVRyrnxfKGpL2SVoJLKje2GmUgAAOw==",
            "CLOSE": prefImg64GIF + "njI9pwLodGEQSPEnrqTbqzGFKOI2cs50o2SVs6YlqXKof2IlmiyoFADs=",
            "COLOR": prefImg64GIF + "gjI+pywcPmoGw1XBTxlE9iXzg1I2b6ImbRpUMNcayXAAAOw==",
            "COG": prefImg64GIF + "mjA8Jx63bQkLPzIez3ptlOzkhCHmjdJJmSUFfy8UyhpJjakdR1RQAOw==",
            "DECIMALS": prefImg64GIF + "pjI+pqwDsjotpPkoNzuFJxHkaKHYgeX5SyaLquHqhfE0aneUix/T+UQAAOw==",
            "DOWN": prefImg64GIF + "kjA8Jx63b4otSUWcvyhjOYD3LJJZmeIpbCq0mdWqlZnw02DIFADs=",
            "DOWN_IMAGE": prefImg64GIF + "jhI+pyxGsXHpw0gqcjFRv5IWSeInRcTWoFaLkx5nx675eJhYAOw==",
            "DOWNLOAD": prefImg64GIF + "eDI6Zpt0Bo4Rr2mql27y/6AGaN24Z41xduaKh+YoFADs=",
            "DRAW": prefImg64GIF + "jjI+pCrDc3DMyThva03y7L0FZFiadtkTgRaEeOZHYVcb2vRQAOw==",
            "EMPTY": prefImg64GIF,
            "ERASER": prefImg64GIF + "mjH+gyKYPWoJPUsrunRryHgUhuFRi55jaN3psGyKbKJ1ubZt4vhUAOw==",
            "FLAG": prefImg64GIF + "ljI+pm+APoYn0zUpnU0CHenQfYpHeJYZnmo4fFqGwI8/Mjed5AQA7",
            "FLAG_ENGLAND": prefImg64GIFx16 + "AKEDANYuO87Qzf3//P///yH5BAEKAAMALAAAAAAQABAAAAIynI+pm+IPwHtmumhFtdju2U1GRJbmaKbRB0neEHDuExgxODs1LFt7AAxGgkGG8YhEFgAAOw==",
            "FLAG_SPAIN": prefImg64GIFx16 + "AKEDAMwoH8hjY/bsMv///yH5BAEKAAMALAAAAAAQABAAAAIunI+pm+APoQGh2lvBxDzoIYTiOBpjQJZgSKGpYLLVC6+0GuXPpOd8L2EIh8RhAQA7",
            "FRACTION": prefImg64GIF + "njI+JkMDq2lthVtsWpiaqM3mQw4ifVmXoBWJiZLLaZsJWHeYceJ4FADs=",
            "GRID": prefImg64GIF + "ljGGBl72anos0gouzrpA134UTKGnmRnJjKHFPecauOoPr+6V2AQA7",
            "HELP": prefImg64GIF + "jjAOpcI0L3TrRTKlscnQ/3jFgKIJQyVWjumYj+cbvFdPyWwAAOw==",
            "IMAGE": prefImg64GIF + "ghI+pyxDR0HvRTVhnwtXydimaNxoXdGJoepJs28Xy3BQAOw==",
            "INFO": prefImg64GIF + "mjI+pywYPWoDuLTtjVnq7hHHdhITkMZppF5qn96JjdWFUA83SzhcAOw==",
            "INFO2": prefImg64GIF + "mjA2px6G/GDyPTlTd1Qv6n3FgYo2kOJamWoUAip1xJM6yvTVeUwAAOw==",
            "INFO3": prefImg64GIF + "ijI+pBg2LHoPHSYqVvfDy5WEN8yWhWI1dFZRsSqlq7GR2AQA7",
            "INVERT_X": prefImg64GIF + "njI+piwDnWIiGzteetVBjnn3OOEIViZ4iGrXi4nbJhl2ZLOX6zgcFADs=",
            "INVERT_Y": prefImg64GIF + "rjI+pCX1uYGjg1Xin1NxmvlHMpn1YhF1q5oitWbknQtXdKN74spj8D0QUAAA7",
            "LAYERS": prefImg64GIF + "mjI+ZwO2MngTRmXcD1lZzukDeJo1dSU2owqZqk70wx7YyeN31fhQAOw==",
            "LOCK_LOCKED": prefImg64GIF + "ojA8Jx6zaXDIwhomWxVRHfnnZQ4plKZ1V94Sri5Fp3I4Taquznp9GAQA7",
            "LOCK_UNLOCKED": prefImg64GIF + "njA8Jx6zaXDIwhomWjXhL/oTdJYZSWVEPuWaV6WKwus4sqtH4uQcFADs=",
            "MAGIC": prefImg64GIF + "mRB6Gitn7ImsG1GTPdW9CT0Uf422ZqC1nmpIlaoGwLMaoROP3jhQAOw==",
            "MINUS": prefImg64GIF + "TjI+py+0Po3Sg2quuBrP7D4ZOAQA7",
            "MOUSE_DROP": prefImg64GIF + "ljI+py+DOwptQvXPT3cB031XaB5UUF36ImEmV6p5RLM72jedMAQA7",
            "MOUSE_POINT": prefImg64GIF + "ojIFoy+nKDgwpUlVrAzfzfVlR1jnb93yL+Yhh6kplrJrxqt2z3vFSAQA7",
            "MOVE": prefImg64GIF + "ljB8AyKwN1YNHSoomXUbz+nmcRZbmOYmgs3ZY8mHlC2uvfcdHAQA7",
            "NEXT": prefImg64GIF + "ljI+pq9ALIoquyUPhNdlWvk1hl5CBeY5h+rGl2rrYaqLcw+RIAQA7",
            "PAINT": prefImg64GIF + "kjAOpe7cPGpwRIVpNxNm2/1HgqJFjZzKmpqxs4l6wq6512jYFADs=",
            "PALETTE": prefImg64GIF + "mjI+ZwM0anASrmXnkpfH17mzURJYYaHrpSoqt5aIyGKOhmGnQbhQAOw==",
            "PENCIL": prefImg64GIF + "pjAGmq3jJFgxoMuiobXrmizWbxj3R542oeKbJSFJSRFpwXNLoLVY8WAAAOw==",
            "PLUS": prefImg64GIF + "ajI+py+0AHILy0Boug7zH5HnPV2mSOWLqihUAOw==",
            "POLYGON": prefImg64GIF + "qjA8Jx73xmjNRUpXsZVl2jmHa01XcBo3h50Us6JiQLM5vipPeVbalcigAADs=",
            "POLYGON2": prefImg64GIF + "mjA8Jx63b4ovuQZpYRrPaLX2XZ1HBBGJXqo2n+4Zb186KLOIGXQAAOw==",
            "POLYGON3": prefImg64GIF + "rjA8Jx73xmjNRIiUxfIli1W3fAjJlaXloqmlmeGWVJ9cbfYF6y/WcChN1CgA7",
            "PROPORTION_X": prefImg64GIF + "rjI+pywafYJSHogcqzgFi3W3c94WWeHGparJoK5HemJXmYtsaGyp631AUAAA7",
            "PROPORTION_Y": prefImg64GIF + "pjI+pAbDbHIqqpSgZswZLzm2bA1rUmKHpebBtOlaweM3hKz+5Ps38UQAAOw==",
            "REFRESH": prefImg64GIF + "kjI+pywEPG5xgPXVRbqdyQzGesyUROZpbqk0fqbJlR80x+yYFADs=",
            "REFRESH2": prefImg64GIF + "oRB6gi2e5okKyMihpxLNx/njWJnbeiabNtY5my5DwlGmkW4N16ORJAQA7",
            "ROUNDED": prefImg64GIF + "ojB8AyKe/moFQPnSxanlG/m2SR45JJI5iaoUfw3YOe77yTL0wZc5SAQA7",
            "RULER": prefImg64GIF + "gjAOpeY2rnITSwFgvy7o2yl2eBoydZy2mGILTiboO2RQAOw==",
            "RULER_WIDTH": prefImg64GIF + "qDIIIl2usoomwJVvn1TWz5Shgk23mNKaOerBPu8YwSNf2jef6ztfnHygAADs=",
            "RULER_HEIGHT": prefImg64GIF + "rDI4Xa5zpQESsyvUoVibfumXRxDlY+ICX95Usin4gCXWtp8ZaR8+nnbItCgA7",
            "SAVE": prefImg64GIF + "aDI6Zpt0Bo4Rr2mql27z7T4GRGHrlh6YoAxYAOw==",
            "SELECT": prefImg64GIF + "pjI9pwNEOYHRKzVkPXo9tCiLXQiZjhqZWKZZnG3LXo6ngV81Rt9O2UQAAOw==",
            "SHAPE": prefImg64GIF + "mjI8Hm20LnIIM0aga1HrbhD3ZB0aY1zFoGqzWGk5SWEmt6+B5nRQAOw==",
            "SIZE": prefImg64GIF + "ljI+pywrfzpsRGutAshhfPWmBuHEg+aFnaX6SGCKhiqbRjedJAQA7",
            "STAR": prefImg64GIF + "ejI+pywitHjygTlPlypzHnjGgtnlQd1qhmJDXCzcFADs=",
            "STAR2": prefImg64GIF + "pjI+pBrDa2kPRzSCxTdV29h1ddIHalWmbmJrc6lLw+UJORctjC66kUQAAOw==",
            "TEXT": prefImg64GIF + "rjAN5y+kMnYJLAlrvxE/Jdhnakx3WhoSiZbLTdqZrm4Udenp4Lrdq+puBCgA7",
            "TOROTRON": prefImg64GIF + "pjI9pgKwHonxtUijdDVnTiGXJ1FkLx5Weo4Jhq4ipea7piJ55s7MbVQAAOw==",
            "TRASH": prefImg64GIF + "rjA2pxwicWlC0nicbrnyhfEHgg33ihIYnuZqsun1lGqNzHd+ufI5aFzEUAAA7",
            "TRASH2": prefImg64GIF + "qjA2pxwicWlC0nicbrnzlf3UUBE5k9mCItqrmu70r3J6x6d5xXrqTqCoAADs=",
            "TRASH3": prefImg64GIF + "pjA2pxwicWlC0norXzFh6yVFQGF3cNopR6Tyr+5gwym7zm9KzHDbkUQAAOw==",
            "UNDO": prefImg64GIF + "lRB6gi6e54nOyTothbFIzjn1IKHrNOZYoNa1sC4EiOdMn6VZnAQA7",
            "UNDO2": prefImg64GIF + "uRB6gi6f5EHOwtWjuyi9TySWX1UUS6WzbKFpu6KJtnFag9kEq5pmklwJOXipLAQA7",
            "USER": prefImg64GIF + "gjI+pAQ2LnINGNsostm9PDIYQdynkd5xSpJZV24lyUgAAOw==",
            "VECTOR": prefImg64GIF + "jhBGpee3/1oJIshOqnWzLqnlZJ5KhB5amOrYl0qCQTNUODRQAOw==",
            "VECTOR2": prefImg64GIF + "ohBGpecYNH1sLhUifs7nO7l1gyI1WCZ6joq7iuyJNOsPUiUOH5nRNAQA7",
            "WEB": prefImg64GIF + "qjI+pwK3WokNyMlrpyekG8HkLFIKPiUrat0WrWF6iCXE15uL1tKjPnygAADs=",
            "WRENCH": prefImg64GIF + "sjB+gi83a0IPRQHaA1Il331ncAlLktYlTRjlmu43t+Wr2md5g+lUq5vvsIgUAOw==",
            "XY": prefImg64GIF + "ojI+py30AEAzzVTMvvDR2HFVc6G2bdIIcaJmJVnoqa9U0nX726vROAQA7",
            "ZOOM": prefImg64GIF + "ojAOZx6YPmlNzNcvo0Rkjv0WheJGfWZUmN0Jg5b6n+Eh2bXdsjudjAQA7",
            "ZOOM_SIZE": prefImg64GIF + "pjI95oB0AHYJUzlQVMzRfvj0hB2LjFk1nqX7iMj5qh3Ywk3laGu8WVgAAOw==",
            "ZOOM_IN": prefImg64GIF + "qjAOZx6YPmltHSYrprHFzBIHMAkWa6KEfek6dK4GlddFPXLdxiHP6nigAADs=",
            "ZOOM_OUT": prefImg64GIF + "qjAOZx6YPmltHScpsjRLx6T1eFkHlN3YY2KwTqrWmeGl0R7rqjYdorygAADs=",
            "ZOOM_RESTORE": prefImg64GIF + "sRA6ZeK2vmlvTyBCrRYYuynDghklgOYnWiWXP1ZKZCdWOpsL6q9NzHyMBFQUAOw=="
        };
    })(); //END OBJ icos
    /** OBJECT ABSTRACTION:: CLOSURE::
    * OBJECT EXTERNAL STATIC PUBLIC CLOSURE AND SELF-EXECUTED.
    * RETAINS A REAL ACCOUNTANT HIDDEN IN WHICH IS BASED FOR OPERATE AN ALPHABET, RETURNING AN OBJECT WHICH CONTAINS METHODS TO ITERATE: 'next(),
    * prev(), rand(), ..', OTHERS INFORMATIONAL: 'first(), last(), current(), isset(), ..' AND ANY OCCASIONAL UTILITY ('reset(), setSource(..),
    * pos(), val(), ..').  THUS MAY BE OBTAINED NEXT ALPHABET LETTER, THE ABOVE, THE LAST USED, A RANDOM, ...
    * The source (alphabet) is retained in 'source' variable and it is possible changed to any array of symbols through the 'setSource(symbolArray)' method.
    * EXAMPLE:
    * <pre>
    * PolyArea.ABC.setSource(["&", "2", "Ñ"]);
    * PolyArea.ABC.next();
    * PolyArea.ABC.reset();
    * for(var i=0; i<PolyArea.ABC.source.length; i++){
    *   alert(PolyArea.ABC.next()+PolyArea.ABC.rand());
    *   if(i>28) break;
    * }
    * alert(PolyArea.ABC.isset("N"));
    * </pre>*/
    canvasShapes.ABC = (function () {
        var i = -1; //It is fully secret and internal, it not exists after the Object create.
        var abecedario = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var letra = function (source, novale) {
            i = ((i < source.length) && (i > -1)) ? i : 0;
            return source[i];
        };
        return {
            source: abecedario,
            first: function () { return letra(this.source, i = -1); },
            last: function () { return letra(this.source, i = (this.source.length - 1)); },
            next: function () { return letra(this.source, i++); },
            prev: function () { return letra(this.source, i--); },
            current: function () { return letra(this.source, i); },
            rand: function () { return letra(this.source, i = (Math.floor(Math.random() * this.source.length) + 1)); },
            /*iterator: function () { return this.next; },  //RETURN NEXT FUNCTION*/
            isset: function (simbolo) { return (this.source.indexOf(simbolo) > -1); },
            pos: function (simbolo) { return this.source.indexOf(simbolo); },
            val: function (posicion) { return (((posicion <= (this.source.length)) && (posicion > 0)) ? this.source[posicion - 1] : ""); },
            count: function () { return this.source.length; },
            setSource: function (source) { if (source) {
                this.source = source;
            } },
            reset: function () { i = -1; this.source = abecedario; }
        };
    })(); //END OBJ ABC
})(canvasShapes || (canvasShapes = {}));
// END MODULE: OBJECTS

/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.util.js' (METHODS) Others utility methods for the library, a few for engine Javascript compatibility.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: UTIL
(function (canvasShapes) {
    "use-strict";
    /** STATIC FUNCTION:: Checking if exists any object from this class, from 'constructor' method or through 'Singleton Pattern' (PolyArea.getInstance(conf)). */
    function isPolyAreaUsed() { return ((typeof (canvasShapes.PolyArea.count)).toUpperCase() === "NUMBER"); }
    canvasShapes.isPolyAreaUsed = isPolyAreaUsed;
    /**
    * STATIC FUNCTION:: This feature should only use before creating any object 'PolyArea'.
    * Check if the system is prepared to work with these objects types. Loop uses the singleton pattern.
    * Calculates a numerical total of cyclically (the number of times indicated) checking instances taken and their internal counters,
    * in case of a mismatch they will accumulate small miscalculations and fail the test.
    * At the end it performs a check of this total with the result that would be obtained [total == cont*(cont+1)]
    * Although the function is optimized, keep in mind that you must instantiate the number of times passed as a parameter 'PolyArea'
    * object; this consumes resources, so try not to overreach the passed counter; for example, more than 100,000 would be excessive
    * to verify that it really IS WORKING OK.
    * @return Return TRUE or FALSE. It can also returns 0 if it detects that there are prebuilt objects. */
    function isAllOk(cont) {
        //Operation Check singleton pattern. The first time it is created, other times it is instanced.
        cont = cont || 5;
        //LIMIT THE COUNTER
        cont = (cont > 100000) ? 100000 : ((cont < 1) ? 1 : cont);
        var utilizado = canvasShapes.isPolyAreaUsed();
        //AVOID DESTROY OBJECTS PREVIOUSLY CREATED
        if (utilizado) {
            alert("WARNING:: THIS METHOD MUST ONLY BE INVOKED IF THERE IS NO OBJECT 'PolyArea' CREATED. OTHERWISE IT WILL BE ELIMINATED !!");
            return false;
        }
        try {
            var creado = canvasShapes.PolyArea.count;
            var instanciado = canvasShapes.getCountInstances();
            var total = (utilizado ? (1 + creado + instanciado) : 0); //0
            for (var i = 0; i < cont; i++) {
                var poli = canvasShapes.getInstance();
                utilizado = canvasShapes.isPolyAreaUsed();
                creado = canvasShapes.PolyArea.count;
                instanciado = canvasShapes.getCountInstances();
                total += (utilizado ? (1 + creado + instanciado) : 0) + i; //total +=1+1+i //2, 5, 9, 14, 20
            }
            canvasShapes.destroyInstance();
            return (total === (cont * (cont + 1)));
        }
        catch (e) {
            return false;
        }
    }
    canvasShapes.isAllOk = isAllOk;
    /** Return a 'n' float number which is rounded to decimals indicated on 'decimals' option.
    * Method to format floating point numbers to 'x?' decimals */
    function toDecimals(floatNumber, decimals) {
        return parseFloat((Math.round(floatNumber * Math.pow(10, decimals)) / Math.pow(10, decimals)) + "");
    }
    canvasShapes.toDecimals = toDecimals;
    /** Function for set the download link the base64 image of the canvas */
    function downCanvasImage(canvasId) {
        try {
            var canvas = document.getElementById(canvasId);
            (canvas.parentNode).getElementsByTagName("a")[0].setAttribute("href", canvas.toDataURL());
        }
        catch (e) {
            alert("I can not find canvas with ID: " + canvasId);
        }
    }
    canvasShapes.downCanvasImage = downCanvasImage;
    /** Calculate how many pixels corresponding to each fraction of the canvas. (width based) */
    function calcFractionValor(canvas, fraccion) {
        return canvas.width / fraccion;
    }
    canvasShapes.calcFractionValor = calcFractionValor;
    /** Calculate the 'COMPUTED' value (FICTITIOUS) for 'x', it is util for drawing over canvas surface.
      * WARNING:: This value does not correspond to the real value for operations such areas, distances, perimeters, ... */
    function toXComputed(self, x) {
        //REAL VALUE = x
        //PROPORTION
        x *= self.proportionX;
        //INVERT
        x *= (self.invertX ? -1 : 1);
        //TRANSLATE
        var canvasW = self.getCanvas().width; //pixels
        if (self.coordinatesCentred) {
            x += canvasW / 2;
        }
        //COMPUTED VALUE (FICTITIOUS)
        return x;
    }
    canvasShapes.toXComputed = toXComputed;
    /** Calculate the 'COMPUTED' value (FICTITIOUS) for 'y', it is util for drawing over canvas surface.
      * WARNING:: This value does not correspond to the real value for operations such areas, distances, perimeters, ... */
    function toYComputed(self, y) {
        //REAL VALUE = y
        //PROPORTION
        y *= self.proportionY;
        //INVERT
        y *= (self.invertY ? -1 : 1);
        //TRANSLATE
        var canvasH = self.getCanvas().height; //pixels
        if (self.coordinatesCentred) {
            y += canvasH / 2;
        }
        //COMPUTED VALUE (FICTITIOUS)
        return y;
    }
    canvasShapes.toYComputed = toYComputed;
    /** Calculate the 'REAL' value for 'x' from a computed value.
     *  The returned value is the real value for operations such areas, distances, perimeters, ... */
    function fromXComputed(self, xComputed) {
        //COMPUTED VALUE = xComputed
        //UN-TRANSLATE
        var canvasW = self.getCanvas().width; //pixels
        if (self.coordinatesCentred) {
            xComputed -= canvasW / 2;
        }
        //INVERT
        xComputed *= (self.invertX ? -1 : 1);
        //PROPORTION
        xComputed /= self.proportionX;
        //REAL VALUE
        return xComputed;
    }
    canvasShapes.fromXComputed = fromXComputed;
    /** Calculate the 'REAL' value for 'y' from a computed value.
     *  The returned value is the real value for operations such areas, distances, perimeters, ... */
    function fromYComputed(self, yComputed) {
        //COMPUTED VALUE = yComputed
        //UN-TRANSLATE
        var canvasH = self.getCanvas().height; //pixels
        if (self.coordinatesCentred) {
            yComputed -= canvasH / 2;
        }
        //INVERT
        yComputed *= (self.invertY ? -1 : 1);
        //PROPORTION
        yComputed /= self.proportionY;
        //REAL VALUE
        return yComputed;
    }
    canvasShapes.fromYComputed = fromYComputed;
    //FUNCTIONS COMPATIBILITY CROSS-BROWSER FOR X and Y OF EVENTS
    /** (pageX, pageY): W3C: " Mouse position relative to the html document "
      * Gets an array with the values of X and Y, obtained the object 'event' passed as a parameter.
      * It is Cross-Browser and represents the coordinates where is located the mouse cursor relative to the HTML document. */
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
      * Gets an array with the values of X and Y, obtained through the 'event' object which is passed as a parameter.
      * It is Cross-Browser and represents the coordinates where is located the mouse cursor relative to the element referenced
      * by the event. (The 'target' in event). */
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
    //OTHERS UTILITY METHODS
    /** TRICK "polyfill" (aka "shim")
    * Alias of modern 'Object.create(...)'.
    * Javascript compatibility with old engines where there was no possibility of 'Object.create(..)' */
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
    //EXTERNAL FUNCTIONS AND THEY ARE NOT OBJECT BUILT-IN
    //-----------------------------------------
    /** Simulates the 'Array.indexOf (..)' behavior in older browsers that do not support (read IE <8) */
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
    /** Simulates the 'Array.contains (..)' behavior in older browsers that do not support (read IE <8) */
    if (!Array.contains) {
        Array.prototype.contains = function (arr, x) {
            return arr.filter(function (elem) { return elem === x; }).length > 0;
        };
    }
    /** Suppresses duplicate values in an array.
      * FROM: http://www.etnassoft.com/2011/06/24/array-unique-eliminar-valores-duplicados-de-un-array-en-javascript/
      * This converted to Christian World would:
      * function(element_to_look_if_I_add_to_the_array, index_of_the_element_I'm_looking, array_with_the_elements_already_added){
      *     return array_with_the_elements_already_added.indexOf(
      *         element_to_look_if_I_add_to_the_array,
      *         index_of_the_element_I'm_looking + 1
      *     ) < 0;
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

/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.shapes.js' (METHODS) Functions that are directly relevant to the drawing shapes.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: SHAPES
(function (canvasShapes) {
    "use-strict";
    //ADD AND CREATION OF SHAPES
    //POINTS
    /** Add coordinates as Primitive point to the array of points.
      * It also establishes proportions and invert, if exists. Returns the point after insertion.. */
    function addXY(self, x, y) {
        var p = new canvasShapes.PolyArea.Point(self);
        p.setX(x);
        p.setY(y);
        //ADD THIS POINT TO ARRAY, IF IT DOES NOT EXIST (IT DON'T CAN EXIST BECAUSE JUST CREATED IT!!)
        return addPoint(self, p);
    }
    canvasShapes.addXY = addXY;
    /** Add a point to points array, if it does not exist previously.
      * It also establishes proportions and invert. Returns the same point after insertion.
      * WARNING:: Don't call from this method to 'Point.toCollection()' as it would create recursion. */
    function addPoint(self, point) {
        //ADD THIS POINT TO ARRAY, IF IT DOES NOT EXIST
        var existe = false;
        for (var i = 0; i < self.getPoints().length; i++) {
            if (self.getPoints()[i].getId() === point.getId()) {
                existe = true;
            }
        }
        if (!existe && point.valido) {
            self.getPoints().push(point);
            //PROPORTION AND INVERT
            self.setPointsProportion(self.equalProportion);
            self.setPointsInversion();
        }
        return point;
    }
    canvasShapes.addPoint = addPoint;
    /** Create points from an array of X and Y coordinates and adds to the array of object points. Returns the array of points built.
      * The input array is expected in the form: XY=[ [x1, x1, ..., xn], ..., [y1, y2, ..., yn] ]
      * WARNING: Ensure that the coordinates are correct because this method has no possibility to check duplicity of the points created. */
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
    /** Create points from an array of pairs of point coordinates and added to the array of object points. Returns the array of points built.
      * The input array is expected in the form: XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]
      * WARNING: Ensure that the coordinates are correct because this method has no possibility to check duplicity of the points created. */
    function addPointsFromCoordinates(self, coordinates) {
        coordinates = coordinates || [];
        var points = [];
        for (var i = 0; i < coordinates.length; i++) {
            if (coordinates[i] && (coordinates[i].length > 1)) {
                points.push(addXY(self, coordinates[i][0], coordinates[i][1]));
            }
        }
        return points;
    }
    canvasShapes.addPointsFromCoordinates = addPointsFromCoordinates;
    /** Add the points passed to the array of object points.
      * The input array is expected in the form: XY = [point_1, point_2, ..., point_n]
      * WARNING: This method check the duplicity of the points created, if previously existed they will not be added. */
    function addPointsFromPointsArray(self, arrayPoints) {
        for (var i = 0; i < arrayPoints.length; i++) {
            addPoint(self, arrayPoints[i]); //en este método se realizan las comprobaciones //TODO:: podría realizarse mediante 'concat(..)'
        }
    }
    canvasShapes.addPointsFromPointsArray = addPointsFromPointsArray;
    //SEGMENTS
    /** Add a segment to the array of shapes, if not previously existed.
      * Also spreads the inclusion of their children and sets out possible proportions and investment.
      * Returns the segment after insertion.
      * ATTENTION :: No call from this method to 'Segment.toCollection()' method, as it would create recursion. */
    function addSegment(self, segment) {
        if (!segment) {
            return null;
        }
        //ADD THIS SEGMENT TO ARRAY, IF IT DOES NOT EXIST
        var existe = false;
        for (var i = 0; i < self.getSegments().length; i++) {
            if (self.getSegments()[i].getId() === segment.getId()) {
                existe = true;
            }
        }
        if (!existe && segment.valido) {
            self.getSegments().push(segment);
            //PROPORTION AND INVERT
            self.setPointsProportion(self.equalProportion);
            self.setPointsInversion();
        }
        return segment;
    }
    canvasShapes.addSegment = addSegment;
    /** Create a segment from two points.
      * As input expected two points and return the Segment built.
      * NOTE: This method does not check duplicity segment created, but YES the children (points), if previously existed don't will be added. */
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
    /** Create segments from an array of X and Y coordinates and adds to the array of object segments. Returns the array of segments built.
      * Keep in mind that the end point of a segment will be the start of the next segment and also be bound the end point of the last segment to
      * the starting point of the first segment (CIRCULAR CLOSURE).
      * The input array is expected in the form: XY=[ [x1, x1, ..., xn], ..., [y1, y2, ..., yn] ]
      * WARNING: Ensure that the coordinates are correct because this method has no possibility to check duplicity of the segments created. */
    function addSegmentsFromXY(self, arrayXY, closed) {
        return addSegmentsFromPointsArray(self, addPointsFromXY(self, arrayXY), closed);
    }
    canvasShapes.addSegmentsFromXY = addSegmentsFromXY;
    /** Create segments from an array of pairs of point coordinates and added to the array of object segments. Returns the array of segments built.
      * Keep in mind that the end point of a segment will be the start of the next segment and also be bound the end point of the last segment to
      * the starting point of the first segment (CIRCULAR CLOSURE).
      * The input array is expected in the form: XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]
      * WARNING: Ensure that the coordinates are correct because this method has no possibility to check duplicity of the segments created. */
    function addSegmentsFromCoordinates(self, coordinates, closed) {
        return addSegmentsFromPointsArray(self, addPointsFromCoordinates(self, coordinates), closed);
    }
    canvasShapes.addSegmentsFromCoordinates = addSegmentsFromCoordinates;
    /** Create segments from an points array and added to the array of object segments, Keep in mind that the end point of a segment will be the
      * start of the next segment, and (if 'closed'==TRUE [by default TRUE]) also be bound the end point of the last segment to
      * the starting point of the first segment (CIRCULAR CLOSURE). Returns the array of segments built.
      * The input array is expected in the form: XY=[ point_1, point_2, ..., point_n ].
      * NOTE: This method does not check duplicity segment created, but YES the children (points), if previously existed don't will be added. */
    function addSegmentsFromPointsArray(self, arrayPoints, closed) {
        if (!arrayPoints || (arrayPoints.length === 0)) {
            return [];
        }
        closed = ((typeof (closed)).toUpperCase() === "UNDEFINED") ? true : closed;
        var segments = [];
        for (var i = 1; i < arrayPoints.length; i++) {
            var segment = addSegmentFromPoints(self, arrayPoints[i - 1], arrayPoints[i]);
            segments.push(segment);
            //CHECK THAT THE POINT OF LAST SEGMENT HAVE ANOTHER ITEM ON DIFFERENT COORDINATE THE FIRST SEGMENT
            var distinto = (segment.getP2().getX() !== segments[0].getP1().getX()) ||
                (segment.getP2().getY() !== segments[0].getP1().getY());
            //CIRCULAR CLOSURE
            if (closed && (i === (arrayPoints.length - 1)) && distinto) {
                segments.push(addSegmentFromPoints(self, segment.getP2(), segments[0].getP1()));
            }
        }
        return segments;
    }
    canvasShapes.addSegmentsFromPointsArray = addSegmentsFromPointsArray;
    /** Add segments from a segments array to segments array this object.
      * The input array is expected in the form: XY=[ segment_1, segment_2, ..., segment_n ]
      * WARNING: This method check the duplicity of the segments created (but not their nature), if previously existed they will not be added. */
    function addSegmentsFromSegmentsArray(self, arraySegments) {
        for (var i = 0; i < arraySegments.length; i++) {
            addSegment(self, arraySegments[i]); //en este método se realizan las comprobaciones y propagación a sus hijos
        }
    }
    canvasShapes.addSegmentsFromSegmentsArray = addSegmentsFromSegmentsArray;
    /** Divide a segment into two segments with a common point. Suppresses the segment passed as a parameter.
      * DO NOT USE IN POLYGON SEGMENTS */
    function divideSegmentFromPoint(self, segment, newPoint) {
        if (!segment || !newPoint) {
            return null;
        }
        var firstSeg = addSegmentFromPoints(self, segment.getP1(), newPoint);
        var lastSeg = addSegmentFromPoints(self, newPoint, segment.getP2());
        //WE CHECK TO SEE IF BELONGS TO AN EXISTING POLÍGONO
        self.getPolygons().forEach(function (p) {
            p.getChildren().forEach(function (s) {
                if (s.getId() === segment.getId()) {
                    p.addSegment(firstSeg);
                    p.addSegment(lastSeg);
                }
            });
        });
        //DELETE THE LAST SEGMENT (we will split into two) but not their points
        segment.remove(false); //self.removeSegment(segment, false);
    }
    canvasShapes.divideSegmentFromPoint = divideSegmentFromPoint;
    //POLYGONS
    /** Add a polygon to shapes array, if not previously existed.
      * It also spreads the inclusion of their children and sets out possible proportions and invert. Returns the polygon after insertion.
      * WARNING:: Don't call from this method to 'Polygon.toCollection()' method, as it would create recursion. */
    function addPolygon(self, polygon) {
        if (!polygon) {
            return null;
        }
        //ADD THIS POLYGON TO ARRAY, IF NOT EXISTED
        var existe = false;
        for (var i = 0; i < self.getPolygons().length; i++) {
            if (self.getPolygons()[i].getId() === polygon.getId()) {
                existe = true;
            }
        }
        if (!existe && polygon.valido) {
            self.getPolygons().push(polygon);
            //PROPORTION AND INVERT
            self.setPointsProportion(self.equalProportion);
            self.setPointsInversion();
        }
        return polygon;
    }
    canvasShapes.addPolygon = addPolygon;
    /** Create a polygon from an array of X and Y coordinates and adds to the array of polygons of this object, is recursive and adds all children
      * created if not exist previously. The parameter 'closed' indicates whether to close the polygon with a final segment that will be created
      * from the endpoint to the starting point, thus closing the geometric shape built. Returns the polygon created.
      * The input array is expected in the form: XY=[ [x1, x1, ..., xn], ..., [y1, y2, ..., yn] ]
      * WARNING: Ensure that the coordinates are correct because this method has no possibility to check duplicity of the segments created. */
    function addPolygonFromXY(self, arrayXY, closed) {
        var polygon = new canvasShapes.PolyArea.Polygon(self);
        //RESET LETTERS
        canvasShapes.ABC.reset();
        polygon.setChildren(addSegmentsFromXY(self, arrayXY, closed));
        addPolygon(self, polygon);
        return polygon;
    }
    canvasShapes.addPolygonFromXY = addPolygonFromXY;
    /** Creates a polygon from an array of coordinate pairs of points and adds to the array of polygons of this object, is recursive and adds all children
      * created if not exist previously. The parameter 'closed' indicates whether to close the polygon with a final segment that will be created
      * from the endpoint to the starting point, thus closing the geometric shape built. Returns the polygon created.
      * The input array is expected in the form: XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]
      * WARNING: Ensure that the coordinates are correct because this method has no possibility to check duplicity of the segments created. */
    function addPolygonFromCoordinates(self, coordinates, closed) {
        //if(!coordinates || (coordinates.length < 3)) return false;
        var polygon = new canvasShapes.PolyArea.Polygon(self);
        //RESET LETTERS
        canvasShapes.ABC.reset();
        polygon.setChildren(addSegmentsFromCoordinates(self, coordinates, closed));
        addPolygon(self, polygon);
        return polygon;
    }
    canvasShapes.addPolygonFromCoordinates = addPolygonFromCoordinates;
    /** This method is equal to 'addPolygonFromCoordinates(..)' but the coordinates are expected in multiple polygons format:
     * XY=[ [[x1, y1], [x2, y2], ..., [xn, yn]], [[xx1, yy1], [xx2, yy2], ..., [xxn, yyn]], ... ] */
    function addPolygonsFromCoordinates(self, coordinates, closed) {
        var polygons = [];
        for (var i = 0; i < coordinates.length; i++) {
            polygons.push(addPolygonFromCoordinates(self, coordinates[i], closed));
        }
        return polygons;
    }
    canvasShapes.addPolygonsFromCoordinates = addPolygonsFromCoordinates;
    /** Creates a polygon from an points array and adds to polygons array of this object, is recursive and adds all children
      * created if not exist previously. The parameter 'closed' indicates whether to close the polygon with a final segment that will be created
      * from the endpoint to the starting point, thus closing the geometric shape built. Returns the polygon created.
      * The input array is expected in the form: XY=[ point_1, point_2, ..., point_n ]
      * WARNING: This method don't check the duplicity of the polygons created, but YES the children (points), if previously existed they will not be added. */
    function addPolygonFromPointsArray(self, arrayPoints, closed) {
        var polygon = new canvasShapes.PolyArea.Polygon(self);
        //RESET LETTERS
        canvasShapes.ABC.reset();
        polygon.setChildren(addSegmentsFromPointsArray(self, arrayPoints, closed));
        addPolygon(self, polygon);
        return polygon;
    }
    canvasShapes.addPolygonFromPointsArray = addPolygonFromPointsArray;
    /** Creates a polygon from an segments array and adds to polygons array of this object, is recursive and adds all children
      * created if not exist previously. The parameter 'closed' indicates whether to close the polygon with a final segment that will be created
      * from the endpoint to the starting point, thus closing the geometric shape built. Returns the polygon created.
      * The input array is expected in the form: XY=[ segment_1, segment_2, ..., segment_n ]
      * WARNING: This method don't check the duplicity of the polygons created, but YES the children (points and segments), if previously existed
      * they will not be added. */
    function addPolygonFromSegmentsArray(self, arraySegments, closed) {
        //if(!arraySegments && (arraySegments.length==0)) return false;
        closed = ((typeof (closed)).toUpperCase() === "UNDEFINED") ? true : closed;
        var polygon = new canvasShapes.PolyArea.Polygon(self);
        for (var i = 0; i < arraySegments.length; i++) {
            polygon.getChildren().push(arraySegments[i]);
            //CHECK THAT THE POINT OF LAST SEGMENT HAVE ANOTHER ITEM ON DIFFERENT COORDINATE THE FIRST SEGMENT
            var distinto = (arraySegments[i].getP2().getX() !== polygon.getChildren()[0].getP1().getX()) || (arraySegments[i].getP2().getY() !== polygon.getChildren()[0].getP1().getY());
            if (closed && (i === (arraySegments.length - 1)) && distinto) {
                polygon.getChildren().push(addSegmentFromPoints(self, arraySegments[i].getP2(), polygon.getChildren()[0].getP1()));
            }
        }
        addPolygon(self, polygon);
        return polygon;
    }
    canvasShapes.addPolygonFromSegmentsArray = addPolygonFromSegmentsArray;
    /** Add polygons from polygons array to polygons array this object.
      * The input array is expected in the form: XY=[ polygon_1, polygon_2, ..., polygon_n ]
      * WARNING: This method check the duplicity of the polygons created (but not their nature), if previously existed they will not be added. */
    function addPolygonsFromPolygonsArray(self, arrayPolygons) {
        for (var i = 0; i < arrayPolygons.length; i++) {
            addPolygon(self, arrayPolygons[i]); //this method is performed checks and spread their children
        }
    }
    canvasShapes.addPolygonsFromPolygonsArray = addPolygonsFromPolygonsArray;
    //END SHAPES CREATION
    //SHAPES HANDLING
    /** Top level method. Grouping polygons. He must pass the PolyArea object. */
    function shapesGrouped(self) {
        if (!(self instanceof canvasShapes.PolyArea)) {
            self = this;
        } //when called through the 'bind()' super-method.
        var polsSel = getSelected(self, "Polygon");
        var coords = [];
        var newPol = null;
        var i = 0;
        var arr = null;
        //POLYGONS
        if (polsSel.length > 1) {
            for (i = 0; i < polsSel.length; i++) {
                //DELETE THE LAST SEGMENT TO FIT NEW POLYGONS
                if (polsSel[i].getChildren().length > 0) {
                    polsSel[i].getChildren()[polsSel[i].getChildren().length - 1].remove(true);
                }
                arr = polsSel[i].coordinates();
                coords = coords.concat(arr);
                coords.pop(); //DELETE THE LAST SEGMENT TO FIT NEW POLYGONS
                polsSel[i].remove(true);
            }
            //GROUPED SELECTED POLYGONS ALL IN ONE
            if (coords.length > 0) {
                newPol = addPolygonFromCoordinates(self, coords, true);
                polsSel = [newPol];
            }
        }
        var segsSel = getSelected(self, "Segment");
        var pointsSel = getSelected(self, "Point");
        coords = [];
        //SEGMENTS
        if (segsSel.length > 0) {
            //FIRST GET THE COORDINATES OF SEGMENTS
            for (i = 0; i < segsSel.length; i++) {
                arr = segsSel[i].coordinates();
                coords = coords.concat(arr);
            }
            if (polsSel.length > 0) {
                //GROUPED SELECTED SEGMENTS TO A SELECTED POLYGON
                if (coords.length > 0) {
                    //concatenates the segments coordinates with the polygon coordinates
                    arr = polsSel[0].coordinates();
                    arr.pop(); //DELETE THE LAST SEGMENT TO FIT NEW SEGMENTS
                    coords = coords.concat(arr);
                    polsSel[0].remove(true);
                    newPol = addPolygonFromCoordinates(self, coords, true);
                    polsSel = [newPol];
                }
            }
            else {
                //CONVERT SEGMENTS IN A POLYGON
                newPol = addPolygonFromSegmentsArray(self, segsSel, true);
                polsSel = [newPol];
            }
        }
        //canvasShapes.redraw();
        self.draw();
    }
    canvasShapes.shapesGrouped = shapesGrouped;
    /** Common function to calculate the distance between two points ('PolyArea.Point') */
    function distanceP1P2(p1, p2) {
        //PYTHAGORAS. HYPOTENUSE
        var perimetro = Math.pow(Math.pow(p1.getX() - p2.getX(), 2) + Math.pow(p1.getY() - p2.getY(), 2), 1 / 2);
        return Math.abs(parseFloat(perimetro + ""));
    }
    canvasShapes.distanceP1P2 = distanceP1P2;
    /** Common function to calculate the average distance between two points ('PolyArea.Point'), that is, the center of a segment.
      * Return a point with his coordinates centred. */
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
    /** Static Method to draw by hand. It is usually called from the event, having the 'freedraw' option enabled. */
    function drawPointsFreeDraw(self, x, y) {
        if ((self instanceof canvasShapes.PolyArea) && self.mousedown && self.freeDraw && self.freeDrawON) {
            var ctx = self.getContext();
            x = (Math.ceil(x / 2) * 2) - 2;
            y = (Math.ceil(y / 2) * 2) - 2;
            x = canvasShapes.toXComputed(self, x);
            y = canvasShapes.toYComputed(self, y);
            ctx.beginPath();
            ctx.strokeStyle = self.freeDrawColor;
            ctx.fillStyle = self.freeDrawColor;
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
    /** Static method to find a point with the same coordinates as another passed as a parameter. */
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
    //COORDINATES MANAGEMENT
    /** Synonymous with 'getCoordinates()'
      * GET AN ARRAY WITH ALL PAIR X and Y OF POINTS OF ALL OBJECTS.
      * Returns the coordinates of all the points involved in this object.
      * The output returned array will be delivered in the form XY = [ [x1, y1], [x2, y2], ..., [xn, yn] ]
      * @see getCoordinates()
      */
    function coordinates(self, withProportion, withInvert) {
        return self.coordinates(withProportion, withInvert);
    }
    canvasShapes.coordinates = coordinates;
    /** Synonymous with 'coordinates()'
      * Returns the coordinates of all the points involved in this object.
      * The output returned array will be delivered in the form XY: XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]
      * @see coordinates() */
    function getCoordinates(self) {
        return coordinates(self, true, true);
        //return this._children.Points.slice(0);  //clona el array
    }
    canvasShapes.getCoordinates = getCoordinates;
    /** <del>RECURSIVE METHOD !!</del>
      * SET THE COORDINATES PASSED AS PARAMETER. ATTENTION!! ELIMINATES THE ABOVE COORDINATES !!
      * The coordinates must be in the format: XY=[ [[x1, y1], [x2, y2], ..., [xn, yn]], [...] ]
      * This method will create a polygon (opened or closed) with their Points and Segments. */
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
    /** Synonymous with 'getCoordinatesXY()'
      * GET AN ARRAY WITH ALL COORDINATES X and Y OF POINTS TO POLYGONS.
      * Convert an coordinates array (x,y) of points of the segments in an array with all the coordinates separating x and y,
      * this is, it returns an array with two elements: an array of x, an array of y.
      * This way is more prepared for the function 'area', simply by calling the function this way:
      * var XY=coordinatesXY();
      * var area = area(XY[0], XY[1]);
      * The array with which work is expected to be of the form: xy = [ [x1, y1], [x2, y2], ..., [xn, yn] ]
      * The output returned array will be delivered in the form XY = [ [x1, x2, ..., xn], [y1, y2, ..., yn] ]
      * @see getCoordinatesXY()
      */
    function coordinatesXY(self) {
        return self.coordinatesXY();
    }
    canvasShapes.coordinatesXY = coordinatesXY;
    /** Synonymous of 'coordinatesXY()'
      * Returns the coordinates of all the points involved in this object with the form: XY=[ [x1, x2, ..., xn], [y1, y2, ..., yn] ]
      * @see coordinatesXY() */
    function getCoordinatesXY(self) {
        return coordinatesXY(self);
    }
    canvasShapes.getCoordinatesXY = getCoordinatesXY;
    /** SET UP THE COORDINATES PASSED AS PARAMETER. ATTENTION!! ELIMINATES THE ABOVE COORDINATES !!
      * The coordinates passed must be in the format: XY=[ [x1, x2, ..., xn], [y1, y2, ..., yn] ]
      * This method will create a polygon (opened or closed) with their Points and Segments. */
    function setCoordinatesXY(self, XsYs, closed) {
        resetShapes(self);
        addPolygonFromXY(self, XsYs, closed);
        //this.sanitize();
    }
    canvasShapes.setCoordinatesXY = setCoordinatesXY;
    /** Returns the largest number among all the coordinates of the array (with the form XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]) of all the
      * points involved in this object.
      * The parameter 'index' specifies whether to compare only the 'X' (0) or 'Y' (1), or both (-1). Default both
      * The parameter 'absolute = false' specifies whether signs or consider only absolute values (absolute = true), default TRUE. */
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
    /** Returns the smaller number among all the coordinates of the array (en la forma XY=[ [x1, y1], [x2, y2], ..., [xn, yn] ]) of all the
      * points involved in this object.
      * The parameter 'index' specifies whether to compare only the 'X' (0) or 'Y' (1), or both (-1). Default both
      * The parameter 'absolute = false' specifies whether signs or consider only absolute values (absolute = true), default TRUE. */
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
    /** PUBLIC METHOD NEED, BUT ONLY PRIVATE USE. USE ONLY TO INITIALIZE
      * Used in methods 'prepare(..)', 'draw(..)', and others.. Coordinate axes centred on the canvas */
    function setCoordinatesCentred(self, centred) {
        self.coordinatesCentred = centred;
        if (centred) {
            //MOVE THE COORDINATES TO CANVAS CENTER
            self.getContext().translate((self.getCanvas().width / 2) - 0.5, (self.getCanvas().height / 2) - 0.5);
        }
        else {
            //RESTORE THE TRANSLATION OF COORDINATES CANVAS CENTER TO THE ORIGIN 0.0
            self.getContext().translate(-(self.getCanvas().width / 2) + 0.5, -(self.getCanvas().height / 2) + 0.5);
        }
        self.getContext().save();
    }
    canvasShapes.setCoordinatesCentred = setCoordinatesCentred;
    /** Commutes translation (CENTERING) of the coordinate axes to the canvas center or the point (0,0), depending on the variable 'coordinatesCentred' */
    function toggleCentered(self) {
        if (self.coordinatesCentred) {
            //RESTORE THE TRANSLATION OF COORDINATES CANVAS CENTER TO THE ORIGIN 0.0
            toDescentered(self);
        }
        else {
            //MOVE THE COORDINATES TO CANVAS CENTER
            toCentered(self);
        }
    }
    canvasShapes.toggleCentered = toggleCentered;
    /** Translates (CENTRED) the center of the coordinate axes to the canvas center, if they were not already. */
    function toCentered(self) {
        if (!self.coordinatesCentred) {
            //MOVE THE COORDINATES TO CANVAS CENTER
            self.getContext().translate((self.getCanvas().width / 2) - 0.5, (self.getCanvas().height / 2) - 0.5);
            self.getContext().save();
            self.coordinatesCentred = true;
        }
    }
    canvasShapes.toCentered = toCentered;
    /** Translates (DESCENTERED) the center of the coordinate axes to the point (0,0) of the canvas, if they were not already. */
    function toDescentered(self) {
        if (self.coordinatesCentred) {
            //RESTORE THE TRANSLATION OF COORDINATES CANVAS CENTER TO THE ORIGIN 0.0
            self.getContext().translate(-0.5, -0.5);
            self.getContext().save();
            self.coordinatesCentred = false;
        }
    }
    canvasShapes.toDescentered = toDescentered;
    /** Search and returns the elements that are selected.
      * It can be searched by polygons, segments or points or all at once, depending on the passed parameter.
      * @param self <canvasShapes.PolyArea>
      * @param shapeType <string> [DEFAULT: "POLYGON"] Shape type string: "POLYGON", "SEGMENT", "POINT" or "ALL". */
    function getSelected(self, shapeType) {
        shapeType || (shapeType = "POLYGON");
        shapeType = shapeType.toUpperCase();
        shapeType = (shapeType.substr(-1, 1) === "S") ? shapeType.substr(0, shapeType.length - 1) : shapeType;
        var shapesSelected = [];
        var i = 0;
        if ((shapeType === "POLYGON") || (shapeType === "ALL")) {
            for (i = 0; i < self.getPolygons().length; i++) {
                if (self.getPolygons()[i].selected) {
                    shapesSelected.push(self.getPolygons()[i]);
                }
            }
        }
        if ((shapeType === "SEGMENT") || (shapeType === "ALL")) {
            for (i = 0; i < self.getSegments().length; i++) {
                if (self.getSegments()[i].selected) {
                    shapesSelected.push(self.getSegments()[i]);
                }
            }
        }
        if ((shapeType === "POINT") || (shapeType === "ALL")) {
            for (i = 0; i < self.getPoints().length; i++) {
                if (self.getPoints()[i].selected) {
                    shapesSelected.push(self.getPoints()[i]);
                }
            }
        }
        return shapesSelected;
    }
    canvasShapes.getSelected = getSelected;
    /** Mark as "selected" to all shapes passed as parameter (must be an shapes array).
      * If it is provided "TRUE" as a second parameter, then modify the rest, otherwise not.
      * @param self <canvasShapes.PolyArea>
      * @param shapes <Array> It should be an shapes array (polygons, segments or points)
      * @param only <Boolean> "True" to select the rest, if "False" the rest will remain as they are
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
    /** Mark as "select" all existing shapes.
      * @param self <canvasShapes.PolyArea>
      * @see selectShapes()
      * @see unSelectShapes()
      * @see unSelectShapesAll() */
    function selectShapesAll(self) {
        if (!(self instanceof canvasShapes.PolyArea)) {
            self = this;
        } //when called through the 'bind()' super-method.
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
    /** Mark as "unselected" all shapes passed as parameter (must be an shapes array).
      * If it is provided "TRUE" as a second parameter, then modify the rest, otherwise not.
      * @param self <canvasShapes.PolyArea>
      * @param shapes <Array> It should be an shapes array (polygons, segments or points)
      * @param only <Boolean> "True" to select the rest, if "False" the rest will remain as they are
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
    /** Mark as "unselect" all existing shapes.
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
    /** Check for the figure passed as parameter into shapes arrays */
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
    //DESTROY SHAPES
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

/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.events.js' (METHODS) Events implemented in the "PolyArea" canvas objects.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: EVENTS
(function (canvasShapes) {
    "use-strict";
    /** EVENT COMPATIBILIZER (CROSS-BROWSER)
      * where 'elem' is the item you want to set the listening, 'enventType' is the string of event type (no prefix 'on') and
      * 'handler' is the function to run. <del>The 'Util' object is returned to allow 'chaining'</del> */
    function addEvent(elem, eventType, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(eventType, handler, false);
        }
        else if (elem.attachEvent) {
            elem.attachEvent('on' + eventType, handler);
        }
        else {
            alert("NO EVENTS MAY BE ATTACHED TO ELEMENT");
        }
        //return this;
    }
    canvasShapes.addEvent = addEvent;
    /** EVENT COMPATIBILIZER (CROSS-BROWSER)
     * where 'elem' is the item you want to remove the listening, 'enventType' is the string of event type (no prefix 'on') and
     * 'handler' is the target function to remove. <del>The 'Util' object is returned to allow 'chaining'</del> */
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
    /** EVENT COMPATIBILIZER (CROSS-BROWSER)
      * where 'elem' is the item that you want to find out if there has this event, and 'enventType' is the string of event
      * type (no prefix 'on') to prove its existence. */
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
            alert("'canvas' NO ALLOWED");
            return;
        }
        //CALCULATING X and Y COORDINATES PROPORTIONATE TO THE CANVAS COORDINATES
        x = ((x * 1 / self.proportionX) - ((canvas.width / 2) * (1 / self.proportionX))) * (self.invertX ? -1 : 1);
        y = ((y * 1 / self.proportionY) - ((canvas.height / 2) * (1 / self.proportionY))) * (self.invertY ? -1 : 1);
        var shapes = null;
        var p = new canvasShapes.PolyArea.Point(self);
        p.setX(x);
        p.setY(y);
        //POLYGONS
        shapes = canvasShapes.getSelected(self, "Polygon");
        if (shapes && (shapes.length > 0)) {
            shapes[0].addPoint(p);
        }
        else {
            //SEGMENTS
            shapes = canvasShapes.getSelected(self, "Segment");
            if (shapes && (shapes.length > 0)) {
                canvasShapes.divideSegmentFromPoint(self, shapes[0], p);
            }
            else {
                //POINTS
                self.addPoint(p);
            }
        }
        //CANVAS REDRAW
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
            alert("'canvas' NO ALLOWED");
            return;
        }
        //TOOLTIP TOLERANCE FOR THAT IT NOT LEAVE THE CANVAS
        var toleranciaX = (x > (canvas.width / 2)) ? 50 : 0;
        var toleranciaY = (y > (canvas.height / 2)) ? 50 : 0;
        //CALCULATING X and Y COORDINATES PROPORTIONATE TO THE CANVAS COORDINATES
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
                if (encontrado) {
                    break;
                }
            }
        }
        else {
            encontrado = true;
        }
        var difX, difY;
        //SHAPES DROP
        if (self.mouseDrop && self.mousedown && self.shapesDrop.Point) {
            //VERIFY MOVES ON ANOTHER POINT
            var p = canvasShapes.getPointFromCoordinates(self, self.shapesDrop.Point, fraccionX, fraccionY);
            //if(p) alert(p+" :: "+x+", "+y+" - "+fraccionX+", "+fraccionY);
            if (p) {
                if (self.oldCoordinates) {
                    var oldX = self.oldCoordinates[0][0];
                    var oldY = self.oldCoordinates[0][1];
                    self.shapesDrop.Point.moveTo(oldX, oldY);
                }
                var seg = canvasShapes.addSegmentFromPoints(self, self.shapesDrop.Point, p);
                seg.setSelected(false);
                self.shapesDrop.Point = null;
                self.oldCoordinates = null;
                self.draw();
            }
            else {
                self.shapesDrop.Point.setX(x);
                self.shapesDrop.Point.setY(y);
                self.shapesDrop.Point.selected = true;
            }
        }
        else if (self.mouseDrop && self.mousedown && self.shapesDrop.Segment) {
            //MOVE THE SEGMENT TO THESE COORDINATES
            self.shapesDrop.Segment.moveTo(x, y);
            self.shapesDrop.Segment.selected = true;
        }
        else if (self.mouseDrop && self.mousedown && self.shapesDrop.Polygon) {
            //MOVE THE POLYGON TO THESE COORDINATES
            self.shapesDrop.Polygon.moveTo(x, y);
            self.shapesDrop.Polygon.selected = true;
        }
        //CANVAS REDRAW
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
            alert("'canvas' NOT ALLOWED");
            return;
        }
        //CALCULATING X and Y COORDINATES PROPORTIONATE TO THE CANVAS COORDINATES
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
            if (canvasShapes.drawPointsFreeDraw(self, x, y)) {
                return false;
            }
        }
        for (var shapes in self.getChildren()) {
            for (var i = 0; i < self.getChildren()[shapes].length; i++) {
                var shape = self.getChildren()[shapes][i];
                var tooltipXY = shape.getTooltipXY();
                if (!encontrado &&
                    (x < (tooltipXY[0] + fraccionX / 2)) && (x > (tooltipXY[0] - fraccionX / 2)) &&
                    (y < (tooltipXY[1] + fraccionY / 2)) && (y > (tooltipXY[1] - fraccionY / 2))) {
                    self.shapesDrop[shapes.substring(0, shapes.length - 1)] = shape;
                    self.oldCoordinates = shape.coordinates();
                    encontrado = true;
                    self.mousedown = true;
                    //UNSELECT ALL SHAPES IF YOU AREN'T PRESSED 'CTR' KEY
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
                if (encontrado) {
                    break;
                }
            }
            if (encontrado) {
                break;
            }
        }
    }
    canvasShapes.mouseDownEvent = mouseDownEvent;
    //MOUSE-UP
    function mouseUpEvent(event) {
        var canvas = event.target;
        var self = canvas.getPolyArea();
        //self.mousedown=false;
        self.mouseup = true;
        if (self.freeDraw) {
            self.freeDrawON = false;
        }
    }
    canvasShapes.mouseUpEvent = mouseUpEvent;
    //MOUSE-OUT
    function mouseOutEvent(event) {
        var canvas = event.target;
        var self = canvas.getPolyArea();
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
    //ENABLE SHAPES EVENTS CONTROLS
    /** Allows Point events */
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
    /** Disallows Point events */
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

/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.draw.js' (METHODS) Drawing canvas methods, among others, the coordinates axes.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: DRAW
(function (canvasShapes) {
    "use-strict";
    /** Draw a grid of squares */
    function drawGrid(self, grid) {
        var canvas = self.getCanvas();
        var ctx = self.getContext();
        var fraccion = self.fractionGrid;
        grid = (grid && (fraccion > 0)) || (self.grid && (fraccion > 0));
        var canvasW = canvas.width; //pixels
        var canvasH = canvas.height; //pixels
        var iniW = (canvas.width - canvas.height * 0.95) / 2;
        var iniH = (canvas.height - canvas.height * 0.95) / 2;
        if (grid) {
            //VERTICALS
            var decima = canvasW * fraccion;
            ctx.fillStyle = 'hotpink';
            var i;
            for (i = (canvasW / 2) + 0.5; i <= (canvasW - iniW); i += decima) {
                ctx.fillRect(i, iniH, 0.2, canvasH - iniH); //EJE Y RIGHT
            }
            for (i = (canvasW / 2) + 0.5; i >= iniW; i -= decima) {
                ctx.fillRect(i, iniH, 0.2, canvasH - iniH); //EJE Y LEFT
            }
            //HORIZONTALS
            decima = canvasH * fraccion;
            for (i = (canvasH / 2) + 0.5; i <= (canvasH - iniH); i += decima) {
                ctx.fillRect(iniW, i, canvasW - iniW, 0.2); //EJE X BOTTOM
            }
            for (i = (canvasH / 2) + 0.5; i >= iniH; i -= decima) {
                ctx.fillRect(iniW, i, canvasW - iniW, 0.2); //EJE X UP
            }
            //CENTER
            ctx.arc(canvasW / 2 + 1, canvasH / 2 + 1, 2, 0, Math.PI * 2, true);
            ctx.fill();
        }
        return ctx;
    }
    canvasShapes.drawGrid = drawGrid;
    /** Draw axes */
    function drawAxes(self, axes) {
        var canvas = self.getCanvas();
        var ctx = self.getContext();
        axes = axes || self.axes;
        var canvasW = canvas.width; //pixels
        var canvasH = canvas.height; //pixels
        var iniW = canvas.width - canvas.width * 0.95;
        var iniH = canvas.height - canvas.height * 0.95;
        if (axes) {
            canvasShapes.updateAxesText(self);
            ctx.fillStyle = 'deepPink';
            ctx.fillRect(iniW, canvasH / 2 + 0.5, canvasW - iniW, 0.5); // X-AXE
            ctx.fillRect(canvasW / 2 + 0.5, iniH, 0.5, canvasH - iniH); // Y-AXE
        }
        return ctx;
    }
    canvasShapes.drawAxes = drawAxes;
    /** Draw the axes text */
    function updateAxesText(self) {
        var canvas = self.getCanvas();
        var ctx = self.getContext();
        var canvasW = canvas.width; //pixels
        var canvasH = canvas.height; //pixels
        var iniW = canvas.width - canvas.width * 0.95;
        var iniH = canvas.height - canvas.height * 0.95;
        if (self.axes) {
            //CALCULATES THE MAXIMUM VALUE FROM 'X' and 'Y' FOR THE AXES TEXT
            var maxPoint = canvasShapes.getCoordinatesMax(self, -1, true);
            var maxPointX = self.equalProportion ? canvasShapes.getCoordinatesMax(self, 0, true) : maxPoint;
            var maxPointY = self.equalProportion ? canvasShapes.getCoordinatesMax(self, 1, true) : maxPoint;
            maxPointX = canvasShapes.toDecimals(maxPointX, self.decimals);
            maxPointY = canvasShapes.toDecimals(maxPointY, self.decimals);
            //X TEXT [maxSize]
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
            //HOW WILL NOT WORK ON CANVAS \u0010\u0013
            ctx.font = "italic 8px Calibri";
            ctx.strokeText("[ " + maxPointX + " ]", canvasW - iniW, canvasH / 2 + 10);
            ctx.strokeText("[ " + maxPointY + " ]", canvasW / 2 + 14, iniH / 2);
        }
        return ctx;
    }
    canvasShapes.updateAxesText = updateAxesText;
    /** Draw all the canvas points created. Also it serves to update values. */
    function drawPoints(self) {
        for (var i = 0; i < self.getChildren().Points.length; i++) {
            self.getChildren().Points[i].draw();
        }
    }
    canvasShapes.drawPoints = drawPoints;
    /** Draw all the canvas segments created. Also it serves to update values. */
    function drawSegments(self) {
        for (var i = 0; i < self.getChildren().Segments.length; i++) {
            self.getChildren().Segments[i].draw();
        }
    }
    canvasShapes.drawSegments = drawSegments;
    /** Draw all the canvas polygons created. Also it serves to update values. */
    function drawPolygons(self) {
        for (var i = 0; i < self.getChildren().Polygons.length; i++) {
            self.getChildren().Polygons[i].draw();
        }
    }
    canvasShapes.drawPolygons = drawPolygons;
    /** Draw all the canvas shapes created. Also it serves to update values. */
    function drawShapes(self) {
        for (var s in self.getChildren()) {
            if (self.getChildren().hasOwnProperty(s)) {
                for (var i = 0; i < self.getChildren()[s].length; i++) {
                    self.getChildren()[s][i].draw();
                }
            }
        }
    }
    canvasShapes.drawShapes = drawShapes;
    /** All Canvas redraw. Also it serves to update values. */
    function redraw(self) {
        if (!self) {
            self = canvasShapes.getInstance();
        }
        if (!self) {
            return false;
        }
        self.canvasClean();
        if (self.grid && !self.gridFront) {
            canvasShapes.drawGrid(self, self.grid);
        }
        if (self.axes && !self.axesFront) {
            canvasShapes.drawAxes(self, self.axes);
        }
        self.setPointsProportion(self.deformation);
        self.setPointsInversion();
        canvasShapes.drawShapes(self);
        if (self.grid && self.gridFront) {
            canvasShapes.drawGrid(self, self.grid);
        }
        if (self.axes && self.axesFront) {
            canvasShapes.drawAxes(self, self.axes);
        }
        if (self.showBody) {
            canvasShapes.updateOut(self);
        }
        return true;
    }
    canvasShapes.redraw = redraw;
    /** Updates all values for the graphical interface. */
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
            var xy = self.getCanvas().parentNode.parentNode.getElementsByClassName("coordinatesXY")[0];
            xy.value = (coords.length > 0) ? ("[" + coords.join(", ") + "]") : "";
        }
    }
    canvasShapes.updateOut = updateOut;
})(canvasShapes || (canvasShapes = {}));
// END MODULE: DRAW

/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.UI.js' (METHODS) Construction methods all "PolyArea" library GUI.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: UI
(function (canvasShapes) {
    "use-strict";
    /** Private internal function to set the canvas. It is used in the initializer. */
    function assignCanvas(self) {
        if (!(self instanceof canvasShapes.PolyArea)) {
            self = canvasShapes.getInstance();
        }
        var _canvas = self.getCanvas();
        var _conf = self.getConf();
        var contenedor = document.createElement("div");
        var padre = null; //$(document.body);
        var canvasId = "";
        var msg = "NO INTENCIONADO 1";
        try {
            if (_conf.id) {
                _canvas = document.getElementById(_conf.id); //$(configuration.id);
                msg = "NO INTENCIONADO 2";
                if (_canvas.tagName.toLowerCase() !== "canvas") {
                    //Perhaps the id corresponds to the parent element where you want to enter a new canvas
                    padre = _canvas; //$(configuration.id);
                    msg = "NO INTENCIONADO 3";
                    _canvas = padre.getElementsByTagName("canvas")[0]; //GET THE FIRST CANVAS ELEMENT
                    canvasId = _canvas.id;
                    msg = "INTENCIONADO";
                }
            }
            else {
                throw "assingCanvas:: Intentional error";
            }
        }
        catch (e) {
            //IF STILL REMAINS VOID OR UNDEFINED 'ID':
            _canvas = document.createElement("canvas"); //new Element("canvas");
            _canvas.innerHTML = '<p id="canvasNoAvailable">' + self.objLanguage.MSG_CANVAS_NO_AVAILABLE + '</p>';
        }
        finally {
            if (padre !== null) {
                padre.appendChild(contenedor); //padre.adopt(this._canvas);
            }
            //padre.setProperty("id", padre.getProperty("id")+" "+this._conf.id+"-father");
            if (_canvas !== null) {
                _canvas.id = canvasId ? canvasId : self.getId();
                _canvas.setAttribute("class", "canvas-PolyArea canvasPolyArea");
            }
            contenedor.setAttribute("id", "container-" + _conf.id);
            contenedor.setAttribute("class", "canvas-container polyAreaContainer");
            var noscript = document.createElement("noscript");
            noscript.appendChild(document.createTextNode(self.objLanguage.MSG_JAVASCRIPT_NO_AVAILABLE));
            contenedor.appendChild(noscript);
            if (_canvas !== null) {
                self._parent = contenedor;
                //RESOURCE TO ACCESS THE 'POLYAREA' OBJECT FROM WITHIN CANVAS.
                _canvas["getPolyArea"] = function () { return self; };
                self.setCanvas(_canvas);
                //CANVAS SQUARED
                _canvas.width = _conf.canvasWidth;
                _canvas.height = _conf.canvasHeight;
                if (_conf.canvasSquared) {
                    _canvas.height = _canvas.width;
                }
                //POLYAREA MAIN BODY
                if (self.showBody) {
                    contenedor = getBody(self, contenedor); //, _canvas.outerHTML);
                }
                else {
                    contenedor.appendChild(_canvas);
                }
                //CREATE THE INFORMATIVE TOOLTIP ELEMENT
                var tooltip = document.createElement("span");
                tooltip.setAttribute("style", "position:absolute; left:0; top:0; background:navajoWhite");
                tooltip.setAttribute("id", "tooltip-" + _canvas.getAttribute("id"));
                //tooltip.appendChild(document.createTextNode("&hellip;"));
                tooltip.innerHTML = "&hellip;";
                contenedor.appendChild(tooltip);
                //ADD POINT WITH CLICK
                if (_conf.mousePoints) {
                    canvasShapes.addEvent(_canvas, "click", canvasShapes.mouseClickEvent);
                }
                //SHOW INFO WITH 'MOVE' / HIDE INFO WITH 'OUT'
                if (_conf.mouseInfo) {
                    canvasShapes.addEvent(_canvas, "mousemove", canvasShapes.mouseMoveEvent);
                    canvasShapes.addEvent(_canvas, "mouseout", canvasShapes.mouseOutEvent);
                }
                //MOUSE-DOWN / MOUSE-UP
                if (_conf.mouseDrop) {
                    canvasShapes.addEvent(_canvas, "mousedown", canvasShapes.mouseDownEvent);
                    canvasShapes.addEvent(_canvas, "mouseup", canvasShapes.mouseUpEvent);
                }
            }
        }
        return contenedor;
    }
    canvasShapes.assignCanvas = assignCanvas;
    /** Method that returns the HTML full body. He must pass the 'canvasShapes.PolyArea' object and the HTML Element which contain the canvas.
      * @param self <canvasShape.PolyArea>
      * @param container <HTMLElement> HTML Element which contain the canvas */
    function getBody(self, container) {
        self.objLanguage || (self.objLanguage = canvasShapes.objLanguage);
        inyectCSS_Style();
        var _canvas = self.getCanvas();
        var _conf = self.getConf();
        if (!container) {
            container = document.createElement("div");
            container.className = "polyAreaContainer";
        }
        if (self.polyAreaHeader) {
            container.appendChild(document.createComment("<!-- POLYAREA HEADER -->"));
            var div1 = document.createElement("div");
            div1.className = "header";
            if (_conf.showTitle) {
                var h3_1 = document.createElement("h3");
                h3_1.className = "title";
                h3_1.innerHTML = self.objLanguage.TITLE + " ";
                if (_conf.showSubTitle) {
                    var span1 = document.createElement("span");
                    span1.className = "subTitle";
                    span1.innerHTML = self.objLanguage.SUBTITLE;
                    h3_1.appendChild(span1);
                }
                div1.appendChild(h3_1);
            }
            container.appendChild(div1);
            container.appendChild(document.createComment("<!-- END POLYAREA HEADER -->"));
        }
        var br1 = document.createElement("br");
        br1.className = "clearFix";
        container.appendChild(br1);
        container.appendChild(document.createComment("<!-- POLYAREA BODY -->"));
        var div2 = document.createElement("div");
        div2.className = "body";
        //BUTTONS
        if (self.showUIButtons) {
            div2.appendChild(document.createComment("<!-- POLYAREA BUTTONS -->"));
            var div3 = document.createElement("div");
            div3.className = "buttons";
            //CANVAS LANGUAGE
            if (self.btnCanvasFlag) {
                //FLAG
                var i111 = document.createElement("i");
                i111.className = "icon icon16 canvasBtnFlag";
                i111.title = self.objLanguage.CANVAS_FLAG_COUNTRY_TITLE;
                i111.style.backgroundImage = "url(" + canvasShapes.icos["FLAG_" + self.objLanguage.COUNTRY] + ")";
                div3.appendChild(i111);
            }
            //CANVAS REDRAW
            if (self.btnCanvasRedraw) {
                var i1 = document.createElement("i");
                i1.className = "icon icon16 canvasBtnRefresh";
                i1.title = self.objLanguage.CANVAS_REFRESH_TITLE;
                i1.style.backgroundImage = "url(" + canvasShapes.icos["REFRESH2"] + ")";
                canvasShapes.addEvent(i1, "click", function canvasRefreshListener() {
                    canvasShapes.redraw(self);
                });
                div3.appendChild(i1);
            }
            //CANVAS ZOOM
            if (self.btnCanvasZoom) {
                function canvasZoomListener(zoomType) {
                    zoomType || (zoomType = "IN");
                    if (zoomType === "IN") {
                        this.getCanvas().width += this.zoomIn;
                        this.getCanvas().height += this.zoomIn;
                        this.canvasZoomed++;
                    }
                    else {
                        this.getCanvas().width -= this.zoomOut;
                        this.getCanvas().height -= this.zoomOut;
                        this.canvasZoomed--;
                    }
                    in44.value = this.getCanvas().width;
                    in444.value = this.getCanvas().height;
                    canvasShapes.redraw(this);
                }
                //ZOOM-RESTORE
                var i2 = document.createElement("i");
                i2.className = "icon icon16 canvasBtnZoomRestore";
                i2.title = self.objLanguage.CANVAS_ZOOM_RESTORE_TITLE;
                i2.style.backgroundImage = "url(" + canvasShapes.icos["ZOOM_RESTORE"] + ")";
                canvasShapes.addEvent(i2, "click", function canvasZoomRestoreListener() {
                    var zoomType = (self.canvasZoomed > 0) ? "OUT" : "IN";
                    var copyCanvasZoomed = Math.abs(self.canvasZoomed);
                    for (var j = 0; j < copyCanvasZoomed; j++) {
                        canvasZoomListener.call(self, zoomType);
                    }
                    self.canvasZoomed = 0;
                    //canvasShapes.redraw(self);
                });
                div3.appendChild(i2);
                //ZOOM-IN
                var i22 = document.createElement("i");
                i22.className = "icon icon16 canvasBtnZoomIn";
                i22.title = self.objLanguage.CANVAS_ZOOM_IN_TITLE;
                i22.style.backgroundImage = "url(" + canvasShapes.icos["ZOOM_IN"] + ")";
                canvasShapes.addEvent(i22, "click", canvasZoomListener.bind(self, "IN"));
                div3.appendChild(i22);
                //ZOOM-OUT
                var i222 = document.createElement("i");
                i222.className = "icon icon16 canvasBtnZoomOut";
                i222.title = self.objLanguage.CANVAS_ZOOM_OUT_TITLE;
                i222.style.backgroundImage = "url(" + canvasShapes.icos["ZOOM_OUT"] + ")";
                canvasShapes.addEvent(i222, "click", canvasZoomListener.bind(self, "OUT"));
                div3.appendChild(i222);
            }
            //CANVAS OPTIONS
            if (self.btnCanvasOptions) {
                var i3 = document.createElement("i");
                i3.className = "icon icon16 showCanvasOptions";
                i3.title = self.objLanguage.CANVAS_OPTIONS_TITLE;
                i3.style.backgroundImage = "url(" + canvasShapes.icos["COG"] + ")";
                canvasShapes.addEvent(i3, "click", function canvasOptionsListener() {
                    if (div4.style.display === "none") {
                        div4.style.display = "block";
                    }
                    else {
                        div4.style.display = "none";
                    }
                });
                div3.appendChild(i3);
            }
            //CANVAS DOWNLOAD
            if (self.btnDownCanvasImage) {
                var a1 = document.createElement("a");
                a1.className = "icon icon16 downCanvasImage";
                //a1.id = "down-" + _canvas.id;
                a1.title = self.objLanguage.CANVAS_DOWNLOAD_TITLE;
                a1.href = "#";
                a1.download = "polyarea-" + _canvas.id + ".png";
                a1.style.backgroundImage = "url(" + canvasShapes.icos["DOWNLOAD"] + ")";
                //a1.onclick = "javascript: canvasShapes.PolyArea.downCanvasImage('" + _canvas.getAttribute("id") + "')";
                canvasShapes.addEvent(a1, "click", function downCanvasListener() {
                    a1.href = _canvas.toDataURL();
                });
                div3.appendChild(a1);
            }
            //CANVAS CLEAN SURFACE
            if (self.btnCanvasClean) {
                var i4 = document.createElement("i");
                i4.className = "icon icon16 canvasBtnClear";
                i4.title = self.objLanguage.CANVAS_CLEAN_TITLE;
                i4.style.backgroundImage = "url(" + canvasShapes.icos["BROOM"] + ")";
                canvasShapes.addEvent(i4, "click", function canvasClearListener() {
                    self.canvasClean();
                });
                div3.appendChild(i4);
            }
            //CANVAS CLEAN ALL (REMOVE)
            if (self.btnCanvasReset) {
                var i5 = document.createElement("i");
                i5.className = "icon icon16 canvasBtnReset";
                i5.title = self.objLanguage.CANVAS_RESET_TITLE;
                i5.style.backgroundImage = "url(" + canvasShapes.icos["TRASH3"] + ")";
                canvasShapes.addEvent(i5, "click", function canvasClearListener() {
                    var sels = canvasShapes.getSelected(self, "All");
                    if (sels.length > 0) {
                        for (var i = 0; i < sels.length; i++) {
                            if (sels[i]) {
                                sels[i].remove(true);
                            }
                        }
                    }
                    else {
                        if (self.cleanAllIfEmpty) {
                            self.resetShapes();
                        }
                    }
                    canvasShapes.redraw(self);
                });
                div3.appendChild(i5);
            }
            div2.appendChild(document.createComment("<!-- END POLYAREA BUTTONS -->"));
            div2.appendChild(div3);
        }
        //END BUTTONS
        //CANVAS
        div2.appendChild(document.createComment("<!-- BEGIN Canvas POLYAREA -->"));
        var div22 = document.createElement("div");
        div22.className = "canvasContainer";
        div22.appendChild(_canvas);
        div2.appendChild(div22);
        div2.appendChild(document.createComment("<!-- END Canvas POLYAREA -->"));
        //END CANVAS
        //BEGIN CANVAS DATA
        div2.appendChild(document.createComment("<!-- BEGIN CANVAS DATA -->"));
        var div4 = document.createElement("div");
        div4.className = "canvasData";
        div4.style.display = "none";
        if (self.canvasDataTitle) {
            var p1 = document.createElement("p");
            p1.className = "canvasDataTitle";
            p1.appendChild(document.createTextNode("CANVAS DATA: "));
            var p2 = document.createElement("p");
            p2.className = "clearFix";
            div4.appendChild(p1);
            div4.appendChild(p2);
        }
        if (self.canvasDataButtons) {
            div4.appendChild(document.createComment("<!-- BEGIN CANVAS DATA BUTTONS -->"));
            var div44 = document.createElement("div");
            div44.className = "buttonsData";
            //HIDE/SHOW COORDINATES
            var i71 = document.createElement("i");
            i71.className = "icon icon16 inline viewCoordinates";
            canvasShapes.addEvent(i71, "click", function viewCoordinatesListener() {
                var display = (div8.style.display === "none") ? "block" : "none";
                div8.style.display = display;
                div11.style.display = display;
            });
            i71.title = self.objLanguage.TITLE_VIEW_COORDINATES;
            i71.style.backgroundImage = "url(" + canvasShapes.icos["XY"] + ")";
            div44.appendChild(i71);
            //COORDINATES GROUPED
            var i72 = document.createElement("i");
            i72.className = "icon icon16 inline groupCoordinates";
            canvasShapes.addEvent(i72, "click", canvasShapes.shapesGrouped.bind(self));
            i72.title = self.objLanguage.TITLE_GROUPED;
            i72.style.backgroundImage = "url(" + canvasShapes.icos["LAYERS"] + ")";
            div44.appendChild(i72);
            //SELECT ALL SHAPES
            var i73 = document.createElement("i");
            i73.className = "icon icon16 inline selectAll";
            canvasShapes.addEvent(i73, "click", function selectShapesAllListener() {
                canvasShapes.selectShapesAll(self);
                canvasShapes.redraw(self);
            });
            i73.title = self.objLanguage.TITLE_SELECT_ALL;
            i73.style.backgroundImage = "url(" + canvasShapes.icos["SELECT"] + ")";
            div44.appendChild(i73);
            div4.appendChild(div44);
            div4.appendChild(document.createComment("<!-- END CANVAS DATA BUTTONS -->"));
        }
        //INFO
        if (self.canvasDataInfo) {
            div4.appendChild(document.createComment("<!-- BEGIN CANVAS INFO -->"));
            var div5 = document.createElement("div");
            div5.className = "canvasInfo";
            var p3 = document.createElement("p");
            p3.className = "canvasDataTitle";
            p3.appendChild(document.createTextNode("INFO: "));
            div5.appendChild(p3);
            var span7 = document.createElement("span");
            span7.className = "solution";
            //PERIMETER
            var span8 = document.createElement("span");
            span8.appendChild(document.createTextNode(self.objLanguage.SPAN_PERIMETER_TEXT + ": "));
            var span9 = document.createElement("span");
            span9.className = "perimeter";
            span9.appendChild(document.createTextNode("0"));
            span8.appendChild(span9);
            span7.appendChild(span8);
            //AREA
            var span10 = document.createElement("span");
            span10.appendChild(document.createTextNode(self.objLanguage.SPAN_AREA_TEXT + ": "));
            var span11 = document.createElement("span");
            span11.className = "area";
            span11.appendChild(document.createTextNode("0"));
            span10.appendChild(span11);
            span7.appendChild(span10);
            div5.appendChild(span7);
            div4.appendChild(div5);
            div4.appendChild(document.createComment("<!-- END CANVAS INFO -->"));
        }
        //INTRO
        if (self.canvasDataIntro) {
            div4.appendChild(document.createComment("<!-- BEGIN CANVAS INTRO -->"));
            var div6 = document.createElement("div");
            div6.className = "canvasIntro";
            var p4 = document.createElement("p");
            p4.className = "canvasDataTitle";
            p4.appendChild(document.createTextNode("INTRO DATA: "));
            div6.appendChild(p4);
            //EXAMPLES
            var div7 = document.createElement("div");
            div7.className = "canvasDataExamples";
            var a2 = document.createElement("a");
            a2.className = "button buttonSmall canvasDataBtnEjemplo1";
            a2.href = "#";
            a2.appendChild(document.createTextNode(self.objLanguage.INPUT_VALUE_EXAMPLE1));
            canvasShapes.addEvent(a2, "click", function linkExample1Listener() {
                var coordX = [4, 4, 8, 8, -4, -4];
                var coordY = [6, -4, -4, -8, -8, 6];
                canvasShapes.setCoordinatesXY(self, [coordX, coordY], true);
                canvasShapes.redraw(self);
            });
            div7.appendChild(a2);
            var a3 = document.createElement("a");
            a3.href = "http://www.mathopenref.com/coordpolygonarea2.html";
            a3.target = "blank"; //HTML5 INVALID
            a3.title = self.objLanguage.INPUT_TITLE_LINK_EXAMPLE1;
            a3.appendChild(document.createTextNode("?"));
            div7.appendChild(a3);
            var a4 = document.createElement("a");
            a4.className = "button buttonSmall canvasDataBtnEjemplo2";
            a4.href = "#";
            a4.appendChild(document.createTextNode(self.objLanguage.INPUT_VALUE_EXAMPLE2));
            canvasShapes.addEvent(a4, "click", function linkExample2Listener() {
                var coords = [[[3, 4], [5, 6], [9, 5], [12, 8], [5, 11]]];
                canvasShapes.setCoordinates(self, coords, true);
                canvasShapes.redraw(self);
            });
            div7.appendChild(a4);
            var a5 = document.createElement("a");
            a5.href = "https://es.wikipedia.org/wiki/F%C3%B3rmula_del_%C3%A1rea_de_Gauss";
            a5.target = "_blank"; //HTML5 INVALID
            a5.title = self.objLanguage.INPUT_TITLE_LINK_EXAMPLE2;
            a5.appendChild(document.createTextNode("?"));
            div7.appendChild(a5);
            var a6 = document.createElement("a");
            a6.className = "button buttonSmall canvasDataBtnEjemploOthers";
            a6.href = "#";
            a6.appendChild(document.createTextNode(self.objLanguage.INPUT_VALUE_EXAMPLE_OTHERS));
            canvasShapes.addEvent(a6, "click", function linkExampleOthersListener() {
                var coords = [[[3, 4], [5, 6], [9, 5], [12, 8], [5, 11]]];
                //MAPLE LEAF, HALLOWEEN PUMPKIN, BAT, CAT, GHOST
                var sel = prompt("Seleccionar un ejemplo: (MAPLE LEAF, HALLOWEEN PUMPKIN, BAT, CAT, GHOST)", "Maple Leaf");
                coords = self.cartesianArt[sel.toUpperCase().replace(" ", "_")];
                coords || (coords = self.cartesianArt["MAPLE_LEAF"]); //Default Maple Leaf
                //coords = eval(coords); //text to array convert
                coords = JSON.parse(coords + "");
                canvasShapes.setCoordinates(self, coords, true);
                canvasShapes.redraw(self);
            });
            div7.appendChild(a6);
            var a7 = document.createElement("a");
            a7.href = "????";
            a7.title = self.objLanguage.INPUT_TITLE_LINK_EXAMPLE_OTHERS;
            a7.appendChild(document.createTextNode("?"));
            div7.appendChild(a7);
            div6.appendChild(div7);
            div6.appendChild(document.createComment("<!-- END CANVAS EXAMPLES -->"));
            //COORDINATES
            div6.appendChild(document.createComment("<!-- BEGIN INTRO COORDINATES -->"));
            var div8 = document.createElement("div");
            div8.className = "introData coordinatesXsYs_string";
            div8.style.display = "none";
            var div9 = document.createElement("div");
            div9.className = "inline inline6";
            var lab1 = document.createElement("label");
            lab1.htmlFor = "coordinatesXs";
            lab1.appendChild(document.createTextNode("Xs [x1, x2, ..., xn]: "));
            div9.appendChild(lab1);
            var txt1 = document.createElement("textarea");
            txt1.className = "coordinatesXs";
            txt1.name = "coordinatesXs";
            txt1.title = self.objLanguage.INPUT_TITLE_XS;
            txt1.rows = "3";
            txt1.placeholder = "[ x1, x2, ..., xn ]";
            canvasShapes.addEvent(txt1, "change", function updateXsListener() {
                var coordsXY = self.getCoordinatesXY();
                var coords = txt1.value.replace("[", "").replace("]", "").split(",");
                var x;
                try {
                    for (var i = 0; i < coords.length; i++) {
                        x = parseFloat(coords[i].replace(" ", ""));
                        if (!isNaN(x)) {
                            coordsXY[0].splice(i, 1, x); //OVERWRITE IF EXISTS, BUT TO CREATE
                        }
                    }
                    coordsXY[0].splice(coords.length, (coordsXY[0].length - coords.length)); //DELETE ITEMS 'X' SURPLUS
                    coordsXY[1].splice(coords.length, (coordsXY[1].length - coords.length)); //DELETE ITEMS 'Y' SURPLUS
                    for (var j = 0; j < (coordsXY[0].length - coordsXY[1].length); j++) {
                        coordsXY[1].push(0);
                    }
                    canvasShapes.setCoordinatesXY(self, coordsXY, true);
                }
                catch (e) {
                    alert("Warning!! COORDINATES: WRONG FORMED");
                }
                finally {
                    canvasShapes.redraw(self);
                }
            });
            div9.appendChild(txt1);
            div8.appendChild(div9);
            var div10 = document.createElement("div");
            div10.className = "inline inline6";
            var lab2 = document.createElement("label");
            lab2.htmlFor = "coordinatesXs";
            lab2.appendChild(document.createTextNode("Ys [y1, y2, ..., yn]: "));
            div10.appendChild(lab2);
            var txt2 = document.createElement("textarea");
            txt2.className = "coordinatesYs";
            txt2.name = "coordinatesYs";
            txt2.title = self.objLanguage.INPUT_TITLE_YS;
            txt2.rows = "3";
            txt2.placeholder = "[ y1, y2, ..., yn ]";
            canvasShapes.addEvent(txt2, "change", function updateXsListener() {
                var coordsXY = self.getCoordinatesXY();
                var coords = txt2.value.replace("[", "").replace("]", "").split(",");
                var y;
                try {
                    for (var i = 0; i < coords.length; i++) {
                        y = parseFloat(coords[i].replace(" ", ""));
                        if (!isNaN(y)) {
                            coordsXY[1].splice(i, 1, y); //OVERWRITE IF EXISTS, BUT TO CREATE
                        }
                    }
                    coordsXY[0].splice(coords.length, (coordsXY[0].length - coords.length)); //DELETE ITEMS 'X' SURPLUS
                    coordsXY[1].splice(coords.length, (coordsXY[1].length - coords.length)); //DELETE ITEMS 'Y' SURPLUS
                    for (var j = 0; j < (coordsXY[1].length - coordsXY[0].length); j++) {
                        coordsXY[0].push(0);
                    }
                    canvasShapes.setCoordinatesXY(self, coordsXY, true);
                }
                catch (e) {
                    alert("Warning!! COORDINATES: WRONG FORMED");
                }
                finally {
                    canvasShapes.redraw(self);
                }
            });
            div10.appendChild(txt2);
            div8.appendChild(div10);
            var p5 = document.createElement("p");
            p5.className = "clearFix";
            div8.appendChild(p5);
            div6.appendChild(div8);
            var div11 = document.createElement("div");
            div11.className = "introData coordinatesXY_array";
            div11.style.display = "none";
            var lab3 = document.createElement("label");
            lab3.htmlFor = "coordinatesXY";
            lab3.appendChild(document.createTextNode("XY [x1, y1], [x2, y2], ..., [xn, yn]: "));
            div11.appendChild(lab3);
            var br2 = document.createElement("br");
            div11.appendChild(br2);
            var txt3 = document.createElement("textarea");
            txt3.className = "coordinatesXY";
            txt3.name = "coordinatesXY";
            txt3.title = self.objLanguage.INPUT_TITLE_XY;
            txt3.rows = "3";
            txt3.placeholder = "[ [x1, y1], [x2, y2], ..., [xn, yn] ]";
            canvasShapes.addEvent(txt3, "change", function updateXsListener() {
                /*canvasShapes.setCoordinates(self, eval(txt3.value), true);*/
                if (txt3.value.length > 0) {
                    try {
                        var coordsJSON = JSON.parse(txt3.value);
                        canvasShapes.setCoordinates(self, coordsJSON, true);
                    }
                    catch (e) {
                        alert("COORDINATES ERROR !! \n" + e.message);
                    }
                }
                else {
                    canvasShapes.resetShapes(self);
                }
                canvasShapes.redraw(self);
            });
            div11.appendChild(txt3);
            div6.appendChild(div11);
            div6.appendChild(document.createComment("<!-- END INTRO COORDINATES -->"));
            div4.appendChild(div6);
            div4.appendChild(document.createComment("<!-- END CANVAS INTRO -->"));
        }
        //OPTIONS
        if (self.canvasDataOptions) {
            div4.appendChild(document.createComment("<!-- BEGIN CANVAS OPTIONS -->"));
            var div12 = document.createElement("div");
            div12.className = "canvasOptions";
            var p6 = document.createElement("p");
            p6.className = "canvasDataTitle";
            p6.appendChild(document.createTextNode(self.objLanguage.FIELDSET_OPTIONS + ": "));
            div12.appendChild(p6);
            div12.appendChild(document.createComment("<!-- BEGIN CANVAS OPTIONS DATA -->"));
            var div13 = document.createElement("div");
            div13.className = "canvasOptionsData";
            //CANVAS
            var f1 = document.createElement("fieldset");
            var leg4 = document.createElement("legend");
            leg4.innerHTML = "CANVAS";
            f1.appendChild(leg4);
            //GRID
            var lab5 = document.createElement("label");
            lab5.htmlFor = "canvasGrid";
            lab5.className = "labelIcon labelIcon16";
            lab5.style.backgroundImage = "url(" + canvasShapes.icos["GRID"] + ")";
            lab5.title = self.objLanguage.LABEL_INPUT_GRID;
            f1.appendChild(lab5);
            var in2 = document.createElement("input");
            in2.type = "checkbox";
            in2.className = "canvasGrid";
            in2.name = "canvasGrid";
            in2.title = self.objLanguage.INPUT_TITLE_GRID;
            in2.checked = self.grid;
            canvasShapes.addEvent(in2, "change", function chkGridListener(ev) {
                self.setGrid(ev.target.checked);
                canvasShapes.redraw(self);
            });
            f1.appendChild(in2);
            //AXES
            var lab6 = document.createElement("label");
            lab6.htmlFor = "canvasAxes";
            lab6.className = "labelIcon labelIcon16";
            lab6.style.backgroundImage = "url(" + canvasShapes.icos["AXES"] + ")";
            lab6.title = self.objLanguage.LABEL_INPUT_AXES;
            f1.appendChild(lab6);
            var in3 = document.createElement("input");
            in3.type = "checkbox";
            in3.className = "canvasAxes";
            in3.name = "canvasAxes";
            in3.title = self.objLanguage.INPUT_TITLE_AXES;
            in3.checked = self.axes;
            canvasShapes.addEvent(in3, "change", function chkAxesListener(ev) {
                self.setAxes(ev.target.checked);
                canvasShapes.redraw(self);
            });
            f1.appendChild(in3);
            //FRACTION
            var lab7 = document.createElement("label");
            lab7.htmlFor = "canvasFraction";
            //lab7.appendChild(document.createTextNode(self.objLanguage.LABEL_INPUT_FRACTION + ": "));
            lab7.className = "labelIcon labelIcon16";
            lab7.style.backgroundImage = "url(" + canvasShapes.icos["FRACTION"] + ")";
            lab7.title = self.objLanguage.LABEL_INPUT_FRACTION;
            f1.appendChild(lab7);
            var in4 = document.createElement("input");
            in4.type = "text";
            in4.className = "canvasFraction";
            in4.name = "canvasFraction";
            in4.title = self.objLanguage.INPUT_TITLE_FRACTION;
            in4.value = canvasShapes.toDecimals(self.fractionGrid, self.decimals);
            in4.size = 4;
            canvasShapes.addEvent(in4, "change", function txtFractionListener(ev) {
                self.setFraction(ev.target.value);
                canvasShapes.redraw(self);
            });
            f1.appendChild(in4);
            //CANVAS-WIDTH
            var lab77 = document.createElement("label");
            lab77.htmlFor = "canvasWidth";
            lab77.className = "labelIcon labelIcon16";
            lab77.style.backgroundImage = "url(" + canvasShapes.icos["RULER_WIDTH"] + ")";
            lab77.title = self.objLanguage.LABEL_INPUT_WIDTH;
            f1.appendChild(lab77);
            var in44 = document.createElement("input");
            in44.type = "text";
            in44.className = "canvasWidth";
            in44.name = "canvasWidth";
            in44.title = self.objLanguage.INPUT_TITLE_WIDTH;
            in44.value = self.getCanvas().width;
            in44.size = 4;
            canvasShapes.addEvent(in44, "change", function txtWidthListener(ev) {
                self.getCanvas().width = parseInt(ev.target.value);
                canvasShapes.redraw(self);
            });
            f1.appendChild(in44);
            //CANVAS-HEIGHT
            var lab777 = document.createElement("label");
            lab777.htmlFor = "canvasHeight";
            lab777.className = "labelIcon labelIcon16";
            lab777.style.backgroundImage = "url(" + canvasShapes.icos["RULER_HEIGHT"] + ")";
            lab777.title = self.objLanguage.LABEL_INPUT_HEIGHT;
            f1.appendChild(lab777);
            var in444 = document.createElement("input");
            in444.type = "text";
            in444.className = "canvasHeight";
            in444.name = "canvasHeight";
            in444.title = self.objLanguage.INPUT_TITLE_HEIGHT;
            in444.value = self.getCanvas().height;
            in444.size = 4;
            canvasShapes.addEvent(in444, "change", function txtHeightListener(ev) {
                self.getCanvas().height = parseInt(ev.target.value);
                canvasShapes.redraw(self);
            });
            f1.appendChild(in444);
            div13.appendChild(f1);
            //COORDINATES
            var f2 = document.createElement("fieldset");
            var leg3 = document.createElement("legend");
            leg3.innerHTML = "COORDINATES";
            f2.appendChild(leg3);
            //AUTO-PROPORTION & DEFORMATION
            var lab12 = document.createElement("label");
            lab12.htmlFor = "canvasProportionAuto";
            lab12.className = "labelIcon labelIcon16";
            lab12.style.backgroundImage = "url(" + canvasShapes.icos["MAGIC"] + ")";
            lab12.title = self.objLanguage.LABEL_INPUT_PROPORTION_AUTO;
            f2.appendChild(lab12);
            var in9 = document.createElement("input");
            in9.type = "checkbox";
            in9.className = "canvasProportionAuto";
            in9.name = "canvasProportionAuto";
            in9.title = self.objLanguage.INPUT_TITLE_PROPORTION_AUTO;
            //in9.value = true;
            in9.checked = self.autoProportion;
            canvasShapes.addEvent(in9, "change", function chkAutoProportionListener(ev) {
                self.setAutoProportion(ev.target.checked);
                self.setDeformation(!ev.target.checked);
                canvasShapes.redraw(self);
            });
            f2.appendChild(in9);
            //PROPORTION_X
            var lab10 = document.createElement("label");
            lab10.htmlFor = "canvasProportionX";
            lab10.className = "labelIcon labelIcon16";
            lab10.style.backgroundImage = "url(" + canvasShapes.icos["PROPORTION_X"] + ")";
            lab10.title = self.objLanguage.LABEL_INPUT_PROPORTION_X;
            f2.appendChild(lab10);
            var in7 = document.createElement("input");
            in7.type = "text";
            in7.className = "canvasProportionX";
            in7.name = "canvasProportionX";
            in7.title = self.objLanguage.INPUT_TITLE_PROPORTION_X;
            in7.value = canvasShapes.toDecimals(self.proportionX, self.decimals);
            in7.size = 4;
            canvasShapes.addEvent(in7, "change", function txtProportionXListener(ev) {
                self.proportionX_OLD = ev.target.value;
                self.setProportionX(ev.target.value);
                canvasShapes.redraw(self);
            });
            f2.appendChild(in7);
            //PROPORTION_Y
            var lab11 = document.createElement("label");
            lab11.htmlFor = "canvasProportionY";
            lab11.className = "labelIcon labelIcon16";
            lab11.style.backgroundImage = "url(" + canvasShapes.icos["PROPORTION_Y"] + ")";
            lab11.title = self.objLanguage.LABEL_INPUT_PROPORTION_Y;
            f2.appendChild(lab11);
            var in8 = document.createElement("input");
            in8.type = "text";
            in8.className = "canvasProportionY";
            in8.name = "canvasProportionY";
            in8.title = self.objLanguage.INPUT_TITLE_PROPORTION_Y;
            in8.value = canvasShapes.toDecimals(self.proportionY, self.decimals);
            in8.size = 4;
            canvasShapes.addEvent(in8, "change", function txtProportionYListener(ev) {
                self.proportionY_OLD = ev.target.value;
                self.setProportionY(ev.target.value);
                canvasShapes.redraw(self);
            });
            f2.appendChild(in8);
            //INVERT_X
            var lab13 = document.createElement("label");
            lab13.htmlFor = "canvasInvertX";
            lab13.className = "labelIcon labelIcon16";
            lab13.style.backgroundImage = "url(" + canvasShapes.icos["INVERT_X"] + ")";
            lab13.title = self.objLanguage.LABEL_INPUT_INVERTER_X;
            f2.appendChild(lab13);
            var in10 = document.createElement("input");
            in10.type = "checkbox";
            in10.className = "canvasInvertX";
            in10.name = "canvasInvertX";
            in10.title = self.objLanguage.INPUT_TITLE_INVERTER_X;
            in10.checked = self.invertX;
            canvasShapes.addEvent(in10, "change", function chkInvertXListener(ev) {
                self.setInvertX(ev.target.checked);
                canvasShapes.redraw(self);
            });
            f2.appendChild(in10);
            //INVERT_Y
            var lab14 = document.createElement("label");
            lab14.htmlFor = "canvasInvertY";
            lab14.className = "labelIcon labelIcon16";
            lab14.style.backgroundImage = "url(" + canvasShapes.icos["INVERT_Y"] + ")";
            lab14.title = self.objLanguage.LABEL_INPUT_INVERTER_Y;
            f2.appendChild(lab14);
            var in11 = document.createElement("input");
            in11.type = "checkbox";
            in11.className = "canvasInvertY";
            in11.name = "canvasInvertY";
            in11.title = self.objLanguage.INPUT_TITLE_INVERTER_Y;
            in11.checked = self.invertY;
            canvasShapes.addEvent(in11, "change", function chkInvertYListener(ev) {
                self.setInvertY(ev.target.checked);
                canvasShapes.redraw(self);
            });
            f2.appendChild(in11);
            div13.appendChild(f2);
            //OTHERs
            var f22 = document.createElement("fieldset");
            var leg2 = document.createElement("legend");
            leg2.innerHTML = "OTHERs";
            f22.appendChild(leg2);
            //DECIMALS
            var lab8 = document.createElement("label");
            lab8.htmlFor = "canvasDecimals";
            lab8.className = "labelIcon labelIcon16";
            lab8.style.backgroundImage = "url(" + canvasShapes.icos["DECIMALS"] + ")";
            lab8.title = self.objLanguage.LABEL_INPUT_DECIMALS;
            f22.appendChild(lab8);
            var in5 = document.createElement("input");
            in5.type = "text";
            in5.className = "canvasDecimals";
            in5.name = "canvasDecimals";
            in5.title = self.objLanguage.INPUT_TITLE_DECIMALS;
            in5.value = self.decimals;
            in5.size = 3;
            canvasShapes.addEvent(in5, "change", function txtDecimalsListener(ev) {
                self.setDecimals(ev.target.value);
                canvasShapes.redraw(self);
            });
            f22.appendChild(in5);
            //ZOOM-SIZE
            var lab88 = document.createElement("label");
            lab88.htmlFor = "canvasZoomSize";
            lab88.className = "labelIcon labelIcon16";
            lab88.style.backgroundImage = "url(" + canvasShapes.icos["ZOOM_SIZE"] + ")";
            lab88.title = self.objLanguage.LABEL_INPUT_ZOOM_SIZE;
            f22.appendChild(lab88);
            var in66 = document.createElement("input");
            in66.type = "text";
            in66.className = "canvasZoomSize";
            in66.name = "canvasZoomSize";
            in66.title = self.objLanguage.INPUT_TITLE_ZOOM_SIZE;
            in66.value = parseInt(self.zoomIn + self.zoomOut) / 2;
            in66.size = "4";
            canvasShapes.addEvent(in66, "change", function txtZoomSizeListener(ev) {
                self.zoomIn = parseInt(ev.target.value, 10);
                self.zoomOut = self.zoomIn;
            });
            f22.appendChild(in66);
            //MOUSE-DROP
            var lab888 = document.createElement("label");
            lab888.htmlFor = "canvasMouseDrop";
            lab888.className = "labelIcon labelIcon16";
            lab888.style.backgroundImage = "url(" + canvasShapes.icos["MOUSE_DROP"] + ")";
            lab888.title = self.objLanguage.LABEL_INPUT_MOUSE_DROP;
            f22.appendChild(lab888);
            var in666 = document.createElement("input");
            in666.type = "checkbox";
            in666.className = "canvasMouseDrop";
            in666.name = "canvasMouseDrop";
            in666.title = self.objLanguage.INPUT_TITLE_MOUSE_DROP;
            in666.checked = self.mouseDrop;
            canvasShapes.addEvent(in666, "change", function chkMouseDropListener(ev) {
                self.mouseDrop = ev.target.checked;
            });
            f22.appendChild(in666);
            //MOUSE-INFO
            var lab8888 = document.createElement("label");
            lab8888.htmlFor = "canvasMouseInfo";
            lab8888.className = "labelIcon labelIcon16";
            lab8888.style.backgroundImage = "url(" + canvasShapes.icos["INFO2"] + ")";
            lab8888.title = self.objLanguage.LABEL_INPUT_MOUSE_INFO;
            f22.appendChild(lab8888);
            var in6666 = document.createElement("input");
            in6666.type = "checkbox";
            in6666.className = "canvasMouseInfo";
            in6666.name = "canvasMouseInfo";
            in6666.title = self.objLanguage.INPUT_TITLE_MOUSE_INFO;
            in6666.checked = self.mouseInfo;
            canvasShapes.addEvent(in6666, "change", function chkMouseInfoListener(ev) {
                self.mouseInfo = ev.target.checked;
            });
            f22.appendChild(in6666);
            //MOUSE-POINTS
            var lab88888 = document.createElement("label");
            lab88888.htmlFor = "canvasMousePoints";
            lab88888.className = "labelIcon labelIcon16";
            lab88888.style.backgroundImage = "url(" + canvasShapes.icos["MOUSE_POINT"] + ")";
            lab88888.title = self.objLanguage.LABEL_INPUT_MOUSE_POINTS;
            f22.appendChild(lab88888);
            var in66666 = document.createElement("input");
            in66666.type = "checkbox";
            in66666.className = "canvasMousePoints";
            in66666.name = "canvasMousePoints";
            in66666.title = self.objLanguage.INPUT_TITLE_MOUSE_POINTS;
            in66666.checked = self.mousePoints;
            canvasShapes.addEvent(in66666, "change", function chkMousePointsListener(ev) {
                self.mousePoints = ev.target.checked;
            });
            f22.appendChild(in66666);
            //SHOW-NAMES
            var lab888888 = document.createElement("label");
            lab888888.htmlFor = "canvasShowNames";
            lab888888.className = "labelIcon labelIcon16";
            lab888888.style.backgroundImage = "url(" + canvasShapes.icos["TEXT"] + ")";
            lab888888.title = self.objLanguage.LABEL_INPUT_SHOW_NAMES;
            f22.appendChild(lab888888);
            var in666666 = document.createElement("input");
            in666666.type = "checkbox";
            in666666.className = "canvasShowNames";
            in666666.name = "canvasShowNames";
            in666666.title = self.objLanguage.INPUT_TITLE_SHOW_NAMES;
            in666666.checked = self.showNames;
            canvasShapes.addEvent(in666666, "change", function chkShowNamesListener(ev) {
                self.setShowNames(ev.target.checked);
                canvasShapes.redraw(self);
            });
            f22.appendChild(in666666);
            //SHAPES-COLOR
            var lab8888888 = document.createElement("label");
            lab8888888.htmlFor = "canvasColorShapes";
            lab8888888.className = "labelIcon labelIcon16";
            lab8888888.style.backgroundImage = "url(" + canvasShapes.icos["COLOR"] + ")";
            lab8888888.title = self.objLanguage.LABEL_INPUT_COLOR_SHAPES;
            f22.appendChild(lab8888888);
            var in6666666 = document.createElement("input");
            in6666666.type = "text";
            in6666666.className = "canvasColorShapes";
            in6666666.name = "canvasColorShapes";
            in6666666.title = self.objLanguage.INPUT_TITLE_COLOR_SHAPES;
            in6666666.size = "5";
            in6666666.value = "green";
            canvasShapes.addEvent(in6666666, "change", function txtColorShapesListener(ev) {
                canvasShapes.getSelected(self, "ALL").forEach(function (f) {
                    var color = ev.target.value.split(",");
                    if (f.getTAG().toUpperCase === "POINT") {
                        if (color.length < 1) {
                            color[0] = "black";
                        }
                        if (color.length < 2) {
                            color[1] = "red";
                        }
                        f.color = color;
                    }
                    else {
                        if (color.length < 1) {
                            color[0] = "green";
                        }
                        f.color = color[0].replace(" ", "");
                    }
                });
                canvasShapes.redraw(self);
            });
            f22.appendChild(in6666666);
            div13.appendChild(f22);
            //FREEDRAW
            var f3 = document.createElement("fieldset");
            var leg1 = document.createElement("legend");
            leg1.innerHTML = "FREE DRAW";
            f3.appendChild(leg1);
            var lab9 = document.createElement("label");
            lab9.htmlFor = "canvasFreeDraw";
            lab9.className = "labelIcon labelIcon16";
            lab9.style.backgroundImage = "url(" + canvasShapes.icos["DRAW"] + ")";
            lab9.title = self.objLanguage.LABEL_INPUT_FREEDRAW;
            f3.appendChild(lab9);
            var in6 = document.createElement("input");
            in6.type = "checkbox";
            in6.className = "canvasFreeDraw";
            in6.name = "canvasFreeDraw";
            in6.title = self.objLanguage.INPUT_TITLE_FREEDRAW;
            in6.checked = this.freeDraw;
            canvasShapes.addEvent(in6, "change", function chkFreeDrawListener(ev) {
                self.setFreeDraw(ev.target.checked);
            });
            f3.appendChild(in6);
            //FREE-DRAW ROUNDED
            var lab93 = document.createElement("label");
            lab93.htmlFor = "canvasFreeDrawRounded";
            lab93.className = "labelIcon labelIcon16";
            lab93.style.backgroundImage = "url(" + canvasShapes.icos["ROUNDED"] + ")";
            lab93.title = self.objLanguage.LABEL_INPUT_FREEDRAW_ROUNDED;
            f3.appendChild(lab93);
            var in63 = document.createElement("input");
            in63.type = "checkbox";
            in63.className = "canvasFreeDrawRounded";
            in63.name = "canvasFreeDrawRounded";
            in63.title = self.objLanguage.INPUT_TITLE_FREEDRAW_ROUNDED;
            in63.checked = self.freeDrawRounded;
            canvasShapes.addEvent(in63, "change", function chkFreeDrawRoundedListener(ev) {
                self.freeDrawRounded = ev.target.checked;
            });
            f3.appendChild(in63);
            //FREE-DRAW SIZE
            var lab91 = document.createElement("label");
            lab91.htmlFor = "canvasFreeDrawSize";
            lab91.className = "labelIcon labelIcon16";
            lab91.style.backgroundImage = "url(" + canvasShapes.icos["SIZE"] + ")";
            lab91.title = self.objLanguage.LABEL_INPUT_FREEDRAW_SIZE;
            f3.appendChild(lab91);
            var in61 = document.createElement("input");
            in61.type = "text";
            in61.className = "canvasFreeDrawSize";
            in61.name = "canvasFreeDrawSize";
            in61.title = self.objLanguage.INPUT_TITLE_FREEDRAW_SIZE;
            in61.value = self.freeDrawSize;
            in61.size = "3";
            canvasShapes.addEvent(in61, "change", function chkFreeDrawSizeListener(ev) {
                self.freeDrawSize = ev.target.value;
            });
            f3.appendChild(in61);
            //FREE-DRAW COLOR
            var lab92 = document.createElement("label");
            lab92.htmlFor = "canvasFreeDrawColor";
            lab92.className = "labelIcon labelIcon16";
            lab92.style.backgroundImage = "url(" + canvasShapes.icos["PALETTE"] + ")";
            lab92.title = self.objLanguage.LABEL_INPUT_FREEDRAW_COLOR;
            f3.appendChild(lab92);
            var in62 = document.createElement("input");
            in62.type = "text";
            in62.className = "canvasFreeDrawColor";
            in62.name = "canvasFreeDrawColor";
            in62.title = self.objLanguage.INPUT_TITLE_FREEDRAW_COLOR;
            in62.value = self.freeDrawColor;
            in62.size = "8";
            canvasShapes.addEvent(in62, "change", function chkFreeDrawColorListener(ev) {
                self.freeDrawColor = ev.target.value;
            });
            f3.appendChild(in62);
            div13.appendChild(f3);
            div12.appendChild(div13);
            div12.appendChild(document.createComment("<!-- END CANVAS OPTIONS DATA -->"));
            div4.appendChild(div12);
            div4.appendChild(document.createComment("<!-- END CANVAS OPTIONS -->"));
        }
        var p7 = document.createElement("p");
        p7.className = "clearFix";
        div4.appendChild(p7);
        div2.appendChild(div4);
        div2.appendChild(document.createComment("<!-- END CANVAS DATA -->"));
        var p70 = document.createElement("p");
        p70.className = "clearFix";
        div2.appendChild(p70);
        //END CANVAS DATA
        container.appendChild(div2);
        //END BODY
        //FOOTER
        if (self.polyAreaFooter) {
            container.appendChild(document.createComment("<!-- POLYAREA FOOTER -->"));
            var div25 = document.createElement("div");
            div25.className = "canvasFooter";
            if (_conf.showCredits) {
                div25.appendChild(document.createComment("<!-- POLYAREA CREDITS -->"));
                var p8 = document.createElement("p");
                p8.className = "credits";
                //p8.appendChild(document.createTextNode( self.objLanguage.CREDITS ));
                p8.innerHTML = self.objLanguage.CREDITS2;
                div25.appendChild(p8);
                div25.appendChild(document.createComment("<!-- END POLYAREA CREDITS -->"));
            }
            container.appendChild(div25);
            container.appendChild(document.createComment("<!-- END POLYAREA FOOTER -->"));
        }
        //END FOOTER
        return container;
    }
    canvasShapes.getBody = getBody;
    //END GET-BODY
    function inyectCSS_Style() {
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        style.innerHTML = getCSS();
        document.getElementsByTagName("head")[0].appendChild(style);
    }
    function getCSS() {
        var css = [];
        css.push('/*<![CDATA[*/');
        css.push('/* CanvasShapes - PolyArea: Juan Jose Guerra Haba <dinertron@gmail.com> 2016 */');
        css.push('.polyAreaContainer{border:1px ridge maroon;border-radius:10px;box-shadow:4px 4px 6px maroon;width:98%;margin:auto;background:whiteSmoke;text-align:center}');
        css.push('.polyAreaContainer .header{max-width:90%;background:lightYellow;margin:auto;margin-top:4px;padding:2px}');
        css.push('.polyAreaContainer .header span{margin:2px;font-size:smaller;color:darkGray}');
        css.push('.polyAreaContainer .credits{font-size:xx-small;padding:0;vertical-align:middle;opacity:0.7}');
        css.push('.polyAreaContainer .credits:hover{opacity:1;background:lightYellow}');
        css.push('.polyAreaContainer .credits:first-child{margin:auto}');
        css.push('.polyAreaContainer .body{max-width:98%;background:white;margin:auto}');
        css.push('.polyAreaContainer .body .title{width:60%;float:left;margin:2px;padding:1px}');
        css.push('.polyAreaContainer .canvasContainer{float:left}');
        css.push('.polyAreaContainer .canvasPolyArea{background:lightYellow;margin:0 2%;margin-top:0;border:1px solid orange;border-radius:8px;overflow:auto}');
        css.push('.polyAreaContainer .noCanvas{background:yellow;padding:5px;border:1px solid orange;border-radius:8px;box-shadow:2px 2px 2px orange}');
        css.push('.polyAreaContainer .canvasData{display:none;border:1px solid gray;border-radius:8px;box-shadow:2px 2px 4px gray;float:left;width:50%}');
        css.push('@media (max-width: 920px){.polyAreaContainer .canvasData{width:40%}}');
        css.push('@media (max-width: 680px){.polyAreaContainer .canvasData{width:98%}}');
        css.push('.polyAreaContainer .canvasDataTitle{float:left;background:aquaMarine;border:1px solid navy;border-radius:8px;box-shadow:1px 1px 2px navy;color:navy;font-weight:bolder;margin:0;padding:0 2px;font-size:smaller}');
        css.push('.polyAreaContainer .canvasInfo{border:1px solid blue;border-radius:4px;padding:4px;margin:4px;text-align:center}');
        css.push('.polyAreaContainer .canvasIntro{border:1px solid blue;border-radius:4px;padding:4px;margin:4px;text-align:center}');
        css.push('.polyAreaContainer .introData{border:1px solid blue;border-radius:4px;padding:4px;margin:4px;text-align:center;background:whiteSmoke}');
        css.push('.polyAreaContainer .introData label{font-size:smaller;font-weight:bolder;padding:2px;background:navajoWhite}');
        css.push('.polyAreaContainer .introData textarea{text-align:left;font-size:smaller;width:90%}');
        css.push('.polyAreaContainer .canvasOptions{border:1px solid blue;border-radius:4px;padding:4px;margin:4px;text-align:center}');
        css.push('.polyAreaContainer .canvasOptionsData{border:1px solid blue;border-radius:4px;padding:4px;margin:4px;text-align:left;font-size:smaller}');
        css.push('.polyAreaContainer .canvasOptionsData fieldset{border:1px solid blue;border-radius:4px;padding:4px;margin:auto;width:95%;text-align:center;background:lightYellow}');
        css.push('.polyAreaContainer .canvasOptionsData fieldset legend{color:lightGray;font-size:smaller;background:#333333;padding:2px}');
        css.push('.polyAreaContainer .canvasOptionsData input{font-size:smaller;padding:2px;margin:2px;border:1px solid blue;border-radius:4px}');
        css.push('.polyAreaContainer .canvasOptionsData input[type="checkbox"]{outline:1px solid blue}');
        css.push('.polyAreaContainer .perimeter,.polyAreaContainer .area{font-size:larger;background:darkGreen;color:whiteSmoke;border:1px solid darkGreen;border-radius:8px;box-shadow:1px 2px 2px darkGreen;padding:2px 6px;margin:4px}');
        css.push('.polyAreaContainer .area{background:darkRed;color:whiteSmoke;border:1px solid darkRed;box-shadow:1px 2px 2px darkRed}');
        css.push('.polyAreaContainer .inline{display:block;float:left;margin:auto;padding:2px}.polyAreaContainer .inline4{width:33%}.polyAreaContainer .inline6{width:46%}');
        css.push('.polyAreaContainer .bordered{border:1px solid gray}.polyAreaContainer .clearFix{clear:both;margin:0}');
        css.push('.polyAreaContainer .buttons{float:left}.polyAreaContainer .buttonsData{float:right;right:2%;position:relative}');
        css.push('.polyAreaContainer .button{font-size:larger;font-weight:bolder;background:gray;color:white;border-left:1px solid lightGray;border-top:1px solid lightGray;border-right:1px solid darkGray;border-bottom:1px solid darkGray;border-radius:8px;box-shadow:2px 4px 4px #333333;padding:4px;margin:1px;text-decoration:none}');
        css.push('.polyAreaContainer .button:hover{font-weight:normal;color:#333333;background:navajoWhite;border-left-color:darkGray;border-top-color:darkGray;border-right-color:lightGray;border-bottom-color:lightGray;box-shadow:1px 2px 2px #333333;cursor:pointer}');
        css.push('.polyAreaContainer .buttonBlue{background:blue;color:white;border-left-color:lightBlue;border-top-color:lightBlue;border-right-color:navy;border-bottom-color:navy}');
        css.push('.polyAreaContainer .buttonBlue:hover{background:navy;border-left-color:black;border-top-color:black;border-right-color:lightBlue;border-bottom-color:lightBlue;/*box-shadow-color:lightBlue*/}');
        css.push('.polyAreaContainer .buttonNavajo{background:lightYellow;color:maroon;border-left-color:yellow;border-top-color:yellow;border-right-color:navajoWhite;border-bottom-color:navajoWhite}');
        css.push('.polyAreaContainer .buttonNavajo:hover{background:navajoWhite;border-left-color:maroon;border-top-color:maroon;border-right-color:lightYellow;border-bottom-color:lightYellow;/*box-shadow-color:yellow*/}');
        css.push('.polyAreaContainer .buttonSmall{font-size:smaller;padding:2px;box-shadow:1px 1px 2px}');
        css.push('.polyAreaContainer .button img{width:100%;height:100%;text-decoration:none;margin:0;padding:0}');
        css.push('.polyAreaContainer .buttonImage16m{width:16px;height:16px;display:inline-block}');
        css.push('.polyAreaContainer .buttonImage24{width:24px;display:inline-block}');
        css.push('.polyAreaContainer .icon{margin:2px;padding:0;display:block;width:100%;height:100%;border:4px solid lightGray;background-color:lightGray;border-radius:8px;box-shadow:1px 1px 2px darkGray;outline:none}');
        css.push('.polyAreaContainer .icon:hover{box-shadow:none;background-color:navajoWhite;border-color:navajoWhite;outline:1px solid;cursor:pointer}');
        css.push('.polyAreaContainer .icon16{width:16px;height:16px;border-radius:4px}');
        css.push('.polyAreaContainer .labelIcon{margin:0 2px 0 4px;padding:0;display:inline-block;width:100%;height:100%;outline:none;background:navajoWhite}');
        css.push('.polyAreaContainer .labelIcon16{width:16px;height:16px}');
        css.push('.polyAreaContainer .logo{margin:2px;padding:0;width:100%;height:100%;border-radius:8px;box-shadow:1px 1px 2px darkGray;text-decoration:none;outline:none;float:left}');
        css.push('.polyAreaContainer .logo:hover{background-color:yellow}.polyAreaContainer .logo9{width:9px;height:9px;border-radius:1px}.polyAreaContainer .logo12{width:12px;height:12px;border-radius:2px}.polyAreaContainer .logo16{width:16px;height:16px;border-radius:4px}');
        css.push('.polyAreaContainer .logoGuerratron{background:url("data:image/gif;base64,R0lGODlhEAAQAOMMABUQEL4aF38yEmZXVCRmmU9mHf9ERVqrLM2Ue/uUMpSwwvrKgP///////////////yH5BAEKAA8ALAAAAAAQABAAAARY8J1HZb31jIzx+SDQXUg4XuCnnFT6JfCydAdBHIAgxAhmEwpCIAAbLESV34+YAMyQD+VAMNT1oEGbYhAwdFfQKEABEBkezjD6QaYI2OuLaPXYPHqsvP4SAQA7")}');
        css.push('.polyAreaContainer .logoPolyArea{background:url("data:image/gif;base64,R0lGODlhEAAQAKECAAcJBOIeFP///////yH5BAEKAAIALAAAAAAQABAAAAI0lC8RyAeqQHMPAtmuVEIz/11HNHUctEwoWrJcmaQiPIPZ3OEUNqbI24toWMGApgI0JJW+AgA7")}');
        css.push('/* END CanvasShapes - PolyArea */');
        css.push('/*]]>*/');
        return css.join("\n");
    }
})(canvasShapes || (canvasShapes = {}));
// END MODULE: UI

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
*   File: 'canvasShapes.PolyArea.js' (MAIN-OBJECT-CLASS) Main class housing drawing objects. Children: Polygons, Segments and Points
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: POLYAREA
(function (canvasShapes) {
    "use-strict";
    //INTERNAL PRIVATE MAIN CLASS POLYAREA
    var PolyArea = (function () {
        /** CONSTRUCTOR */
        function PolyArea(conf) {
            if (conf === void 0) { conf = {}; }
            //PRIVATE VARS
            var _conf = canvasShapes.buildOptions(conf);
            var _name = "PolyArea";
            var _id = _name + "-" + _conf.timestamp + "-" + Math.floor((Math.random() * 100) + 1); //_conf.id;
            var _children = { "Points": [], "Segments": [], "Polygons": [] };
            var _canvas = _conf.canvas;
            var _container = _conf.container;
            var _proportion = 1;
            var _super = null;
            var _parent = null;
            ///////
            //GETTERs & SETTERs OF PRIVATE VARS
            /** Getter method to take the this object id. ATTENTION: IT IS NOT THE ID OF CANVAS.
            * @see this.getCanvasId() */
            this.getId = function () { return _id; };
            /** Setter method to set the this element id. It involves a refresh in some of its parts. */
            this.setId = function (id) {
                if ((typeof (id)).toUpperCase() !== "UNDEFINED") {
                    _id = id;
                    this.update();
                }
            };
            /** Getter method for taking the this element name. */
            this.getName = function () { return _name; };
            /** Setter method to set the this element name. It involves a refresh in some of its parts. */
            this.setName = function (name) {
                if ((typeof (name)).toUpperCase() !== "UNDEFINED") {
                    _name = name;
                    this.update();
                }
            };
            /** Getter method for taking the this element configuration. */
            this.getConf = function () { return _conf; };
            this.setConf = function (conf) {
                if ((typeof (conf)).toUpperCase() !== "UNDEFINED") {
                    _conf = canvasShapes.buildOptions(conf);
                    this.recreate();
                    this.update();
                }
            };
            /** Getter method to take the children (shapes) Points, Segments and Polygons as an object arrays. */
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
            /** Getter method to take the canvas HTML that is tied to your id. */
            this.getCanvas = function () { return _canvas; };
            /** Setter method for internal use, not use externally, cause undetermined changes. */
            this.setCanvas = function (canvas) { _canvas = canvas; };
            /** Getter method to take the drawing context that is linked to his canvas. */
            this.getContext = function () { return _canvas.getContext("2d", { alpha: true }); };
            this.getContainer = function () { return _container; };
            //PUBLICS VARS
            //OPTIONS NO-UI
            /** Object for texts translations. If specified in the configuration match this, else it will be taken one internal */
            this.objLanguage = canvasShapes.objLanguage(this.getConf().language);
            this.cartesianArt = canvasShapes.cartesianArt;
            //UI OPTIONS BEFORE TO CANVAS
            //BLOCKS
            /** It shows the graphical interface with menu buttons, action fields and useful information. */
            this.showBody = _conf.showBody;
            /** Upper area of the UI. Contains among others the title and subtitle */
            this.polyAreaHeader = _conf.polyAreaHeader;
            /** Bottom area of the UI. Basically it contains the credits */
            this.polyAreaFooter = _conf.polyAreaFooter;
            /** Show Canvas Title */
            this.canvasDataTitle = _conf.canvasDataTitle;
            /** Show the informative area of UI */
            this.canvasDataInfo = _conf.canvasDataInfo;
            /** Show graphics coordinates area in the UI, for input data. */
            this.canvasDataIntro = _conf.canvasDataIntro;
            /** Show UI options area */
            this.canvasDataOptions = _conf.canvasDataOptions;
            //BUTTONS
            /** Show main buttons area of UI */
            this.canvasDataButtons = _conf.canvasDataButtons;
            /** Show UI main buttons */
            this.showUIButtons = _conf.showUIButtons;
            /** Show UI language button. It show the flag language, currently it has no associated actions. */
            this.btnCanvasFlag = _conf.btnCanvasFlag;
            /** Show UI refresh / redraw button to canvas. */
            this.btnCanvasRedraw = _conf.btnCanvasRedraw;
            /** Show UI zoom button */
            this.btnCanvasZoom = _conf.btnCanvasZoom;
            /** Show UI "show options" button */
            this.btnCanvasOptions = _conf.btnCanvasOptions;
            /** Show "canvas download" button in UI */
            this.btnDownCanvasImage = _conf.btnDownCanvasImage || _conf.linkDownCanvasImage;
            /** Show clean button for clean the canvas surface (WITHOUT LOSING DATA) */
            this.btnCanvasClean = _conf.btnCanvasClean;
            /** Show reset button of canvas (WITH LOSING DATA) */
            this.btnCanvasReset = _conf.btnCanvasReset;
            //OTHERS
            /** This option allow to clean all canvas through the 'Reset' button, even if there isn't any selected shape */
            this.cleanAllIfEmpty = _conf.cleanAllIfEmpty;
            //CANVAS OPTIONS
            /** Grids */
            this.grid = _conf.grid;
            /** Axes */
            this.axes = _conf.axes;
            /** Fraction of each grid square. If you not want, to leave Grid 0 */
            this.fractionGrid = _conf.fractionGrid || 0.1;
            this.canvasWidth = _conf.canvasWidth;
            this.canvasHeight = _conf.canvasHeight;
            //COORDINATES
            /** This allow that shapes fit to canvas dimensions without exceeding it. This is the opposite to 'deformation' or 'equalProportion' options. */
            this.autoProportion = _conf.autoProportion;
            /** Equal to 'equalProportion'. */
            this.deformation = _conf.deformation || !this.autoProportion; //_conf.deformation || true;
            /** It force to shape to fit with and height canvas (DEFORMATION), FALSE by default.
              * It is synonymous of 'deformation', the opposite of 'autoProportion'. */
            this.equalProportion = _conf.equalProportion || this.deformation;
            /** Points (X) proportion of shapes to fit them to canvas. As you add points this ratio must be recalculated. */
            this.proportionX = _conf.proportionX || 1;
            this.proportionX_OLD = this.proportionX;
            /** Points (Y) proportion of shapes to fit them to canvas. As you add points this ratio must be recalculated.*/
            this.proportionY = _conf.proportionY || 1;
            this.proportionY_OLD = this.proportionY;
            /** Inversion of X axe value. FALSE by default. */
            this.invertX = _conf.invertX;
            /** Inversion of Y axe value. TRUE by default, since the ordinates grow inversely, that is, down. */
            this.invertY = _conf.invertY;
            //OTHERS
            /** Number of decimals approximation for calculations and presentations. */
            this.decimals = _conf.decimals;
            this.canvasZoomed = 0;
            /** Zoom step to magnify */
            this.zoomIn = _conf.zoomIn || 50;
            /** Zoom step to belittle. This is equal to 'zoomIn', usually. */
            this.zoomOut = _conf.zoomOut || this.zoomIn;
            /** This allow dynamically add points through mouse clicks. */
            this.mousePoints = _conf.mousePoints;
            /** Show dynamically information for points and segments through the mouse situation */
            this.mouseInfo = _conf.mouseInfo;
            /** This allow dynamically drag points with mouse. */
            this.mouseDrop = _conf.mouseDrop;
            /** Show the shapes names. */
            this.showNames = _conf.showNames;
            //FREEDRAW
            /** This allow free drawing with mouse. */
            this.freeDraw = _conf.freeDraw || false;
            /** Stroke size for free drawing. */
            this.freeDrawSize = _conf.freeDrawSize || 3;
            /** Stroke color for free drawing */
            this.freeDrawColor = _conf.freeDrawColor || "black";
            /** Brush type to use for free drawing (Rounded or Squared). */
            this.freeDrawRounded = _conf.freeDrawRounded || true;
            /** Square the Canvas dimension (Ref. width), default TRUE. */
            this.canvasSquared = _conf.canvasSquared;
            /** Centred the Canvas coordinates. This hold the state of coordinates centred (translation) */
            this.coordinatesCentred = _conf.coordinatesCentred;
            /** Frontal Grid (Foreground) */
            this.gridFront = _conf.gridFront;
            /** Frontal Axes (Foreground) */
            this.axesFront = _conf.axesFront;
            /** Polygons Filled */
            this.fill = _conf.fill;
            /** Retains status to mouse button. */
            this.mousedown = false;
            /** Retains status to freehand drawing. */
            this.freeDrawON = false;
            //FIN DE OPCIONES
            /** Object retaining shapes 'Point, Segment and Polygon' belonging to this object */
            this.shapes = { Points: [], Segments: [], Polygons: [] };
            /** Object used to retain the focus on the drag on the active object. */
            this.shapesDrop = { "Point": null, "Segment": null, "Polygon": null };
            /** It is used to retain the original coordinates in drag on the active object. */
            this.oldCoordinates = null;
            this.selected = true;
            this.enabled = true;
            this.valid = true;
            if (!_canvas) {
                canvasShapes.assignCanvas(this);
            }
            _container = (_container ? _container : _canvas.parentNode);
            //INICIALIZACIÓN DEL CANVAS
            /** The canvas context of drawing. */
            var context = this.getContext();
            //COORDINATES CENTRED
            if (context) {
                this.setCentred(this.coordinatesCentred);
                context.save();
            }
            /** Gradient object of filled. This makes it, by example, with 'createLinearGradient(...)' method of canvas context. */
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
        } //END CONSTRUCTOR
        //UTILITY METHODS
        /** Utility function to check if you have a correct canvas and context. */
        PolyArea.prototype.test = function () {
            var __TAG = this.getTAG() + "::TEST::";
            return (this.getCanvas() && this.getContext());
        };
        PolyArea.prototype.prepare = function () {
            this.sanitize();
            //GRIDS
            canvasShapes.drawGrid(this, this.grid);
            //AXES
            canvasShapes.drawAxes(this, this.axes);
        };
        /** Sanitizes the shapes created in arrays, it suppress null and invalid. Returns the shapes object (getChildren ()) */
        PolyArea.prototype.sanitize = function () {
            //POINTS, SEGMENTS AND POLYGONS
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
        /** Canvas Clean All */
        PolyArea.prototype.canvasClean = function () {
            this.getCanvas().width = this.getCanvas().width;
            return this.getContext();
        };
        /** Reset this object, without children.*/
        PolyArea.prototype.reset = function () {
            this.setChildren({ "Points": [], "Segments": [], "Polygons": [] });
            this.setShapes({ "Points": [], "Segments": [], "Polygons": [] });
            this.setShapesDrop({ "Point": null, "Segment": null, "Polygon": null });
        };
        //PUBLIC API
        //PUBLICS GETTERs && SETTERs
        PolyArea.prototype.setDeformation = function (deformation) {
            this.deformation = deformation;
            this.equalProportion = deformation;
            this.getConf().deformation = deformation;
            this.getConf().equalProportion = deformation;
        };
        ;
        /** Synonymous and duplicate with 'setChildren(..)' */
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
        //PROPORTIONS
        /** A FLOAT value indicating the proportion of both the X and Y coordinates. Set the same value for 'proportionX' and 'proportionY';
          * ALTHOUGH THE ORIGINAL VALUE OF 'X' and 'Y' does not change. */
        PolyArea.prototype.setProportion = function (proportion) {
            if (proportion) {
                this.proportionX = proportion;
                this.proportionY = proportion;
            }
        };
        /** A FLOAT value indicating the proportion of X coordinates. Set the same value for 'proportionX', ALTHOUGH THE ORIGINAL VALUE
          * OF 'X' does not change.
          * @see setProportion(..)
          * @see setProportionY(..) */
        PolyArea.prototype.setProportionX = function (proportion) {
            if (proportion) {
                this.proportionX = proportion;
            }
        };
        /** A FLOAT value indicating the proportion of Y coordinates. Set the same value for 'proportionY', ALTHOUGH THE ORIGINAL VALUE
          * OF 'Y' does not change.
          * @see setProportion(..)
          * @see setProportionX(..) */
        PolyArea.prototype.setProportionY = function (proportion) {
            if (proportion) {
                this.proportionY = proportion;
            }
        };
        //PROPAGACIÓN DE LA PROPORCION
        /** Sets the ratio to be used at all points of the object to fit the dimensions of the canvas proportionally.
          * If you specify 'fill = true' mean that we want this shape FILL or occupies the largest area of possible canvas (within bounds
          * their coordinates), this will involve a distortion of the figure to fit the canvas but it may be useful to expand areas that
          * otherwise form is not well appreciated.
          * On the other hand if you specify 'fill = false' (default) will apply the same proportion X in Y, thus representing the REAL shape.
          * Still, all this depends on the 'canvasSquared' option in the canvas.
          * IMPORTANT!!: These measurements and proportions are considered PIXELS since the intention is to use them for the purpose of its graphic
          * representation (usually in their method 'draw ()'), regardless of whether you have thought of using other units of measure, this will not
          * affect subsequent calculations as actually the actual coordinates of the points aren't changed, only implemented visually in the graphic
          * representation of the canvas. */
        PolyArea.prototype.setPointsProportion = function (rellenar) {
            if ((typeof rellenar).toUpperCase() === "UNDEFINED") {
                rellenar = this.deformation;
            }
            //MEASURES REFERRED TO PIXELS
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
            //GET THE SMALLER PROPORTION
            var proporcion = Math.min(proporcionX, proporcionY);
            this.setProportionX((rellenar ? proporcionX : proporcion));
            this.setProportionY((rellenar ? proporcionY : proporcion));
        };
        //INVERT
        /** A Boolean value indicating whether to invert (change the sign) the value of both the 'X and Y' points coordinates.
          * Set the same value for 'invertX' and 'invertY'; ALTHOUGH the points coordinate original value 'X' and 'Y' unchanged. */
        PolyArea.prototype.setInvert = function (invert) {
            this.invertX = invert;
            this.invertY = invert;
        };
        /** A Boolean value indicating whether to invert (change the sign) the value of 'X' coordinates.
          * Set the same value for 'invertX'; ALTHOUGH the coordinate original value 'X' unchanged. */
        PolyArea.prototype.setInvertX = function (invert) {
            this.invertX = invert;
        };
        /** A Boolean value indicating whether to invert (change the sign) the value of 'Y' coordinates.
          * Set the same value for 'invertY'; ALTHOUGH the coordinate original value 'Y' unchanged. */
        PolyArea.prototype.setInvertY = function (invert) {
            this.invertY = invert;
        };
        //INVERT SPREAD
        /** Establishes invert to use in all points of the object to fit the characteristics pecualiares of canvas (positive ordinates down).
          * ATTENTION: The implementation of this method is with graphic purposes (usually in their method 'draw ()'), this will not affect
          * subsequent calculations, because in reality not the actual coordinates of the points are changed, only implemented visually in the
          * graphical representation of the canvas. */
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
            //APPLYING PROPORTIONS AND INVERT (FOR CALCULATION ONLY)
            for (var j in this.getChildren()) {
                if (this.getChildren().hasOwnProperty(j) && (j === "Points")) {
                    this.getChildren()[j].forEach(function (s) {
                        var xy = s.coordinates(withProportion, withInvert);
                        for (var i = 0; i < xy.length; i++) {
                            pointsXY.push(xy[i]);
                        }
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
        //PUBLIC OBJECT METHODS. Non-heritable shapes
        /** Synonymous with 'getChildren()'.
          * Returns an array with all items created individually or through their 'father' shapes. */
        PolyArea.prototype.getShapes = function () { return this.getChildren(); };
        /** Returns an array of all the points created. */
        PolyArea.prototype.getPoints = function () { return this.getChildren().Points; };
        /** Returns an array with all segments created. */
        PolyArea.prototype.getSegments = function () { return this.getChildren().Segments; };
        /** Returns an array of all the polygons created. */
        PolyArea.prototype.getPolygons = function () { return this.getChildren().Polygons; };
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
        //DISTANCES
        /** PERIMETER. (PYTHAGORAS THEOREM). Alias of 'distance(..)'
          * Returns the sum of the distances of all the points that make up this polygon supposing 'closed', calculated between all two points
          * of each of the segments. NO are taken into account neither the proportions nor invert.
          * NOTE: The action taken will coincide with the 'distance (..)' method provided that there are no proportions or invert */
        PolyArea.prototype.perimeter = function (withProportion, withInvert) {
            var perimetro = 0; // Accumulates perimetro in the loop
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
        /** SUM ALL SHAPES AREAS. OBVIOUSLY ONLY GET THE AREA OF POLYGONS AND CLOSED FIGURES */
        PolyArea.prototype.area = function (withProportion, withInvert) {
            var area = 0; // Accumulates area in the loop
            //APPLYING PROPORTIONS AND INVERT (FOR CALCULATION ONLY)
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
            canvasShapes.redraw(this);
        };
        /** Variable used as a counter static objects that have been created (NO instantiated) through the constructor.*/
        PolyArea.count = 0;
        return PolyArea;
    })();
    canvasShapes.PolyArea = PolyArea;
})(canvasShapes || (canvasShapes = {}));
// END MODULE: POLYAREA

/// <reference path="canvasShapes.PolyArea.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.PolyArea.Point.js' (OBJECT-CLASS) Point drawing object on the canvas.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: POINT
(function (canvasShapes) {
    var PolyArea;
    (function (PolyArea) {
        "use-strict";
        //CLASE DERIVADA INTERNA PRIVADA POINT
        //PRIVATE INTERNAL POINT CLASS DERIVED OF POLYAREA
        /**
          * POINT OBJECT WITH PROPERTIES AND DRAWING METHOD IN THE CONTEXT OF PASSED DRAWING.
          * Extended of  'PolyArea' to access basic variables and basic objects GETTER (this, canvas, context, ...)
          * <p>To constructor can be passed to the drawing context (canvasContext), otherwise it will attempt to use the global context
          * 'ctx', yet if it is detected that the context is null, the drawing methods don't anything on the canvas (obviously) although
          * present errors, simply his method 'draw ()' returns 'FALSE'.</p>
          * <p>This method allows to represent a point (round, square, with halo, ...) at the coordinates listed in 'x' and 'y', size and
          * color will be variable according to the parameters set.</p>
          * PARAMETERS / PROPERPIES:
          * <ul>
          *   <li>'x' e 'y' <number> represent the canvas coordinates.</li>
          *   <li>size <number> size Point (pixels)</li>
          *   <li>proportionX <number> the proportion of the X coordinates of this point. To drawing will take present, resulting in a value
          * of X by multiplying this proportion; ALTHOUGH THE ORIGINAL VALUE OF 'X' does not change. (Default 1)</li>
          *   <li>proportionY <number> the proportion of the Y coordinates of this point. To drawing will take present, resulting in a value
          * of Y by multiplying this proportion; ALTHOUGH THE ORIGINAL VALUE OF 'Y' does not change. (Default 1)</li>
          *   <li>invertX <boolean> invert or not the X coordinate point. The drawing will take present, resulting in an inverted X value
          * (changed sign); ALTHOUGH THE ORIGINAL VALUE OF 'X' does not change. (Default 'false')</li>
          *   <li>invertX <boolean> invert or not the Y coordinate point. The drawing will take present, resulting in an inverted Y value
          * (changed sign); ALTHOUGH THE ORIGINAL VALUE OF 'Y' does not change. (Default 'true')</li>
          *   <li>color <string array> It contains an colors array of point (interior and outer circle): color=[innerColor, outerColor]</li>
          *   <li>type <string> any of the following strings: "round", "roundBox", "quad", "quadBox"</li>
          *   <li>ctx <context> the context passed to constructor. (or failing the global)</li>
          * </ul>
          * METHODS:
          * <ul>
          *   <li>clone()
          *        Clones the element without references. Returns an exact copy of this point, but it is another object.</li>
          *   <li>setProportion( proportion )
          *        A FLOAT value indicating the proportion of both the X and Y coordinates. Set the same value for 'proportionX' and
          *       'proportionY'; ALTHOUGH THE ORIGINAL VALUE OF 'X' and 'Y' does not change.</li>
          *   <li>setInvert( invert )
          *        A Boolean value indicating whether to invert (change the sign) the value of both the X and Y coordinates. Set the
          *       same value for 'invertX' and 'invertY'; ALTHOUGH THE ORIGINAL VALUE OF 'X' and 'Y' does not change.</li>
          *   <li>draw()
          *        It is responsible for drawing the point on the canvas with established parameters. It also takes present the proportion
          *       and invert. Returns 'false' if the context isn't detected, otherwise it returns the own object 'this' to allow 'chaining'.</li>
          * </ul>
          */
        var Point = (function () {
            function Point($parent, $super) {
                if (!$super) {
                    $super = $parent || canvasShapes.getInstance();
                }
                var _TAG = "Point";
                var _name = canvasShapes.ABC.next(); //STATIC REQUEST OF NEW LETTER
                var _id = (_TAG + "[" + _name + "]-" + (new Date().getTime()) + "-" + Math.floor((Math.random() * 100) + 1));
                var _children = []; //NO CHILDREN
                /** This refers to the object of a higher order 'PolyArea' to which it belongs. */
                var _super = $super || $parent; //= canvasShapes.getInstance();
                /** the object 'shape' father owned is concerned. Does not necessarily coincide with '_super'. */
                var _parent = $parent || $super; //= canvasShapes.getInstance();
                if ((_super === null) && (_parent === null)) {
                    return null;
                }
                var _x = 0;
                var _y = 0;
                var _info = "";
                /////
                //PRIVATES VARS GETTERs && SETTERs
                /** It shows, with only informative intention, the hallmark of this class, exclusive label '_TAG' */
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
                        this.update();
                    }
                };
                this.getChildren = function () { return _children; };
                this.setChildren = function (children) {
                    //IT HASN'T CHILDREN
                };
                /** This refers to the object of a higher order 'PolyArea' to which it belongs. */
                this.getSuper = function () { return _super; };
                /** the object 'shape' father owned is concerned. Does not necessarily coincide with '_super'. */
                this.getParent = function () { return _parent; };
                /** In establishing the father it is when it is added as a child from here. */
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
                    this.buildInfo();
                };
                /** This method purifies and sanitizes the children, only allowing valids. */
                this.sanitizeChildren = function () {
                    //NO CHILDREN
                    return [];
                };
                //PUBLICS PROPERTIES
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
            }
            /** Clones the element without references. Returns an exact copy of this point (<del>with another id and another name</del>), but it
              * is another object. */
            Point.prototype.clone = function () {
                var p = new canvasShapes.PolyArea.Point(this.getSuper());
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
                p.drawChildren = this.drawChildren;
                p.type = this.type;
                p.ctx = this.ctx;
                p.fill = this.fill;
                p.gradient = this.gradient;
                p.setSelected(this.selected);
                p.setEnabled(this.enabled);
                p.setValido(this.valido);
                return p;
            };
            //OWN METHODS
            Point.prototype.getXComputed = function () {
                return canvasShapes.toXComputed(this.getSuper(), this.getX());
            };
            Point.prototype.getYComputed = function () {
                return canvasShapes.toYComputed(this.getSuper(), this.getY());
            };
            /** Returns an array of points coordinates to display information (TOOLTIP) */
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
            /** Returns an array of pairs of X and Y coordinates of this point.
              * The output array returned will be delivered in the form XY = [[x, y]] */
            Point.prototype.coordinates = function (withProportion, withInvert) {
                return [[canvasShapes.toDecimals(this.getX(), this.getSuper().decimals),
                        canvasShapes.toDecimals(this.getY(), this.getSuper().decimals)]];
            };
            /** Returns an array of X and Y coordinates of the point, separated.
              * The output array returned will be delivered in the form XY = [[x], [y]] */
            Point.prototype.coordinatesXY = function () {
                return [[canvasShapes.toDecimals(this.getX(), this.getSuper().decimals)],
                    [canvasShapes.toDecimals(this.getY(), this.getSuper().decimals)]];
            };
            /** Move point a number of x and y coordinates. */
            Point.prototype.move = function (x, y) {
                //MOVE THE POINT ADDING THESE COORDINATES
                this.moveTo((this.getX() + x), (this.getY() + y));
                return this;
            };
            /** Move point to the x and y coordinates. */
            Point.prototype.moveTo = function (x, y) {
                //MOVE THE POINT TO THESE COORDINATES
                this.setX(x);
                this.setY(y);
                return this;
            };
            /** It is deleted from the points array, and if the parameter is true, also delete your children (doesn't has children). */
            Point.prototype.remove = function (spread) {
                var p1 = -1;
                for (var i = 0; i < this.getSuper().getChildren().Points.length; i++) {
                    if (this.getSuper().getChildren().Points[i].getId() === this.getId()) {
                        p1 = i;
                    }
                }
                if (p1 > -1) {
                    this.removeChildren(spread);
                    this.getSuper().getChildren().Points.splice(p1, 1);
                    this.setValido(false);
                    this.getSuper().sanitize();
                    this.getSuper().draw();
                }
            };
            /** Delete all children (doesn't has children). */
            Point.prototype.removeChildren = function (spread) {
            };
            /** Check if another point is the same as this. He has to have the equal 'id' and equal coordinates. */
            Point.prototype.isEqual = function (point) {
                return (this.isEqualCoordinates(point) && (point.getId() === this.getId()));
            };
            /** Check if another point has the same coordinates as this. */
            Point.prototype.isEqualCoordinates = function (point) {
                return ((point.getY() === this.getY()) && (point.getX() === this.getX()));
            };
            /** Represents (drawing) the point in your context. */
            Point.prototype.draw = function () {
                if (this.getParent().getConf().drawPoints) {
                    //POINT
                    var ctx = this.getContext();
                    if (!this.valido || !ctx) {
                        return null;
                    }
                    this.getSuper().setPointsProportion();
                    var x = this.getXComputed();
                    var y = this.getYComputed();
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
                    ctx.fill(); //if 'fill' function is called, the route is closed
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
                    ctx.stroke(); //before 'stroke' function, you must close
                    if (this.showName) {
                        //TEXT
                        ctx.fillStyle = "#333333";
                        ctx.font = "bold " + (this.size * 5) + 'pt "Times New Roman"';
                        ctx.lineWidth = 1;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(this.getName(), x + 5, y + 5);
                    }
                    //DRAW CHILDREN
                    //if(this.drawChildren){ }
                    return this;
                }
            };
            return Point;
        })();
        PolyArea.Point = Point;
    })(PolyArea = canvasShapes.PolyArea || (canvasShapes.PolyArea = {}));
})(canvasShapes || (canvasShapes = {}));
//END MODULE: POINT

/// <reference path="canvasShapes.PolyArea.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.PolyArea.Segment.js' (OBJECT-CLASS) Segment drawing object on the canvas.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: SEGMENT
(function (canvasShapes) {
    var PolyArea;
    (function (PolyArea) {
        "use-strict";
        //PRIVATE INTERNAL SEGMENT CLASS DERIVED OF POLYAREA
        /**
          * SEGMENT OBJECT WITH PROPERTIES AND DRAWING METHOD IN THE CONTEXT OF PASSED DRAWING..
          * <p>This method allows to represent a segment at the coordinates of points passed as parameters, size and color will be
          * variable according to the parameters set.</p>
          * <p>To the constructor is to passed the parent object (POLYAREA) of the context "canvasContext" and the top object (CANVASSHAPES)
          * will be obtained. If it is detected that the context is null, the drawing methods do not draw to anything on the canvas (obviously),
          * but they also don't will present errors, simply his method 'draw ()' will returns 'FALSE'.</p>
          * PAREMTERS:
          * <ul>
          *   <li>'p1' y 'p2' <Point> represent endpoints segemnt.</li>
          *   <li>size <number> the size (thickness) of segment line (pixels)</li>
          *   <li>proportionX <number> the proportion of the X coordinates of this segment. Although not affect to calculations, to drawing it
          *       if is taken into account, resulting in a multiplication value of the X of the Points for this proportion; ALTHOUGH THE ORIGINAL
          *       VALUE 'X' IN THE POINTS NOT VARY. (default 1)</li>
          *   <li>proportionY <number> the proportion of the Y coordinates of this segment. Although not affect to calculations, to drawing it
          *       if is taken into account, resulting in a multiplication value of the Y of the Points for this proportion; ALTHOUGH THE ORIGINAL
          *       VALUE 'Y' IN THE POINTS NOT VARY. (default 1)</li>
          *   <li>invertX <boolean> invert or not the X coordinates of points. Only to draw will take into account, resulting in a reverse value
          *       of the 'X' coordinates to points (changed sign); ALTHOUGH THE ORIGINAL VALUE 'X' IN THE POINTS NOT VARY. (default 'false')</li>
          *   <li>invertX <boolean> invert or not the Y coordinates of points. Only to draw will take into account, resulting in a reverse value
          *       of the 'Y' coordinates to points (changed sign); ALTHOUGH THE ORIGINAL VALUE 'Y' IN THE POINTS NOT VARY. (default 'true')<</li>
          *   <li>type <string array> an array of two strings representing style for 'lineCap' y 'lineJoin', can take any of the following
          *       strings: lineCap = ['butt','round','square'];  lineJoin = ['round','bevel','miter'];</li>
          *  <li>drawPoints <boolean> indicates if also it must draw its endpoints or not. (default YES)</li>
          *   <li>ctx <context> the context passed to constructor. (or failing the global)</li>
          * </ul>
          * METHODS:
          * <ul>
          *   <li>clone()
          *        Clones the element without references. Returns an exact copy of this segment, but it is another object.</li>
          *   <li>setProportion( proportion )
          *        A FLOAT value indicating the proportion of both the P1 and P2. Set the same value for 'proportionX' and
          *       'proportionY'</li>
          *   <li>setInvert( invert )
          *        A Boolean value indicating whether to invert (change the sign) the value of both the X and Y coordinates and their Points.
          *        Set the same value for 'invertX' and 'invertY'; ALTHOUGH THE ORIGINAL VALUE OF 'X' and 'Y' OF POINTS does not change.</li>
          *   <li>draw()
          *        It is responsible for drawing the segment and their points on the canvas with established parameters. It also takes present
          *        the proportion and invert. Returns 'false' if the context isn't detected, otherwise it returns the own object 'this' to allow
          *        'chaining'</li>
          *   <li>... among others. </li>
          * </ul>
          */
        var Segment = (function () {
            function Segment($parent, $super) {
                if (!$super) {
                    $super = $parent || canvasShapes.getInstance();
                }
                var _TAG = "Segment";
                var _name = ""; //canvasShapes.ABC.next(); //STATIC REQUEST OF NEW LETTER
                var _id = (_TAG + "[" + _name + "]-" + (new Date().getTime()) + "-" + Math.floor((Math.random() * 100) + 1));
                var _children = []; //SIN HIJOS
                /** This refers to the object of a higher order 'PolyArea' to which it belongs. */
                var _super = $super || $parent; //= canvasShapes.getInstance();
                /** the object 'shape' father owned is concerned. Does not necessarily coincide with '_super'. */
                var _parent = $parent || $super; //= canvasShapes.getInstance();
                if ((_super === null) && (_parent === null)) {
                    return null;
                }
                var _p1 = null;
                var _p2 = null;
                var _info = "";
                /////
                _children = [_p1, _p2];
                //PRIVATES VARS GETTERs && SETTERs
                /** It shows, with only informative intention, the hallmark of this class, exclusive label '_TAG' */
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
                /** This refers to the object of a higher order 'PolyArea' to which it belongs. */
                this.getSuper = function () { return _super; };
                /** the object 'shape' father owned is concerned. Does not necessarily coincide with '_super'. */
                this.getParent = function () { return _parent; };
                /** In establishing the father it is when it is added as a child from here. */
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
                        if ((_children.length === 2) && _children[0]) {
                            this.update();
                        }
                    }
                    return this;
                };
                this.update = function () {
                    this.sanitizeChildren();
                    this.buildInfo();
                };
                /** This method purifies and sanitizes the children, only allowing valids. */
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
                    return children;
                };
                //PUBLICS PROPERTIES
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
            }
            /** Clones the element without references. Returns an exact copy of this segment (<del>with another id and another name</del>), but it
              * is another object. */
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
                return s;
            };
            //OWN METHODS
            /** Returns an array of points coordinates to display information (TOOLTIP) */
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
            /** Returns the calculated distance between the two points. Alias 'perimeter (..)', are not taken into account neither the
              * proportions nor invert. */
            Segment.prototype.distance = function () { return this.perimeter(); };
            /** PERIMETER. (Pythagoras Theorem)
              * Returns the distances between two points that make up this segment. NO are taken into account neither the proportions nor invert.
              * NOTE: The action taken will coincide with the 'distance (..)' method provided that there are no proportions or invert */
            Segment.prototype.perimeter = function () {
                var perimetro = 0;
                if (!this.getP1() || !this.getP2()) {
                    return perimetro;
                }
                //PYTHAGORAS. HYPOTENUSE
                perimetro = Math.pow(Math.pow(parseFloat(this.getP2().getX() + "") - parseFloat(this.getP1().getX() + ""), 2) +
                    Math.pow(parseFloat(this.getP2().getY() + "") - parseFloat(this.getP1().getY() + ""), 2), 1 / 2);
                return Math.abs(parseFloat(perimetro + ""));
            };
            ;
            /** Synonymous with 'perimeter()' */
            Segment.prototype.getPerimeter = function () { return this.perimeter(); };
            /** ELEMENTO UNIDIMENSIONAL, NO TIENE ÁREA */
            Segment.prototype.area = function () { return 0; };
            /** Synonymous with 'area()' */
            Segment.prototype.getArea = function () { return this.area(); };
            /** Returns an array of pairs of X and Y coordinates of the two points that make up this segment.
              * The output returned array will be delivered in the form XY = [ [x1, y1], [x2, y2] ] */
            Segment.prototype.coordinates = function () {
                if (!this.getP1() || !this.getP2()) {
                    return [];
                }
                var pointsXY = [];
                this.getChildren().forEach(function (p) {
                    pointsXY.push(p.coordinates()[0]);
                }, this);
                return pointsXY;
            };
            /** Get an array of X and Y ALL POINTS THAT MAKE THIS SEGMENT. (An array with two arrays of two elements)
              * Converts an array of points x, y coordinates of the points in this segment, in an array with all coordinates separating the x of
              * the y, I mean, that returns an array with two elements: an array of x (to turn two elements), and an array of y (turn two elements).
              * This feature is expected to be just useful for the polygon to which it belongs, for example to calculate the area.
              * The array with which work is expected to be of the form: xy = [ [x1, y1], [x2, y2] ]
              * The output returned array will be delivered in the form: XY = [ [x1, x2], [y1, y2] ] */
            Segment.prototype.coordinatesXY = function () {
                if (!this.getP1() || !this.getP2()) {
                    return [];
                }
                var xs = [], ys = [];
                this.getChildren().forEach(function (p) {
                    var xy = p.coordinatesXY();
                    xs.push(xy[0][0]);
                    ys.push(xy[1][0]);
                }, this);
                return [xs, ys];
            };
            /** NO COMMENTS: Take the central point */
            Segment.prototype.getCentralPoint = function () {
                return canvasShapes.mediumP1P2(this.getP1(), this.getP2());
            };
            /** Returns an array of the points it contains. */
            Segment.prototype.getPoints = function () {
                return this.getChildren();
            };
            /** Moves the segment (all children) a number of coordinates x and y.
              * Acts as if the entire segment to migrating from its axis of gravity (central point) */
            Segment.prototype.move = function (x, y) {
                this.getChildren().forEach(function (p) {
                    p.move(x, y); //MOVE THE POINT ADDING THESE COORDINATES
                }, this);
                this.update();
                return this;
            };
            /** Move the segment center point (and all children) to the x- and y-coordinates. */
            Segment.prototype.moveTo = function (x, y) {
                var centralPoint = this.getCentralPoint();
                var newX = x - centralPoint.getX();
                var newY = y - centralPoint.getY();
                centralPoint = null; //NULLIFY
                this.getChildren().forEach(function (p) {
                    p.move(newX, newY); //MOVE THE POINT ADDING THE COORDINATES DIFFERENCE
                }, this);
                this.update();
                return this;
            };
            /** It self deletes from the array of segments, and if the parameter is true, also delete your children (points). */
            Segment.prototype.remove = function (spread) {
                var s1 = -1;
                for (var i = 0; i < this.getSuper().getChildren().Segments.length; i++) {
                    if (this.getSuper().getChildren().Segments[i].getId() === this.getId()) {
                        s1 = i;
                    }
                }
                if (s1 > -1) {
                    this.removeChildren(spread);
                    this.getSuper().getChildren().Segments.splice(s1, 1);
                    this.setValido(false);
                    this.getSuper().sanitize();
                    this.getSuper().draw();
                }
            };
            /** Deletes all the points it contains, if the parameter is true. */
            Segment.prototype.removeChildren = function (spread) {
                if (spread && this.getP1() && this.getP2()) {
                    this.getP1().remove(spread);
                    this.getP2().remove(spread);
                    this.setP1(null);
                    this.setP2(null);
                }
            };
            /** Check if another point is the same as this. You must have the equal 'id' and the equal coordinates. */
            Segment.prototype.isEqual = function (segment) {
                return (this.isEqualCoordinates(segment) && (segment.getId() === this.getId()));
            };
            /** Check if another segment has the same coordinates as this. */
            Segment.prototype.isEqualCoordinates = function (segment) {
                return ((segment.getP1().getX() === this.getP1().getX()) && (segment.getP1().getY() === this.getP1().getY()) &&
                    (segment.getP2().getX() === this.getP2().getX()) && (segment.getP2().getY() === this.getP2().getY()));
            };
            /** Represents (drawing) the segment in your context. */
            Segment.prototype.draw = function () {
                //SEGMENT
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
                    //SEGMENT
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
                    ctx.fill(); //if 'fill' function is called, the route is closed
                    if (this.showName) {
                        //TEXT
                        var p = this.getCentralPoint();
                        ctx.font = "italic " + (this.size * 8 + 4) + 'pt Calibri';
                        ctx.lineWidth = 1;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        // stroke color
                        //ctx.strokeStyle = 'blue';
                        //ctx.strokeText(this.name, p.x, p.y);
                        ctx.fillStyle = "blue"; //this.color;
                        ctx.fillText(this.getName(), p.getXComputed(), p.getYComputed());
                        ctx.strokeStyle = "blue";
                        var dim = ctx.measureText(this.getName());
                        ctx.strokeRect(p.getXComputed() - (this.size * 4 + 4) / 2, p.getYComputed() - (this.size * 4 + 4), dim.width, 0.5);
                    }
                    ctx.closePath();
                    //DRAW CHILDREN
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

/// <reference path="canvasShapes.PolyArea.ts" />
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.PolyArea.Polygon.js' (OBJECT-CLASS) Polygon drawing object on the canvas.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: POLYGON
(function (canvasShapes) {
    var PolyArea;
    (function (PolyArea) {
        "use-strict";
        //PRIVATE INTERNAL POLYGON CLASS DERIVED OF POLYAREA
        /** 'Polygon' (OBJECT) - graphic figure Polygon, needs a context (canvas) which represented contains children: Segments and Points. */
        var Polygon = (function () {
            function Polygon($parent, $super) {
                if (!$super) {
                    $super = $parent || canvasShapes.getInstance();
                }
                var _TAG = "Polygon";
                var _name = ""; //canvasShapes.ABC.next(); //STATIC REQUEST OF NEW LETTER
                var _id = (_TAG + "[" + _name + "]-" + (new Date().getTime()) + "-" + Math.floor((Math.random() * 100) + 1));
                var _children = [];
                /** This refers to the object of a higher order 'PolyArea' to which it belongs. */
                var _super = $super || $parent; //= canvasShapes.getInstance();
                /** the object 'shape' father owned is concerned. Does not necessarily coincide with '_super'. */
                var _parent = $parent || $super; //= canvasShapes.getInstance();
                if ((_super === null) && (_parent === null)) {
                    return null;
                }
                var _info = "";
                /////
                //GETTERs && SETTERs DE VARIABLES PRIVADAS
                /** It shows, with only informative intention, the hallmark of this class, exclusive label '_TAG' */
                this.getTAG = function () { return _TAG; };
                /** Getter method to take this object id. ATTENTION: IT IS NOT THE ID OF CANVAS. */
                this.getId = function () { return (_TAG + "[" + _name + "]-" + (new Date().getTime()) + "-" + Math.floor((Math.random() * 100) + 1)); };
                this.setId = function (id) {
                    _id = id;
                    this.update();
                };
                /** Getter method for taking this element name. */
                this.getName = function () { return _name; };
                /** Setter method to set this element name. It involves a refresh in some of its parts. */
                this.setName = function (name) {
                    if ((typeof (name)).toUpperCase() !== "UNDEFINED") {
                        _name = name;
                        _id = this.getId();
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
                /** This refers to the object of a higher order 'PolyArea' to which it belongs. */
                this.getSuper = function () { return _super; };
                /** the object 'shape' father owned is concerned. Does not necessarily coincide with '_super'. */
                this.getParent = function () { return _parent; };
                /** In establishing the father it is when it is added as a child from here. */
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
                /** PUBLIC: getter method for this object settings. Actually you get the conf. inherited */
                this.getConf = function () {
                    return _super.getConf();
                };
                this.update = function () {
                    this.sanitizeChildren();
                    this.buildInfo();
                };
                /** This method purifies and sanitizes the children, only allowing valids. */
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
                //PUBLIC PROPERTIES
                this.size = 1;
                this.showName = _parent.showNames;
                this.proportionX = _parent.proportionX;
                this.proportionY = _parent.proportionY;
                this.invertX = _parent.invertX;
                this.invertY = _parent.invertY;
                this.border = "navy";
                this.color = "lightBlue";
                this.drawChildren = _parent.getConf().polygonsDrawChildren;
                this.type = ["round", "round"]; //[lineCap, lineJoin] ==> lineCap = ['butt','round','square'];  lineJoin = ['round','bevel','miter'];
                this.drawSegments = _parent.getConf().drawSegments;
                this.ctx = _parent.getContext();
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
                _id = this.getId();
                this.buildInfo();
            }
            /** Clones the element without references. Returns an exact copy of this polygon (<del>with another id and another name</del>), but it
              * is another object. */
            Polygon.prototype.clone = function () {
                var pol = new canvasShapes.PolyArea.Polygon(this.getSuper());
                this.getChildren().forEach(function (s) {
                    pol.getChildren().push(s.clone());
                }, this);
                pol.setName(this.getName());
                pol.showName = this.showName;
                pol.size = this.size;
                pol.setProportionX(this.proportionX);
                pol.setProportionY(this.proportionY);
                pol.setInvertX(this.invertX);
                pol.setInvertY(this.invertY);
                pol.border = this.border;
                pol.color = this.color;
                pol.drawChildren = this.drawChildren;
                pol.type = this.type;
                pol.drawSegments = this.drawSegments;
                pol.ctx = this.ctx;
                pol.fill = this.fill;
                pol.gradient = this.gradient;
                pol.setSelected(this.selected);
                pol.setEnabled(this.enabled);
                pol.setValido(this.valido);
                return pol;
            };
            //OWN METHODS
            /** Returns an array of points coordinates to display information (and place TOOLTIP) */
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
            /** DISTANCE: Alias 'perimeter (..)'. It remains for compatibility with children.
              * @see this.perimeter(Boolean, Boolean)
              */
            Polygon.prototype.distance = function () { return this.perimeter(); };
            /** PERIMETER. (Pythagoras Theorem)
              * Returns the sum of the distances of all the points that make up this polygon supposing CLOSED, calculated between all two points
              * of each of the segments. NO are taken into account neither the proportions nor invert.
              * NOTE: The action taken will coincide with the 'distance (..)' method provided that there are no proportions or invert */
            Polygon.prototype.perimeter = function () {
                var perimetro = 0;
                this.getChildren().forEach(function (s) {
                    perimetro += s.perimeter();
                }, this);
                return Math.abs(parseFloat(perimetro + ""));
            };
            ;
            /** Synonymous with 'perimeter()' */
            Polygon.prototype.getPerimeter = function () { return this.perimeter(); };
            /** TAKEN IDEA FROM: http://www.mathopenref.com/coordpolygonarea2.html
              * FUNCTION TO CALCULATE THE POLYGON AREA (Regular / Irregular). Straight polygons only, not curved.
              * It's the same as saying that it can be used to calculate any flat geometric figure, 2D, straight and closed, with edges and vertices.
              * I mean, either from the triangle (this included).
              * Fits any polygon: Regular-Irregular. It is based on the formula of 'Gauss Theorem', also known as 'method of the loop'.
              * Works with two arrays of points coordinates (grouped) that would represent this polygon, grouping Xs and Ys in two
              * arrays: [[x1, x2, x3, ...], [y1, y2, y3, ... ]]. This array can be obtained with the method 'coordinatesXY ()'
              * WARNING: Failure cases (which are over-exposed or cross) exceptional figures.
              * NOT TAKEN INTO ACCOUNT OR INVERTS OR SHARE
              * EJ.:
              * var xPts = [4,  4,  8,  8, -4,-4];
              * var yPts = [6, -4, -4, -8, -8, 6];
              * var a = area(xPts, yPts, 6);
              * alert("Area  = " + a); // Area = 128
              * ANOTHER EXAMPLE OF WIKIPEDIA: https://es.wikipedia.org/wiki/F%C3%B3rmula_del_%C3%A1rea_de_Gauss
              * xs=[5,12,9,5,3]
              * ys=[11,8,5,6,4]
              * @return {number} the polygon area
              */
            Polygon.prototype.area = function () {
                var area = 0; // Accumulates area in the loop
                var xs = this.coordinatesXY()[0];
                var ys = this.coordinatesXY()[1];
                var numPoints = Math.min(xs.length, ys.length);
                for (var i = 0, j = (numPoints - 1); i < numPoints; i++) {
                    area += parseFloat(((parseFloat(xs[j] + "") + parseFloat(xs[i] + "")) * (parseFloat(ys[j] + "") - parseFloat(ys[i] + ""))) + "");
                    j = i; //j is the previous vertex to i
                }
                return Math.abs(parseFloat((area / 2) + ""));
            };
            /** Synonymous with 'area()' */
            Polygon.prototype.getArea = function () { return this.area(); };
            /**
              * You get an array of all 'X and Y' pairs of  points coordinates that make up this polygon.
              * The output returned array will be delivered in the form XY = [ [x1, y1], [x2, y2], ..., [xn, yn] ]
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
              * Get an array of X and Y ALL POINTS THAT MAKE THIS POLYGON.
              * Converts an points array with 'x and y' coordinates for this polygon, in an array with all coordinates separating the x of
              * the y, I mean, that returns an array with two elements: an array of x , and an array of y.
              * This feature is expected to be just useful for area function, .
              * var XY=coordinatesXY();
              * var area = area(XY[0], XY[1]);
              * The array with which work is expected to be of the form: xy = [ [x1, y1], [x2, y2], ..., [xn, yn] ]
              * The output returned array will be delivered in the form XY = [ [x1, x2, ..., xn], [y1, y2, ..., yn] ]
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
            /** CENTROID: gravitational center point (BARYCENTER, GRAVICENTER) of the polygon. Returns the coordinates of that point */
            Polygon.prototype.centroide = function () {
                //BARYCENTER
                var XY = this.coordinatesXY();
                var n = XY[0].length;
                var Xs = 0, Ys = 0;
                for (var i = 0; i < n; i++) {
                    Xs += XY[0][i];
                    Ys += XY[1][i];
                }
                return [Xs / n, Ys / n];
            };
            /** Returns an points array it contains. (REGARDLESS IF THEY ARE REPEATED) */
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
            /** Returns an array containing segments. This is synonymous with 'getChildren ()' */
            Polygon.prototype.getSegments = function () {
                return this.getChildren();
            };
            /** Moves the polygon (all children) a number of coordinates x and y.
              * Acts as if the entire polygon from migrating from its axis of gravity or Baricentro (CENTROID) */
            Polygon.prototype.move = function (x, y) {
                this.getChildren().forEach(function (s) {
                    s.move(x, y); //MOVE THE POINT ADDING THESE COORDINATES
                }, this);
                this.update();
                return this;
            };
            /** Move the center point of the polygon (and all children) to the x- and y-coordinates.
              * Acts as if the entire polygon from migrating from its axis of gravity or Baricentro (CENTROID) */
            Polygon.prototype.moveTo = function (x, y) {
                var centroideXY = this.centroide();
                var newX = x - centroideXY[0];
                var newY = y - centroideXY[1];
                //centroide = null; //NULLIFY
                this.getChildren().forEach(function (s) {
                    s.move(newX, newY); //MOVE THE POINT ADDING THE COORDINATES DIFFERENCE
                }, this);
                this.update();
                return this;
            };
            /** Remove this object (with possible spread to children and grandchildren, ...) */
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
            /** Eliminates children (with possible spread to grandchildren, ...) */
            Polygon.prototype.removeChildren = function (spread) {
                if (spread) {
                    while (this.getChildren().length > 0) {
                        this.getChildren()[0].remove(spread);
                        this.getChildren().splice(0, 1);
                    }
                }
            };
            /** Removes a son segment which is passed as a parameter (with possible spread to grandchildren, ...) */
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
            /** Add a point to the polygon. KEEP ALL PREVIOUS CHILDREN.
              * Although not remove any child, this forces partly rebuild.*/
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
                    //Remove the last segment (we'll split in two) but no their points
                    this.removeSegment(lastSeg, false);
                    //CREATE TWO SEGMENTS
                    var newSegment1 = new canvasShapes.PolyArea.Segment(this, this.getSuper());
                    newSegment1.setP1(lastPoint);
                    newSegment1.setP2(newPoint);
                    var newSegment2 = new canvasShapes.PolyArea.Segment(this, this.getSuper());
                    newSegment2.setP1(newPoint);
                    newSegment2.setP2(firstPoint);
                    //ADDS NEW SEGMENTS CREATED
                    this.addSegment(newSegment1);
                    this.addSegment(newSegment2);
                }
            };
            /** Add a segment to Polygon. KEEP ALL PREVIOUS CHILDREN.
              * Although not remove any child, this forces partly rebuild. */
            Polygon.prototype.addSegment = function (newSegment) {
                this.getChildren().push(newSegment);
                this.getParent().addSegment(newSegment);
                this.update();
            };
            /** Check whether another polygon is the same as this. You must have the same 'id' and the same coordinates. */
            Polygon.prototype.isEqual = function (polygon) {
                return (this.isEqualCoordinates(polygon) && (polygon.getId() === this.getId()));
            };
            /** Check if another polygon has the same coordinates as this. */
            Polygon.prototype.isEqualCoordinates = function (polygon) {
                /*var equalCoordinates: boolean = false;
                this.getChildren().forEach(function(s: canvasShapes.PolyArea.Segment) {
                       //equalCoordinates &&= s.isEqualCoordinates(s);
                }, this);
                return equalCoordinates;*/
                return (this.coordinates() + "") === (polygon.coordinates() + "");
            };
            /** Represents (drawing) the polygon (with yours points and segments) in your context. */
            Polygon.prototype.draw = function () {
                //POLYGON
                if (this.getParent().getConf().drawPolygons) {
                    var ctx = this.getContext();
                    if (!this.valido || !ctx) {
                        return null;
                    }
                    this.getSuper().setPointsProportion();
                    //variables shortcuts
                    var segs = this.getSegments();
                    //NAME
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
                    //SEGMENTS
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
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill(); //if 'fill' function is called, the route is closed
                    //BARYCENTER // CENTROID
                    var centroide = this.centroide();
                    //COMPUTE
                    centroide[0] = canvasShapes.toXComputed(this.getSuper(), centroide[0]);
                    centroide[1] = canvasShapes.toYComputed(this.getSuper(), centroide[1]);
                    ctx.beginPath();
                    ctx.fillStyle = this.color;
                    ctx.arc(centroide[0], centroide[1], this.size * 2, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
                    ctx.restore();
                    //DRAW CHILDREN
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
//# sourceMappingURL=canvasShapes.js.map