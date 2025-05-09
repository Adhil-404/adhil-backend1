const usercontroller=require("./UserSchema")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');

const userRegistration=((req,res)=>{
    let password=req.body.password
    let hash=bcrypt.hashSync(password,10)
    let user=new usercontroller({
        userName:req.body.userName,
        userEmail:req.body.userEmail,
        contact:req.body.contact,
        age:req.body.age,
        password:hash
    })
    user.save() 
    .then((result)=>{  
        console.log(result);
              
        res.json({
            msg:"Registered Successfully",
            data:result
        })
    })
    .catch((err)=>{
        res.json({
            err:err
        })
    })

})


const userlist=((req,res)=>{
    usercontroller.find()
    .then((result)=>{
        console.log(result);
        res.json(result)
    })
    .catch((err)=>{
        res.json({
            err:err
        })
    })
})

const singleuser=((req,res)=>{
    let username=req.params.username 
    usercontroller.find({userName:username})
    .then((result)=>{
        console.log(result);
        res.json(result)
    })
    .catch((err)=>{
        res.json({
            err:err
        })
    })

})

// const deleteuser=((req,res)=>{
//     let userid=req.params.userid
//     usercontroller.findByIdAndDelete(userid)
//     .then((result)=>{
//         console.log(result);
//         res.json(result)
           
        
//     })
//     .catch((err)=>{
//         res.json({
//             err:err
//         })
//     })
// })



const deleteuser=((req,res)=>{
   let userid=req.userid
    usercontroller.findByIdAndDelete(userid)
    .then((result)=>{
        console.log(result);
        res.json(result)
           
        
    })
    .catch((err)=>{
        res.json({
            err:err
        })
    })
})


const userUpdate=((req,res)=>{
    console.log(req.headers.authorization);
    let token=req.headers.authorization.slice(7)
    console.log(token);
    let decode=jwt.decode(token)
    let userID=decode._id
    let { userName, userEmail, contact, age } = req.body;
    usercontroller.findByIdAndUpdate(userID,{userName,userEmail,contact,age})
    .then((result)=>{
        console.log(result);
        res.json(result)
        
    })
    .catch((err)=>{
        res.json({
            err:err
        })
    })
}) 

const userdeatails=((req,res)=>{
    let userfind=req.query.age;
    usercontroller.find({age:userfind})
    .then((result)=>{
        console.log(result);
        res.json(result)
    })
    .catch((err)=>{
        res.json({
            err:err
        })
    })
})


const login=((req,res)=>{
    let email=req.body.userEmail;
    usercontroller.findOne({userEmail:email})
    .then((result)=>{
        console.log(result);
        if (!result){
            res.json({err:"email is wrong"})
        }
       let ismatching= bcrypt.compareSync(req.body.password,result.password)
       if (ismatching===true) {
        console.log(true);
        
        let token=jwt.sign({
            _id:result._id,
            userEmail:result.userEmail
        },"jk1")
        res.json({token})
        
       } else {
         res.json({err:"password is wrong"})
        
       }
    })
    .catch((err)=>{
        res.json({
            err:err
        })
    })


})
module.exports={userRegistration,userlist,singleuser,deleteuser,userUpdate,userdeatails,login}
