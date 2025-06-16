import React from 'react';
import { Note } from '../../../types';
import { formatNoteDate } from '../../utils/dateUtils';

export default function NoteCard({ note }: { note: Note }) {
  return (
    <div key={note._id} className="flex items-center gap-4 bg-[#f9fbf9] px-4 min-h-[72px] py-2 justify-between hover:bg-[#f0f5ee] transition-colors cursor-pointer">
      <div className="flex items-center gap-4 w-full">
        <div className="text-[#121a0f] flex items-center justify-center rounded-lg bg-[#ebf2e9] shrink-0 size-12">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M88,96a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,96Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16Zm32,16H96a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16ZM224,48V156.69A15.86,15.86,0,0,1,219.31,168L168,219.31A15.86,15.86,0,0,1,156.69,224H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H152V160a8,8,0,0,1,8-8h48V48H48Zm120-40v28.7L196.69,168Z"></path>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[#121a0f] text-base font-medium leading-normal truncate">
              {note.title}
            </p>
            {note.category && (
              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full whitespace-nowrap">
                {note.category}
              </span>
            )}
          </div>
          {note.createdAt && (
            <p className="text-[#639155] text-sm font-normal leading-normal truncate">
              {formatNoteDate(note.createdAt)}
            </p>
          )}
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
  )
}
