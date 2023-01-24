import express from "express";
import { ManagerUsuarios } from "./ProductManager";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ManagerUsuarios = new ManagerUsuarios("./articulos.json");

app.get("/products", (req, res) => {
  let products = ManagerUsuarios.getProducts();
  if (req.query.limit && !isNaN(req.query.limit)) {
    products = products.slice(0, req.query.limit);
  }
  return res.json(products);
});

app.get("/products/:pid", (req, res) => {
  if (req.params.pid && !isNaN(req.params.pid)) {
    const product = ManagerUsuarios.getProductById(req.params.pid);
    return res.json(product);
  } else {
    return res.status(400).json({ error: "Invalid id" });
  }
});

app.listen(8080, () => {
  console.log("Server on port 5500");
});
