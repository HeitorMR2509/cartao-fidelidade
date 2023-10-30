require("dotenv").config();
const { existsSync, writeFileSync } = require("fs");
const { createServer: createHTTPServer } = require("http");
const app = require("./src/_app");

const PORT = process.env.PORT || 3000;

if (!existsSync(".env")) {
  writeFileSync(".env", "PORT=3000");
}

(async () => {
  const server = createHTTPServer(app);
  server.listen(PORT, () => {
    console.log(`> [SERVER - INFO] Ouvindo em http://127.0.0.1:${PORT}`);
  });
})();
