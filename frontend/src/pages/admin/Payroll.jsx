import { FileText } from 'lucide-react';
import { useState } from 'react';
import './Payroll.css';

// ─── Sample Payroll Data ───────────────────────────────────────
const payrollData = [
  { empId: 'UAMS0456', name: 'Sarah Johnson', sub: 'UAMS0456', dept: 'IT', basic: '$350.00', allowances: '$5.00',  deductions: '$0.00', netPay: '$120.00', status: 'Paid'       },
  { empId: 'UAMS0456', name: 'Sarah Johnson', sub: 'UAMS0456', dept: 'HR', basic: '$350.00', allowances: '$20.00', deductions: '$0.00', netPay: '$200.00', status: 'Processing' },
  { empId: 'UAMS0456', name: 'Sarah Johnson', sub: 'UAMS0456', dept: 'HR', basic: '$330.00', allowances: '$10.00', deductions: '$0.00', netPay: '$135.00', status: 'Processing' },
  { empId: 'UAMS0456', name: 'Sarah Johnson', sub: 'UAMS0456', dept: 'HR', basic: '$450.00', allowances: '$5.00',  deductions: '$0.00', netPay: '$350.00', status: 'Processing' },
];

// ─── Chart Data (monthly values) ──────────────────────────────
const chartPoints = [30, 60, 45, 80, 55, 120, 95, 110, 75];
const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

// ─── SVG Line Chart ────────────────────────────────────────────
const LineChart = () => {
  const width  = 300;
  const height = 110;
  const maxVal = 150;
  const padX   = 10;
  const padY   = 10;

  const points = chartPoints.map((val, i) => {
    const x = padX + (i / (chartPoints.length - 1)) * (width - padX * 2);
    const y = height - padY - (val / maxVal) * (height - padY * 2);
    return `${x},${y}`;
  });

  const polyline = points.join(' ');

  // Build fill path
  const firstX = padX;
  const lastX  = padX + (width - padX * 2);
  const baseY  = height - padY;
  const fill   = `${padX},${baseY} ${polyline} ${lastX},${baseY}`;

  // Y-axis labels
  const yLabels = [0, 50, 100, 150];

  return (
    <div className="chart-svg-wrap">
      <svg viewBox={`0 0 ${width} ${height + 30}`} className="chart-svg" preserveAspectRatio="none">
        {/* Y-axis labels */}
        {yLabels.map((label) => {
          const y = height - padY - (label / maxVal) * (height - padY * 2);
          return (
            <text key={label} x="2" y={y + 3} fontSize="7" fill="#a0aec0">{label}</text>
          );
        })}

        {/* Fill area */}
        <polygon
          points={fill}
          fill="rgba(45,156,138,0.12)"
        />

        {/* Line */}
        <polyline
          points={polyline}
          fill="none"
          stroke="#2d9c8a"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Dots */}
        {points.map((pt, i) => {
          const [x, y] = pt.split(',').map(Number);
          return <circle key={i} cx={x} cy={y} r="3" fill="#2d9c8a" />;
        })}

        {/* X-axis labels */}
        {chartLabels.map((label, i) => {
          const x = padX + (i / (chartPoints.length - 1)) * (width - padX * 2);
          return (
            <text key={label} x={x} y={height + 20} fontSize="7" fill="#a0aec0" textAnchor="middle">
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// ─── Status Badge ──────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const classMap = {
    Paid:       'pr-badge pr-badge-paid',
    Processing: 'pr-badge pr-badge-processing',
    Pending:    'pr-badge pr-badge-pending',
    Failed:     'pr-badge pr-badge-failed',
  };
  return <span className={classMap[status] || 'pr-badge'}>{status}</span>;
};

// ─── Main Component ────────────────────────────────────────────
const Payroll = () => {
  const [month, setMonth] = useState('October 2023');

  const months = [
    'January 2023', 'February 2023', 'March 2023', 'April 2023',
    'May 2023', 'June 2023', 'July 2023', 'August 2023',
    'September 2023', 'October 2023', 'November 2023', 'December 2023',
  ];

  return (
    <div className="pr-page">

      {/* ── Header ── */}
      <header className="pr-header">
        <h1 className="pr-title">UAMS PAYROLL MODULE</h1>
      </header>

      {/* ── Body ── */}
      <div className="pr-body">

        {/* ── Payroll Summary Card ── */}
        <div className="pr-card">
          <div className="chart-top">
            <div className="pr-card-title">Monthly Payroll Summary</div>
            <div className="month-select-wrap">
              <span>Month</span>
              <select
                className="month-select"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="chart-area">
            {/* SVG Line Chart */}
            <LineChart />

            {/* Stats */}
            <div className="chart-stats">
              <div className="chart-stat-item">
                <div className="chart-stat-label">Total Employees paid</div>
                <div className="chart-stat-value">133</div>
              </div>
              <div className="chart-stat-item">
                <div className="chart-stat-label">Total Payroll Amount</div>
                <div className="chart-stat-value teal">$12,150.00</div>
              </div>
              <div className="chart-stat-item">
                <div className="chart-stat-label">Pending</div>
                <div className="chart-stat-value">0</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Payroll List Card ── */}
        <div className="pr-card">
          <div className="pl-header-row">
            <div className="pr-card-title">Payroll List</div>
            <button className="btn-view-payslip">
              <FileText size={15} />
              View Payslip
            </button>
          </div>

          <div className="pr-table-wrap">
            <table className="pr-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Basic Salary</th>
                  <th>Allowances</th>
                  <th>Deductions</th>
                  <th>Net Pay</th>
                  <th>Payslip</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payrollData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="pr-emp-id">{row.empId}</div>
                    </td>
                    <td>
                      <div className="pr-emp-name">{row.name}</div>
                      <div className="pr-emp-sub">{row.sub}</div>
                    </td>
                    <td>{row.dept}</td>
                    <td>{row.basic}</td>
                    <td>{row.allowances}</td>
                    <td>{row.deductions}</td>
                    <td>{row.netPay}</td>
                    <td>
                      <button className="payslip-icon-btn" title="View Payslip">
                        <FileText size={15} color="#4a5568" />
                      </button>
                    </td>
                    <td>
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Payroll;