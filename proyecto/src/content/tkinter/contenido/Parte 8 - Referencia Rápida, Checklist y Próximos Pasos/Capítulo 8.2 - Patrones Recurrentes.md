# Capítulo 8.2 Patrones Recurrentes

## Objetivo del capítulo

Recapitular micro‑patrones usados repetidamente para que puedas reconocerlos y aplicarlos con seguridad.

---

## 8.2.1 Callback + Obtener Valor + Actualizar Label

Patrón típico:

```python
def accion():
    dato = entry.get()
    resultado_label.config(text=f"Valor: {dato}")
```

Puntos clave: acceder a widget, extraer valor, actualizar otro.

---

## 8.2.2 Uso de Variables de Control

Sincronización automática entre widget y variable:

```python
nombre_var = tk.StringVar(value="Inicial")
entry = tk.Entry(root, textvariable=nombre_var)
label = tk.Label(root, textvariable=nombre_var)
```

Actualizar `nombre_var.set("Nuevo")` refleja en ambos.

### Observación Trace (opcional básico)

```python
def al_cambiar(*_):
    print("Nuevo valor:", nombre_var.get())
nombre_var.trace_add("write", al_cambiar)
```

---

## 8.2.3 Configuración Tardía (config())

Primero creas el widget con parámetros mínimos; más tarde ajustas:

```python
mi_boton = tk.Button(root, text="Ok")
# ... más código ...
mi_boton.config(state="disabled")
```

Ventaja: reduce ruido donde se instancia.

---

## Otros Micro‑Patrones Útiles

- Evitar bloqueo: usar `after(intervalo, funcion)` para tareas periódicas.
- Toplevel único: almacenar referencia y comprobar `winfo_exists()`.
- Diccionario de opciones para estilo común.

---

## Micro‑Práctica

Escoge un script previo y:

1. Sustituye concatenación manual de texto por variable de control.
2. Aplica `config()` tardío para deshabilitar un botón tras su uso.

---

## Mini‑Resumen

Reconociste patrones base: callback-transformación-actualización, variables reactivas y configuración diferida. Dominarlos acelera tu trabajo y reduce errores.
