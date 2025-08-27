# Capítulo 3.2 Diálogos Simples (messagebox)

## Objetivo del capítulo

Aprender a usar los cuadros de diálogo estándar (messagebox) para mostrar información, advertencias, errores y solicitar confirmación. Implementarás una confirmación antes de limpiar un área de texto.

---

## 3.2.1 Importar `messagebox`

El módulo `messagebox` viene dentro de `tkinter`.

```python
import tkinter as tk
from tkinter import messagebox
```

No se crea un widget persistente; cada función abre una ventana modal (bloquea interacción con la principal hasta cerrarse).

---

## 3.2.2 Mostrar Info, Warning, Error

Funciones principales:

```python
messagebox.showinfo("Título", "Mensaje informativo")
messagebox.showwarning("Atención", "Mensaje de advertencia")
messagebox.showerror("Error", "Ocurrió un error")
```

Cada una muestra un ícono distinto.

Ejemplo:

```python
import tkinter as tk
from tkinter import messagebox

def mostrar():
    messagebox.showinfo("Hola", "Esta es una información simple")

ventana = tk.Tk()
ventana.title("Messagebox básico")

btn = tk.Button(ventana, text="Info", command=mostrar)
btn.pack(padx=10, pady=10)

ventana.mainloop()
```

---

## 3.2.3 Diálogo de Confirmación (`askyesno`)

Para preguntar al usuario algo que requiere decisión:

```python
respuesta = messagebox.askyesno("Confirmar", "¿Seguro que deseas continuar?")
```

Devuelve `True` si el usuario elige Sí, `False` si elige No.

---

## 3.2.4 Micro‑Práctica: Confirmar Antes de Limpiar un Área de Texto

Objetivo: Tener un `Text` con contenido y un botón “Limpiar” que pregunte antes.

Código sugerido:

```python
import tkinter as tk
from tkinter import messagebox

def limpiar():
    if messagebox.askyesno("Confirmar", "¿Seguro que quieres borrar el contenido?"):
        area.delete("1.0", tk.END)

ventana = tk.Tk()
ventana.title("Confirmar limpieza")

area = tk.Text(ventana, width=40, height=6)
area.pack(padx=10, pady=10)
area.insert("1.0", "Texto de ejemplo...\nPuedes borrarlo con confirmación.")

btn_limpiar = tk.Button(ventana, text="Limpiar", command=limpiar)
btn_limpiar.pack(pady=5)

ventana.mainloop()
```

Prueba:

1. Pulsa “Limpiar”.
2. Responde No → el texto permanece.
3. Pulsa “Limpiar” de nuevo y responde Sí → se borra.

---

## Errores Comunes

- Olvidar importar `messagebox` y llamar `tk.messagebox` (no funciona así en esta forma de importación).
- Ignorar el valor retornado de `askyesno` y limpiar siempre.
- Llamar a messagebox dentro de un loop muy rápido (molesto para el usuario); úsalo para acciones puntuales.

---

## Mini‑Resumen del Capítulo

- `showinfo`, `showwarning`, `showerror` muestran mensajes modales.
- `askyesno` devuelve True/False para decisiones del usuario.
- Implementaste confirmación antes de una acción destructiva.

En el próximo capítulo aprenderás a crear ventanas secundarias independientes (`Toplevel`).
