import { getShoppingCart } from "../utilities/fakedb";

const CartProductsLoaders = async () => {
    const loadedProducts = await fetch('../../public/fakeData/products.json');
    const products = await loadedProducts.json();

    // data load to must use to async await

    const storedCart = getShoppingCart();
    const savedCart = []

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd.id === id)
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity
            savedCart.push(addedProduct)
        }
    }

    return savedCart
}

export default CartProductsLoaders