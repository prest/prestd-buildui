# Build UI - prestd server (PostgreSQL ➕ REST)

Build UI, is **"Django Admin"** _like_ created in React to support prestd interactions.

### How use it

We use (and recommend) **node version 14**, to avoid messing up your environment it is recommended to use a name version control, e.g. `nvm`:

```sh
nvm install $(cat .nvmrc) # or nvm use $(cat .nvmrc)
```

`buildui` depends on some services (postgresql and prestd server), to simplify the creation of your environment we recommend to use docker compose (contained here in the repository):

```sh
docker-compose up -d postgres prestd
```

To install the libraries on your node (we use `yarn`):

```sh
yarn install
yarn dev -p 3001 # the default next port (3000) we use in prestd
```

If you want to set the prestd address use the `PREST_URL` environment variable:

```sh
PREST_URL=<your-prest-uri> yarn dev -p 3001
```

> `<your-prest-uri>`: if you ran **prestd** via docker the url will be `http://127.0.0.1:3000`

### How use Docker

> buildui is under development, we have not yet made a docker image available

**soon docker image:**

```sh
docker pull ghcr.io/prest/buildui
docker run -it -e PREST_URL=<your-prest-uri> -p 3001:3001 ghcr.io/prest/buildui
```

## Issues

> The [issue listing](https://github.com/prest/prest/issues?q=is%3Aissue+is%3Aopen+label%3Aproduct%2Fadmin) should be kept in the ["main" repository (_api server_)](https://github.com/prest/prest), centralizing all demands helps us give visibility to all products
