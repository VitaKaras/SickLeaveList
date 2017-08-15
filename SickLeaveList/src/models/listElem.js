const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listElemSchema = new Schema({
  dateFrom: {
    type:Date
  },
  dateTo: {
    type:Date
  },
  type: {
    type: String
  },
})


const ListElem = mongoose.model('ListElem', listElemSchema);
module.exports = ListElem;
