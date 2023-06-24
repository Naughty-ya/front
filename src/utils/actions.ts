interface action {}

enum ACTION_TYPE {
  INIT = 'init',
  CLICK = 'click',
  INPUT = 'input',
  UNDO = 'undo'
}

function chatReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.INIT:
      return state
    case ACTION_TYPE.CLICK:
      return ''
    case ACTION_TYPE.INPUT:
      return ''
    case ACTION_TYPE.UNDO:
    default:
      return state
  }
}
