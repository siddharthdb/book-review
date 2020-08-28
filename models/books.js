const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({    
    name: String,
    author: String,        
    publishedYear: Number,
    isbn: Number,
    description: String,
    language: String,
    categories: String,
    tags: {
        type: [String],
        default: undefined
    }
}, {
    timestamps: true,
  
})

bookSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Book =  mongoose.model('Book', bookSchema);

module.exports = Book;