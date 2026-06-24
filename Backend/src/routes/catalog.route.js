import { Router } from "express";
import { getCategoryController } from "../controllers/catalog.controller.js";

const catalogRouter = Router();
catalogRouter.get("/", getCategoryController);
export default catalogRouter;
