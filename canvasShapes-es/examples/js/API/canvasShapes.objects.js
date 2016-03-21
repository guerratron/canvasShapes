/// <reference path="canvasShapes.ts" />
/*-----------------------------------------------------------------------------------------------------
*   'Canvas-Shapes'. - Librería de creación, manipulado y cálculo de figuras geométricas planas.
*   File: 'canvasShapes.objects.js' (OBJECTS) Objetos de utilidad como "cartesianArt", "icos", "ABC", ...
*   Library: "canvasShapes.js" - Main Class: "canvasShapes.PolyArea.js"
*   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016
*   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.
*   Versión: 1.0.0 BETA-STABLE
*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------
*   File: 'canvasShapes.objects.js' (OBJECTS) Objetos de utilidad como "cartesianArt", "icos", "ABC", ...
*----------------------------------------------------------------------------------------------------*/
// BEGIN MODULE: OBJECTS
var canvasShapes;
(function (canvasShapes) {
    "use-strict";
    //cartesianArt
    /** Objeto con unos ejemplos de dibujos artísticos mediante coordeandas cartesianas.
      * Extraídos de: http://www.mateslibres.com/geometria/arte_puntos_coordenadas_001.php  */
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
    /** Iconos en base 64 para adjuntar al atributo 'src' de las imágenes, al 'href' de las etiquetas 'a',
      * o bien para utilizarlo en CSS en el background como 'url(...)' */
    canvasShapes.icos = (function () {
        /** Prefijo (cabecera) imágenes Base64 en GIF (16X16) */
        var prefImg64GIFx16 = "data:image/gif;base64,R0lGODlhEAAQ";
        /** Prefijo (cabecera) imágenes Base64 en GIF monocromo (16x16) */
        var prefImg64GIF = prefImg64GIFx16 + "AIABAAAAAP///yH5BAEKAAEALAAAAAAQABAAAAI";
        /** Iconos en base 64 para adjuntar al atributo 'src' de las imágenes, al 'href' de las etiquetas 'a',
      * o bien para utilizarlo en CSS en el background como 'url(...)' */
        return {
            /*"PREF":           prefImg64GIF, /*Prefijo GIF monocromo. No utilizar externamente */
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
    /** ENMASCARAMIENTO DE OBJETO:: CLOSURE::
    * OBJETO ESTÁTICO CLOSURE PÚBLICO EXTERNO Y AUTOEJECUTADO.
    * RETIENE UN CONTADOR REAL OCULTO EN EL QUE SE BASA PARA MANEJAR
    * UN ABECEDARIO RETORNANDO UN OBJETO QUE CONTIENE MÉTODOS PARA ITERAR: 'next(), prev(), rand(), ..', OTROS INFORMATIVOS:
    * 'first(), last(), current(), isset(), ..' Y ALGUNA QUE OTRA UTILIDAD ('reset(), setSource(..), pos(), val(), ..').
    * DE ESTA MANERA PUEDE OBTENERSE LA SIGUIENTE LETRA DEL ABECEDARIO, LA ANTERIOR, LA ÚLTIMA UTILIZADA, UNA ALEATORIA, ...
    * La fuente de letras (abecedario) se almacenan en la variable 'source' y pueden reemplazarse en tiempo de ejecución por
    * cualquier array de símbolos mediante el método 'setSource(arraySímbolos)'
    * EJEMPLO:
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
        var i = -1; //Es completamente Secreto e interno, No existe después de Crear el Objeto.
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
            /*iterator: function () { return this.next; },  //RETORNA LA FUNCIÓN NEXT*/
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
