"use client"

import { register } from "@/actions/create-account-action"



export default function RegisterForm() {
    return (
        <form
            className="mt-14 space-y-5"
            noValidate
            action={register}
        >
            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                    htmlFor="email"
                >Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                    autoComplete="email"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >Nombre</label>
                <input
                    type="name"
                    placeholder="Nombre de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="name"
                    autoComplete="name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >Password</label>
                <input
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password"
                    autoComplete="new-password"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >Repetir Password</label>
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite Password de Registro"
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password_confirmation"
                    autoComplete="new-password"
                />
            </div>

            <input
                type="submit"
                value='Registrarme'
                className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
            />
        </form>
    )
}
