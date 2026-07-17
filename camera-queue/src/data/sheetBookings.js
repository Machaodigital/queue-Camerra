import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQQtIGgLnUdecBWM3prwWysfNxfCImyD5XXnbZXx6TQxZE07Gp2odThVpfTp3aUzYXPizTTqeqmuo6o/pub?output=csv";

export async function getBookings() {
  return new Promise((resolve) => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
}