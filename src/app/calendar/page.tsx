'use client'
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import useGetTasks from '../hooks/api/task/useGetTasks'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useUpdateTask from '../hooks/api/task/useUpdateTask';
import toast from 'react-hot-toast';
import { Task } from '../../../types';
export default function page() {
    const {data,error,isLoading,refetch} = useGetTasks()
    const { updateTask,  isPending:isUpdatePending, error: updateTaskError } = useUpdateTask()
    const [events, setEvents] = useState([])
    
    useEffect(() => {
        if(data){
            setEvents(data.map((task:Task) => {
                return {
                  groupId : task._id,
                    title: task.title,
                    start: task.createdAt || new Date().toISOString(),
                    end: task.dueDate || new Date().toISOString(),
                }
            }))
        }
    }, [data]) 
    const handleTaskDragStart = async (event: any) => {
      try {
        await updateTask( {
            id: event.event._def.groupId,
            dueDate: event.event.end || new Date().toISOString(),
            startDate : event.event.start || new Date().toISOString(),
        })
        // Handle any errors that occur during task update
      } catch (error:any) {
         console.log(error)
         toast.error(error?.message || 'Failed to update task'  )
      } 
    }
  return (
    <div className=' p-5'>
 <FullCalendar
     plugins={[ dayGridPlugin,interactionPlugin,timeGridPlugin ]}
     droppable ={true}
      initialView="dayGridMonth"
      editable={true} 
eventDrop={ handleTaskDragStart}
      headerToolbar={{
        left: 'prev,next today',
          center: 'title',
        }}
        height="auto"

     events={events}
    />
    </div>
  )
}
