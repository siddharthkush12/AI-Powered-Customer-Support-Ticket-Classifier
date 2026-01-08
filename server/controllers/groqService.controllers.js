import { analyzeTicketWithAI } from "../utils/groq.service.js";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

// Path to your local JSON database
const DB_PATH = path.resolve("data", "tickets.json");

// Helper to ensure the data folder and file exist
if (!fs.existsSync(path.dirname(DB_PATH))) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

export const analyzeTicketController = async (req, res) => {
  try {
    const { email, subject, description } = req.body;

    if (!email || !subject || !description) {
      return res.status(400).json({
        success: false,
        message: "email, subject and description are required"
      });
    }

    // 🤖 AI call
    const analysis = await analyzeTicketWithAI(subject, description);

    const newTicket = {
      id: uuidv4(), // Requirements ask for a unique ID
      email,
      subject,
      description,
      analysis,
      timestamp: new Date().toISOString()
    };

    // 💾 Storage Logic: Read, Update, Write
    const fileData = fs.readFileSync(DB_PATH, "utf-8");
    const tickets = JSON.parse(fileData);
    
    // Add to the beginning of the array so latest is first
    tickets.unshift(newTicket);
    
    // Save back to JSON file
    fs.writeFileSync(DB_PATH, JSON.stringify(tickets, null, 2));
    
    return res.status(200).json({
      success: true,
      data: newTicket
    });

  } catch (error) {
    console.error("AI Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "AI ticket analysis failed"
    });
  }
};

// New Controller function to fulfill GET /api/tickets requirement
export const getAllTicketsController = async (req, res) => {
  try {
    const fileData = fs.readFileSync(DB_PATH, "utf-8");
    const tickets = JSON.parse(fileData);
    
    // Return last 10 as per assignment "Nice to Have" / requirement
    return res.status(200).json({
      success: true,
      data: tickets.slice(0, 50)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Could not fetch tickets" });
  }
};