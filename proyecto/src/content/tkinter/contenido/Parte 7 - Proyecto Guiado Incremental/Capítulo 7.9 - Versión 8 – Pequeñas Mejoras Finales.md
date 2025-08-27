# Capítulo 7.9 Versión 8 – Pequeñas Mejoras Finales

## Objetivo del capítulo

Añadir detalles que pulen la UX: reloj simple en la barra de estado y un atajo de teclado básico (Ctrl+C para copiar selección usando método del Text).

---

## 7.9.1 Usar after para Reloj en Barra de Estado

Patrón: función que actualiza y se reprograma.

```python
import time

def iniciar_reloj(self):
    def tick():
        hora = time.strftime("%H:%M:%S")
        # Mostramos hora junto con mensaje breve o sólo la hora
        texto_actual = self.barra_estado.cget("text")
        if "Conteo" in texto_actual or "Texto" in texto_actual:
            # No sobreescribir inmediatamente mensajes importantes (opcional)
            pass
        self.barra_estado.config(text=f"Hora: {hora}")
        self.root.after(1000, tick)
    tick()
```

Llamar `self.iniciar_reloj()` al final de `__init__`.

---

## 7.9.2 Atajo de Teclado (Ctrl+C para Copiar)

Bind al widget Text o a la raíz:

```python
self.text_area.bind("<Control-c>", self._copiar)
```

Implementación simple:

```python
def _copiar(self, evento=None):
    try:
        seleccion = self.text_area.get("sel.first", "sel.last")
    except tk.TclError:
        return  # No hay selección
    self.root.clipboard_clear()
    self.root.clipboard_append(seleccion)
    self.barra_estado.config(text="Copiado al portapapeles")
```

---

## Código Integrado (Fragmentos Nuevos)

```python
class BlocNotasApp:
    def __init__(self, root):
        # ... código previo ...
        self.iniciar_reloj()
        self.text_area.bind("<Control-c>", self._copiar)

    def iniciar_reloj(self):
        import time
        def tick():
            hora = time.strftime("%H:%M:%S")
            self.barra_estado.config(text=f"Hora: {hora}")
            self.root.after(1000, tick)
        tick()

    def _copiar(self, evento=None):
        try:
            seleccion = self.text_area.get("sel.first", "sel.last")
        except tk.TclError:
            return
        self.root.clipboard_clear()
        self.root.clipboard_append(seleccion)
        self.barra_estado.config(text="Copiado")
        self.root.after(1500, lambda: self.barra_estado.config(text="Listo"))
```

---

## Micro‑Práctica

1. Añade también atajo Ctrl+L que llame a `limpiar`.
2. Haz que después de copiar, la barra muestre hora nuevamente tras 2 segundos.

---

## Errores Comunes

- Sobrescribir mensajes útiles del usuario con el reloj inmediatamente.
- Intentar copiar sin selección (lanza `tk.TclError`).
- Olvidar devolver `None` en el handler (no crítico aquí, pero buena práctica no retornar cosas extrañas).

---

## Mini‑Resumen

Implementaste reloj vivo y atajos de teclado simples, mejorando usabilidad. Siguiente: revisión final del proyecto y posibles extensiones.
