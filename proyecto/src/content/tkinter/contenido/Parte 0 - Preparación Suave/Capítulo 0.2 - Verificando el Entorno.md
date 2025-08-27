# Capítulo 0.2 Verificando el Entorno

## Objetivo del capítulo

Asegurarte de que tu computadora está lista para ejecutar programas con Tkinter. Practicarás abrir la terminal, comprobar la versión de Python y hacer una prueba mínima para confirmar que Tkinter está disponible.

---

## 0.2.1 Comprobar Versión de Python

Necesitas saber que Python está instalado y accesible.

### En Windows (PowerShell)

Abre el menú Inicio y escribe "PowerShell" y ábrelo. Luego escribe uno de estos comandos:

```
python --version
```

o si eso falla:

```
py --version
```

Deberías ver algo como:

```
Python 3.11.4
```

Si obtienes un mensaje como "python no se reconoce..." significa que Python no está en el PATH o no está instalado.

### Si no tienes Python

1. Ve a https://www.python.org/downloads/
2. Descarga la versión estable (3.x).
3. Marca la casilla "Add Python to PATH" durante la instalación (muy importante).
4. Repite la verificación.

---

## 0.2.2 Probar import tkinter

Ahora abre una consola interactiva para probar el módulo.
Escribe:

```
python
```

(puede que el comando sea `py` en tu sistema). Verás un prompt similar a:

```
>>>
```

En ese prompt escribe:

```python
import tkinter
```

Si vuelve a la línea `>>>` sin mostrar errores, Tkinter está disponible.

### Ver prueba visual mínima

En la misma sesión interactiva escribe:

```python
import tkinter as tk
ventana = tk.Tk()
ventana.title("Prueba")
ventana.mainloop()
```

Se abrirá una ventana pequeña. Ciérrala con el botón de cerrar. Volverás a la consola.

Para salir del intérprete interactivo escribe:

```python
exit()
```

o presiona Ctrl+Z y Enter (en Windows).

---

## 0.2.3 ¿Qué hacer si aparece un error?

Errores comunes:

1. `ModuleNotFoundError: No module named 'tkinter'`:

   - En Windows algunas instalaciones mínimas pueden omitir componentes gráficos. Solución: reinstalar Python desde python.org usando el instalador oficial.
   - Asegúrate de NO haber llamado a tu archivo `tkinter.py` (causa conflicto). Si lo hiciste, renómbralo y borra el archivo `tkinter.pyc` si existe.

2. Error de versión antigua:

   - Mientras sea Python 3.x debería funcionar. Si es 2.x (muy raro hoy), instala Python 3.

3. No abre la ventana y el programa termina rápido:
   - Probablemente olvidaste `mainloop()` (lo veremos formalmente en el próximo capítulo).

---

## 0.2.4 Script vs Intérprete Interactivo

Dos formas de trabajar:

1. Intérprete interactivo (REPL): escribes una línea, se ejecuta al instante. Útil para pruebas muy pequeñas.
2. Script (archivo `.py`): escribes varias líneas, guardas y luego lo ejecutas de una vez. Mejor para programas que crecen.

Ejemplo mental:

- El intérprete es como una calculadora en la que pruebas números ahora mismo.
- El script es como escribir una receta completa y luego cocinarla.

En este libro, la mayoría del tiempo usaremos scripts, porque construirás programas que evolucionan.

---

## Mini‑Resumen del Capítulo

- Comprobaste la versión de Python.
- Verificaste que `import tkinter` funciona.
- Aprendiste a abrir y cerrar una ventana mínima.
- Diferencias entre intérprete interactivo y script.

---

## Micro‑Práctica

1. Abre el intérprete y escribe una ventana con `title("Mi Primera Ventana")`.
2. Cierra la ventana.
3. Sal del intérprete.
4. Escribe (en papel o archivo) qué harías si te apareciera `ModuleNotFoundError`.

Con esto listo, en el siguiente capítulo crearás tu PRIMER SCRIPT completo (archivo .py) con la estructura mínima.
