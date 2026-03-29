import React from "react";
import "./ReportPage.css";

export default function ReportPage({
  title,
  accentColor,
  filters,
  filterValues,
  onFilterChange,
  onGenerate,
  summaryCards,
  tableHeaders,
  tableRows,
  setActiveReport,
  emptyMessage = "No data found for the selected filters.",
}) {
  return (
    <div className="rpage-root">
      <div className="rpage-wrapper">

        {/* Back Button */}
        <button className="rpage-back-btn" onClick={() => setActiveReport(null)}>
          ← Back to Reports
        </button>

        {/* Title Row */}
        <div className="rpage-title-row">
          <h1 className="rpage-title">{title}</h1>
          <div className="rpage-actions">
            {/* <button className="rpage-btn rpage-btn-outline" onClick={() => window.print()}>
              🖨 Download PDF
            </button> */}
            {/* <button className="rpage-btn rpage-btn-outline">
              📊 Export Excel
            </button> */}
            <button
              className="rpage-btn rpage-btn-primary"
              onClick={onGenerate}
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="rpage-filter-card">
          <p className="rpage-filter-heading">Filters</p>
          <div className="rpage-filters">
            {filters.map((f) =>
              f.type === "select" ? (
                <div key={f.name} className="rpage-filter-group">
                  <label>{f.label}</label>
                  <select
                    value={filterValues[f.name] || ""}
                    onChange={(e) => onFilterChange(f.name, e.target.value)}
                  >
                    <option value="">All</option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div key={f.name} className="rpage-filter-group">
                  <label>{f.label}</label>
                  <input
                    type="date"
                    value={filterValues[f.name] || ""}
                    onChange={(e) => onFilterChange(f.name, e.target.value)}
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="rpage-summary-grid">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rpage-summary-card"
              style={{ borderLeftColor: card.color }}
            >
              <span className="rpage-summary-icon">{card.icon}</span>
              <div>
                <p className="rpage-summary-value">{card.value}</p>
                <p className="rpage-summary-label">{card.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rpage-table-card">
          <div className="rpage-table-scroll">
            <table className="rpage-table">
              <thead>
                <tr>
                  {tableHeaders.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.length === 0 ? (
                  <tr>
                    <td colSpan={tableHeaders.length} className="rpage-empty-cell">
                      📭 {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  tableRows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>
                          {cell && typeof cell === "object" && cell.badge ? (
                            <span className={`rpage-badge rpage-badge-${cell.variant}`}>
                              {cell.text}
                            </span>
                          ) : cell}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}