# Capítulo 6.3 Legibilidad y Nombres

## Objetivo del capítulo

Resaltar la importancia de elegir nombres descriptivos para variables, funciones y métodos, así como escribir comentarios breves y útiles. Practicarás mejorar un script con nombres pobres.

---

## 6.3.1 Nombres Descriptivos

Malos ejemplos:

```python
a = tk.Entry(...)
b = tk.Button(...)
```

Buenos ejemplos:

```python
entrada_nombre = tk.Entry(...)
btn_guardar = tk.Button(...)
```

Regla: el nombre debe decirte qué es o qué hace sin leer la implementación.

### Funciones / Métodos

- `procesar_datos()` mejor que `hacer()`.
- `actualizar_contador()` mejor que `cont()`.

Evita abreviaturas excesivas que solo tú entiendas.

---

## 6.3.2 Comentarios Breves y Útiles

Buenos comentarios:

- Explican “por qué” si no es obvio.
- Evitan repetir literalmente lo que el código ya dice.

Ejemplo:

```python
# Evitamos duplicados verificando si la tarea ya existe en la lista
if tarea in tareas:
    return
```

Malo:

```python
# incrementa en 1
contador += 1
```

(Ya se entiende del código.)

---

## 6.3.3 Micro‑Práctica: Revisar y Mejorar Nombres

Código inicial intencionalmente pobre:

```python
import tkinter as tk

r = tk.Tk()
r.title("X")

v = tk.StringVar()

e = tk.Entry(r, textvariable=v)
e.pack()

l = tk.Label(r, text="...")
l.pack()

def f():
    l.config(text=v.get())

b = tk.Button(r, text="OK", command=f)
b.pack()

r.mainloop()
```

Tareas:

1. Renombra `r`, `v`, `e`, `l`, `f`, `b` por nombres claros.
2. Cambia el título de la ventana a algo descriptivo.
3. Añade un comentario útil (por ejemplo, qué hace el botón) antes de la función.

Solución orientativa:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Eco simple")

texto_var = tk.StringVar()

entrada = tk.Entry(ventana, textvariable=texto_var)
entrada.pack()

label_resultado = tk.Label(ventana, text="...")
label_resultado.pack()

# Copia el texto del Entry al Label

def mostrar_texto():
    label_resultado.config(text=texto_var.get())

boton_mostrar = tk.Button(ventana, text="Mostrar", command=mostrar_texto)
boton_mostrar.pack()

ventana.mainloop()
```

---

## Errores Comunes

- Nombrar según apariencia temporal (`boton1`, `boton2`, `boton3`) y luego olvidar su función.
- Comentarios desactualizados (peor que no tener). Actualízalos si cambias la lógica.
- Comentarios excesivos en cada línea (ruido visual).

---

## Mini‑Resumen del Capítulo

- Nombres claros = menos carga mental.
- Comentarios deben agregar contexto, no repetir código.
- Refactorizaste un ejemplo para mejorar legibilidad.

Siguiente: manejo de errores básico en callbacks.
