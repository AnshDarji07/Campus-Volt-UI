import { useState, useEffect } from "react";

export interface EnergyReading {
  id: string;
  date: Date;
  usage: number; // in kWh
  cost: number;
  rate: number;
  appliances?: string;
}

export interface MonthlyStats {
  month: number;
  year: number;
  totalUsage: number;
  totalCost: number;
  avgDaily: number;
  estimatedCost: number;
  rate: number;
  threshold: number;
}

const STORAGE_KEY = "smart_energy_data";
const DEFAULT_RATE = 6.5; // ₹ per kWh
const DEFAULT_THRESHOLD = 300; // kWh per month

export function useEnergyData() {
  const [data, setData] = useState<EnergyReading[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed.map((item: any) => ({
        ...item,
        date: new Date(item.date),
      })));
    } else {
      // Initialize with sample data
      const sampleData = generateSampleData();
      setData(sampleData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  const addReading = (usage: number, appliances?: string) => {
    const newReading: EnergyReading = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(),
      usage,
      rate: DEFAULT_RATE,
      cost: usage * DEFAULT_RATE,
      appliances,
    };
    setData((prev) => [...prev, newReading]);
  };

  const getCurrentMonthUsage = (): number => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return data
      .filter((reading) => {
        const readingDate = new Date(reading.date);
        return (
          readingDate.getMonth() === currentMonth &&
          readingDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, reading) => sum + reading.usage, 0);
  };

  const getMonthlyStats = (): MonthlyStats => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const currentDay = now.getDate();

    const monthData = data.filter((reading) => {
      const readingDate = new Date(reading.date);
      return (
        readingDate.getMonth() === currentMonth &&
        readingDate.getFullYear() === currentYear
      );
    });

    const totalUsage = monthData.reduce((sum, reading) => sum + reading.usage, 0);
    const totalCost = monthData.reduce((sum, reading) => sum + reading.cost, 0);
    const avgDaily = totalUsage / currentDay || 0;
    const estimatedCost = (avgDaily * daysInMonth * DEFAULT_RATE);

    return {
      month: currentMonth,
      year: currentYear,
      totalUsage,
      totalCost,
      avgDaily,
      estimatedCost,
      rate: DEFAULT_RATE,
      threshold: DEFAULT_THRESHOLD,
    };
  };

  const getUsageStatus = () => {
    const stats = getMonthlyStats();
    const percentage = Math.round((stats.totalUsage / stats.threshold) * 100);
    
    let status: "low" | "medium" | "high";
    if (percentage < 60) {
      status = "low";
    } else if (percentage < 80) {
      status = "medium";
    } else {
      status = "high";
    }

    return { percentage, status };
  };

  const getMonthlyDataByMonth = (month: number, year: number) => {
    return data.filter((reading) => {
      const readingDate = new Date(reading.date);
      return (
        readingDate.getMonth() === month &&
        readingDate.getFullYear() === year
      );
    });
  };

  return {
    data,
    addReading,
    currentUsage: getCurrentMonthUsage(),
    monthlyStats: getMonthlyStats(),
    getUsageStatus,
    getMonthlyDataByMonth,
  };
}

// Generate sample data for demonstration
function generateSampleData(): EnergyReading[] {
  const readings: EnergyReading[] = [];
  const now = new Date();
  
  // Generate data for last 3 months
  for (let monthOffset = 2; monthOffset >= 0; monthOffset--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
    const daysInMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();
    
    // Add 8-12 readings per month
    const numReadings = Math.floor(Math.random() * 5) + 8;
    for (let i = 0; i < numReadings; i++) {
      const day = Math.floor((daysInMonth / numReadings) * i) + 1;
      const date = new Date(targetDate.getFullYear(), targetDate.getMonth(), day);
      const usage = Math.random() * 30 + 10; // 10-40 kWh per reading
      
      readings.push({
        id: Math.random().toString(36).substr(2, 9),
        date,
        usage,
        rate: DEFAULT_RATE,
        cost: usage * DEFAULT_RATE,
      });
    }
  }
  
  return readings;
}
