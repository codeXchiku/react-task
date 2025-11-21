import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const sampleData = [
  { date: "2025-10-01", value: 240, category: "A" },
  { date: "2025-10-02", value: 139, category: "B" },
  { date: "2025-10-03", value: 980, category: "A" },
  { date: "2025-10-04", value: 390, category: "C" },
  { date: "2025-10-05", value: 480, category: "B" },
  { date: "2025-10-06", value: 380, category: "A" },
  { date: "2025-10-07", value: 430, category: "C" },
  { date: "2025-10-08", value: 520, category: "B" },
  { date: "2025-10-09", value: 610, category: "A" },
  { date: "2025-10-10", value: 700, category: "C" },
];

const COLORS = ["#7C3AED", "#34D399", "#FBBF24", "#F472B6", "#60A5FA"];

function formatDateISO(dateStr) {
  return new Date(dateStr).toISOString().slice(0, 10);
}

function parseISO(dateStr) {
  return new Date(dateStr + "T00:00:00");
}

function aggregateByCategory(data) {
  const map = {};
  data.forEach((d) => {
    map[d.category] = (map[d.category] || 0) + d.value;
  });
  return Object.keys(map).map((k) => ({ name: k, value: map[k] }));
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const p = payload[0];
    return (
      <div className="bg-white p-2.5 rounded-md shadow-md text-xs border border-gray-200">
        <div className="font-semibold text-gray-800">{label}</div>
        <div className="mt-1 text-gray-700">
          Value: <span className="font-semibold text-purple-600">{p.value}</span>
        </div>
        {p.payload && p.payload.category && (
          <div className="text-[11px] text-gray-500 mt-0.5">
            Category: {p.payload.category}
          </div>
        )}
      </div>
    );
  }
  return null;
}

function CustomLegend({ payload }) {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center text-xs mt-2">
      {payload.map((entry, idx) => (
        <div key={`legend-${idx}`} className="flex items-center gap-1 text-gray-700">
          <span
            className="inline-block w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

const Chart = () => {
  const [chartType, setChartType] = useState("line");
  const [from, setFrom] = useState(formatDateISO(sampleData[0].date));
  const [to, setTo] = useState(formatDateISO(sampleData[sampleData.length - 1].date));

  const filteredData = useMemo(() => {
    const start = parseISO(from);
    const end = parseISO(to);
    end.setHours(23, 59, 59, 999);
    return sampleData
      .filter((d) => {
        const dt = parseISO(d.date);
        return dt >= start && dt <= end;
      })
      .map((d) => ({ ...d, displayDate: d.date }));
  }, [from, to]);

  const pieData = useMemo(() => aggregateByCategory(filteredData), [filteredData]);

  return (
  <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white min-h-screen mt-6 sm:mt-10">
    
    {/* FILTER BAR */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">

      {/* Chart Type */}
      <div className="flex items-center gap-2 sm:gap-3">
        <label className="text-sm font-medium text-gray-700">Chart Type</label>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white 
                     focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="line">Line</option>
          <option value="bar">Bar</option>
          <option value="pie">Pie</option>
        </select>
      </div>

      {/* Date Filters */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white border border-gray-200 p-2 rounded-lg shadow-sm">

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">From</span>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="text-xs p-2 border border-gray-300 rounded focus:ring-1 focus:ring-purple-300"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">To</span>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="text-xs p-2 border border-gray-300 rounded focus:ring-1 focus:ring-purple-300"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 ml-auto sm:ml-3 mt-1 sm:mt-0">
          <button
            onClick={() => {
              const maxDate = parseISO(sampleData[sampleData.length - 1].date);
              const fromDate = new Date(maxDate);
              fromDate.setDate(fromDate.getDate() - 6);
              setFrom(formatDateISO(fromDate.toISOString().slice(0, 10)));
              setTo(formatDateISO(maxDate.toISOString().slice(0, 10)));
            }}
            className="text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 font-medium"
          >
            7d
          </button>

          <button
            onClick={() => {
              const maxDate = parseISO(sampleData[sampleData.length - 1].date);
              const fromDate = new Date(maxDate);
              fromDate.setDate(fromDate.getDate() - 29);
              setFrom(formatDateISO(fromDate.toISOString().slice(0, 10)));
              setTo(formatDateISO(maxDate.toISOString().slice(0, 10)));
            }}
            className="text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 font-medium"
          >
            30d
          </button>

          <button
            onClick={() => {
              setFrom(formatDateISO(sampleData[0].date));
              setTo(formatDateISO(sampleData[sampleData.length - 1].date));
            }}
            className="text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 font-medium"
          >
            All
          </button>
        </div>
      </div>
    </div>

    {/* CHART CARD */}
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
        <h3 className="text-base font-semibold text-gray-800">
          Interactive Chart
        </h3>
        <span className="text-xs text-gray-500 mt-1 sm:mt-0">
          Showing {filteredData.length} point(s)
        </span>
      </div>

      {/* FIXED RESPONSIVE CHART AREA */}
      <div className="w-full min-w-[300px] h-[300px] sm:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" && (
            <LineChart
              data={filteredData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="displayDate" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={COLORS[0]}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          )}

          {chartType === "bar" && (
            <BarChart
              data={filteredData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="displayDate" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Bar
                dataKey="value"
                fill={COLORS[1]}
                radius={[4, 4, 0, 0]}
                barSize={22}
              />
            </BarChart>
          )}

          {chartType === "pie" && (
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                wrapperStyle={{ fontSize: "11px", marginTop: "5px" }}
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

};

export default Chart;
