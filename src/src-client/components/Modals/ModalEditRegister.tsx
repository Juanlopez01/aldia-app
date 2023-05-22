import capitalize from "@/utils/capitalize";
import Image from "next/image";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import icoEditar from "../../../../assets/pencil-svgrepo-com.svg";
import FormRegister from "./FormAddRegister";

import {
  updateCompanyExpense,
  updateCompanyIncome,
} from "@/redux/slice/CompanySlice";

import {
  updatePersonalExpense,
  updatePersonalIncome,
} from "@/redux/slice/PersonalSlice";
import { updateAdminCompanyExpense, updateAdminCompanyIncome, updateAdminUserExpense, updateAdminUserIncome } from "@/redux/slice/AdminSlice";

interface PropsModal {
  props: {
    type: String;
    description: String;
    category: String;
    value: number;
    id: String;
    table: String;
  };
}

const initialStateForm = {
  type: "",
  description: "",
  category: "",
  value: 0,
};

export function ModalEdit({ props }: PropsModal) {
  const [form, setForm] = useState(initialStateForm);
  const [show, setShow] = useState(false);
  const dispatch: Function = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setForm({
      value: props.value,
      category: props.category.toString(),
      description: props.description.toString(),
      type: props.type.toString(),
    });
    setShow(true);
  };

  const sendForm = () => {
    switch (props.table) {
      case 'ingresos':
      props.type.toString() === "negocio"
        ? dispatch(updateCompanyIncome(form, props.id))
        : dispatch(updatePersonalIncome(form, props.id));
      setForm(initialStateForm);
      handleClose();
      break;
      case 'expenses':
      // const validExpense = isValidExpense(totalIncomes, totalExpenses, form);
      //TODO: cambiar esta logica para que te deje
      props.type.toString() === "negocio"
        ? dispatch(updateCompanyExpense(form, props.id))
        : dispatch(updatePersonalExpense(form, props.id));

      setForm(initialStateForm);
      handleClose();
      break;
      case 'admin expenses':
      props.type.toString() === 'negocio'
        ? dispatch(updateAdminCompanyExpense(form, props.id))
        : dispatch(updateAdminUserExpense(form, props.id))
      setForm(initialStateForm);
      handleClose();
      break;
      case 'admin incomes':
      props.type.toString() === 'negocio'
        ? dispatch(updateAdminCompanyIncome(form, props.id))
        : dispatch(updateAdminUserIncome(form, props.id))
        setForm(initialStateForm);
      handleClose();
      break;
    }
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="border-0 rounded-1 m-1 text-white"
      >
        <Image src={icoEditar} alt="Editar" width={30} height={30} />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro - {capitalize(props.table)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegister setForm={setForm} form={form} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={sendForm}>
            Editar registro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
