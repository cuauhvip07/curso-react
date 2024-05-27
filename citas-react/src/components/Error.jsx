

function Error({children}){


    return(
        <div 
        className="bg-red-600 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
            {children}
        </div>
    )
}

export default Error;