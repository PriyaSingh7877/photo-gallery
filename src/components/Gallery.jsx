// ---------- IMPORTS ----------
// React ke hooks: state, memoization, callback, reducer aur side-effect ke liye
import { useState, useMemo, useCallback, useReducer, useEffect } from 'react'
// Apna custom hook jo API se photos laata hai
import useFetchPhotos from '../hooks/useFetchPhotos'
// Reducer, uski shuruaati state, aur localStorage se padhne wala function
import { favouritesReducer, initialFavourites, loadFavourites } from '../reducers/favouritesReducer'

function Gallery() {
  // Hook se teen cheezein: photos ka data, loading status, aur error
  const { photos, loading, error } = useFetchPhotos()

  // Search box me jo user type kare wo yahan store hota hai
  const [searchTerm, setSearchTerm] = useState('')

  // Favourites ki list. loadFavourites app khulte hi ek baar chalta hai
  // aur localStorage se saved list uthata hai (refresh ke baad bhi bachi rahe)
  const [favourites, dispatch] = useReducer(favouritesReducer, initialFavourites, loadFavourites)

  // Jab bhi favourites badle, naya data localStorage me save karo
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  // Search input ka handler. useCallback se ye function har render pe naya nahi banta
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  // Author ke naam se photos filter karo. useMemo se ye tabhi dobara chalta hai
  // jab photos ya searchTerm badle. toLowerCase se capital/small ka farak nahi padta
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [photos, searchTerm])

  // ---------- LOADING STATE ----------
  // Jab tak API se data aa raha hai, ghumta hua spinner dikhao
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    )
  }

  // ---------- ERROR STATE ----------
  // API fail ho gayi to error message dikhao
  if (error) {
    return <p className="text-center text-red-600 p-4">Error: {error}</p>
  }

  // ---------- MAIN UI ----------
  return (
    <div className="p-4">
      {/* Search box: value aur onChange se React state input ko control karti hai */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by author name..."
        className="w-full md:w-1/2 mx-auto block border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />

      {/* Responsive grid: mobile pe 1, tablet pe 2, desktop pe 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtered photos me se har photo ke liye ek card banao */}
        {filteredPhotos.map((photo) => (
          // key se React har card ko pehchanta hai
          <div key={photo.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Photo: 400x300 size ki chhoti image mangwate hain taaki page fast rahe */}
            <img
              src={`https://picsum.photos/id/${photo.id}/400/300`}
              alt={photo.author}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 flex justify-between items-center">
              {/* Author ka naam */}
              <p className="font-medium">{photo.author}</p>

              {/* Heart button: click pe reducer ko TOGGLE_FAVOURITE action bhejta hai */}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_FAVOURITE', payload: photo.id })}
                aria-label="Toggle favourite"
                // Favourite hai to laal, nahi to grey
                className={`text-2xl ${
                  favourites.includes(photo.id) ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                ♥
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery