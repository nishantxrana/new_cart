# Project Setup

## Installation

### 1. Clone the Repository

- Clone the repository from https://github.com/nishantxrana/new_cart.git to your local machine.
- Navigate to the project directory.

### 2. Rename `.env` File

- To configure the necessary environment variables, rename `sample.env` to `.env` in the `Backend` folder.

### 3. Install Dependencies and Starting Backend Server

- Navigate to the `Backend` directory:

- Install the dependencies by running:

```
npm install
```

- Start the `Backend` server by running:

```
npm Start
```

### 4. Install Dependencies and Starting Frontend

- Navigate to the `Frontend` directory:

- Install the dependencies by running:

```
npm install
```

- Start the `Frontend` server by running:

```
npm run dev
```

# API Endpoints

### For Cart CRUD:

#### Retrieve All Cart Data

- **GET** localhost:3005/api/cart/getAll

#### Remove item from cart

- **POST** localhost:3005/api/cart/removeItem

#### Add item to cart

- **POST** localhost:3005/api/cart/addItem

#### Reduce quantity of product in cart

- **POST** localhost:3005/api/cart/reduceItemQuantity

## For Products:

### Retrieve all Products(homepage)

- **GET** localhost:3005/api/products/getAllProducts

### Retrieve Product by id

- **GET** localhost:3005/api/products/getProductById

#### Add Products

- **POST** localhost:3005/api/products/addProduct

#### At last open the Frontend in a new tab of the browser usually at `localhost:5137` or as specified in Terminal
