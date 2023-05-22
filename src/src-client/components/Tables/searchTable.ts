import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";

export const searchTable = () => {
  const input = document.querySelector<HTMLInputElement>("#searchInput");
  if (!input) return;
  const filter = input.value.toUpperCase();

  // Obtener la tabla y las filas de la tabla
  const table = document.querySelector(".table-body");
  if (!table) return;
  const trs = table.getElementsByTagName("tr");

  // Recorrer todas las filas y ocultar las que no cumplan con la búsqueda, excepto el encabezado
  for (let i = 0; i < trs.length; i++) {
    const tds = trs[i].getElementsByTagName("td");
    let visible = false;
    if (filter === "") {
      if (
        trs[i].classList.contains("table-head") ||
        trs[i].classList.contains("table-head-row")
      ) {
        // Verificar si es una fila de encabezado
        visible = true;
      }
    } else {
      if (
        !trs[i].classList.contains("table-head") ||
        !trs[i].classList.contains("table-head-row")
      ) {
        // Verificar si NO es una fila de encabezado
        for (let j = 0; j < tds.length; j++) {
          const td = tds[j];
          if (td) {
            const textValue = td.textContent || td.innerText;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
              visible = true;
            }
          }
        }
      }
    }
    if (visible) {
      (trs[i] as HTMLElement).style.display = "";
    } else {
      (trs[i] as HTMLElement).style.display = "none";
    }
  }
};

export const searchTable2 = (content: IncomeType[] | ExpenseType[]) => {

  return [];
};
