<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Logotipo de Nest" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# **SPEC-001**\_: Sistema de Control de Acceso de Seguridad Hex

Elija su idioma preferido para el README:

- [ <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png" alt="US Flag" width="20" height="15"> ] [Inglés ](README.md)

- [ <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/2560px-Flag_of_Mexico.svg.png" alt="Mexico Flag" width="20" height="15"> ] [Español (México)](README.mx.md)

## _**Antecedentes**_

La aplicación web Hex está diseñada para mejorar la seguridad y la eficiencia operativa de los complejos residenciales a través de una robusta gestión de control de acceso. Permite que diversos roles de usuarios como Administradores, Guardias y Residentes interactúen con el sistema según sus permisos, facilitando la gestión del acceso para visitantes y residentes por igual. Este sistema es crucial para modernizar las operaciones administrativas de estos complejos, integrándolos en ecosistemas digitales para agilizar procesos.

## _**Requisitos**_

#### **Imprescindibles (MoSCoW)**

- Registro y autenticación seguros para Administradores, Guardias, Residentes y Desarrolladores utilizando FirebaseAuth.
- Control de acceso basado en roles gestionado a través de middleware de Nest.js para asegurar que los usuarios solo accedan a las características y datos apropiados a su rol.
- Cifrado AES-256 para datos sensibles para cumplir con las mejores prácticas en seguridad de datos.
- Una base de datos PostgreSQL para manejar eficazmente las necesidades de almacenamiento de datos estructurados.
- Paneles de control amigables para cada tipo de rol, proporcionando datos a medida y perspectivas accionables relevantes para las responsabilidades de cada usuario.
- Actualizaciones en tiempo real para la gestión de accesos. Posibles tecnologías incluyen:
  - **Socket.io** - Ideal para comunicación bidireccional en tiempo real basada en eventos.
  - **Firebase Realtime Database** - Se integra bien con FirebaseAuth, proporcionando capacidades en tiempo real de manera nativa.
- Implementación como imágenes de Docker gestionadas dentro de una configuración de Docker Compose para facilitar el desarrollo y la implementación.

#### **Debería Tener**

- Registro exhaustivo y seguimiento de auditorías para facilitar la supervisión y el cumplimiento de las políticas de seguridad.

#### **Podría Tener**

- Un panel de control amigable para cada tipo de rol, proporcionando datos a medida y perspectivas accionables relevantes para las responsabilidades de cada usuario.
- Características avanzadas de análisis para la modelación predictiva de patrones de acceso o violaciones de seguridad.

#### **Inicialmente No Tendrá**

- Integración de dispositivos IoT externos para el control de acceso físico.

## Método

Esta sección describe las metodologías técnicas utilizadas para cumplir con los requisitos especificados en las secciones anteriores, incluyendo el diseño de la arquitectura, los esquemas de base de datos y el diseño detallado de los puntos finales de la API.

### Visión General de la Arquitectura

El sistema utiliza un patrón de arquitectura de microservicios con los siguientes componentes:

- **API Gateway**: Maneja todas las solicitudes de los clientes y las dirige a los servicios apropiados.
- **Servicio de Usuario**: Gestiona la autenticación de usuarios y el control de acceso basado en roles.
- **Servicio de Control de Acceso**: Maneja la lógica para la gestión de accesos, como la concesión y validación de entradas.
- **Servicio de Notificación**: Gestiona las actualizaciones en tiempo real utilizando Socket.io.

### Esquema de Base de Datos

_Los administradores, guardias, residentes y desarrolladores se almacenan en una tabla de 'usuarios' con diferenciación basada en roles. Los registros de acceso, perfiles de usuario e información de viviendas se gestionan en tablas separadas para facilitar consultas y actualizaciones rápidas._

### Diseño de la API

El sistema expondrá varios puntos finales REST estructurados alrededor de recursos clave como casas, usuarios y registros de acceso, definidos como sigue:

- **/api/usuario** : Gestión de usuarios (operaciones CRUD)
- **/api/casa** : Gestión de datos de casas
- **/api/acceso** : Gestión de entradas en el registro de acceso
- **/api/complejo** : Gestión de datos del complejo

### Comunicación en Tiempo Real

Utilizando Socket.io, el sistema proporcionará:

- **Actualizaciones basadas en eventos**: Cuando los registros de acceso se actualizan (entrada/salida), se transmite un evento a los usuarios relevantes (guardias o residentes de la casa).
- **Actualizaciones en vivo del panel de control**: Actualizaciones en tiempo real en los paneles de control de los usuarios para nuevas entradas o cambios.

## Implementación

La implementación del Sistema de Control de Acceso de Seguridad Hex seguirá estos pasos:

1. **Configuración del Entorno de Desarrollo**: Configurar el entorno de desarrollo utilizando Docker y Docker Compose. Esto incluye la configuración de PostgreSQL, Node.js con Nest.js y los entornos de Socket.io.

2. **Configuración de la Base de Datos y Migración de Esquemas**: Implementar el esquema de la base de datos según se define en la sección Método. Utilizar scripts de migración para gestionar las versiones de la base de datos y las actualizaciones.

3. **Desarrollo del Backend**:

   - Desarrollar los módulos de autenticación y gestión de usuarios utilizando Nest.js e integrar FirebaseAuth.
   - Implementar la lógica de control de acceso, incluida la gestión de entradas y salidas.
   - Configurar el sistema de notificación en tiempo real utilizando Socket.io.

4. **Desarrollo del Frontend**: Desarrollar las interfaces de usuario para cada rol, asegurando que el panel de control y otros elementos interactivos sean receptivos y amigables para el usuario.

5. **Pruebas**:

   - Realizar pruebas unitarias para los componentes individuales.
   - Llevar a cabo pruebas de integración para asegurar que los componentes funcionen juntos como se espera.
   - Ejecutar pruebas de extremo a extremo para validar el flujo completo de la aplicación.

6. **Despliegue**: Desplegar la aplicación utilizando contenedores Docker, asegurando que todos los componentes estén correctamente configurados e interconectados.

7. **Monitoreo y Mantenimiento**: Configurar el registro y el monitoreo para rastrear el rendimiento del sistema y para identificar y resolver rápidamente los problemas.

## Hitos

1. **M1 - Configuración del Entorno Completa**: Fecha Objetivo - 2024-05-08
2. **M2 - Base de Datos y Backend Funcionales**: Fecha Objetivo - 2024-05-17
3. **M3 - Frontend Funcional e Integrado con el Backend**: Fecha Objetivo - 2024-06-14
4. **M4 - Fase Inicial de Pruebas Completa**: Fecha Objetivo - 2024-06-19
5. **M5 - Despliegue Completo**: Fecha Objetivo - 2024-06-21
6. **M6 - Comienza la Fase Operativa y de Monitoreo**: Fecha Objetivo - 2024-06-24

Estos hitos ayudarán a seguir el progreso del proyecto y asegurar la entrega oportuna de cada fase.

## Instalación

Para instalar correctamente este proyecto, debe clonar este repositorio en su máquina local. Después de haber clonado el repositorio con éxito, necesitamos instalar todas las dependencias de paquetes externos que tiene el proyecto. Para hacer esto, primero vaya a su terminal local y luego ejecute el siguiente comando

```bash
$ yarn install
```

## Ejecución de la app

Tenemos 3 modos principales sobre cómo ejecutar esta aplicación. Cada uno de ellos se comportará de manera diferente y cargará diferentes variables ambientales.

- **Desarrollo** : Este modo cargará los datos de .env.local en el archivo .env y se ejecutará con esta configuración. Esta operación ejecuta el comando nest start que básicamente construye y ejecuta la app.
- **Modo de observación** : Aquí la app cargará los mismos datos de .env.local en el archivo .env como lo hace el modo de desarrollo, la principal diferencia es que cada vez que ocurra un cambio en el código fuente, el observador reconstruirá el código y actualizará la instancia en ejecución, por lo que no es necesario ejecutar yarn run start cada vez que desee ver sus cambios.
- **Modo de producción** : Esto copiará los datos de .env.prod en .env y luego ejecutará el compilado desde el archivo de entrada en dist/main.js para que el servidor esté ejecutando la versión de producción.

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Pruebas

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Contacto

- Autor - [Christopher Ortega](https://github.com/lchrios)
- CEO - [Jose Ceron](https://someurl.com)
- Dev - [Axel Heredia](https://someurl.com)
