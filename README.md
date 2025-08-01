🏛 Court Data Fetcher

A full-stack web application that fetches Indian court case details using Playwright-based scraping and displays the results in a clean dashboard.
It provides a simple form to search case details by Case Type, Case Number, and Filing Year, and stores all past queries in a SQLite database.

🛠️ Tech Stack
Frontend: React (Vite)

Backend: Node.js, Express.js

Database: SQLite3

Web Scraping: Playwright (Chromium)

🔑 Key Features
1️⃣ Case Search & Scraping
Enter Case Type, Case Number, and Filing Year

Uses Playwright to scrape data from the eCourts website

Requires manual CAPTCHA entry for security reasons

2️⃣ Dashboard with Past Queries
Displays a table of all previously searched cases

Shows Parties, Filing Date, Next Hearing Date, and Order PDF link

3️⃣ Full-Stack Integration
Backend API built with Express.js

Stores data in SQLite for persistence

Frontend built using React (Vite)

🏠 Home Page
A clean and simple interface to input case details

Displays results after scraping is completed

Past queries table updates automatically

📄 Case Result Section
Shows the following details (if available):
✅ Parties involved
✅ Filing Date
✅ Next Hearing Date
✅ Link to the latest Order PDF

📊 Past Queries Table
Displays all saved searches

Columns: ID, Case Type, Case Number, Filing Year, Parties, Filing Date, Next Hearing, Order PDF

🌐 Project Setup
Clone the Repository
bash
Copy code
git clone https://github.com/shettyashith/court-data-fetcher.git
cd court-data-fetcher
Install Backend Dependencies
bash
Copy code
cd server
npm install
npx playwright install chromium
Start Backend
bash
Copy code
node index.js
✅ Server will run at http://localhost:5000

Install Frontend Dependencies
bash
Copy code
cd ../client
npm install
npm run dev
✅ Frontend runs at http://localhost:5173

📦 Folder Structure
bash
Copy code
court-data-fetcher/
├── client/        # React frontend
├── server/        # Node.js backend with Playwright + SQLite
├── court_queries.db # SQLite database file
└── README.md
📸 Screenshots
🔹 Home Page
(Add a screenshot of the input form here)

🔹 Case Result Display
(Add a screenshot of a successful search result)

🔹 Past Queries Table
(Add a screenshot of the table with saved case searches)

🚀 Future Improvements
✅ Add login authentication for personalized queries
✅ Deploy backend on Render / Railway and frontend on Vercel / Netlify
✅ Auto-solving CAPTCHA using OCR (future enhancement)

👨‍💻 Author
Developed by Ashith Shetty
🔗 hithub.com/shettyashith
