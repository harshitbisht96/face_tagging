const express = require('express');
const app = express();

const multer = require('multer');


const child_process  = require('child_process');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './')
    },
    filename: function (req, file, cb) {
        cb(null, 'image.jpg');
    }
})

var upload = multer({ storage: storage });

var Jimp = require('jimp');
 


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.post('/tag', upload.single('avatar'),(req,res)=>{
    //here run the python script
    console.log(req.file);
    // Jimp.read('image.jpg', (err, lenna) => {
    //     if (err) throw err;
    //     lenna
    //       .resize(256, 256) // resize
    //       .quality(60) // set JPEG quality
    //       .greyscale() // set greyscale

        let result = child_process.spawnSync('python3',[__dirname+'/faces.py']);

        console.log(result.output.toString());
      
    //   });


    

    res.send('image recieved');
})

app.listen(2222);