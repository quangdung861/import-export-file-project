import * as XLSX from "xlsx/xlsx.mjs";

export const exportExcel = (data, nameSheet, nameFile) => {
  return new Promise((resolve, reject) => {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, nameSheet);
    XLSX.writeFile(wb, `${nameFile}.xlsx`);
    resolve("oke");
  });
};

export function importExcel(file) {
  return new Promise((resolve, reject) => {
    
    // if (!(file instanceof Blob)) {
    //   reject(new Error('Invalid file type'));
    //   return;
    // }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Lấy dữ liệu từ file Excel
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      resolve(jsonData);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}
