# Capítulo 2.2 Introducción a grid()

## Objetivo del capítulo

Aprender a usar el gestor de geometría `grid()` para colocar widgets en una cuadrícula (tabla lógica) de filas y columnas. Construirás un formulario simple de dos columnas.

---

## 2.2.1 Cuadrícula Conceptual (Filas y Columnas)

`grid()` divide el espacio del contenedor (ventana o Frame) en celdas. Cada celda se identifica por dos números:

- `row` (fila) empezando en 0.
- `column` (columna) empezando en 0.

Colocar un widget en fila 0 columna 0:

```python
etiqueta = tk.Label(ventana, text="Nombre:")
etiqueta.grid(row=0, column=0)
```

A diferencia de `pack()`, `grid()` no depende del orden de colocación, sino de las coordenadas que indiques.

---

## 2.2.2 Parámetros Iniciales: `row`, `column`, `sticky`

- `row`, `column`: posición.
- `sticky`: (opcional) alinea el widget dentro de su celda. Valores comunes iniciales: `"w"` (west/oeste/izquierda), `"e"` (east/derecha). Más adelante podrás usar combinaciones como `"we"`.

### ¿Qué es exactamente `sticky`?

Piensa que cada celda del grid es una cajita y tu widget es una pegatina (sticker) dentro de esa caja. El parámetro `sticky` indica hacia qué lados de la caja se “pega” el widget.

Direcciones (usa letras tipo brújula en inglés):

- `n` = norte (arriba)
- `s` = sur (abajo)
- `w` = oeste (izquierda)
- `e` = este (derecha)

Combinaciones:

- `"w"`: se alinea a la izquierda.
- `"e"`: se alinea a la derecha.
- `"we"`: se estira horizontalmente ocupando todo el ancho disponible.
- `"ns"`: se estira verticalmente.
- `"nsew"`: se estira en ambas direcciones (si la fila/columna lo permiten con `weight`, eso viene después).

Si NO pones `sticky`, el widget queda centrado en su celda con su tamaño mínimo.

Resumen mental rápido:

- Una letra: alineación.
- Varias letras: alineación + expansión hacia esos lados.

Ejemplo mínimo:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Grid básico")

# Fila 0
tk.Label(ventana, text="Nombre:").grid(row=0, column=0, sticky="w")
entrada_nombre = tk.Entry(ventana)
entrada_nombre.grid(row=0, column=1)

# Fila 1
tk.Label(ventana, text="Edad:").grid(row=1, column=0, sticky="w")
entrada_edad = tk.Entry(ventana)
entrada_edad.grid(row=1, column=1)

ventana.mainloop()
```

Prueba cambiando `sticky="w"` por `sticky="e"` o `sticky="we"` para ver la diferencia.

---

## 2.2.3 Diferencias con pack (Cuándo Escoger Cada Uno)

- Usa `pack()` para apilamientos simples o distribución en bandas (cabecera, cuerpo, pie, etc.).
- Usa `grid()` para formularios o cuando necesites alinear elementos en columnas.
- No mezcles `pack()` y `grid()` en el MISMO contenedor. Sí puedes usar `pack()` en un Frame y `grid()` en otro diferente.

Elegir bien desde el inicio evita frustraciones.

---

## 2.2.4 Micro‑Práctica: Formulario de Dos Columnas

Objetivo: Crear un pequeño formulario con etiquetas a la izquierda y entradas a la derecha, más un botón al final.

Código sugerido:

```python
import tkinter as tk

def enviar():
    nombre = entrada_nombre.get()
    edad = entrada_edad.get()
    label_resultado.config(text=f"Nombre: {nombre} | Edad: {edad}")

ventana = tk.Tk()
ventana.title("Formulario simple")

# Etiquetas y entradas
tk.Label(ventana, text="Nombre:").grid(row=0, column=0, sticky="e", padx=5, pady=5)
entrada_nombre = tk.Entry(ventana)
entrada_nombre.grid(row=0, column=1, padx=5, pady=5)

tk.Label(ventana, text="Edad:").grid(row=1, column=0, sticky="e", padx=5, pady=5)
entrada_edad = tk.Entry(ventana)
entrada_edad.grid(row=1, column=1, padx=5, pady=5)

boton = tk.Button(ventana, text="Enviar", command=enviar)
boton.grid(row=2, column=0, columnspan=2, pady=10)

label_resultado = tk.Label(ventana, text="Nombre: | Edad:")
label_resultado.grid(row=3, column=0, columnspan=2)

ventana.mainloop()
```

Aspectos clave:

- `padx` y `pady` agregan espacio alrededor de cada widget.
- `columnspan=2` permite que un widget ocupe dos columnas (el botón y el resultado).
- Se usa `sticky="e"` para alinear etiquetas a la derecha dentro de su celda.

---

## Errores Comunes

- Olvidar un parámetro `row` o `column` (obligatorios en cada widget que usa grid).
- Mezclar `pack()` y `grid()` en el mismo contenedor (causa errores o comportamiento extraño).
- Dejar widgets amontonados por no usar `padx`/`pady`.

---

## Mini‑Resumen del Capítulo

- `grid()` posiciona widgets en filas y columnas.
- `row`/`column` empiezan en 0.
- `sticky` controla alineación dentro de la celda.
- Ideal para formularios.

En el siguiente capítulo verás cómo combinar `pack()` y `grid()` correctamente usando Frames.
