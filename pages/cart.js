import ProductDetail from "../components/product_detail";
import styles from "../styles/Cart.module.css";

export default function Cart({ cart }) {
    return <div className={styles.main}>
        {
            cart ? (
                <div className={styles.notEmpty}>
                    {
                        cart.products.map(
                            product => (
                                <ProductDetail 
                                    key={product.productId}
                                    name={product.product.title}
                                    price={product.product.price}
                                    quantity={product.quantity}
                                    link={`/product/${product.productId}`}
                                    image={product.product.image}
                            />)
                        )
                    }
                    <button className={styles.order}>
                        Order now
                    </button>
                </div>
            ) : (
                <div className={styles.empty}>Cart is empty</div>
            )
        }
    </div>
}
async function purchaseAllProductInCart () {
    
}
export async function getServerSideProps({ req, res }) {
    try {
        const result = await fetch(`${process.env.URL}/api/cart`, {
            headers: {
                cookie: req.headers.cookie || "",
            },
        })
        var cart = await result.json()
        for (const productQuantity in cart.products) {
            const productId = cart.products[productQuantity].productId
            const product = await fetch(`${process.env.URL}/api/product/${productId}`)
            cart.products[productQuantity].product = await product.json()
            
        }
        return {
            props: {
                cart: cart
            },
        }
    }
    catch (error) {
        return {
            props: {
            }
        }
    }
}