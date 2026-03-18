import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Extend jsPDF with autotable types
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => void;
}

export interface ReportData {
  title: string;
  caseId: string;
  date: string;
  investigator: string;
  summary: string;
  entities?: { name: string; type: string; risk: string; amount: string }[];
  transactions: { from: string; to: string; amount: string; date: string; status: string }[];
  findings?: string[];
}

export const generateForensicPDF = (data: ReportData) => {
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Header
  doc.setFillColor(2, 6, 23); // #020617
  doc.rect(0, 0, 210, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text(data.title, 15, 25);
  
  doc.setFontSize(10);
  doc.text(`CASE ID: ${data.caseId}`, 150, 25);

  // Body
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("EXECUTIVE SUMMARY", 15, 55);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const splitSummary = doc.splitTextToSize(data.summary, 180);
  doc.text(splitSummary, 15, 65);

  // Metadata
  doc.setFont("helvetica", "bold");
  doc.text("REPORT METADATA", 15, 95);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${data.date}`, 15, 105);
  doc.text(`Investigator: ${data.investigator}`, 15, 110);
  doc.text(`Organization: Advanced Forensic Division - AI Fund Watch`, 15, 115);

  // Transactions Table
  doc.setFont("helvetica", "bold");
  doc.text("TRANSACTION TRAIL ANALYSIS", 15, 130);
  
  const tableRows = data.transactions.map(t => [
    t.date,
    t.from,
    t.to,
    t.amount,
    t.status
  ]);

  doc.autoTable({
    startY: 135,
    head: [["Date", "Source Entity", "Destination Entity", "Amount", "Status"]],
    body: tableRows,
    theme: "striped",
    headStyles: { fillColor: [4, 103, 255] }, // Primary color
    styles: { fontSize: 8 }
  });

  // Findings if any
  if (data.findings && data.findings.length > 0) {
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFont("helvetica", "bold");
    doc.text("KEY INTELLIGENCE FINDINGS", 15, finalY + 15);
    
    doc.setFont("helvetica", "normal");
    data.findings.forEach((finding, index) => {
      const splitFinding = doc.splitTextToSize(`• ${finding}`, 180);
      doc.text(splitFinding, 15, finalY + 25 + (index * 10));
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Confidential Forensic Report - ${data.caseId} - Page ${i} of ${pageCount}`,
      105,
      285,
      { align: "center" }
    );
  }

  // Download
  doc.save(`Forensic_Report_${data.caseId}.pdf`);
};
