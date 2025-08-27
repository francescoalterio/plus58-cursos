# Capítulo 8.4 Errores Típicos Finales y Soluciones Rápidas

## Objetivo del capítulo

Concentrar errores frecuentes al terminar la etapa básica de aprendizaje y sus correcciones resumidas.

---

## 8.4.1 Ventana que No Responde (Bloqueo)

Causa: usar `while True` o `time.sleep()` en el hilo principal.
Solución: reemplazar por función que se reprograme con `after()`.

## 8.4.2 Imagen que No Aparece

Causa: `PhotoImage` sin referencia (variable local descartada).
Solución: almacenar en atributo/variable persistente (`label.imagen = img`).

## 8.4.3 Mezcla de pack y grid en el Mismo Contenedor

Causa: usar `pack()` y `grid()` sobre hijos del mismo frame.
Solución: separar en subframes; un manager por contenedor.

## 8.4.4 Botón que Ejecuta la Acción al Cargar

Causa: `command=mi_funcion()` en lugar de `command=mi_funcion`.
Solución: pasar referencia sin paréntesis.

## 8.4.5 Texto que Cuenta Caracter Extra

Causa: `Text.get("1.0", tk.END)` incluye salto final.
Solución: aplicar `rstrip("\n")` o descontar 1 si último char es salto.

## 8.4.6 Scrollbar Inactiva

Causa: olvido de `yscrollcommand=scroll.set` o `scroll.config(command=text.yview)`.
Solución: establecer ambos lados del "vínculo".

## 8.4.7 Excepción Silenciosa en Callback

Causa: excepción no manejada dentro de función de botón.
Solución: envolver con `try/except` y mostrar `messagebox.showerror`.

---

## Tabla Mental de Diagnóstico (Texto)

- ¿Se congela? --> Buscar loops/sleep -> usar after.
- ¿No se ve imagen? --> Referencia perdida -> guardar en atributo.
- ¿Layout roto? --> Revisar mezcla managers.
- ¿Acción dispara sola? --> Revisar paréntesis en command.

---

## Micro‑Práctica

Induce cada error en un script pequeño y luego aplícale la corrección. Esto refuerza la memoria de diagnóstico.

---

## Mini‑Resumen

Tienes un compendio rápido de errores y soluciones. Mantenerlo visible al desarrollar reduce tiempo de depuración.
