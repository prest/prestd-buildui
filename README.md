# Build UI - prestd server (PostgreSQL ➕ REST)

Build UI, is **"Django Admin"** _like_ created in React to support prestd interactions.

### How use it

We use (and recommend) node version 14, to avoid messing up your environment it is recommended to use a name version control, e.g. `nvm`:

```sh
nvm install $(cat .nvmrc) # or nvm use $(cat .nvmrc)
```

buildui depends on some services (postgresql and prestd server), to simplify the creation of your environment we recommend to use docker compose (contained here in the repository):

```sh
docker-compose up -d postgres prestd
```

to install the libraries on your node:

```sh
yarn install
PREST_URL=<your-prest-uri> yarn dev -p 3001
```

> `<your-prest-uri>`: if you ran **prestd** via docker the url will be `http://127.0.0.1:3000`

### How use Docker

Using via docker compose (contains postgres, prestd server and admin in non-production build version):

```sh
docker-compose up
```

**soon docker image:**

```sh
docker pull prest/admin
docker run -it -e PREST_URL=<your-prest-uri> -p 3001:3001 prest/admin
```

## Issues

> The [issue listing](https://github.com/prest/prest/issues?q=is%3Aissue+is%3Aopen+label%3Aproduct%2Fadmin) should be kept in the ["main" repository (_api server_)](https://github.com/prest/prest), centralizing all demands helps us give visibility to all products
