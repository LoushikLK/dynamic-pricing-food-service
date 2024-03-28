import supertest from "supertest";
import { prisma } from "../config";
import server, { app } from "../server";

const request = supertest(app);

let id: number;

describe("Organization Controller", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  it("should create an organization with name using POST /api/v1/organization", async () => {
    const data = {
      name: "test",
    };

    const response = await request.post("/api/v1/organization").send(data);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.data.data.id).toBe("number");
    id = response.body.data.data.id;
  });
  it("should return an error with message organization already exist POST /api/v1/organization", async () => {
    const data = {
      name: "test",
    };

    const response = await request.post("/api/v1/organization").send(data);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe("Organization already exist!");
  });
  it("should update an organization and return with message Organization updated PATCH /api/v1/organization/:id", async () => {
    const data = {
      name: "test updated",
    };

    const response = await request
      .patch("/api/v1/organization/" + id)
      .send(data);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.msg).toBe("Organization updated");
  });
  it("should return an object of data with status 200 GET /api/v1/organization/:id", async () => {
    const response = await request.get("/api/v1/organization/" + id);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.data.name).toBe("test updated");
  });
  it("should return an array of object of data with status 200 GET /api/v1/organization", async () => {
    const response = await request.get("/api/v1/organization");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(typeof Array.isArray(response.body.data.data) === "boolean").toBe(
      true
    );
  });
  it("should delete the organization from db and return a status 200 DELETE /api/v1/organization/:id", async () => {
    const response = await request.delete("/api/v1/organization/" + id);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
