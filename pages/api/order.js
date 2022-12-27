// import { getSession } from "next-auth/react"
import {getCookie} from "cookies-next";

export default async function handler(req, res) {
    
    const token = getCookie("access-token", {
        req: req,
        res: res
    });


    if (req.method == "GET") {
        fetch(`${process.env.BACKEND_URL}/order`, {
            headers: {
                "Authentication": `bearer:${token}`
            }
        })
            .then(result => result.json())
            .then(json => res.status(200).json(json))
            .catch(error => res.status(500).json("Something went wrong!!"))
    }
    else if (req.method == "POST") {
        // Purchase all itesm available in cart
        fetch(`${process.env.BACKEND_URL}/cart/purchase`, {
            headers: {
                "Authentication": `bearer:${token}`
            }
        })
            .then(result => result.json())
            .then(json => res.status(200).json(json))
            .catch(error => res.status(500).json("Something went wrong!!"))
    }
    else {
        res.status(404).send("Not found")
    }
}