import { mainFilterEl } from './mainFilter'

export default function updateFilter(data) {
  const [
    selectedSubject,
    moreSubjectLi,

    startPriceEl,
    endPriceEl,
    
    selectedExperience,
    moreExperienceLi
  ] = mainFilterEl


  

  let selectedFilter, moreLi, curData
  
  if (data.onUpdate == 'choiceSubject') {
    selectedFilter = selectedSubject
    moreLi = moreSubjectLi
    curData = data.subject
  }

  if (data.onUpdate == 'choiceExperience') {
    selectedFilter = selectedExperience
    moreLi = moreExperienceLi
    curData = data.experienceYear
  }


  selectedFilter.innerText = curData

  moreLi.forEach(item => {
    item.classList.remove('filter__item-li_active')
    if (item.innerText.toLowerCase() === data.curData) {
      item.classList.add('filter__item-li_active')
    }
  })

  selectedFilter.classList.remove('filter__item-selected_active')
  moreLi[0].closest('.filter__item-more').classList.add('none')



}