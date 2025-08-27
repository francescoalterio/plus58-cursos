# Capítulo 5.5 Eventos del Ratón en Canvas

## Objetivo del capítulo

Aprender a capturar eventos del ratón dentro de un `Canvas` para dibujar puntos y líneas, incluyendo arrastrar para crear un trazo simple. Construirás una mini pizarra básica.

---

## 5.5.1 Capturar Posición del Clic

Al hacer clic sobre el Canvas puedes obtener coordenadas con `event.x` y `event.y`.

Ejemplo:

```python
import tkinter as tk

def clic(event):
    print("Clic en:", event.x, event.y)

ventana = tk.Tk()
canvas = tk.Canvas(ventana, width=300, height=200, bg="white")
canvas.pack()

canvas.bind("<Button-1>", clic)

ventana.mainloop()
```

---

## 5.5.2 Dibujar Punto donde se Hace Clic

Puedes representar un "punto" dibujando un óvalo muy pequeño (círculo):

```python
radio = 2
canvas.create_oval(x-radio, y-radio, x+radio, y+radio, fill="black", outline="")
```

Dentro de la función de clic:

```python
canvas.create_oval(event.x-2, event.y-2, event.x+2, event.y+2, fill="black", outline="")
```

---

## 5.5.3 Arrastrar para Crear Línea (Simple)

Necesitas dos eventos:

- `"<Button-1>"`: guardar posición inicial.
- `"<B1-Motion>"`: mientras se mantiene el botón 1 presionado y se mueve, dibujar pequeños segmentos.

Ejemplo:

```python
import tkinter as tk

ultima = None

def iniciar_trazo(event):
    global ultima
    ultima = (event.x, event.y)


def dibujar(event):
    global ultima
    if ultima is not None:
        x1, y1 = ultima
        x2, y2 = event.x, event.y
        canvas.create_line(x1, y1, x2, y2, fill="black")
        ultima = (x2, y2)

ventana = tk.Tk()
ventana.title("Dibujo libre")

canvas = tk.Canvas(ventana, width=400, height=300, bg="white")
canvas.pack()

canvas.bind("<Button-1>", iniciar_trazo)
canvas.bind("<B1-Motion>", dibujar)

ventana.mainloop()
```

Esto crea líneas segmentadas que siguen el ratón.

---

## 5.5.4 Micro‑Práctica: Mini Pizarra

Tareas:

1. Implementar el ejemplo de arrastre.
2. Añadir botón “Limpiar” que borre todo (`canvas.delete("all")`).
3. (Opcional) Permitir elegir color con Radiobuttons simples.

Limpieza:

```python
canvas.delete("all")
```

---

## Errores Comunes

- No reiniciar `ultima` al terminar un trazo (en este ejemplo no lo hacemos explícitamente; al hacer clic se inicia uno nuevo).
- Dibujar demasiados elementos muy rápidos (no es grave aquí, pero puede ralentizar si haces trazos enormes en apps complejas).
- Olvidar `outline=""` al dibujar óvalos pequeños y ver bordes extraños.

---

## Mini‑Resumen del Capítulo

- `bind` sobre Canvas permite captar clic y movimiento del ratón.
- Dibujar puntos: óvalos muy pequeños.
- Arrastre: usar posición previa y actual para crear líneas.
- Implementaste una mini pizarra básica.

Con esto terminas la Parte 5 (dibujo y dinamismo). Próxima parte: Buenas prácticas y errores comunes para mejorar la calidad de tus programas.
