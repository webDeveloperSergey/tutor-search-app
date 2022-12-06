import { mainFilterEl } from './mainFilter'

export default function updateFilter(data) {
  const [selectedSubject, moreSubjectLi] = mainFilterEl

  if (data.onUpdate == 'choiceSubject') {
    selectedSubject.innerText = data.subject

    moreSubjectLi.forEach(item => {
      item.classList.remove('filter__item-li_active')
      if (item.innerText.toLowerCase() === data.subject) {
        item.classList.add('filter__item-li_active')
      }
    })

    selectedSubject.classList.remove('filter__item-selected_active')
    moreSubjectLi[0].closest('.filter__item-more').classList.add('none')
  }


}