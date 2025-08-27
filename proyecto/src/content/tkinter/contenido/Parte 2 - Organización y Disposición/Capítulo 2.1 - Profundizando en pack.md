# Capítulo 2.1 Profundizando en pack()

## Objetivo del capítulo

Comprender mejor cómo funciona el gestor de geometría `pack()`: su modelo de apilamiento, los parámetros básicos `side`, `padx`, `pady` y cómo evitar errores comunes al organizar widgets. Finalizarás distribuyendo botones alrededor de una ventana.

---

## 2.1.1 Concepto: Eje Vertical por Defecto

`pack()` coloca (empaqueta) cada widget dentro de su contenedor en el orden en que se llama. Si no especificas nada, se apilan de arriba hacia abajo (top → bottom).

Metáfora: Imagina una caja donde vas metiendo libros uno encima de otro; el primero queda arriba, el siguiente debajo, y así.

Ejemplo simple (apilado vertical):

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Apilado vertical")

for texto in ["Uno", "Dos", "Tres"]:
    tk.Button(ventana, text=texto).pack()

ventana.mainloop()
```

---

## 2.1.2 Argumentos Simples: `side`, `padx`, `pady`

Parámetros más usados al inicio:

- `side`: permite cambiar el lado desde el cual se va colocando el widget. Valores típicos: `"top"`, `"bottom"`, `"left"`, `"right"`.
- `padx`, `pady`: añaden espacio (padding) externo horizontal y vertical alrededor del widget.

Ejemplo (usando `side`):

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Sides")

btn1 = tk.Button(ventana, text="Arriba")
btn1.pack(side="top")

btn2 = tk.Button(ventana, text="Abajo")
btn2.pack(side="bottom")

btn3 = tk.Button(ventana, text="Izquierda")
btn3.pack(side="left")

btn4 = tk.Button(ventana, text="Derecha")
btn4.pack(side="right")

ventana.mainloop()
```

Observa cómo cada botón se "adhiere" al borde indicado.

Agregar espacio:

```python
btn3.pack(side="left", padx=10, pady=5)
```

Esto coloca un margen alrededor del botón para que no quede tan pegado.

---

## 2.1.3 Explicación Visual (Mental)

Visualiza el contenedor como un rectángulo. Cada vez que usas `pack(side="left")`, vas ocupando una banda vertical desde la izquierda. Si usas `pack(side="top")`, ocupas una banda horizontal desde arriba. El espacio restante se adapta conforme agregas widgets.

Orden + side importan. Ejemplo:

```python
# Primero a la izquierda, luego arriba
btn1.pack(side="left")
btn2.pack(side="top")
```

No es lo mismo que invertir el orden.

---

## 2.1.4 Errores Comunes

- Mezclar `pack()` y `grid()` en el **mismo contenedor** (no lo hagas; veremos cómo combinarlos usando Frames más adelante).
- Usar `pack()` sin widgets visibles (olvidar empacar alguno).
- Intentar centrar con muchos espacios en el texto; mejor usar parámetros de layout.

---

## 2.1.5 Micro‑Práctica: Botones Alrededor

Objetivo: Crear cuatro botones pegados a cada borde y uno al centro.

Sugerencia:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Botones alrededor")

# Borde superior
tk.Button(ventana, text="Superior").pack(side="top", fill="x")
# Borde inferior
tk.Button(ventana, text="Inferior").pack(side="bottom", fill="x")
# Borde izquierdo
tk.Button(ventana, text="Izquierda").pack(side="left", fill="y")
# Borde derecho
tk.Button(ventana, text="Derecha").pack(side="right", fill="y")
# Centro (se empaca al final, espacio restante)
tk.Button(ventana, text="Centro").pack()

ventana.mainloop()
```

Explicación adicional:

- `fill="x"` estira el botón horizontalmente.
- `fill="y"` lo estira verticalmente.
- El último botón se coloca en el espacio sobrante.

Prueba variaciones quitando `fill` para ver la diferencia.

---

## Mini‑Resumen del Capítulo

- `pack()` apila widgets; por defecto de arriba hacia abajo.
- `side` permite usar otros bordes: top, bottom, left, right.
- `padx`, `pady` añaden espacio externo.
- El orden de empaquetado influye en la disposición final.

En el siguiente capítulo verás `grid()`, un gestor que coloca widgets en filas y columnas.
