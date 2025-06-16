import { Task } from '@/types/task';
import React from 'react';
import { formatNoteDate } from '../../utils/dateUtils';

export default function TaskCard({ task, toggleTask }: { task: Task; toggleTask: (id: string) => void }) {
  return (
    <div key={task._id} className="flex items-center gap-4 bg-[#f9fbf9] px-4 min-h-[72px] py-2 justify-between hover:bg-[#f0f5ee] transition-colors">
    <div className="flex items-center gap-4">
      <div className="text-[#121a0f] flex items-center justify-center rounded-lg bg-[#ebf2e9] shrink-0 size-12">
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <p className={`text-base font-medium leading-normal line-clamp-1 ${task.status === 'completed' ? 'text-[#639155] line-through' : 'text-[#121a0f]'}`}>
          {task.title}
        </p>
        {task.dueDate && (
          <p className="text-[#639155] text-sm font-normal leading-normal line-clamp-2">
            Due {formatNoteDate(task.dueDate)}
          </p>
        )}
      </div>
    </div>
    <div className="shrink-0">
      <div className="flex size-7 items-center justify-center">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={() => toggleTask(task._id)}
          className="h-5 w-5 rounded border-[#d6e5d2] border-2 bg-transparent text-[#53d22c] checked:bg-[#53d22c] checked:border-[#53d22c] checked:bg-[image:--checkbox-tick-svg] focus:ring-0 focus:ring-offset-0 focus:border-[#d6e5d2] focus:outline-none cursor-pointer"
        />
      </div>
    </div>
  </div>
  )
}
