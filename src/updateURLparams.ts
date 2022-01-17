import { paramsInputData, updateParams } from "./utils"
import getURLparams from "./getURLparams"

function handleArrayReplace(oldArray: string | string[], newValue: string): string | null {
  if (!Array.isArray(oldArray)) oldArray = [`${oldArray}`]

  let result = oldArray

  !oldArray.some(i => i === newValue)
    ? result.push(newValue)
    : result = result.filter(i => i !== newValue)

  if (result.length === 0) return null

  return result.join(',')
}

function handleDataUpdate(data: paramsInputData) {
  let url = new URL(document.URL)
  let params = url.searchParams

  for (const [key, value] of Object.entries(data)) {
    if (value) params.set(key, value)
    if (!value) params.delete(key)
  }

  url.search = params.toString()
  window.history.pushState('', '', url)
}

export default (args: updateParams) => {
  const oldData = getURLparams()

  let merged: paramsInputData = {}
  let { key, value, action = 'preserve' } = args

  if (typeof value !== 'string') value = value.toString()

  const match = oldData.hasOwnProperty(key) ? oldData[key] : false

  if (!match) {
    merged[key] = value
    handleDataUpdate(merged)
    return
  }

  if (action === 'add') {
    merged[key] = handleArrayReplace(oldData[key], value)
  }

  if (action === 'replace') {
    merged[key] = oldData[key] !== value ? value : null
  }

  if (action === 'preserve') {
    merged[key] = value
  }

  handleDataUpdate(merged)
}