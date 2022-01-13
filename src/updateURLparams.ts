import { paramsData } from "./utils"

/* function handleArrayReplace( inputArray: string | number | any[]) : string[] {

} */

export default (data: paramsData, loadmore: boolean) => {
  let url = new URL(document.URL)
  let params = url.searchParams

  for (const [key, value] of Object.entries(data)) {
    params.set(key, value)

    if ((!value || value === 'all') && key !== 's') params.delete(key)
  }

  if (!loadmore) params.delete('posts')

  url.search = params.toString();
  window.history.pushState('', '', url);
}