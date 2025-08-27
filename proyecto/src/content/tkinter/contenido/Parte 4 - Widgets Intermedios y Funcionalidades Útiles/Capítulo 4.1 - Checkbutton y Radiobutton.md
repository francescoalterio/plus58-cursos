# Capítulo 4.1 Checkbutton y Radiobutton

## Objetivo del capítulo

Aprender la diferencia entre opciones independientes (`Checkbutton`) y opciones mutuamente excluyentes (`Radiobutton`). Construirás un selector de modo (claro / oscuro) y un conjunto de casillas independientes.

---

## 4.1.1 Concepto de Opciones Independientes vs Exclusivas

- `Checkbutton`: cada opción es sí/no (marcada o no). Varias pueden estar activas al mismo tiempo.
- `Radiobutton`: de un grupo solo una opción puede estar seleccionada a la vez.

Metáfora:

- Checkbuttons = interruptores individuales de luces: puedes encender varias.
- Radiobuttons = estaciones de radio: solo puedes sintonizar una a la vez.

---

## 4.1.2 Uso con `IntVar` / `StringVar`

Cada grupo de Radiobuttons comparte **la misma** variable de control. Cada botón establece un valor diferente en esa variable.

Ejemplo Checkbutton simple:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Checkbutton básico")

var_a = tk.BooleanVar(value=False)
var_b = tk.BooleanVar(value=True)

c1 = tk.Checkbutton(ventana, text="Opción A", variable=var_a)
c1.pack(anchor="w")

c2 = tk.Checkbutton(ventana, text="Opción B", variable=var_b)
c2.pack(anchor="w")

ventana.mainloop()
```

Ejemplo Radiobutton:

```python
import tkinter as tk
ventana = tk.Tk()
ventana.title("Radiobutton básico")

modo = tk.StringVar(value="claro")

rb1 = tk.Radiobutton(ventana, text="Claro", variable=modo, value="claro")
rb1.pack(anchor="w")
rb2 = tk.Radiobutton(ventana, text="Oscuro", variable=modo, value="oscuro")
rb2.pack(anchor="w")

ventana.mainloop()
```

Cambia manualmente y luego imprime en una callback para ver el valor elegido.

---

## 4.1.3 Micro‑Práctica: Selector de Modo (Claro / Oscuro Básico)

Objetivo: Elegir un modo y actualizar el fondo de la ventana.

Código sugerido:

```python
import tkinter as tk

def aplicar_modo():
    if modo.get() == "claro":
        ventana.config(bg="white")
        label.config(bg="white", fg="black")
    else:
        ventana.config(bg="#222222")
        label.config(bg="#222222", fg="white")

ventana = tk.Tk()
ventana.title("Modo claro/oscuro")

modo = tk.StringVar(value="claro")

frame_opciones = tk.Frame(ventana)
frame_opciones.pack(padx=10, pady=10)

tk.Radiobutton(frame_opciones, text="Claro", variable=modo, value="claro", command=aplicar_modo).pack(anchor="w")
tk.Radiobutton(frame_opciones, text="Oscuro", variable=modo, value="oscuro", command=aplicar_modo).pack(anchor="w")

label = tk.Label(ventana, text="Modo actual", font=("Arial", 14))
label.pack(pady=10)

aplicar_modo()  # Aplicar modo inicial

ventana.mainloop()
```

Prueba cambiando el modo y observa el fondo.

---

## Ejemplo Adicional: Múltiples Checkbuttons

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Preferencias")

var_sonido = tk.BooleanVar(value=True)
var_notif = tk.BooleanVar(value=False)
var_auto = tk.BooleanVar(value=True)

for texto, var in [
    ("Sonido", var_sonido),
    ("Notificaciones", var_notif),
    ("Actualización automática", var_auto)
]:
    tk.Checkbutton(ventana, text=texto, variable=var).pack(anchor="w")

ventana.mainloop()
```

Puedes leer valores con `var_sonido.get()`, etc.

---

## Errores Comunes

- Crear Radiobuttons con variables distintas: no se comportarán como grupo.
- No asignar `value` distinto a cada Radiobutton (tendrán el mismo valor y no servirán).
- Confundir `BooleanVar` con `IntVar`: para checkbuttons funciona cualquiera, pero usa el tipo que más sentido tenga.

---

## Mini‑Resumen del Capítulo

- Checkbutton: opciones independientes (on/off cada una).
- Radiobutton: opciones exclusivas dentro de un grupo que comparte variable.
- Variables de control (`StringVar`, `BooleanVar`) mantienen y exponen el estado.
- Implementaste un selector claro/oscuro básico.

Siguiente: Listbox para manejar listas de elementos seleccionables.
