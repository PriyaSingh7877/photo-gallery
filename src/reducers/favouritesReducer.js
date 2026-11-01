export const initialFavourites = []

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE':
      if (state.includes(action.payload)) {
        return state.filter((id) => id !== action.payload)
      }
      return [...state, action.payload]
    default:
      return state
  }
}

export function loadFavourites(initialState) {
  try {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : initialState
  } catch {
    return initialState
  }
}