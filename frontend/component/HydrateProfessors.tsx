"use client";

import { useEffect } from "react";
import { Professor } from "@/app/action/type";
import { useProfesorStore } from "../storage/professorSotore";


export default function HydrateProfessors({ professors }: { professors: Professor[] }) {
  const setProfesores = useProfesorStore(state => state.setProfesores);

  useEffect(() => {
    setProfesores(professors);
  }, [professors, setProfesores]);

  return null;
}