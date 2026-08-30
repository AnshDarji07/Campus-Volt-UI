import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { EnergyReading } from "../../hooks/useEnergyData";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "../ui/badge";

interface MonthlyHistoryProps {
  data: EnergyReading[];
}

export function MonthlyHistory({ data }: MonthlyHistoryProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Get available months and years
  const availableYears = Array.from(new Set(data.map((r) => new Date(r.date).getFullYear()))).sort((a, b) => b - a);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Filter data by selected month/year
  const filteredData = data
    .filter((reading) => {
      const date = new Date(reading.date);
      return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Calculate monthly totals
  const monthlyTotal = filteredData.reduce((sum, r) => sum + r.usage, 0);
  const monthlyCost = filteredData.reduce((sum, r) => sum + r.cost, 0);
  const avgDaily = monthlyTotal / new Date(selectedYear, selectedMonth + 1, 0).getDate();

  // Get previous month data for comparison
  const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
  const prevYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
  const prevMonthData = data.filter((reading) => {
    const date = new Date(reading.date);
    return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
  });
  const prevMonthTotal = prevMonthData.reduce((sum, r) => sum + r.usage, 0);
  const changePercent = prevMonthTotal > 0 ? ((monthlyTotal - prevMonthTotal) / prevMonthTotal) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Month/Year Selector */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-blue-600" />
              Monthly History
            </CardTitle>
            <div className="flex gap-3">
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => setSelectedMonth(parseInt(value))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Monthly Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Usage</p>
              <p className="text-2xl font-bold">{monthlyTotal.toFixed(2)} kWh</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Cost</p>
              <p className="text-2xl font-bold">₹{monthlyCost.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Daily</p>
              <p className="text-2xl font-bold">{avgDaily.toFixed(2)} kWh</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">vs Last Month</p>
              <div className="flex items-center gap-2">
                {changePercent >= 0 ? (
                  <>
                    <TrendingUp className="size-5 text-red-500" />
                    <span className="text-2xl font-bold text-red-500">
                      +{Math.abs(changePercent).toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="size-5 text-green-500" />
                    <span className="text-2xl font-bold text-green-500">
                      {changePercent.toFixed(1)}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Readings Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Usage (kWh)</TableHead>
                  <TableHead>Rate (₹/kWh)</TableHead>
                  <TableHead>Cost (₹)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No data available for this month
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((reading) => {
                    const status =
                      reading.usage < 15
                        ? "low"
                        : reading.usage < 25
                        ? "medium"
                        : "high";
                    return (
                      <TableRow key={reading.id}>
                        <TableCell>
                          {new Date(reading.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="font-medium">
                          {reading.usage.toFixed(2)}
                        </TableCell>
                        <TableCell>₹{reading.rate.toFixed(2)}</TableCell>
                        <TableCell>₹{reading.cost.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              status === "low"
                                ? "default"
                                : status === "medium"
                                ? "secondary"
                                : "destructive"
                            }
                            className={
                              status === "low"
                                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                                : status === "medium"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                                : ""
                            }
                          >
                            {status === "low" ? "Low" : status === "medium" ? "Medium" : "High"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
