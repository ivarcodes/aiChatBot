import axios from "axios";
export const joke =  async function getJoke() {
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
      if (response.data.error) {
        return "Sorry, I couldn't fetch a joke right now. Please try again later.";
      }
      return response.data.joke;
    } catch (error) {
      console.error(error);
      return "Sorry, there was an error fetching a joke. Please try again later.";
    }
  }