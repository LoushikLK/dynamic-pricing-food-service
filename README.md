# Food delivery app

The app involves developing a REST API backend for a food delivery app using Node.js with a primary focus on implementing a dynamic pricing module to calculate the total cost of food delivery based on various factors. The goal is to create a scalable and efficient backend system that can handle requests from the frontend, process them, and return accurate pricing information to the users.

## Features

- API to calculate delivery costs for different types of food items across various zones based on the distance and item type.
- The API can dynamically determine pricing based on:
  - Base Distance and Price: For example, a base distance of 5 km with a base price of 10 euros.
  - Per Km Price: For distances beyond the base, e.g., 1.5 EUR/km for perishable items and 1 EUR/km for non-perishable items.
- Error handling, validation, and security measures

## Tech Stack

**Server:** Node.js, Express.js, PostgreSQL (for storing data), Prisma (for ORM), Jest (For testing), Swagger (For documentation)

**Deployment:** [Deployed to Render](https://dynamic-pricing-food-service.onrender.com/docs)

## Run Locally

Clone the project

```bash
git clone https://github.com/LoushikLK/dynamic-pricing-food-service.git
```

Navigate to the project directory

```bash
cd dynamic-pricing-food-service
```

Install dependencies

```bash
npm install
```

Create a .env file at the root of the project

```bash
touch .env //ADD ENV VALUES TO IT
```

Prisma Generate Client

```bash
npm run generate
```

Start the development server

```bash
npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Endpoints

- `POST /api/v1/item`: Create a new Item
- `GET /api/v1/item/:id`: Get item by id
- `GET /api/v1/item`: Get all the item
- `PATCH /api/v1/item/:id`: Update item by id
- `DELETE /api/v1/item/:id`: Delete item by id
- `POST /api/v1/organization`: Create a new organization
- `GET /api/v1/organization/:id`: Get organization by id
- `GET /api/v1/organization`: Get all the organization
- `PATCH /api/v1/organization/:id`: Update organization by id
- `DELETE /api/v1/organization/:id`: Delete organization by id
- `POST /api/v1/price`: Create a new price
- `GET /api/v1/price/:id`: Get price by id
- `GET /api/v1/price`: Get all the price
- `PATCH /api/v1/price/:id`: Update price by id
- `DELETE /api/v1/price/:id`: Delete price by id
- `POST /api/v1/price/calculate`: Dynamically calculate the total amount of delivery fee

## Environment Variables

Ensure to set up the following environment variables:

- `DATABASE_URL`: PostgreSQL database url
- `APP_PORT`: Port of the application

N.B - Every calculation in the api happens in meter and cents
