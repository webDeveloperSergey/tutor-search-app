import { renderTutorsinWrap, tutorsTmp } from "./utils"

export default function init(getData) {
  const data = getData()

  data.getTutors().then(items => {
    renderTutorsinWrap(items)
  })
}