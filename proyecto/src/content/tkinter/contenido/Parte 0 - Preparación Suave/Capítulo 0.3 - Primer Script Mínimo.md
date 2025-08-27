# Capítulo 0.3 Primer Script Mínimo

## Objetivo del capítulo

Escribirás tu primer archivo `.py` que crea una ventana vacía usando Tkinter. Entenderás el papel del bucle principal (`mainloop()`) y verás un ejemplo de qué ocurre si lo omites. También revisaremos problemas muy frecuentes al empezar.

---

## 0.3.1 Estructura Mínima

Abre tu editor y crea un archivo llamado, por ejemplo, `primer_gui.py` (IMPORTANTE: no lo llames `tkinter.py`). Escribe este contenido exactamente:

```python
import tkinter as tk  # Importamos la biblioteca y le damos el alias 'tk'

ventana = tk.Tk()     # Creamos la ventana principal (objeto raíz)
ventana.title("Mi Primera Ventana")  # Ponemos un título en la barra superior

ventana.mainloop()    # Iniciamos el bucle de eventos: la ventana "vive" aquí
```

Guarda el archivo.

### Explicación línea a línea:

1. `import tkinter as tk`: Carga Tkinter y nos permite escribir `tk.Algo` en lugar de `tkinter.Algo`.
2. `tk.Tk()`: Crea la ventana principal. Solo debes tener UNA instancia de `Tk()` en tu programa.
3. `title(...)`: Cambia el texto que aparece en la barra de la ventana.
4. `mainloop()`: Inicia el bucle que mantiene la ventana abierta y escucha eventos (clics, teclado, redimensionar, etc.). Sin esto la ventana aparecería y se cerraría enseguida.

---

## 0.3.2 Ejecutar el Script y Cerrar la Ventana

En PowerShell, navega hasta la carpeta donde guardaste el archivo. Si está en `C:\Users\TU_USUARIO\...` navega usando `cd`.
Ejecuta:

```
python primer_gui.py
```

(Si `python` no funciona, intenta `py primer_gui.py`).

Deberías ver una ventana. Ciérrala con el botón de cerrar (la X). El programa termina y vuelves al prompt de la terminal.

---

## 0.3.3 ¿Qué es el Bucle Principal?

Metáfora: Imagina un recepcionista en un hotel. Está ahí para recibir eventos: gente que entra, llamadas de teléfono, preguntas. Mientras sigue ahí, el hotel funciona. Cuando se va, se cierra la recepción.

`mainloop()` es ese recepcionista: se queda revisando constantemente si:

- Se hizo clic en un botón.
- Se quiere cerrar la ventana.
- Se redimensionó la ventana.

Mientras `mainloop()` corre, tu script parece “pausado”. En realidad está activo escuchando.

---

## 0.3.4 Experimento: ¿Qué pasa si quito mainloop()?

Borra la línea `ventana.mainloop()` y ejecuta el script otra vez:

```
python primer_gui.py
```

Probablemente veas que la ventana apenas aparece (o ni la llegas a notar) y el programa termina. Eso es porque creaste la ventana, pero nunca le diste oportunidad de procesar eventos.

Esto confirma: `mainloop()` es esencial.

---

## 0.3.5 Problemas Comunes

1. Nombrar el archivo `tkinter.py`:

   - Causa que Python intente importar TU archivo en lugar de la biblioteca real.
   - Síntoma: errores extraños o que no encuentra `Tk`.
   - Solución: renombra el archivo y borra `tkinter.pyc` si existe.

2. Varias llamadas a `Tk()`:

   - Solo una ventana raíz principal. Si necesitas más ventanas, usarás `Toplevel()` (lo verás después).

3. Ventana congelada al hacer cálculo pesado:

   - Se verá luego, pero adelanto: no hagas bucles eternos antes de `mainloop()`.

4. Escribir `Tkinter` con mayúscula inicial:
   - En Python 3 es `tkinter` todo en minúsculas.

---

## Mini‑Resumen del Capítulo

- Aprendiste la estructura mínima de un programa con Tkinter.
- Entendiste el papel crítico de `mainloop()`.
- Verificaste qué ocurre si lo omites.
- Conoces errores típicos del inicio.

---

## Micro‑Práctica

1. Crea otro archivo llamado `segunda_ventana.py` y cambia el título a algo diferente.
2. Añade un comentario arriba explicando con tus palabras qué hace `mainloop()`.
3. Ejecuta ambos scripts por separado.
4. Escribe (afuera del código) qué sucedió cuando quitaste `mainloop()`.

Cuando te sientas cómodo con esto, pasarás a entender mejor qué componentes tiene esa ventana que creaste. Eso es el próximo capítulo.
