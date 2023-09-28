import { ExpenseType } from '@/models/expense.model'
import { IncomeType } from '@/models/income.model'
import capitalize from '@/utils/capitalize'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { ModalEdit } from '../Modals/ModalEditRegister'
import DeleteRegister from './DeleteRegister/DeleteRegister'
import { exportData } from './exportData'
import { searchTable } from './searchTable'

export const TableComponent = ({ content, filters }: any) => {
  const [tableContent, setTableContent] = useState<
    IncomeType[] | ExpenseType[]
  >([])


  useEffect(() => {
    const filterData = (content: IncomeType[] | ExpenseType[]) => {
      const aux: IncomeType[] | ExpenseType[] = [] // Definir como array vacío
      const filteredData = content.filter((ele: IncomeType | ExpenseType) => {
        if (ele.type[0] === filters.slice) {
          return ele
        }
      })
      aux.push(...filteredData) // Agregar elementos al array auxiliar
      setTableContent(aux)
    }
    if (content) {
      // Verificar que content esté definido antes de pasarlo a filterData()
      filterData(content)
    }
  }, [content, filters])

  const downloadExcel = () => {
    if (!filters || !filters.slice) {
      console.log(
        'Error: no se puede descargar Excel, falta información de filtro'
      )
      return
    }

    const data = content.filter((ele: IncomeType | ExpenseType) => {
      if (ele.type[0] === filters.slice) {
        return ele
      }
    })
    exportData(data)
  }

  if (!filters || (!filters.slice && !filters.type) || !content.length) {
    return <></>
  }

  return (
    <div className="col-12 text-white h-3/4">
      <h3 className="text-black pt-2">Tablas {filters.type}</h3>
      <div className="row">
        <div className="col-lg-12">
          <form>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar"
                onKeyUp={searchTable}
                id="searchInput"
              ></input>
            </div>
          </form>
          <button onClick={downloadExcel} className="text-black pt-2">
            Descargar excel
          </button>
        </div>
      </div>
      <section className="max-h-[60vh]  overflow-y-scroll">
        <Table
          className="table table-hover table-active mt-3 "
          id="tableRegister"
        >
          <thead className="table-head ">
            <tr className="table-head-row ">
              <th>Tipo</th>
              <th>Categoria</th>
              <th>Value</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className=" table-body">
            {tableContent.map((ele: IncomeType | ExpenseType) => {
              return (
                //TODO:Aqui no deja agregar el id como key
                <tr key={Math.random()}>
                  <td>{capitalize(filters.type)}</td>
                  <td>{capitalize(ele.category)}</td>
                  <td>s/ {ele.value}</td>
                  <td>
                    <p className="max-w-xs m-0 text-start">
                      {ele.description}
                    </p>
                  </td>
                  <td>
                    <ModalEdit
                      props={{
                        type: ele.type[0],
                        category: ele.category,
                        description: ele.description,
                        value: ele.value,
                        id: ele._id!,
                        table: filters.type,
                        date: ele.date,
                        credit: ele.credit,
                      }}
                    />
                    <DeleteRegister id={ele._id} filters={filters} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </section>
    </div>
  )
}
