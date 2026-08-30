import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Calculator, TrendingUp, Lightbulb } from "lucide-react";

interface BillEstimatorProps {
  currentUsage: number;
}

export function BillEstimator({ currentUsage }: BillEstimatorProps) {
  const [monthlyUsage, setMonthlyUsage] = useState(currentUsage);
  const [rate, setRate] = useState(6.5);
  const [fixedCharges, setFixedCharges] = useState(50);
  const [daysInMonth] = useState(30);

  // Tiered pricing (common in many regions)
  const calculateBill = () => {
    let cost = 0;
    let remainingUsage = monthlyUsage;

    // Tier 1: 0-100 kWh
    if (remainingUsage > 0) {
      const tier1 = Math.min(remainingUsage, 100);
      cost += tier1 * rate;
      remainingUsage -= tier1;
    }

    // Tier 2: 101-200 kWh (slightly higher rate)
    if (remainingUsage > 0) {
      const tier2 = Math.min(remainingUsage, 100);
      cost += tier2 * (rate * 1.15);
      remainingUsage -= tier2;
    }

    // Tier 3: 201+ kWh (highest rate)
    if (remainingUsage > 0) {
      cost += remainingUsage * (rate * 1.3);
    }

    return cost + fixedCharges;
  };

  const totalBill = calculateBill();
  const dailyCost = totalBill / daysInMonth;
  const avgDailyUsage = monthlyUsage / daysInMonth;

  // Savings tips
  const savingsTips = [
    { tip: "Switch to LED bulbs", savings: "₹200-400/month" },
    { tip: "Use AC at 24°C instead of 18°C", savings: "₹300-600/month" },
    { tip: "Unplug devices when not in use", savings: "₹150-250/month" },
    { tip: "Use natural light during day", savings: "₹100-200/month" },
    { tip: "Regular AC filter cleaning", savings: "₹200-350/month" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="size-5 text-blue-600" />
            Bill Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Monthly Usage Input */}
          <div className="space-y-3">
            <Label>Estimated Monthly Usage (kWh)</Label>
            <div className="flex gap-3 items-center">
              <Input
                type="number"
                value={monthlyUsage}
                onChange={(e) => setMonthlyUsage(Number(e.target.value))}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMonthlyUsage(currentUsage)}
              >
                Use Current
              </Button>
            </div>
            <Slider
              value={[monthlyUsage]}
              onValueChange={(value) => setMonthlyUsage(value[0])}
              max={1000}
              step={10}
              className="mt-2"
            />
          </div>

          {/* Rate Input */}
          <div className="space-y-3">
            <Label>Rate per kWh (₹)</Label>
            <Input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>

          {/* Fixed Charges */}
          <div className="space-y-3">
            <Label>Fixed Monthly Charges (₹)</Label>
            <Input
              type="number"
              value={fixedCharges}
              onChange={(e) => setFixedCharges(Number(e.target.value))}
            />
          </div>

          {/* Results */}
          <div className="pt-4 border-t space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated Bill</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                ₹{totalBill.toFixed(2)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Daily Cost</p>
                <p className="text-xl font-bold">₹{dailyCost.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Daily Usage</p>
                <p className="text-xl font-bold">{avgDailyUsage.toFixed(2)} kWh</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictions & Tips */}
      <div className="space-y-6">
        {/* Cost Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-purple-600" />
              Cost Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="text-sm">Next Month (same usage)</span>
                <span className="font-bold">₹{totalBill.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="text-sm">If usage +10%</span>
                <span className="font-bold text-red-600">
                  ₹{(totalBill * 1.1).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="text-sm">If usage -10%</span>
                <span className="font-bold text-green-600">
                  ₹{(totalBill * 0.9).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="text-sm">Quarterly (3 months)</span>
                <span className="font-bold">₹{(totalBill * 3).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="text-sm">Yearly (12 months)</span>
                <span className="font-bold">₹{(totalBill * 12).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Energy Saving Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="size-5 text-yellow-600" />
              Energy Saving Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savingsTips.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.tip}</p>
                  </div>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400 whitespace-nowrap ml-2">
                    {item.savings}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg border border-green-200 dark:border-green-900">
              <p className="text-sm font-medium mb-1">Potential Total Savings</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ₹950 - ₹1,800/month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
