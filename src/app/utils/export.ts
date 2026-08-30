import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { EnergyReading, MonthlyStats } from "../hooks/useEnergyData";

export function exportToExcel(data: EnergyReading[], monthlyStats: MonthlyStats) {
  // Prepare data for export
  const exportData = data.map((reading) => ({
    Date: new Date(reading.date).toLocaleDateString(),
    "Usage (kWh)": reading.usage.toFixed(2),
    "Rate (₹/kWh)": reading.rate.toFixed(2),
    "Cost (₹)": reading.cost.toFixed(2),
    Appliances: reading.appliances || "N/A",
  }));

  // Add summary sheet
  const summary = [
    { Metric: "Total Usage", Value: `${monthlyStats.totalUsage.toFixed(2)} kWh` },
    { Metric: "Total Cost", Value: `₹${monthlyStats.totalCost.toFixed(2)}` },
    { Metric: "Average Daily Usage", Value: `${monthlyStats.avgDaily.toFixed(2)} kWh` },
    { Metric: "Estimated Monthly Cost", Value: `₹${monthlyStats.estimatedCost.toFixed(2)}` },
    { Metric: "Current Rate", Value: `₹${monthlyStats.rate}/kWh` },
  ];

  // Create workbook
  const wb = XLSX.utils.book_new();
  
  // Add readings sheet
  const ws1 = XLSX.utils.json_to_sheet(exportData);
  XLSX.utils.book_append_sheet(wb, ws1, "Energy Readings");
  
  // Add summary sheet
  const ws2 = XLSX.utils.json_to_sheet(summary);
  XLSX.utils.book_append_sheet(wb, ws2, "Summary");

  // Download file
  XLSX.writeFile(wb, `Energy_Report_${new Date().toISOString().split("T")[0]}.xlsx`);
}

export function exportToPDF(
  data: EnergyReading[],
  monthlyStats: MonthlyStats,
  currentUsage: number
) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235); // Blue color
  doc.text("Smart Energy Tracker", 14, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Energy Usage Report", 14, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);

  // Summary Section
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Monthly Summary", 14, 50);

  const summaryData = [
    ["Current Month Usage", `${currentUsage.toFixed(2)} kWh`],
    ["Total Cost", `₹${monthlyStats.totalCost.toFixed(2)}`],
    ["Average Daily Usage", `${monthlyStats.avgDaily.toFixed(2)} kWh`],
    ["Estimated Monthly Cost", `₹${monthlyStats.estimatedCost.toFixed(2)}`],
    ["Rate", `₹${monthlyStats.rate}/kWh`],
    ["Monthly Threshold", `${monthlyStats.threshold} kWh`],
  ];

  autoTable(doc, {
    startY: 55,
    head: [["Metric", "Value"]],
    body: summaryData,
    theme: "grid",
    headStyles: { fillColor: [37, 99, 235] },
  });

  // Readings Table
  const finalY = (doc as any).lastAutoTable.finalY || 55;
  doc.setFontSize(14);
  doc.text("Recent Readings", 14, finalY + 15);

  const readingsData = data
    .slice(-10)
    .reverse()
    .map((reading) => [
      new Date(reading.date).toLocaleDateString(),
      `${reading.usage.toFixed(2)} kWh`,
      `₹${reading.rate.toFixed(2)}`,
      `₹${reading.cost.toFixed(2)}`,
    ]);

  autoTable(doc, {
    startY: finalY + 20,
    head: [["Date", "Usage (kWh)", "Rate (₹/kWh)", "Cost (₹)"]],
    body: readingsData,
    theme: "striped",
    headStyles: { fillColor: [34, 197, 94] },
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} of ${pageCount} | Smart Energy Tracker`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
  }

  // Save
  doc.save(`Energy_Report_${new Date().toISOString().split("T")[0]}.pdf`);
}

export function sendEmailBill(currentUsage: number, monthlyStats: MonthlyStats) {
  // Mock email functionality - in production, this would call an API
  console.log("Sending email bill with the following data:");
  console.log({
    to: "user@example.com",
    subject: `Your Energy Bill - ${new Date().toLocaleDateString()}`,
    body: `
      Current Usage: ${currentUsage.toFixed(2)} kWh
      Estimated Cost: ₹${monthlyStats.estimatedCost.toFixed(2)}
      Average Daily: ${monthlyStats.avgDaily.toFixed(2)} kWh
    `,
  });
  
  // In a real application, you would make an API call here:
  // await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(emailData) });
}
