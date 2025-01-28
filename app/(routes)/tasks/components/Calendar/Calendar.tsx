/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CalendarEvent } from "./calendar.types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg, EventContentArg } from "@fullcalendar/core/index.js";

import axios from "axios";
import formatDate from "@/lib/formatDate";
import ModalAddEvent from "../ModalAddEvent/ModalAddEvent";
import { toast } from "@/hooks/use-toast";

export default function Calendar(props: CalendarEvent) {
  const { companies, events } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [onSaveNewEvent, setOnSaveNewEvent] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DateSelectArg>();
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    companySelected: {
      id: "",
      name: "",
    },
  });

  const handleDateClick = async (selected: DateSelectArg) => {
    setOpen(true);
    setSelectedItem(selected);
  };

  useEffect(() => {
    if (onSaveNewEvent && selectedItem?.view.calendar) {
      const calendarApi = selectedItem.view.calendar;
      calendarApi.unselect();

      const newEventPrisma = {
        companyId: newEvent.companySelected.id,
        title: newEvent.eventName,
        start: new Date(selectedItem.start),
        allDay: false,
        timeFormat: "H(:mm)",
      };

      axios
        .post(
          `/api/company/${newEvent.companySelected.id}/event`,
          newEventPrisma
        )
        .then(() => {
          toast({
            title: "Evento creado Exitosamente",
          });
        })
        .catch((error) => {
          toast({
            title: "Error al crear evento",
            variant: "destructive",
            description: error.response.data.message,
          });
        });

      setNewEvent({
        eventName: "",
        companySelected: {
          id: "",
          name: "",
        },
      });
      setOnSaveNewEvent(false);
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSaveNewEvent, selectedItem, newEvent]);

  const handleEventClick = async (selected: any) => {
    if (
      window.confirm(
        `¿Estás seguro que deseas eliminar este evento? ${selected.event.title}`
      )
    ) {
      try {
        await axios.delete(`/api/event/${selected.event._def.publicId}`);
        toast({ title: "Evento eliminado" });
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error al eliminar evento",
            variant: "destructive",
            description: error.message,
          });
        }
      }
    }
  };

  return (
    <div>
      <div className="md:flex gap-x-3">
        <div className="w-[200px] relative">
          <div className="overflow-auto absolute top-0 left-0 h-full w-full">
            <p className="mb-3 text-2xl">Listado de Tareas</p>
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg shadow-md mb-2 bg-slate-200 dark:bg-background"
                onClick={() => router.push(`/tasks/event/${event.id}`)}
              >
                <p className="font-bold">{event.title}</p>
                <p>{formatDate(event.start)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 calendar-container">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              multiMonthPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right:
                "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth",
            }}
            height="80vh"
            initialView="dayGridMonth"
            weekends={false}
            events={events}
            eventContent={rednerEventContent}
            editable={true}
            selectable={true}
            selectMirror={true}
            select={handleDateClick}
            eventClick={handleEventClick}
          />
        </div>
      </div>
      <ModalAddEvent
        open={open}
        setOpen={setOpen}
        setOnSaveNewEvent={setOnSaveNewEvent}
        companies={companies}
        setNewEvent={setNewEvent}
      />
    </div>
  );
}

function rednerEventContent(eventContent: EventContentArg) {
  return (
    <div className="bg-slate-200 dark:bg-background p-1 w-full">
      <i>{eventContent.event.title}</i>
    </div>
  );
}
