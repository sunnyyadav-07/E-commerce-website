import { Router } from "express";
import {
  getCategoryController,
  getSuggestionsController,
} from "../controllers/catalog.controller.js";

const catalogRouter = Router();
catalogRouter.get("/", getCategoryController);
catalogRouter.get("/suggestions", getSuggestionsController);
export default catalogRouter;
