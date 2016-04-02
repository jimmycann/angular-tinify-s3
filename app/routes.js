var tinify = require("tinify");
tinify.key = "YOUR_TINIFY_API_KEY";
var multer = require('multer');

module.exports = function (app) {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './app/uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            var originalname = file.originalname.split('.');
            var new_filename = originalname[0] + '-' + datetimestamp + '.' + originalname[1];
            cb(null, new_filename)
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    //////////// Tinify API Actions ////////////
    app.post('/api/upload', function (req, res) {
        upload(req,res,function(err){
            if(err){
                console.log(err);
                return;
            }
            var height = parseInt(req.body.ulData.ht);
            var width = parseInt(req.body.ulData.wd);
            var method = req.body.ulData.m;

            var resizeMethod = {};
            resizeMethod.method = method;
            if (method == 'scale')
            {
                if (height > 0)
                {
                    resizeMethod.height = height;
                }
                else
                {
                    resizeMethod.width = width;
                }
            }
            else
            {
                resizeMethod.width = width;
                resizeMethod.height = height;
            }

            var filename = req.file.filename;
            var source = tinify.fromFile("./app/uploads/" + filename);
            var resized = source.resize(resizeMethod);
            resized.store({
                service: "s3",
                aws_access_key_id: "YOUR_AWS_ACCESS_KEY_ID",
                aws_secret_access_key: "YOUR_AWS_SECRET_ACCESS_KEY",
                region: "your-bucket-region",
                path: "your-bucket-name/folder/" + filename
            });
        });
        res.json();
    });
};