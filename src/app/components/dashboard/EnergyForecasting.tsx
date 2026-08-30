import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3, AlertCircle, Loader2, RotateCcw, Thermometer, Users,
  CalendarClock, Building2, Gauge, CloudSun, Zap, Clock, TrendingUp, AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const ENERGY_API_URL = "http://127.0.0.1:8000/forecast/energy";

const METER_IDS = ["M001", "M002", "M003", "M004", "M005"];
const BUILDING_IDS = ["B001", "B002", "B003", "B004", "B005"];
const WEATHER_CONDITIONS = ["Sunny", "Cloudy", "Rainy", "Stormy"];

interface EnergyFormValues {
  forecastDateTime: string;
  meterId: string;
  buildingId: string;
  temperature: string;
  weatherCondition: string;
  occupancyLevel: string;
}

const defaultForm: EnergyFormValues = {
  forecastDateTime: "",
  meterId: "",
  buildingId: "",
  temperature: "",
  weatherCondition: "",
  occupancyLevel: "",
};

interface EnergyForecastResult {
  predicted_daily_kwh: number;
  predicted_weekly_kwh: number;
  predicted_monthly_kwh: number;
  high_consumption_periods: string[];
  unusual_increases: string[];
  unit: string;
  status: string;
  model_type?: string;
}

function toISODateTime(value: string): string {
  return value.length === 16 ? `${value}:00` : value;
}

