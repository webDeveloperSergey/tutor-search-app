export let additionaFilterEl = []

export default function init(getData) {
  const data = getData()

  const {
    isExam,
    sortbySelected,
    sortbyList
  } = data

  const isExamEl = document.querySelector('.tutors__checkbox')
  isExamEl.checked = isExam

  const sortbySelectedEl = document.querySelector('.tutors__sortby-selected')
  sortbySelectedEl.innerText = sortbySelected

  const sortbyMoreBlock = document.querySelector('.tutors__sortby-more')
  const renderSortbyList = sortbyList.map(item => {
    return `<li class="tutors__sortby-li">${item}</li>`
  })
  sortbyMoreBlock.innerHTML = renderSortbyList.join('')

  const sortbyLi = document.querySelectorAll('.tutors__sortby-li')
  document.querySelector('.tutors__sortby-li').classList.add('tutors__sortby-li_active')

  additionaFilterEl.push(isExamEl, sortbySelectedEl, sortbyLi)

}