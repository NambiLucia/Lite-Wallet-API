import request from "supertest";
import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import app from "../index";
import { prisma } from "../lib/prisma";


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


    test("Cannot deposit when not logged in", async () => {
        const res = await request(app)
            .post("/api/v1/wallets/deposit")
            // .set("Cookie", cookie)
            .send({
                amount: 50000
            });

        expect(res.status).toBe(401);

        console.log("Deposit response:", res.body);
    });

 test("Can not deposit without loggin in", async () => {
        const res = await request(app)
            .post("/api/v1/wallets/deposit")
            .send({
                amount: 50000
            });

        expect(res.status).toBe(401);

        console.log("Deposit response:", res.body);
    });

 test("Successful WIthdraw", async () => {
        const res = await request(app)
            .post("/api/v1/wallets/withdraw")
            .set("Cookie", cookie)
            .send({
                amount: 5000
            });

        expect(res.status).toBe(200);

        console.log("Withdraw response:", res.body);
    });


 test("Insufficient funds", async () => {
        const res = await request(app)
            .post("/api/v1/wallets/withdraw")
            .set("Cookie", cookie)
            .send({
                amount: 5000000
            });

        expect(res.status).toBe(400);

        console.log("Withdraw response:", res.body);
    });

 test("Invalid amount", async () => {
        const res = await request(app)
            .post("/api/v1/wallets/withdraw")
            .set("Cookie", cookie)
            .send({
                amount: ""
            });

        expect(res.status).toBe(400);

        console.log("Withdraw response:", res.body);
    });

test("Successful Transfer", async () => {
        const res = await request(app)
            .post("/api/v1/wallets/transfer")
            .set("Cookie", cookie)
            .send({
                receivingEmail:"tester22@email.com",
                amount: 3000
            });

        expect(res.status).toBe(200);

        console.log("Transfer response:", res.body);
    });


test("Recipient doesn't exist", async () => {
        const res = await request(app)
            .post("/api/v1/wallets/transfer")
            .set("Cookie", cookie)
            .send({
                receivingEmail:"fakeuser@email.com",
                amount: 1000
            });

        expect(res.status).toBe(404);

        console.log("Transfer response:", res.body);
    });

test("Can't transfer to yourself", async () => {
        const res = await request(app)
            .post("/api/v1/wallets/transfer")
            .set("Cookie", cookie)
            .send({
                receivingEmail:"hallytest@email.com",
                amount: 23000
            });

        expect(res.status).toBe(400);

        console.log("Transfer response:", res.body);
    });

test("Insufficient funds to Transfer", async () => {
        const res = await request(app)
            .post("/api/v1/wallets/transfer")
            .set("Cookie", cookie)
            .send({
                receivingEmail:"tester22@email.com",
                amount: 1000000
            });

        expect(res.status).toBe(400);

        console.log("Transfer response:", res.body);
    });


});

describe("Wallet test", () => {
    let cookie: string;
    let email: string;

    beforeAll(async () => {
        email = `maino${Date.now()}@email.com`;

        const res = await request(app)
            .post("/api/v1/auth/register")
            .send({
                full_name: "maino",
                email,
                password: "maino2026"
            });

        expect(res.status).toBe(201);

        const loginRes = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email,
                password: "maino2026"
            });

        expect(loginRes.status).toBe(200);
        expect(loginRes.headers["set-cookie"]).toBeDefined();

        cookie = loginRes.headers["set-cookie"][0];
    });

    test("Get Wallet Balance", async () => {
        const res = await request(app)
            .get("/api/v1/wallets/")
            .set("Cookie", cookie);

        expect(res.status).toBe(200);

        console.log("Wallet response:", res.body);
    });
});

afterAll(async () => {
  console.log("Cleaning test data...");

  await prisma.ledger.deleteMany();
    await prisma.transaction.deleteMany();
    // await prisma.wallet.deleteMany();
    // await prisma.alert.deleteMany();
    // await prisma.user.deleteMany();

  await prisma.$disconnect();
});