const express=require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')
const cryptoJs = require('crypto-js')


router.get('/profile/:id', (request, response) => {
    const { id } = request.params
  
    const query = `select userId, userName, email from user where userId = ${id}`
    db.query(query, (error, user) => {
      if (error) {
        response.send(utils.createError(error))
      } else {
        if (user.length == 0) {
          response.send(utils.createError('invalid user name or password'))
        } else {
          response.send(utils.createResult(error, user[0]))
        }
      }
    })
  })


router.post('/signup',(request,response) => {

    const{ userName, email, password } = request.body

    const encryptedPassword = cryptoJs.MD5(password)

    
    console.log('inside signup call')
    const query = `insert into user (userName, email, password) 
                    values ('${userName}', '${email}', '${encryptedPassword}')`

    db.query(query,(error ,users) =>{
        if(error){
            response.send(utils.createError(error))
        }else{
            if(users.length == 0){
                response.send(utils.createError('invalid user name or password'))
            }else{
                response.send(utils.createResult(error, users[0]))
            }
        }
    })
})

router.post('/signin',(request,response) => {
    const { email , password } = request.body

    const encryptedPassword = cryptoJs.MD5(password)

    const query = `select id, firstName, email from user where email='${email}' and password='${encryptedPassword}' `
    
    db.query(query, (error, users) => {
        if (error) {
            response.send(utils.createError(error))
          } else {
            if (users.length == 0) {
              response.send(utils.createError('invalid user name or password'))
            } else {
              response.send(utils.createResult(error, users[0]))
            }
          }
    })
})

module.exports = router
