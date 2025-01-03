import {Table,Column,DataType,HasOne,BelongsTo,ForeignKey,Model} from 'sequelize-typescript'

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

}

export default Budget