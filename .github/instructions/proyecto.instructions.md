---
applyTo: "**"
---

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

1. **Contexto del proyecto**
   Yo soy profesor de programacion en una academia llamada plus58. Actualmente estoy dictando un curso de programacion basica en python. En cada clase yo preparo un material que sirve tanto de apoyo como de guia para los estudiantes en foramto markdown donde explico conceptos, muestro ejemplos y propongo ejercicios. Este material es utilizado por los estudiantes durante y despues de las clases para reforzar su aprendizaje.

2. **Que se busca crear**
   Se busca crear un sistema o plataforma que permita a los estudiantes acceder al estos archivos markdown de manera sencilla y organizada, facilitando su consulta y estudio. Quiero que la plataforma tenga un sistema de login para los estudiantes, donde solo los estudiantes del curso puedan acceder a los materiales tanto los actuales como los ya graduados.

El proyecto debe ser capaz de leer y mostrar de manera estructurada el contenido de los archivos markdown, permitiendo a los estudiantes navegar fácilmente por los diferentes temas y ejercicios propuestos.

Todas las personas que visiten la plataforma podran ser capaces de ver los temas vistos en los cursos pero sin acceso al contenido, osea que solo puedan ver el temario mas no los detalles de cada tema.

El diseno debe ser minimalista pero hermoso, la plataforma debe ser 100% en modo oscuro y con una tipografia legible. El color principal de la plataforma sera el verde.

3. **Detalles técnicos**
   El sistema de login y registro sera creado utilizando firebase con un sistema sencillo de correo y contrasena. IMPORTANTE: el registro solo sera disponible a traves de un enlace que se proporcionara a los estudiantes durante la primera clase. Dicho enlace sera distinto para cada curso y una vez registrado los estudiantes de dicho curso este enlace se desactivara hasta crear un enlace(el enlace con un endpoint distinto) nuevo por el profesor para permitir un nuevo registro.

Los estudiantes deben tener una etiqueta manipulable por el profesor, con los estados de "activo", "inactivo" y "graduado".

Los estudiantes graduados tienen acceso a todo el contenido del curso y sus actualizaciones.
Los estudiantes activos se les dara acceso gradualmente al contenido del curso para que no se sientan abrumados ni adelanten los temas ni a sus compañeros. El profesor podrá gestionar este acceso a través del dashboard.
Los usuarios inactivos no tendrán acceso al contenido del curso hasta que cambien su estado a "activo".

Se debe crear un dashboard para el profesor donde pueda visualizar sus estudiantes y poder desbloquear contenido a los actuales estudiantes, crear o eliminar usuarios si se requiere.

Es importante que los cursos creados tengan una etiqueta la cual sera colocada a los estudiantes de dicho curso para saber a cual curso dar acceso. Esta etiqueta tambien podra ser modificada por el profesor desde el dashboard.

Cuando un registro sea creado, se le asignara automaticamente la etiqueta correspondiente al curso. Osea el registro sera creado especificamente para el curso en cuestion haciendo que el profesor no necesite agregar manualmente la etiqueta a cada estudiante.

lo que deberiamos guardar en la bses de datos son al os usuarios, que cada usuario tenga um array donde se le asigna a que cursos pertenecen, porque un usuario puede terner mas cursos. Luego que cada curso tenga un archivo json de condifuracion dodne esten las etiquetas de cada un los md, el nombre de los archivos y todo eso, asi no hay que leer las carpetas siempre, solo con leer el json se tiene la etiqueta del curso, la etiqueta de cada archivo md y asi, luego que cada usuario tenga otro campo array donde se le asignen las etiquetas de cada archivo md, asi se puede ir desbloqueando clases con el paso del tiempo, haciendo tambien que los que tengan el graduado tengan acceso a todos los archivos de un curso

el slug de cada uno de los md deberia ser el nombre del archivo junto al nombre del curso porque asi no se confunde con otros cursos
