import {Table,Column,DataType,HasOne,BelongsTo,ForeignKey,Model} from 'sequelize-typescript'

@Table({
    tableName: 'budgets'
})

class Budget extends Model{


    @Column({
        type: DataType.STRING(100) // Este es de sequelize
    })
    name: String // Este es el tipado de Typescript

    @Column({
        type: DataType.DECIMAL
    })
    amount: number

}

export default Budget