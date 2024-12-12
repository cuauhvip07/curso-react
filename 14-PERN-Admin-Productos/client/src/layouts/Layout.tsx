import { Outlet } from 'react-router-dom'


export default function Layout() {
  return (
    <>
        <p>Desde layout</p>

        <Outlet/>
    </>
  )
}
