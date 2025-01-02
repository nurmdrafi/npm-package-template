export type BarikoiMapPropsType = {
  apiKey: string
  initialViewState?: {
    longitude?: number
    latitude?: number
    minZoom?: number
    maxZoom?: number
    zoom?: number
    width?: number | string
    height?: number | string
  }
  controls?: {
    marker?: {
      enabled?: boolean
      url: string
    }
    fullscreen?: {
      enabled?: boolean
      position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    }
    geolocate?: {
      enabled?: boolean
      position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    }
    navigation?: {
      enabled?: boolean
      position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    }
    scale?: {
      enabled?: boolean
      position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    }
  }
  mapStyle?: 'osm-liberty' | 'osm-bright' | 'barikoi-dark'
}

// Autocomplete Context
export type AutocompleteContextType = {
  searchedPlace: string;
  setSearchedPlace: (place: string) => void;
  selectedPlace: string;
  setSelectedPlace: (place: string) => void;
  suggestions: any[];
  setSuggestions: (suggestions: any[]) => void;
  isAutocompleteLoading: boolean;
  setIsAutocompleteLoading: (loading: boolean) => void;
};

// Map Context
export type MapContextType = {
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  centerPoint: { lat: number; lng: number };
  setCenterPoint: (center: { lat: number; lng: number }) => void;
  markerData: any[];
  setMarkerData: (markerData: any[]) => void;
};

// Drawing Context
export type DrawingContextType = {
  isDrawingEnabled: boolean;
  setIsDrawingEnabled: (enabled: boolean) => void;
  drawingMode: string;
  setDrawingMode: (mode: string) => void;
};

// Combined Context
export type BarikoiMapContextType = {
  autocomplete: AutocompleteContextType;
  map: MapContextType;
  // drawing: DrawingContextType;
};