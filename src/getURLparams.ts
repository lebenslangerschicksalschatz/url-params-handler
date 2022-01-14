import { parseParamValue, paramsOutputData } from "./utils"

export default (): paramsOutputData => {
  let url = new URL(document.URL)
  let params = url.searchParams

  const entries = params.keys()

  let data: paramsOutputData = {}

  for (const entry of entries) {
    let value = params.get(entry)
    if (value) data[entry] = parseParamValue(value)
  }

  return data
}