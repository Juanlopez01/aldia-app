export interface FormType {
  type: string;
  description: string;
  category: string;
  value: number;
}

interface FormProps {
  form: FormType;
  setForm: Function;
}

export default function FormRegister({ form, setForm }: FormProps) {
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

  return (
    <form action="" className="d-flex flex-column">
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
        <input
          type="category"
          value={form.category}
          onChange={handleChange}
          name="category"
          className="form-control"
          aria-describedby="Categoria"
          placeholder="Ingresa aca la categoria"
        />
      </div>

      <div className="input-group mb-3 w-100">
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
