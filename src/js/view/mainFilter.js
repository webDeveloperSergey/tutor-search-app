export const mainFilterEl = []

export default function init (getData) {
  const data = getData()

  const {
    subject, 
    startPrice,
    endPrice,
    experienceYear,
    ratingStar
  } = data

  const selectedSubject = document.querySelector('#selected-subject')
  selectedSubject.innerText = subject

  const startPriceEl =  document.querySelector('[data-price="start"]')
  startPriceEl.vlue = startPrice

  const endPriceEl = document.querySelector('[data-price="end"]')
  endPriceEl.value = endPrice
  
  document.querySelector('#selected-experience').innerText = experienceYear
  document.querySelector('#rating').value = ratingStar

  const filterSubject = document.querySelector('[data-filter="subject"]')
  const moreSubjectLi = filterSubject.querySelectorAll('.filter__item-li')




  moreSubjectLi.forEach(item => {
    if (item.innerText.toLowerCase() === data.subject) {
      item.classList.add('filter__item-li_active')
    }
  })


  mainFilterEl.push(selectedSubject, moreSubjectLi, startPriceEl, endPriceEl)
}