import { formatDate } from "@/utils/formatDates";
import { utils, write } from "xlsx";

export function exportData(data) {
  const workbook = utils.book_new();

  const formatedData = formatData(data);

  const sheet = utils.json_to_sheet(formatedData);

  sheet["!cols"] = [
    { wch: 20 },
    { wch: 20 },
    { wch: 10 },
    { wch: 50 },
    { wch: 20 },
  ];

  utils.book_append_sheet(workbook, sheet, "Datos");

  const blob = write(workbook, { bookType: "xlsx", type: "binary" });

  const archivo = new Blob([s2ab(blob)], {
    type: "application/octet-stream",
  });

  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(archivo);
  enlace.download = "datos_excel.xlsx";
  enlace.click();
}

const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
};

const formatData = (data) => {
  const aux = [];

  data.forEach((element) => {
    const date = formatDate(element.date);
    const credit = element.credit ? element.credit.split(' ')[0] === 'No' ? 'No' : element.credit.split(' ').slice(0, 2).join(' ') : 'No';
    aux.push({
      Categoria: element.category,
      Importe: element.value,
      Descripcion: element.description,
      Crédito: credit,
      Fecha: element.date.split('T')[0],
      Mes: date
    });
  });
  return aux;
};
