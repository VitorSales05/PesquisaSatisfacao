import request from 'supertest';
import { app } from '../app';
import createConnection from "../database";


describe("Surveys", () => {

    // É necessário que antes dos testes todas as migrations sejam executadas
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Shold be table to create a new survey!", async () => {
        const response = await request(app).post("/surveys").send({
            title: "title exemple",
            description: "description exemple"
        });

        expect(response.status).toBe(201);
     //   expect(response.body).toHaveProperty("id");
    });

    it("Shold be able to get a new survey!", async () => {
        await request(app).post("/surveys").send({
            title: "title exemple2",
            description: "description exemple2"
        });

        const response = await request(app).get("/surveys");
        expect(response.body.length).toBe(2);
    });
});