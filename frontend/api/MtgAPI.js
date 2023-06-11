import axios from "axios";

const cardApi = axios.create({
  baseURL: "https://api.scryfall.com/cards",
});

export const getCardsSearchResults = async (searchTerm) => {
  const response = await cardApi.get("/search", {
    params: {
      limit: 2,
      q: searchTerm,
    },
  });

  return response.data.data;
};