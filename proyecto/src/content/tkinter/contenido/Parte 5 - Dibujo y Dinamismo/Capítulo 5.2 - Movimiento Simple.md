# Capítulo 5.2 Movimiento Simple

## Objetivo del capítulo

Aprender a mover objetos ya dibujados en el Canvas utilizando su ID y el método `move`. Implementarás botones que desplazan un cuadrado.

---

## 5.2.1 Identificadores de Objetos Dibujados

Cuando creas una figura en el Canvas, la función devuelve un número (ID):

```python
cuadrado_id = canvas.create_rectangle(50, 50, 100, 100, fill="blue")
```

Guardar este ID permite manipular el objeto más tarde.

---

## 5.2.2 Mover un Objeto (`move`)

`canvas.move(id_objeto, dx, dy)` desplaza el objeto:

- `dx`: desplazamiento horizontal (positivo a la derecha, negativo a la izquierda).
- `dy`: desplazamiento vertical (positivo abajo, negativo arriba).

Ejemplo:

```python
canvas.move(cuadrado_id, 10, 0)  # Mover 10 píxeles a la derecha
```

También puedes preguntar su posición actual usando `coords`:

```python
print(canvas.coords(cuadrado_id))  # Lista [x1, y1, x2, y2]
```

---

## 5.2.3 Micro‑Práctica: Botones que Desplazan un Cuadrado

Objetivo: Cuatro botones (Arriba, Abajo, Izquierda, Derecha) que muevan un cuadrado.

Código sugerido:

```python
import tkinter as tk

MOV = 10  # desplazamiento por clic

def mover(dx, dy):
    canvas.move(cuadrado_id, dx, dy)

def mover_izquierda():
    mover(-MOV, 0)

def mover_derecha():
    mover(MOV, 0)

def mover_arriba():
    mover(0, -MOV)

def mover_abajo():
    mover(0, MOV)

ventana = tk.Tk()
ventana.title("Mover cuadrado")

canvas = tk.Canvas(ventana, width=300, height=200, bg="white")
canvas.pack(padx=10, pady=10)

cuadrado_id = canvas.create_rectangle(130, 80, 170, 120, fill="blue")

frame_botones = tk.Frame(ventana)
frame_botones.pack()

tk.Button(frame_botones, text="←", command=mover_izquierda).grid(row=1, column=0)

tk.Button(frame_botones, text="↑", command=mover_arriba).grid(row=0, column=1)

tk.Button(frame_botones, text="↓", command=mover_abajo).grid(row=2, column=1)

tk.Button(frame_botones, text="→", command=mover_derecha).grid(row=1, column=2)

ventana.mainloop()
```

Prueba mover el cuadrado varias veces y observa cómo las coordenadas cambian.

---

## Errores Comunes

- No guardar el ID del objeto y luego no poder moverlo fácilmente.
- Usar `coords` pensando que mueve (solo consulta o reasigna coordenadas si le pasas nuevas coordenadas completas; `move` es para desplazamiento relativo).
- Moverlo fuera del área visible sin controles (luego parece “desaparecer”).

---

## Mini‑Resumen del Capítulo

- Guarda IDs de objetos para manipularlos.
- `move` aplica desplazamientos relativos.
- Botones pueden controlar movimiento simple.

Siguiente: cargar y mostrar imágenes simples.
