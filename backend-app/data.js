const bcrypt = require("bcrypt");

const data = {
    users:[
        {
            name : "Kanishk",
            email : "admin@gmail.com",
            password: bcrypt.hashSync("1234",10),
            isAdmin : true,
        }, 
        { 
            name : "John",
            email : "john@gmail.com",
            password: bcrypt.hashSync("123",10),
            isAdmin : false,
        }
    ],
    products : [
        {
           
            name : "Nike Slim Shirt",
            slug : "nike-slim-shirt",
            category : "Shirts",
            image:'/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description : 'high quality shirt',
        },
        {
           
            name : "Adidas Fit Shirt",
            slug : "adidas-fit-shirt",
            category : "Shirts",
            image:'/images/p2.jpg',
            price: 250,
            countInStock: 20,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 10,
            description : 'high quality shirt',
        },
        {
            
            name : "Nike Slim Pant",
            slug : "nike-slim-pant",
            category : "Pants",
            image:'/images/p3.jpg',
            price: 100,
            countInStock: 15,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            description : 'high quality product',
        },
        {
            
            name : "Adidas Fit Pant",
            slug : "adidas-fit-pant",
            category : "Pants",
            image:'/images/p4.jpg',
            price: 120,
            countInStock: 0,
            brand: 'adidas',
            rating: 3.5,
            numReviews: 10,
            description : 'high quality product',
        },
    ]
}
module.exports = data;