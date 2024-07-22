# Proyecto de Cliente para API de Libros

Este proyecto es una aplicación web frontend que interactúa con una API externa de Libros, permitiendo a los usuarios gestionar libros a través de diversas operaciones como crear, leer, actualizar y eliminar libros.

## Características

- Autenticación de usuarios
- Gestión de libros (operaciones CRUD)
- Interfaz de usuario responsiva
- Diseño visual atractivo con imágenes relacionadas con libros y lectura

## Tecnologías utilizadas

- HTML
- CSS
- TypeScript/JavaScript

## Estructura del proyecto

- /html
  - deleteBook.html: Página para eliminar libros
  - newBook.html: Página para crear nuevos libros
  - register.html: Página para registrar nuevos usuarios
  - updateBook.html: Página para actualizar libros existentes
- /controllers
  - books.controller.ts: Controlador TypeScript para operaciones de libros
  - books.controller.js: Versión compilada JavaScript del controlador
- /models
  - books.model.ts: Definiciones de tipos e interfaces para los libros
  - books.model.js: Versión compilada JavaScript de los modelos
- /img
  - Contiene imágenes utilizadas en la aplicación
- /scripts
  - updateBook.ts: Lógica para actualizar libros
  - register.ts: Lógica para registrar nuevos usuarios
  - newBook.ts: Lógica para crear nuevos libros
  - links.ts: Manejo de navegación entre páginas
  - getBooks.ts: Lógica para obtener y mostrar libros
  - deleteBook.ts: Logica para eliminar libros
- index.html: Página principal de la aplicación
- style.css: Archivo CSS para el estilo de la aplicación
- index.ts: Archivo TypeScript principal
- index.js: Archivo JavaScript compilado a partir de TypeScript

## Configuración e instalación

- Clona el repositorio:

-Instala Visual Studio Code:

-Instala la extensión Live Server:

-Abre Visual Studio Code.
 Ve a la extensión de la barra lateral izquierda.
 Busca "Live Server" y haz clic en "Instalar" en la extensión desarrollada por Ritwick Dey.

-Abre el proyecto en Visual Studio Code:
 Abre Visual Studio Code.
 Selecciona File > Open Folder... y selecciona la carpeta de tu proyecto.

-Inicia Live Server:

 Abre index.html en Visual Studio Code.
 Haz clic derecho en el archivo y selecciona "Open with Live Server".
 Alternativamente, haz clic en el botón "Go Live" en la esquina inferior derecha de Visual Studio Code.

## Uso

La aplicación proporciona interfaces de usuario para:

- Registrar nuevos usuarios
- Crear nuevos libros
- Actualizar libros existentes
- Eliminar libros
- Ver una lista de libros

Cada operación tiene su propia página HTML y script TypeScript asociado.

## Comunicación con la API

La aplicación se comunica con una API externa en http://190.147.64.47:5155 utilizando los siguientes endpoints:

- POST /api/v1/auth/login: Inicio de sesión de usuario
- POST /api/v1/users: Crear un nuevo usuario
- POST /api/v1/books: Crear un nuevo libro
- GET /api/v1/books: Obtener todos los libros
- PATCH /api/v1/books/:id: Actualizar un libro
- DELETE /api/v1/books/:id: Eliminar un libro

## Autenticación

La aplicación utiliza autenticación basada en tokens. Después de un inicio de sesión exitoso, se recibe un token que luego se usa para las siguientes solicitudes a la API.

## Scripts principales

- updateBook.ts: Maneja la búsqueda y actualización de libros
- register.ts: Gestiona el registro de nuevos usuarios
- newBook.ts: Controla la creación de nuevos libros
- links.ts: Maneja la navegación entre las diferentes páginas de la aplicación
- getBooks.ts: Se encarga de obtener y mostrar la lista de libros

## Controlador de Libros

El archivo books.controller.ts en la carpeta controllers maneja todas las interacciones con la API de libros.

## Modelos

La carpeta models contiene books.model.ts, que define las interfaces y tipos utilizados en la aplicación.

## Estilo y Diseño Visual

La aplicación cuenta con un diseño personalizado que incluye:
- Imágenes temáticas relacionadas con la lectura y los libros
- Diseño responsivo
- Formularios y botones con estilo personalizado
- Un diseño en cuadrícula para mostrar los libros

## Desarrollo

El proyecto utiliza TypeScript para el desarrollo. Los archivos .ts se compilan a JavaScript para su uso en el navegador.

## Notas

- Este es un proyecto frontend que se comunica directamente con una API externa
- Asegúrate de manejar el token de la API de forma segura
- El proyecto utiliza la sintaxis de módulos ES6
- Se implementa el manejo de errores para las solicitudes a la API
