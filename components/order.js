export default function Order (order) {
    const order_id = "order_id";
    const date = "dd-mm-yyyy";
    const price = "abc"
    return <div>
        <div>
            OrderId: {order_id}
        </div>
        <div>
            OrderedOn: {date}
        </div>
        <div>
            Price: {price}
        </div>
    </div>
}