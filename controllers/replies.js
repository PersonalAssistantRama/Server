const axios = require('axios')
const { changeQuery }  = require('../helpers')

module.exports = {
  getReply(req, res) {
    let input = changeQuery(req.body.text)

    axios({
      method: 'get',
      url: `https://api.dialogflow.com/v1/query?v=20170712&query=${input}&lang=id&sessionId=b18621cf-e981-4f93-b380-ee3fa6cf0b56&timezone=Asia/Jakarta`,
      headers: {
        Authorization: 'Bearer fe981391620d47929cc67a830ed75dab'
      }
    })
    .then(data => {
      res.status(200).json({
        message: 'ok',
        data: data.data.result.fulfillment.speech,
        input: input
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: 'error'
      })
    })
  }
}