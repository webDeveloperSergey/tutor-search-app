import { setDropDownFilter } from './utils';
import { mainFilterEl } from './mainFilter'
import { additionaFilterEl } from './additionaFilter';

export default function updateFilter(data) {
  const [
    selectedSubject,
    moreSubjectLi,

    startPriceEl,
    endPriceEl,
    
    selectedExperience,
    moreExperienceLi
  ] = mainFilterEl

  const [
    isExam,
    sortbySelected,
    sortbyLi
  ] = additionaFilterEl


  
  if (data.onUpdate == 'choiceSubject') {
    setDropDownFilter(selectedSubject, moreSubjectLi, data.subject)
  }

  if (data.onUpdate == 'choiceExperience') {
    setDropDownFilter(selectedExperience, moreExperienceLi, data.experienceYear)
  }

  if (data.onUpdate == 'updateSortby') {
    sortbySelected.innerText = data.sortbySelected

    document.querySelector('.tutors__sortby-more').classList.add('none')
    sortbySelected.parentElement.classList.remove('tutors__sortby_active')

    sortbyLi.forEach(item => {
      item.classList.remove('tutors__sortby-li_active')
      if (item.innerText == data.sortbySelected) {
        item.classList.add('tutors__sortby-li_active')
      }
    })
  }

}