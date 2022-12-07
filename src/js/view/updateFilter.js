import { setDropDownFilter } from './utils';
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


  
  if (data.onUpdate == 'choiceSubject') {
    setDropDownFilter(selectedSubject, moreSubjectLi, data.subject, data)
  }

  if (data.onUpdate == 'choiceExperience') {
    setDropDownFilter(selectedExperience, moreExperienceLi, data.experienceYear, data)
  }



}