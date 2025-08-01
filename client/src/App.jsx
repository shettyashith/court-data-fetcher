import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [caseType, setCaseType] = useState("CR");
  const [caseNumber, setCaseNumber] = useState("");
  const [filingYear, setFilingYear] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchHistory = () => {
    fetch("http://localhost:5000/api/queries")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          case_type: caseType,
          case_number: caseNumber,
          filing_year: filingYear,
        }),
      });

      const data = await res.json();
      setResult(data.data);
      fetchHistory();
    } catch (err) {
      alert("Error fetching case details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Court Data Fetcher</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Case Type</label>
          <select value={caseType} onChange={(e) => setCaseType(e.target.value)}>
            <option value="CR">CR</option>
            <option value="CIV">CIV</option>
          </select>
        </div>

        <div>
          <label>Case Number</label>
          <input
             placeholder="Enter Case Number"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Filing Year</label>
          <input
            placeholder="Enter Filing Year"
            value={filingYear}
            onChange={(e) => setFilingYear(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Fetching..." : "Get Case Details"}
        </button>
      </form>

      {result && (
        <div className="result">
          <h2>Case Details</h2>
          <p><b>Parties:</b> {result.parties}</p>
          <p><b>Filing Date:</b> {result.filing_date}</p>
          <p><b>Next Hearing:</b> {result.next_hearing}</p>
          <p>
            <b>Latest Order:</b>{" "}
            <a href={result.latest_order} target="_blank" rel="noreferrer">PDF</a>
          </p>
        </div>
      )}

      <h2>Past Queries</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Case Type</th>
            <th>Case Number</th>
            <th>Filing Year</th>
            <th>Parties</th>
            <th>Filing Date</th>
            <th>Next Hearing</th>
            <th>Order PDF</th>
          </tr>
        </thead>
        <tbody>
          {history.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.case_type}</td>
              <td>{row.case_number}</td>
              <td>{row.filing_year}</td>
              <td>{row.raw_response.parties}</td>
              <td>{row.raw_response.filing_date}</td>
              <td>{row.raw_response.next_hearing}</td>
              <td>
                <a
                  href={row.raw_response.latest_order}
                  target="_blank"
                  rel="noreferrer"
                >
                  PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
