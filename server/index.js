const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const playwright = require("playwright");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to SQLite DB
const db = new sqlite3.Database("./court_queries.db", (err) => {
  if (err) console.error(err.message);
  else console.log("✅ Connected to SQLite DB");
});

// ✅ Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_type TEXT,
    case_number TEXT,
    filing_year TEXT,
    raw_response TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ✅ Fetch Case Data API (Playwright)
app.post("/api/query", async (req, res) => {
  const { case_type, case_number, filing_year } = req.body;

  try {
    const browser = await playwright.chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://services.ecourts.gov.in/ecourtindia_v6/");
    await page.waitForTimeout(3000);

    await page.click('text=Case Status');

    // ⚠️ Adjust selectors based on the actual page HTML
    await page.selectOption("#caseType", case_type);
    await page.fill("#caseNumber", case_number);
    await page.fill("#caseYear", filing_year);

    console.log("👉 Enter CAPTCHA manually in the opened browser...");

    await page.waitForTimeout(25000); // Wait for manual CAPTCHA entry
    await page.click("#searchBtn");
    await page.waitForTimeout(5000);

    // Extract data (dummy selectors - adjust as needed)
    const parties = await page.textContent("#partyName").catch(() => null);
    const filingDate = await page.textContent("#filingDate").catch(() => null);
    const nextHearing = await page.textContent("#hearingDate").catch(() => null);
    const pdfLink = await page.getAttribute("#orderPdf", "href").catch(() => null);

    const caseData = {
      parties: parties || "Not Found",
      filing_date: filingDate || "Not Found",
      next_hearing: nextHearing || "Not Found",
      latest_order: pdfLink ? `https://services.ecourts.gov.in${pdfLink}` : "No PDF",
    };

    await browser.close();

    db.run(
      `INSERT INTO queries (case_type, case_number, filing_year, raw_response)
       VALUES (?, ?, ?, ?)`,
      [case_type, case_number, filing_year, JSON.stringify(caseData)],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID, data: caseData });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ API to get all saved queries
app.get("/api/queries", (req, res) => {
  db.all(`SELECT * FROM queries ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(row => ({ ...row, raw_response: JSON.parse(row.raw_response) })));
  });
});

// ✅ Test API
app.get("/", (req, res) => {
  res.send("🚀 Court Data Fetcher API is running");
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
