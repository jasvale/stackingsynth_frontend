import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  // AR Parameters state
  const [arParameters, setArParameters] = useState({
    phi: 0.9,
    sigma: 1.0,
    n: 2000,
  });

  // Selected UUID state
  const [selectedUuid, setSelectedUuid] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showLoadingSyntheticDashboard, setShowLoadingSyntheticDashboard] = useState(true);
  const [showLoadingBaselineDashboard, setShowLoadingBaselineDashboard] = useState(true);

  // Additional states can be added here if needed

  return (
    <AppContext.Provider value={{ 
        arParameters, setArParameters, 
        selectedUuid, setSelectedUuid, 
        loading, setLoading, 
        showLoadingSyntheticDashboard, setShowLoadingSyntheticDashboard,
        showLoadingBaselineDashboard, setShowLoadingBaselineDashboard }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => useContext(AppContext);
