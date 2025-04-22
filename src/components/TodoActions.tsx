import React from 'react';
import SearchBar from './SearchBar';
import SortButton, { SortState } from './SortButton';
import '../styles/TodoActions.scss';

interface TodoActionsProps {
  sortState: SortState;
  onSortChange: (newSortState: SortState) => void;
  onSearch: (searchTerm: string) => void;
}

const TodoActions: React.FC<TodoActionsProps> = ({
  sortState,
  onSortChange,
  onSearch
}) => {
  return (
    <div className="todo-controls">
      <SearchBar onSearch={onSearch} />
      <div className="control-buttons">
        <SortButton sortState={sortState} onSortChange={onSortChange} />
      </div>
    </div>
  );
};

export default TodoActions; 