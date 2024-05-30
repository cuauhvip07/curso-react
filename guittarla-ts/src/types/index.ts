


export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}
  
// Utility types

// Aqui se aplica la herencia completa
export type CartItem =  Guitar & {
    quantity: number;
}

// Pick ayuda a elegir ciertos elementos de otro type
// Primero el type que hereda y segundo los atributos queremos
// export type CarItem = Pick<Guitar,'id' | 'name' | 'price'> & {
//     quantity: number;
// }

// Omit te quita ciertos atributos