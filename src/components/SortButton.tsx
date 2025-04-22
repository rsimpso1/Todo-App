import React from 'react';
import Button from './Button';
import '../styles/SortButton.scss';

export type SortState = 'none' | 'asc' | 'desc';

interface SortButtonProps {
  sortState: SortState;
  onSortChange: (newSortState: SortState) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ sortState, onSortChange }) => {
  const handleSort = () => {
    let newSortState: SortState;
    if (sortState === 'none') newSortState = 'asc';
    else if (sortState === 'asc') newSortState = 'desc';
    else newSortState = 'none';
    
    onSortChange(newSortState);
  };

  const getSortIcon = () => {
    if (sortState === 'none') return 'sort';
    if (sortState === 'asc') return 'arrow_upward';
    return 'arrow_downward';
  };

  return (
    <Button
      icon={getSortIcon()}
      variant="ghost"
      onClick={handleSort}
      className={`sort-button ${sortState !== 'none' ? 'active' : ''}`}
    />
  );
};

export default SortButton; 