import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import TodoItem from './TodoItem';
import Button from './Button';
import Input from './Input';
import PriorityButton from './PriorityButton';
import TodoActions from './TodoActions';
import { SortState } from './SortButton';
import '../styles/Todo.scss';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'p5' | 'p4' | 'p3' | 'p2' | 'p1';
}

const Todo: React.FC = () => {
  // Generate a unique ID for todo items
  const generateUniqueId = () => {
    return 'todo-' + Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage on initial render
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      // Ensure all todos have proper IDs
      return parsedTodos.map((todo: Todo) => ({
        ...todo,
        id: todo.id.startsWith('todo-') ? todo.id : generateUniqueId()
      }));
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTodoPriority, setNewTodoPriority] = useState<'p5' | 'p4' | 'p3' | 'p2' | 'p1'>('p5');
  const [sortState, setSortState] = useState<SortState>('none');
  const [searchValue, setSearchValue] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: generateUniqueId(),
        text: inputValue.trim(),
        completed: false,
        priority: newTodoPriority,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleToggle = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    setEditingId(null);
  };

  const handlePriorityChange = (id: string, priority: 'p5' | 'p4' | 'p3' | 'p2' | 'p1') => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, priority } : todo
    ));
  };

  const handleStartEdit = (id: string) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSortChange = (newSortState: SortState) => {
    setSortState(newSortState);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchValue(searchTerm);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Get the current list of todos
    const currentTodos = getFilteredAndSortedTodos();
    
    // Create a new array with the reordered items
    const items = Array.from(currentTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update the todos state with the reordered items
    setTodos(items);
  };

  const getFilteredAndSortedTodos = () => {
    // First filter by search term if there is one
    const filteredTodos = searchValue.trim() 
      ? todos.filter(todo => 
          todo.text.toLowerCase().includes(searchValue.toLowerCase()))
      : todos;
    
    // Then apply sorting if needed
    if (sortState === 'none') return filteredTodos;
    
    const priorityOrder = { p1: 1, p2: 2, p3: 3, p4: 4, p5: 5 };
    return [...filteredTodos].sort((a, b) => {
      const diff = priorityOrder[a.priority] - priorityOrder[b.priority];
      return sortState === 'asc' ? diff : -diff;
    });
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
        />
        <div className="form-actions">
          <PriorityButton
            priority={newTodoPriority}
            onPriorityChange={setNewTodoPriority}
          />
          <Button
            icon="add"
            variant="primary"
            active={!!inputValue.trim()}
            type="submit"
          />
        </div>
      </form>
      <TodoActions
        sortState={sortState}
        onSortChange={handleSortChange}
        onSearch={handleSearch}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              className="todo-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {getFilteredAndSortedTodos().map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`todo-item-wrapper ${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      <TodoItem
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        priority={todo.priority}
                        isEditing={editingId === todo.id}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onPriorityChange={handlePriorityChange}
                        onStartEdit={handleStartEdit}
                        onCancelEdit={handleCancelEdit}
                        dragHandleProps={provided.dragHandleProps || undefined}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Todo; 