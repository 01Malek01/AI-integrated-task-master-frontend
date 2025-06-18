'use client'
import { useAuth } from "@/providers/auth-provider";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { redirect } from "next/navigation";
import useGetTasks from "../hooks/api/task/useGetTasks";
import TaskCard from "./TaskCard";
import NoteCard from "./NoteCard";
import useGetNotes from "../hooks/api/note/useGetNotes";
import useUpdateTaskStatus from "../hooks/api/task/useUpdateTaskStatus";
import { Task } from "@/types/task";
import { Note } from "../../../types";




const Home: React.FC = () => {
  const {user ,isAuthenticated , isInitialized ,isLoading: authLoading} = useAuth();
const {data : tasksData, isLoading : tasksLoading, error : tasksError,refetch : tasksRefetch} = useGetTasks(); 
const {data : notesData, isLoading : notesLoading, error : notesError,refetch : notesRefetch} = useGetNotes(); 
 const {updateTaskStatus , isPending : updateTaskStatusIsPending , error : updateTaskStatusError}  = useUpdateTaskStatus();
const [tasks, setTasks] = useState<Task[]>([]);
const [notes, setNotes] = useState<Note[]>([]);
useEffect(() => {
  if(tasksData){
    setTasks(tasksData);
  }
}, [tasksData]);
useEffect(() =>
  {
    if(notesData){
      setNotes(notesData);
    } 
  } , [notesData]);

  const toggleTask = async (id: string | number , task: Task) => {
     setTasks(tasks.map(task => task._id === id ? { ...task, status: task.status === 'completed' ? 'todo' : 'completed' } : task));
 await updateTaskStatus({ status : task.status === 'completed' ? 'todo' : 'completed' , id : id as string });    
    tasksRefetch();
  };
useEffect(() => {
  if (!isAuthenticated && isInitialized && !authLoading) {
    redirect("/login");
    }
}, [isAuthenticated , isInitialized , authLoading]);
  if (authLoading ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={14} color="var(--color-primary)" />
      </div>
    );
     } 
  
    

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
             <TaskCard setTasks={setTasks} refetch={tasksRefetch} onToggleTask={()=> toggleTask( task._id , task )} key={task._id} task={task} />
            )) 
          )}
            
            <h3 className="text-[#121a0f] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Notes</h3>
            
            {notes.length === 0 ? ( 
              <p>No notes found</p>
              ) : (
                notes.map((note:Note) => (
                 <NoteCard key={note._id} note={note} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;    