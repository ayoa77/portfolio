const express = require("express");
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });


//====EMAIL SETTINGS & ROUTE====//
var api_key = process.env.mailgun;
var domain = 'ayo.works';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });


router.post('/', csrfProtection, (req, res, next) => {
  emailBody = `
        
		 Email: ${req.body.email} 
		
		 Name: ${req.body.name}
				
		 Message: "${req.body.message}"
	`
  var data = {
    from: 'contactForm@ayo.works',
    // to: `${req.body.email}`,
    to: 'ayodeleamadi@gmail.com',
    subject: req.body.subject,
    text: emailBody
  }
  //  console.log(data);
  mailgun.messages().send(data, function (error, body, response) {

    if (error && error.statusCode) {
      console.log(error.message)
      res.status(error.statusCode).json({
        error: error.message
      })
    }
    else if (error) {
      console.log(error)
      res.status(400).json({
        error: error
      })
    }
    else {
      console.log(body.message)
      res.status(200).json({
        response: response,
        body: body,
        message: "Email, successfully sent. I will get back to you as soon as possible.",
        success: true
      });
    }
  });
});
//================//

module.exports = router;
