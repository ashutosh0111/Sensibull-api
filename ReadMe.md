Certainly, here's the README.md file with the API endpoints and sample output included:

```markdown
# Sensibull API

This repository contains the backend code for managing orders, including creating, modifying, canceling, and checking the status of orders. The API is built using Node.js and Express, and it uses Sequelize as the ORM for interacting with an SQLite3 database.

## Installation

Follow these steps to set up and run the Sensibull API on your local machine:

1. Clone the Git repository:
   ```shell
   git clone https://github.com/ashutosh0111/Sensibull-api.git
   ```

2. Navigate to the project directory:
   ```shell
   cd Sensibull-api
   ```

3. Install the required dependencies:
   ```shell
   npm install
   ```

4. Start the API server:
   ```shell
   node app
   ```

## API Endpoints

### Creating an Order

To create a new order, make a POST request to the following endpoint:

- URL: http://localhost:19093/api/order-service
- Request Type: POST
- Request Body (JSON):
  ```json
  {
    "symbol": "TATA",
    "quantity": 10
  }
  ```

**Sample Output:**
```json
{
  "success": true,
  "payload": {
    "identifier": "f888a6ab-e585-4998-b04b-0155d6d4c90e",
    "symbol": "TATA",
    "quantity": 10,
    "filled_quantity": 0,
    "order_status": "open"
  }
}
```

### Modifying an Order

To modify an existing order, make a POST request to the following endpoint:

- URL: http://localhost:19093/api/order-service
- Request Type: POST
- Request Body (JSON):
  ```json
  {
    "identifier": "f888a6ab-e585-4998-b04b-0155d6d4c90e",
    "new_quantity": 20
  }
  ```

**Sample Output:**
```json
{
  "success": true,
  "payload": {
    "identifier": "f888a6ab-e585-4998-b04b-0155d6d4c90e",
    "symbol": "TATA",
    "quantity": 20,
    "filled_quantity": 0,
    "order_status": "open",
    "createdAt": "2023-09-14T11:14:51.502Z",
    "updatedAt": "2023-09-14T11:17:36.491Z"
  }
}
```

### Canceling an Order

To cancel an order, make a DELETE request to the following endpoint:

- URL: http://localhost:19093/api/order-service
- Request Type: DELETE
- Request Body (JSON):
  ```json
  {
    "identifier": "f888a6ab-e585-4998-b04b-0155d6d4c90e"
  }
  ```

**Sample Output:**
```json
{
  "success": true,
  "payload": {
    "identifier": "f888a6ab-e585-4998-b04b-0155d6d4c90e",
    "symbol": "TATA",
    "quantity": 20,
    "filled_quantity": 0,
    "order_status": "cancel",
    "createdAt": "2023-09-14T11:14:51.502Z",
    "updatedAt": "2023-09-14T11:18:12.979Z"
  }
}
```

### Getting Order Status

To check the status of an order, make a POST request to the following endpoint:

- URL: http://localhost:19093/api/order-service/status
- Request Type: POST
- Request Body (JSON):
  ```json
  {
    "identifier": "f888a6ab-e585-4998-b04b-0155d6d4c90e"
  }
  ```

**Sample Output:**
```json
{
  "success": true,
  "payload": {
    "identifier": "f888a6ab-e585-4998-b04b-0155d6d4c90e",
    "symbol": "TATA",
    "quantity": 20,
    "filled_quantity": 0,
    "order_status": "cancel",
    "createdAt": "2023-09-14T11:14:51.502Z",
    "updatedAt": "2023-09-14T11:18:12.979Z"
  }
}
```

## Technologies Used

- Axios (HTTP client library)
- Body-parser (Middleware for parsing JSON)
- Express (Web application framework for Node.js)
- Sequelize (Object-Relational Mapping for database interactions)
- SQLite3 (Embedded relational database)
