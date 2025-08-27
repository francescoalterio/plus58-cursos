# Capítulo 4.4 Scrollbar

## Objetivo del capítulo

Aprender a añadir barras de desplazamiento (`Scrollbar`) a widgets que lo soportan, principalmente `Text` y `Listbox`. Construirás un área de texto con desplazamiento vertical.

---

## 4.4.1 Vincular Scrollbar con Text

Una Scrollbar es un widget separado que debe:

1. Crearse y colocarse.
2. Conectarse al widget objetivo mediante comandos.
3. Permitir al widget objetivo actualizar la posición de la barra.

Ejemplo básico:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Text con Scroll")

scroll = tk.Scrollbar(ventana)
scroll.pack(side="right", fill="y")

area = tk.Text(ventana, width=40, height=10, yscrollcommand=scroll.set)
area.pack(side="left", fill="both", expand=True)

scroll.config(command=area.yview)

for i in range(50):
    area.insert(tk.END, f"Línea {i}\n")

ventana.mainloop()
```

Relación clave:

- `yscrollcommand=scroll.set` permite que el Text actualice la barra.
- `scroll.config(command=area.yview)` permite que la barra mueva el contenido.

---

## 4.4.2 Vincular Scrollbar con Listbox

Muy similar:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Listbox con Scroll")

scroll = tk.Scrollbar(ventana)
scroll.pack(side="right", fill="y")

lista = tk.Listbox(ventana, yscrollcommand=scroll.set, height=10)
lista.pack(side="left", fill="both", expand=True)

scroll.config(command=lista.yview)

for i in range(100):
    lista.insert(tk.END, f"Elemento {i}")

ventana.mainloop()
```

---

## 4.4.3 Micro‑Práctica: Área de Texto con Desplazamiento Vertical

Objetivo: Crear un Text con líneas generadas y navegar con la Scrollbar.

Tareas:

1. Crear ventana y Scrollbar a la derecha.
2. Crear Text con `yscrollcommand`.
3. Llenar con 80 líneas.
4. Probar arrastrar la barra y usar la rueda del ratón.

Puedes reutilizar el primer ejemplo adaptándolo a 80 líneas.

---

## Errores Comunes

- Olvidar uno de los dos enlaces (`yscrollcommand` o `command=...`) y que la barra no se actualice o no funcione.
- Poner la Scrollbar dentro de un Frame distinto sin ajustar correctamente (pierde alineación). Solución: envolver ambos en un Frame compartido.
- No usar `fill` y que la barra quede corta.

---

## Mini‑Resumen del Capítulo

- Scrollbar requiere configuración dual: widget → barra y barra → widget.
- Funciona con widgets que implementan `yview` / `xview` (Text, Listbox, Canvas, etc.).
- Implementaste desplazamiento vertical básico.

Siguiente: `place` (sólo para entenderlo, se usará poco) y advertencias de cuándo evitarlo.
