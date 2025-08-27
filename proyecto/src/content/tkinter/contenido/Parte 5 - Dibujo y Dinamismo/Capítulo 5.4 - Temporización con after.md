# Capítulo 5.4 Temporización con after()

## Objetivo del capítulo

Aprender a ejecutar acciones después de cierto tiempo o repetidamente usando `after()`: crearás un reloj simple que se actualiza cada segundo y entenderás cómo cancelar actualizaciones.

---

## 5.4.1 Concepto de Tareas Diferidas

`after(milisegundos, funcion)` programa la ejecución de `funcion` después de la cantidad indicada de milisegundos (1000 ms = 1 segundo).

A diferencia de `time.sleep()`, `after` NO bloquea la interfaz. El bucle principal puede seguir respondiendo a eventos.

---

## 5.4.2 Actualización Periódica de un Contador

Para una tarea repetitiva, la función vuelve a llamarse a sí misma mediante `after`.

Ejemplo contador:

```python
import tkinter as tk

contador = 0

def tick():
    global contador
    contador += 1
    etiqueta.config(text=f"Segundos: {contador}")
    ventana.after(1000, tick)  # volver a programar

ventana = tk.Tk()
ventana.title("Contador")

etiqueta = tk.Label(ventana, text="Segundos: 0")
etiqueta.pack(padx=10, pady=10)

ventana.after(1000, tick)  # primera llamada diferida
ventana.mainloop()
```

---

## 5.4.3 Cancelar una Tarea (Pattern con Flag)

`after` devuelve un identificador si usas la forma `id = ventana.after(1000, funcion)`. Para principiantes, suele ser más simple usar una bandera (flag) booleana.

Ejemplo con bandera:

```python
import tkinter as tk

ejecutando = True

def actualizar():
    if not ejecutando:
        return
    etiqueta.config(text=time.strftime("%H:%M:%S"))
    ventana.after(1000, actualizar)

def detener():
    global ejecutando
    ejecutando = False

import time
ventana = tk.Tk()
ventana.title("Reloj")

etiqueta = tk.Label(ventana, font=("Consolas", 18))
etiqueta.pack(pady=10)

btn_detener = tk.Button(ventana, text="Detener", command=detener)
btn_detener.pack()

actualizar()
ventana.mainloop()
```

Si pulsas “Detener”, la bandera se pone en False y ya no se reprograma la función.

---

## 5.4.4 Micro‑Práctica: Reloj Sencillo en la Ventana

Tareas:

1. Crear un Label vacío.
2. Función que obtiene la hora local (`time.strftime`) y la pone en el Label.
3. Programar la función cada 1000 ms con `after`.

Extensión opcional: añadir botón “Pausar / Reanudar”.

---

## Errores Comunes

- Usar `time.sleep()` para actualizar cada segundo (congela la ventana mientras duerme).
- Olvidar reprogramar la función dentro de sí misma para periodicidad.
- Crear múltiples bucles `after` que hacen lo mismo (duplican trabajo innecesariamente).

---

## Mini‑Resumen del Capítulo

- `after` programa funciones sin bloquear la interfaz.
- Para repetición, la función se reprograma a sí misma.
- Puedes detener una secuencia con una bandera.
- Implementaste un reloj o contador.

Siguiente: eventos del ratón sobre el Canvas para dibujar interactivamente.
