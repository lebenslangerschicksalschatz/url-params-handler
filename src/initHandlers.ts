import getURLparams from "./getURLparams"
import updateURLparams from "./updateURLparams"

function addParamsListeners(element: HTMLElement) {
  const { type, tagName, dataset } = (<any>element)
  const isInput = tagName === 'INPUT'

  let listener = 'change'

  if (!isInput) listener = 'click'
  if (isInput && type === 'text') listener = 'keyup'

  element.addEventListener(listener, () => {
    element.classList.toggle('active')

    updateURLparams({
      value: (<any>element).value ?? dataset.paramsValue,
      key: dataset.paramsKey,
      action: dataset.paramsAction,
    })
  })
}

function syncElementsWithParams(element: HTMLElement) {
  const currentData = getURLparams()
  const { tagName, type, dataset } = (<any>element)
  const elementValue = (<any>element).value || dataset.paramsValue

  const isInput = tagName === 'INPUT' || tagName === 'SELECT'
  const isOnOffBox = type === 'radio' || type === 'checkbox'

  const match: string | string[] | boolean = currentData[dataset.paramsKey] ?? false
  const matchedValue = Array.isArray(match) ? match.includes(elementValue) : match === elementValue

  if (match && matchedValue) {
    if (isInput && !isOnOffBox) (<any>element).value = match
    if (isOnOffBox) (<any>element).checked = !(<any>element).checked

    element.classList.add('active')
  }
}

export default () => {
  const elements = document.querySelectorAll<HTMLElement>('[data-url-params]')

  elements && elements.forEach(el => {
    addParamsListeners(el)
    syncElementsWithParams(el)
  })
}