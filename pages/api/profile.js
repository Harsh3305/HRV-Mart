// import { getSession } from "next-auth/react"
import { getCookie } from "cookies-next";

export default async function handler(req, res) {

    const token = getCookie("access-token", {
        req: req,
        res: res
    });

    fetch(`${process.env.BACKEND_URL}`, {
        headers: {
            "Authentication": `bearer:${token}`
        }
    })
        .then(res => res.json())
        .then(json => res.status(200).json(json))
        .catch(error => res.status(500).json(error))


}