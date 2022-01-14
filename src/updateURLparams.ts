import { paramsInputData, updateParams } from "./utils"
import getURLparams from "./getURLparams"

function handleArrayReplace( oldArray: string[], newValue: string) : string | null {
  let result = oldArray

  !oldArray.some(i => i === newValue)
    ? result.push(newValue)
    : result = result.filter(i => i !== newValue)

  if(result.length === 0) return null

  return result.join(',')
}

function handleDataUpdate(data: paramsInputData)  {
  let url = new URL(document.URL)
  let params = url.searchParams

  for (let [key, value] of Object.entries(data)) {
    if (!value) {
      params.delete(key)
      return
    }

    params.set(key, value)
  }

  url.search = params.toString()
  window.history.pushState('', '', url)
}

export default (args: updateParams) => {
  const oldData = getURLparams()

  let merged : paramsInputData = {}
  let { key, value, action = 'replace' } = args

  if(typeof value !== 'string') value = value.toString()

  const match = oldData.hasOwnProperty(key) ? oldData[key] : false


  if(!match) {
    merged[key] = value
    handleDataUpdate(merged)

    return
  }

  if(action === 'add') {
    let oldArray = [...oldData[key]]
    merged[key] = handleArrayReplace(oldArray, value)
    console.log(merged[key])
  }

  if(action === 'replace') {
    merged[key] = oldData[key] !== value ? value : null
  }

  handleDataUpdate(merged)
}