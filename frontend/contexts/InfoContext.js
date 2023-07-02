import React, { createContext, useState } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [salesData, setSalesData] = useState(null);
  const [cardsData, setCardsData] = useState(null);
  const [auctionsData, setAuctionsData] = useState(null);
  const [salesUserData, setSalesUserData] = useState(null);
  const [cardsUserData, setCardsUserData] = useState(null);
  const [auctionsUserData, setAuctionsUserData] = useState(null);
  const [salesCardData, setSalesCardData] = useState(null);
  const [auctionsCardData, setAuctionsCardData] = useState(null);

  return (
    <InfoContext.Provider
      value={{
        salesData,
        cardsData,
        auctionsData,
        salesUserData,
        cardsUserData,
        auctionsUserData,
        salesCardData,
        auctionsCardData,
        setSalesCardData,
        setAuctionsCardData,
        setSalesData,
        setCardsData,
        setAuctionsData,
        setSalesUserData,
        setCardsUserData,
        setAuctionsUserData
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};