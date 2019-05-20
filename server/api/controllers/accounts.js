const mongoose = require("mongoose");
const Account = require("../models/accounts");

exports.accounts_check = (req, res, next) => {
  console.log('account check........')
  res.status(200).json({"message":"route checked***************"});
}
exports.accounts_get_all = (req, res, next) => {
  console.log('account accounts_get_all........')
  Account.find({})
  //  .select("name price _id accountImage")
    .exec()
    .then(docs => {
      // const response = {
      //   count: docs.length,
      //   accounts: docs.map(doc => {
      //     return {
      //       data: doc,
      //       _id: doc._id,
      //       request: {
      //         type: "GET",
      //         url: "http://localhost:3019/accounts/" + doc._id
      //       }
      //     };
      //   })
      // };
      //   if (docs.length >= 0) {
      // res.status(200).json(response);
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.accounts_create_account = (req, res, next) => {
  // const account = new Account({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: req.body.name,
  //   price: req.body.price,
  //   accountImage: req.file.path
  // });
  console.log(`accounts_create_account*******************`)
  const account = new Account(req.body)
  account
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created account successfully",
        createdAccount: {
          name: result.name,
          price: result.new_balance,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3019/accounts/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.accounts_get_account = (req, res, next) => {
  // Adventure.findById(id).exec(callback);
  const id = req.params.accountId;
  Account.findById(id)
    // .select("name price _id accountImage")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          account: doc,
          request: {
            type: "GET",
            url: "http://localhost:3019/accounts"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.accounts_update_account = (req, res, next) => {
  console.log("route is accounts_update_account")
  const id = req.params.accountId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Account.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Account updated",
        request: {
          type: "GET",
          url: "http://localhost:3019/accounts/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.accounts_delete = (req, res, next) => {
  const id = req.params.accountId;
  Account.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Account deleted",
        request: {
          type: "POST",
          url: "http://localhost:3019/accounts",
          body: { name: "String", price: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
