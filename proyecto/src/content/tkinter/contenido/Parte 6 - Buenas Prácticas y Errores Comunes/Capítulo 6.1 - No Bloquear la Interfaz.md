# Capítulo 6.1 No Bloquear la Interfaz

## Objetivo del capítulo

Comprender qué significa que una interfaz se “bloquee”, por qué ocurre cuando usas operaciones largas o `time.sleep()`, y cómo evitarlo usando `after()`. Convertirás un ejemplo bloqueante en uno fluido.

---

## 6.1.1 Qué es Bloquear

Una GUI está “bloqueada” cuando:

- No responde a clics.
- No repinta la ventana si la mueves o redimensionas.
- Aparece el mensaje “(No responde)” en algunos sistemas.

Esto sucede si el hilo principal (donde corre el bucle de eventos) está ocupado haciendo un trabajo largo sin devolver el control.

Ejemplo bloqueante:

```python
import tkinter as tk
import time

ventana = tk.Tk()
ventana.title("Bloqueo")

label = tk.Label(ventana, text="Iniciando...")
label.pack(padx=10, pady=10)

# Bloquea 5 segundos
for i in range(5):
    time.sleep(1)  # Congela la interfaz
    label.config(text=f"Segundos: {i+1}")

ventana.mainloop()  # Ni siquiera se muestra bien hasta terminar el loop
```

La ventana puede tardar en aparecer correctamente.

---

## 6.1.2 Alternativa: usar `after()`

Reescritura no bloqueante:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("No bloqueante")

label = tk.Label(ventana, text="Iniciando...")
label.pack(padx=10, pady=10)

segundos = 0

def actualizar():
    global segundos
    segundos += 1
    label.config(text=f"Segundos: {segundos}")
    if segundos < 5:
        ventana.after(1000, actualizar)

ventana.after(1000, actualizar)
ventana.mainloop()
```

Aquí la interfaz sigue respondiendo.

---

## 6.1.3 Micro‑Práctica: Convertir Loop Bloqueante

Toma una tarea que repite algo 10 veces con `time.sleep(0.5)` y conviértela a versión `after(500, ...)`.

Ejemplo base a convertir:

```python
import tkinter as tk, time
ventana = tk.Tk()
label = tk.Label(ventana, text="...")
label.pack()
for i in range(10):
    time.sleep(0.5)
    label.config(text=str(i))
ventana.mainloop()
```

Objetivo: que la ventana aparezca y el contador avance sin congelarse.

---

## Errores Comunes

- Intentar usar `while True:` para animaciones continuas sin pausas (bloquea todo).
- Reemplazar `sleep` por `after` pero olvidar reprogramar la función.
- Llamar funciones pesadas dentro de callbacks frecuentes (optimizar o dividir).

---

## Mini‑Resumen del Capítulo

- Bloquear = impedir que el bucle procese eventos.
- `time.sleep()` en el hilo principal congela la GUI.
- `after()` programa trabajo sin bloquear.
- Convertiste un ejemplo bloqueante a uno fluido.

Siguiente: organizar código con una clase suave para tu aplicación.
