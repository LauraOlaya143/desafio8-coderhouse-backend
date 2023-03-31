A la hora de probar las rutas de login y logout se debe tener en cuenta lo siguiente:

la ruta "/login" tiene el metodo de get, lo cual significa que funciona desde el navegador, mostrando un front basico en donde esta un formulario, en el cual debes poner el nombre del usuario y la contraseña. Dos ejemplos los cuales se pueden probar son: 

- username: lau14, contraseña: 1234, email: laura14@gmail.com
- nombre: pepe2, conreaseña: 12345, email: pepe2@gmail.comnp

si usamos las rutas de api/user/login o api/user/signup estas funcionaran en Postman.

La ruta api/carrito/comprar/:id solo funcionara si estas logeado. Recomiendo probarlo con Postman, ya que en el navegador normal no se puede hacer de forma comoda.

Al probar con uno de los dos usuarios se podra ver como aparece un mensaje de bienvenida arriba del contenido (productos, formulario, etc) y se activa el chat con web socket. Si no estas logeado el chat no funcionara pero se podra enviar mensajes a traves de la ruta "/mensajes" pero tendras que pasar los campos:

-username
-email
-direccion
-foto
-text

///
En index hay codigo comentado el cual se puede activar el modo Cluster con el siguiente comando:

"prueba": "nodemon --exec babel-node src/index --p 8000 --m CLUSTER"

Y estas son pruebas con forever

"pruebaForever": "forever start dist/index.js",
"listForever": "forever list"

para hacer el servidor de modo cluster se debe ejecutar "npm run prueba"
mientras que para un servidor de modo folk seria "npm run dev"

probando forever se debe usar los comandos de "npm run pruebaForever"

Comandos usados en consola para usar PM2:

Modo Folk: pm2 start dist/index.js

Modo Cluster: pm2 start dist/index.js --name="server" --watch -i max

PM2 Ecosystem: pm2 start ecosystem.config.cjs

el archivo nginx1.conf muestra la solucion del primer inciso

Para probar el profilling con node de ejecuta de la siguiente manera: 

1. Ejecutar el comando en la consola "npm run start:profilling"
2. En otra consola, ejecutar " ./scripts/script1.sh"
3. Cerrar el proceso en la consola que se ejecuto el primer comando y cambiar el nombre del archivo isolate a "isolate-info.log"
4. ejecuta el comando en la consola "npm run start:process"

Probar profilling con autocannon

1. Ejecutar el comando en la consola "npm run start:inspect"
2. Abrir un navegador y hacer click derecho.
3. Entrar en "Inspeccionar elemento" y hacerle click al logo de Node.
4. Entrar "Generador de perfiles" y darle en iniciar grabacion de perfil
5. En otra consola, ejecutar "./autocannon/script1.sh"
6. Al terminar, para la grabacion de perfil.

Probar con 0x

1. Ejecutar el comando en la consola "npm run start:0x"
2. En otra consola, ejecutar "./autocannon/script1.sh"
3. Al terminar, acaba con el proceso de la primera consola, asi creando la carpeta de 0x
4. Opcional: cambia el nombre del archivo.
5. Abre la carpeta y abre el archivo "flamegraph.html" 

//

Para las pruebas con graphql se usa la ruta /graphql y para probar la documentacion con swagger es la ruta /docs