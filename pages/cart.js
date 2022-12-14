import Router from "next/router";
import ProductDetail from "../components/product_detail";
import styles from "../styles/Cart.module.css";

export default function Cart({ cart }) {
    return <div className={styles.main}>
        {
            cart && cart.products && cart.products.length && cart.products.length != 0 ? (
                <div className={styles.notEmpty}>
                    <div className={styles.description}>
                        <div className={styles.image}>
                            Image
                        </div>
                        <div className={styles.productName}>
                            Name of Product
                        </div>
                        <div className={styles.price}>
                            Price
                        </div>
                        <div className={styles.quantity}>
                            Quantity
                        </div>
                        <div className={styles.delete}>
                            Remove Product
                        </div>
                    </div>
                    {
                        cart.products.map(
                            product => (
                                <ProductDetail
                                    productId={product.productId}
                                    key={product.productId}
                                    name={product.product.title}
                                    price={product.product.price}
                                    quantity={product.quantity}
                                    link={`/product/${product.productId}`}
                                    image={product.product.image[0]}
                                />)
                        )
                    }
                    <div className={styles.cost}>
                        <div></div>
                        <div>
                            Total cost: ₹ {cart.cost}
                        </div>
                    </div>
                    <button className={styles.order} onClick={() => purchaseAllProductInCart()}>
                        Order now
                    </button>
                </div>
            ) : (
                <div className={styles.empty}>Cart is empty</div>
            )
        }
    </div>
}
async function purchaseAllProductInCart() {

    const response = (await fetch(`/api/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: ""
    })).json()

    const x = await response;
    Router.reload()
}
export async function getServerSideProps({ req, res }) {
    try {
        const result = await fetch(`${process.env.URL}/api/cart`, {
            headers: {
                cookie: req.headers.cookie,
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