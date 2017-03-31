var express = require('express');
var fileUpload = require('express-fileupload');
var cloudinary = require('cloudinary');



cloudinary.config({
	cloud_name: 'dxnapa5zf',
	api_key: '219348637198157',
	api_secret: 'FJl9rCE5dTS_kgkX_rPvUyMTwZY'
});

const app = express();
 
// default options 
app.use(fileUpload());
 
app.post('/upload', function(req, res) {
	console.log(req.files);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  var sampleFile = req.files.sampleFile;
 
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv('public/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
	else
	{
		cloudinary.uploader.upload("public/filename.jpg", function(result){
			res.json(result);
		});
	}
   
  });
});

app.listen(8000, function(){
	
    console.log('The server is listening on PORT: ' + 8000);
});
