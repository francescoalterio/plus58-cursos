# Guía Sencilla de Programación Orientada a Objetos (POO) en Python

---

## 1. La Idea Principal: ¿Qué es la POO?

Imagina que quieres hacer galletas.

Primero, necesitas una **receta** (o un molde). La receta te dice qué ingredientes lleva la galleta (harina, azúcar) y qué puedes hacer con ella (hornearla, decorarla).

En POO:

- La **Clase** es la **receta** o el **molde**. Es el plano que define cómo serán tus objetos.
- El **Objeto** es la **galleta** que creas a partir de la receta. Puedes crear muchas galletas (objetos) a partir de una sola receta (clase), y cada una puede ser un poco diferente (una con chispas de chocolate, otra con vainilla).

**¿Y por qué es útil esto?**
Porque en lugar de tener código desordenado, agrupas todo lo que tiene que ver con un "concepto" (como un `Usuario`, un `Producto` o un `Coche`) en un solo lugar. Esto hace tu código:

- **Más organizado:** Fácil de encontrar y entender.
- **Reutilizable:** Creas una receta (`Clase`) una vez y la usas para crear tantos objetos como quieras.
- **Más fácil de mantener:** Si mejoras la receta, todas las galletas que hagas a partir de ese momento serán mejores.

---

## 2. Los Bloques de Construcción: Clases, Atributos y Métodos

Vamos a crear nuestra primera "receta" (Clase). Haremos una clase para representar a un `Perro`.

- **Atributos:** Son las características o datos del objeto. ¿Qué sabemos de un perro? Su `nombre` y su `raza`.
- **Métodos:** Son las acciones o comportamientos que el objeto puede hacer. ¿Qué hace un perro? `ladrar()`.
- **Constructor (`__init__`)**: Es un método especial que se ejecuta automáticamente cuando creas un nuevo objeto. Su trabajo es darle los valores iniciales a los atributos.

**Ejemplo práctico:**

```python
class Perro:
    def __init__(self, nombre_perro, raza_perro):
        print(f"¡Creando un nuevo perro llamado {nombre_perro}!")
        self.nombre = nombre_perro
        self.raza = raza_perro

    def ladrar(self):
        return f"¡Guau! Soy {self.nombre}, un {self.raza}."


perro1 = Perro("Firulais", "Pastor Alemán")
perro2 = Perro("Chispita", "Chihuahua")

print(perro1.ladrar())
print(perro2.ladrar())

print(f"{perro1.nombre} es un gran amigo.")
```

```python
# Esta es nuestra "receta" o "molde" para crear perros.
class Perro:
    # 1. El constructor: se ejecuta al crear un nuevo perro.
    # 'self' se refiere al objeto específico que estamos creando.
    def __init__(self, nombre_perro, raza_perro):
        print(f"¡Creando un nuevo perro llamado {nombre_perro}!")

        # 2. Atributos: guardamos los datos que nos dan en el objeto.
        self.nombre = nombre_perro  # 'self.nombre' es "el nombre de ESTE perro".
        self.raza = raza_perro      # 'self.raza' es "la raza de ESTE perro".

    # 3. Un método: una acción que el perro puede hacer.
    # También usa 'self' para acceder a sus propios atributos.
    def ladrar(self):
        return f"¡Guau! Soy {self.nombre}, un {self.raza}."

# --- Ahora, usemos nuestra receta para crear objetos (galletas) ---

# Creamos nuestro primer objeto Perro. Esto llama a __init__.
perro1 = Perro("Firulais", "Pastor Alemán")

# Creamos otro, completamente independiente del primero.
perro2 = Perro("Chispita", "Chihuahua")

# Llamamos a sus métodos para que realicen acciones.
print(perro1.ladrar())  # Salida: ¡Guau! Soy Firulais, un Pastor Alemán.
print(perro2.ladrar())  # Salida: ¡Guau! Soy Chispita, un Chihuahua.

# También podemos acceder a sus atributos directamente.
print(f"{perro1.nombre} es un gran amigo.") # Salida: Firulais es un gran amigo.
```

**Puntos clave a recordar:**

- La `Clase` es el plano (`Perro`).
- El `Objeto` es la instancia real (`perro1`, `perro2`).

### Un Momento para `self`: ¿Qué es Exactamente?

Piensa en `self` como la forma que tiene un objeto de hablar de sí mismo.

