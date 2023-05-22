import conn from '../db'
const {Schema, model, models} = require('mongoose')


(async function () {conn()})()
const incomeSchema = new Schema({
    type: String,
    description: String,
    value: Number,
    category: String,
})
export default models.Incomes || model('Incomes', incomeSchema)