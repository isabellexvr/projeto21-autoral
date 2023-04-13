import { Router } from "express";

const locationsRouter = Router();

locationsRouter
    .get("/get-all-countries")
    .get("/states-by-id")
    .get("/cities-by-id")

export {locationsRouter}