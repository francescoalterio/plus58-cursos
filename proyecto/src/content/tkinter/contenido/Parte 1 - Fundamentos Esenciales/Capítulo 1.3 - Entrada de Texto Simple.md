# Capítulo 1.3 Entrada de Texto Simple (Entry)

## Objetivo del capítulo

Aprender a usar el widget `Entry` para permitir que el usuario escriba una sola línea de texto, obtener ese texto y mostrarlo o limpiarlo. Construirás una pequeña interfaz que hace eco del texto ingresado.

---

## 1.3.1 Widget Entry – Propósito

`Entry` es una caja de texto de UNA sola línea. Sirve para:

- Nombres, pequeños datos.
- Parámetros simples.
- Cualquier texto corto.

Para texto largo (párrafos) existe `Text`, que verás después.

Crear un Entry:

```python
entrada = tk.Entry(ventana)
entrada.pack()
```

---

## 1.3.2 Insertar Texto Inicial

Puedes inicializarlo con contenido:

```python
entrada.insert(0, "Escribe aquí...")
```

El primer argumento es la posición (0 = inicio). Si no quieres texto inicial, omite esta línea.

---

## 1.3.3 Obtener el Valor cuando se Pulsa un Botón

Para leer lo que el usuario escribió:

```python
texto = entrada.get()
```

Ejemplo completo:

```python
import tkinter as tk

def mostrar():
    valor = entrada.get()
    label_resultado.config(text=f"Ingresaste: {valor}")

ventana = tk.Tk()
ventana.title("Entrada básica")

entrada = tk.Entry(ventana)
entrada.pack()

boton = tk.Button(ventana, text="Mostrar", command=mostrar)
boton.pack()

label_resultado = tk.Label(ventana, text="Ingresaste: ")
label_resultado.pack()

ventana.mainloop()
```

---

## 1.3.4 Limpiar el Campo

Para borrar completamente el contenido:

```python
entrada.delete(0, tk.END)
```

- `0` es la posición inicial.
- `tk.END` es una constante que representa el final del contenido.

Puedes combinarlo dentro de la callback:

```python
def procesar():
    valor = entrada.get()
    label.config(text=valor)
    entrada.delete(0, tk.END)
```

---

## 1.3.5 Micro‑Práctica: Eco de Texto

Objetivo: Cuando se pulsa un botón, el Label muestra exactamente lo que estaba en el Entry y luego el Entry se limpia.

Código sugerido:

```python
import tkinter as tk

def eco():
    texto = entrada.get()
    label.config(text=f"Eco: {texto}")
    entrada.delete(0, tk.END)

ventana = tk.Tk()
ventana.title("Eco de texto")

entrada = tk.Entry(ventana)
entrada.pack()

boton = tk.Button(ventana, text="Eco", command=eco)
boton.pack()

label = tk.Label(ventana, text="Eco: ")
label.pack()

ventana.mainloop()
```

Prueba:

1. Escribe algo.
2. Pulsa "Eco".
3. Observa cómo se actualiza el Label y el Entry queda vacío.

---

## Errores y Detalles Comunes

- Usar índices incorrectos al borrar: recuerda `delete(0, tk.END)`.
- Intentar mostrar directamente el widget (te mostrará algo como `.!entry`) en lugar de usar `get()`.
- Olvidar empaquetar el Entry y preguntarse por qué no se ve.

---

## Mini‑Resumen del Capítulo

- `Entry` permite entrada de una sola línea.
- `insert` agrega texto inicial.
- `get` recupera el valor actual.
- `delete(0, tk.END)` limpia el campo.
- Construiste una interfaz de eco sencillo.

En el próximo capítulo aprenderás a agrupar widgets usando `Frame` para organizar mejor la interfaz.
