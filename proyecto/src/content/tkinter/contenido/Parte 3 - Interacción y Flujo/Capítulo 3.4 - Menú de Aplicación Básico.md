# Capítulo 3.4 Menú de Aplicación Básico

## Objetivo del capítulo

Crear una barra de menú en la ventana principal con opciones simples (Archivo → Salir, Limpiar). Aprenderás a construir menús y submenús y a enlazarlos con funciones.

---

## 3.4.1 Crear Barra de Menú Principal

El menú se asocia a la ventana principal usando `config(menu=...)`.

Ejemplo mínimo:

```python
import tkinter as tk

def salir():
    ventana.destroy()

ventana = tk.Tk()
ventana.title("Menú básico")

barra_menu = tk.Menu(ventana)   # Crear barra
ventana.config(menu=barra_menu)  # Asociarla

menu_archivo = tk.Menu(barra_menu, tearoff=0)  # tearoff=0 para quitar línea discontinua
barra_menu.add_cascade(label="Archivo", menu=menu_archivo)

menu_archivo.add_command(label="Salir", command=salir)

ventana.mainloop()
```

---

## 3.4.2 Añadir Comandos Simples

Puedes sumar más opciones con `add_command`:

```python
menu_archivo.add_command(label="Limpiar", command=limpiar)
```

Cada comando ejecuta su callback al seleccionarlo.

---

## 3.4.3 Separadores

Para agrupar visualmente opciones:

```python
menu_archivo.add_separator()
```

Coloca una línea horizontal antes de la siguiente opción.

---

## 3.4.4 Micro‑Práctica: Menú Archivo con Opción "Limpiar"

Objetivo: Un `Text` y un menú Archivo con “Limpiar” y “Salir”.

Código sugerido:

```python
import tkinter as tk

def limpiar():
    area.delete("1.0", tk.END)

def salir():
    ventana.destroy()

ventana = tk.Tk()
ventana.title("Menú Archivo")

area = tk.Text(ventana, width=40, height=8)
area.pack(padx=10, pady=10)

barra_menu = tk.Menu(ventana)
ventana.config(menu=barra_menu)

menu_archivo = tk.Menu(barra_menu, tearoff=0)
barra_menu.add_cascade(label="Archivo", menu=menu_archivo)

menu_archivo.add_command(label="Limpiar", command=limpiar)
menu_archivo.add_separator()
menu_archivo.add_command(label="Salir", command=salir)

ventana.mainloop()
```

Prueba a escribir texto y selecciona Archivo → Limpiar.

---

## Errores Comunes

- Olvidar `ventana.config(menu=barra_menu)` y preguntarse por qué no aparece.
- Usar `tearoff=1` y ver una línea discontinua (comportamiento por defecto en algunos sistemas); por simplicidad usamos `tearoff=0`.
- Repetir etiquetas y confundir al usuario.

---

## Mini‑Resumen del Capítulo

- Una barra de menú se crea con `Menu` y se asocia a la ventana.
- `add_cascade` añade un menú desplegable.
- `add_command` y `add_separator` añaden opciones y separadores.
- Implementaste un menú Archivo funcional.

En el próximo capítulo verás cómo capturar eventos de teclado y ratón con `bind`.
