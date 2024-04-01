const express = require("express");

const cors = require("cors");

const app = express();

const db = require('./app/models/');
const Role = db.role;


app.use(cors(corsOptions));

app.use(express.json());


db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

var corsOptions = {
    origin: "http://localhost:8080"
};

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.get("/", (req, res) => {
    res.json({ message: "Hello!" });
});

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

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