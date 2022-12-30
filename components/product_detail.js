import Image from "next/image";
import Link from "next/link";
import styles from "../styles/ProductDetails.module.css"
import Router from "next/router";
import React from 'react';
import { BsTrash  } from 'react-icons/bs';

export default function ProductDetail({ productId, name, price, quantity, link, image }) {
    const [productQuantity, setProductQuantity] = React.useState(quantity);
    return <div className={styles.main}>
        <div className={styles.details}>
            <Link href={link}>
                <a>
                    <Image className={styles.image} src={image} height={60} width={60} />
                </a>
            </Link>
            <div className={styles.name}>
                {name}
            </div>
            <div className={styles.price}>
                ₹ {price}
            </div>
            <div className={styles.quantity}>
                <button className={styles.increase} onClick={() => { incrementProductQuantity(productId, productQuantity, setProductQuantity)}}>+</button>
                Quantity:{productQuantity}
                <button className={styles.decrease} onClick={() => { decrementProductQuantity(productId, productQuantity, setProductQuantity)}}>-</button>
            </div>
            <button className={styles.delete} onClick={() => {
                
            }}>
                <BsTrash/>
            </button>
        </div>
    </div>
}
function incrementProductQuantity (productId, productQuantity, setProductQuantity) {
    syncWithBackend(productId, productQuantity+1)
    setProductQuantity(productQuantity+1)
}
function decrementProductQuantity (productId, productQuantity, setProductQuantity) {
    if (productQuantity == 1) {
        deleteProductFromCart(productId)
        setProductQuantity(productQuantity-1)
    }
    else if (productQuantity > 1) {
        syncWithBackend(productId, productQuantity-1)
        setProductQuantity(productQuantity-1)
    }
}
async function  syncWithBackend(productId, quantity) {
    var data = JSON.stringify({
        "productId": productId,
        "quantity": quantity
    });

    const response = (await fetch(`/api/cart`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: data
    })).json()

    await response;
    Router.reload()
}
async function deleteProductFromCart (productId) {
    const response = (await fetch(`/api/cart?productId=${productId}`, {
        method: 'DELETE',
    }))
    await response
    Router.reload()
}