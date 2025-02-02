const BASE_URL = "http://127.0.0.1:8000";

export const fetchTimeSeriesProjects = async () => {
  try {
    const response = await fetch(`${BASE_URL}/list-time-series-projects`);
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

export const fetchTimeSeriesById = async (project_uuid) => {
  try {
    const response = await fetch(`${BASE_URL}/load-time-series-project/${project_uuid}`);
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


export const callApiCreateProject = async (phi, sigma = 1.0, n = 1000, color = "blue") => {
  try {
    const response = await fetch(`${BASE_URL}/create-project`, {
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




export const fetchSyntheticNetworkData = async (project_uuid) => {
  try {
    const response = await fetch(`${BASE_URL}/get-synthetic-network/${project_uuid}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch time series data:", error);
    throw error;
  }
};


export const fetchNetworkData = async (project_uuid) => {
  try {
    const response = await fetch(`${BASE_URL}/get-network/${project_uuid}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch time series data:", error);
    throw error;
  }
};

export const fetchSyntheticTimeSeriesById = async (project_uuid) => {
  try {
    const response = await fetch(`${BASE_URL}/load-synthetic/${project_uuid}`);
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

export const generateSyntheticVersionByProjectUUID = async (project_uuid) => {
  if(project_uuid === undefined || project_uuid === "") {
      alert("Variable project_uuid is null or empty, cannot call api.")
  }
  try {
    const response = await fetch(`${BASE_URL}/generate-synthetic/${project_uuid}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch time series data:", error);
    throw error;
  }
};