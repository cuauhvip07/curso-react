

export type Expense = {
    id: string,
    amount: number,
    expenseName: string,
    category: string,
    date: Value
}

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type DraftExpense = Omit<Expense,'id'>

export type Category = {
    id: string
    name: string
    icon: string
}
