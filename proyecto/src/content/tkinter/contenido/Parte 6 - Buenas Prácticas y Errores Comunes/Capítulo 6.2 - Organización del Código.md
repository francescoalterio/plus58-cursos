# Capítulo 6.2 Organización del Código (Nivel Suave con Clases)

## Objetivo del capítulo

Introducir una forma simple de estructurar la aplicación usando una clase para agrupar creación de widgets y callbacks. Refactorizarás un ejemplo previo en un patrón básico.

---

## 6.2.1 Cuándo Introducir una Clase

Si tu script crece y tienes:

- Muchas variables globales.
- Funciones que manipulan las mismas referencias.
- Necesidad de reutilizar o extender.

Una clase ayuda a agrupar estado (atributos) y comportamiento (métodos).

No necesitas adelantarte demasiado: una clase sencilla con `__init__` ya marca diferencia.

---

## 6.2.2 Patrón Simple: Clase con `__init__` que Crea Widgets

Ejemplo refactorizado del contador usando clase:

```python
import tkinter as tk

class ContadorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Contador con Clase")
        self.valor = 0  # estado

        self.label = tk.Label(root, text="Valor: 0", font=("Arial", 14))
        self.label.pack(padx=10, pady=10)

        self.btn = tk.Button(root, text="Incrementar", command=self.incrementar)
        self.btn.pack(pady=5)

    def incrementar(self):  # método callback
        self.valor += 1
        self.label.config(text=f"Valor: {self.valor}")

if __name__ == "__main__":
    root = tk.Tk()
    app = ContadorApp(root)
    root.mainloop()
```

Ventajas:

- Estado (`valor`) dentro del objeto, no variable global.
- Widgets como atributos (`self.label`).
- Lógica organizada en métodos.

---

## 6.2.3 Micro‑Práctica: Reescribir Ejemplo con Clase

Tareas:

1. Escoge un script previo (lista de tareas, formulario, etc.).
2. Crea una clase `MiApp` con `__init__` que construya todos los widgets.
3. Convierte las funciones en métodos (agrega `self`).
4. Reemplaza variables globales por atributos (`self.lista`, `self.entrada`).

Pista para adaptar una función:

```python
def agregar(self):
    tarea = self.entrada.get().strip()
    if tarea:
        self.lista.insert(tk.END, tarea)
        self.entrada.delete(0, tk.END)
```

---

## Errores Comunes

- Olvidar `self` como primer parámetro de métodos (causa error de argumentos).
- Referirse a widgets sin `self.` dentro de métodos (NameError).
- Crear otra instancia `Tk()` dentro de la clase (pasa `root` desde afuera; sólo uno principal).

---

## Mini‑Resumen del Capítulo

- Una clase agrupa estado y lógica, reduciendo globales.
- `__init__` construye la interfaz inicial.
- Métodos sirven como callbacks (`command=self.algo`).
- Refactorizaste un ejemplo previo para mayor orden.

Siguiente: legibilidad y nombres claros.
