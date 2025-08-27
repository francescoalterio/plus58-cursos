# Capítulo 6.5 Reutilización y Pequeñas Utilidades

## Objetivo del capítulo

Reducir código duplicado creando funciones auxiliares (helpers) y patrones sencillos para repetir estilos o creación de widgets. Implementarás utilidades para etiquetas estándar.

---

## 6.5.1 Funciones Auxiliares (Factory Functions)

Si repites mucho la creación de un tipo de Label con mismos parámetros, crea una función:

```python
def crear_label(titulo, padre, **extra):
    return tk.Label(padre, text=titulo, font=("Arial", 12), anchor="w", **extra)
```

Así evitas repetir fuente, anchor, etc.

Uso:

```python
label_nombre = crear_label("Nombre:", frame)
label_nombre.pack(fill="x")
```

---

## 6.5.2 Evitar Duplicación

Ejemplo: varios botones con mismo estilo.
Mala repetición:

```python
tk.Button(frame, text="Guardar", bg="navy", fg="white").pack()
tk.Button(frame, text="Cancelar", bg="navy", fg="white").pack()
```

Mejor usando un diccionario de opciones:

```python
btn_opts = {"bg": "navy", "fg": "white", "padx": 5, "pady": 5}

tk.Button(frame, text="Guardar", **btn_opts).pack()
tk.Button(frame, text="Cancelar", **btn_opts).pack()
```

Puedes cambiar estilo en un solo lugar.

---

## 6.5.3 Micro‑Práctica: Factorizar Estilos Repetidos

Tareas:

1. Toma un script con varios Labels y Buttons.
2. Crea una función `crear_boton(texto, padre, comando)` que aplique un estilo estándar.
3. Usa un diccionario de parámetros compartidos para colores.
4. Reemplaza la duplicación en el script.

Ejemplo orientativo:

```python
import tkinter as tk

ESTILO_BOTON = {"bg": "#1976d2", "fg": "white", "activebackground": "#0d47a1", "padx": 6, "pady": 4}

def crear_boton(padre, texto, comando):
    return tk.Button(padre, text=texto, command=comando, **ESTILO_BOTON)

ventana = tk.Tk()
ventana.title("Utilidades")

def accion():
    print("Acción")

crear_boton(ventana, "Aceptar", accion).pack(pady=5)
crear_boton(ventana, "Cancelar", ventana.destroy).pack(pady=5)

ventana.mainloop()
```

---

## Errores Comunes

- Over‑engineering: crear helpers para algo que se usa una sola vez.
- Olvidar `**` al expandir diccionarios de opciones (`TypeError`).
- Usar nombres genéricos (`do`, `helper1`) que no describen el propósito.

---

## Mini‑Resumen del Capítulo

- Helpers reducen repetición y facilitan cambios globales de estilo.
- Diccionarios de opciones centralizan parámetros compartidos.
- Aplicaste factor refactor para mejorar claridad y mantenimiento.

Con esto concluye la Parte 6. Próxima parte: proyecto guiado incremental uniendo todo lo aprendido.
