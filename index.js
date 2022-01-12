import initHandlers from "./dist/initHandlers"

import {
  getURLparams,
  updateURLparams,
  handleFilter,
  getQueryString,
  deleteUrlParam,
  handleLoadmore
} from "./dist/utils"

module.exports = (function() {
  initHandlers()
})()

module.exports = {
  getURLparams,
  updateURLparams,
  handleFilter,
  getQueryString,
  deleteUrlParam,
  handleLoadmore
}