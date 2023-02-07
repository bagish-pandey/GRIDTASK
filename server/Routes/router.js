const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


// register employee data
router.post("/create", (req, res) => {

    //console.log(req.body);

    const { name, salary } = req.body;

    if (!name || !salary) {
        res.status(422).json("plz fill the all data");
    }

    try {
        // conn.query("SELECT * FROM employee WHERE name = ?", name, (err, result) => {
        //     if (result.length) {
        //         res.status(422).json("This Data is Already Exist")
        //     } else {
            if(name != ''){
                conn.query("INSERT INTO employee SET ?", { name, salary }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                        
                    }
                })}
        //     }
        // })
    } catch (error) {
        res.status(422).json(error);
    }

});




// get userdata

router.get("/getdata",(req,res)=>{

    conn.query("SELECT * FROM employee",(err,result)=>{
        if(err){
            res.status(422).json("nodata available");
        }else{
            res.status(201).json(result);
        }
    })
});


// user delete api

router.delete("/delete/:id",(req,res)=>{

    const {id} = req.params;
    conn.query("DELETE FROM employee WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});



// get single user

router.get("/induser/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("SELECT * FROM users WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});


// update users api


router.patch("/updateemp/:id",(req,res)=>{

    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE employee SET ? WHERE id = ? ",[data,id],(err,result)=>{
        if(err){
            res.status(422).json({message:"error"});
        }else{
            res.status(201).json(result);
        }
    })
});

module.exports = router;



