import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Download,
  Mail,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { UsageMonitor } from "./dashboard/UsageMonitor";
import { UsageChart } from "./dashboard/UsageChart";
import { MonthlyHistory } from "./dashboard/MonthlyHistory";
import { AddUsageDialog } from "./dashboard/AddUsageDialog";
import { BillEstimator } from "./dashboard/BillEstimator";
import { ComparisonChart } from "./dashboard/ComparisonChart";
import { PowerForecasting } from "./dashboard/PowerForecasting";
import { useEnergyData } from "../hooks/useEnergyData";
import { exportToExcel, exportToPDF, sendEmailBill } from "../utils/export";
import { toast } from "sonner";
import { Alert, AlertDescription } from "./ui/alert";

export function Dashboard() {
  const { data, addReading, currentUsage, monthlyStats, getUsageStatus } = useEnergyData();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  
  const usageStatus = getUsageStatus();
  const showAlert = usageStatus.percentage >= 80;

  const handleExportExcel = () => {
    exportToExcel(data, monthlyStats);
    toast.success("Excel file downloaded successfully!");
  };

  const handleExportPDF = () => {
    exportToPDF(data, monthlyStats, currentUsage);
    toast.success("PDF report generated successfully!");
  };

  const handleSendEmail = () => {
    sendEmailBill(currentUsage, monthlyStats);
    toast.success("Bill sent to your email! (Demo mode)");
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Energy Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your electricity consumption and manage your energy costs
          </p>
        </motion.div>

        {/* Alert for high usage */}
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <Alert className="border-red-500 bg-red-50 dark:bg-red-950/20">
              <AlertTriangle className="size-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-400">
                Warning: Your electricity usage has exceeded {usageStatus.percentage}% of your monthly threshold!
                Consider reducing consumption to avoid high bills.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-6"
        >
          <Button
            onClick={() => setAddDialogOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            <Plus className="size-4 mr-2" />
            Add Reading
          </Button>
          <Button onClick={handleExportExcel} variant="outline">
            <Download className="size-4 mr-2" />
            Export Excel
          </Button>
          <Button onClick={handleExportPDF} variant="outline">
            <Download className="size-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={handleSendEmail} variant="outline">
            <Mail className="size-4 mr-2" />
            Email Bill
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Current Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUsage.toFixed(2)} kWh</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Estimated Bill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{monthlyStats.estimatedCost.toFixed(2)}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                @ ₹{monthlyStats.rate}/kWh
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Avg Daily Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.avgDaily.toFixed(2)} kWh</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Per day
              </p>
            </CardContent>
          </Card>

          <Card className={`border-l-4 ${
            usageStatus.status === "low" ? "border-l-green-500" :
            usageStatus.status === "medium" ? "border-l-yellow-500" :
            "border-l-red-500"
          }`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Usage Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageStatus.percentage}%</div>
              <p className={`text-sm mt-1 ${
                usageStatus.status === "low" ? "text-green-600 dark:text-green-400" :
                usageStatus.status === "medium" ? "text-yellow-600 dark:text-yellow-400" :
                "text-red-600 dark:text-red-400"
              }`}>
                {usageStatus.status === "low" ? "On Track" :
                 usageStatus.status === "medium" ? "Moderate" :
                 "High Usage"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="monitor" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
              <TabsTrigger value="monitor" className="text-sm">
                Live Monitor
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="history" className="text-sm">
                History
              </TabsTrigger>
              <TabsTrigger value="comparison" className="text-sm">
                Comparison
              </TabsTrigger>
              <TabsTrigger value="estimator" className="text-sm">
                Bill Estimator
              </TabsTrigger>
              <TabsTrigger value="forecast" className="text-sm">
                AI Forecast
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monitor" className="space-y-6">
              <UsageMonitor currentUsage={currentUsage} threshold={monthlyStats.threshold} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <UsageChart data={data} />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <MonthlyHistory data={data} />
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <ComparisonChart data={data} />
            </TabsContent>

            <TabsContent value="estimator" className="space-y-6">
              <BillEstimator currentUsage={currentUsage} />
            </TabsContent>

            <TabsContent value="forecast" className="space-y-6">
              <PowerForecasting />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <AddUsageDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={addReading}
      />
    </div>
  );
}
