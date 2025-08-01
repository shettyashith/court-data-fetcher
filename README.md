🏛 Court Data Fetcher

A full-stack web application that fetches Indian court case details using Playwright-based scraping and displays the results in a clean dashboard.
It provides a simple form to search case details by Case Type, Case Number, and Filing Year, and stores all past queries in a SQLite database.


🛠️ Tech Stack:

Frontend: React (Vite)

Backend: Node.js, Express.js

Database: SQLite3

Web Scraping: Playwright (Chromium)


🔑 Key Features:

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


🏠 Home Page:

A clean and simple interface to input case details

Displays results after scraping is completed

Past queries table updates automatically


📄 Case Result Section:

Shows the following details (if available):

✅ Parties involved

✅ Filing Date

✅ Next Hearing Date

✅ Link to the latest Order PDF


📊 Past Queries Table:

Displays all saved searches

Columns: ID, Case Type, Case Number, Filing Year, Parties, Filing Date, Next Hearing, Order PDF



🌐 Project Setup:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shettyashith/court-data-fetcher.git
   cd court-data-fetcher
   ```
2. **Install Dependencies**:
   ```bash
   cd server
   npm install
   npx playwright install chromium
   ```
3. **Start Backend**:
   ```bash
   node index.js
   ```
4. **Install Dependencies**:
   ```bash
   cd ../client
   npm install
   ```
5.**Run the Application**:
   ```bash
   npm run dev
   ```

✅ Server will run at http://localhost:5000


## 📦 Folder Structure

```plaintext
court-data-fetcher/
├── client/           # React frontend
├── server/           # Node.js backend (Express.js + Playwright + SQLite)
├── court_queries.db  # SQLite database file
└── README.md
```


🚀 Future Improvements:

✅ Add login authentication for personalized queries

✅ Deploy backend and frontend

✅ Auto-solving CAPTCHA using OCR (future enhancement)


👨‍💻 Author:
Developed by Ashith Shetty
🔗 hithub.com/shettyashith
