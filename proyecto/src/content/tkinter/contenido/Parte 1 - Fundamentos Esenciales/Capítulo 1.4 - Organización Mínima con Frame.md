# Capítulo 1.4 Organización Mínima con Frame

## Objetivo del capítulo

Aprender a usar `Frame` como un contenedor para agrupar widgets relacionados. Verás cómo un Frame ayuda a ordenar y a mover un conjunto de widgets como una unidad. Construirás una interfaz con dos secciones: entrada y resultados.

---

## 1.4.1 ¿Qué es un Contenedor? Frame como Caja

Un contenedor es un widget cuyo propósito principal es sostener a otros widgets dentro. `Frame` es el contenedor básico en Tkinter.

Metáfora: Imagínate cajas dentro de una caja mayor (la ventana). Puedes organizar mejor tus cosas en cajas temáticas: una para "entradas", otra para "botones", otra para "resultados".

Crear un Frame:

```python
marco = tk.Frame(ventana)
marco.pack()
```

Luego, al crear otros widgets, especificas ese Frame como padre en lugar de la ventana.

---

## 1.4.2 Crear un Frame y Poner Widgets Dentro

Ejemplo simple:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Uso de Frame")

marco_superior = tk.Frame(ventana)
marco_superior.pack()

label = tk.Label(marco_superior, text="Nombre:")
label.pack(side="left")

entrada = tk.Entry(marco_superior)
entrada.pack(side="left")

ventana.mainloop()
```

Aquí `label` y `entrada` están dentro de `marco_superior`. Ese marco, a su vez, está dentro de la ventana.

---

## 1.4.3 Ventajas: Agrupar y Mover Todo Junto

Si decides mover visualmente el grupo de widgets (por ejemplo, añadir `padx`, `pady` o cambiar de gestor), lo haces sobre el Frame.

Ejemplo añadiendo separación:

```python
marco_superior.pack(padx=10, pady=10)
```

Esto deja espacio alrededor de todo lo que contiene el Frame, sin configurar cada widget individualmente.

También puedes tener varios Frames uno debajo del otro para separar secciones.

---

## 1.4.4 Micro‑Práctica: Dos Secciones (Entrada y Resultados)

Objetivo: Una sección superior para introducir un texto y un botón; una sección inferior para mostrar un resultado.

Código sugerido:

```python
import tkinter as tk

def procesar():
    texto = entrada.get()
    label_resultado.config(text=f"Resultado: {texto.upper()}")

ventana = tk.Tk()
ventana.title("Dos secciones")

marco_entrada = tk.Frame(ventana)
marco_entrada.pack(padx=10, pady=5)

label_prompt = tk.Label(marco_entrada, text="Texto:")
label_prompt.pack(side="left")

entrada = tk.Entry(marco_entrada)
entrada.pack(side="left")

boton = tk.Button(marco_entrada, text="Procesar", command=procesar)
boton.pack(side="left", padx=5)

marco_resultado = tk.Frame(ventana)
marco_resultado.pack(padx=10, pady=5)

label_resultado = tk.Label(marco_resultado, text="Resultado: ")
label_resultado.pack()

ventana.mainloop()
```

Observa:

- `marco_entrada` controla la posición en la ventana de todo el conjunto de widgets de entrada.
- Dentro del marco, se empaquetan los widgets en línea horizontal usando `side="left"`.
- El segundo marco (`marco_resultado`) separa visualmente la salida.

---

## Errores Comunes

- Olvidar empaquetar el Frame: si el Frame no se muestra, sus widgets tampoco serán visibles.
- Mezclar padres incorrectamente (poner `ventana` como padre de algunos y el Frame de otros cuando deberían estar juntos). Mantén consistencia.
- Usar demasiados Frames innecesarios: crea sólo los que mejoren claridad.

---

## Mini‑Resumen del Capítulo

- `Frame` agrupa widgets y facilita organización.
- Puedes aplicar padding al Frame para espaciar un grupo completo.
- Multiples Frames crean secciones claras en la interfaz.
- Creaste una interfaz con entrada y resultado separados.

En el próximo capítulo conocerás el widget `Text` para manejar varias líneas de texto.
