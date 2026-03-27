"use client";

import { create } from "zustand";
import { Professor } from "@/app/action/type";

type ProfesorStore = {
  profesores: Professor[];
  instrument: string;

  setProfesores: (data: Professor[]) => void;
  setInstrument: (instrument: string) => void;

};

export const useProfesorStore = create<ProfesorStore>((set, get) => ({
  profesores: [],
  instrument: "",
  setProfesores: (data) => set({ profesores: data }),
  setInstrument: (instrument) => set({ instrument }),

 
}));