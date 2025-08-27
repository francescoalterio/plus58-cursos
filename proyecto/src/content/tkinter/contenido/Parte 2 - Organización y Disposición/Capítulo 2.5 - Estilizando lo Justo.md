# Capítulo 2.5 Estilizando lo Justo

## Objetivo del capítulo

Aplicar estilos básicos a widgets sin abrumarte: colores de fondo y texto (`bg`, `fg`), fuentes (`font`), bordes simples (`relief`, `bd`). Aprenderás buenas prácticas para mantener legibilidad sin exagerar.

---

## 2.5.1 Colores de Fondo y Primer Plano (`bg`, `fg`)

Muchos widgets aceptan:

- `bg` (background): color de fondo.
- `fg` (foreground): color del texto.

Ejemplo:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Colores básicos")

label = tk.Label(ventana, text="Texto claro", bg="navy", fg="white")
label.pack(padx=10, pady=10)

ventana.mainloop()
```

Colores comunes aceptan nombres en inglés (`red`, `green`, `yellow`, `lightgray`, etc.). También podrías usar códigos hexadecimales (`#RRGGBB`) pero no es necesario ahora.

### Consejo

Mantén contraste alto (fondo oscuro + texto claro o viceversa) para facilitar lectura.

---

## 2.5.2 Fuentes Básicas (`font`)

Puedes definir fuente y tamaño:

```python
label = tk.Label(ventana, text="Título", font=("Arial", 16))
```

Formato típico de la tupla:
`(NombreFuente, Tamaño, OpcionalEstilo)`

Ejemplo con estilo opcional (negrita):

```python
label = tk.Label(ventana, text="Importante", font=("Arial", 12, "bold"))
```

Otros estilos posibles: `italic`, `underline` (pueden variar según la plataforma).

---

## 2.5.3 Bordes Leves (`relief`, `bd`)

Algunos widgets pueden mostrarse con borde distinto:

- `relief`: estilo del borde. Valores comunes: `flat`, `raised`, `sunken`, `groove`, `ridge`.
- `bd`: (borderwidth) grosor del borde en píxeles.

Ejemplo:

```python
caja = tk.Label(ventana, text="Caja", relief="ridge", bd=3, padx=10, pady=5)
```

Esto crea un efecto de recuadro.

---

## Micro‑Práctica: Diferenciar Secciones por Color Suave

Objetivo: Dos Frames con colores suaves para separar visualmente áreas.

Código sugerido:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Estilos básicos")

frame_superior = tk.Frame(ventana, bg="#e0f7fa", padx=10, pady=10)
frame_superior.pack(fill="x")

label_titulo = tk.Label(frame_superior, text="Sección Superior", bg="#e0f7fa", font=("Arial", 14, "bold"))
label_titulo.pack(anchor="w")

frame_inferior = tk.Frame(ventana, bg="#f1f8e9", padx=10, pady=10)
frame_inferior.pack(fill="both", expand=True)

label_info = tk.Label(frame_inferior, text="Contenido principal...", bg="#f1f8e9")
label_info.pack(anchor="w")

ventana.mainloop()
```

Explicación:

- Se usan colores suaves (tonos claros) para no fatigar la vista.
- `anchor="w"` alinea el texto a la izquierda dentro del espacio del pack.
- `expand=True` permite que la sección inferior crezca si la ventana se redimensiona.

---

## Buenas Prácticas Iniciales de Estilo

- Prioriza legibilidad sobre decoración.
- Usa pocos colores consistentes (máximo 2–3 tonos base al inicio).
- Evita tamaños de fuente demasiado pequeños (<10) o muy grandes sin razón (>20).
- No relies sólo en color para distinguir (puedes usar bordes suaves y espacio también).

---

## Errores Comunes

- Poner fondo oscuro y texto oscuro (baja legibilidad).
- Exceso de estilos diferentes (parece desordenado).
- Olvidar repetir el color de fondo del Frame en los Labels dentro (para que se integren visualmente).

---

## Mini‑Resumen del Capítulo

- `bg` y `fg` controlan fondo y color de texto.
- `font` define fuente y tamaño (y estilo opcional).
- `relief` y `bd` añaden profundidad sutil.
- Diferencias visuales suaves mejoran comprensión sin abrumar.

Con esto concluye la parte de organización y disposición básica. Próximamente aprenderás a manejar estados, diálogos y eventos para enriquecer la interacción.
