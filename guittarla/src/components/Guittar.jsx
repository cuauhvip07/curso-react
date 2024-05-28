
// En lugar de poner props.price con destructuring se pone solo price
export default function Guittar({guitar,setCart}) {

  const {id,name,price, image, description} = guitar


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
              // Se le pone prevCart por convencion y el setCart es el useState que mandamos a traer
              onClick={() => setCart(prevCart => [...prevCart, guitar])}
            >Agregar al Carrito</button>
        </div>
    </div>
  )
}
