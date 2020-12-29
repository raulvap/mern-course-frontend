export function minLengthValidation(inputData, minLength) {
  const { value } = inputData;

  removeClassErrorSuccess(inputData);

  if (value.length >= minLength) {
    //si el valor es mayor al mínimo requerido, entonces es true:
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}

//creamos otra función que podamos exportar, para validar email:
export function emailValidation(inputData) {
  //esta validación la podemos encontrar en google: expresión regular para validar emails
  // eslint-disable-next-line no-useless-escape
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //sacamos value, deconstructing inputData;
  const { value } = inputData;

  //quitamos las clases con la función previa:
  removeClassErrorSuccess(inputData);

  const resultValidation = emailValid.test(value);
  if (resultValidation) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}

//vamos a crear una función interna, que remueva las class previas de success o error
function removeClassErrorSuccess(inputData) {
  // Esta función es para remover la clase error y succes del input que llega
  inputData.classList.remove("success");
  inputData.classList.remove("error");
  return inputData;
}
