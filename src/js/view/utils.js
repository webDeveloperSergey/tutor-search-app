function validCountInput(input) {
  input.value = input.value.replace(/\D/g, '')
  input.value = input.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")

  const valueForData = parseFloat(input.value.replace(/\s/g, ""))
  
  return valueForData
}

export { validCountInput }