import axios from "axios";

const ACCESS_KEY = "MImm6L6Fohm14G3qKTBNSMi90GLDV5MbEucrlJ3mBb8";
const BASE_URL = "https://api.unsplash.com/search/photos";

export const searchImages = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });
  return response.data;
};
