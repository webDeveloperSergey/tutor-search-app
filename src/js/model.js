let data = {
  subject: 'математика',
  startPrice: null,
  endPrice: null,
  experienceYear: '< 1 года',
  ratingStar: null,
  isExam: false,
  sortbySelected: 'популярности',
  sortby: [
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

  if (newData.onUpdate === 'updateStartPrice') {
    if (isNaN(newData.startPrice)) {
      newData.startPrice = 0
    }
  }

  if (newData.onUpdate === 'updateEndPrice') {
    if (isNaN(newData.endPrice)) {
      newData.endPrice = 0
    }
  }

  if (newData.onUpdate === 'updateRating') {
    if (isNaN(newData.ratingStar) || newData.ratingStar > 5) {
      newData.ratingStar = 0
    }
  }

  data = {
    ...data,
    ...newData
  }


  console.log('Updated Data', data)
}

export { getData, setData }