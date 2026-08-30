import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { EnergyReading } from "../../hooks/useEnergyData";
import { BarChart3 } from "lucide-react";

interface UsageChartProps {
  data: EnergyReading[];
}

export function UsageChart({ data }: UsageChartProps) {
  // Get current month data
  const now = new Date();
  const currentMonthData = data
    .filter((reading) => {
      const readingDate = new Date(reading.date);
      return (
        readingDate.getMonth() === now.getMonth() &&
        readingDate.getFullYear() === now.getFullYear()
      );
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((reading) => ({
      date: new Date(reading.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      usage: Number(reading.usage.toFixed(2)),
      cost: Number(reading.cost.toFixed(2)),
    }));

  // Daily average breakdown (mock data for pie chart)
  const breakdownData = [
    { name: "Lighting", value: 20, color: "#3b82f6" },
    { name: "AC/Heating", value: 35, color: "#ef4444" },
    { name: "Appliances", value: 25, color: "#10b981" },
    { name: "Electronics", value: 15, color: "#f59e0b" },
    { name: "Other", value: 5, color: "#8b5cf6" },
  ];

  // Weekly comparison
  const weeklyData = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayData = data.filter((reading) => {
      const readingDate = new Date(reading.date);
      return readingDate.toDateString() === date.toDateString();
    });
    const totalUsage = dayData.reduce((sum, r) => sum + r.usage, 0);
    weeklyData.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      usage: Number(totalUsage.toFixed(2)),
    });
  }

  return (
    <div className="grid gap-6">
      {/* Usage Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5 text-blue-600" />
            Usage Trend - Current Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentMonthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis
                  dataKey="date"
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                  label={{ value: "kWh", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  name="Usage (kWh)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Usage Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis
                  dataKey="day"
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                  label={{ value: "kWh", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="usage" fill="#10b981" radius={[8, 8, 0, 0]} name="Daily Usage (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Usage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Breakdown by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-80 w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {breakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-1 space-y-4">
              {breakdownData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
