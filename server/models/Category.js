import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        
    },
    {timestamps: true}
)

const Category = mongoose.model('categories',CategorySchema);

export default Category;