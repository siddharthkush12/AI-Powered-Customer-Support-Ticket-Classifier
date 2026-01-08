import express from "express";
import { 
  analyzeTicketController, 
  getAllTicketsController 
} from "../controllers/groqService.controllers.js";

const router = express.Router();

// POST /api/tickets/analyze
router.post("/analyze", analyzeTicketController);

// GET /api/tickets
router.get("/", getAllTicketsController);

export default router;