"use client";

import { useState } from "react";
import DropMenu from "../ui/DropMenu";
import AddRetakeClass from "./RetakeModal";
import AddStudentModal from "./RegisterModal";
import ReservationModal from "./ReservationModal";

type ModalType = "student" | "retake" | "reservation" | null;

export default function CalendarButtonEvent() {
  const [modal, setModal] = useState<ModalType>(null)

  const openModal = (type: ModalType) => setModal(type)
  const closeModal = () => setModal(null)

  return (
    <>
      <DropMenu
        trigger={(toggle) => (
          <button
            onClick={toggle}
            className="py-2 px-4 bg-primary/30 rounded-2xl"
          >
            Open Menu
          </button>
        )}
      >
        {
        (closeMenu) => (
          <>
            <DropMenu.Item
              onClick={() => {
                closeMenu()
                openModal("student")
              }}
            >
              Añadir Alumno
            </DropMenu.Item>

            <DropMenu.Item
              onClick={() => {
                closeMenu()
                openModal("retake")
              }}
            >
              Recuperación
            </DropMenu.Item>

            <DropMenu.Item
              onClick={() => {
                closeMenu()
                openModal("reservation")
              }}
            >
              Reservar
            </DropMenu.Item>
          </>
        )
        }
      </DropMenu>

      {modal === "student" && (
        <AddStudentModal open close={closeModal} />
      )}

      {modal === "retake" && (
        <AddRetakeClass open close={closeModal} />
      )}

      {modal === "reservation" && (
        <ReservationModal open close={closeModal} />
      )}
    </>
  );
}