# Capítulo 7.1 Definición del Proyecto

## Objetivo del capítulo

Definir claramente qué construiremos: un mini Bloc de Notas simple en memoria, sin guardar archivos, que permita escribir texto, limpiarlo, contar caracteres y mostrar información básica.

---

## 7.1.1 Objetivo General

Construir una aplicación de escritorio mínima donde el usuario pueda:

- Escribir texto libre.
- Limpiar el área de texto bajo confirmación (más adelante).
- Ver un conteo de caracteres (y opcionalmente de líneas) actualizado cuando lo solicite.

La meta es practicar integración de widgets y organización progresiva.

---

## 7.1.2 Lista de Funciones Planeadas

Evolucionarán en versiones:

1. Área de texto + botones (Limpiar, Contar).
2. Barra de menú (Archivo: Limpiar, Salir; Ayuda: Acerca de).
3. Confirmar acciones destructivas.
4. Ventana Acerca de.
5. Mejora de estilo ligera + barra de estado.
6. Scrollbar vertical.
7. Refactor a clase.
8. Mejoras finales (reloj, atajo teclado, pequeños ajustes).
9. Revisión y checklist.

---

## 7.1.3 Estructura Inicial de Archivo

Comenzaremos con un único archivo `bloc_notas.py` (nombre sugerido) conteniendo:

```python
import tkinter as tk

ventana = tk.Tk()
ventana.title("Mini Bloc de Notas")

# (Se irán añadiendo widgets paso a paso en capítulos siguientes)

ventana.mainloop()
```

Mantendremos todo lineal al inicio para luego refactorizar cuando haya suficiente complejidad.

---

## Micro‑Práctica

Crea el archivo base, ejecuta y verifica que la ventana abre y cierra correctamente.

---

## Errores Comunes

- Querer añadir todas las funciones de golpe (objetivo: incremental).
- Nombrar el archivo `tkinter.py` (conflicto de importación).
- Cambiar de nombre el archivo a mitad de camino y olvidar que lo ejecutas diferente.

---

## Mini‑Resumen

Definiste el alcance, las versiones evolutivas y creaste la base. Próximo paso: añadir área de texto y botones fundamentales.
