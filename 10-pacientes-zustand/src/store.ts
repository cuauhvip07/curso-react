
import { create } from 'zustand'
import { Patient } from './types'

type PatientState = {
    patients: Patient[]
}

export const usePatientStore = create<PatientState>(() => ({
    // Se coloca el state como las funciones que modifican el state

    patients: []
}))