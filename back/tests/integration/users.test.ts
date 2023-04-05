import app from "../../src/server";
import supertest from "supertest";
import { cleanDb, disconnectDb } from "../helpers";

const server = supertest(app);

beforeAll(async () => {
    cleanDb();
})

afterAll(async ( ) => {
    disconnectDb();
    process.exit(1)
})

describe("POST /users/sign-up", () => {
    it("Should respond with status 400 if body is not given", async () => {
        const res = await server.post("/users/sign-up");
        expect(res.statusCode).toBe(400);
    })
})