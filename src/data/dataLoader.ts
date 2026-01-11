import axios from "axios";
import zlib from "zlib";

type CityStat = {
	level: number,
	population?: number
}

type Coord = {
	lon: number,
	lang: number
}

export type City = {
	id: number;
	coord: Coord
	country: string;
	name: string;
	stat: CityStat
	geoname: Record<string, unknown>
	lang: Record<string, unknown>[]
	zoom: number
}

let citiesCache: City[] | null = null;

const DATASET_URL =
	"http://bulk.openweathermap.org/sample/current.city.list.json.gz";

export const loadCities = async (): Promise<City[]> => {
	if (citiesCache) {
		return citiesCache;
	}

	console.log("Loading city dataset...");

	const response = await axios.get(DATASET_URL, {
		responseType: "arraybuffer",
	});

	const buffer = Buffer.from(response.data);
	const unzipped = zlib.gunzipSync(buffer);
	const json = unzipped.toString("utf-8");

	citiesCache = JSON.parse(json);

	console.log(`Loaded ${citiesCache?.length} cities`);
	return citiesCache || [];
};


export const getCities = (): City[] => {
	if (!citiesCache) {
		throw new Error("Cities not loaded yet");
	}
	return citiesCache;
};
