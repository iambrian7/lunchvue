const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.seed_admin = () => {
  console.log("seed_admin/controller="+ process.env.ADMIN_ROLE)
 // console.log(`register: ${JSON.stringify(req.body, null, 3)}`)
  User.find({ email: process.env.ADMIN_ROLE })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return {
          message: "Mail exists"
        };
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email:  process.env.ADMIN_ROLE,
          password: 'bkcbkc07',
          role: 'admin'
        });
      user
        .save()
        .then(result => {
          console.log(result);
          console.log(`_doc = ${JSON.stringify(result._doc, null, 3)}`)
          console.log(`using email=${result._doc.email} and password=${result._doc.password}`)
        })
        .catch(err => {
          console.log(err);
        });
    }// end of admin email doesn't exist
    });// then result from find
}
exports.get_all = (req, res, next) => {
  console.log("get_all/controller=")
 // console.log(`register: ${JSON.stringify(req.body, null, 3)}`)
  User.find({})
    .exec()
    .then(users => {
      if (users.length >= 1) {
    //    return {
      console.log("retrieved all users: =" + JSON.stringify(users, null, 3))
          return res.status(200).json({
            message: "Auth successful",
           // token: token,
            users: users
          });
       // };
      } else {
        return res.status(401).json({
          message: "Auth failed"
        });
      } 
    });// then result from find
}
exports.user_signup = (req, res, next) => {
  console.log("user_signup/controller="+ req.body.email)
  console.log(`register: ${JSON.stringify(req.body, null, 3)}`)
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.name,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                console.log(`_doc = ${JSON.stringify(result._doc, null, 3)}`)
                console.log(`using email=${result._doc.email} and password=${result._doc.password}`)
                const token = jwt.sign(
                  {
                    email: result._doc.email,
                    userId: result._doc._id
                  },
                  process.env.JWT_KEY,
                  {
                    expiresIn: "1h"
                  }
                );
               // const myuser = req.body;

                return res.status(200).send({ auth: true, token: token, user: result._doc });
                // return res.status(200).json({
                //   message: "Auth successful",
                //   token: token
                // });



                // res.status(201).json({
                //   message: "User created"
                // });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });// then result from find
};

exports.user_login = (req, res, next) => {
  console.log(`login/controller ${req.body.email}`)
  User.find({ email: req.body.email })
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    console.log(`now checking if good user..................`)
    console.log(`user = ${JSON.stringify(user[0], null, 3)}`)
    if (user[0].role == 'admin'){
      const token = jwt.sign(
        {
          email: user[0].email,
          userId: user[0]._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
        );
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          user: user[0]
        });
    } else {
      
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
              user: user[0]
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
        // end bcrypt
      } // end not admin role
      }) // end of then

      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    };
    
    exports.user_delete = (req, res, next) => {
      User.remove({ _id: req.params.userId })
      .exec()
        .then(result => {
          res.status(200).json({
            message: "User deleted"
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      };
      