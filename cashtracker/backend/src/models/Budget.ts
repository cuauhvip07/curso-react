import {Table,Column,DataType,HasMany,Model} from 'sequelize-typescript'
import Expense from './expense'

@Table({
    tableName: 'budgets'
})

class Budget extends Model{


    @Column({
        type: DataType.STRING(100) // Este es de sequelize
    })
    declare name: String // Este es el tipado de Typescript

    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number // declare sirve para que no nos de error y que ya esta definido en sequelize

    @HasMany(() => Expense,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    })
    declare expenses: Expense[]

}

export default Budget