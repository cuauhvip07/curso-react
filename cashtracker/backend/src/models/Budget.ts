import {Table,Column,DataType,HasMany,Model, AllowNull, ForeignKey, BelongsTo} from 'sequelize-typescript'
import Expense from './Expense'
import User from './User'


@Table({
    tableName: 'budgets'
})

class Budget extends Model{

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100) // Este es de sequelize
    })
    declare name: String // Este es el tipado de Typescript

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL
    })
    declare amount: number // declare sirve para que no nos de error y que ya esta definido en sequelize

    @HasMany(() => Expense,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    })
    declare expenses: Expense[]

    @ForeignKey(() => User)
    declare userId: number

    @BelongsTo(() => User)
    declare user: User



}

export default Budget