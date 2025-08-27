# Capítulo 4.2 Listbox

## Objetivo del capítulo

Aprender a usar `Listbox` para mostrar una lista de elementos de texto: añadir ítems, obtener la selección y eliminar elementos. Construirás una pequeña lista de tareas en memoria.

---

## 4.2.1 Crear Listbox y Añadir Ítems

Ejemplo básico:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Listbox básico")

lista = tk.Listbox(ventana, height=6)
lista.pack(padx=10, pady=10)

# Añadir elementos
for item in ["Manzana", "Banana", "Cereza"]:
    lista.insert(tk.END, item)

ventana.mainloop()
```

`tk.END` añade al final. También puedes usar índices numéricos.

---

## 4.2.2 Obtener Selección

Para leer el índice seleccionado actual:

```python
indice = lista.curselection()  # Devuelve una tupla (puede estar vacía)
```

Si hay selección:

```python
if indice:
    valor = lista.get(indice[0])
```

Ejemplo con botón que muestra selección:

```python
import tkinter as tk

def mostrar():
    seleccion = lista.curselection()
    if seleccion:
        valor = lista.get(seleccion[0])
        label.config(text=f"Seleccionado: {valor}")
    else:
        label.config(text="Nada seleccionado")

ventana = tk.Tk()
ventana.title("Leer selección")

lista = tk.Listbox(ventana, height=5)
lista.pack()
for fruta in ["Pera", "Uva", "Kiwi"]:
    lista.insert(tk.END, fruta)

btn = tk.Button(ventana, text="Mostrar", command=mostrar)
btn.pack(pady=5)

label = tk.Label(ventana, text="Seleccionado:")
label.pack()

ventana.mainloop()
```

---

## 4.2.3 Eliminar Ítems

Para eliminar el ítem seleccionado:

```python
seleccion = lista.curselection()
if seleccion:
    lista.delete(seleccion[0])
```

Puedes eliminar un rango: `lista.delete(inicio, fin)`.

---

## 4.2.4 Micro‑Práctica: Lista de Tareas (En Memoria)

Objetivo: Añadir texto desde un Entry a la Listbox y poder eliminar la tarea seleccionada.

Código sugerido:

```python
import tkinter as tk

def agregar():
    tarea = entrada.get().strip()
    if tarea:
        lista.insert(tk.END, tarea)
        entrada.delete(0, tk.END)

def eliminar():
    seleccion = lista.curselection()
    if seleccion:
        lista.delete(seleccion[0])

ventana = tk.Tk()
ventana.title("Lista de tareas")

frame_superior = tk.Frame(ventana)
frame_superior.pack(padx=10, pady=10)

entrada = tk.Entry(frame_superior)
entrada.pack(side="left")

btn_agregar = tk.Button(frame_superior, text="Agregar", command=agregar)
btn_agregar.pack(side="left", padx=5)

lista = tk.Listbox(ventana, width=40, height=8)
lista.pack(padx=10, pady=5)

btn_eliminar = tk.Button(ventana, text="Eliminar seleccionada", command=eliminar)
btn_eliminar.pack(pady=5)

ventana.mainloop()
```

Prueba:

1. Escribe tareas y pulsa Agregar.
2. Selecciona una y pulsa Eliminar.

---

## Errores Comunes

- Asumir que siempre hay selección (verificar primero `curselection()`).
- No limpiar el Entry tras agregar, acumulando texto viejo.
- Intentar insertar objetos no cadena (Listbox maneja texto; convierte a string si hace falta).

---

## Mini‑Resumen del Capítulo

- `Listbox` muestra listas de texto y permite selección.
- `insert`, `get`, `delete` son métodos clave.
- `curselection()` devuelve índices seleccionados.
- Implementaste una lista de tareas en memoria.

Siguiente: widgets para seleccionar valores numéricos (Spinbox y Scale).
