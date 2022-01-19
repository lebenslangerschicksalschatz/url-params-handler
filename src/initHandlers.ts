import getURLparams from "./getURLparams"
import updateURLparams from "./updateURLparams"

function syncElementsWithParams() {
  const elements = document.querySelectorAll<HTMLElement>('[data-url-params]')
  const data = getURLparams()

  elements?.forEach(el => {
    const { tagName, type, dataset } = (<any>el)

    const isInput = tagName === 'INPUT' || tagName === 'SELECT'
    const isOnOffBox = type === 'radio' || type === 'checkbox'

    const currentKey = dataset.paramsKey
    const currentValue = (<any>el).value || dataset.paramsValue

    const match: string | string[] | boolean = data[currentKey] ?? false
    const matchedValue = Array.isArray(match) ? match.some(i => i === currentValue) : match === currentValue

    if (!match) {
      if (isInput && !isOnOffBox) (<any>el).value = ''
      if (isOnOffBox) (<any>el).checked = false
      el.classList.remove('active')

    } else {
      if (isInput && !isOnOffBox) (<any>el).value = currentValue
      if (matchedValue && isOnOffBox) (<any>el).checked = true

      matchedValue || (isInput && !isOnOffBox) ? el.classList.add('active') : el.classList.remove('active')
    }
  })
}

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

    syncElementsWithParams()
  })
}



export default () => {
  const elements = document.querySelectorAll<HTMLElement>('[data-url-params]')

  elements?.forEach(el => addParamsListeners(el))
  syncElementsWithParams()
}