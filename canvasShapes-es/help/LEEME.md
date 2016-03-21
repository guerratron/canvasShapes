> -----------------------------------------------------------------------------------------------------
>   'canvasShapes' (namespace) - Librería de creación, manipulado y cálculo de figuras geométricas planas.  
>   Library: 'PolyArea'.  
>   Author: Juan José Guerra Haba - dinertron@gmail.com - Marzo de 2016  
>   License: Free BSD. & Open GPL v.3. Mantener los créditos, por favor.  
>   Versión: 0.9.0 BETA  
>   File: canvasShapes.js               Main Class: PolyArea.js  
>
> ----------------------------------------------------------------------------------------------------

# canvasShapes
 Es una librería para el dibujado de figuras geométricas con eventos asociados.

 Muestra cálculos geométricos \(áreas, perímetros, ...\) y admite un modo de dibujado
libre "a mano alzada"; además presenta una interfaz gráfica con botonera de acciones 
y una ventana de opciones dónde visualizar/modificar algunos de los múltiples parámetros
que admite.

 *CANVAS-SHAPES* es en realidad un espacio de nombres que alberga la librería **PolyArea** 
que es la encargada del grueso de dibujado de las figuras, aunque también alberga objetos 
y métodos de utilidad en módulos separados.  
Trabaja sobre un elemento HTML *canvas* que se autoconstruye y sobre el que se ha implementado
una recepción de eventos para la creación y modificado de las figuras (puntos, segmentos, ...)

## Uso
 Tras la carga del archivo en la zona *head* \(`<script src=".../canvasShapes.js" ... ></script>`\)
puede empezar a utilizarse la librería bajo el namespace: *'canvasShapes'*. Podría por ejemplo 
comenzarse con el visionado de la UI a través del método 

    canvasShapes.render( {id: "idElement"} ); 

dónde la cadena *'idElement'* se espera que identifique al elemento contenedor, osea, el elemento 
en el cual embeber toda la *UI*.  
 A partir de aquí ya todo se realiza de forma visual e interactiva en la **GUI**.

## Características:
- Filosofía OOP, clases, herencia, modularidad, abstracción, ...
- Características *ECMASCRIPT* 6 como `"use-strict"`.
- Cross-Browser.
- Modularidad y Abstracción mediante módulos-js y Closures.
- Agrupación de módulos en un único archivo para simplificar la llamada de carga en el *'head'*.
- CSS auto-contenido, *media-queries*, patrones *'bootstrap'*.
- *IMPORTANTE !!* : Asignación de eventos a las figuras en el *'canvas'*.  
 Esto es realmente **NOVEDOSO** ya que de todos es sabido que lo dibujado en un canvas no permite 
eventos, puesto que no son objetos, pero la librería logra implementarlos reconociendo las figuras 
dibujadas como objetos.


## Desarrollo
Desarrollado por [GuerraTron](mailto://dinertron@gmail.com "autor") @2016

### Herramientas
Notepad ++  

Creado con [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org)) 
Nodeclipse es un proyecto de código-abierto que se crece con sus contribuciones.

### Autor: 
 <cite>Espero que pueda serle de utilidad a alguien como lo ha sido para mí. En tal caso se agradecería email 
comentando su uso o sugerencias para futuras mejoras.</cite> &nbsp; 
     ¡ POR FAVOR, MANTENER CRÉDITOS Y ENLACES. GRACIAS !
