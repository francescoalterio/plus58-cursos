# Capítulo 3.5 Eventos de Teclado y Ratón (Introducción)

## Objetivo del capítulo

Aprender a usar `bind` para capturar eventos básicos del teclado y ratón: clic izquierdo y pulsación de una tecla (Enter). Implementarás que pulsar Enter ejecute la misma acción que un botón.

---

## 3.5.1 Modelo de Eventos (`bind`) – Concepto

Tkinter genera "eventos" cuando el usuario hace algo: clic, mover el ratón, presionar una tecla, etc. Con `widget.bind(evento, funcion)` le dices a Tkinter: "Cuando ocurra este evento sobre este widget, llama a esta función".

Formato general:

```python
widget.bind("<NombreEvento>", callback)
```

La función callback recibe un objeto `event` con datos (posición del ratón, tecla, etc.). Para principiantes, a veces no necesitas usarlo, pero debe aceptarse como parámetro.

---

## 3.5.2 Capturar Clic Izquierdo en un Frame

Evento de clic izquierdo: `"<Button-1>"`.

```python
import tkinter as tk

def clic(event):
    print(f"Clic en x={event.x}, y={event.y}")

ventana = tk.Tk()
ventana.title("Clic en frame")

frame = tk.Frame(ventana, width=200, height=120, bg="lightblue")
frame.pack(padx=10, pady=10)

frame.bind("<Button-1>", clic)

ventana.mainloop()
```

`event.x` y `event.y` son coordenadas relativas al widget.

---

## 3.5.3 Capturar Tecla Específica (Enter) en Entry

Evento al pulsar Enter: `"<Return>"`.

```python
import tkinter as tk

def procesar(event):
    texto = entrada.get()
    print("Enter presionado. Texto:", texto)

ventana = tk.Tk()
entrada = tk.Entry(ventana)
entrada.pack(padx=10, pady=10)

entrada.bind("<Return>", procesar)

ventana.mainloop()
```

Al presionar Enter dentro del Entry se ejecuta `procesar`.

---

## 3.5.4 Micro‑Práctica: Pulsar Enter Ejecuta lo Mismo que un Botón

Objetivo: Un Entry y un botón "Mostrar". Presionar Enter dentro del Entry debe ejecutar la misma lógica que el botón.

Código sugerido:

```python
import tkinter as tk

def mostrar():
    valor = entrada.get()
    etiqueta.config(text=f"Valor: {valor}")

def mostrar_evento(event):  # wrapper que llama a mostrar
    mostrar()

ventana = tk.Tk()
ventana.title("Enter como botón")

entrada = tk.Entry(ventana)
entrada.pack(padx=10, pady=5)
entrada.bind("<Return>", mostrar_evento)

boton = tk.Button(ventana, text="Mostrar", command=mostrar)
boton.pack(pady=5)

etiqueta = tk.Label(ventana, text="Valor:")
etiqueta.pack(pady=5)

ventana.mainloop()
```

Explicación:

- `mostrar()` contiene la lógica central.
- El botón llama a `mostrar`.
- El bind llama a `mostrar_evento`, que a su vez llama a `mostrar()` (podrías usar `lambda event: mostrar()`).

---

## Errores Comunes

- Olvidar el parámetro `event` en la función ligada (causa error de argumentos).
- Ejecutar la función inmediatamente en lugar de pasar la referencia (`bind("<Return>", funcion())` está mal; debe ser sin paréntesis o usando lambda).
- Binding sobre el widget incorrecto (ponerlo en la ventana cuando quieres que responda solo el Entry, o viceversa).

---

## Mini‑Resumen del Capítulo

- `bind` asocia eventos a funciones.
- `"<Button-1>"` para clic izquierdo, `"<Return>"` para Enter.
- El objeto `event` contiene información útil (coordenadas, tecla, etc.).
- Hiciste que Enter ejecute la misma acción que un botón.

Con esto terminas la parte de interacción básica. Próximamente explorarás más widgets intermedios y utilidades.
