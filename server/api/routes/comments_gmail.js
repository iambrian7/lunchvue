/**
 * Created by Brians Desktop on 1/14/2017.
 */
var express = require('express');
const nodemailer = require('nodemailer');

var router = express.Router({mergeParams: true});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'bkcgee@gmail.com',
    pass: 'bkcbkc07'
  },
  tls: {
    rejectUnauthorized: false
  }
})


var messageToEmailer;

// router.get('/', function (req, res, next) {
//   res.render('email/send-email2.hbs');
// });
router.post('/', function (req, res, next) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let HelperOptions = {
    from: '"Brian Carlson" <bkcgee@gmail.com>',
    to: 'bkcgee@gmail.com',
    subject: "Contact: ",
    text: 'wow this is great!',
    site: fullUrl
  }
  var name = 
  messageToEmailer = `Thanks ${req.body.name ? req.body.name : req.body.email} for your comment`
  //  console.log("sending comments............" + JSON.stringify(req.body,null, 3))
  HelperOptions.subject = HelperOptions.subject + fullUrl + '  from: ' + req.body.name + '  @ : ' + req.body.email
  HelperOptions.html = '<h1>Welcome</h1><p>That was easy!</p>'
  HelperOptions.text = 
   "Comment: " + req.body.comment + '\n\n' +
   "Name: " + req.body.name + '\n' +
   "Phone: " + req.body.phone + '\n' +
    'From: ' + req.body.email
//  console.log("hellperOptions = " + HelperOptions.text)
  transporter.sendMail(HelperOptions, (error, info) => {
    if (error){
       console.log(error)
       res.status(200).json({
        message: error
      });
    }
    res.status(200).json({
      message: messageToEmailer
    });
  })
});

 

module.exports = router;
