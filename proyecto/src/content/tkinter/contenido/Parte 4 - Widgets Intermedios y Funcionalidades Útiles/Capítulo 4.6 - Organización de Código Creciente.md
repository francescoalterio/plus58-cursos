# Capítulo 4.6 Organización de Código Creciente

## Objetivo del capítulo

Aprender a organizar mejor tu script a medida que crecen los widgets y la lógica: separar creación de widgets en funciones, usar nombres claros y preparar el terreno para (más adelante) una clase de aplicación. Refactorizarás un ejemplo.

---

## 4.6.1 Separar Creación de Widgets y Lógica

Cuando todo está en el nivel superior, el archivo se vuelve difícil de leer. Una estrategia simple:

1. Definir funciones para crear secciones (ej. `crear_formulario()`).
2. Definir funciones para acciones (callbacks) arriba o abajo, pero agrupadas.

Ejemplo sin organización (versión inicial):

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Desorganizado")

nombre_var = tk.StringVar()
correo_var = tk.StringVar()

label1 = tk.Label(ventana, text="Nombre:")
label1.pack()
entrada1 = tk.Entry(ventana, textvariable=nombre_var)
entrada1.pack()
label2 = tk.Label(ventana, text="Correo:")
label2.pack()
entrada2 = tk.Entry(ventana, textvariable=correo_var)
entrada2.pack()

resultado = tk.Label(ventana, text="...")
resultado.pack()

def guardar():
    resultado.config(text=f"{nombre_var.get()} | {correo_var.get()}")

btn = tk.Button(ventana, text="Guardar", command=guardar)
btn.pack()

ventana.mainloop()
```

Refactorizado separando secciones:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Organizado")

nombre_var = tk.StringVar()
correo_var = tk.StringVar()

# Widgets referenciados globalmente mínimos
esultado = None


def crear_formulario(padre):
    frame = tk.Frame(padre, padx=10, pady=10)
    frame.pack(fill="x")
    tk.Label(frame, text="Nombre:").pack(anchor="w")
    tk.Entry(frame, textvariable=nombre_var).pack(fill="x")
    tk.Label(frame, text="Correo:").pack(anchor="w")
    tk.Entry(frame, textvariable=correo_var).pack(fill="x")
    return frame

def crear_resultados(padre):
    global resultado
    frame = tk.Frame(padre, padx=10, pady=10)
    frame.pack(fill="x")
    resultado = tk.Label(frame, text="...")
    resultado.pack(anchor="w")


def guardar():
    resultado.config(text=f"{nombre_var.get()} | {correo_var.get()}")

crear_formulario(ventana)
crear_resultados(ventana)

btn = tk.Button(ventana, text="Guardar", command=guardar)
btn.pack(pady=5)

ventana.mainloop()
```

---

## 4.6.2 Nombrar Widgets en Atributos (Sin Clases Todavía)

Antes de introducir clases, puedes almacenar referencias en variables globales mínimas o en un diccionario para acceso organizado:

```python
widgets = {}
widgets['entrada_nombre'] = tk.Entry(ventana)
widgets['entrada_nombre'].pack()
```

Luego:

```python
valor = widgets['entrada_nombre'].get()
```

Esto evita decenas de variables sueltas.

---

## 4.6.3 Micro‑Práctica: Reordenar Código para Legibilidad

Tareas:

1. Toma un script previo con varios widgets.
2. Crea funciones `crear_entradas()`, `crear_botones()`, `crear_estado()`.
3. Deja callbacks aparte bajo un comentario `# Callbacks`.
4. El bloque principal final solo debe llamar a las funciones y luego `mainloop()`.

---

## Errores Comunes

- Crear demasiadas funciones muy pequeñas sin beneficio (fragmentación innecesaria).
- Usar variables globales indiscriminadamente (sé selectivo; solo lo necesario).
- Olvidar devolver referencias si se necesitan después (decide si guardas en variables globales o retornas).

---

## Mini‑Resumen del Capítulo

- Separar creación y lógica mejora mantenimiento.
- Funciones ayudan a estructurar secciones.
- Diccionarios pueden agrupar referencias de widgets.
- Preparaste la base para introducir clases más adelante sin salto brusco.

Con esto finaliza la Parte 4. Próxima parte: Canvas, imágenes simples y temporización (`after`).
