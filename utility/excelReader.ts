import XLSX from "xlsx";

export type Reader = {
  UserName: string;
  Password: string;
  Result: string;
};
export function excelReader(): Reader[] {
  const path = "testdata/utils.xlsx";
  const worksheet = XLSX.readFile(path);
  const sheetname = worksheet.SheetNames[0];
  const sheet = worksheet.Sheets[sheetname];
  const data: Reader[] = XLSX.utils.sheet_to_json(sheet);
  return data;
}
