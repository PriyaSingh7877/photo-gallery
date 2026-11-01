# Photo Gallery

A simple photo gallery web app built with React. It fetches photos from the Picsum Photos API, shows them in a responsive grid, lets users search by author name, and mark photos as favourites.

## Features

- Fetches 30 photos from the Picsum Photos API, with a loading spinner and an error message
- Responsive grid: 4 columns on desktop, 2 on tablet, 1 on mobile
- Real-time search by author name (filters already-fetched data, no extra API call)
- Favourite photos with a heart button, managed using `useReducer`
- Favourites persist across page refreshes using `localStorage`

## Tech Stack

- React (functional components and hooks)
- Vite
- Tailwind CSS

## React Concepts Used

- Custom hook: `useFetchPhotos` (returns `photos`, `loading`, `error`)
- `useReducer` for favourites state
- `useMemo` for the filtered photo list
- `useCallback` for the search handler
- `useEffect` for saving favourites to `localStorage`

## Getting Started

```bash
git clone <your-repo-url>
cd photo-gallery
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.