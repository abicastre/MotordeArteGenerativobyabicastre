## Generador de Arte Generativo Físico

Este proyecto es un generador de arte generativo físico desarrollado por abicastre. Combina diferentes capas de imágenes para crear una variedad de composiciones artísticas únicas. El generador utiliza imágenes almacenadas en carpetas organizadas y crea combinaciones de capas para generar arte generativo.

### Características principales

- Configuración personalizable de capas: El generador permite configurar el orden de las capas de imágenes para determinar cómo se combinan.
- Generación de arte aleatoria: El generador puede generar arte aleatoriamente a partir de las capas configuradas, lo que proporciona una variedad de resultados creativos.
- Metadatos detallados: Cada obra de arte generada incluye metadatos que describen su nombre, descripción, fecha, atributos de las capas y más.
- Archivos de imagen y metadatos organizados: Las imágenes generadas se guardan en una carpeta dedicada, y los metadatos individuales y combinados se almacenan en archivos JSON, facilitando la organización y el acceso.

### Cómo utilizar

1. Preparar las capas: Organiza las imágenes que deseas utilizar en capetas separadas dentro de una carpeta raíz.
2. Configurar el orden de las capas: Ejecuta el programa y sigue las instrucciones para configurar el orden de las capas. Indica el número correspondiente para cada capa.
3. Especificar rango y generar arte: Proporciona el número inicial y final para generar una serie específica de obras de arte. El generador combinará las capas de forma aleatoria dentro del rango especificado y generará las imágenes correspondientes.
4. Resultados y metadatos: Las imágenes generadas se guardarán en una carpeta separada, y los metadatos individuales y combinados se almacenarán en archivos JSON. Puedes utilizar estos metadatos para describir y catalogar cada obra de arte generada.

### Requisitos del sistema

- Node.js 12 o superior instalado en tu máquina.

### Instalación

1. Clona o descarga este repositorio en tu máquina local.
2. Abre una terminal o línea de comandos y navega hasta la carpeta del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

   ```
   npm install
   ```

### Ejecución

1. En la terminal o línea de comandos, asegúrate de estar en la carpeta raíz del proyecto.
2. Ejecuta el siguiente comando para iniciar el generador:

   ```
   node index.js
   ```

3. Sigue las instrucciones en pantalla para configurar el orden de las capas y especificar el rango de generación.
4. Una vez finalizado, las imágenes generadas y los archivos de metadatos estarán disponibles en las carpetas correspondientes.

### Contribuciones

Las contribuciones a este proyecto son bienvenidas. Si encuentras algún problema, tienes ideas de mejora o deseas agregar nuevas características, no dudes en abrir un "issue" o enviar una solicitud de extracción.

### Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

---

¡Diviértete explorando y generando arte generativo físico con este potente generador! Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar a abicastre. Disfruta.
