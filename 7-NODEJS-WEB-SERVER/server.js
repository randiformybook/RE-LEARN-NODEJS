const http = require("http");
const fs = require("fs/promises");

const dirFile = "./html/home.html";
const aboutPage = "./html/about.html";

const server = http.createServer(async (req, res) => {
  if (req.url === "/" || req.url === "/home") {
    try {
      const data = await fs.readFile(dirFile);
      res.writeHead(200);
      res.write(data);
    } catch (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>Page is not Found !</h1>");
    }
  } else if (req.url === "/about") {
    try {
      const data = await fs.readFile(aboutPage);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>Page is not Found !</h1>");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("Page Not Found");
  }
  res.end();
});

const port = 3000;
const hostname = "127.0.0.1";
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
