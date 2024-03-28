import { ItemType } from "@prisma/client";
import supertest from "supertest";
import { prisma } from "../config";
import server, { app } from "../server";

const request = supertest(app);

let id: number;

describe("Item Controller", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  it("should create an item with type and description using POST /api/v1/item", async () => {
    const newItem = {
      type: ItemType.PERISHABLE,
      description: "testDescription",
    };

    const response = await request.post("/api/v1/item").send(newItem);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.data.data.id).toBe("number");
    id = response.body.data.data.id;
  });
  it("should return an error with message Item already exist POST /api/v1/item", async () => {
    const newItem = {
      type: ItemType.PERISHABLE,
      description: "testDescription",
    };

    const response = await request.post("/api/v1/item").send(newItem);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe("Item already exist!");
  });
  it("should update an item and return  with message Item updated PATCH /api/v1/item/:id", async () => {
    const data = {
      description: "testDescription2",
    };

    const response = await request.patch("/api/v1/item/" + id).send(data);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe("Item updated");
  });
  it("should return an object of data with status 200 GET /api/v1/item/:id", async () => {
    const response = await request.get("/api/v1/item/" + id);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.data.type).toBe(ItemType.PERISHABLE);
    expect(response.body.data.data.description).toBe("testDescription2");
  });
  it("should return an array of object of data with status 200 GET /api/v1/item", async () => {
    const response = await request.get("/api/v1/item");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(typeof Array.isArray(response.body.data.data) === "boolean").toBe(
      true
    );
  });
  it("should delete the item from db and return a status 200 DELETE /api/v1/item/:id", async () => {
    const response = await request.delete("/api/v1/item/" + id);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
