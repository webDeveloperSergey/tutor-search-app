let data = {
  search: '',
  url: `https://6393372c11ed187986aed9a1.mockapi.io/tutors`,
  setSearch: function() {
    return this.url = `https://6393372c11ed187986aed9a1.mockapi.io/tutors?search=${this.search}`
  },
  subject: 'любой',
  startPrice: null,
  endPrice: null,
  experienceYear: 'любой',
  rating: null,
  isExam: false,
  sortbySelected: 'популярности',
  sortby: [
    'популярности',
    'цене',
    'алфавиту'
  ],
  getTutors: async function () {
    const response = await fetch(this.url)
    const data = await response.json()
    return data
  },
  tutors: []
}

data.getTutors().then(items => {
  setData({tutors: [...items]})
})

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
    if (isNaN(newData.rating) || newData.rating > 5) {
      newData.rating = 0
    }
  }

  if (newData.onUpdate === 'updateSearch') {
    data.setSearch()
  }

  data = {
    ...data,
    ...newData
  }


  console.log('Updated Data', data)
}

export { getData, setData }