'use client';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  Draggable,
} from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import AddClass from '@/components/scheduled-class/AddClass';

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}
const AdminCalender = ({classes}: any) => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [clickedEvent, setClickedEvent] = useState<Event | null>(null);

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    const selectedDate = arg.date;
    setDate(selectedDate);
    setClickedEvent(null);
    setShowModal(true);
  }

  useEffect(() => {
    const draggableEl = document.getElementById('draggable-el');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData(eventEl) {
          const title = eventEl.getAttribute('title');
          const id = eventEl.getAttribute('data');
          const start = eventEl.getAttribute('start');
          return { title, id, start };
        },
      });
    }
    const res = classes?.map((item:any) => {
      return {
        title: item.title,
        start: item.date,
        id: item.id,
        allDay: false
      };
    });
    setAllEvents(res);
  }, []);

  function handleDeleteModal(data: { event: { id: string } }) {
    setClickedEvent(classes.find((item:any) => item.id === parseInt(data.event.id, 10)) || null);
    setShowModal(true);
  }

  return (
    <div>
      <AddClass
        isOpen={showModal}
        date={date}
        setIsModalOpen={setShowModal}
        classData={clickedEvent}
      />
      <div className="w-full p-10">
        <div className="col-span-8">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek',
            }}
            events={allEvents as EventSourceInput}
            nowIndicator={true}
            editable={true}
            droppable={false}
            selectable={true}
            selectMirror={true}
            dateClick={handleDateClick}
            eventClick={(data) => handleDeleteModal(data)}
            displayEventTime={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCalender;
