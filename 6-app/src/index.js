const v1Router = require('./routes');
const config = require('./utils/config');
const express = require('express');
const connectToDb = require('./utils/db');
const morgan = require('./utils/morgan');
const rateLimit = require('./utils/rateLimit');
const helmet = require('helmet');
const cors = require('cors');
const finalErrorHandler = require('./middleware/error/finalError.middleware');
const validationErrorHandler = require('./middleware/error/validationError.middleware');
const errorMiddleware = require('./middleware/error');

const app = express();
app.use(helmet());
app.use(cors());
app.use(rateLimit);
app.use(express.json());
app.use(morgan);

// swagger

app.use('/v1', v1Router);

errorMiddleware.forEach((handler) => app.use(handler));

connectToDb();

app.listen(config.PORT, () => {
  console.log(`server listening on port ${config.PORT}`);
});
