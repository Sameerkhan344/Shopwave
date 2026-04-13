# User Authentication & Authorization | Express Middleware - In Backend

    - we send request firstly then that request goes to the middleware so this middleware check that user is loggedIn or not,
    if that user loggedIn then it send response go and login first then you can access this resources.
    we can say it is a protected routes

# isAuthorized middleware we create

    - make middleware folder then inside it make <b>authMiddleware.js</b> file

# cloudinary or multer or uuid

    - multer and uuid npm package installed -
        multer -  for uploading image on server
        uuid -  given unique uuid for image
        cloudinary - upload image on cloudinary and delete image from server path (public/image) folder

# Add Product Using Multer on Cloudinary Frontend + Backend