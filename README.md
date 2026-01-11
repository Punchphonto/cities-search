# Tech Test Assignment
## Cities search 

## Basic Features

* Cache the dataset **in memory** to avoid re-downloading or re-parsing on each request
* Search cities by name
* Return maximum 10 result per request
* REST API with clear response schema


## Technologies Used
- Node.js
- TypeScript
- Express
- Axios (dataset download)
- Jest + Supertest (testing)


## Prerequisites
- require node version 22.5.1
- npm: v10.8.2


## Getting Started
To run this project locally, follow these steps:
- Clone the repository.
- Install Dependencies

```bash
npm install
```
- Start Development Server

```bash
npm run dev
```
- Server will start at:

```
http://localhost:5001
```
- Check Sever is running

```
GET /home
```
- Running Tests

```bash
npm test
```
This integration tests.

##  API Design

### Endpoint

```
GET /cities/search?name=<query>
```

### Query Parameters

| Name | Type   | Required | Description                 |
| ---- | ------ | -------- | --------------------------- |
| name | string | yes      | Search string for city name |

### Response (200 OK)

```json
[
  {
    "name": "Bangkok",
    "country": "TH",
    "population": 8281000
  }
]
```

### Notes on Population

* If `population` is missing in the dataset, the API returns `0`.
* This keeps the response schema consistent and simplifies client-side handling.

### Error Response (400)

```json
{
  "error": "Missing query parameter 'name'"
}
```
---

##  Key Design Decisions & Trade-offs

* Separated `app.ts` and `server.ts` to improve testability and separation of concerns.
* **In-memory caching** chosen over database or external cache to avoid unnecessary complexity.
* Simple linear search is sufficient due to small dataset size.

For a production-scale system with millions of records, indexing or a database-backed approach would be considered.


##  What I Would Improve With More Time

* **Caching strategy**:  change from normal in memory cache to use library (eg.node-cache) for support up scaling
* **Configuration**: make dataset source and cache behavior configurable via environment variables.
* **Observability**: add structured logging and basic metrics for request latency and cache load time.
* **API parameters**:  add more parameter that can request from front-end such as add pagination support and input validation limits and more parameter like country 

