import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  function addFavorite(id) {
    setFavoriteMealIds((currentFavorites) => [...currentFavorites, id]);
  }

  function removeFavorite(id) {
    setFavoriteMealIds((currentFavorites) =>
      currentFavorites.filter((mealId) => mealId !== id)
    );
  }

  const value = {
    addFavorite,
    removeFavorite,
    ids: favoriteMealIds,
  };
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
