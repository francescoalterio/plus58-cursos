# Apéndice A.3 Plantilla Base de Script Inicial

## Objetivo

Proporcionar una plantilla mínima pero ordenada para iniciar nuevas prácticas o pequeñas utilidades, evitando repetir desde cero.

---

## Plantilla Comentada

```python
"""Mini plantilla para una app Tkinter básica.
Descripción: (añade aquí el propósito corto de la herramienta)
"""
import tkinter as tk
from tkinter import messagebox  # Importa si vas a usar diálogos, si no, puedes quitarlo

# ---------------------------
# Configuración / Constantes
# ---------------------------
ANCHO_VENTANA = 600
ALTO_VENTANA = 400
TITULO_APP = "Aplicación Tk"

# Colores y estilos básicos (opcional)
ESTILO_BOTON = {
    "bg": "#1976d2",
    "fg": "white",
    "activebackground": "#0d47a1",
    "padx": 6,
    "pady": 4,
}

# ---------------------------
# Funciones (callbacks)
# ---------------------------

def accion_principal():
    """Ejemplo de acción principal del botón."""
    mensaje = entrada.get().strip()
    if not mensaje:
        messagebox.showwarning("Aviso", "Escribe algo primero")
        return
    etiqueta_resultado.config(text=f"Ingresado: {mensaje}")

# ---------------------------
# Inicialización de la ventana
# ---------------------------
ventana = tk.Tk()
ventana.title(TITULO_APP)
ventana.geometry(f"{ANCHO_VENTANA}x{ALTO_VENTANA}")

# ---------------------------
# Creación de widgets
# ---------------------------
frame_superior = tk.Frame(ventana)
frame_superior.pack(padx=10, pady=10, fill="x")

etiqueta_prompt = tk.Label(frame_superior, text="Escribe algo:")
etiqueta_prompt.pack(side="left")

entrada = tk.Entry(frame_superior, width=40)
entrada.pack(side="left", padx=5)

boton_ejecutar = tk.Button(frame_superior, text="Ejecutar", command=accion_principal, **ESTILO_BOTON)
boton_ejecutar.pack(side="left")

etiqueta_resultado = tk.Label(ventana, text="Resultado pendiente...", anchor="w")
etiqueta_resultado.pack(fill="x", padx=10, pady=(0,10))

# Barra de estado opcional
barra_estado = tk.Label(ventana, text="Listo", anchor="w", relief="sunken", bd=1)
barra_estado.pack(fill="x", side="bottom")

# Enfoque inicial
entrada.focus_set()

# ---------------------------
# Bucle principal
# ---------------------------
ventana.mainloop()
```

---

## Cómo Usarla

1. Copia el archivo renombrándolo según tu mini‑proyecto.
2. Ajusta constantes (título, tamaño) y elimina secciones no usadas.
3. Añade nuevos frames y widgets debajo del bloque de creación.

---

## Micro‑Práctica

Crea una copia de la plantilla y transforma la acción principal en un contador de cuántas veces se pulsa el botón.

---

## Mini‑Resumen

Tienes una base limpia para iterar rápido sin olvidar estructura mínima y legible.
