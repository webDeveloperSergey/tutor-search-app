export let additionaFilterEl = []

export default function init(getData) {
  const data = getData()

  const {
    isExam,
    sortbySelected,
    sortby
  } = data

  const isExamEl = document.querySelector('.tutors__checkbox')
  isExamEl.dataset.checked = isExam

  const sortbySelectedEl = document.querySelector('.tutors__sortby-selected')
  sortbySelectedEl.innerText = sortbySelected

  const sortbyLi = document.querySelectorAll('.tutors__sortby-li')
  sortbyLi.forEach((item, index) => {
    item.innerText = sortby[index]
  })

  additionaFilterEl.push(isExamEl, sortbySelectedEl, sortbyLi)

}