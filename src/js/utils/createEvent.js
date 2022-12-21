export default function createEvent(elemnt, details) {
  elemnt.dispatchEvent(new CustomEvent('updateFilter', {
    bubbles: true,
    detail: {...details}
  }))
}