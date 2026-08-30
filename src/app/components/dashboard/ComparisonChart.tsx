import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { EnergyReading } from "../../hooks/useEnergyData";
import { GitCompare } from "lucide-react";

interface ComparisonChartProps {
  data: EnergyReading[];
}

export function ComparisonChart({ data }: ComparisonChartProps) {
  // Get last 6 months of data
  const now = new Date();
  const monthlyData = [];
  
  for (let i = 5; i >= 0; i--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = targetDate.getMonth();
    const year = targetDate.getFullYear();
    
    const monthData = data.filter((reading) => {
      const readingDate = new Date(reading.date);
      return readingDate.getMonth() === month && readingDate.getFullYear() === year;
    });
    
    const totalUsage = monthData.reduce((sum, r) => sum + r.usage, 0);
    const totalCost = monthData.reduce((sum, r) => sum + r.cost, 0);
    
    monthlyData.push({
      month: targetDate.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
      usage: Number(totalUsage.toFixed(2)),
      cost: Number(totalCost.toFixed(2)),
    });
  }

  // Year over year comparison
  const currentYear = now.getFullYear();
  const yearlyComparison = [];
  
  for (let month = 0; month < 12; month++) {
    const currentYearData = data.filter((reading) => {
      const date = new Date(reading.date);
      return date.getFullYear() === currentYear && date.getMonth() === month;
    });
    
    const previousYearData = data.filter((reading) => {
      const date = new Date(reading.date);
      return date.getFullYear() === currentYear - 1 && date.getMonth() === month;
    });
    
    yearlyComparison.push({
      month: new Date(currentYear, month).toLocaleDateString("en-US", { month: "short" }),
      current: Number(currentYearData.reduce((sum, r) => sum + r.usage, 0).toFixed(2)),
      previous: Number(previousYearData.reduce((sum, r) => sum + r.usage, 0).toFixed(2)),
    });
  }

  // Calculate trends
  const avgCurrent = monthlyData.reduce((sum, m) => sum + m.usage, 0) / monthlyData.length;
  const trend = monthlyData.length >= 2 
    ? ((monthlyData[monthlyData.length - 1].usage - monthlyData[0].usage) / monthlyData[0].usage) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">6-Month Average</p>
            <p className="text-3xl font-bold">{avgCurrent.toFixed(1)} kWh</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Usage Trend</p>
            <p className={`text-3xl font-bold ${trend >= 0 ? "text-red-500" : "text-green-500"}`}>
              {trend >= 0 ? "+" : ""}{trend.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Best Month</p>
            <p className="text-3xl font-bold">
              {monthlyData.length > 0 
                ? monthlyData.reduce((min, m) => m.usage < min.usage ? m : min).month 
                : "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 6-Month Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="size-5 text-blue-600" />
            6-Month Usage & Cost Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis
                  dataKey="month"
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                />
                <YAxis
                  yAxisId="left"
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                  label={{ value: "Usage (kWh)", angle: -90, position: "insideLeft" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                  label={{ value: "Cost (₹)", angle: 90, position: "insideRight" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="usage" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Usage (kWh)" />
                <Bar yAxisId="right" dataKey="cost" fill="#10b981" radius={[8, 8, 0, 0]} name="Cost (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Year over Year */}
      <Card>
        <CardHeader>
          <CardTitle>Year-over-Year Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyComparison}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis
                  dataKey="month"
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "currentColor" }}
                  label={{ value: "Usage (kWh)", angle: -90, position: "insideLeft" }}
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
                  dataKey="current"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  name={`${currentYear}`}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: "#9ca3af", r: 4 }}
                  name={`${currentYear - 1}`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
