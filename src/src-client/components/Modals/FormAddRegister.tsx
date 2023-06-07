import { catTransactions } from "@/utils/categoriesTransactions";
import Calendar from "react-calendar";
import React from "react"
export interface FormType {
  type: string;
  description: string;
  category: string;
  value: number;
  date: Date;
}

interface FormProps {
  form: FormType;
  setForm: Function;
}

export default function FormRegister({ form, setForm }: FormProps) {

  const [dateShow, setDateShow] = React.useState(true)

  const handleChange = (
    evt: React.FormEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;

    if (name === "value") {
      setForm({ ...form, [name]: parseInt(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleDateChange = (e : any) => {
    console.log(e)
    setForm({ ...form, date: e});
  }

  return (
    <form  className="d-flex flex-column">
      {/* <div className="input-group mb-3 w-100">
        <label htmlFor="type" className="input-group-text">
          Tipo de ingreso
        </label>
        <select
          name="type"
          id=""
          onChange={handleChange}
          value={type}
          className="form-select"
          aria-describedby="Tipo"
          placeholder="Tipo de ingreso"
          required
        >
          <option value="" disabled></option>
          <option value="negocio">Negocio</option>
          <option value="personales">Personal</option>
        </select>
      </div> */}

      <div className="input-group mb-3 w-100">
        <label htmlFor="text" className="input-group-text">
          Categoria
        </label>
        <select name="category" className='form-control' defaultValue={form.category} onChange={handleChange} required>
          {catTransactions.map((category) => {
            return <option key={category} value={category}>{category}</option>
          })}
        </select>
      </div>

      <div className="input-group mb-0 w-100">
        <label htmlFor="text" className="input-group-text ">Fecha</label>     
        <input type='text' id='check' value={form.date.toDateString()} placeholder="Seleccione una fecha" onClick={()=>setDateShow(!dateShow)} className="form-control"/>   
      </div>   
      <div className={`${ !dateShow ? '' : 'hidden'}`}>    
        <Calendar value={form.date} onChange={handleDateChange} className='bg-white [span:bg-white text-center important]'/>
      </div>
      
      <div className="input-group mb-3 mt-3 w-100">
        <label htmlFor="value" className="input-group-text">
          Valor
        </label>
        <input
          type="number"
          value={form.value}
          onChange={handleChange}
          name="value"
          className="form-control"
          aria-describedby="Valor"
          placeholder="Ingresa aca el valor"
        />
      </div>

      <div className="form-floating">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          value={form.description}
          onChange={handleChange}
          name="description"
          rows={5}
        ></textarea>
        <label htmlFor="floatingTextarea">Descripción</label>
      </div>
    </form>
  );
}
