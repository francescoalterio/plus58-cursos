# Capítulo 7.3 Versión 2 – Menú Superior

## Objetivo del capítulo

Agregar una barra de menú para ofrecer las acciones Limpiar y Salir, además de un menú de Ayuda con opción Acerca de (placeholder por ahora).

---

## 7.3.1 Añadir Menú Archivo (Limpiar / Salir)

Partimos del código previo y añadimos:

```python
menu_bar = tk.Menu(ventana)
ventana.config(menu=menu_bar)

menu_archivo = tk.Menu(menu_bar, tearoff=0)
menu_archivo.add_command(label="Limpiar", command=limpiar)
menu_archivo.add_separator()
menu_archivo.add_command(label="Salir", command=ventana.destroy)
menu_bar.add_cascade(label="Archivo", menu=menu_archivo)
```

---

## 7.3.2 Añadir Menú Ayuda (Acerca de)

Creamos un segundo menú (la ventana About se implementará después):

```python
menu_ayuda = tk.Menu(menu_bar, tearoff=0)
menu_ayuda.add_command(label="Acerca de", command=lambda: print("Acerca de (pendiente)"))
menu_bar.add_cascade(label="Ayuda", menu=menu_ayuda)
```

---

## Código Consolidado (Fragmento Principal)

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

menu_bar = tk.Menu(ventana)
ventana.config(menu=menu_bar)

menu_archivo = tk.Menu(menu_bar, tearoff=0)
menu_archivo.add_command(label="Limpiar", command=limpiar)
menu_archivo.add_separator()
menu_archivo.add_command(label="Salir", command=ventana.destroy)
menu_bar.add_cascade(label="Archivo", menu=menu_archivo)

menu_ayuda = tk.Menu(menu_bar, tearoff=0)
menu_ayuda.add_command(label="Acerca de", command=lambda: print("Acerca de (pendiente)"))
menu_bar.add_cascade(label="Ayuda", menu=menu_ayuda)

ventana.mainloop()
```

---

## Micro‑Práctica

1. Añade opción "Contar" en el menú Archivo que ejecute la misma función `contar`.
2. Comprueba que funciona igual que el botón.

---

## Errores Comunes

- Olvidar `tearoff=0` (aparece línea punteada innecesaria).
- Duplicar label de menú y confundir orden.
- Escribir mal `ventana.config(menu=menu_bar)` y no aparece el menú.

---

## Mini‑Resumen

Integraste un menú que ofrece alternativas a los botones. Próximo paso: proteger acciones con confirmaciones (diálogos).
