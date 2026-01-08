import OpenAI from "openai";
import dotenv from "dotenv";


dotenv.config();
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function analyzeTicketWithAI(subject, description) {
  const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    input: `
You are an AI customer support ticket classifier.

Return ONLY valid JSON in this exact format:
{
  "category": "Technical | Billing | Account | Feature Request | Bug Report",
  "priority": "Critical | High | Medium | Low",
  "department": "Engineering | Finance | Customer Success | Product",
  "keyIssues": ["issue1", "issue2"],
  "sentiment": "Frustrated | Neutral | Satisfied"
}

Ticket:
Subject: ${subject}
Description: ${description}
`
  });

  // 🔐 Safe JSON extraction
  const raw = response.output_text;
  const json = JSON.parse(raw.match(/\{[\s\S]*\}/)[0]);

  
  return json;
}