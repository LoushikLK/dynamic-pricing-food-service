import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Food Delivery Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application for dynamic pricing information",
    },
    servers: [
      {
        url: "/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          in: "header",
          name: "Authorization",
          description: "Bearer token to access these api endpoints",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/docs/*.ts", "./build/docs/*.js"],

  security: [
    {
      bearerAuth: [],
    },
  ],
};

const topLevelMiddleware = (app: Application) => {
  //middleware for cors
  app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE,PATCH",
      credentials: true,
    })
  );

  //middleware for parsing incoming data
  app.use(
    express.urlencoded({
      extended: true,
      limit: "50mb",
    })
  );

  app.use(express.json());

  //middleware for security
  app.use(helmet());

  //swagger setup
  const specs = swaggerJSDoc(swaggerOptions);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

  // printing the request
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
