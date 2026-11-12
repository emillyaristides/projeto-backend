
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const ProductImage = require('./ProductImage');
const ProductOption = require('./ProductOption');
const ProductCategory = require('./ProductCategory');

// Um produto pode ter várias imagens
Product.hasMany(ProductImage, {
    foreignKey: 'product_id',
    as: 'images'
});

ProductImage.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

// Um produto pode ter várias opções
Product.hasMany(ProductOption, {
    foreignKey: 'product_id',
    as: 'options'
});

ProductOption.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

// Produtos e categorias: muitos para muitos
Product.belongsToMany(Category, {
    through: ProductCategory,
    foreignKey: 'product_id',
    otherKey: 'category_id',
    as: 'categories'
});

Category.belongsToMany(Product, {
    through: ProductCategory,
    foreignKey: 'category_id',
    otherKey: 'product_id',
    as: 'products'
});

module.exports = {
    User,
    Category,
    Product,
    ProductImage,
    ProductOption,
    ProductCategory
};
