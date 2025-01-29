const BASE_URL = "http://127.0.0.1:8000";

export const fetchTimeSeriesData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/process_timeseries`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error("Failed to fetch time series data:", error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  };

  export const fetchAR1TimeSeriesData = async (phi, sigma = 1.0, n = 1000, color = "blue") => {
    try {
        const response = await fetch(`${BASE_URL}/generate-ar1`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phi, n, sigma, color }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.error("Failed to fetch AR(1) time series data:", error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

export const fetchTimeSeriesList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/list-time-series`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.time_series; // Return only the list of time series
  } catch (error) {
    console.error("Failed to fetch time series list:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const fetchTimeSeriesById = async (seriesId) => {
  try {
    const response = await fetch(`${BASE_URL}/get-time-series/${seriesId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Return the fetched time series data
  } catch (error) {
    console.error("Failed to fetch time series data:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};