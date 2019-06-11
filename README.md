# TFG
Aplicación para trazar mercancías sobre una red BlockChain de Ethereum de pruebas(Ganache).

## INSTALACIÓN Y EJECUCIÓN
En primer lugar, será necesario tener instaladas las siguientes herramientas (preferiblemente últimas versiones estables):
-	Git.
-	NodeJS y npm.
-	Truffle.
-	Ganache (versión de línea de comando, ganache-cli o versión con interfaz gráfica).

En primer lugar, descargamos o clonamos el proyecto en nuestra máquina, lo podemos hacer con el siguiente comando:

		git clone https://github.com/Jaimedfc/TFG
	
Ahora, nos cambiamos al nuevo directorio TFG con:

		cd TFG
	
Con la ayuda de npm, instalamos todas las dependencias que necesitaremos (se encuentran descritas en el archivo package.json) con el siguiente comando:

		npm install
	
Una vez instaladas todas las dependencias, pasamos a usar el framework de Truffle compilando los contratos que usaremos:

		truffle compile --all
	
Este comando crea una nueva carpeta dentro de src con los contratos ya compilados dentro.
Durante los siguientes pasos, necesitaremos tener en funcionamiento nuestra red privada personal de Blockchain Ganache. Simplemente abriendo la interfaz gráfica y haciendo click en “Quickstart”. Debemos asegurarnos de que la dirección de despliegue de la red es 127.0.0.1 y puerto 7545 en los ajustes de Ganache (Si se usasen otras direcciones o puertos, conviene modificar el archivo truffle-config.js).

Ahora que tenemos Ganache funcionando, podemos migrar o desplegar los contratos en nuestra red con el siguiente comando:

		truffle migrate --reset
	
La opción  ´--reset´ no es necesaria la primera vez que migramos los contratos, pero las siguientes veces será necesario.

Ya podemos ejecutar nuestra aplicación, podemos hacerlo con:

		npm start
  
Se nos abrirá una ventana o pestaña de nuestro navegador con la aplicación, en caso de no abrirse automáticamente, solo tendremos que acudir a esta dirección en nuestro navegador:

http://localhost:3000/


## POSIBLES FALLOS O PROBLEMAS
Si tenemos instalada y habilitada en nuestros navegadores Chrome la extensión “Metamask”, esta entrará en conflicto con Ganache y afectará al correcto funcionamiento de nuestra aplicación.
