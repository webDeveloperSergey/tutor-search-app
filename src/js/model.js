let data = {
  search: '',
  url: `https://6393372c11ed187986aed9a1.mockapi.io/tutors`,
  setSearch: function() {
    return this.url = `https://6393372c11ed187986aed9a1.mockapi.io/tutors?search=${this.search}`
  },
  candCount: 0,
  subject: 'любой',
  subjectList: [
    'любой',
    'Математика',
    'Физика',
    'Английский язык',
    'Немецкий язык',
    'Литература',
    'История',
    'Обществознание'
  ],
  startPrice: null,
  endPrice: null,
  experienceYear: 'любой',
  experienceList: [
    'любой',
    '< 1 года',
    'от 1 года',
    'от 3 лет',
    'от 5 лет',
    'от 10 лет'
  ],
  rating: null,
  isExam: false,
  sortbySelected: 'популярности',
  sortbyList: [
    'популярности',
    'цене (от мин)',
    'цене (от макс)'
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

  if (newData.onUpdate === 'updateCandCount') {
    data.candCount = ++data.candCount
  }

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

  if (newData.onUpdate === 'clickFilterBtn') {
    data.isExam = false
  }

  if (newData.onUpdate === 'clearBtn') {
    data.subject = 'любой'
    data.startPrice = null
    data.endPrice = null
    data.experienceYear = 'любой'
    data.rating = null
    data.sortbySelected = 'популярности'
  }

  data = {
    ...data,
    ...newData
  }


  console.log('Updated Data', data)
}

export { getData, setData }