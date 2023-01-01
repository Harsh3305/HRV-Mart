import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Product.module.css";
import React, { useState } from 'react';
import { getCookie } from "cookies-next";
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function Product({ product }) {
    const router = useRouter()
    const [cart, setCart] = React.useState(0);
    const { productId } = router.query;
    const token = getCookie("f-access-token");
    const [isLikes, setIsLiked] = React.useState(false);
    return <div className={styles.main}>
        <div className={styles.title}>
            {product.title}
        </div>
        <div className={styles.product}>
            <div className={styles.image}>
                <Image src={product.image[0]} height={400} width={400} />
            </div>

            <div className={styles.details}>
                <div className={styles.price}>
                    Price: ₹ {product.price}
                </div>
                <p className={styles.description}>
                    {product.description}
                </p>
                {token ?
                    (<div className={styles.holder}>
                        <div
                            className={isLikes ? styles.liked : styles.likeHolder}
                            onClick={() => {
                                if (isLikes) {
                                    toast("Product removed from Like", {
                                        autoClose: true,
                                        closeOnClick: true,
                                        theme: "dark",
                                        icon: FaHeart
                                    });
                                }
                                else {
                                    toast("Product added in Like", {
                                        autoClose: true,
                                        closeOnClick: true,
                                        theme: "light",
                                        icon: FaHeart
                                    });
                                }
                                setIsLiked(!isLikes);
                            }}
                        >
                            <FaHeart className={styles.heart} />
                        </div>

                        <div className={styles.cartHolder}>
                            {cart == 0 ?
                                (<button className={styles.cart} onClick={() => incrementCart(productId, cart, setCart)}>
                                    Add to Cart
                                </button>) :
                                (
                                    <div className={styles.cart}>
                                        <button className={styles.changeButton} onClick={() => decrementCart(productId, cart, setCart)}>
                                            -
                                        </button>
                                        <div>{cart}</div>
                                        <button className={styles.changeButton} onClick={() => incrementCart(productId, cart, setCart)}>
                                            +
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    ) : (
                        <div></div>
                    )
                }

            </div>

        </div>
    </div>
    function incrementCart(productId, cart, setCart) {
        syncWithBackend(productId, cart + 1)
        setCart(cart + 1)
    }
    function decrementCart(productId, cart, setCart) {
        if (cart == 1) {
            deleteProductFromCart(productId)
            setCart(cart - 1)
        }
        else if (cart > 1) {
            syncWithBackend(productId, cart - 1)
            setCart(cart - 1)
        }
    }
    async function deleteProductFromCart(productId) {
        const response = (await fetch(`/api/cart?productId=${productId}`, {
            method: 'DELETE',
        }))

        console.log({ response: response })
        // const x = await response;
    }
    async function syncWithBackend(productId, cart) {
        var data = JSON.stringify({
            "productId": productId,
            "quantity": cart
        });

        const response = (await fetch(`/api/cart`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: data
        })).json()

        const x = await response;

    }
}
export async function getServerSideProps(content) {
    const productId = content.params.productId;
    const res = await fetch(`${process.env.URL}/api/product/${productId}`)
    const product = await res.json()

    return {
        props: {
            product
        },
    }
}