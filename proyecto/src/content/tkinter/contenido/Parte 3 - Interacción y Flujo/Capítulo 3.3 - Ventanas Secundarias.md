# Capítulo 3.3 Ventanas Secundarias (Toplevel)

## Objetivo del capítulo

Aprender a crear una ventana secundaria usando `Toplevel`, distinguirla de la ventana principal y cerrarla correctamente. Implementarás una pequeña ventana "Acerca de".

---

## 3.3.1 Crear una Ventana Secundaria Básica

La ventana principal se crea con `Tk()`. Cualquier ventana adicional se crea con `Toplevel()`.

Ejemplo:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Principal")

secundaria = tk.Toplevel(ventana)
secundaria.title("Secundaria")

ventana.mainloop()
```

Verás dos ventanas: la principal y la secundaria.

---

## 3.3.2 Diferencia con Ventana Principal

- Solo debe haber **una** instancia de `Tk()`.
- Puedes crear múltiples `Toplevel` según necesites.
- Si cierras la ventana principal, normalmente todas las `Toplevel` se cierran.

---

## 3.3.3 Cerrar una Toplevel Correctamente

Puedes cerrar desde código con:

```python
secundaria.destroy()
```

O el usuario puede usar la X.

Para crear la ventana solo cuando se necesite (ej. al pulsar un botón), haz una función:

```python
import tkinter as tk

def abrir_acerca_de():
    win = tk.Toplevel(ventana)
    win.title("Acerca de")
    tk.Label(win, text="Mi Aplicación v1.0").pack(padx=10, pady=10)
    tk.Button(win, text="Cerrar", command=win.destroy).pack(pady=5)

ventana = tk.Tk()
ventana.title("Ejemplo")

btn = tk.Button(ventana, text="Acerca de", command=abrir_acerca_de)
btn.pack(padx=10, pady=10)

ventana.mainloop()
```

---

## 3.3.4 Micro‑Práctica: Acerca de (About) Minimalista

Tareas:

1. Crea un botón “Acerca de…”.
2. Al pulsarlo, abre una `Toplevel` con título “Acerca de”.
3. Dentro: un Label con una breve descripción y un botón “Cerrar”.
4. Evita crear múltiples ventanas iguales si el usuario pulsa varias veces (opcional): puedes guardar una referencia y verificar si ya existe.

Pista para evitar duplicados (opcional):

```python
ventana_acerca = None

def abrir_acerca_de():
    global ventana_acerca
    if ventana_acerca is None or not ventana_acerca.winfo_exists():
        ventana_acerca = tk.Toplevel(ventana)
        ventana_acerca.title("Acerca de")
        tk.Label(ventana_acerca, text="App ejemplo").pack(padx=10, pady=10)
```

---

## Errores Comunes

- Crear una nueva instancia de `Tk()` en vez de `Toplevel()` (causa comportamientos inesperados y múltiples bucles de eventos potenciales).
- No guardar referencia y consumir memoria con montones de ventanas repetidas (para principiantes no es grave, pero conviene ser consciente).
- Intentar manipular widgets de una ventana ya destruida.

---

## Mini‑Resumen del Capítulo

- `Toplevel` crea ventanas secundarias.
- Una sola ventana principal (`Tk`) + múltiples ventanas secundarias según necesidad.
- Puedes cerrar una secundaria con `destroy()`.

En el próximo capítulo aprenderás a construir un menú de aplicación básico.
