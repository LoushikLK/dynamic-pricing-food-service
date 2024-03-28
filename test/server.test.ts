// server.test.ts
import supertest from "supertest";
import { prisma } from "../src/config";
import server, { app } from "../src/server";

const request = supertest(app);

describe("Express Server", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  it("should return a status 404 on GET /", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(404);
    expect(typeof response.body === "object").toBe(true);
    expect(response.body.success).toBe(false);
  });

  // Testing response handling when the server fails to connect to the database

  it("should handle failed database connection", async () => {
    // Simulate a failed database connection
    prisma.$connect = jest
      .fn()
      .mockRejectedValue(new Error("Failed to connect to database"));

    const response = await request.get("/");
    expect(response.status).toBe(404);
    expect(typeof response.body === "object").toBe(true);
  });
});
