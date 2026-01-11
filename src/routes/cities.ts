import { Router, Request, Response } from "express";
import { getCities } from "../data/dataLoader";

const citiesRouter = Router();

citiesRouter.get("/search", (req: Request, res: Response) => {
	const query = String(req.query.name || "").trim().toLowerCase();

	if (!query) {
		return res.status(400).json({
			error: "Missing query parameter 'name'",
		});
	}

	const results = getCities().filter((city) =>
		city.name.replaceAll(' ', '').toLowerCase().includes(query)
	).slice(0, 10).map((city) => {
		return {
			name: city.name,
			country: city.country,
			population: city.stat.population ?? 0,
		}
	})

	return res.json(results);
});

export default citiesRouter;
