# Capítulo 8.5 Próximos Pasos (Sin Detalle de Implementación)

## Objetivo del capítulo

Orientarte hacia caminos de expansión tras dominar lo básico, sin profundizar (simple mención para que sepas qué buscar luego).

---

## 8.5.1 Añadir Persistencia

Guardar y abrir archivos usando diálogos (`filedialog`). Implica manejar IO (open, read, write). Recomendación: empezar con `.txt` y codificación UTF‑8.

## 8.5.2 Widgets Más Avanzados

Explorar `ttk` (temas modernizados), `Treeview` (tablas/estructuras jerárquicas), `Notebook` (pestañas). Introducirlos gradualmente.

## 8.5.3 Empaquetar Aplicación

Crear ejecutables (ej: `pyinstaller`). Considerar: tamaños, incluir imágenes, probar en otra máquina.

## 8.5.4 Eventos y Atajos Más Complejos

Bindings múltiples: `<Control-s>`, `<Alt-KeyPress>`. Gestión de foco (`focus_set`).

## 8.5.5 Mejorar Experiencia de Usuario

- Estado visual de botones según contexto.
- Atajos visibles en el menú.
- Confirmaciones selectivas.

## 8.5.6 Organización Escalable

Separar módulos: `ui.py`, `logica.py`. Introducir clases adicionales para componentes grandes.

## 8.5.7 Pruebas Básicas

Investigar pruebas de lógica separando funciones puras fuera de callbacks GUI.

---

## Micro‑Práctica

Elige un próximo paso (persistencia o ttk) e investiga documentación oficial 15 minutos. Anota tres cosas que necesitarías para implementarlo.

---

## Mini‑Resumen

Existen múltiples rutas para profundizar: persistencia, widgets avanzados, empaquetado y organización. Avanza sólo cuando te sientas cómodo con los fundamentos trabajados.
