# Capítulo 7.8 Versión 7 – Refactor con Clase

## Objetivo del capítulo

Encapsular la lógica de la aplicación en una clase para mejorar organización y facilitar futuras extensiones.

---

## 7.8.1 Encapsular en Clase `BlocNotasApp`

Patrón base:

```python
class BlocNotasApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Mini Bloc de Notas")
        self._crear_widgets()
        self._crear_menu()

    def _crear_widgets(self):
        # Crear frame texto + scrollbar
        frame_texto = tk.Frame(self.root)
        frame_texto.pack(padx=10, pady=10, fill="both", expand=True)

        self.scroll = tk.Scrollbar(frame_texto)
        self.scroll.pack(side="right", fill="y")

        self.text_area = tk.Text(frame_texto, width=60, height=15, yscrollcommand=self.scroll.set, wrap="word")
        self.text_area.pack(side="left", fill="both", expand=True)
        self.scroll.config(command=self.text_area.yview)

        boton_frame = tk.Frame(self.root)
        boton_frame.pack(pady=5)

        self.btn_limpiar = tk.Button(boton_frame, text="Limpiar", command=self.limpiar)
        self.btn_limpiar.pack(side="left", padx=5)
        self.btn_contar = tk.Button(boton_frame, text="Contar", command=self.contar)
        self.btn_contar.pack(side="left", padx=5)

        self.etiqueta_resultado = tk.Label(self.root, text="Caracteres: 0", anchor="w")
        self.etiqueta_resultado.pack(fill="x", padx=10, pady=(0,10))

        self.barra_estado = tk.Label(self.root, text="Listo", anchor="w", relief="sunken", bd=1)
        self.barra_estado.pack(fill="x", side="bottom")

    def _crear_menu(self):
        menu_bar = tk.Menu(self.root)
        self.root.config(menu=menu_bar)

        menu_archivo = tk.Menu(menu_bar, tearoff=0)
        menu_archivo.add_command(label="Limpiar", command=self.limpiar)
        menu_archivo.add_separator()
        menu_archivo.add_command(label="Salir", command=self.root.destroy)
        menu_bar.add_cascade(label="Archivo", menu=menu_archivo)

        menu_ayuda = tk.Menu(menu_bar, tearoff=0)
        menu_ayuda.add_command(label="Acerca de", command=self.mostrar_acerca_de)
        menu_bar.add_cascade(label="Ayuda", menu=menu_ayuda)

    def limpiar(self):
        contenido_actual = self.text_area.get("1.0", tk.END)
        if not contenido_actual.strip():
            return
        from tkinter import messagebox
        if messagebox.askyesno("Confirmar", "¿Seguro que deseas limpiar el texto?"):
            self.text_area.delete("1.0", tk.END)
            self.etiqueta_resultado.config(text="Caracteres: 0")
            self.barra_estado.config(text="Texto limpiado")

    def contar(self):
        contenido = self.text_area.get("1.0", tk.END)
        longitud = len(contenido.rstrip("\n"))
        self.etiqueta_resultado.config(text=f"Caracteres: {longitud}")
        self.barra_estado.config(text="Conteo realizado")

    def mostrar_acerca_de(self):
        if hasattr(self, "about_window") and self.about_window.winfo_exists():
            self.about_window.lift()
            return
        self.about_window = tk.Toplevel(self.root)
        self.about_window.title("Acerca de")
        self.about_window.resizable(False, False)
        tk.Label(self.about_window, text="Mini Bloc de Notas\nVersión de práctica", pady=10).pack(padx=15)
        tk.Button(self.about_window, text="Cerrar", command=self.cerrar_about).pack(pady=10)
        self.about_window.protocol("WM_DELETE_WINDOW", self.cerrar_about)
        self.about_window.update_idletasks()
        ancho = self.about_window.winfo_width()
        alto = self.about_window.winfo_height()
        x = self.root.winfo_rootx() + (self.root.winfo_width() // 2) - (ancho // 2)
        y = self.root.winfo_rooty() + (self.root.winfo_height() // 2) - (alto // 2)
        self.about_window.geometry(f"+{x}+{y}")
        self.barra_estado.config(text="Mostrando Acerca de")
        self.root.after(2000, lambda: self.barra_estado.config(text="Listo"))

    def cerrar_about(self):
        if hasattr(self, "about_window") and self.about_window.winfo_exists():
            self.about_window.destroy()

```

Para ejecutar:

```python
if __name__ == "__main__":
    root = tk.Tk()
    app = BlocNotasApp(root)
    root.mainloop()
```

---

## 7.8.2 Métodos para Acciones

Acciones antes eran funciones libres; ahora son métodos (`limpiar`, `contar`). Esto agrupa estado y comportamiento.

---

## Micro‑Práctica

1. Añade un método `contar_lineas` que actualice la barra de estado mostrando `Líneas: X`.
2. Añade opción de menú que llame a `contar_lineas`.

---

## Errores Comunes

- Olvidar `self` en parámetros de métodos.
- Referir widgets como variables globales en vez de atributos (`self.text_area`).
- Duplicar creación de menú dentro de `_crear_widgets`.

---

## Mini‑Resumen

Refactorizaste a una clase centralizando lógica y estado. Próximo: mejoras finales (reloj y atajos simples).
