import * as Model from './model';
import mainFilter, { mainFilterEl } from './view/mainFilter'
import additionaFilter, { additionaFilterEl } from './view/additionaFilter'
import createEvent from './utils/createEvent'
import updateFilter from './view/updateFilter'
import candidates from './view/candidates'
import { smoothScroll, validCountInput, openMoreBlock, getTutorsFromFilter, renderTutorsinWrap, createListenerPersonBtn } from './view/utils';
import renederTutors from './view/renederTutors';
import updateCandidates from './view/updateCandidates';


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
    updateCandidates(data)
  }) 

  candidates(getData)
  mainFilter(getData)
  additionaFilter(getData)
  renederTutors(getData)

  // Получение элементов из главного фильтра
  const [
    selectedSubject,
    moreSubjectLi,

    startPriceEl,
    endPriceEl,
    
    selectedExperience,
    moreExperienceLi,

    ratingEl
  ] = mainFilterEl

  // Получение элементов из дополнительного фильтра
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

  window.addEventListener('click', function(e) {
    const selectedFilter = document.querySelectorAll('.filter__item-selected')
    const sortbyFilter = document.querySelector('.tutors__sortby')

    selectedFilter.forEach(item => {
      const itemMore = item.closest('.filter__item-block').querySelector('.filter__item-more')

      if (e.target != item) {
        item.classList.remove('filter__item-selected_active')
        itemMore.classList.add('none')
      }
    })

    if (e.target != sortbyFilter) {
      document.querySelector('.tutors__sortby-more').classList.add('none')
      sortbyFilter.classList.remove('tutors__sortby_active')
    }
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
        if (this.value > 5 || this.value == 0) {
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

  // Добавления события для сортировки
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

    document.querySelector('.tutors__title').innerText = 'Специалисты по запросу'

    getData().getTutors().then(items => {
      const filtredTutors = getTutorsFromFilter(items, getData())
      createEvent(filterBtn, {
        tutors: [...filtredTutors],
        onUpdate: 'clickFilterBtn'
      })
    })

    let data = this.getAttribute('data-search')
    smoothScroll(data, '.filter')

    isExam.checked = false
    sortbySelected.innerText = 'популярности'

  })

  // <========= События для для кнопки "Очистить фильтр" =========>
  const clearBtn = document.querySelector('.filter__btn-clear')
  clearBtn.addEventListener('click', function() {

    getData().getTutors().then(items => {
      let tutors = [...items]
      renderTutorsinWrap(tutors)

      createEvent(clearBtn, {
        onUpdate: 'clearBtn'
      })
    })

    document.querySelector('.tutors__title').innerText = 'Все специалисты'

    selectedSubject.innerText = 'любой'
    startPriceEl.value = null
    endPriceEl.value = null
    selectedExperience.innerText = 'любой'
    ratingEl.value = null
    sortbySelected.innerText = 'популярности'

    isExam.checked = false

    const liActive = document.querySelectorAll('.filter__item-li_active')
    liActive.forEach(item => {
      item.classList.remove('filter__item-li_active')
    })

    document.querySelector('.tutors__sortby-li_active').classList.remove('tutors__sortby-li_active')


    const filterSubject = document.querySelector('[data-filter="subject"]')
    filterSubject.querySelector('.filter__item-li').classList.add('filter__item-li_active')

    const filterExperience = document.querySelector('[data-filter="experience"]')
    filterExperience.querySelector('.filter__item-li').classList.add('filter__item-li_active')

    document.querySelector('.tutors__sortby-li').classList.add('tutors__sortby-li_active')

    let data = this.getAttribute('data-search')
    smoothScroll(data, '.filter')
  })


  // <========= События для для кнопки "Добавить в кандидаты" =========>
  getData().getTutors().then(items => {
    createListenerPersonBtn()
  })
 
}
