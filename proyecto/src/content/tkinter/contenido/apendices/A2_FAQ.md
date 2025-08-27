# Apéndice A.2 FAQ Principiantes

## Objetivo

Responder preguntas frecuentes que surgen al iniciar con Tkinter, para reducir bloqueos y frustración.

---

### 1. ¿Por qué mi ventana se cierra inmediatamente?

Probablemente olvidaste `ventana.mainloop()`. Sin el bucle, la app finaliza al instante.

### 2. ¿Puedo tener más de un `Tk()`?

No se recomienda. Usa un único `Tk()` y ventanas secundarias con `Toplevel`.

### 3. ¿Por qué mi imagen no se muestra?

Si usas `PhotoImage` y la asignas a un Label pero luego la variable sale de alcance (por ejemplo variable local), se recolecta. Mantén referencia (`label.img = imagen`).

### 4. ¿Es necesario usar clases siempre?

No al principio. Introduce clases cuando haya suficiente complejidad (muchos widgets y funciones relacionadas). Antes, funciones y estructura clara bastan.

### 5. ¿Por qué el botón ejecuta la acción al iniciar?

Probablemente escribiste `command=mi_funcion()` en lugar de `command=mi_funcion`.

### 6. ¿Cómo evito que la interfaz se congele?

No uses `while True` ni `time.sleep()` dentro de callbacks. Usa `after()` para tareas repetidas.

### 7. ¿Cómo limpio todo el texto de un Text?

`text_area.delete("1.0", tk.END)`.

### 8. ¿Cómo obtengo sólo el texto escrito sin saltos extra?

Haz `contenido = text_area.get("1.0", tk.END).rstrip("\n")`.

### 9. ¿Puedo cambiar el tamaño de la ventana luego?

Sí, usa `ventana.geometry("800x600")` o deja que el usuario redimensione (por defecto habilitado) o `ventana.resizable(False, False)` para fijarla.

### 10. ¿Cómo muestro un mensaje de error al usuario?

`from tkinter import messagebox` y luego `messagebox.showerror("Título", "Mensaje")`.

### 11. ¿Dónde coloco lógica que no es de interfaz?

Idealmente en funciones separadas o módulos aparte. La interfaz sólo llama esas funciones.

### 12. ¿Qué diferencia hay entre pack y grid?

`pack` coloca por bloques (arriba/abajo/izquierda/derecha). `grid` usa filas y columnas. No los mezcles en el mismo Frame.

### 13. ¿Cómo creo un menú de opciones?

Crea un `Menu`, configúralo en la raíz (`root.config(menu=menu_bar)`) y añade cascadas con `add_cascade` y comandos con `add_command`.

### 14. ¿Se puede hacer tema oscuro fácilmente?

Con parámetros básicos (`bg`, `fg`) de algunos widgets sí, pero para consistencia mayor conviene explorar `ttk` y estilos, fuera del alcance inicial.

### 15. ¿Es Tkinter suficiente para apps complejas?

Para muchas utilidades simples y medianas, sí. Para diseños altamente modernos o exigentes quizá necesites otros toolkits (Qt, etc.). Empieza con fundamento sólido aquí.

---

## Micro‑Práctica

Escribe dos preguntas propias que no estén en la lista y responde investigando brevemente la documentación oficial.

---

## Mini‑Resumen

FAQ listo para solventar dudas típicas sin detener tu aprendizaje. Consúltalo antes de frustrarte.
