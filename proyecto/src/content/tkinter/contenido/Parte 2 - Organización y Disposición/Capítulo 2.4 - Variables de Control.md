# Capítulo 2.4 Variables de Control (StringVar, IntVar, etc.)

## Objetivo del capítulo

Introducir las variables de control de Tkinter (`StringVar`, `IntVar`, `BooleanVar`, `DoubleVar`) que permiten enlazar valores entre el programa y los widgets de forma automática. Construirás un contador usando `IntVar` y verás cómo actualizar etiquetas sin llamar a `config()` explícitamente cada vez.

---

## 2.4.1 ¿Por qué Usar Variables de Control?

Hasta ahora, para mostrar un valor cambiabas manualmente el texto de un Label con `config()`. Las variables de control permiten:

- Asociar un valor a varios widgets de forma sincronizada.
- Obtener y establecer valores con métodos `get()` y `set()` centralizados.
- Facilitan escalabilidad cuando hay muchos puntos que dependen de un mismo dato.

Metáfora: Es como tener un "depósito" central (la variable de control); los widgets conectados muestran siempre lo que hay dentro sin que tengas que ir y actualizar cada uno por separado.

---

## 2.4.2 Crear y Asociar a Label y Entry

Ejemplo con `StringVar`:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("StringVar básico")

nombre_var = tk.StringVar()          # Crear la variable de control
nombre_var.set("Inicial")            # Valor inicial (opcional)

entrada = tk.Entry(ventana, textvariable=nombre_var)
entrada.pack()

etiqueta = tk.Label(ventana, textvariable=nombre_var)
etiqueta.pack()

ventana.mainloop()
```

Prueba:

1. Escribe en el Entry.
2. Observa que el Label se actualiza automáticamente.

Esto ocurre porque ambos widgets están vinculados a la MISMA `StringVar`.

---

## 2.4.3 Actualizar Valor desde Código (`set` / `get`)

Puedes cambiar el contenido sin tocar directamente los widgets:

```python
nombre_var.set("Nuevo valor desde código")
```

El Entry y el Label reflejarán ese valor.

Leer el valor:

```python
actual = nombre_var.get()
print(actual)
```

---

## 2.4.4 Micro‑Práctica: Contador usando IntVar

Objetivo: Botón que incrementa un número mostrado en un Label sin usar `label.config()`.

Código sugerido:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Contador con IntVar")

contador_var = tk.IntVar(value=0)

label = tk.Label(ventana, textvariable=contador_var, font=("Arial", 14))
label.pack(pady=5)

def sumar():
    valor = contador_var.get()
    contador_var.set(valor + 1)

boton = tk.Button(ventana, text="Sumar", command=sumar)
boton.pack()

ventana.mainloop()
```

Explicación:

1. `IntVar(value=0)` crea la variable entera con valor inicial 0.
2. El Label muestra automáticamente su valor.
3. Al pulsar el botón, se obtiene el valor actual y se incrementa.

---

## Otras Variables de Control

- `BooleanVar`: valores True/False (útil para Checkbutton).
- `DoubleVar`: números con decimales.

Ejemplo rápido:

```python
activo = tk.BooleanVar(value=True)
print(activo.get())  # True
activo.set(False)
```

---

## Errores Comunes

- Olvidar usar `textvariable=` y tratar de mezclarlo con `text=` (si usas `textvariable`, el contenido dinámico proviene de la variable; evita definir ambos simultáneamente).
- Reemplazar la variable de control por otra nueva sin actualizar los widgets (mejor reutilizar la misma instancia).
- Usar variables Python normales esperando actualización automática (solo las variables de control tienen ese enlace con widgets).

---

## Mini‑Resumen del Capítulo

- Variables de control sincronizan datos entre widgets y tu código.
- `StringVar`, `IntVar`, `BooleanVar`, `DoubleVar` cubren tipos básicos.
- `get()` y `set()` permiten leer/escribir el valor centralizado.
- Implementaste un contador limpio con `IntVar`.

En el próximo capítulo verás cómo aplicar estilo básico (colores, fuentes) de forma controlada.
