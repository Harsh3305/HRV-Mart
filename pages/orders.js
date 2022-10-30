export default function Order () {
    <div>
        Order
    </div>
}
export async function getServerSideProps({ req, res }) {
    try {
        const result = await fetch(`${process.env.URL}/api/order`, {
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