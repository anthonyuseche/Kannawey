import React, { useState, useRef, useEffect } from 'react';
import { MOCK_TASKS, MOCK_COLUMNS } from '../constants';
import { KanbanColumn, KanbanTask } from '../types';
import { TrashIcon } from './IconComponents';

const TaskCard: React.FC<{ 
    task: KanbanTask; 
    isDragging: boolean; 
    onDelete: (taskId: string) => void;
    onUpdate: (taskId: string, newContent: string) => void;
}> = ({ task, isDragging, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(task.content);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);
    
    const handleBlur = () => {
        if(content.trim() === '') {
            onDelete(task.id);
        } else if (content.trim() !== task.content) {
            onUpdate(task.id, content.trim());
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleBlur();
        }
        if (e.key === 'Escape') {
            setContent(task.content);
            setIsEditing(false);
        }
    };

    return (
        <div
            className={`bg-surface p-3 rounded-lg shadow-md border border-white/10 mb-2 transition-opacity relative group ${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            {isEditing ? (
                 <textarea
                    ref={inputRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-background border border-secondary/50 rounded-md p-1 text-sm text-white resize-none focus:outline-none focus:ring-1 focus:ring-secondary"
                    rows={3}
                />
            ) : (
                <p onClick={() => setIsEditing(true)} className="text-white text-sm whitespace-pre-wrap w-full cursor-pointer min-h-[20px]">
                    {task.content}
                </p>
            )}
            <button onClick={() => onDelete(task.id)} className="absolute top-2 right-2 p-1 rounded-full bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <TrashIcon className="h-4 w-4" />
            </button>
        </div>
    );
};

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<{ [key: string]: KanbanTask }>(MOCK_TASKS);
  const [columns, setColumns] = useState<{ [key: string]: KanbanColumn }>(MOCK_COLUMNS);
  const [columnOrder] = useState(['column-1', 'column-2', 'column-3']);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    let sourceColumnId: string | null = null;
    for (const colId in columns) {
      if (columns[colId].taskIds.includes(draggedTaskId)) {
        sourceColumnId = colId;
        break;
      }
    }

    if (!sourceColumnId || sourceColumnId === targetColumnId) {
      setDraggedTaskId(null);
      return;
    }

    const newColumns = { ...columns };
    const sourceTaskIds = Array.from(newColumns[sourceColumnId].taskIds);
    sourceTaskIds.splice(sourceTaskIds.indexOf(draggedTaskId), 1);
    newColumns[sourceColumnId] = { ...newColumns[sourceColumnId], taskIds: sourceTaskIds };
    
    const targetTaskIds = Array.from(newColumns[targetColumnId].taskIds);
    targetTaskIds.push(draggedTaskId);
    newColumns[targetColumnId] = { ...newColumns[targetColumnId], taskIds: targetTaskIds };

    setColumns(newColumns);
    setDraggedTaskId(null);
  };
  
  const handleAddTask = (columnId: string, content: string) => {
    if (!content.trim()) return;
    const newTaskId = `task-${new Date().getTime()}`;
    const newTask: KanbanTask = { id: newTaskId, content };
    
    setTasks(prev => ({ ...prev, [newTaskId]: newTask }));
    setColumns(prev => {
        const newCols = {...prev};
        newCols[columnId].taskIds.push(newTaskId);
        return newCols;
    });
  };

  const handleDeleteTask = (taskIdToDelete: string) => {
    const newTasks = { ...tasks };
    delete newTasks[taskIdToDelete];
    setTasks(newTasks);

    const newColumns = { ...columns };
    for (const columnId in newColumns) {
        newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(id => id !== taskIdToDelete);
    }
    setColumns(newColumns);
};

  const handleUpdateTask = (taskId: string, newContent: string) => {
    setTasks(prev => ({
        ...prev,
        [taskId]: { ...prev[taskId], content: newContent }
    }));
  };

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      <h2 className="text-3xl font-black font-title mb-6 text-center">Tablero de Tareas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columnOrder.map(columnId => {
          const column = columns[columnId];
          const columnTasks = column.taskIds.map(taskId => tasks[taskId]).filter(Boolean);
          return (
            <div 
              key={column.id} 
              className="bg-surface/50 rounded-lg p-4 border border-white/10"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <h3 className="font-bold font-title text-xl text-center text-secondary mb-4">{column.title}</h3>
              <div className="min-h-[200px]">
                {columnTasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={() => setDraggedTaskId(null)}
                  >
                    <TaskCard task={task} isDragging={draggedTaskId === task.id} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
                  </div>
                ))}
              </div>
               <form onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.elements.namedItem('taskContent') as HTMLInputElement;
                  handleAddTask(columnId, input.value);
                  input.value = '';
               }} className="mt-4">
                  <input 
                    name="taskContent"
                    className="w-full bg-background border border-pink-500/50 rounded-lg px-3 py-2 text-sm text-white placeholder-muted/50 focus:ring-2 focus:ring-secondary focus:outline-none transition" 
                    placeholder="+ Añadir nueva tarea" 
                  />
               </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;