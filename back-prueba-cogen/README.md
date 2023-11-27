## Configuración

Antes de comenzar, asegúrate de tener Node.js y npm instalados en tu sistema.

### Configuración del Backend - BACK-PRUEBA-COGEN

1. Navega al directorio `BACK-PRUEBA-COGEN`.

2. Primero no te olvides de ejecutar el comando `npm install` para tener todas las dependencias!

3. Crea un archivo `.env` con la siguiente información:

   ```.env
   DB_USER=tu_usuario_de_POSTGRESQL
   DB_PASSWORD=tu_password_de_POSTGRESQL
   DB_HOST=tu_host_de_POSTGRESQL
   ```

4. Debes crear una base de datos con el nombre de tests (debe ser en minuscula) para guardar la informacion correctamente.

5. Ejecuta el comando `npm start` para levantar el backend

¡Y LISTO, SI VES LOS MENSAJES `Servidor escuchando en http://localhost:3000`,` Base de datos sincronizada correctamente` se esta configurando todo correctamente!
