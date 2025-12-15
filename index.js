import "dotenv/config";
import express from "express";
import productsRouter from "./src/routes/products.router.js";
import { auth } from "./src/middlewares/auth.middleware.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) =>{
  res.json({message: "Hola, bienvenido a nuestra api REST"});
});

app.use("/api", productsRouter);

app.use(auth);

app.get("/", auth, (req, res) => {
  res.send("API ...");
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
