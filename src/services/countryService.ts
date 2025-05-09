import axios from 'axios';

interface CountryResponse {
  name: {
    common: string;
    official: string;
  };
  // Other fields that might be needed
}

export const countryService = {
  async isValidCountry(countryName: string): Promise<boolean> {
    try {
      const response = await axios.get<CountryResponse[]>(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`,
      );

      // If the API returns data, the country exists
      return (
        response.status === 200 &&
        Array.isArray(response.data) &&
        response.data.length > 0
      );
    } catch (error) {
      // If the API returns a 404, the country doesn't exist
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      } // Log other errors but don't fail validation (fallback to allow the country)
      console.error('Error validating country:', error);
      return true; // Fallback to true to prevent blocking users in case of API issues
    }
  },

  async getCountryDetails(
    countryName: string,
  ): Promise<CountryResponse | null> {
    try {
      const response = await axios.get<CountryResponse[]>(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`,
      );

      if (
        response.status === 200 &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        return response.data[0];
      }
      return null;
    } catch (error) {
      console.error('Error getting country details:', error);
      return null;
    }
  },
};