Cuando creas `perro1`, este objeto tiene su propia memoria. Si le pides que ladre (`perro1.ladrar()`), necesita una forma de acceder a _sus propios_ datos (su nombre "Firulais", su raza "Pastor Alemán").

`self` es esa conexión.

- **Al definir un método:** `def ladrar(self):`

  - Le decimos a Python: "Cualquier objeto que use este método se pasará a sí mismo como primer argumento".

- **Al llamar al método:** `perro1.ladrar()`
  - Python hace esto por ti en segundo plano: `Perro.ladrar(perro1)`.
  - El objeto `perro1` se "inyecta" en el método y se convierte en `self`.

Por eso, dentro del método, `self.nombre` se traduce como `perro1.nombre`. Si `perro2` llamara al mismo método, `self` se referiría a `perro2`, y `self.nombre` sería "Chispita".

En resumen: **`self` es el objeto mismo, visto desde dentro de la clase.**

- `self` es la forma que tiene un objeto de referirse a sí mismo. Es como decir "mi" nombre (`self.nombre`) o "mi" raza (`self.raza`).

---

## 3. Encapsulamiento: Protegiendo tus Datos

El encapsulamiento suena complicado, pero la idea es simple: **proteger los datos de un objeto para que no se modifiquen por accidente**.

Imagina una cuenta bancaria. No querrías que cualquiera pudiera cambiar tu saldo a cualquier valor, ¿verdad? Querrías que solo se pudiera cambiar a través de `depositar()` o `extraer()`, que contienen lógica de seguridad.

En Python, usamos una convención: si un atributo empieza con un guion bajo (ej: `_saldo`), es una señal para otros programadores que dice: "Oye, esto es interno de la clase, por favor no lo toques directamente desde fuera".

**Ejemplo con una `CuentaBancaria`:**

```python
class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        # Ponemos un guion bajo para indicar que es un atributo "protegido".
        # No se debería acceder a él como cuenta._saldo desde fuera.
        self._saldo = saldo_inicial

    # Método público para depositar dinero (la forma correcta de cambiar el saldo).
    def depositar(self, cantidad):
        if cantidad > 0:
            self._saldo += cantidad
            print(f"Depósito exitoso. Nuevo saldo: {self._saldo}")
        else:
            print("Error: la cantidad a depositar debe ser positiva.")

    # Método público para extraer dinero.
    def extraer(self, cantidad):
        if 0 < cantidad <= self._saldo:
            self._saldo -= cantidad
            print(f"Extracción exitosa. Nuevo saldo: {self._saldo}")
        else:
            print("Error: cantidad inválida o fondos insuficientes.")

    # Método público para ver el saldo de forma segura.
    def ver_saldo(self):
        return f"El saldo de {self.titular} es: ${self._saldo}"

# --- Uso correcto de la clase ---
mi_cuenta = CuentaBancaria("Ana", 1000)
print(mi_cuenta.ver_saldo())  # Salida: El saldo de Ana es: $1000

mi_cuenta.depositar(500)      # Salida: Depósito exitoso. Nuevo saldo: 1500
mi_cuenta.extraer(200)        # Salida: Extracción exitosa. Nuevo saldo: 1300
mi_cuenta.extraer(2000)       # Salida: Error: cantidad inválida o fondos insuficientes.

# Aunque Python te deja hacer esto, ¡es una mala práctica!
# Estás ignorando la protección del encapsulamiento.
# mi_cuenta._saldo = 999999 # ¡No hagas esto!
```

---

## 4. Herencia: Creando Clases a partir de Otras

La herencia te permite crear una nueva clase (llamada **clase hija**) que "hereda" todos los atributos y métodos de otra clase (la **clase padre**).

**¿Por qué es útil?** Para reutilizar código.
Imagina que tienes una clase `Animal`. Todos los animales tienen un `nombre` y pueden `comer`. Luego, quieres crear clases para `Perro` y `Gato`. En lugar de copiar y pegar el código, simplemente heredas de `Animal`.

- `Perro` es un `Animal`.
- `Gato` es un `Animal`.

Ambos heredarán `nombre` y el método `comer()`, pero pueden tener sus propios comportamientos únicos, como `ladrar()` o `maullar()`.

**Ejemplo de Herencia:**

