import request from 'supertest';
import { app } from '../app';
import createConnection from "../database";


describe("Users", () => {

    // É necessário que antes dos testes todas as migrations sejam executadas
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Shold be table to create a new user!", async () => {
        const response = await request(app).post("/users").send({
            name: "teste",
            email: "teste@gmail.com"
        });

        expect(response.status).toBe(201);
    });

    it("Shot not be able created a user with exists email", async () => {
        const response = await request(app).post("/users").send({
            name: "teste2",
            email: "teste2@gmail.com"
        });

        expect(response.status).toBe(201);
    })
});