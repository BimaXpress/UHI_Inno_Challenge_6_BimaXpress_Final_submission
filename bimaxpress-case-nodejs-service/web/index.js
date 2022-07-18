const express = require("express");
const morgen = require("morgan");
const createError = require("http-errors");
var path = require('path');
const { mongoClient, elasticClient } = require("../helpers/connection");
const { infoLogger, errorLogger } = require("../utils/logger");
const cors = require('cors');
const { authRouter, caseRouter, preAuthFormRouter, reimbursementRouter,
  ChargeMastersRouter, RoomMastersRouter } = require("./routes");

const { verifyAccessToken } = require("../helpers/jwt");
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("../assets/swagger.json");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));

// message Only set limited urls
app.use(cors({ origin: '*' }))

const options = {
  definition: {
    openapi: "V1.0.0",
    info: {
      title: "Bimaxpress",
      description: "Bimaxpress decs",
      version: "1.0.0",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  apis: ["./Routes/*.js"],
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson, options));


app.use(morgen("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoClient();

// app.get("/", async (req, res, next) => {
//   try {
//     res.render('index', { title: 'Welcome!' });
//   }
//   catch (error) {
//     next(error)
//   }
// });


app.get('/', async (req, res, next) => {
  res.send('Welcome to bimaxress node case service');
});

app.use("/auth", authRouter);
app.use("/case", caseRouter);
app.use("/preAuthForm", preAuthFormRouter);
app.use("/reimbursement", reimbursementRouter);
app.use("/chargeMasters", ChargeMastersRouter);
app.use("/RoomMasters", RoomMastersRouter)

app.use(async (req, res, next) => {
  next(createError.NotFound("This route does not exist"));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  infoLogger.info(`server running on port ${PORT}`);
});
