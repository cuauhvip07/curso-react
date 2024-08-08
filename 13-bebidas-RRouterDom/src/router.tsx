
import {lazy, Suspense} from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import IndexPage from './views/IndexPage'
import Layout from './layouts/Layout'

// Tener mejor performance en la aplicacion
const FavoritesPage = lazy(() => import('./views/FavoritesPage'))


export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
                <Route path='/' element={<IndexPage/>} index/>
                <Route path='/favoritos' element={
                  // Aqui se puede poner un spinner
                  <Suspense fallback="Cargando... Espere un segundo">
                    <FavoritesPage/>
                  </Suspense>
                }/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
