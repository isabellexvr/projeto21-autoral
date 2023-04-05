import app from "../../src/server";
import supertest from "supertest";

const server = supertest(app);

beforeAll(async () => {
    
})

describe("POST /users/sign-up", () => {
    it("Should respond with status 400 if body is not given"), async () => {
        const res = await server.post("/users/sign-up");
        expect(res.statusCode).toBe(400);
    }
})