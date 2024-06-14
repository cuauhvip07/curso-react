import { CartActions } from '../reducers/cart-reducer'
import type { Guitar } from '../types'
import { Dispatch } from 'react'

type GuitarProps = {
  guitar : Guitar,
  dispatch: Dispatch<CartActions>
}

// En lugar de poner props.price con destructuring se pone solo price
// Tipo inlineType es el que esta comentado, el otro es typeSeparado
export default function Guittar({guitar, dispatch} : GuitarProps) /* : {guitar : Guitar, addToCart: (item: Guitar) => void}) */ {

  const {name,price, image, description} = guitar


  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
            <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" /> 
        </div>
        <div className="col-8">
            <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
            <p>{description}</p>
            <p className="fw-black text-primary fs-3">${price}</p>
            <button 
              type="button"
              className="btn btn-dark w-100"
              // Para que no se mande a llamr la funcion se le pone un call back en el onClick
              onClick={() => dispatch({type:'add-to-cart', payload:{item: guitar}})}
            >Agregar al Carrito</button>
        </div>
    </div>
  )
}
