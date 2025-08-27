# Capítulo 4.3 Spinbox y Scale

## Objetivo del capítulo

Aprender a usar `Spinbox` para seleccionar valores discretos (números enteros dentro de un rango) y `Scale` para ajustar un valor continuo de forma visual. Construirás un ajuste dinámico de tamaño de fuente.

---

## 4.3.1 Spinbox para Números Acotados

`Spinbox` permite incrementar o decrementar dentro de un rango.

Ejemplo:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Spinbox básico")

spin = tk.Spinbox(ventana, from_=1, to=10)
spin.pack(padx=10, pady=10)

ventana.mainloop()
```

Leer valor actual (cadena):

```python
valor = spin.get()
```

Convertir a entero si lo necesitas:

```python
numero = int(valor)
```

---

## 4.3.2 Scale para Valores Continuos Sencillos

`Scale` muestra una barra deslizante. Puedes obtener su valor con el método `get()`.

Ejemplo vertical:

```python
slider = tk.Scale(ventana, from_=0, to=100)
slider.pack()
```

Ejemplo horizontal:

```python
slider = tk.Scale(ventana, from_=0, to=100, orient="horizontal")
slider.pack()
```

Puedes añadir un callback en cada movimiento usando `command`:

```python
def cambiar(valor):
    print("Nuevo valor:", valor)

slider = tk.Scale(ventana, from_=10, to=30, orient="horizontal", command=cambiar)
```

El parámetro recibido es una cadena con el valor actual.

---

## 4.3.3 Micro‑Práctica: Ajustar Tamaño de Fuente Dinámicamente

Objetivo: Un texto cuyo tamaño de fuente cambia moviendo un Scale.

Código sugerido:

```python
import tkinter as tk

def actualizar_tamano(valor):
    # valor llega como cadena
    etiqueta.config(font=("Arial", int(valor)))

ventana = tk.Tk()
ventana.title("Ajuste de fuente")

etiqueta = tk.Label(ventana, text="Texto ajustable", font=("Arial", 12))
etiqueta.pack(pady=10)

slider = tk.Scale(ventana, from_=8, to=40, orient="horizontal", command=actualizar_tamano)
slider.set(12)  # valor inicial
slider.pack(padx=10, pady=10)

ventana.mainloop()
```

Prueba moviendo el deslizador y observa cómo cambia el tamaño.

---

## Errores Comunes

- Olvidar convertir a entero el valor de Scale antes de usarlo en algo numérico.
- Usar un rango de Spinbox donde `from_` es mayor que `to` (no se comporta como esperas).
- No establecer un valor inicial y depender del predeterminado sin saber cuál es.

---

## Mini‑Resumen del Capítulo

- `Spinbox`: valores discretos dentro de un rango.
- `Scale`: deslizador para valores (generalmente numéricos) que pueden cambiarse suavemente.
- Ambos se leen con `get()`; a veces debes convertir a int.
- Implementaste ajuste dinámico de fuente.

Siguiente: Añadir desplazamiento (Scrollbars) a widgets que pueden crecer en contenido.
