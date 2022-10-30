import Order from "../components/order";
import styles from "../styles/Orders.module.css";

export default function Orders ({orders}) {
    console.log(orders)
    return <div className={styles.main}>
        {orders ? (
            <div className={styles.orders}>
                {orders.map(order =>  (
                    <Order order={order} key={order.id}/>
                ))}
            </div>
        ):(
            <div className={styles.noOrder}>
                No Orders
            </div>
        )}
    </div>
}
export async function getServerSideProps({ req, res }) {
    try {
        const result = await fetch(`${process.env.URL}/api/order`, {
            headers: {
                cookie: req.headers.cookie || "",
            },
        })
        var orders = await result.json()
        return {
            props: {
                orders: orders
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