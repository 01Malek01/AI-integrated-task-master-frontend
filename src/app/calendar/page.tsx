'use client'
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import useGetTasks from '../hooks/api/task/useGetTasks'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import useUpdateTask from '../hooks/api/task/useUpdateTask'
import toast from 'react-hot-toast'
import { Task } from '../../../types'

export default function CalendarPage() {
  const { data, error, isLoading, refetch } = useGetTasks()
  const { updateTask, isPending: isUpdatePending } = useUpdateTask()
  const [events, setEvents] = useState<any[]>([])
  const [currentView, setCurrentView] = useState('dayGridMonth')
  
  useEffect(() => {
    if (data) {
      setEvents(data.map((task: Task) => ({
        id: task._id,
        groupId: task._id,
        title: task.title,
        start: task.startDate || new Date().toISOString(),
        end: task.dueDate || new Date().toISOString(),
        backgroundColor: getEventColor(task.priority || 'medium'),
        borderColor: getEventColor(task.priority || 'medium'),
        textColor: '#ffffff',
        extendedProps: {
          priority: task.priority,
          description: task.description
        }
      })))
    }
  }, [data])

  const getEventColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return '#ef4444' // red-500
      case 'medium': return '#f59e0b' // amber-500
      case 'low': return '#10b981' // emerald-500
      default: return '#3b82f6' // blue-500
    }
  }

  const handleTaskDragStart = async (event: any) => {
    try {
      const now = new Date()
      const startDate = event.event.start ? new Date(event.event.start) : new Date()
      const endDate = event.event.end ? new Date(event.event.end) : new Date(startDate.getTime() + 3600000)

      if (!(startDate instanceof Date) || isNaN(startDate.getTime()) || 
          !(endDate instanceof Date) || isNaN(endDate.getTime())) {
        event.revert()
        toast.error('Invalid date selected')
        return
      }
      
      if (startDate < now) {
        event.revert()
        toast.error('Task cannot be moved to a past date')
        return
      }
      
      if (endDate < startDate) {
        event.revert()
        toast.error('End date cannot be before start date')
        return
      }

      await updateTask({
        id: event.event._def.groupId,
        dueDate: endDate.toISOString(),
        startDate: startDate.toISOString(),
      })
      
      refetch()
      toast.success('Task updated successfully')
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message || 'Failed to update task')
    }
  }

  const handleEventClick = (info: any) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        bg-white p-4 rounded-lg shadow-lg border-l-4 ${info.event.borderColor ? `border-[${info.event.borderColor}]` : 'border-blue-500'}`}>
        <h3 className="font-bold text-lg">{info.event.title}</h3>
        <p className="text-gray-600">{info.event.extendedProps.description || 'No description'}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {info.event.start.toLocaleString()} - {info.event.end?.toLocaleString() || 'No end time'}
          </span>
          <span className="px-2 py-1 text-xs rounded-full text-white" 
                style={{ backgroundColor: info.event.backgroundColor }}>
            {info.event.extendedProps.priority || 'Normal'}
          </span>
        </div>
      </div>
    ), { duration: 3000 })
  }

  // Calculate task statistics
  const taskStats = {
    total: data?.length || 0,
    completed: data?.filter((task: Task) => task.status === 'completed').length || 0,
    inProgress: data?.filter((task: Task) => task.status === 'in-progress').length || 0,
    todo: data?.filter((task: Task) => task.status === 'todo').length || 0,
  }

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      {/* Task Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
          <p className="text-2xl font-bold">{taskStats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
          <p className="text-2xl font-bold">{taskStats.completed}</p>
          <p className="text-xs text-gray-500">{taskStats.total > 0 ? Math.round((taskStats.completed / taskStats.total) * 100) : 0}% of total</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-medium">In Progress</h3>
          <p className="text-2xl font-bold">{taskStats.inProgress}</p>
          <p className="text-xs text-gray-500">{taskStats.total > 0 ? Math.round((taskStats.inProgress / taskStats.total) * 100) : 0}% of total</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-gray-300">
          <h3 className="text-gray-500 text-sm font-medium">To Do</h3>
          <p className="text-2xl font-bold">{taskStats.todo}</p>
          <p className="text-xs text-gray-500">{taskStats.total > 0 ? Math.round((taskStats.todo / taskStats.total) * 100) : 0}% of total</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
          initialView={currentView}
          editable={true}
          selectable={true}
          droppable={true}
          eventDrop={handleTaskDragStart}
          eventClick={handleEventClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          height="auto"
          aspectRatio={1.8}
          events={events}
          eventDisplay="block"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            meridiem: 'short',
            hour12: true
          }}
          views={{
            dayGridMonth: {
              titleFormat: { year: 'numeric', month: 'long' }
            },
            timeGridWeek: {
              titleFormat: { year: 'numeric', month: 'short', day: 'numeric' }
            }
          }}
          dayHeaderFormat={{ weekday: 'short', day: 'numeric' }}
          eventClassNames="cursor-pointer hover:opacity-90 transition-opacity"
          dayCellClassNames="hover:bg-gray-50 transition-colors"
          nowIndicator={true}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
            startTime: '08:00',
            endTime: '18:00'
          }}
        />
      </div>
    </div>
  )
}