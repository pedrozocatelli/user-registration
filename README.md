<h1 align="center">
🌞 X Solar Tech 
</h4>

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)


## Preparar o Ambiente

```
docker run --name xsolar -d -e POSTGRES_USER=pedro -e POSTGRES_PASSWORD=senha -p 5432:5432 -d postgres
```

## Uso Backend

- Alterar email de destinatário no arquivo UserController.js, linha 56

```
yarn install
yarn sequelize db:migrate
yarn dev
```


## Uso Frontend

```
yarn install
yarn start
```
