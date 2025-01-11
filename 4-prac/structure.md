```
/--- root level ---/
  -- package.json
  -- package-lock.json
  -- node-modules/
  -- src/
    |-- index.js 入口文件 (app.js, server.js)
    |-- routes/ (routers/)
      |-- user.js (users.js, user.router.js)
      |-- movie.js
    |-- controllers/
      |-- user.controller.js
      |-- movie.controller.js
    |-- models/ ORM (object relational mapping) - CRUD
      |-- user.js (user.model.js)
    |-- middleware
      |-- errors/
      |-- cors.js
    |-- validations/
    |-- utils/
      |-- helper function (logger)
      |-- db connection
      |-- config
    |-- tests/
```

routes + controllers 合并

module -> resource

```
-- src/
  |-- movie/
    |-- movie.router.js
    |-- movie.controller.js
    |-- movie.service.js
    |-- movie.model.js
    |-- movie.validation.js
    |-- tests/
```

RESTful + graphql + websocket

Nest.js

yaml
