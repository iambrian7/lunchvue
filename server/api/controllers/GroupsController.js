// const {Song} = require('../models')
const Group = require('../models/group.model.js');
module.exports = {


  async index (req, res) {
    try {
      ////////////////////////
      // Retrieve and return all notes from the database.
// exports.findAll = (req, res) => {
  console.log("GroupController.js  index (getting all groupes*************")
  Group.find()
  .then(group => {
    console.log(`found groupes count= ${group.length}`)
      res.send(group);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving groups."
      });
  });
 } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch the group'
    })
  }
  }, // end of index


  async show (req, res) {
    try {
      console.log(`GroupsController: show***************`)
      console.log(`find ${req.params.groupId} groupes`)
      const group = await Group.findById(req.params.groupId)
      res.send(group)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the group'
      })
    }
  }, // end of show


  async post (req, res) {
    try {
      console.log(`add group ${JSON.stringify(req.body, null, 3)} groups`)
      const group = await Group.create(req.body)
      res.send(group)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the group'
      })
    }
  },


  async put (req, res) {
    console.log('**********')
    console.log('**********')
    console.log('**********')
    console.log('**********')
    console.log(`async put(GroupesController.js) req.body = ${JSON.stringify(req.body)} req.params=${req.params.groupId}`)
    console.log('**********')
    console.log('**********')
    console.log('**********')
    console.log('**********')
    console.log('**********')
    console.log('**********')
    // try {
    //   await Group.update(req.body, {
    //     where: {
    //       id: req.params.groupId   
    //     }
    //   })
    //   res.send(req.body)
    // } catch (err) {
    //   res.status(500).send({
    //     error: 'an error has occured trying to update the Group'
    //   })
    // }
    res.send({message:'testing update for a group',
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
