
import { create } from 'zustand'
import { DraftPatient, Patient } from './types'

type PatientState = {
    patients: Patient[],
    addPatient: (data:DraftPatient) => void
}

export const usePatientStore = create<PatientState>(() => ({
    // Se coloca el state como las funciones que modifican el state

    patients: [],
    addPatient: (data) => {
        console.log(data)
    }
}))