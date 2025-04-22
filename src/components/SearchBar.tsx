import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import '../styles/SearchBar.scss';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchValue('');
      onSearch('');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        {isSearchVisible && (
          <Input
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search todos..."
            className="search-input"
            autoFocus
          />
        )}
      </div>
      <Button
        icon="search"
        variant="ghost"
        onClick={handleSearchToggle}
        className={`search-button ${isSearchVisible ? 'active' : ''}`}
      />
    </div>
  );
};

export default SearchBar; 