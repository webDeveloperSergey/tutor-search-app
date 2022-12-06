import * as Model from './model';
import filterEl, { mainFilterEl } from './view/mainFilter'
import createEvent from './utils/createEvent'
import updateFilter from './view/updateFilter'
import { priceFormatter } from './utils/formatter';
import { validCountInput } from './view/utils';

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

  // Показывать окно с предметами для выбора
  selectedSubject.addEventListener('click', function(event) {
    const thisEl = event.target
    const parent = thisEl.closest('[data-filter="subject"]')
    const moreBlock = parent.querySelector('.filter__item-more')

    thisEl.classList.toggle('filter__item-selected_active')
    moreBlock.classList.toggle('none')
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


  // Добавления события для филтра с ценой от и до
  startPriceEl.addEventListener('input', function() {
    const validedInput = validCountInput(this)

    createEvent(this, {
      startPrice: validedInput,
      onUpdate: 'updateStartPrice'
    })
  })

  endPriceEl.addEventListener('input', function() {
    const validedInput = validCountInput(this)

    createEvent(this, {
      endPrice: validedInput,
      onUpdate: 'updateEndPrice'
    })
  })


  // Показывать окно с опытом для выбора
  selectedExperience.addEventListener('click', function(event) {
    const thisEl = event.target
    const parent = thisEl.closest('[data-filter="experience"]')
    const moreBlock = parent.querySelector('.filter__item-more')

    thisEl.classList.toggle('filter__item-selected_active')
    moreBlock.classList.toggle('none')
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
