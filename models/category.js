const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: String,
    groupName: String
  },
  {
    timestamps: true,
  }
);

categorySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
