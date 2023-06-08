import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut, Pie } from "react-chartjs-2";
import { ModalAddRegister } from "../Modals/ModalAddRegister";
import { useState } from "react";
import { Modal } from 'react-bootstrap'
import { TableComponent } from "../../components/Tables/TableComponent";
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface IncomeProps {
  type?: string;
  options: object;
  data: any;
  setTableContent: Function;
}
export function Income({
  type,
  options,
  data,
  setTableContent,
  totalDataIncomes,
  totalDataExpenses,
  openModalTable,
}: any) {

  const propsModal = {
    title: "Agregar ingresos",
    buttonText: "Agregar ingresos",
    type: "income",
  };

  const optionsPlus = {
    ...options,
    onClick: function (event: any, elements: any) {
      const slice = {
        type: "ingresos",
        slice: type,
      };
      openModalTable(true)
      setTableContent(slice);
    },
  };

  const {totalIncomes} = useSelector((s: any)=>s.PersonalReducer)


  return (
    <div
      className="bg-dark-blue rounded-4  text-white pt-2 px-2
      w-[370px]"
      
    >
      <h4>Ingresos</h4>
      <h2>${totalIncomes}</h2>

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
