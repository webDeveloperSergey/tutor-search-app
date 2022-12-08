import * as Model from './model';
import filterEl, { mainFilterEl } from './view/mainFilter'
import createEvent from './utils/createEvent'
import updateFilter from './view/updateFilter'
import { priceFormatter } from './utils/formatter';
import { validCountInput, openMoreBlock } from './view/utils';


window.onload = function() {
  const getData = Model.getData

  // Отлавливаем кастомное событие на уровне документа
  document.addEventListener('updateFilter', function(event) {
    // Передаем в модель обновленные данные, которые пришли с события
    Model.setData(event.detail)
    // Берем из модели текущие данные (updated)
    const data = Model.getData()
    // Отдаем новые данные для отоборожения актуального контента
    updateFilter(data)
  })


  filterEl(getData)

  // Получение элементов из фильтра
  const [
    selectedSubject,
    moreSubjectLi,

    startPriceEl,
    endPriceEl,
    
    selectedExperience,
    moreExperienceLi
  ] = mainFilterEl




  // <========= События =========>

  // Показывать окно с элемента для устанвки филтера "subject" и "experience"
  const selectedFilters = document.querySelectorAll('.filter__item-selected')
  selectedFilters.forEach(item => {
    item.addEventListener('click', function() {
        let parent
        const parenSubjectFilter = this.closest('[data-filter="subject"]')
        const parenExperienceFilter = this.closest('[data-filter="experience"]')

        parent = parenSubjectFilter ?? parenExperienceFilter

        openMoreBlock(this, parent)
    })
  })


  // Добавления события для филтра с предметами
  moreSubjectLi.forEach(item => {
    item.addEventListener('click', function(event) {
      const thisEl = event.target

      createEvent(thisEl, {
        subject: thisEl.innerText.toLowerCase(),
        onUpdate: 'choiceSubject'
      })

    })
  })


  // Добавления события для филтра с ценой и рейтингом
  
  const filterInputs = document.querySelectorAll('.filter__item-input')
  filterInputs.forEach(item => {
    item.addEventListener('input', function() {
      const validedInput = validCountInput(this)

      if (this.dataset.input == 'startPrice') { 
        createEvent(this, {
          startPrice: validedInput,
          onUpdate: 'updateStartPrice'
        })
      }

      if (this.dataset.input == 'endPrice') { 
        createEvent(this, {
          endPrice: validedInput,
          onUpdate: 'updateEndPrice'
        })
      }

      if (this.dataset.input == 'rating') {
        if (this.value > 5) {
          this.value = ''
        }
        createEvent(this, {
          ratingStar: validedInput,
          onUpdate: 'updateRating'
        })
      }
    })
  })


  // Добавления события для филтра опыта
  moreExperienceLi.forEach(item => {
    item.addEventListener('click', function(event) {
      const thisEl = event.target

      createEvent(thisEl, {
        experienceYear: thisEl.innerText.toLowerCase(),
        onUpdate: 'choiceExperience'
      })

    })
  })
}
