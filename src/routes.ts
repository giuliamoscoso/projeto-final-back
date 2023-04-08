import { Router } from "express";

import UserController from "./Controllers/UserController";
import ProductController from "./Controllers/ProductController";

const router = Router();

router.get("/produtos", ProductController.findAllUProducts).put("/usuarios", UserController.createUser).post("/produtos", ProductController.createProduct);
// .delete("/produtos/:id", ProductController.deleteProduct);

export { router };
