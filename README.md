<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el respositorio
2. Ejecutar

```
npm install
```

3. Tener Nest CLI instaladodo

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ u remonbar la copia a ```.env``` 
   
6. Llenar las varibles de entorno definidas en el ```.env```
7. Ejecutar la aplicacion en dev:
```
yarn start:dev
```
8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed/150
```
# Starck usado

*MongoDB
*Nest
F