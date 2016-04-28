# Angular Tinify S3 - Example

### Dependencies
NodeJS
Bower (not essential, but makes it easier for this guide)


## Quick Start
Clone this repo
```
cd angular-tinify-s3
npm install
cd public
bower install
```

Jump into your favourite editor and change the following parameters in /app/routes.js (Starts at line 64)

YOUR_TINIFY_API_KEY
YOUR_AWS_ACCESS_KEY_ID
YOUR_AWS_SECRET_ACCESS_KEY
your-bucket-region
your-bucket-name

```
cd ../
nodemon server.js
```
Server will be available at localhost:3000 - Test it out and upload some PNG/JPG's!

Tutorial available at [https://jimmycann.com/blog/angular-node-amazon-s3-and-the-tinify-api](https://jimmycann.com/blog/angular-node-amazon-s3-and-the-tinify-api)
