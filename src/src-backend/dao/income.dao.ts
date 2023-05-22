import mongoose from "mongoose";

class IncomeDao {
  incomeCollection;

  constructor(schema: any, collection: any) {
    this.incomeCollection = mongoose.model(schema, collection);
  }

  async getIncomes() {
    const incomes = this.incomeCollection.find();

    return incomes;
  }
}

export default IncomeDao;
