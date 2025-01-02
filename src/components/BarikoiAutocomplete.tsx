import React, { useEffect, useRef, useState } from 'react';
import { useAutocomplete } from '../contexts/hooks/useAutocomplete';

type PropsType = {
  apiKey: string;
  className?: {
    container?: string;
    input?: string;
    dropdown?: string;
    dropdownItem?: string;
    noResult?: string;
    clearButton?: string;
  };
};

const defaultStyles = {
  container: {
    width: '400px',
    position: 'relative' as const,
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    width: '100%',
    padding: '10px 30px 10px 10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box' as const,
    position: 'relative' as const,
  },
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    width: '99.5%',
    maxHeight: '200px',
    overflowY: 'auto' as const,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    zIndex: 1000,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    opacity: 0,
    transform: 'translateY(-10px)',
    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  },
  dropdownVisible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0',
    transition: 'background-color 0.2s ease-in-out',
  },
  dropdownItemHover: {
    backgroundColor: '#f5f5f5',
  },
  noResult: {
    padding: '10px',
    color: '#999',
  },
  clearButton: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#999'
  }
};

const BarikoiAutocomplete: React.FC<PropsType> = ({ apiKey, className = {} }) => {
  const { searchedPlace, setSearchedPlace,  setSelectedPlace, suggestions, setSuggestions, isAutocompleteLoading, setIsAutocompleteLoading } = useAutocomplete();
  // States
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  // Fetch Suggestions with Debounce
  useEffect(() => {
    if (!searchedPlace.trim()) {
      setSuggestions([]);
      setIsDropdownVisible(false);
      return;
    }

    setIsAutocompleteLoading(true);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://barikoi.xyz/v2/api/search/autocomplete/place?api_key=${apiKey}&q=${searchedPlace}`
        );
        const { places } = await response.json();
        const newSuggestions: any[] =
          places?.map((place: any, index: number) => ({
            id: place?.id || index,
            name: place?.address || 'Unknown',
            ...place,
          })) || [];
        setSuggestions(newSuggestions);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error('Error fetching autocomplete data:', error);
        setSuggestions([]);
      } finally {
        setIsAutocompleteLoading(false);
      }
    }, 300); // 300ms debounce time
  }, [searchedPlace, apiKey]);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedPlace(e.target.value);
  };

  // Handle Item Click
  const handleSelect = (item: any) => {
    setSearchedPlace(item.name);
    setSelectedPlace(item);
    setIsDropdownVisible(false);
  };

  // Handle Clear Input
  const handleClear = () => {
    setSearchedPlace('');
    setSelectedPlace('');
    setSuggestions([]);
    setIsDropdownVisible(false);
  };

  // Render Dropdown Items
  const renderSuggestions = () => {
    if (isAutocompleteLoading) {
      return (
        <div
          style={defaultStyles.noResult}
          className={className.noResult || ''}
        >
          Loading...
        </div>
      );
    }

    if (suggestions.length === 0) {
      return (
        <div
          style={defaultStyles.noResult}
          className={className.noResult || ''}
        >
          No results found
        </div>
      );
    }

    return suggestions.map((item: any) => (
      <div
        key={item.id}
        style={defaultStyles.dropdownItem}
        className={className.dropdownItem || ''}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            defaultStyles.dropdownItemHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = 'transparent')
        }
        onClick={() => handleSelect(item)}
      >
        {item.name}
      </div>
    ));
  };

  return (
    <div
      style={defaultStyles.container}
      className={className.container || ''}
    >
      {/* Input Field */}
      <input
        type="text"
        value={searchedPlace}
        onChange={handleChange}
        placeholder="Search Address"
        style={defaultStyles.input}
        className={className.input || ''}
      />

      {/* Clear Button */}
      {searchedPlace && (
        <button 
          style={defaultStyles.clearButton}
          className={className.clearButton || ''}
          onClick={handleClear}
        >
        X
        </button>
      )}

      {/* Dropdown */}
      <div
        style={{
          ...defaultStyles.dropdown,
          ...(isDropdownVisible ? defaultStyles.dropdownVisible : {}),
        }}
        className={className.dropdown || ''}
      >
        {renderSuggestions()}
      </div>
    </div>
  );
};

export default BarikoiAutocomplete;