```python
# --- Clase Padre (la más general) ---
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

    def comer(self):
        return f"{self.nombre} está comiendo."

# --- Clases Hijas (heredan de Animal) ---

# Perro hereda de Animal. Ponemos Animal entre paréntesis.
class Perro(Animal):
    # No necesita __init__ si usa el del padre tal cual.
    # Hereda nombre y el método comer().

    # Añadimos un método que solo los perros tienen.
    def ladrar(self):
        return "¡Guau!"

# Gato también hereda de Animal.
class Gato(Animal):
    # Podemos sobreescribir un método del padre para que se comporte diferente.
    def maullar(self):
        return "¡Miau!"

# --- Creamos objetos de las clases hijas ---
mi_perro = Perro("Rocky")
mi_gato = Gato("Pelusa")

# Pueden usar métodos de la clase padre (Animal)
print(mi_perro.comer())  # Salida: Rocky está comiendo.
print(mi_gato.comer())   # Salida: Pelusa está comiendo.

# Y también pueden usar sus propios métodos
print(mi_perro.ladrar()) # Salida: ¡Guau!
print(mi_gato.maullar()) # Salida: ¡Miau!
```

### Usando `super()` para extender la funcionalidad

A veces, quieres que la clase hija haga lo mismo que la padre, y **además** algo extra. Para eso se usa `super()`, que te permite llamar a un método de la clase padre.

```python
class Empleado:
    def __init__(self, nombre, salario):
        self.nombre = nombre
        self.salario = salario

class Gerente(Empleado):
    def __init__(self, nombre, salario, departamento):
        # Llama al __init__ del padre (Empleado) para que asigne nombre y salario.
        super().__init__(nombre, salario)
        # Ahora, añade el nuevo atributo que solo tienen los gerentes.
        self.departamento = departamento

gerente = Gerente("Carlos", 80000, "Tecnología")
print(f"{gerente.nombre} gana ${gerente.salario} y dirige {gerente.departamento}.")
```

---

## 5. Polimorfismo: Mismo Nombre, Diferente Acción

El polimorfismo significa "muchas formas". En POO, se refiere a que objetos de diferentes clases pueden responder al mismo mensaje (la misma llamada a un método) de maneras distintas.

En nuestro ejemplo de `Animal`, si tuviéramos un método `hacer_sonido()` en todas las clases hijas, podríamos tratarlos a todos como "animales" y pedirles que hagan su sonido, sin importar si son un perro, un gato o un pájaro.

**Ejemplo de Polimorfismo:**

```python
class Perro(Animal): # Asumimos que hereda de Animal como antes
    def hacer_sonido(self):
        return "¡Guau!"

class Gato(Animal):
    def hacer_sonido(self):
        return "¡Miau!"

class Vaca(Animal):
    def hacer_sonido(self):
        return "¡Muuu!"

# --- La magia del polimorfismo ---

# Esta función no sabe si recibirá un Perro, Gato o Vaca.
# Solo sabe que el objeto que reciba tendrá un método .hacer_sonido()
def imprimir_sonido(animal_objeto):
    print(animal_objeto.hacer_sonido())

# Creamos objetos de diferentes clases
perro = Perro("Toby")
gato = Gato("Mishi")
vaca = Vaca("Lola")

# Llamamos a la misma función con objetos diferentes
imprimir_sonido(perro)  # Salida: ¡Guau!
imprimir_sonido(gato)   # Salida: ¡Miau!
imprimir_sonido(vaca)   # Salida: ¡Muuu!
```

El polimorfismo hace tu código súper flexible. Puedes escribir funciones genéricas que funcionen con una gran variedad de objetos.

---

## 6. Abstracción: Ocultando la Complejidad

La abstracción consiste en ocultar los detalles complejos y mostrar solo las funcionalidades esenciales. Es como conducir un coche: no necesitas saber cómo funciona el motor por dentro para poder conducirlo. Solo necesitas saber usar el volante, los pedales y la palanca de cambios.

En POO, podemos crear clases "plantilla" que definen qué métodos **deben** tener las clases hijas, pero sin decir **cómo** deben hacerlo. Esto actúa como un "contrato": cualquier clase que herede de nuestra plantilla se compromete a implementar esos métodos.

Una forma de lograr esto en Python es crear un método en la clase padre que lance un error si no es redefinido en la clase hija.

**Ejemplo de Abstracción:**

