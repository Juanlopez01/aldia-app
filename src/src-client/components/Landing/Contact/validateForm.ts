const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
const regexMail =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface input {
  name: string,
	email: string,
	subject: string,
	message: string,
}

const validateForm = (input: input) => {
	let errors = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  //*nombre
	if (input.name.length === 0) {
		errors.name = "El campo nombre debe estar completo"
	} 
  else if (input.name.length > 45) {
		errors.name = "El campo nombre debe tener menos de 45 caracteres"
	} 

  //*email
  else if (input.email.length === 0) {
		errors.email = "El campo email debe estar completo"
	} else if (input.email.length > 70) {
		errors.email = "El campo nombre debe tener menos de 70 caracteres"
	}  
  else if (!regexMail.test(input.email)) {
		errors.email = "El campo email debe tener un formato correcto"
	} 

  else if (input.subject.length === 0) {
		errors.subject = "El campo asunto debe estar completo"
	} 
  else if (input.subject.length > 50) {
		errors.subject = "El campo asunto debe tener menos de 50 caracteres"
	} 
  
  //*mensaje
  else if (input.message.length === 0) {
		errors.message = "El campo mensaje debe estar completo"
	} else if (input.message.length < 20) {
		errors.message = "El campo mensaje debe tener al menos 20 caracteres"
	} else if (input.message.length > 5000) {
		errors.message = "El campo mensaje debe tener menos de 5000 caracteres"
	}

	return errors;
};

export default validateForm;
