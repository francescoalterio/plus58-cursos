# Capítulo 5.3 Imágenes Sencillas

## Objetivo del capítulo

Aprender a mostrar imágenes básicas (formatos soportados nativos como GIF y PNG) usando `PhotoImage` en Labels y Canvas. Comprender la importancia de mantener una referencia a la imagen.

---

## 5.3.1 `PhotoImage` (Formatos Soportados Básicos)

Tkinter soporta directamente imágenes en formatos como GIF y PNG (dependiendo de la instalación). JPEG puede requerir bibliotecas adicionales (no lo cubrimos aquí).

Crear una imagen:

```python
import tkinter as tk

ventana = tk.Tk()
img = tk.PhotoImage(file="logo.png")
```

Asegúrate de que el archivo esté en la misma carpeta o proporciona la ruta completa.

---

## 5.3.2 Mostrar Imagen en Label

```python
label = tk.Label(ventana, image=img)
label.pack()
```

El label mostrará la imagen.

Mostrar en Canvas:

```python
canvas = tk.Canvas(ventana, width=300, height=200)
canvas.pack()
canvas.create_image(150, 100, image=img)  # Coordenadas del centro por defecto
```

---

## 5.3.3 Importante: Mantener Referencia

Si creas la imagen dentro de una función local y no guardas una referencia (variable global o atributo), Python podría recolectarla (garbage collector) y dejar de mostrarse.

Ejemplo incorrecto potencial:

```python
def mostrar():
    img = tk.PhotoImage(file="logo.png")
    label.config(image=img)
```

El Label puede quedar vacío. Solución: almacenar `img` en una variable accesible (ej. `label.image = img`).

Ejemplo correcto:

```python
def mostrar():
    nueva = tk.PhotoImage(file="logo.png")
    label.config(image=nueva)
    label.image = nueva  # guardar referencia
```

---

## 5.3.4 Micro‑Práctica: Cambiar Imagen Según Radiobutton

Objetivo: Dos Radiobuttons que cambian una imagen (ej. sol.png / luna.png) en un Label.

Tareas:

1. `StringVar` con valores "dia" y "noche".
2. Callback que según la selección carga y asigna la imagen.
3. Guardar referencia para que no desaparezca.

Estructura sugerida (sin archivos reales):

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Cambiar imagen")

modo = tk.StringVar(value="dia")

label_img = tk.Label(ventana)
label_img.pack(pady=10)

imagenes = {}  # cache opcional

def actualizar():
    seleccion = modo.get()
    archivo = "sol.png" if seleccion == "dia" else "luna.png"
    if archivo not in imagenes:
        imagenes[archivo] = tk.PhotoImage(file=archivo)
    label_img.config(image=imagenes[archivo])
    label_img.image = imagenes[archivo]

frame_opts = tk.Frame(ventana)
frame_opts.pack()

tk.Radiobutton(frame_opts, text="Día", variable=modo, value="dia", command=actualizar).pack(side="left")
tk.Radiobutton(frame_opts, text="Noche", variable=modo, value="noche", command=actualizar).pack(side="left")

actualizar()
ventana.mainloop()
```

---

## Errores Comunes

- Ruta de archivo incorrecta (FileNotFoundError); verifica con `print` la ruta actual si falla.
- Olvidar guardar referencia y ver imagen en blanco.
- Usar formato no soportado directamente (como JPEG) y obtener error.

---

## Mini‑Resumen del Capítulo

- `PhotoImage` carga imágenes GIF/PNG.
- Labels y Canvas pueden mostrarlas.
- Mantén referencias para evitar que desaparezcan.
- Implementaste lógica para cambiar imágenes dinámicamente.

Siguiente: usar `after` para temporizaciones y tareas periódicas.
