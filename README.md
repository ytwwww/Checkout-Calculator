# CSC301 Assignment1 Pair39 Web App - Store
Deployed web app can be reached here https://csc301store.herokuapp.com/
## Features
- Add products to shopping cart
- Set and un-set products as favorite by clicking the heart button
- Adjust quantities of products in shopping cart
- Automatically calculate subtotal, grand total, and numbers of items in the cart
- Responsive to different screen sizes (phone, tablet, and desktop)
## How to start this app locally
Use the following commands in your terminal:
```
git clone https://github.com/csc301-fall-2020/assignment-1-39-ytwwww-chantalsorias-web
cd ./assignment-1-39-ytwwww-chantalsorias-web
npm run setup
npm run build-run
```

To add products, use API testing tools such as Postman or Insomnia to send POST request to http://localhost:5000/products with the following JSON body:
```
{"name": "Tomato", "price": 4.58}
```

Finally, proceed to http://localhost:5000/ on your browser and have fun!

## How to run tests
In the root directory of this app, run the following command in your terminal:
```
npm test
```
