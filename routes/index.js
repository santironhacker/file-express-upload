const express = require('express');
const router = express.Router();
const multer  = require('multer');
const Picture = require('../models/pictures');

const upload = multer({ dest: './public/uploads/'})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// Route to upload from project base path
router.post('/upload', upload.single('photo'), (req, res, next) => {
  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  // pic is ans instance of picture
  pic.save((err) => {
    // manage the error
    if (err) {
      // only will work if when on the router.post we pass "next" as an argument
      return next(err);
    }
      res.redirect('/');
  });
});


module.exports = router;
