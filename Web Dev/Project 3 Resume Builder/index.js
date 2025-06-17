import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/form2", (req, res) => {
  const template = req.query.template || "1"; 
  res.render("form2", { template, data: { template } });

  // console.log(template)

});


app.post("/generate",upload.single("photo"), (req, res) => {
  const data = req.body;

  if (req.file) {
    data.photo = "/tmp/" + req.file.filename;

  }

  if (data.template === "1") {
    res.render("resume1", { data, downloadMode: true });
  } else {
    res.render("resume2", { data, downloadMode: true });
  }
  // console.log(data.template)
});

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).send("Something broke!");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
