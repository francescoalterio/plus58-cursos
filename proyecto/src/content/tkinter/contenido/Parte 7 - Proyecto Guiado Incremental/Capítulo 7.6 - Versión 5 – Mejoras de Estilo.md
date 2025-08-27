# Capítulo 7.6 Versión 5 – Mejoras de Estilo y Barra de Estado

## Objetivo del capítulo

Aplicar un estilo ligero y añadir una barra de estado inferior que muestre información básica (ej: número de caracteres tras el último conteo o mensajes temporales simples).

---

## 7.6.1 Ajustar Fuentes y Colores Leves

Sin hacer theming avanzado, sólo algunos parámetros para legibilidad:

```python
text_area.config(font=("Consolas", 11), undo=True)
btn_limpiar.config(bg="#1976d2", fg="white", activebackground="#0d47a1")
btn_contar.config(bg="#1976d2", fg="white", activebackground="#0d47a1")
```

Mantener consistencia: reutiliza un diccionario si se repite.

---

## 7.6.2 Añadir Barra de Estado (Label con Info)

La barra de estado es un `Label` pegado abajo, ocupado en toda la anchura:

```python
barra_estado = tk.Label(ventana, text="Listo", anchor="w", relief="sunken", bd=1)
barra_estado.pack(fill="x", side="bottom")
```

Actualizamos su texto dentro de las funciones:

```python
def contar():
    contenido = text_area.get("1.0", tk.END)
    longitud = len(contenido.rstrip("\n"))
    etiqueta_resultado.config(text=f"Caracteres: {longitud}")
    barra_estado.config(text="Conteo realizado")
```

Y en limpiar:

```python
barra_estado.config(text="Texto limpiado")
```

---

## Código Consolidado (Fragmento Estilo + Barra)

```python
# Después de crear text_area y botones
ESTILO_BOTON = {"bg": "#1976d2", "fg": "white", "activebackground": "#0d47a1", "padx": 6, "pady": 4}
btn_limpiar.config(**ESTILO_BOTON)
btn_contar.config(**ESTILO_BOTON)

barra_estado = tk.Label(ventana, text="Listo", anchor="w", relief="sunken", bd=1)
barra_estado.pack(fill="x", side="bottom")
```

Reusa la etiqueta de resultado para mostrar conteo principal; la barra de estado para mensajes breves.

---

## Micro‑Práctica

1. Haz que al abrir la ventana Acerca de la barra de estado muestre "Mostrando Acerca de".
2. Después de 2 segundos, restablece el texto a "Listo" usando `after`.
3. Tip: crea función `reset_barra()` y llama con `ventana.after(2000, reset_barra)`.

---

## Errores Comunes

- Saturar con muchos colores inconsistentes.
- No usar `anchor="w"` y texto se centra (a veces se quiere alineado a la izquierda).
- Usar relieve excesivo (`groove`, `ridge`) que distrae.

---

## Mini‑Resumen

Añadiste mejoras visuales leves y una barra de estado para retroalimentación. Siguiente: incorporar Scrollbar al área de texto.
