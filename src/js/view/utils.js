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


function tutorsTmp(data) {

  const htmlTutors = data.map(item => {

    const renderStar = (rating) => {
      const starsArr = []
      const starDisCount = 5 - rating

      const starDisSvg = `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#D9D9D9"/></svg>`
      const starActiveSvg = `<svg width="20" height="19" viewBox="0 0 20 19" fill="#0088E9" xmlns="http://www.w3.org/2000/svg"><path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" fill="#0088E9"/></svg>`

        
      for (let i = 0; i < rating; i++) {
        starsArr.push(starActiveSvg)
      }

      for (let i = 0; i < starDisCount; i++) {
        if (starDisCount == 0) break
        starsArr.push(starDisSvg)
      }

      return starsArr.join('')
    }

    return `
      <div class="tutors__person" id="${item.id}">
        <img alt="${item.name}" class="tutors__person-img" src="${item.img}">

        <span class="tutors__person-subject">${item.subject}</span>


        <div class="tutors__person-info">
          <h3 class="tutors__person-name title-2">${item.name}</h3>
          ${item.isExam ? '<span class="tutors__person-exam">огэ / егэ</span>' : ''}
        </div>

        <div class="tutors__person-info tutors__person-info_2">
          <div class="tutors__person-rating">
            ${renderStar(item.rating)}
          </div>
          <div class="tutors__person-price">${item.price} / час</div>
        </div>

        <div class="tutors__person-info">
          <span class="tutors__person-exp">Опыт ${item.experienceYear}</span>
        </div>

        <div class="tutors__person-info">
          <p class="tutors__person-text">${item.about}</p>
        </div>

        <button class="tutors__person-btn btn">Добавить в кандидаты</button>

      </div>
    `
  })

  return htmlTutors.join('')
}

function getTutorsFromFilter(dataTutors, modelData) {
  let tutors = [...dataTutors]

  if (modelData.subject != 'любой') {
    tutors = tutors.filter(item => item.subject == modelData.subject)
  }

  if (modelData.startPrice != null && modelData.endPrice != null) {
    tutors = tutors.filter(item => item.price >= modelData.startPrice && item.price <= modelData.endPrice)
  }

  if (modelData.experienceYear != 'любой') {
    tutors = tutors.filter(item => item.experienceYear == modelData.experienceYear)
  }

  if (modelData.rating != null) {
    tutors = tutors.filter(item => item.rating == modelData.rating)
  }

  if (modelData.isExam) {
    tutors = tutors.filter(item => item.isExam)
  }


  console.log(tutors, 'tutors=====================')


  const filteredHtmlTutors = tutorsTmp(tutors)
  const tutorsWrap = document.querySelector('.tutors__bottom')
  tutorsWrap.innerHTML = filteredHtmlTutors

  return tutors
}


export { validCountInput, setDropDownFilter, openMoreBlock, tutorsTmp, getTutorsFromFilter }