import { getSession } from "next-auth/react"
var axios = require('axios');

export default async function handler(req, res) {

    const session = await getSession({ req });
    const email = session.user.email;
    if (req.method == "GET") {
        // get cart of user
        fetch(`${process.env.BACKEND_URL}/cart/${email}`)
            .then(res => res.json())
            .then(
                json => {
                    fetch(`${process.env.BACKEND_URL}/cart/cost/${email}`)
                    .then(costRes => costRes.json())
                    .then(cost => {
                        json.cost = cost;
                        res.status(200).json(json)
                    })
                    .catch(costError => res.status(500).json(costError))
                }
            )
            .catch(error => res.status(500).json(error))
    }
    else if (req.method == "PUT") {
        // update quantity of product in cart
        var data = JSON.stringify({
            "productId": req.body.productId,
            "quantity": req.body.quantity
        });


        var config = {
            method: 'put',
            url: `${process.env.BACKEND_URL}/cart/${email}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                res.status(200).json(response.data);
            })
            .catch(function (error) {
                res.status(500).send(error)
            });

    }
    else if (req.method == "POST") {
        var data = JSON.stringify({
            "user_id": email,
            "products": req.body.products
        });

        var config = {
            method: 'put',
            url: `${process.env.BACKEND_URL}/cart`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                res.status(200).json(response.data);
            })
            .catch(function (error) {
                res.sendStatus(500)
            });

    }
    else if (req.method == "DELETE") {
        // empty whole cart of user
        const {productId} = req.query
        var url=""
        if (productId == null) {
            // empty whole cart of user
            url = `${process.env.BACKEND_URL}/cart/${email}` 
        }
        else {
            // remove product from cart
            url = `${process.env.BACKEND_URL}/cart/${email}?productId=${productId}` 
        }
        var config = {
            method: 'delete',
            url: url,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            console.log(res.status(200).json(response.data));
          })
          .catch(function (error) {
            res.status(500).json(error)
          });
    }
    else {
        // 404
        res.status(404).send("")
    }
}