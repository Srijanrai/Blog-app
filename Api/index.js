import express  from "express"
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import multer from "multer";
import cookieParser from "cookie-parser";

const app = express()
const port = 8080

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file.originalname) 
      cb(null, "../client/blog/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() +  file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });

app.use("/api/posts",postRoutes);
app.use("/api/users",usersRoutes);
app.use("/api/auth",authRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))