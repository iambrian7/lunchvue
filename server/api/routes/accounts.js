const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const AccountsController = require('../controllers/accounts');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });
function jstr(x){
  return JSON.stringify(x, null, 3)
}
// router.get("/ck", AccountsController.accounts_check)
// router.get("/", function(req, res){
//   res.status(200).json({"message":"route checked***************"});
// })
// router.get("/:id", function(req, res){
//   console.log(`req info: baseUrl=  ${req.baseUrl} originalUrl: ${req.originalUrl}`)
//   console.log(`req query: ${jstr(req.query)} req.params: ${jstr(req.params)}req.body: ${jstr(req.body)}`)
//   res.status(200).json({"message":"route checked***************"});
// })






router.get("/", AccountsController.accounts_get_all);

router.post("/", AccountsController.accounts_create_account);
// router.post("/", checkAuth, upload.single('accountImage'), AccountsController.accounts_create_account);

router.get("/:accountId", AccountsController.accounts_get_account);

router.patch("/:accountId", checkAuth, AccountsController.accounts_update_account);

router.delete("/:accountId", checkAuth, AccountsController.accounts_delete);


module.exports = router;
