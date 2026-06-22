import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AttendanceChart = ({ data }) => { 
  const COLORS = [
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f59e0b", // Orange
    "#8b5cf6", // Purple
    "#ef4444", // Red
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="program" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Bar dataKey="attendance" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>{" "}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
