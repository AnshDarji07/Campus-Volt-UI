import { motion } from "motion/react";
import { Zap, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

interface UsageMonitorProps {
  currentUsage: number;
  threshold: number;
}

export function UsageMonitor({ currentUsage, threshold }: UsageMonitorProps) {
  const percentage = Math.min((currentUsage / threshold) * 100, 100);
  
  const getColorClass = () => {
    if (percentage < 60) return "from-green-500 to-emerald-500";
    if (percentage < 80) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-rose-500";
  };

  return (
    <div className="grid gap-6">
      {/* Main Monitor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="size-5 text-blue-600" />
            Live Usage Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            {/* Circular Gauge */}
            <div className="relative w-64 h-64 mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="16"
                  className="text-gray-200 dark:text-gray-800"
                />
                <motion.circle
                  cx="128"
                  cy="128"
                  r="112"
                  fill="none"
                  strokeWidth="16"
                  strokeLinecap="round"
                  className={`bg-gradient-to-br ${getColorClass()}`}
                  style={{
                    stroke: percentage < 60 ? "#10b981" : percentage < 80 ? "#f59e0b" : "#ef4444",
                  }}
                  strokeDasharray={`${2 * Math.PI * 112}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 112 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 112 * (1 - percentage / 100),
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold mb-2">
                    {currentUsage.toFixed(1)}
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400">kWh</div>
                  <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    of {threshold} kWh
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Usage Progress</span>
                <span className="font-semibold">{percentage.toFixed(1)}%</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>
          </div>

          {/* Status Message */}
          <div className={`mt-6 p-4 rounded-lg ${
            percentage < 60 ? "bg-green-50 dark:bg-green-950/20" :
            percentage < 80 ? "bg-yellow-50 dark:bg-yellow-950/20" :
            "bg-red-50 dark:bg-red-950/20"
          }`}>
            <div className={`text-sm font-medium ${
              percentage < 60 ? "text-green-800 dark:text-green-400" :
              percentage < 80 ? "text-yellow-800 dark:text-yellow-400" :
              "text-red-800 dark:text-red-400"
            }`}>
              {percentage < 60 && "✓ Great! Your energy usage is under control."}
              {percentage >= 60 && percentage < 80 && "⚠ Moderate usage. Consider energy-saving measures."}
              {percentage >= 80 && "⚠️ High usage detected! Reduce consumption to avoid high bills."}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
                <p className="text-2xl font-bold mt-1">
                  {Math.max(threshold - currentUsage, 0).toFixed(1)} kWh
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
                <Zap className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Peak Hour</p>
                <p className="text-2xl font-bold mt-1">6-9 PM</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-950 rounded-lg">
                <TrendingUp className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Days Left</p>
                <p className="text-2xl font-bold mt-1">
                  {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate()}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg">
                <div className="size-6 text-green-600 dark:text-green-400 text-xl font-bold">
                  📅
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
