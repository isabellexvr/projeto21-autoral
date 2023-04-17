import { faker } from '@faker-js/faker';
import app from "../../src/server";
import supertest from "supertest";
import { cleanDb, cleanUsers, disconnectDb } from "../helpers";
import { createFakeUser } from '../factories/usersFactory';
import { usernameConflictError, emailConflictError, userNotFoundError, invalidPasswordError } from 'errors';
import { createAddress, findFirstAddress } from '../factories/addressFactories';

const server = supertest(app);

beforeAll(async () => {
	cleanDb();
});

afterAll(async () => {
	disconnectDb();
});

describe("POST /users/sign-up", () => {
	it("Should respond with status 400 if body is not given", async () => {
		const res = await server.post("/users/sign-up");
		expect(res.statusCode).toBe(400);
	});

	it("Should respond with status 400 if a invalid body is sent", async () => {

		const body = { [faker.lorem.word()]: faker.lorem.word() };

		const res = await server.post("/users/sign-up").send(body);

		expect(res.statusCode).toBe(400);
	});

	describe("Valid Body Tests", () => {

		const validBodyGenerator = () => ({
			userInfo: {
				fullName: faker.name.firstName(),
				userName: faker.name.firstName(),
				picture: faker.image.avatar(),
				cover: faker.image.abstract(),
				email: faker.internet.email(),
				password: faker.internet.password(6)
			},
			locationInfo: {
				country: faker.address.country(),
				countryIso2: faker.address.countryCode('alpha-2'),
				state: faker.address.state(),
				stateIso2: faker.address.countryCode('alpha-2'),
				city: faker.address.cityName()
			}
		});

		it("should respond with status 409 if username already exists", async () => {
			const body = validBodyGenerator();
			const address = await findFirstAddress();
			await createFakeUser({ userName: body.userInfo.userName, addressId: address.id });

			console.log(body)

			const res = await server.post("/users/sign-up").send(body);

			console.log(body)

			expect(res.statusCode).toBe(409);
			expect(res.body).toEqual(usernameConflictError());
		});
		it("should respond with status 409 if e-mail already exists", async () => {
			const body = validBodyGenerator();
			const address = await findFirstAddress();
			await createFakeUser({ email: body.userInfo.email, addressId: address.id });

			const res = await server.post("/users/sign-up").send(body);

			expect(res.statusCode).toBe(409);
			expect(res.body).toEqual(emailConflictError());
		});
		it("Should respond with status 201 if body is correct and there's no conflicts.", async () => {
			const body = validBodyGenerator();

			const res = await server.post("/users/sign-up").send(body);
			expect(res.status).toBe(201);
		})
	});

});

describe("POST /users/sign-in", () => {
	it("Should respond with status 400 if body is not given", async () => {
		const res = await server.post("/users/sign-in");
		expect(res.statusCode).toBe(400);
	});
	it("Should respond with status 400 if a invalid body is sent", async () => {

		const body = { [faker.lorem.word()]: faker.lorem.word() };

		const res = await server.post("/users/sign-in").send(body);

		expect(res.statusCode).toBe(400);
	});

	describe("Valid Body Tests", () => {

		beforeEach(async () => {
			cleanUsers();
		});

		const emailLoginBodyGenerator = () => ({
			email: faker.internet.email(),
			password: faker.internet.password(6)
		});

		const usernameLoginBodyGenerator = () => ({
			userName: faker.name.firstName(),
			password: faker.internet.password(6)
		});

		


		it("Should respond with status 404 if there's no user for e-mail sent", async () => {
			const body = emailLoginBodyGenerator();

			const res = await server.post("/users/sign-in").send(body);

			expect(res.statusCode).toBe(404);
			expect(res.body).toEqual(userNotFoundError("e-mail"));
		});
		it("Should respond with status 404 if there's no user for username sent", async () => {
			const body = usernameLoginBodyGenerator();

			const res = await server.post("/users/sign-in").send(body);

			expect(res.statusCode).toBe(404);
			expect(res.body).toEqual(userNotFoundError("username"));
		});
		it("Should respond with status 401 if given password for e-mail is wrong.", async () => {
			const body = emailLoginBodyGenerator();
			const address = await findFirstAddress();
			await createFakeUser({ email: body.email, addressId: address.id });

			const res = await server.post("/users/sign-in").send(body);

			expect(res.statusCode).toBe(401);
			expect(res.body).toEqual(invalidPasswordError());
		});
		it("Should respond with status 401 if given password for username is wrong.", async () => {
			const body = usernameLoginBodyGenerator();
			const address = await findFirstAddress();
			await createFakeUser({ userName: body.userName, addressId: address.id });

			const res = await server.post("/users/sign-in").send(body);

			expect(res.statusCode).toBe(401);
			expect(res.body).toEqual(invalidPasswordError());
		});
		it("Should respond with user information, token and status 200 if username matches password.", async () => {
			const body = usernameLoginBodyGenerator();
			const address = await findFirstAddress();
			const createdUser = await createFakeUser({ userName: body.userName, password: body.password, addressId: address.id });

			const res = await server.post("/users/sign-in").send(body);

			expect(res.statusCode).toBe(200);
			expect(res.body).toEqual({
				token: expect.any(String),
				id: expect.any(Number),
				fullName: createdUser.fullName,
				userName: createdUser.userName,
				picture: createdUser.picture,
				email: createdUser.email,
				addressId: address.id,
				cover: createdUser.cover,
				followers_followers_followedIdTousers: expect.any(Array),
			});
		})


	})
});