import { createServer } from "http";

const PORT = process.env.PORT;

const users = [
    { id: 1, name: "Johnny B" },
    { id: 2, name: "Janny T" },
    { id: 3, name: "Sanny C" }
];

// Wrapper logger as middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// JSON middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
};

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
};

// Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
    const id = req.url.split('/')[3];
    const usr = users.find((user) => user.id === parseInt(id));
    res.statusCode = 200;
    if (usr) {
        res.write(JSON.stringify(usr));
    }
    else {
        res.statusCode = 200;
        res.write(JSON.stringify({ message: "User not found" }));
    }
    res.end();
};

// Not foudn handler
const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "Route not found" }));
    res.end();
};


const server = createServer((req, res) => {
    // Wrapped stuff
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === "/api/users" && req.method === "GET") {
                getUsersHandler(req, res);
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
                getUserByIdHandler(req, res);

            } else {
                notFoundHandler(req, res);
            }

        })
    });

});

server.listen(PORT, () => { console.log(`Server on port ${PORT}`) });
