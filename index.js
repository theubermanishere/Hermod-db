var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var pg = require('pg');
var nodemailer = require('nodemailer');

app.set('port', (process.env.PORT || 5000));

// Postgres
pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

// create reusable transporter object using the default SMTP transport
//let transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//        user: 'hermoddb@gmail.com',
//        pass: 'arnoldbuddha280'
//    }
//});
//
//// setup email data with unicode symbols
//let mailOptions = {
//    from: '"Hermod" <hermoddb@gmail.com>', // sender address
//    to: '', // list of receivers
//    subject: '', // Subject line
//    text: 'Hello world ?', // plain text body
//    html: '<b>Hello world ?</b>' // html body
//};
//
//// send mail with defined transport object
//transporter.sendMail(mailOptions, (error, info) => {
//    if (error) {
//        return console.log(error);
//    }
//    console.log('Message %s sent: %s', info.messageId, info.response);
//});

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


