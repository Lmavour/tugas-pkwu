const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
  if (req.url === "/") {
    // arahkan ke index.html
    const filePath = path.join(__dirname, "index.html");
    const html = fs.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } else {
    // kalau ada file lain di folder, coba serve
    try {
      const filePath = path.join(__dirname, req.url);
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        res.end(data);
      } else {
        res.statusCode = 404;
        res.end("404 Not Found");
      }
    } catch (err) {
      res.statusCode = 500;
      res.end("500 Internal Server Error");
    }
  }
};
