# Capítulo 7.7 Versión 6 – Scrollbar en el Texto

## Objetivo del capítulo

Añadir un Scrollbar vertical a la zona de texto para manejar contenidos largos. Practicar vinculación Text <-> Scrollbar.

---

## 7.7.1 Integrar Scrollbar Vertical

Envolvemos el Text y la Scrollbar en un Frame contenedor para mantener orden.

```python
frame_texto = tk.Frame(ventana)
frame_texto.pack(padx=10, pady=10, fill="both", expand=True)

scroll = tk.Scrollbar(frame_texto)
scroll.pack(side="right", fill="y")

text_area = tk.Text(frame_texto, width=60, height=15, yscrollcommand=scroll.set, wrap="none")
text_area.pack(side="left", fill="both", expand=True)

scroll.config(command=text_area.yview)
```

`wrap="none"` evita ajuste automático de línea para probar scroll horizontal si se deseara (más adelante). Si no quieres líneas largas, usa `wrap="word"`.

---

## 7.7.2 Probar con Texto Largo

Puedes insertar rápidamente texto repetido para pruebas:

```python
for i in range(50):
    text_area.insert(tk.END, f"Línea {i}\n")
```

Asegúrate que el scroll funciona y que el contador sigue operando.

---

## Micro‑Práctica

1. Cambia `wrap` a `word` y escribe una línea muy larga para ver el efecto.
2. Inserta 200 líneas y verifica desplazamiento fluido.

---

## Errores Comunes

- Olvidar `yscrollcommand=scroll.set` (scrollbar no se actualiza al mover)
- Olvidar `scroll.config(command=text_area.yview)` (scroll no controla el Text)
- Empaquetar scrollbar a la izquierda y causar disposición rara.

---

## Mini‑Resumen

Integraste una Scrollbar funcional al área de texto. Próximo: refactorizar a clase para una organización más limpia.
