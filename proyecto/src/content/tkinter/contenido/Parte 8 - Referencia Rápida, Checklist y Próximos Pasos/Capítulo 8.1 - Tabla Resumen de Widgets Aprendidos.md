# Capítulo 8.1 Tabla Resumen de Widgets Aprendidos

## Objetivo del capítulo

Ofrecer una referencia rápida de los widgets vistos, su uso principal y un método/atributo clave que se emplea frecuentemente. Esto NO sustituye explicaciones previas: sirve como recordatorio condensado.

---

## Tabla Resumen (Texto Explicativo)

A continuación un listado; cada entrada: Widget – Uso principal – Método/Atributo clave (uno representativo, no exclusivo):

- Tk (ventana raíz) – Punto de inicio de la app – `mainloop()`
- Label – Mostrar texto estático – `config(text=...)`
- Button – Ejecutar acción – `command`
- Entry – Entrada de una línea – `get()`
- Text – Texto multilínea – `get("1.0", tk.END)`
- Frame – Contenedor agrupador – (usar como padre de otros)
- Checkbutton – Opción booleana independiente – `variable`
- Radiobutton – Selección exclusiva – `variable` compartida
- Listbox – Lista de ítems seleccionables – `curselection()`
- Spinbox – Número (o valor) acotado – `get()`
- Scale – Valor continuo/slider – `get()`
- Scrollbar – Desplazamiento – `config(command=...)`
- Canvas – Dibujo 2D básico – `create_line/oval/rectangle/...`
- Toplevel – Ventana secundaria – `destroy()`
- Menu – Barra y submenús – `add_command(...)`
- PhotoImage – Imagen simple – (mantener referencia)
- Variables de control (StringVar, IntVar, etc.) – Sincronización de valor – `set()/get()`

---

## Uso Práctico

Cuando olvides qué método usar, ven a esta lista para ubicar el widget y recordar el nombre principal. Si necesitas detalles (parámetros, ejemplos) vuelve al capítulo correspondiente.

---

## Micro‑Práctica

Toma un script y reemplaza literales dispersos configurando textos mediante `config()` luego de creación, para practicar lectura de esta tabla.

---

## Mini‑Resumen

Dispones de una vista comprimida de widgets y sus métodos representativos; úsala como recordatorio rápido, no como fuente única.
