import app from "./app";
import { loadCities } from "./data/dataLoader";

const PORT = 5001;

const startServer = async (): Promise<void> => {
	await loadCities();
	app.listen(PORT, () => {
		console.log(`Server running at http://localhost:${PORT}`);
	});
};

startServer();