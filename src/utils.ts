export const parseParamValue = (value: string): string | string[] => {
  const isArray = value.includes(',')

  if (!isArray) return value

  return value.split(',').filter(i => i.length > 0 && i)
}

/* export function handleFilter(e) {
  const filter = e.currentTarget

  let data = getURLparams()
  data[filter.dataset.type] = filter.value || filter.dataset.value

  if (filter.dataset.type === 'post_id') {
    for (const key in data) {
      if (key === 'search') data[key] = ''
    }
  }

  updateURLparams(data, false)
}

export function getQueryString() {
  const data = getURLparams()
  const result = new URLSearchParams(data)

  return result.toString()
}

export function deleteUrlParam(param) {
  let data = getURLparams()

  if (param === 'all') {
    for (const key in data) {
      data[key] = null
    }
  }

  if (data[param]?.length) {
    data[param] = null
  }

  updateURLparams(data, false)
}

interface loadmoreArgs {
  container: HTMLElement,
  render: Function,
}

export function handleLoadmore(args: loadmoreArgs) {
  const { container, render } = args
  const loadmoreBtn = document.querySelector('[data-action="loadmore"]')

  loadmoreBtn.addEventListener('click', () => {
    const initialPosts = parseFloat(container.dataset.initialPosts)

    let data = getURLparams()

    data['posts'] = data.posts
      ? parseFloat(data.posts) + initialPosts
      : initialPosts * 2

    updateURLparams(data, true)
    render()
  })
}
 */
