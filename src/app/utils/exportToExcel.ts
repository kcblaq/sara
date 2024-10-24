// src/utils/exportToExcel.ts
import * as XLSX from "xlsx";

// Define the type of the data parameter
export const exportToExcel = <T>(
  data: T[],
  fileName: string = "exported-data.xlsx",
  sheetName: string = "Sheet1"
) => {
  // Convert data to a worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // Write the file and trigger download
  XLSX.writeFile(wb, fileName);
};
