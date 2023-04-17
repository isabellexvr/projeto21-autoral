import supertest from "supertest";
import app from "../../src/server";

const server = supertest(app);

describe("GET /health", () => {
    it("should respond with status 200 if server is listening", async () => {
        const res = await server.get("/health")
        expect(res.statusCode).toBe(200);
    })
})