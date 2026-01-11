import request from "supertest";
import app from "../src/app.js";
import { loadCities } from "../src/data/dataLoader.js";

beforeAll(async () => {
	// load dataset before test
	await loadCities();
});

describe("GET /cities/search", () => {
	it("should return up to 10 matching cities", async () => {
		const response = await request(app)
			.get("/cities/search")
			.query({ name: "lon" });

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeLessThanOrEqual(10);

		if (response.body.length > 0) {
			expect(response.body[0]).toHaveProperty("name");
			expect(response.body[0]).toHaveProperty("country");
			expect(response.body[0]).toHaveProperty("population");
		}
	});

	it("returns 400 when query is only whitespace", async () => {
		const response = await request(app)
			.get("/cities/search")
			.query({ name: "   " });

		expect(response.status).toBe(400);
	});

	it("handles very long query safely", async () => {
		const longQuery = "a".repeat(1000);

		const response = await request(app)
			.get("/cities/search")
			.query({ name: longQuery });

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("returns valid response schema", async () => {
		const response = await request(app)
			.get("/cities/search")
			.query({ name: "new" });

		if (response.body.length > 0) {
			const city = response.body[0];

			expect(city).toHaveProperty("name");
			expect(city).toHaveProperty("country");
			expect(city).toHaveProperty("population");
			expect(typeof city.population).toBe("number");
		}
	});

	it("never returns more than 10 results", async () => {
		const response = await request(app)
			.get("/cities/search")
			.query({ name: "a" });

		expect(response.body.length).toBeLessThanOrEqual(10);
	});

	it("should return 400 if query param is missing", async () => {
		const response = await request(app).get("/cities/search");

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
	});
});
