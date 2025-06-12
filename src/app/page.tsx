'use client'
import { useAuth } from "@/providers/auth-provider";
import { useEffect, useState } from "react";
import useGetTasks from "./hooks/api/task/useGetTasks";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

interface Note {
  id: number;
  lastEdited: string;
}

const page: React.FC = () => {
  const {user} = useAuth();
const {data, isLoading, error,refetch} = useGetTasks(); 
  const [tasks, setTasks] = useState<Task[]>([]);
useEffect(() => {
  if(data){
    console.log('data ',data)
    setTasks(data);
  }
}, [data]);
  const [notes] = useState<Note[]>([
    { id: 1, lastEdited: 'Last edited 2 days ago' },
    { id: 2, lastEdited: 'Last edited 3 days ago' },
    { id: 3, lastEdited: 'Last edited 4 days ago' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: 'New Task',
      dueDate: 'Due Soon',
      completed: false
    };
    setTasks([...tasks, newTask]);
  };
  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-[#f9fbf9] group/design-root overflow-x-hidden"
      style={{
        '--checkbox-tick-svg': "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(18,26,15)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z%27/%3e%3c/svg%3e')",
        fontFamily: 'Manrope, "Noto Sans", sans-serif'
      } as React.CSSProperties}
    >
      <div className="layout-container flex h-full grow flex-col">

        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#121a0f] tracking-light text-[32px] font-bold leading-tight min-w-72">Welcome back, {user?.username}</p>
            </div>
            
            <h3 className="text-[#121a0f] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Tasks</h3>
            
            {tasks.length === 0 ? ( 
              <p>No tasks found</p>
              ) : (
                tasks.map((task:Task) => (
              <div key={task.id} className="flex items-center gap-4 bg-[#f9fbf9] px-4 min-h-[72px] py-2 justify-between hover:bg-[#f0f5ee] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-[#121a0f] flex items-center justify-center rounded-lg bg-[#ebf2e9] shrink-0 size-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className={`text-base font-medium leading-normal line-clamp-1 ${task.completed ? 'text-[#639155] line-through' : 'text-[#121a0f]'}`}>
                      {task.title}
                    </p>
                    <p className="text-[#639155] text-sm font-normal leading-normal line-clamp-2">{task.dueDate}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <div className="flex size-7 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="h-5 w-5 rounded border-[#d6e5d2] border-2 bg-transparent text-[#53d22c] checked:bg-[#53d22c] checked:border-[#53d22c] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#d6e5d2] focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )) 
          )}
            
            <h3 className="text-[#121a0f] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Notes</h3>
            
            {notes.map((note:Note) => (
              <div key={note.id} className="flex items-center gap-4 bg-[#f9fbf9] px-4 min-h-[72px] py-2 justify-between hover:bg-[#f0f5ee] transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="text-[#121a0f] flex items-center justify-center rounded-lg bg-[#ebf2e9] shrink-0 size-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#121a0f] text-base font-medium leading-normal line-clamp-1">{note.title}</p>
                    <p className="text-[#639155] text-sm font-normal leading-normal line-clamp-2">{note.lastEdited}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <div className="text-[#121a0f] flex size-7 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;