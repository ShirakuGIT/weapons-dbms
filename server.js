const express = require("express");
const cors = require("cors");
const app = express();

// Database and models import
const db = require('./app/models/');
const Role = db.role;

// Options for CORS
var corsOptions = {
    origin: "http://localhost:8080"
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Sync database and initialize roles
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

// API Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/weapon.routes')(app);
require('./app/routes/transaction.routes')(app);
require('./app/routes/weapon_type.routes')(app);

// Root endpoint
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});

// Server port
const PORT = process.env.PORT || 9000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

// Function to initialize roles in the database
function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
