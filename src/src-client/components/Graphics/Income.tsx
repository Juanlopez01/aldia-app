import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Pie } from 'react-chartjs-2'
import { ModalAddRegister } from '../Modals/ModalAddRegister'
import { useAppSelector } from '@/src-client/hooks/use-redux'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

interface IncomeProps {
  type?: string
  options: object
  data: any
  setTableContent: Function
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
    title: 'Agregar',
    buttonText: 'Agregar',
    type: 'income',
  }

  const optionsPlus = {
    ...options,
    onClick: function (event: any, elements: any) {
      const slice = {
        type: 'ingresos',
        slice: type,
      }
      openModalTable(true)
      setTableContent(slice)
    },
  }


  const reduce = totalDataIncomes?.reduce((acc: number, val: number)=>acc+val, 0)
  let incomeDecimalResult
	if (reduce.toString().includes('.')) {
		const integer = reduce.toString().split('.')[0]
		const decimal = reduce.toString().split('.')[1].slice(0, 2)
		incomeDecimalResult = integer + '.' + decimal
	}

	return (
		<div
			className="bg-link rounded-4 px-4
      w-[350px] pt-2  flex flex-col justify-around py-2"
		>
			<div className="text-gray-900">
				<h5>Ingresos</h5>
				<h3>{reduce>=0 ? `s/ ${reduce.toString().includes('.') ? incomeDecimalResult?.valueOf() : reduce}` : `-s/ ${reduce.toString().includes('.') ? incomeDecimalResult?.valueOf() : reduce}`}</h3>
			</div>

      {data?.labels?.length ? (
        <div>
          <Pie
            options={optionsPlus}
            height="250"
            width="250"
            id="income_canva"
            data={data}
          />
        </div>
      ) : (
        <h2 className="heandingExcedent text-black">No hay registros</h2>
      )}
      <ModalAddRegister
        type={type}
        props={propsModal}
        dataIncomes={totalDataIncomes}
        dataExpenses={totalDataExpenses}
      />
    </div>
  )
}
