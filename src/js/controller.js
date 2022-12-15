import * as Model from './model';
import mainFilter, { mainFilterEl } from './view/mainFilter'
import additionaFilter, { additionaFilterEl } from './view/additionaFilter'
import createEvent from './utils/createEvent'
import updateFilter from './view/updateFilter'
import { priceFormatter } from './utils/formatter';
import { validCountInput, openMoreBlock, getTutorsFromFilter, getTutorsFromOneFilter } from './view/utils';
import renederTutors from './view/renederTutors';


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


  mainFilter(getData)
  additionaFilter(getData)
  renederTutors(getData)

  // Получение элементов из фильтра
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




  // <========= События для Поиска =========>

  document.querySelector('.header__search').addEventListener('input', function() {
    createEvent(this, {
      search: this.value,
      onUpdate: 'updateSearch'
    })


    
    renederTutors(getData)
  })


  // <========= События для mainFilter =========>

  // Показывать окно с элемента для устанвки филтера "subject" и "experience"
  const selectedFilters = document.querySelectorAll('.filter__item-selected')
  selectedFilters.forEach(item => {
    item.addEventListener('click', function() {
        let parent
        const parenSubjectFilter = this.closest('[data-filter="subject"]')
        const parenExperienceFilter = this.closest('[data-filter="experience"]')

        parent = parenSubjectFilter ?? parenExperienceFilter

        document.querySelector('.tutors__sortby-more').classList.add('none')
        sortbySelected.parentElement.classList.remove('tutors__sortby_active')

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
          rating: validedInput,
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



  // <========= События для additionaFilter =========>

  // Добавления события для чекбокса isExam
  isExam.addEventListener('change', function() {

    createEvent(this, {
      isExam: this.checked,
      onUpdate: 'updateIsExam'
    })
  })


  const sortbySelectedParent = sortbySelected.parentElement
  sortbySelectedParent.addEventListener('click', function() {
    const sortbyDropDown = document.querySelector('.tutors__sortby-more')

    const mainFilters = document.querySelectorAll('.filter__item-more')
    mainFilters.forEach(item => {
      item.classList.add('none')
    })

    const mainFiltersSelected = document.querySelectorAll('.filter__item-selected')
    mainFiltersSelected.forEach(item => {
      item.classList.remove('filter__item-selected_active')
    })

    this.classList.toggle('tutors__sortby_active')
    sortbyDropDown.classList.toggle('none')
  })

  sortbyLi.forEach(item => {
    item.addEventListener('click', function() {
      
      createEvent(this, {
        sortbySelected: this.innerText,
        onUpdate: 'updateSortby'
      })
    })
  })



  // <========= События для для кнопки "Искать репетитора" =========>

  const filterBtn = document.querySelector('.filter__btn')
  filterBtn.addEventListener('click', function() {

    getData().getTutors().then(items => {
      const filtredTutors = getTutorsFromFilter(items, getData())
      createEvent(filterBtn, {
        tutors: [...filtredTutors],
        onUpdate: 'clickFilterBtn'
      })
    })
  })

}
