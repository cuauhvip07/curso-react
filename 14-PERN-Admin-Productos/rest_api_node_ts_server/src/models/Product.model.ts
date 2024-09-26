import { Table, Column, Model, DataType, Default} from 'sequelize-typescript'

@Table({
    tableName: 'products'
})

class Product extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    name: string

    @Column({
        type: DataType.FLOAT(5,2)
    })
    price: number

    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean
}

export default Product