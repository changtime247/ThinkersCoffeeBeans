# Thinker's Coffee Beans Ecommerce

> eCommerce platform built with the MERN stack and Redux - [check out the site](https://thinkerscoffeebeans.onrender.com/)

![thinkersGithubPhoto](https://user-images.githubusercontent.com/86252224/194432439-c5cc872b-e325-4e03-9d29-f602c2e0e7cb.png)

## Features

- Full feature shopping cart
- Product reviews and ratings
- Product pagination
- Product search feature
- User profile with orders
- Checkout process
- PayPal / credit card integration
- Database seeder (products & users)
- Admin product management
- Admin user management
- Admin order details page
- Mark orders as shipped option

## Usage

### ES Modules in Node

ECMAScript Modules utilized in the backend. Please use Node v14.6+ or you will need to add the "--experimental-modules" flag.

When importing a file (not a package), add .js extension at the file path or you will get a "module not found" error

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy all data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
password

peterparker@example.com (Customer)
pparker

maryjane@example.com (Customer)
mjane
```

## TECHNICAL STACK

| Front            | Back         | Deploy    |
| ---------------- | ------------ | --------- |
| React            | Node.js      | Heroku    |
| React Router Dom | Express      |           |
| Redux            | MongoDB      |           |
| Axios            | Mongoose     |           |
| Jest             | JsonWebToken |           |
| Bootswatch       | Bcrypt       |           |
|                  | Paypal API   |           |
|                  | Multer       |           |

## License

The MIT License

Copyright (c) 2022 Andrew Chang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
