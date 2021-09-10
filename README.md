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
