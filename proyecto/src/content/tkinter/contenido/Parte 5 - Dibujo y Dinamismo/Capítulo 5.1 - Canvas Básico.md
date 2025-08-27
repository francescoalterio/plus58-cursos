# Capítulo 5.1 Canvas Básico

## Objetivo del capítulo

Aprender a usar `Canvas` para dibujar formas simples (líneas, rectángulos, texto). Entender el sistema de coordenadas y preparar una base para interactividad posterior.

---

## 5.1.1 Crear un Canvas y Mostrarlo

`Canvas` es un área donde puedes dibujar elementos gráficos. Ejemplo mínimo:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Canvas básico")

canvas = tk.Canvas(ventana, width=300, height=200, bg="white")
canvas.pack(padx=10, pady=10)

ventana.mainloop()
```

Parámetros comunes:

- `width`, `height`: dimensiones iniciales del área.
- `bg`: color de fondo.

---

## 5.1.2 Dibujar Líneas, Rectángulos, Texto

El Canvas mantiene internamente los objetos que dibujas y te devuelve un ID por cada uno.

Ejemplo básico de varias formas:

```python
linea_id = canvas.create_line(10, 10, 200, 10, fill="blue", width=2)
rect_id = canvas.create_rectangle(50, 40, 150, 120, outline="red", width=2, fill="pink")
texto_id = canvas.create_text(100, 150, text="Hola Canvas", fill="green", font=("Arial", 14))
```

Coordenadas de las funciones:

- `create_line(x1, y1, x2, y2, ...)`
- `create_rectangle(x1, y1, x2, y2, ...)` (coordenadas de dos esquinas opuestas)
- `create_text(x, y, text=...)` (posición del centro del texto por defecto)

---

## 5.1.3 Sistema de Coordenadas (0,0)

El punto (0,0) está en la esquina superior izquierda del Canvas.

- El eje X aumenta hacia la derecha.
- El eje Y aumenta hacia abajo.

Esto es estándar en muchos sistemas gráficos. No uses valores negativos (no se verán dentro del área).

Prueba a dibujar un punto cercano al borde y otro más lejos para ver cómo cambian las posiciones.

---

## 5.1.4 Micro‑Práctica: Bandeja de Dibujo Lineal Simple

Objetivo: Dibujar varias líneas horizontales y texto.

Tareas:

1. Crear un Canvas 400x250.
2. Dibujar 5 líneas horizontales espaciadas.
3. Añadir un texto en la parte inferior.

Pista para líneas en bucle:

```python
for y in range(20, 120, 20):
    canvas.create_line(20, y, 380, y, fill="gray")
```

---

## Errores Comunes

- Olvidar `canvas.pack()` (el Canvas existe pero no se ve).
- Usar coordenadas fuera del tamaño y “perder” objetos.
- No guardar el ID retornado si luego quieres mover o modificar el objeto.

---

## Mini‑Resumen del Capítulo

- Canvas permite dibujar formas básicas y texto.
- Cada objeto tiene un ID útil para manipularlo más adelante.
- Sistema de coordenadas inicia en la esquina superior izquierda.
- Preparaste el terreno para animación y eventos.

Siguiente: mover objetos en el Canvas.
