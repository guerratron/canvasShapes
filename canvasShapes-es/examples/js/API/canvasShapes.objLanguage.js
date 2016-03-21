/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.objLanguage.js' (OBJECT) Método que retorna un Objeto que implementa las cadenas de lenguage para la traducción.
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.objLanguage.js' (OBJECT) Método que retorna un Objeto que implementa las cadenas de lenguage para la traducción.
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: LANGUAGE
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    /** Objeto con las cadena de idioma. Si no se se pasa uno, se tomará el inglés por defecto.
     * Tiene los siguientes ítems, y alguno más:
     * <ul>
     *   <li>GENÉRICOS [OPCIONALES]: TITLE, CREDITS, SUBTITLE</li>
     *   <li>FORMULARIO:
     *      <ul>
     *         <li>PUNTOS: FIELDSET_POINTS_ARRAY, FIELDSET_POINTS_EXAMPLES, FIELDSET_POINTS, INPUT_TITLE_XS, INPUT_TITLE_YS,
     *            INPUT_VALUE_CREAR_PUNTOS, INPUT_TITLE_CREAR_PUNTOS, INPUT_VALUE_BORRAR_PUNTOS, INPUT_TITLE_BORRAR_PUNTOS,
     *            INPUT_VALUE_EXAMPLE1, INPUT_TITLE_LINK_EXAMPLE1, INPUT_VALUE_EXAMPLE2, INPUT_TITLE_LINK_EXAMPLE2, LABEL_INPUT_XY,
     *            INPUT_TITLE_XY, BUTTON_TITLE_BORRAR_PUNTO</li>
     *         <li>OPCIONES: FIELDSET_OPTIONS, LABEL_INPUT_DEFORMATION, INPUT_TITLE_DEFORMATION, LABEL_INPUT_GRID, INPUT_TITLE_GRID,
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
     * </ul>
     */
    function objLanguage(lang) {
        lang || (lang = "en-GB");
        //POR DEFECTO INGLÉS
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
                //ESPAÑOL
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
                //YA SE ENCUENTRA DEFINIDO
                break;
            default: //POR DEFECTO INGLÉS
        }
        return retornar;
    }
    canvasShapes.objLanguage = objLanguage;
})(canvasShapes || (canvasShapes = {}));
//END MODULE: LANGUAGE 
