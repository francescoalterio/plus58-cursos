# Capítulo 1.2 Callbacks y Comando del Botón

## Objetivo del capítulo

Dar vida a los botones. Aprenderás qué es una función callback, cómo asociarla al parámetro `command` de un `Button` y entender la diferencia crítica entre pasar una función y llamarla inmediatamente. Construirás un pequeño contador de clics.

---

## 1.2.1 ¿Qué es una Función Callback?

Una función callback es una función que NO llamas tú directamente en ese momento, sino que LE DAS su nombre a Tkinter para que la invoque más tarde cuando ocurra un evento (por ejemplo, un clic).

Metáfora: Es como dejar tu número de teléfono en recepción. Tú no llamas ahora; ellos te llamarán cuando ocurra algo.

Ejemplo de una función simple:

```python
def saludar():
    print("Hola desde el botón")
```

Todavía no hace nada por sí misma hasta que alguien la llame. El botón será ese "alguien".

---

## 1.2.2 Propiedad `command` en `Button`

Para que un botón ejecute algo al pulsarse:

```python
import tkinter as tk

def saludar():
    print("¡Has pulsado el botón!")

ventana = tk.Tk()
ventana.title("Callback básico")

boton = tk.Button(ventana, text="Pulsar", command=saludar)
boton.pack()

ventana.mainloop()
```

Observa: `command=saludar` (sin paréntesis). Cuando hagas clic, verás el texto en la consola.

---

## 1.2.3 Imprimir Algo en la Consola al Pulsar

La consola sigue siendo útil para verificar que la función se ejecutó. No necesitas aún cambiar la interfaz para comprobarlo.

Prueba a modificar el mensaje dentro de `saludar()` y vuelve a ejecutar.

---

## 1.2.4 Diferencia entre `command=mi_funcion` y `command=mi_funcion()`

Error muy común: escribir `command=saludar()`.

¿Qué ocurre si lo haces?

- Python ejecuta la función inmediatamente al crear el botón.
- El resultado (return) de la función (en este caso `None`) se asigna a `command`.
- Al pulsar el botón después, NO pasa nada porque `command` no tiene una función válida.

Siempre que quieras pasar una función para que se ejecute más tarde, escribe su NOMBRE sin paréntesis.

### ¿Y si necesito pasar parámetros?

Más adelante veremos técnicas (usar `lambda`), pero ahora mantendremos callbacks simples sin argumentos.

---

## 1.2.5 Micro‑Práctica: Contador de Clics

Objetivo: Mostrar cuántas veces se ha pulsado el botón. Cambiaremos el texto de un Label.

Código sugerido:

```python
import tkinter as tk

contador = 0  # variable global simple para este ejercicio

def incrementar():
    global contador
    contador += 1
    label.config(text=f"Clics: {contador}")

ventana = tk.Tk()
ventana.title("Contador de clics")

label = tk.Label(ventana, text="Clics: 0")
label.pack()

boton = tk.Button(ventana, text="Sumar 1", command=incrementar)
boton.pack()

ventana.mainloop()
```

### Explicación:

1. `contador` guarda el número actual.
2. `incrementar()` modifica `contador` y actualiza el texto del Label usando `config()` (método que permite cambiar propiedades luego de creado el widget).
3. El botón llama a `incrementar` cada vez que se pulsa.

No te preocupes aún si la palabra `global` te suena nueva; luego veremos alternativas más ordenadas (Variables de control y clases). Por ahora es suficiente.

---

## Ejemplo: Botón que Cambia Texto de Sí Mismo

```python
import tkinter as tk

def cambiar():
    boton.config(text="¡Gracias!")

ventana = tk.Tk()
ventana.title("Cambiar texto")

boton = tk.Button(ventana, text="Haz clic", command=cambiar)
boton.pack()

ventana.mainloop()
```

Esto demuestra que un widget puede modificarse a sí mismo dentro de una callback.

---

## Errores Frecuentes

- Usar paréntesis: `command=incrementar()` ejecuta la función antes de tiempo.
- Intentar imprimir algo y no ver nada porque se ejecutó demasiado pronto.
- Olvidar `label.config(...)` y crear un nuevo Label cada vez (no es necesario).

---

## Mini‑Resumen del Capítulo

- Un callback es una función que Tkinter llamará luego, no tú ahora.
- `command` enlaza un botón con una función sin paréntesis.
- Puedes modificar widgets existentes dentro de la función.
- Construiste un contador básico.

En el próximo capítulo aprenderás a capturar texto que el usuario escribe: el widget `Entry`.
