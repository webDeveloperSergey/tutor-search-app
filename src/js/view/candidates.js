export default function init(getData) {
  const data = getData()
  document.querySelector('.header__item-cand-count').innerText = data.candCount
}