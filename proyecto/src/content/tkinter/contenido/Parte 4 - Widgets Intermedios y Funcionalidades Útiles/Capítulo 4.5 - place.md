# Capítulo 4.5 place (Sólo para Entender, Usarlo Poco)

## Objetivo del capítulo

Conocer el gestor de geometría `place`, entender cómo posiciona widgets con coordenadas absolutas o relativas y por qué generalmente se recomienda evitarlo para interfaces flexibles.

---

## 4.5.1 Por Qué Generalmente Evitarlo

`place` posiciona widgets en coordenadas fijas (x, y) o porcentajes. Problemas:

- Si el usuario cambia el tamaño de la ventana, la posición puede quedar rara.
- Difícil de mantener cuando agregas/quitas widgets.
- No se adapta automáticamente a diferentes sistemas o fuentes.

Úsalo sólo para casos muy controlados o prototipos rápidos que no cambian.

---

## 4.5.2 Ejemplo Mínimo para Situar Dos Botones

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("place básico")
ventana.geometry("300x150")

btn1 = tk.Button(ventana, text="A")
btn1.place(x=20, y=30)

btn2 = tk.Button(ventana, text="B")
btn2.place(x=120, y=80)

ventana.mainloop()
```

Si cambias el tamaño de la ventana, los botones no se recolocan.

### Uso Relativo

También puedes usar porcentajes:

```python
btn3 = tk.Button(ventana, text="Centro")
btn3.place(relx=0.5, rely=0.5, anchor="center")
```

- `relx` y `rely` van de 0.0 a 1.0 (proporción del ancho/alto del contenedor).
- `anchor` indica qué punto del widget se coloca en esa coordenada (center, n, s, e, w, etc.).

---

## 4.5.3 Micro‑Práctica: Mini Panel Fijo (Educativo)

Tareas:

1. Crea una ventana de 400x200.
2. Coloca tres botones en posiciones fijas (esquina superior izquierda, centro, esquina inferior derecha usando coordenadas relativas para el centro y la esquina inferior derecha).
3. Redimensiona la ventana y observa el efecto.

Ejemplo de esquina inferior derecha relativa:

```python
btn = tk.Button(ventana, text="Inferior derecha")
btn.place(relx=1.0, rely=1.0, anchor="se")
```

---

## Errores Comunes

- Depender de `place` para toda la interfaz y luego luchar con adaptabilidad.
- No usar `anchor` y ver que el widget queda desalineado respecto al punto esperado.
- Mezclar `place` con otros gestores en el mismo contenedor (igual restricción que con pack/grid).

---

## Mini‑Resumen del Capítulo

- `place` posiciona por coordenadas absolutas o relativas.
- No se adapta bien a redimensionamientos y cambios de contenido.
- Útil solo para casos muy específicos (ej. overlays simples, paneles fijos).
- Comprendiste por qué preferimos `pack` y `grid`.

Siguiente: organización de código cuando la interfaz crece (separar creación y lógica).
