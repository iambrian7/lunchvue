// const {Song} = require('../models')
const Lunch = require('../models/lunch.model.js');
module.exports = {
  async index (req, res) {
    try {
      ////////////////////////
      // Retrieve and return all notes from the database.
// exports.findAll = (req, res) => {
  console.log("LunchController.js  index (getting all lunches*************")
  Lunch.find()
  .then(lunch => {
    console.log(`found lunches count= ${lunch.length}`)
      res.send(lunch);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving lunchs."
      });
  });
 } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch the lunch'
    })
  }
  }, // end of index
  async show (req, res) {
    try {
      console.log(`find ${req.params.lunchId} lunches`)
      const lunch = await Lunch.findById(req.params.lunchId)
      res.send(lunch)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the lunch'
      })
    }
  },
  async post (req, res) {
    try {
      console.log(`add lunch ${JSON.stringify(req.body, null, 3)} lunches`)
      const lunch = await Lunch.create(req.body)
      res.send(lunch)
    } catch (err) {
      console.log(`post: LunchesController: err = ${JSON.stringify(err, null, 3)} `)

      res.status(500).send({
        error: 'an error has occured trying to create the lunch'
      })
    }
  },
  async put (req, res) {
    console.log('**********')
    console.log('**********')
    console.log('**********')
    console.log('**********')
    console.log(`async put(LunchesController.js) req.body = ${JSON.stringify(req.body)} req.params=${req.params.lunchId}`)
    console.log('**********')
    console.log('**********')
    console.log('**********')
    console.log('**********')
    console.log('**********')
    console.log('**********')
    // try {
    //   await Lunch.update(req.body, {
    //     where: {
    //       id: req.params.lunchId   
    //     }
    //   })
    //   res.send(req.body)
    // } catch (err) {
    //   res.status(500).send({
    //     error: 'an error has occured trying to update the Lunch'
    //   })
    // }
    res.send({message:'testing update for a lunch',
              data: req.body   });
  }
} // end of exports

      ////////////////////////
    //   let songs = null
    //   const search = req.query.search
    //   if (search) {
    //     songs = await Song.findAll({
    //       where: {
    //         $or: [
    //           'title', 'artist', 'genre', 'album'
    //         ].map(key => ({
    //           [key]: {
    //             $like: `%${search}%`
    //           }
    //         }))
    //       }
    //     })
    //   } else {
    //     songs = await Song.findAll({
    //       limit: 10
    //     })
    //   }
    //   res.send(songs)
    // } catch (err) {
    //   res.status(500).send({
    //     error: 'an error has occured trying to fetch the songs'
    //   })
    // }
  //},
  // async show (req, res) {
  //   try {
  //     const song = await Song.findById(req.params.songId)
  //     res.send(song)
  //   } catch (err) {
  //     res.status(500).send({
  //       error: 'an error has occured trying to show the songs'
  //     })
  //   }
  // },
  // async post (req, res) {
  //   try {
  //     const song = await Song.create(req.body)
  //     res.send(song)
  //   } catch (err) {
  //     res.status(500).send({
  //       error: 'an error has occured trying to create the song'
  //     })
  //   }
  // },
  // async put (req, res) {
  //   try {
  //     await Song.update(req.body, {
  //       where: {
  //         id: req.params.songId
  //       }
  //     })
  //     res.send(req.body)
  //   } catch (err) {
  //     res.status(500).send({
  //       error: 'an error has occured trying to update the song'
  //     })
  //   }
  // }
//}
