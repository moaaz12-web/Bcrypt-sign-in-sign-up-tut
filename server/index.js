// !This is the file without sessions/cookies


const mysql = require('mysql2')
const express = require('express')
const cors = require('cors');
const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express()
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user:"root", host:"localhost", password:"password", database: "users"
})


app.post('/register', (req, response)=>{
    const username = req.body.username;
    const password = req.body.password;


    bcrypt.hash(password, saltRounds, (err, hash)=>{
        if(err){
            response.send(err)
        }
        db.query("INSERT INTO users (username, password) VALUES (?,?)",
        [username, hash], (err,res)=>{
            // console.log(err)
            if (err){
                console.log(err)
            }else{
               response.send(res)
            }
        })
    })
})



app.post('/login', (require, response)=>{

    const username = require.body.username;
    const password = require.body.password;
    

    db.query("SELECT * FROM users WHERE username = ?",
    [username], (err, result)=>{
        // console.log(err)
        if (err){
            // console.log(err)
            response.send({err:err})
        }
        if (result.length>0){
            // response.send(result)
            bcrypt.compare(password, result[0].password, (error, response2)=>{
                if (response2){
                    response.send(result)
                } else {
                    response.send({message:"Wrong username and password combination"})
                }
            })
        } else {
            response.send({message:"User does not exit"})
        }
        
    })

})



app.listen(5000, ()=>{
    console.log("Connected to server")
})