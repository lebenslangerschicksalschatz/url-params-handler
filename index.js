import initHandlers from "./dist/initHandlers"
import getURLparams from "./dist/getURLparams"
import updateURLparams from "./dist/updateURLparams"

module.exports = (function() {
  initHandlers()
})()

module.exports = {
  getURLparams,
  updateURLparams
}