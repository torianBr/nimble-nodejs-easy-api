var express = require('express')
var Nimble = require('node-nimble-api')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Init wrapper
var nimble = new Nimble({
  accessToken: 'XXXXXXXXXXXXXXXXXXXX'
});
var APIKEYX = "json"

app.get('/', function (req, res) {
  res.send('Nimble API- NodeJS - GITHUB : @torianBr');
});
/* NEW API
{params*} - APIKEYX
 */
  app.get('/nimble/contacts/' + APIKEYX , function(req, res) {
    nimble.findContacts({}, function(err, result, response) {
      if(err) return res.send('ERROR' + JSON.stringify(err));
        return res.send(JSON.stringify(result));
    });
  });
  app.get('/nimble/contacts/ids/' + APIKEYX , function(req, res) {
    nimble.findContactIds({}, function(err, result, response) {
      if(err) return res.send('ERROR' + JSON.stringify(err));
        return res.send(JSON.stringify(result));
    });
  });
  app.get('/nimble/contacts/email/:email/' + APIKEYX, function(req, res) {
    console.log
    nimble.findContactEmail({
      "email": {
         "is": req.params.email
           }
      }, function(err, result, response) {
      if(err) return res.send('ERROR' + JSON.stringify(err));
        return res.send(JSON.stringify(result));
    });
  });
  app.post('/nimble/contacts/create/' + APIKEYX , function(req, res) {
    nimble.createContact( req.body , function(err, result, response) {
        if(err) return res.send("ERROR" + JSON.stringify(err));
        return res.send(result);
      });
  });
  app.post('/nimble/contacts/update/' + APIKEYX , function(req, res) {
    nimble.updateContact( req.body.id, req.body, function(err, result, response) {
        if(err) return res.send("ERROR" + JSON.stringify(err));
        return res.send(result);
      });
  });
  app.post('/nimble/notes/create/' + APIKEYX , function(req, res) {
    var contact_ids = req.body.contact_ids;
    nimble.createNote({
      "contact_ids": contact_ids,
      "note": "NEW NOTE",
      "note_preview": "NEW NOTE PREVIEW"
    }, function(err, result, response) {
      if(err) return res.send('ERROR' + JSON.stringify(err));
        return res.send(JSON.stringify(result));
    });
  });
  app.put('/nimble/notes/:id/update/' + APIKEYX , function(req, res) {
    var id = req.params.id,
          contact_ids = req.body.contact_ids;
    nimble.updateNote(id, {
      "contact_ids": contact_ids,
      "note": "NOTE UPDATEd",
      "note_preview": "NOTE PREVIEW UPDATED"
    }, function(err, result, response) {
      if(err) return res.send('ERROR' + JSON.stringify(err));
        return res.send(JSON.stringify(result));
    });
  });
  app.delete('/nimble/notes/:id/delete/' + APIKEYX , function(req, res) {
    var id = req.params.id;
    nimble.deleteNote(id,
      function(err, result, response) {
        if(err) return res.send('ERROR' + JSON.stringify(err));
          return res.send(JSON.stringify(result));
      });
  });
  app.get('/nimble/notes/:id/' + APIKEYX , function(req, res) {
    var id = req.params.id;
    nimble.showNote(id, function(err, result, response) {
      if(err) return res.send('ERROR' + JSON.stringify(err));
        return res.send(JSON.stringify(result));
    });
  });
  app.get('/nimble/contact/:id/notes/' + APIKEYX , function(req, res) {
    var id = req.params.id;
    nimble.listContactNotes(id, function(err, result, response) {
      if(err) return res.send('ERROR' + JSON.stringify(err));
        return res.send(JSON.stringify(result));
    });
  });
  app.post('/nimble/tasks/create/'+ APIKEYX , function(req, res) {
    nimble.createTask({
      "related_to": req.body.ids,
      "notes": "Random text",
      "subject": "Send'em a bunch of mails",
      "due_date": "2011-10-22 17:30"
    }, function(err, result, response) {
      if(err) return res.send('ERROR' + JSON.stringify(err));
        return res.send(JSON.stringify(result));
    });
  });
    
app.listen(3090);