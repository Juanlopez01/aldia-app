import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut, Pie } from "react-chartjs-2";
import { ModalAddRegister } from "../Modals/ModalAddRegister";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ExpenseProps {
  type?: string;
  options: object;
  data: any;
  setTableContent: Function;
}
export function Expense({
  options,
  data,
  type,
  setTableContent,
  totalDataIncomes,
  totalDataExpenses,
  openModalTable,
}: any) {
  const propsModal = {
    title: "Agregar egreso",
    buttonText: "Agregar egreso",
    type: "expense",
  };

  const optionsPlus = {
    ...options,
    onClick: function (event: any, elements: any) {
      const slice = {
        type: "gastos",
        slice: type,
      };
      openModalTable(true)
      setTableContent(slice);
    },
  };

  const {totalExpenses} = useSelector((s: any)=>s.PersonalReducer)

  return (
    <div
      className="bg-dark-blue col-3 rounded-4 text-white containerGraphicosDiv pt-2 px-2"
      style={{ width: "370px" }}
    >
      <h4>Gastos</h4>
      <h2>${totalExpenses}</h2>
      {data.labels.length ? (
        <Pie
          options={optionsPlus}
          height="250"
          width="250"
          id="income_canva"
          data={data}
        />
      ) : (
        <h2>No hay registros</h2>
      )}
      <ModalAddRegister
        type={type}
        props={propsModal}
        dataIncomes={totalDataIncomes}
        dataExpenses={totalDataExpenses}
      />
    </div>
  );
}
