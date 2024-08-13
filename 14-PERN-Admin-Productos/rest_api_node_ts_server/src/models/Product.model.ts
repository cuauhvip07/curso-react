import {Table, Column, Model, DataType} from 'sequelize-typescript'

@Table({
    tableName: 'products'
})

class Product extends Model {

    @Column({
        type: DataType.STRING
    })
    name: string

    @Column({
        type: DataType.FLOAT(6,2)
    })
    precio: number

    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean

}

export default Product