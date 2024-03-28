import server from "./server";
require("dotenv").config();

const PORT = process.env.APP_PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
