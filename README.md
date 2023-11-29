Sr. Waffle Back
Descripción
Este proyecto es una aplicación backend desarrollada con NestJS. Proporciona una estructura para construir API RESTful con TypeScript.

Instalación
Asegúrate de tener Node.js y npm instalados en tu máquina. Luego, sigue estos pasos:

Instalación de Node.js
Para instalar Node.js, visita Node.js Official Website y sigue las instrucciones de instalación para tu sistema operativo.

Instalación de NestJS:
npm install -g @nestjs/cli

Instalación de JWT, Passport-JWT, Bcrypt y otras dependencias
Ejecuta los siguientes comandos en tu terminal para instalar las dependencias necesarias:

# Instalación de @nestjs/jwt y passport-jwt
npm install --save @nestjs/jwt passport-jwt
# Instalación de @types/passport-jwt
npm install --save-dev @types/passport-jwt
# Instalación de bcrypt
npm install bcrypt --save
# Instalación de @nestjs/common
npm install @nestjs/common
# Instalación de @nestjs/typeorm, typeorm y mysql2
npm install --save @nestjs/typeorm typeorm mysql2

Uso
Para ejecutar el proyecto, puedes usar los siguientes comandos:

npm run start:dev: Inicia la aplicación en modo de desarrollo con reinicio automático.
npm run build: Compila el proyecto.
npm start: Inicia la aplicación en entorno de producción.



Estructura del Proyecto
src/: Contiene los archivos fuente de la aplicación.
test/: Almacena archivos relacionados con pruebas.
dist/: Carpeta generada luego de compilar la aplicación.

Tecnologías Principales
NestJS: Framework de Node.js para construir aplicaciones eficientes y escalables.
TypeORM: ORM para TypeScript y JavaScript.
Jest: Framework de pruebas para JavaScript.

Licencia
Este proyecto está bajo la licencia UNLICENSED.