const express= require('express')
const mongoose= require('mongoose')
const {Schema}= mongoose;
const cors=require('cors')

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

mongoose.connect('mongodb://localhost:27017/Login',{
useNewUrlParser:true,
useUnifiedTopology:true
},()=>
console.log("Database Connected")
);



const userSchema = new Schema({
    firstname:{
        type:String,
        
    },
    lastname:{
        type : String,
        minlength:2
    }, 
    username:{
        type:String,
        
        
        
    },
    password:{
        type:String,
        
    }},
    {collection:'user'}

)

const User= mongoose.model('User',userSchema)




app.post('/login',(req,res)=>{
res.send("First One")
})

app.post('/register',(req,res)=>{
    const {fname,lname,email,password}=req.body
    User.findOne({email:email}, (err,user)=>{
        if(user){
            res.send("User is already registered")
        }
        else{
            const user= new User({
                fname,
                lname,
                email,
                password
            })
            user.save(err=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send({message:"Successfully created the user"})
                }
            })
        }
    })
    
})

app.listen(4000,()=>{
    console.log("Server is up and running")
})