export const mainFilterEl = []

export default function init (getData) {
  const data = getData()

  const {
    subject, 
    startPrice,
    endPrice,
    experienceYear,
    rating
  } = data

  const selectedSubject = document.querySelector('#selected-subject')
  selectedSubject.innerText = subject

  const startPriceEl =  document.querySelector('[data-input="startPrice"]')
  startPriceEl.vlue = startPrice

  const endPriceEl = document.querySelector('[data-input="endPrice"]')
  endPriceEl.value = endPrice
  
  const selectedExperience = document.querySelector('#selected-experience')
  selectedExperience.innerText = experienceYear

  const ratingEl = document.querySelector('#rating')
  ratingEl.value = rating

  const filterSubject = document.querySelector('[data-filter="subject"]')
  const moreSubjectLi = filterSubject.querySelectorAll('.filter__item-li')

  const filterExperience = document.querySelector('[data-filter="experience"]')
  const moreExperienceLi = filterExperience.querySelectorAll('.filter__item-li')


  mainFilterEl.push(
    selectedSubject, 
    moreSubjectLi, 
    startPriceEl, 
    endPriceEl,
    selectedExperience,
    moreExperienceLi
    )
}