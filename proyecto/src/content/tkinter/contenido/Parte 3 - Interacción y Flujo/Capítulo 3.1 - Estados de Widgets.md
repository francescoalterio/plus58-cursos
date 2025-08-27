# Capítulo 3.1 Estados de Widgets

## Objetivo del capítulo

Aprenderás a controlar el estado de ciertos widgets (especialmente `Button` y `Entry`), habilitándolos o deshabilitándolos según condiciones. Implementarás un botón que solo se activa cuando el usuario escribe algo.

---

## 3.1.1 Estado `normal` vs `disabled`

Muchos widgets tienen una propiedad `state` que puede tomar valores como:

- `normal`: el widget responde a interacción.
- `disabled`: el widget se muestra atenuado y no responde.

Ejemplo básico:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Estados")

b = tk.Button(ventana, text="No me puedes pulsar", state="disabled")
b.pack(padx=10, pady=10)

ventana.mainloop()
```

Puedes cambiar el estado después de crearlo:

```python
b.config(state="normal")
```

---

## 3.1.2 Deshabilitar un Botón hasta que haya Texto

Objetivo: el botón “Enviar” solo debe activarse si el `Entry` no está vacío.

Estrategia:

1. Usar una variable de control (`StringVar`).
2. Detectar cada cambio con `trace_add` (método para ejecutar una función cuando cambia el valor).
3. Habilitar o deshabilitar el botón según el contenido.

Código:

```python
import tkinter as tk

def revisar_contenido(*args):  # *args porque trace_add pasa parámetros que no usamos ahora
    if texto_var.get().strip():
        boton_enviar.config(state="normal")
    else:
        boton_enviar.config(state="disabled")

ventana = tk.Tk()
ventana.title("Activar según texto")

texto_var = tk.StringVar()
texto_var.trace_add("write", revisar_contenido)  # Llamar cuando cambie

entrada = tk.Entry(ventana, textvariable=texto_var)
entrada.pack(padx=10, pady=5)

boton_enviar = tk.Button(ventana, text="Enviar", state="disabled")
boton_enviar.pack(pady=5)

ventana.mainloop()
```

Explicación rápida:

- Al escribir en el Entry, `texto_var` cambia.
- `trace_add("write", revisar_contenido)` hace que se llame a `revisar_contenido`.
- Si el texto no está vacío tras hacer `strip()` (elimina espacios extremos), se habilita el botón.

---

## 3.1.3 Micro‑Práctica: Activar Botón Solo si Entry no Está Vacío

Tareas:

1. Copia el código anterior.
2. Cambia el texto del botón a “Procesar”.
3. Añade un Label que muestre “Listo” al pulsar el botón (y luego deshabilita otra vez el botón).

Pista para re-desactivar después de pulsar:

```python
boton_enviar.config(state="disabled")
texto_var.set("")
```

---

## Errores Comunes

- Olvidar inicializar el botón como `disabled` y luego no notar el cambio.
- Usar `trace` (versión antigua) en lugar de `trace_add` en Python moderno (aunque `trace` suele funcionar, preferimos el método actual).
- No usar `.strip()` y activar el botón con solo espacios.

---

## Mini‑Resumen del Capítulo

- Los widgets pueden estar en estado `normal` o `disabled`.
- Con `trace_add` reaccionas a cambios en variables de control.
- Implementaste lógica condicional simple para habilitar un botón.

En el próximo capítulo verás cómo mostrar cuadros de diálogo (messagebox) para informar, advertir o pedir confirmación.
