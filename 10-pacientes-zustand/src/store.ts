
import { create } from 'zustand'
import { DraftPatient, Patient } from './types'
import {v4 as uuidv4} from 'uuid'

type PatientState = {
    patients: Patient[],
    addPatient: (data:DraftPatient) => void
}

const createPatient = (patient: DraftPatient) : Patient => {
    return {...patient, id:uuidv4()}
}

// Se puede agregar set y get para obtener o modifcar las funciones
export const usePatientStore = create<PatientState>((set) => ({
    // Se coloca el state como las funciones que modifican el state

    patients: [],

    addPatient: (data) => {
        
        const newPatient = createPatient(data)
        // El state recupera el estado de las funciones dentro de usePatientStore
        set((state) => ({
            patients: [...state.patients, newPatient]
        }))
    }
}))