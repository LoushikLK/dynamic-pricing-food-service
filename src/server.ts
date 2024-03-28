import express from "express";
import { createServer, Server } from "http";
import routerHandler from "./helpers/router.helper";
import bottomLevelMiddleware from "./middlewares/bottom.middleware";
import topLevelMiddleware from "./middlewares/top.middleware";
require("dotenv").config();

const app: express.Application = express();
const server: Server = createServer(app);

topLevelMiddleware(app); //setup middleware
routerHandler(app); //this automatically creates routes in the routes folder i.e. if a file is auth.route.ts then its actual file will be http://localhost:8000/api/v1/auth
bottomLevelMiddleware(app); //setup bottom middleware handles (e.g. error ,not found route)

export { app };

export default server;
