import { ItemType } from "@prisma/client";
import supertest from "supertest";
import { prisma } from "../config";
import server, { app } from "../server";

const request = supertest(app);

let id: number;

describe("Pricing Controller", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  it("should create a price with name using POST /api/v1/price", async () => {
    const data = {
      organizationId: 3,
      itemId: 12,
      baseDistanceInKM: 10,
      pricePerKM: 10,
      zone: "test",
      fixPrice: 10,
    };

    const response = await request.post("/api/v1/price").send(data);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.data.data.id).toBe("number");
    id = response.body.data.data.id;
  });
  it("should return an error about organization/item not found POST /api/v1/price", async () => {
    const data = {
      organizationId: 100,
      itemId: 100,
      baseDistanceInKM: 10,
      pricePerKM: 10,
      zone: "test",
      fixPrice: 10,
    };

    const response = await request.post("/api/v1/price").send(data);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
  it("should update an price and return with message price updated PATCH /api/v1/price/:id", async () => {
    const data = {
      baseDistanceInKM: 15,
      pricePerKM: 12,
      zone: "test updated",
    };

    const response = await request.patch("/api/v1/price/" + id).send(data);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  it("should return an object of data with status 200 GET /api/v1/price/:id", async () => {
    const response = await request.get("/api/v1/price/" + id);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.data.zone).toBe("test updated");
    expect(response.body.data.data.baseDistanceInKM).toBe(15);
    expect(response.body.data.data.pricePerKM).toBe(12);
  });
  it("should return an array of object of data with status 200 GET /api/v1/price", async () => {
    const response = await request.get("/api/v1/price");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(typeof Array.isArray(response.body.data.data) === "boolean").toBe(
      true
    );
  });
  it("should calculate the price dynamically and return a total POST  /api/v1/price/pricing", async () => {
    let data = {
      zone: "test updated",
      organizationId: 3,
      itemType: ItemType.NONPERISHABLE,
      totalDistance: 50,
    };
    const response = await request.post("/api/v1/price/pricing").send(data);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.data.totalPrice).toBe(430);
  });
  it("should delete the price from db and return a status 200 DELETE /api/v1/price/:id", async () => {
    const response = await request.delete("/api/v1/price/" + id);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
