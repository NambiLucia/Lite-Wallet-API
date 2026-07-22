import request from "supertest";
import { describe, test, expect, beforeAll } from "@jest/globals";
import app from "../index";

describe("Transaction test", () => {
    let cookie: string;

    beforeAll(async () => {
        const res = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "hallytest@email.com",
                password: "hally2026"
            });

        expect(res.status).toBe(200);
        expect(res.headers["set-cookie"]).toBeDefined();

        cookie = res.headers["set-cookie"][0];

        console.log("Login cookie:", cookie);
    });


    test("Only logged in user can deposit", async () => {
        const res = await request(app)
            .post("/api/v1/wallet/deposit")
            .set("Cookie", cookie)
            .send({
                amount: 50000
            });

        expect(res.status).toBe(200);

        console.log("Deposit response:", res.body);
    });
});