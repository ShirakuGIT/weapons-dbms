# Securus

Securus is a comprehensive weapon management system designed to ensure the highest levels of security and accountability. Leveraging the robustness of blockchain technology, Securus provides a decentralized approach to the tracking and management of weapon transactions. At its core, it integrates modern web technologies with Ethereum blockchain to create a reliable and transparent record-keeping system.

## Features

- User authentication and authorization using JSON Web Tokens (JWT).
- Weapon registration, update, and tracking via Ethereum blockchain using Truffle and Ganache.
- CRUD operations for weapon and transaction records in a PostgreSQL database.
- API endpoints for managing weapons, transactions, and user roles.

## Screenshots
### Homepage

![Screenshot 2024-07-17 at 15-11-49 Welcome - Securus](https://github.com/user-attachments/assets/98974c93-262c-4d1f-90f2-ea59dd1783b5)

### Login
![Screenshot 2024-07-17 at 15-11-58 Login - Securus](https://github.com/user-attachments/assets/74b71b5b-c03a-4106-9dd8-be6c3b74a2a4)

### Register

![Screenshot 2024-07-17 at 15-12-08 Register - Securus](https://github.com/user-attachments/assets/8af38ce0-b644-469a-bff2-3ac506dad748)

### Main Page

![Screenshot 2024-07-17 at 15-13-48 Main Page - Securus](https://github.com/user-attachments/assets/01073fa3-bf67-4ac5-97a7-371b988392e2)


## Technologies Used

- Node.js and Express for the backend server.
- Bcrypt for password hashing.
- JSON Web Tokens (JWT) for secure authentication.
- Truffle suite and Ganache for smart contract compilation, deployment, and interaction.
- Web3.js for blockchain interaction.
- PostgreSQL for the relational database.
- Vanilla JavaScript for frontend interactions.

## API Endpoints

Here are the available API endpoints and their methods:

### Transactions
- POST `/api/transactions` - Create a new transaction.
- GET `/api/transactions` - Retrieve all transactions.
- GET `/api/transactions/:transaction_id` - Retrieve a transaction by ID.
- PUT `/api/transactions/:transaction_id` - Update a transaction by ID.
- DELETE `/api/transactions/:transaction_id` - Delete a transaction by ID.

### Authentication
- POST `/api/auth/signup` - User signup.
- POST `/api/auth/signin` - User signin.

### Users
- GET `/api/test/all` - Public access route.
- GET `/api/test/user` - User route.
- GET `/api/test/mod` - Moderator route.
- GET `/api/test/admin` - Admin route.

### Weapon Types
- POST `/api/weaponTypes/create` - Create a weapon type.
- GET `/api/weaponTypes` - Get all weapon types.
- GET `/api/weaponTypes/:TypeID` - Get a weapon type by ID.
- PUT `/api/weaponTypes/:TypeID` - Update a weapon type by ID.
- DELETE `/api/weaponTypes/:TypeID` - Delete a weapon type by ID.

### Weapons
- POST `/api/weapons/create` - Create a weapon.
- GET `/api/weapons` - Get all weapons.
- GET `/api/weapons/:weapon_id` - Get a weapon by ID.
- PUT `/api/weapons/:weapon_id` - Update a weapon by ID.
- DELETE `/api/weapons/:weapon_id` - Delete a weapon by ID.

## Getting Started

To get started with Securus, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install the dependencies.
3. Start your local Ethereum blockchain instance using Ganache.
4. Run `truffle migrate` to compile and deploy the smart contract.
5. Configure your `.env` file with the required environment variables.
6. Run `node server.js` to start the server.
7. Utilize Postman to interact with the provided API endpoints.

🚧 **Development Notes**:
- Currently, the create, read, and update functionalities are operational.
- The delete functionality, search feature, and a sophisticated frontend are under active development.
- The exact display of transaction hashes on the blockchain is also being worked on.
- Despite these ongoing enhancements, the backend is fully set up and functional.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make to the development of Securus are **greatly appreciated**.

---
