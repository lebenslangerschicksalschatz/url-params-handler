import { parseParamValue } from "./utils"

interface paramsData {
  [key: string]: string | string[]
}

export default (): object => {
  let url = new URL(document.URL)
  let params = url.searchParams

  const entries = params.keys()

  let data: paramsData = {}

  for (const entry of entries) {
    let value = params.get(entry)
    if (value) data[entry] = parseParamValue(value)
  }

  return data
}