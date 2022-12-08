function validCountInput(input) {
  input.value = input.value.replace(/\D/g, '')
  input.value = input.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")

  const valueForData = parseFloat(input.value.replace(/\s/g, ""))
  
  return valueForData
}


function setDropDownFilter(selectedFilter, moreLi, curData) {
  selectedFilter.innerText = curData

  moreLi.forEach(item => {
    item.classList.remove('filter__item-li_active')
    if (item.innerText.toLowerCase() === curData) {
      item.classList.add('filter__item-li_active')
    }
  })

  selectedFilter.classList.remove('filter__item-selected_active')
  moreLi[0].closest('.filter__item-more').classList.add('none')

}

function openMoreBlock(el, parent) {
  const moreBlock = parent.querySelector('.filter__item-more')
  
  const subjectMoreBlock = document.querySelector('[data-filter="subject"]')
  const experienceMoreBlock = document.querySelector('[data-filter="experience"]')


  if (parent.dataset.filter == 'experience') {
    subjectMoreBlock.querySelector('.filter__item-more').classList.add('none')
    document.querySelector('#selected-subject').classList.remove('filter__item-selected_active')
  }

  if (parent.dataset.filter == 'subject') {
    experienceMoreBlock.querySelector('.filter__item-more').classList.add('none')
    document.querySelector('#selected-experience').classList.remove('filter__item-selected_active')
  }
  
  el.classList.toggle('filter__item-selected_active')
  moreBlock.classList.toggle('none')
}


export { validCountInput, setDropDownFilter, openMoreBlock }