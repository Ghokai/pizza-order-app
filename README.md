# pizza-order-server-client
pizza order system with react, express, typescript, typeorm and postgresql

application simply started with docker-compose

```
docker-compose up
```

**Server will be served on http://localhost:4000/**

![image](https://user-images.githubusercontent.com/11095906/60766602-c7bf0500-a060-11e9-8640-167a6c3a3674.png)

**Api End Points**

 - Returns all orders: GET http://localhost:4000/orders 
 - Returns order with id: GET http://localhost:4000/orders/:orderId 
 - Creates or UPDATES order with specified id from request body: POST http://localhost:4000/orders/
   if id present in request body update process will work else create process will work.
   (if order status is completed update operation will return an error: *You can't make changes on this record because it is completed!*)
 - Delete order: DELETE http://localhost:4000/orders/:orderId 
    (if order status is completed it will return error:*You can't make changes on this record because it is completed!*)
 - Returns all form fields like *Pizza Sizes*, *Pizza Types*, *Order Status*: GET http://localhost:4000/formfields


**Client will be served on http://localhost:3000/**

![image](https://user-images.githubusercontent.com/11095906/60766634-47e56a80-a061-11e9-825a-b0246bab013f.png)

![image](https://user-images.githubusercontent.com/11095906/60766982-c217ee00-a065-11e9-8d01-8b3a0f693fce.png)

![image](https://user-images.githubusercontent.com/11095906/60766655-af9bb580-a061-11e9-9b73-be949087d727.png)
