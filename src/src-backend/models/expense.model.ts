import conn from '../db'
const {Schema, model, models} = require('mongoose')


(async function () {conn()})()
const expensesSchema = new Schema({
    type: String,
    description: String,
    value: Number,
    category: String,
})
export default models.Expenses || model('Expenses', expensesSchema)