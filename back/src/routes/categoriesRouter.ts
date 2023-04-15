import { findAllCategories } from "../controllers";
import { Router } from "express";

const categoriesRouter = Router();

categoriesRouter.get("/find-all", findAllCategories)

export { categoriesRouter }