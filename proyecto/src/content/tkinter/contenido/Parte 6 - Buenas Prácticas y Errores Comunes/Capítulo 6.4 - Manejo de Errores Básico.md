# Capítulo 6.4 Manejo de Errores Básico

## Objetivo del capítulo

Aprender a capturar excepciones dentro de callbacks para evitar que la aplicación se cierre abruptamente y mostrar mensajes de error amigables al usuario.

---

## 6.4.1 Capturar Excepciones Simples

Si una excepción ocurre dentro de un callback (por ejemplo al pulsar un botón), sin manejo la terminal mostrará el error y la app puede quedar en estado inconsistente.

Solución: envolver la lógica en `try/except`.

Ejemplo:

```python
import tkinter as tk
from tkinter import messagebox

def dividir():
    try:
        a = int(entrada_a.get())
        b = int(entrada_b.get())
        resultado = a / b
        label_resultado.config(text=f"Resultado: {resultado}")
    except ValueError:
        messagebox.showerror("Error", "Debes ingresar números enteros")
    except ZeroDivisionError:
        messagebox.showerror("Error", "No se puede dividir por cero")

ventana = tk.Tk()
ventana.title("División")

entrada_a = tk.Entry(ventana)
entrada_a.pack(padx=5, pady=5)
entrada_b = tk.Entry(ventana)
entrada_b.pack(padx=5, pady=5)

btn = tk.Button(ventana, text="Dividir", command=dividir)
btn.pack(pady=5)

label_resultado = tk.Label(ventana, text="Resultado: ")
label_resultado.pack(pady=5)

ventana.mainloop()
```

---

## 6.4.2 Mostrar Messagebox de Error Amigable

Usar `messagebox.showerror(titulo, mensaje)` evita que el usuario vea rastros técnicos.

Puedes generalizar:

```python
try:
    # lógica
except Exception as e:
    messagebox.showerror("Error inesperado", str(e))
```

Para principiantes está bien, aunque en aplicaciones serias conviene registrar (log) errores.

---

## 6.4.3 Micro‑Práctica: Envolver Lógica de Botón con try/except

Tareas:

1. Crea un formulario que pida dos números y muestre su suma.
2. Si el usuario ingresa algo no numérico, muestra error.
3. Limpia ambas entradas tras un cálculo válido.

Pseudocódigo:

```python
try:
    n1 = int(entry1.get())
    n2 = int(entry2.get())
    mostrar resultado
except ValueError:
    error amigable
```

---

## Errores Comunes

- Capturar excepciones demasiado genéricas y ocultar problemas reales sin feedback.
- No validar entradas y asumir que todo es correcto.
- Mostrar rastros técnicos que confunden a principiantes.

---

## Mini‑Resumen del Capítulo

- `try/except` protege la app ante errores de usuario.
- `showerror` comunica fallos de forma clara.
- Refuerzas robustez sin complejidad extra.

Siguiente: reutilización y pequeñas utilidades para reducir código repetido.
