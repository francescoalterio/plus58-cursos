# Capítulo 1.5 Widget Text (Multilínea Básico)

## Objetivo del capítulo

Conocer el widget `Text`, que permite introducir y mostrar varias líneas de texto. Aprenderás a insertar contenido, leerlo e interactuar con él de forma simple (sin todavía usar Scrollbar ni configuraciones avanzadas). Concluirás mostrando texto generado desde un botón.

---

## 1.5.1 Diferencia entre `Entry` y `Text`

| Aspecto       | Entry               | Text                                                      |
| ------------- | ------------------- | --------------------------------------------------------- |
| Líneas        | 1                   | Varias                                                    |
| Uso           | Datos cortos        | Texto largo, párrafos                                     |
| Métodos clave | `get()`, `delete()` | `insert()`, `get()`, `delete()` con índices más complejos |

`Text` ofrece más flexibilidad: puedes agregar, borrar y formatear (más adelante) múltiples líneas.

---

## 1.5.2 Insertar y Obtener Texto Básico

Creación mínima:

```python
area = tk.Text(ventana, height=5, width=30)
area.pack()
```

Parámetros comunes iniciales:

- `height`: número aproximado de líneas visibles.
- `width`: número aproximado de caracteres visibles por línea.

Insertar texto inicial:

```python
area.insert("1.0", "Línea inicial\nOtra línea")
```

El índice `"1.0"` significa: línea 1, carácter 0 (inicio del todo).

Obtener todo el contenido:

```python
contenido = area.get("1.0", tk.END)  # Desde el inicio hasta el final
```

Esto incluirá normalmente un salto de línea extra al final; no te preocupes ahora.

Borrar todo:

```python
area.delete("1.0", tk.END)
```

---

## 1.5.3 Desplazamiento Manual (Aún sin Scrollbar)

Si escribes más texto del que cabe, podrás usar la rueda del ratón para desplazarte (en la mayoría de los sistemas) o seleccionar y arrastrar. Aún no añadiremos una barra de desplazamiento visible; eso vendrá más adelante.

---

## 1.5.4 Micro‑Práctica: Mostrar Varias Líneas desde un Botón

Objetivo: Al pulsar un botón, limpiar el `Text` y escribir varias líneas generadas.

Código sugerido:

```python
import tkinter as tk

def generar():
    area.delete("1.0", tk.END)
    lineas = [
        "Línea 1: Hola",
        "Línea 2: Esto es texto múltiple",
        "Línea 3: Generado por un botón",
    ]
    for l in lineas:
        area.insert(tk.END, l + "\n")

ventana = tk.Tk()
ventana.title("Texto multilínea")

area = tk.Text(ventana, height=6, width=40)
area.pack()

boton = tk.Button(ventana, text="Generar", command=generar)
boton.pack(pady=5)

ventana.mainloop()
```

Explicación:

1. Limpiamos el contenido anterior.
2. Iteramos sobre una lista de cadenas.
3. Insertamos cada línea al final (`tk.END`) y añadimos un salto de línea manual.

---

## Errores Comunes

- Usar índices como en Entry (`0` o `tk.END` solo) — en `Text` debes usar formato de "línea.caracter".
- Olvidar que `get("1.0", tk.END)` trae un salto de línea adicional (se puede quitar con `.strip()` si molesta).
- No limpiar antes de insertar nuevas líneas y terminar acumulando texto.

---

## Mini‑Resumen del Capítulo

- `Text` permite múltiples líneas.
- Índices usan formato "línea.caracter" ("1.0" es inicio total).
- `insert`, `get`, `delete` son las operaciones básicas.
- Construiste un generador de varias líneas controlado por un botón.

Con esto terminas los fundamentos esenciales de los widgets básicos. En la siguiente parte aprenderás a organizar mejor la disposición con más detalle (layouts y variables de control).
