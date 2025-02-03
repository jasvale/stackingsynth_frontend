const BASE_URL = "http://127.0.0.1:8000";

export const fetchTimeSeriesProjects = async () => {
  try {
    console.log(`${BASE_URL}/list-time-series-projects`);
    const response = await fetch(`${BASE_URL}/list-time-series-projects`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.time_series;
  } catch (error) {
    console.error("Failed to fetch time series list:", error);
    throw error;
  }
};

export const fetchTimeSeriesById = async (project_uuid) => {
  try {
    console.log(`${BASE_URL}/load-time-series-project/${project_uuid}`);
    const response = await fetch(`${BASE_URL}/load-time-series-project/${project_uuid}`);
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

export const callApiCreateProject = async (phi, sigma = 1.0, n = 1000, color = "blue") => {
  try {
    console.log(`${BASE_URL}/create-project`);
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
    return data;
  } catch (error) {
    console.error("Failed to fetch AR(1) time series data:", error);
    throw error;
  }
};

export const fetchSyntheticNetworkData = async (project_uuid) => {
  try {
    console.log(`${BASE_URL}/get-synthetic-network/${project_uuid}`);
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
    console.log(`${BASE_URL}/get-network/${project_uuid}`);
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
    console.log(`${BASE_URL}/load-synthetic/${project_uuid}`);
    const response = await fetch(`${BASE_URL}/load-synthetic/${project_uuid}`);
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

export const generateSyntheticVersionByProjectUUID = async (project_uuid) => {
  if(project_uuid === undefined || project_uuid === "") {
      alert("Variable project_uuid is null or empty, cannot call api.")
  }
  try {
    console.log(`${BASE_URL}/generate-synthetic/${project_uuid}`);
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