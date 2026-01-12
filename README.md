🧠 AI-Powered Customer Support Ticket Classifier

An AI-powered customer support ticket management system that automatically analyzes incoming support requests and classifies them by category, priority, department, and sentiment using a Large Language Model.

The application provides a searchable and filterable ticket history dashboard with pagination and CSV export support.

⸻

✨ Features
• 🤖 AI-based ticket classification
• 🏷️ Category, priority, department & sentiment detection
• 🔍 Search and filter ticket history
• 📄 Client-side pagination
• 📤 Export tickets to CSV (Excel compatible)
• 💾 Persistent storage using SQLite
• 📊 Clean UI with expandable ticket details

🗂️ Project Structure
AI-Powered-Customer-Support-Ticket-Classifier/
│
├── client/ # Frontend (React + Redux)
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── store/ # Redux slices & async thunks
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
├── server/ # Backend (Node.js + Express)
│ ├── controllers/ # API controllers
│ ├── routes/ # API routes
│ ├── utils/ # AI service logic
│ ├── db/ # SQLite database (tickets.db)
│ ├── app.js
│ └── server.js
│
├── .env.example # Environment variable template
├── README.md
└── package.json

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com//AI-Powered-Customer-Support-Ticket-Classifier.git
cd AI-Powered-Customer-Support-Ticket-Classifier
2️⃣ Backend Setup
cd server
npm install
npm run dev
3️⃣ Frontend Setup
cd ../client
npm install
npm run dev

🔐 Environment Variables
Create a .env file in the server directory.
PORT=9000
GROQ_API_KEY=your_api_key_here
Frontend .env (client):
VITE_BACKEND=http://localhost:9000

📡 API Documentation

Analyze Ticket

POST /api/tickets/analyze

Request body:
{
“email”: “user@example.com”,
“subject”: “Login issue”,
“description”: “Unable to login after password reset”
}
Response:
{
“success”: true,
“data”: {
“id”: “uuid”,
“email”: “user@example.com”,
“subject”: “Login issue”,
“description”: “…”,
“analysis”: {
“category”: “Technical”,
“priority”: “High”,
“department”: “Engineering”,
“keyIssues”: [“login failure”],
“sentiment”: “Frustrated”
},
“timestamp”: “2026-01-10T12:30:00Z”
}
}

🧠 AI Prompt Strategy

The AI prompt is designed to produce structured and predictable output.

The model is instructed to:
• Act as a ticket classifier
• Return only valid JSON
• Use a controlled vocabulary

Output format:
{
“category”: “Technical | Billing | Account | Feature Request | Bug Report”,
“priority”: “Critical | High | Medium | Low”,
“department”: “Engineering | Finance | Customer Success | Product”,
“keyIssues”: [“issue1”, “issue2”],
“sentiment”: “Frustrated | Neutral | Satisfied”
}

💾 Data Storage
• Uses SQLite (db/tickets.db)
• File-based persistent storage
• Suitable for small to medium-scale apps
• Easy migration to MongoDB or PostgreSQL
``
