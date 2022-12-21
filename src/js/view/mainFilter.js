export const mainFilterEl = []

export default function init (getData) {
  const data = getData()

  const {
    subject,
    subjectList,
    startPrice,
    endPrice,
    experienceYear,
    experienceList,
    rating
  } = data

  const selectedSubject = document.querySelector('#selected-subject')
  selectedSubject.innerText = subject

  const moreBlockSub = document.querySelector('.filter__item-more_subject')
  const renderLiSub = subjectList.map(item => {
    return `<li class="filter__item-li">${item}</li>`
  })
  moreBlockSub.innerHTML = renderLiSub.join('')



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
  filterSubject.querySelector('.filter__item-li').classList.add('filter__item-li_active')

  const filterExperience = document.querySelector('[data-filter="experience"]')

  const moreBlockExp = document.querySelector('.filter__item-more_experience')
  const renderLiExp = experienceList.map(item => {
    return `<li class="filter__item-li">${item}</li>`
  })
  moreBlockExp.innerHTML = renderLiExp.join('')
  
  const moreExperienceLi = filterExperience.querySelectorAll('.filter__item-li')
  filterExperience.querySelector('.filter__item-li').classList.add('filter__item-li_active')



  mainFilterEl.push(
    selectedSubject, 
    moreSubjectLi, 
    startPriceEl, 
    endPriceEl,
    selectedExperience,
    moreExperienceLi,
    ratingEl
    )
}