import { deleteCookie } from "cookies-next";

export default function signout(req, res) {
    deleteCookie('access-token', {
        req: req,
        res: res
    });

    res.status(200).send("Signout Successfully")
}