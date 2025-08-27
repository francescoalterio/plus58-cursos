# Capítulo 7.5 Versión 4 – Ventana Acerca de (Toplevel)

## Objetivo del capítulo

Añadir una ventana secundaria "Acerca de" usando `Toplevel` para mostrar información sobre la aplicación. Explicar un centrado relativo sencillo sin fórmulas complejas.

---

## 7.5.1 Crear y Mostrar la Ventana "Acerca de"

Añadimos una función que cree la ventana sólo cuando se invoque (evitamos múltiples instancias simultáneas simples):

```python
import tkinter as tk
from tkinter import messagebox

# ... código base previo ...

about_window = None  # referencia global sencilla

def mostrar_acerca_de():
    global about_window
    if about_window is not None and about_window.winfo_exists():
        about_window.lift()
        return
    about_window = tk.Toplevel(ventana)
    about_window.title("Acerca de")
    about_window.resizable(False, False)
    tk.Label(about_window, text="Mini Bloc de Notas\nVersión de práctica", pady=10).pack(padx=15)
    tk.Button(about_window, text="Cerrar", command=about_window.destroy).pack(pady=10)
```

En el menú Ayuda reemplaza el `print` anterior por `mostrar_acerca_de`.

---

## 7.5.2 Centrar Relativamente (Explicación Simple)

Estrategia sencilla: después de crear y antes de mostrar al usuario, calculamos una posición aproximada.

```python
about_window.update_idletasks()  # asegura medidas reales
ancho = about_window.winfo_width()
alto = about_window.winfo_height()
ancho_root = ventana.winfo_width()
alto_root = ventana.winfo_height()
x_root = ventana.winfo_rootx()
y_root = ventana.winfo_rooty()
# Centrar dentro del área visible de la ventana principal
x = x_root + (ancho_root // 2) - (ancho // 2)
y = y_root + (alto_root // 2) - (alto // 2)
about_window.geometry(f"+{x}+{y}")
```

No buscamos perfección milimétrica, sólo un centrado aproximado y entendible.

---

## 7.5.3 Cerrar Toplevel Correctamente

`about_window.destroy()` cierra la ventana. Opcional: asignar protocolo para limpiar referencia:

```python
def on_close_about():
    global about_window
    about_window.destroy()
    about_window = None
about_window.protocol("WM_DELETE_WINDOW", on_close_about)
```

---

## Código Consolidado (Fragmento Relevante)

```python
def mostrar_acerca_de():
    global about_window
    if about_window is not None and about_window.winfo_exists():
        about_window.lift()
        return
    about_window = tk.Toplevel(ventana)
    about_window.title("Acerca de")
    about_window.resizable(False, False)

    tk.Label(about_window, text="Mini Bloc de Notas\nVersión de práctica", pady=10).pack(padx=15)
    tk.Button(about_window, text="Cerrar", command=lambda: cerrar_about()).pack(pady=10)

    def cerrar_about():
        global about_window
        if about_window is not None:
            about_window.destroy()
            about_window = None

    about_window.protocol("WM_DELETE_WINDOW", cerrar_about)

    about_window.update_idletasks()
    ancho = about_window.winfo_width()
    alto = about_window.winfo_height()
    x = ventana.winfo_rootx() + (ventana.winfo_width() // 2) - (ancho // 2)
    y = ventana.winfo_rooty() + (ventana.winfo_height() // 2) - (alto // 2)
    about_window.geometry(f"+{x}+{y}")
```

Asegúrate de cambiar el comando del menú Ayuda: `menu_ayuda.add_command(label="Acerca de", command=mostrar_acerca_de)`.

---

## Micro‑Práctica

1. Añade una segunda línea de texto dentro de la ventana Acerca de (autor ficticio).
2. Cambia el botón a decir "Cerrar ventana".
3. Verifica que abrir varias veces no genera duplicados.

---

## Errores Comunes

- Crear múltiples Toplevel sin control (acumulación de ventanas).
- Olvidar `update_idletasks()` antes de medir tamaño.
- Usar `Tk()` en vez de `Toplevel` para ventana secundaria.

---

## Mini‑Resumen

Implementaste una ventana secundaria informativa y la centrastes de forma aproximada. Próximo: mejorar estilo y añadir barra de estado.
