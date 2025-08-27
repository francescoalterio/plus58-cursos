# Capítulo 1.1 Primeros Widgets: Label y Button

## Objetivo del capítulo

Crearás tus primeros widgets visibles: una etiqueta (Label) y un botón (Button). Entenderás qué es un widget, cómo se coloca dentro de la ventana y qué significa "empaquetar" un widget. Finalizarás pudiendo modificar textos y observar cambios inmediatos.

---

## 1.1.1 ¿Qué es un Widget?

Un widget es un elemento visual dentro de tu ventana: puede mostrar texto, permitir escribir, ser un botón que el usuario pulsa, etc. Piensa en la ventana como una mesa y los widgets como objetos que colocas encima (cajas, papeles, herramientas).

En Tkinter, cada widget es un objeto de Python que creas con su clase correspondiente: `Label`, `Button`, `Entry`, etc.

Características clave de un widget:

- Tiene un "padre" (normalmente la ventana principal u otro contenedor como un Frame).
- Puede configurarse (cambiar texto, color, tamaño, etc.).
- Debe indicarse cómo se mostrará en pantalla usando un gestor de geometría (en este capítulo sólo usaremos `pack`).

---

## 1.1.2 Crear un Label con Texto Simple

El widget `Label` muestra texto (o más adelante, imágenes). Ejemplo mínimo:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Label y Button")

label = tk.Label(ventana, text="Hola, soy un Label")  # Crear Label indicando su padre y el texto
label.pack()  # Mostrarlo (empaquetarlo) en la ventana

ventana.mainloop()
```

### Explicación:

1. `tk.Label(ventana, text="...")` crea el widget pero todavía NO lo coloca.
2. `label.pack()` le dice a Tkinter: "Coloca este widget en el espacio disponible" siguiendo reglas sencillas (por defecto apila verticalmente).

Si omites `pack()` (o cualquier otro gestor), el widget existe pero no lo verás.

---

## 1.1.3 Mostrar un Button

Un botón es un widget que el usuario puede pulsar. Por ahora solo lo mostraremos sin acción.

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Primer Botón")

boton = tk.Button(ventana, text="Púlsame")
boton.pack()

ventana.mainloop()
```

Puedes combinar ambos widgets:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Etiqueta y Botón")

label = tk.Label(ventana, text="Texto inicial")
label.pack()

boton = tk.Button(ventana, text="Aceptar")
boton.pack()

ventana.mainloop()
```

Observa que aparecen uno debajo del otro. Ese es el comportamiento básico del gestor `pack` sin parámetros extra.

---

## 1.1.4 Orden de Creación y Empaquetado

El orden importa visualmente con `pack()`: lo que empaquetas primero aparece arriba (por defecto). Si inviertes el orden:

```python
boton.pack()
label.pack()
```

Verás el botón arriba y luego la etiqueta.

Esto no significa que siempre debas crear y empaquetar enseguida. Más adelante podrás crear todos tus widgets y luego decidir el orden de empaquetado para mayor claridad.

### ¿Por qué se llama "pack"?

Porque "empaqueta" widgets uno tras otro en un lado disponible. Más adelante aprenderás otros métodos (`grid` y eventualmente verás `place`). Por ahora, pack es suficiente para tus primeros pasos.

---

## 1.1.5 Micro‑Práctica: Cambiar Textos y Ver Resultados

1. Crea un archivo `label_boton.py`.
2. Crea una ventana, un Label con el texto "Estado: Inactivo" y un Button con el texto "Cambiar".
3. No agregues lógica todavía (eso viene pronto). Ejecuta y observa.
4. Cambia el texto del Label a algo distinto y vuelve a ejecutar.

Extra opcional: crea dos Labels seguidos y observa el orden.

---

## Ejemplo Completo Integrado del Capítulo

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Primeros Widgets")

label_principal = tk.Label(ventana, text="Bienvenido a mi primera GUI")
label_principal.pack()

boton_saludo = tk.Button(ventana, text="Sin acción aún")
boton_saludo.pack()

ventana.mainloop()
```

---

## Errores Típicos al Empezar

- Olvidar `pack()` y preguntarse por qué no aparece nada.
- Escribir `Pack()` con mayúscula (Python diferencia mayúsculas/minúsculas).
- Crear widgets dentro de una función y que desaparezcan: por ahora no te preocupes, lo veremos cuando agreguemos lógica y variables.

---

## Mini‑Resumen del Capítulo

- Un widget es un elemento visual (Label, Button, etc.).
- Se crea indicando su padre y parámetros iniciales.
- Debes usar un gestor de geometría para que aparezca (`pack()` es el primero que conoces).
- El orden de empaquetado afecta la disposición.

En el siguiente capítulo aprenderás a hacer que el botón haga ALGO cuando se pulsa: entra en escena el concepto de callback.
