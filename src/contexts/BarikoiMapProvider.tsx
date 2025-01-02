import React, { createContext, useState, useContext, ReactNode } from 'react';

// Import Types
import { BarikoiMapContextType } from '../types';

const BarikoiMapContext = createContext<BarikoiMapContextType | undefined>(undefined);

export const BarikoiMapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Autocomplete States
  const [searchedPlace, setSearchedPlace] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isAutocompleteLoading, setIsAutocompleteLoading] = useState<boolean>(false);

  // Map States
  const [zoomLevel, setZoomLevel] = useState<number>(10);
  const [centerPoint, setCenterPoint] = useState({ lat: 23.8103, lng: 90.4125 });
  const [markerData, setMarkerData] = useState<any[]>([])

  return (
    <BarikoiMapContext.Provider
      value={{
        autocomplete: {
          searchedPlace,
          setSearchedPlace,
          selectedPlace,
          setSelectedPlace,
          suggestions,
          setSuggestions,
          isAutocompleteLoading,
          setIsAutocompleteLoading,
        },
        map: {
          zoomLevel,
          setZoomLevel,
          centerPoint,
          setCenterPoint,
          markerData,
          setMarkerData
        },
        // drawing: {
        //   isDrawingEnabled,
        //   setIsDrawingEnabled,
        //   drawingMode,
        //   setDrawingMode,
        // },
      }}
    >
      {children}
    </BarikoiMapContext.Provider>
  );
};

// Custom hook to use the Barikoi Map context
export const useBarikoiMapContext = (): BarikoiMapContextType => {
  const context = useContext(BarikoiMapContext);
  if (!context) {
    throw new Error('useBarikoiMap must be used within a BarikoiMapProvider');
  }
  return context;
};
