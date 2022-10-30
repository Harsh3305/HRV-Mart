import styles from "../styles/Order.module.css";

export default function Order ({order}) {
    const order_id = order.id;
    const orderDate = order.orderDate;
    const price = order.cost
    const placed = order.placed
    return <div className={styles.main}>
        <div className={styles.order}>
            OrderId: {order_id}
        </div>
        <div className={styles.orderDate}>
            OrderedOn: {orderDate}
        </div>
        <div className={styles.price}>
            Price: {price}
        </div>
    </div>
}