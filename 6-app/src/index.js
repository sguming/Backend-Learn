const v1Router = require('./routes');
const config = require('./utils/config');
const express = require('express');
const connectToDb = require('./utils/db');

const app = express();
app.use(express.json());

app.use('/v1', v1Router);

connectToDb();

app.listen(config.PORT, () => {
  console.log(`server listening on port ${config.PORT}`);
});
