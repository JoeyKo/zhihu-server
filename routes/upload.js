const express = require('express')
const router = express.Router()

router.route('/upload')
  .post((req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const images = req.files.images;
    const { name, size, mimetype } = images
    images.mv(`./upload/images/${name}`, function(err) {
      if (err)
        return res.status(500).json({ msg: 'File upload fail: ' + err });
  
      res.status(200).json({ msg: 'File uploaded!', data: { url: `http://127.0.0.1:5000/app/upload/images/${name}`, name, mimetype, size } });
    });
  })

module.exports = router