require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

require("./config/DBConnexion");

const usersRouter = require('./routers/usersRouter');
const bateauRouter = require('./routers/bateauxRouter');
const marchandiseRouter = require('./routers/marchandisesRouter');
const placesRouter = require("./routers/placesRouter");

const app = express();
const server = require("http").createServer(app);


app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/users', usersRouter);
app.use('/bateaux', bateauRouter);
app.use('/marchandises', marchandiseRouter);
app.use("/places", placesRouter);


app.use((req, res, next) => {
  next(createError(404, 'Ressource non trouvée'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {}
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});