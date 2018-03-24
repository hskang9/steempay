var express = require('express');
var router = express.Router();
var steem = require('steem');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/submit', (req, res, next) => {
  // steemit transaction
  var company = "kimhi65" // seller
  var amount = '0.001 SBD' // amount you want
  
  console.log(req.body);
  steem.broadcast.transfer(req.body.wif, req.body.from, company, amount, req.body.memo, function (err, result) {

    if (err == null) {
      // send receipt to customer's email
      var sender = 'smtps://'; // smtps://{sender's email account}
      var password = ''; // sender's password

      var nodeMailer = require("nodemailer");

      var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: '',// sender's email account
          pass: '' // sender's password
        }
      });

      var mailOptions = {
        from: '', // sender's email
        to: req.body.email,
        subject: `Receipt for Your Payment to ${company}`,
        text: 'now testing' // will replace to html file
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      // send submitted html screen
      res.render('submitted');
    }

    // error handling
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.render('error');
    console.log(err, result);
  });
});

module.exports = router;
