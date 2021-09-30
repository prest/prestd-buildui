# pREST Admin

_p_**REST** Admin **"Django Admin"** like created in React to support pREST interactions

### How use it

```sh
yarn install
PREST_URL=<your-prest-uri> yarn dev -p 3001
```

### How use Docker

Using via docker compose (contains postgres, prest server and admin in non-production build version):
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
