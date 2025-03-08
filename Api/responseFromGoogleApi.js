import axios from 'axios';

export const responseFromGoogleApi = async function getResponseFromGoogleGemini(messageContent) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.APIKEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: messageContent
              }
            ]
          }
        ]
      }
    );

    return response.data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    return "Sorry, I couldn't process your request. Please try again later.";
  }
};
