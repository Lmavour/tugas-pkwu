const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
  let filePath;

  if (req.url === "/") {
    // kalau root, arahkan ke index.html di folder utama
    filePath = path.join(__dirname, "index.html");
  } else if (/^\/[2-6]$/.test(req.url)) {
    // kalau /2 sampai /6, arahkan ke folder kelompok
    const page = req.url.slice(1); // ambil angkanya
    filePath = path.join(__dirname, "kelompok", `${page}.html`);
  } else {
    // coba cari file biasa sesuai request
    filePath = path.join(__dirname, req.url);
  }

  try {
    if (fs.existsSync(filePath)) {
      // deteksi content-type sederhana
      let contentType = "text/plain";
      if (filePath.endsWith(".html")) contentType = "text/html";
      else if (filePath.endsWith(".css")) contentType = "text/css";
      else if (filePath.endsWith(".js")) contentType = "application/javascript";

      res.setHeader("Content-Type", contentType);
      const data = fs.readFileSync(filePath);
      res.end(data);
    } else {
      res.statusCode = 404;
      res.end("404 Not Found");
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("500 Internal Server Error");
  }
};
