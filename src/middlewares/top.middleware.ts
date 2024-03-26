import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";

const topLevelMiddleware = (app: Application) => {
  app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE,PATCH",
      credentials: true,
    })
  );
  app.use(
    express.urlencoded({
      extended: true,
      limit: "50mb",
    })
  );

  app.use(express.json());

  app.use(helmet());

  app.use((req, res, next) => {
    console.table([
      {
        METHOD: req.method,
        PATH: req.path,
        ip: req.ip,
        AGENT: req?.get("user-agent")?.split("/")[0],
      },
    ]);

    next();
  });
};

export default topLevelMiddleware;
