let data = {
  subject: 'математика',
  startPrice: null,
  endPrice: null,
  experienceYear: '< 1 года',
  ratingStar: null,
  isExam: false,
  sortBy: [
    'популярности',
    'цене',
    'алфавиту'
  ]
}

function getData() {
  return {...data}
}
  

function setData(newData) {
  console.log('New Data', newData)

  data = {
    ...data,
    ...newData
  }


  console.log('Updated Data', data)
}

export { getData, setData }