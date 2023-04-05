import { faker } from '@faker-js/faker';
import app from "../../src/server";
import supertest from "supertest";
import { cleanDb, disconnectDb } from "../helpers";

const server = supertest(app);

beforeAll(async () => {
    cleanDb();
})

afterAll(async () => {
    disconnectDb();
    process.exit(1)
})

describe("POST /users/sign-up", () => {
    it("Should respond with status 400 if body is not given", async () => {
        const res = await server.post("/users/sign-up");
        expect(res.statusCode).toBe(400);
    });

    it("Should respond with status 400 if a invalid body is sent", async () => {

        const body = { [faker.lorem.word()]: faker.lorem.word() };

        const res = await server.post("/users/sign-up").send(body);

        expect(res.statusCode).toBe(404);
    });

    describe("Valid Body Tests", () => {
        const validBodyGenerator = () => ({
            fullName: faker.name.fullName(),
            userName: faker.name.firstName(),
            picture: faker.image.avatar(),
            email: faker.internet.email(),
            password: faker.internet.password(6)
        })
    });

    it("should respond with status 409 if username already exists", async () => {
        
    })

});