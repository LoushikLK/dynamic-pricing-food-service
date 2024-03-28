import { Application } from "express";
import { existsSync, readdirSync } from "fs";
import path from "path";

const routerHandler = (app: Application) => {
  //find all the folder in the app directory and import all the routes
  const allFolders = readdirSync(path.join(__dirname, "..", "routes"));

  allFolders.forEach((folder) => {
    //if route file present then import it
    if (
      existsSync(path.join(__dirname, "..", "routes", folder)) ||
      existsSync(path.join(__dirname, "..", "routes", folder))
    ) {
      const router = require(path.join(__dirname, "..", "routes/", folder));

      app.use(
        "/api/v1/" + folder?.split(".")?.[0]?.toLowerCase(),
        router.default
      );
    }
  });
};

export default routerHandler;
