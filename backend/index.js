const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./src/DB/connect-db");
const routes = require("./src/routes");


const port = process.env.PORT || 8080;

const app = express();
// ----- middlewares ----
app.use(cors({ origin: "*" }));
app.use(express.json());
dotenv.config();

app.use('/v1', routes)

app.get("/", (req, res) => {
    res.status(200).json({ message: "backend is live" });
});

// ------ error handler (correct format) -----
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
});

// --- catch-all route (Express 5 compatible) ---
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// ---- connect to database and start server ---
connectToDatabase()
    .then(() => {
        console.log("DB connected");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Server start failed", err);
    });