function getConsumptionColor(kwh: number, scale: "daily" | "weekly" | "monthly") {
  const thresholds = { daily: [50, 100], weekly: [350, 700], monthly: [1500, 3000] };
  const [low, high] = thresholds[scale];
  if (kwh < low) return "text-green-600 dark:text-green-400";
  if (kwh < high) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

function getConsumptionBadge(kwh: number, scale: "daily" | "weekly" | "monthly"): "default" | "secondary" | "destructive" {
  const thresholds = { daily: [50, 100], weekly: [350, 700], monthly: [1500, 3000] };
  const [low, high] = thresholds[scale];
  if (kwh < low) return "default";
  if (kwh < high) return "secondary";
  return "destructive";
}

export function EnergyForecasting() {
  const [form, setForm] = useState<EnergyFormValues>(defaultForm);
  const [result, setResult] = useState<EnergyForecastResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Partial<EnergyFormValues>>({});

  const validate = (): boolean => {
    const errors: Partial<EnergyFormValues> = {};
    if (!form.forecastDateTime) errors.forecastDateTime = "Select a forecast date and time";
    if (!form.meterId) errors.meterId = "Required";
    if (!form.buildingId) errors.buildingId = "Required";
    if (!form.weatherCondition) errors.weatherCondition = "Required";
    const temp = parseFloat(form.temperature);
    if (form.temperature === "" || isNaN(temp)) errors.temperature = "Enter a valid temperature";
    const occ = parseFloat(form.occupancyLevel);
    if (form.occupancyLevel === "" || isNaN(occ) || occ < 0 || occ > 100)
      errors.occupancyLevel = "Enter a percentage between 0 and 100";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleForecast = async () => {
    if (!validate()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      forecastDateTime: toISODateTime(form.forecastDateTime),
      meterId: form.meterId,
      buildingId: form.buildingId,
      temperature: parseFloat(form.temperature),
      weatherCondition: form.weatherCondition,
      occupancyLevel: parseFloat(form.occupancyLevel),
    };

    try {
      const response = await fetch(ENERGY_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server responded with ${response.status}: ${text || response.statusText}`);
      }
      setResult(await response.json());
    } catch (err) {
      if (err instanceof TypeError && err.message.toLowerCase().includes("fetch")) {
        setError("Cannot reach the energy forecasting server. Make sure the FastAPI backend is running and accessible.");
      } else {
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(defaultForm);
    setResult(null);
    setError(null);
    setValidationErrors({});
  };

  const setField = (field: keyof EnergyFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="space-y-6">
      {/* Form + side panel */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Input form */}
        <Card className="xl:col-span-3">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Energy Forecasting</CardTitle>
            <CardDescription>
              Provide the forecast conditions below. Hour, day of week, month, day type, and
              working hours are derived automatically from the selected date and time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">

            {/* Forecast Date & Time */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-sm font-medium">
                <CalendarClock className="size-3.5 text-blue-500" />
                Forecast Date and Time
              </Label>
              <Input
                type="datetime-local"
                value={form.forecastDateTime}
                onChange={(e) => setField("forecastDateTime", e.target.value)}
                className={validationErrors.forecastDateTime ? "border-red-500" : ""}
              />
              {validationErrors.forecastDateTime ? (
                <p className="text-xs text-red-500">{validationErrors.forecastDateTime}</p>
              ) : (
                <p className="text-xs text-gray-400">
                  Hour, day of week, month, day type, and working hours are automatically derived from this selection.
                </p>
              )}
            </div>

            {/* Meter ID + Building ID */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Gauge className="size-3.5 text-blue-500" />
                  Meter ID
                </Label>
                <Select value={form.meterId} onValueChange={(v) => setField("meterId", v)}>
                  <SelectTrigger className={validationErrors.meterId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select meter" />
                  </SelectTrigger>
                  <SelectContent>
                    {METER_IDS.map((id) => (
                      <SelectItem key={id} value={id}>{id}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.meterId && (
                  <p className="text-xs text-red-500">{validationErrors.meterId}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Building2 className="size-3.5 text-blue-500" />
                  Building ID
                </Label>
                <Select value={form.buildingId} onValueChange={(v) => setField("buildingId", v)}>
                  <SelectTrigger className={validationErrors.buildingId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select building" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUILDING_IDS.map((id) => (
                      <SelectItem key={id} value={id}>{id}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.buildingId && (
                  <p className="text-xs text-red-500">{validationErrors.buildingId}</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-1" />

            {/* Temperature + Occupancy */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Thermometer className="size-3.5 text-orange-500" />
                  Temperature
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 31.2"
                    value={form.temperature}
                    onChange={(e) => setField("temperature", e.target.value)}
                    className={`pr-8 ${validationErrors.temperature ? "border-red-500" : ""}`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">°C</span>
                </div>
                {validationErrors.temperature ? (
                  <p className="text-xs text-red-500">{validationErrors.temperature}</p>
                ) : (
                  <p className="text-xs text-gray-400">Expected ambient temperature</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Users className="size-3.5 text-purple-500" />
                  Expected Occupancy Level (%)
                </Label>
                <Input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  placeholder="e.g. 65"
                  value={form.occupancyLevel}
                  onChange={(e) => setField("occupancyLevel", e.target.value)}
                  className={validationErrors.occupancyLevel ? "border-red-500" : ""}
                />
                {validationErrors.occupancyLevel ? (
                  <p className="text-xs text-red-500">{validationErrors.occupancyLevel}</p>
                ) : (
                  <p className="text-xs text-gray-400">Enter occupancy percentage from 0 to 100.</p>
                )}
              </div>
            </div>

            {/* Weather Condition */}
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-sm font-medium">
                <CloudSun className="size-3.5 text-sky-500" />
                Weather Condition
              </Label>
              <Select value={form.weatherCondition} onValueChange={(v) => setField("weatherCondition", v)}>
                <SelectTrigger className={validationErrors.weatherCondition ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select weather condition" />
                </SelectTrigger>
                <SelectContent>
                  {WEATHER_CONDITIONS.map((w) => (
                    <SelectItem key={w} value={w}>{w}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.weatherCondition && (
                <p className="text-xs text-red-500">{validationErrors.weatherCondition}</p>
              )}
            </div>

            {/* Auto-derived fields indicator */}
            <div className="rounded-lg bg-blue-50/70 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 px-4 py-3">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1.5">
                Automatically derived from forecast date &amp; time
              </p>
              <div className="flex flex-wrap gap-2">
                {["Hour", "Day of Week", "Month", "Day Type", "Working Hours"].map((label) => (
                  <span
                    key={label}
                    className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button
                onClick={handleForecast}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 font-semibold h-11"
              >
                {loading ? (
                  <><Loader2 className="size-4 mr-2 animate-spin" />Generating Forecast…</>
                ) : (
                  <><BarChart3 className="size-4 mr-2" />Generate Energy Forecast</>
                )}
              </Button>
              <Button onClick={handleReset} variant="outline" disabled={loading} className="h-11" title="Reset form">
                <RotateCcw className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right panel: status / loading / empty */}
        <div className="xl:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            {error && !loading && (
              <motion.div key="error" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <Alert className="border-red-400 bg-red-50 dark:bg-red-950/20">
                  <AlertCircle className="size-4 text-red-600" />
                  <AlertDescription className="text-red-700 dark:text-red-400 text-sm leading-relaxed">{error}</AlertDescription>
                </Alert>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Check that the FastAPI server is running, then try again.
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="border-2 border-blue-100 dark:border-blue-900/40">
                  <CardContent className="flex flex-col items-center justify-center py-14 gap-4">
                    <div className="size-16 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                      <Loader2 className="size-8 text-blue-500 animate-spin" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-700 dark:text-gray-200">Generating energy forecast…</p>
                      <p className="text-sm text-gray-400 mt-1">Aggregating daily, weekly &amp; monthly projections</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {!result && !loading && !error && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="border-dashed border-2 border-gray-200 dark:border-gray-700">
                  <CardContent className="flex flex-col items-center justify-center py-14 gap-3 text-center">
                    <div className="size-14 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 flex items-center justify-center">
                      <BarChart3 className="size-7 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-600 dark:text-gray-300">No forecast yet</p>
                      <p className="text-sm text-gray-400 mt-1 max-w-[210px]">
                        Fill in the conditions and click <strong>Generate Energy Forecast</strong>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="bg-green-50/60 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="pt-4 pb-4 flex items-center gap-3">
                    <span className="size-2.5 rounded-full bg-green-500 flex-shrink-0" />
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      Forecast generated successfully — see results below.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info card */}
          <Card className="bg-blue-50/60 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/40">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2 uppercase tracking-wide">
                About this model
              </p>
              <ul className="text-xs text-blue-600/80 dark:text-blue-400/80 space-y-1">
                <li>• Forecasts daily, weekly, and monthly energy consumption</li>
                <li>• Time features derived from selected forecast datetime</li>
                <li>• Flags high-consumption windows and anomalous increases</li>
                <li>• Output unit is kilowatt-hours (kWh)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Results grid (visible only after a successful forecast) ── */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="space-y-4"
          >
            {/* Divider with label */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Forecast Results</span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Consumption summary — 3 stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Daily */}
              <Card className="border-2 border-blue-200 dark:border-blue-800 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500" />
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Daily Consumption
                    </p>
                    <Badge variant={getConsumptionBadge(result.predicted_daily_kwh, "daily")} className="text-xs">
                      {getConsumptionBadge(result.predicted_daily_kwh, "daily") === "default" ? "Normal"
                        : getConsumptionBadge(result.predicted_daily_kwh, "daily") === "secondary" ? "Moderate" : "High"}
                    </Badge>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className={`text-3xl font-black tabular-nums ${getConsumptionColor(result.predicted_daily_kwh, "daily")}`}>
                      {result.predicted_daily_kwh.toFixed(1)}
                    </span>
                    <span className="text-sm font-semibold text-gray-400 mb-0.5">{result.unit ?? "kWh"}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Predicted for selected day</p>
                </CardContent>
              </Card>

              {/* Weekly */}
              <Card className="border-2 border-blue-200 dark:border-blue-800 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500" />
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Weekly Consumption
                    </p>
                    <Badge variant={getConsumptionBadge(result.predicted_weekly_kwh, "weekly")} className="text-xs">
                      {getConsumptionBadge(result.predicted_weekly_kwh, "weekly") === "default" ? "Normal"
                        : getConsumptionBadge(result.predicted_weekly_kwh, "weekly") === "secondary" ? "Moderate" : "High"}
                    </Badge>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className={`text-3xl font-black tabular-nums ${getConsumptionColor(result.predicted_weekly_kwh, "weekly")}`}>
                      {result.predicted_weekly_kwh.toFixed(1)}
                    </span>
                    <span className="text-sm font-semibold text-gray-400 mb-0.5">{result.unit ?? "kWh"}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Projected for the week</p>
                </CardContent>
              </Card>

              {/* Monthly */}
              <Card className="border-2 border-blue-200 dark:border-blue-800 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500" />
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Monthly Consumption
                    </p>
                    <Badge variant={getConsumptionBadge(result.predicted_monthly_kwh, "monthly")} className="text-xs">
                      {getConsumptionBadge(result.predicted_monthly_kwh, "monthly") === "default" ? "Normal"
                        : getConsumptionBadge(result.predicted_monthly_kwh, "monthly") === "secondary" ? "Moderate" : "High"}
                    </Badge>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <span className={`text-3xl font-black tabular-nums ${getConsumptionColor(result.predicted_monthly_kwh, "monthly")}`}>
                      {result.predicted_monthly_kwh.toFixed(1)}
                    </span>
                    <span className="text-sm font-semibold text-gray-400 mb-0.5">{result.unit ?? "kWh"}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Projected for the month</p>
                </CardContent>
              </Card>
            </div>

            {/* High-Consumption Periods + Unusual Increases — side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* High-Consumption Periods */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Clock className="size-4 text-orange-500" />
                    High-Consumption Periods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.high_consumption_periods && result.high_consumption_periods.length > 0 ? (
                    <ul className="space-y-2">
                      {result.high_consumption_periods.map((period, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="size-2 rounded-full bg-orange-400 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{period}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Zap className="size-4 text-green-400" />
                      No high-consumption periods identified.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Unusual Increases */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <TrendingUp className="size-4 text-red-500" />
                    Unusual Energy Increases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.unusual_increases && result.unusual_increases.length > 0 ? (
                    <ul className="space-y-2">
                      {result.unusual_increases.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <AlertTriangle className="size-3.5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Zap className="size-4 text-green-400" />
                      No unusual increases detected.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Footer meta */}
            <div className="flex flex-wrap gap-4 px-1">
              {result.model_type && (
                <p className="text-xs text-gray-400">
                  Model: <span className="font-medium text-gray-600 dark:text-gray-300">{result.model_type}</span>
                </p>
              )}
              <p className="text-xs text-gray-400">
                Status: <span className="font-medium text-green-600 dark:text-green-400 capitalize">{result.status}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
