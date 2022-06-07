const express = require('express')
const router = express.Router()
const axios = require('axios')
const BASEURL = 'https://catfact.ninja/fact'

// set root path
router.get('/', (req, res) => {
  getCatFact().then(data => {
    const { fact, length } = data

    if (length > 70) throw "Fact length OVER 70!!!"

    return res.status(200).json({
      returnCode: 200,
      body: {
        route: '/cats',
        message: 'Cat Fact: ' + fact
      }
    })
  }).catch(err => {
    return res.status(404).json({
      returnCode: 404,
      body: {
        route: '/cats',
        message: 'ERROR Cat Fact: ' + err
      }
    })
  })
})

const getCatFact = () => {
  return axios.get(BASEURL).then(res => res.data)
}

module.exports = router

