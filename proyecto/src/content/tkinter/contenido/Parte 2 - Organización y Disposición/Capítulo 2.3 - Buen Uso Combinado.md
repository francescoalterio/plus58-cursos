# Capítulo 2.3 Buen Uso Combinado (pack + grid con Frames)

## Objetivo del capítulo

Aprender a combinar `pack()` y `grid()` sin generar conflictos usando Frames como fronteras. Construirás una ventana con una cabecera (usando `pack`), un formulario central (usando `grid`) y una barra inferior (usando `pack`).

---

## 2.3.1 Regla Clave

En un mismo contenedor (misma ventana o mismo Frame) NO mezcles `pack()` y `grid()`. Pero sí puedes:

- Usar `pack()` en la ventana principal para colocar Frames.
- Dentro de un Frame específico, usar `grid()` para los widgets internos.

Así cada Frame actúa como un "territorio" con su propio gestor.

---

## 2.3.2 Anidar Frames

Estrategia:

1. Ventana principal: colocar tres Frames con `pack()`: cabecera, cuerpo, pie.
2. En el Frame de cuerpo, usar `grid()` para organizar etiquetas y entradas.

---

## 2.3.3 Micro‑Práctica: Cabecera + Formulario + Barra Inferior

Código sugerido:

```python
import tkinter as tk

def guardar():
    nombre = entry_nombre.get()
    correo = entry_correo.get()
    estado.config(text=f"Guardado: {nombre} | {correo}")

def limpiar():
    entry_nombre.delete(0, tk.END)
    entry_correo.delete(0, tk.END)
    estado.config(text="Listo")

ventana = tk.Tk()
ventana.title("Combinando gestores")

# Frame cabecera (pack)
frame_cabecera = tk.Frame(ventana, pady=10)
frame_cabecera.pack(fill="x")

label_titulo = tk.Label(frame_cabecera, text="Formulario de Contacto", font=("Arial", 14))
label_titulo.pack()

# Frame cuerpo (grid)
frame_cuerpo = tk.Frame(ventana, padx=10, pady=5)
frame_cuerpo.pack(fill="x")

tk.Label(frame_cuerpo, text="Nombre:").grid(row=0, column=0, sticky="e", padx=5, pady=5)
entry_nombre = tk.Entry(frame_cuerpo)
entry_nombre.grid(row=0, column=1, padx=5, pady=5)

tk.Label(frame_cuerpo, text="Correo:").grid(row=1, column=0, sticky="e", padx=5, pady=5)
entry_correo = tk.Entry(frame_cuerpo)
entry_correo.grid(row=1, column=1, padx=5, pady=5)

btn_guardar = tk.Button(frame_cuerpo, text="Guardar", command=guardar)
btn_guardar.grid(row=2, column=0, pady=10)

btn_limpiar = tk.Button(frame_cuerpo, text="Limpiar", command=limpiar)
btn_limpiar.grid(row=2, column=1, pady=10)

# Frame pie (pack)
frame_pie = tk.Frame(ventana, pady=5)
frame_pie.pack(fill="x")

estado = tk.Label(frame_pie, text="Listo", relief="sunken", anchor="w")
estado.pack(fill="x", padx=10)

ventana.mainloop()
```

Observa:

- `frame_cabecera` y `frame_pie` se añaden con `pack()`.
- Dentro de `frame_cuerpo` usamos `grid()` exclusivamente.
- Esto evita conflictos y organiza visualmente.

---

## Errores Comunes

- Poner un widget con `grid()` directamente en la ventana y luego un Frame con `pack()` → mezcla prohibida.
- Intentar usar `pack()` y `grid()` sobre el mismo Frame por accidente (revisa cada llamada).
- No planear secciones: usar un solo gestor para todo cuando diferentes partes se beneficiarían de otro.

---

## Mini‑Resumen del Capítulo

- Se puede combinar `pack` y `grid` usando Frames como fronteras.
- Cada Frame debe usar un único gestor internamente.
- Estructurar en secciones mejora claridad y mantenimiento.

En el próximo capítulo aprenderás sobre las variables de control (`StringVar`, `IntVar`, etc.) para sincronizar valores con widgets.
