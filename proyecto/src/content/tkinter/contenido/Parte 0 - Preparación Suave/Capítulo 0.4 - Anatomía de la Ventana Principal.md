# Capítulo 0.4 Anatomía Básica de la Ventana Principal

## Objetivo del capítulo

Explorar con más detalle el objeto raíz (la ventana principal), cómo darle un título, ajustar un tamaño inicial simple y cerrarla correctamente. Todo esto te prepara para añadir tus primeros widgets en la siguiente parte.

---

## 0.4.1 Objeto Raíz (`Tk()`)

Cuando escribes:

```python
import tkinter as tk
ventana = tk.Tk()
```

Creas la VENTANA PRINCIPAL de tu aplicación. Este objeto:

- Es el contenedor "padre" donde irán los widgets que agregues.
- Solo debe existir uno en tu programa.
- Gestiona el bucle de eventos cuando llamas a `ventana.mainloop()`.

Puedes pensarlo como la base sobre la que construirás tu interfaz.

### Propiedades iniciales implícitas

Cuando se crea, tiene un tamaño por defecto que el sistema decide y un título genérico (a veces vacío o "tk").

---

## 0.4.2 Título de la Ventana (`title()`)

Cambiar el título es sencillo:

```python
ventana.title("Mi App Inicial")
```

Esto afecta la barra superior de la ventana (donde también están los botones de minimizar, maximizar y cerrar).

El título ayuda al usuario a identificar la ventana si tiene más programas abiertos.

---

## 0.4.3 Tamaño Inicial Sencillo (`geometry`)

Puedes sugerir un tamaño inicial escribiendo (antes del `mainloop()`):

```python
ventana.geometry("300x200")  # ancho x alto en píxeles
```

Esto no bloquea que el usuario redimensione (a menos que lo prohíbas, no lo haremos ahora). Es solo una indicación inicial.

### Nota Importante

No necesitas obsesionarte con el tamaño perfecto ahora. Más adelante el layout (disposición de widgets) hará que la ventana se ajuste mejor.

---

## 0.4.4 Evitar Sobresaturación Temprana

Existen muchas otras configuraciones posibles (íconos personalizados, posición exacta en pantalla, tamaño mínimo, etc.) pero NO las veremos todavía para mantener el enfoque. Aún no necesitamos:

- Centrar pixel a pixel la ventana.
- Cambiar el ícono.
- Hacer la ventana no redimensionable.

Todo eso puede esperar. Primero: entender y colocar widgets.

---

## 0.4.5 Cerrar Correctamente: Botón Cerrar vs `destroy()`

Normalmente el usuario cierra la ventana usando la X de la esquina. Eso envía un evento que termina el bucle.

En código, si quisieras cerrar la ventana de manera controlada (por ejemplo, después de cierta acción) podrías usar:

```python
ventana.destroy()
```

Esto destruye la ventana y finaliza la aplicación.

### ¿Cuándo usar `destroy()`?

- Cuando tengas un botón "Salir".
- Cuando valides algo y decidas terminar.

### Diferencia con `quit()`

`quit()` sale del bucle de eventos pero no destruye necesariamente todos los widgets. Para aplicaciones simples, `destroy()` asegura que todo termine limpio.

---

## Ejemplo Completo de Este Capítulo

```python
import tkinter as tk

ventana = tk.Tk()            # Crear ventana principal
ventana.title("Ventana Básica")
ventana.geometry("320x180")  # Tamaño inicial sugerido

# Más adelante aquí agregaremos widgets

ventana.mainloop()           # Mantener la ventana viva
```

Prueba a cambiar los números en `geometry` y observa el resultado.

---

## Mini‑Resumen del Capítulo

- `Tk()` crea la ventana principal (objeto raíz).
- `title()` establece el texto de la barra superior.
- `geometry("ancho x alto")` da un tamaño inicial, no definitivo.
- `destroy()` cierra la ventana desde código.
- Aún evitamos configuraciones avanzadas para no distraernos.

---

## Micro‑Práctica

1. Crea un archivo `ventana_personalizada.py`.
2. Establece un título que te motive ("Aprendiendo Tkinter").
3. Cambia el tamaño inicial a 400x250.
4. Añade un comentario explicando por qué no es crítico el tamaño exacto ahora.
5. Ejecuta el script y cierra la ventana.

Si llegaste hasta aquí, completaste la preparación. En la siguiente parte empezarás a colocar los primeros widgets visibles.
