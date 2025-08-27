# Capítulo 7.4 Versión 3 – Diálogos de Confirmación

## Objetivo del capítulo

Antes de limpiar el texto, confirmar con el usuario usando un diálogo `askyesno`.

---

## 7.4.1 Confirmar al Limpiar

Importamos `messagebox` y ajustamos la función `limpiar`.

```python
import tkinter as tk
from tkinter import messagebox

# ... código previo de creación de ventana y widgets ...

def limpiar():
    if not text_area.get("1.0", tk.END).strip():
        # Nada que limpiar, opcionalmente informar
        return
    respuesta = messagebox.askyesno("Confirmar", "¿Seguro que deseas limpiar el texto?")
    if respuesta:
        text_area.delete("1.0", tk.END)
        etiqueta_resultado.config(text="Caracteres: 0")
```

---

## 7.4.2 Manejar Respuesta del Usuario

`askyesno` devuelve True/False. Sólo limpiamos si True. Actualizamos también el label de conteo.

Código integrado (fragmento de la función):

```python
def limpiar():
    contenido_actual = text_area.get("1.0", tk.END)
    if not contenido_actual.strip():
        return
    if messagebox.askyesno("Confirmar", "¿Seguro que deseas limpiar el texto?"):
        text_area.delete("1.0", tk.END)
        etiqueta_resultado.config(text="Caracteres: 0")
```

---

## Código Consolidado (Secciones Clave)

```python
import tkinter as tk
from tkinter import messagebox

ventana = tk.Tk()
ventana.title("Mini Bloc de Notas")

text_area = tk.Text(ventana, width=60, height=15)
text_area.pack(padx=10, pady=10)

boton_frame = tk.Frame(ventana)
boton_frame.pack(pady=5)

def limpiar():
    contenido_actual = text_area.get("1.0", tk.END)
    if not contenido_actual.strip():
        return
    if messagebox.askyesno("Confirmar", "¿Seguro que deseas limpiar el texto?"):
        text_area.delete("1.0", tk.END)
        etiqueta_resultado.config(text="Caracteres: 0")

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

1. Añade una confirmación similar al intentar cerrar la ventana (captura protocolo WM_DELETE_WINDOW).
2. Tip: `ventana.protocol("WM_DELETE_WINDOW", mi_funcion)`.

---

## Errores Comunes

- Olvidar importar `messagebox`.
- Reconfirmar incluso cuando el área ya está vacía (innecesario).
- Hacer la pregunta al usuario pero olvidar limpiar realmente.

---

## Mini‑Resumen

Protegiste una acción destructiva con confirmación. Próximo: ventana Acerca de propiamente dicha.
