export function getURLparams() : object {
  let url = new URL(document.URL)
  let params = url.searchParams

  let data = {}
  const entries = params.keys()

  for(const entry of entries) {
    let value = params.get(entry)
    data[entry] = value
  }

  return data
}

export function updateURLparams (data : object, loadmore : boolean) {
  let url = new URL(document.URL)
  let params = url.searchParams

  for (const [key, value] of Object.entries(data)) {
    params.set(key, value)

    if((!value || value === 'all') && key !== 's') params.delete(key)
  }

  if(!loadmore) params.delete('posts')

  url.search = params.toString();
  window.history.pushState('', '', url);
}

export function handleFilter(e) {
  const filter = e.currentTarget

  let data = getURLparams()
  data[filter.dataset.type] = filter.value || filter.dataset.value

  if(filter.dataset.type === 'post_id') {
    for(const key in data) {
      if(key === 'search') data[key] = ''
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

  if(param === 'all') {
    for(const key in data) {
      data[key] = null
    }
  }

  if(data[param]?.length) {
    data[param] = null
  }

  updateURLparams(data, false)
}

interface loadmoreArgs {
  container: HTMLElement,
  render: Function,
}

export function handleLoadmore(args : loadmoreArgs) {
  const {container, render} = args
  const loadmoreBtn = document.querySelector('[data-action="loadmore"]')

  loadmoreBtn.addEventListener('click', () => {
    const initialPosts = parseFloat(container.dataset.initialPosts)

    let data = getURLparams()

    /* data['posts'] = data.posts
      ? parseFloat(data.posts) + initialPosts
      : initialPosts * 2 */

    /* update posts param (loadmore = true) */
    updateURLparams(data, true)
    /* append new posts */
    render()
  })
}

