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
  const [
    selectedSubject, 
    moreSubjectLi,
    startPriceEl,
    endPriceEl,
  ] = mainFilterEl



  // <========= События =========>

  // Показывать окно с предметами для выбора
  selectedSubject.addEventListener('click', function(event) {
    const thisEl = event.target
    const parent = event.target.closest('[data-filter="subject"]')
    const moreBlock = parent.querySelector('.filter__item-more')

    thisEl.classList.toggle('filter__item-selected_active')
    moreBlock.classList.toggle('none')
  })

  moreSubjectLi.forEach(item => {
    item.addEventListener('click', function(event) {
      const thisEl = event.target

      createEvent(thisEl, {
        subject: thisEl.innerText.toLowerCase(),
        onUpdate: 'choiceSubject'
      })



    })
  })

  startPriceEl.addEventListener('input', function() {
    const validedInput = validCountInput(this)

    console.log(validedInput)

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

}
