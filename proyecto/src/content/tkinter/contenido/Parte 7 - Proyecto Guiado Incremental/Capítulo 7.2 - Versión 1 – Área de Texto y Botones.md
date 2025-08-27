# Capítulo 7.2 Versión 1 – Área de Texto y Botones

## Objetivo del capítulo

Construir la primera versión funcional mínima: un área de texto para escribir y dos botones: Limpiar y Contar. Mostrar el resultado de conteo en un Label inferior.

---

## 7.2.1 Crear Ventana y Text

Partimos del archivo base y añadimos un widget `Text` de tamaño razonable.

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Mini Bloc de Notas")

text_area = tk.Text(ventana, width=60, height=15)
text_area.pack(padx=10, pady=10)

ventana.mainloop()
```

---

## 7.2.2 Botones: Limpiar y Contar

Agregamos un Frame para agrupar botones.

```python
boton_frame = tk.Frame(ventana)
boton_frame.pack(pady=5)

def limpiar():
    text_area.delete("1.0", tk.END)

def contar():
    contenido = text_area.get("1.0", tk.END)
    # strip para no contar salto extra final
    longitud = len(contenido.rstrip("\n"))
    etiqueta_resultado.config(text=f"Caracteres: {longitud}")

btn_limpiar = tk.Button(boton_frame, text="Limpiar", command=limpiar)
btn_limpiar.pack(side="left", padx=5)

btn_contar = tk.Button(boton_frame, text="Contar", command=contar)
btn_contar.pack(side="left", padx=5)
```

---

## 7.2.3 Mostrar Conteo en Label Inferior

Añadimos un Label para el resultado:

```python
etiqueta_resultado = tk.Label(ventana, text="Caracteres: 0", anchor="w")
etiqueta_resultado.pack(fill="x", padx=10, pady=(0,10))
```

Código completo hasta ahora:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Mini Bloc de Notas")

text_area = tk.Text(ventana, width=60, height=15)
text_area.pack(padx=10, pady=10)

boton_frame = tk.Frame(ventana)
boton_frame.pack(pady=5)

def limpiar():
    text_area.delete("1.0", tk.END)

def contar():
    contenido = text_area.get("1.0", tk.END)
    longitud = len(contenido.rstrip("\n"))
    etiqueta_resultado.config(text=f"Caracteres: {longitud}")

btn_limpiar = tk.Button(boton_frame, text="Limpiar", command=limpiar)
btn_limpiar.pack(side="left", padx=5)

btn_contar = tk.Button(boton_frame, text="Contar", command=contar)
btn_contar.pack(side="left", padx=5)

etiqueta_resultado = tk.Label(ventana, text="Caracteres: 0", anchor="w")
etiqueta_resultado.pack(fill="x", padx=10, pady=(0,10))

ventana.mainloop()
```

---

## Micro‑Práctica

1. Añade un tercer botón "Contar líneas" que muestre `Líneas: X` en el mismo label (puedes concatenar).
2. Tip: `contenido.count("\n")` da una pista.

---

## Errores Comunes

- Usar mal índices: inicio debe ser "1.0" en Text.
- Olvidar `rstrip` y contar un salto adicional innecesario.
- Llamar a `contar()` al asignar command (no usar paréntesis).

---

## Mini‑Resumen

Ya tienes la primera versión utilizable: escribir, limpiar, contar caracteres. Siguiente: añadir menú para acciones redundantes y mejor accesibilidad.
