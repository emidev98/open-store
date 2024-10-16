const helmet = require("helmet");
const cors = require("cors");
const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler} = require("./middlewares/error.handler");

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', undefined];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(options));
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`OpenStore http://localhost:${port}`);
});
