# Simple URL Params Handler

> Simple functions for saving/removing your data to/from the url searchParams and synchronizing DOM elements with (basically a helper function I've been using in my projects and got tired of copying it every time)

## Getting Started
```sh
$ npm install -D url-params-handler
```
### Example:

```js
import "url-params-handler"
```
This will automatically add the handlers to all DOM elements with ```data-url-params``` attribute.

```html
<input
  type="checkbox"
  id="catId"
  data-url-params
  data-params-key="category"
  value="catId" />
<label for="catId">Category</label>

<div class="button"
  data-url-params
  data-params-key="anotherCategory"
  data-params-value="anotherCatId">
  Another Category
</div>
```
## API

### DOM attributes options

| Name | isRequired | Default value | Description |
| --- | --- | --- | --- |
| data-url-params | `true` |  | initializes handlers |
| data-params-key | `true` | null | defines the key |
| data-params-value | `true` | null | defines the value (not required for elements with `value` attr.) |
| data-params-action | `false` | `"preserve"` | defines the action type |

### Options for `data-params-action`

| Value | Descrition |
| --- | --- |
| `"preserve"` | Saves the current key value pair; replaces the old one with the same key but different value; preserves if the values is the same |
| `"replace"` | Same as `"preserve"` but removes the key value pair if the value is the same  |
| `"add"` | Adds comma separated values for key value pair with the same key; removes the value if the value was previously added |

### Available functions

```js
import { getURLparams, updateURLparams } from "url-params-hanlder"
```

`getURLparams()` returns the object of the current URLsearchParams. Example:

```https://yourwebsite.com?categories=videos,insights,news,articles&userId=12&location=US```

The URL above will return:
```js
{
  categories: ['videos', 'insights', 'news', 'articles'],
  userId: '12',
  location: 'US',
}
```

`updateURLparams()` updates URLsearchParams with the following options (options similar to [DOM attributes](#dom-attributes-options)) :

```js
updateURLparams({
  key: "userId",
  value: 12,
  action: "replace",
})
```