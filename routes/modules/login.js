const express = require('express')
const router = express.Router()

// set root path
router.get('/', (req, res) => {
  const mainBlocker = 1
  res.render('login', { mainBlocker })
})

// original code 
router.post('/', (req, res) => {
  const mainBlocker = 1
  const loginInfo = req.body
  if ((!loginInfo.Email) || (!loginInfo.Password)) {
    res.render('login', { error: "請輸入 Username 和 Password 。", mainBlocker, loginInfo })
  }

  ///// guest mode
  if ((loginInfo.Email === 'guest123') && (loginInfo.Password === "guest321")) {
    res.render('loginSuccess', { firstName: "Guest" })
  } else {
    res.render('login', { error: "Username 或 Password 錯誤。", mainBlocker, loginInfo })
  }
})

module.exports = router