```python
# Creamos un "contrato": cualquier clase que sea una 'Figura'
# DEBE tener un método para calcular su área.
class Figura:
    def calcular_area(self):
        # Si una clase hija no implementa su propio método,
        # este código se ejecutará y dará un error.
        # Es nuestra forma de decir: "¡Oye, tienes que crear este método!"
        raise NotImplementedError("Las clases hijas deben implementar el método 'calcular_area'")

# --- Ahora creamos clases concretas que cumplen el contrato ---

class Circulo(Figura):
    def __init__(self, radio):
        self.radio = radio

    # Estamos obligados a implementar este método para cumplir el "contrato".
    def calcular_area(self):
        return 3.14159 * (self.radio ** 2)

class Cuadrado(Figura):
    def __init__(self, lado):
        self.lado = lado

    # También estamos obligados a implementar este método.
    def calcular_area(self):
        return self.lado * self.lado

# --- Uso ---
mi_circulo = Circulo(10)
mi_cuadrado = Cuadrado(5)

print(f"Área del círculo: {mi_circulo.calcular_area()}")
print(f"Área del cuadrado: {mi_cuadrado.calcular_area()}")

# Si intentáramos usar una clase que no cumple el contrato, fallaría:
class Triangulo(Figura):
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura
    # ¡Ups! Olvidamos implementar calcular_area()

# mi_triangulo = Triangulo(10, 5)
# mi_triangulo.calcular_area() # Esto daría un error NotImplementedError
```

La abstracción nos ayuda a diseñar sistemas más robustos, asegurando que ciertos objetos siempre tendrán la funcionalidad que esperamos de ellos.

---

## 7. Temas Adicionales (Un Vistazo Rápido)

Aquí hay otros conceptos de POO que verás a menudo.

### Atributos de Clase vs. Atributos de Instancia

- **Atributo de Instancia:** Pertenece a un objeto específico (`self.nombre`). Cada perro tiene su propio nombre.
- **Atributo de Clase:** Es compartido por **todos** los objetos de esa clase.

```python
class Coche:
    # Este es un atributo de clase. Todos los coches tienen 4 ruedas.
    numero_de_ruedas = 4

    def __init__(self, marca):
        # Este es un atributo de instancia. Cada coche tiene su propia marca.
        self.marca = marca

coche1 = Coche("Toyota")
coche2 = Coche("Ford")

print(coche1.marca) # Toyota
print(coche2.marca) # Ford

# El atributo de clase se puede acceder desde la clase o desde el objeto.
print(Coche.numero_de_ruedas) # 4
print(coche1.numero_de_ruedas) # 4
```

### Métodos Especiales (o "Dunder Methods")

Son métodos con doble guion bajo al principio y al final (dunder = double underscore). Le dan "superpoderes" a tus clases, permitiéndoles integrarse con el lenguaje Python.

- `__init__`: Ya lo conocemos, es el constructor.
- `__str__`: Define qué se debe imprimir cuando haces `print(objeto)`. Es para que sea legible para el usuario.
- `__repr__`: Similar a `__str__`, pero su objetivo es dar una representación inequívoca del objeto, útil para desarrolladores.
- `__len__`: Permite que `len(objeto)` funcione.
- `__add__`: Permite usar el operador `+` entre objetos.

**Ejemplo con `__str__`:**

```python
class Libro:
    def __init__(self, titulo, autor):
        self.titulo = titulo
        self.autor = autor

    # Sin este método, print(libro) mostraría algo feo.
    def __str__(self):
        return f"'{self.titulo}' por {self.autor}"

libro_favorito = Libro("El Hobbit", "J.R.R. Tolkien")
print(libro_favorito) # Salida: 'El Hobbit' por J.R.R. Tolkien
```

---

## 8. Resumen Final (La Chuleta)

- **Clase:** El molde o receta (`Perro`).
- **Objeto:** La instancia creada a partir de la clase (`mi_perro`).
- **`__init__` y `self`:** El constructor que da vida al objeto y la forma en que el objeto se refiere a sí mismo.
- **Encapsulamiento:** Proteger datos internos (usando `_` como convención). Ofrecer métodos públicos para interactuar.
- **Herencia:** Una clase hija que hereda de una clase padre para reutilizar código.
- **Polimorfismo:** Objetos diferentes que responden a la misma acción de formas diferentes (`imprimir_sonido(objeto)`).
- **Abstracción:** Definir un "contrato" con métodos obligatorios sin implementar los detalles.

¡Felicidades! Ya conoces los pilares de la Programación Orientada a Objetos. La clave ahora es practicar y empezar a ver los problemas como conjuntos de objetos que interactúan entre sí.
