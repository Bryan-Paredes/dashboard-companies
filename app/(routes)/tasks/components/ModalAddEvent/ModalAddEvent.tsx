"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ModalAddEventProps } from "./modalAddEvent.types";
import FormEvent from "../FormEvent/FormEvent";

export default function ModalAddEvent(props: ModalAddEventProps) {
  const { open, companies, setOpen, setOnSaveNewEvent, setNewEvent } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agrega un Nuevo Evento</DialogTitle>
        </DialogHeader>
        <FormEvent
          companies={companies}
          setNewEvent={setNewEvent}
          setOpen={setOpen}
          setOnSaveNewEvent={setOnSaveNewEvent}
        />
      </DialogContent>
    </Dialog>
  );
}
