import { tutorsTmp } from "./utils"

export default function init(getData) {
  const data = getData()
  const tutorsWrap = document.querySelector('.tutors__bottom')

  data.getTutors().then(items => {
    const tutorsHtml = tutorsTmp(items)
    tutorsWrap.innerHTML = tutorsHtml
  })
}