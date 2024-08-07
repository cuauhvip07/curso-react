
import { create } from 'zustand'
import {createJSONStorage, devtools , persist} from 'zustand/middleware'    // Usar la extension de chrome
import { DraftPatient, Patient } from './types'
import {v4 as uuidv4} from 'uuid'

type PatientState = {
    patients: Patient[],
    activeId: Patient['id'],
    addPatient: (data:DraftPatient) => void,
    deletePatient: (id: Patient['id']) => void,
    getPatientById: (id: Patient['id']) => void,
    updatePatient: (data:DraftPatient) => void
}

const createPatient = (patient: DraftPatient) : Patient => {
    return {...patient, id:uuidv4()}
}

// Se puede agregar set y get para obtener o modifcar las funciones
// devtools debe de estar en todo el archivo hacia abajo -> Visualizar los valores en chrome
//Persist -> Manetener los valores en el localStorage
export const usePatientStore = create<PatientState>()(devtools(persist((set) => ({
    // Se coloca el state como las funciones que modifican el state

        patients: [],

        activeId: '',

        addPatient: (data) => {
            
            const newPatient = createPatient(data)
            // El state recupera el estado de las funciones dentro de usePatientStore
            set((state) => ({
                patients: [...state.patients, newPatient]
            }))
        },

        deletePatient: (id) => {
            set((state) => ({
                patients: state.patients.filter(patient => patient.id !== id)
            }))
        },

        getPatientById: (id) => {
            set(() => ({
                activeId: id
            }))
        },

        updatePatient: (data) => {
            set((state) => ({
                patients:state.patients.map(patient => patient.id === state.activeId ? {id: patient.id, ...data} : patient),
                activeId: ''
            }))
        }

    }), {
        name: 'patient-storage'
        // storage: createJSONStorage(() => localStorage) En caso de querer especificar en donde guardar 
    })
))