export const fillInput = (state, action) => {
  // state[action.payload.key] = action.payload.value;
  state = {...state, ...action.payload}
  return state
}
