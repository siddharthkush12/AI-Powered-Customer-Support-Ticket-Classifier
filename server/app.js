import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

/* ✅ CORS – THIS IS ENOUGH */
app.use(
  cors({
    origin: ["http://localhost:5173",""], // frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
            "Accept",
            "Origin"
        ],
    credentials: true,
  })
);

/* ✅ Body parsers */
app.use(express.json({
    limit:"16kb",
}));
app.use(express.urlencoded({ extended: true }));

/* ✅ Routes */
app.use("/api/tickets", aiRoutes);

export { app };