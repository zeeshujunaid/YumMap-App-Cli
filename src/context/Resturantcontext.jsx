import React, {createContext, useState} from 'react';

// 💡 Create and export context
export const RestaurantContext = createContext();

export const RestaurantProvider = ({children}) => {
  const [restaurantData, setRestaurantData] = useState([]);

  return (
    <RestaurantContext.Provider value={{restaurantData, setrestaurantdata: setRestaurantData}}>
      {children}
    </RestaurantContext.Provider>
  );
};
