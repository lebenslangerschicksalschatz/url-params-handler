import getURLparams from "../dist/getURLparams"
import updateURLparams from "../dist/updateURLparams"

let newParam = {
  key: 'array',
  value: 2,
  action: 'add',
}

updateURLparams(newParam)

console.log(getURLparams())