const express = require("express");
const BackendRouter = express.Router();
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const { createAccessJwt, createRefreshJwt } = require('../utils/jwt')
const {verifyJWT} =require("../utils/verifyJWT")



// creatpool is used for application grade connectivity in mysql
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin_panel",
});

// make routes of router;
// making a post to database while taking inputs from frontend.
BackendRouter.post("/save", async (req, res) => {
  const mobile = req.body.mobile;
  const eng_name = req.body.eng_name;
  const cust_name = req.body.cust_name;
  const contactor_mobile = req.body.contactor_mobile;
  const contactor_name = req.body.contactor_name;
  const place = req.body.place;
  const city = req.body.city;
  const state_of_work = req.body.state_of_work;
  const no_of_storey = req.body.no_of_storey;
  const brand = req.body.brand;
  const visit_egg_name = req.body.visit_egg_name;
  const visit_egg_mobile = req.body.visit_egg_mobile;
  const meeting = req.body.meeting;
  const date = req.body.date;
  const comment = req.body.comment;
  // const encryptpassword=await bcrypt.hash(password,8);
  if(!mobile && !eng_name && !cust_name && !contactor_mobile && !contactor_name && !place && !city && !state_of_work && !no_of_storey && !brand && !visit_egg_name && !visit_egg_mobile && !meeting && !date && !comment){
    return res.status(400).send({
       message:"Invalid all details"
     })
   }
  // callback og getconnection is type of promise return type of callback.
  db.getConnection(async (err, connection) => {
    if (err) throw err;

    // whenever this is called , we will search in database;
    // ? = this is placeholder
    const sqlSearch =
      "SELECT *FROM customer_details WHERE mobile_num=? && eng_name=? && cust_name=?";
    const search_query = mysql.format(sqlSearch, [mobile, eng_name, cust_name]);
    // whenever this is called we want to insert something to database;

    const sqlInsert =
      "INSERT INTO customer_details(mobile_num,eng_name,cust_name,contactor_mobile,contactor_name,place,city,state_of_work,no_of_storey,brand,visit_egg_name,visit_egg_mobile,meeting,date_of,comment) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const insert_query = mysql.format(sqlInsert, [
      mobile,
      eng_name,
      cust_name,
      contactor_mobile,
      contactor_name,
      place,
      city,
      state_of_work,
      no_of_storey,
      brand,
      visit_egg_name,
      visit_egg_mobile,
      meeting,
      date,
      comment,
    ]);

    // now asking the connection for sql database for the given record;
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------>searching for result");
      console.log(result.length);
      if (result.length != 0) {
        // releasing the connection with database;
        connection.release();
        console.log("Record already exists");
        res.json({
          message: "Record already exists",
        });
      } else {
        await connection.query(insert_query, (err, result) => {
          if (err) throw err;
          console.log("Record inserted");
          res.json({
            message: "Record inserted successfully",
            result: result,
          });
          connection.release();
        });
      }
    });
  });
});

BackendRouter.patch("/update", async (req, res) => {
  const id = req.body.id;
  const mobile = req.body.mobile;
  const eng_name = req.body.eng_name;
  const cust_name = req.body.cust_name;
  const contactor_mobile = req.body.contactor_mobile;
  const contactor_name = req.body.contactor_name;
  const place = req.body.place;
  const city = req.body.city;
  const state_of_work = req.body.state_of_work;
  const no_of_storey = req.body.no_of_storey;
  const brand = req.body.brand;
  const visit_egg_name = req.body.visit_egg_name;
  const visit_egg_mobile = req.body.visit_egg_mobile;
  const meeting = req.body.meeting;
  const date = req.body.date;
  const comment = req.body.comment;
  if(!id && !mobile && !eng_name && !cust_name && !contactor_mobile && !contactor_name && !place && !city && !state_of_work && !no_of_storey && !brand && !visit_egg_name && !visit_egg_mobile && !meeting && !date && !comment){
   return res.status(400).send({
      message:"Invalid id & all details"
    })
  }
  
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlInsert = `UPDATE customer_details SET mobile_num=${mobile}, eng_name='${eng_name}', cust_name='${cust_name}', contactor_mobile=${contactor_mobile} ,contactor_name='${contactor_name}', place='${place}', city='${city}', state_of_work='${state_of_work}', no_of_storey=${no_of_storey}, brand='${brand}', visit_egg_name='${visit_egg_name}', visit_egg_mobile=${visit_egg_mobile}, meeting='${meeting}', date_of='${date}', comment='${comment}' WHERE id=${id}`;
    await connection.query(sqlInsert, (err, result) => {
      if (err) throw err;
      console.log("Record updated");
      res.json({
        message: "Record updated successfully",
        result: result,
      });
      connection.release();
    });
  });
});

BackendRouter.post("/idresult", (req, res) => {
  const id = req.body.id;
  if(!id){
    return res.status(400).send({
       message:"Invalid id "
     })
   }
  console.log("--->id", id);
  // let password=req.body.password;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = `SELECT * FROM customer_details WHERE id='${id}'`;
    await connection.query(sqlSearch, async (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query executed",
        records: result,
      });
      connection.release();
    });
  });
});

BackendRouter.get("/show", async (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM customer_details";
    await connection.query(sqlSearch, (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query Executed",
        records: result,
      });
      connection.release();
    });
  });
});

BackendRouter.post("/engineername", (req, res) => {
  const eng_name = req.body.eng_name;
  // let password=req.body.password;
  if(!eng_name){
    return res.status(400).send({
       message:"Invalid Engineering name "
     })
   }
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = `SELECT * FROM customer_details WHERE eng_name='${eng_name}'`;
    await connection.query(sqlSearch, async (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query executed",
        records: result,
      });
      connection.release();
    });
  });
});

BackendRouter.post("/date", (req, res) => {
  const fromdate = req.body.fromdate;
  const todate = req.body.todate;
  console.log("fromdate",fromdate,"todate",todate);
  // let password=req.body.password;
  if(!fromdate && !todate){
    return res.status(400).send({
       message:"Invalid date "
     })
   }
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = `SELECT * FROM customer_details WHERE date_of BETWEEN '${fromdate}' AND '${todate}'`;
    await connection.query(sqlSearch, async (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query executed",
        records: result,
      });
      connection.release();
    });
  });
});



BackendRouter.post("/placeSave", (req, res) => {
  const place = req.body.place;
  // let password=req.body.password;
  if(!place){
    return res.status(400).send({
       message:"Invalid Place "
     })
   }
  db.getConnection(async (err, connection) => {
    if (err) throw err;

    const sqlSearch = 'SELECT * FROM place WHERE place=? ';
    const search_query=mysql.format(sqlSearch,[place]);

    const sqlInsert='INSERT INTO place(place) VALUES(?)';
    const insert_query=mysql.format(sqlInsert,[place])
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("---->searching for result");
      console.log("result", result);
      console.log(result.length);
      if(result.length !=0){
        connection.release();
        console.log("record already exist");
        res.json({
          message:"record already exist"
        });
      }else{
        await connection.query(insert_query,(err,result)=>{
          if(err) throw err;
          console.log("record inserted");
          res.json({
            message:"record inserted successfully",
            result:result
          })
          connection.release()
        })
      }
    });
  });
});

BackendRouter.get("/placeShow", async (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM place";
    await connection.query(sqlSearch, (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query Executed",
        records: result,
      });
      connection.release();
    });
  });
});




BackendRouter.post("/citySave", (req, res) => {
  const city = req.body.city;
  // let password=req.body.password;
  if(!city){
    return res.status(400).send({
       message:"Invalid City "
     })
   }
  db.getConnection(async (err, connection) => {
    if (err) throw err;

    const sqlSearch = 'SELECT * FROM city WHERE city=? ';
    const search_query=mysql.format(sqlSearch,[city]);

    const sqlInsert='INSERT INTO city(city) VALUES(?)';
    const insert_query=mysql.format(sqlInsert,[city])
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("---->searching for result");
      console.log("result", result);
      console.log(result.length);
      if(result.length !=0){
        connection.release();
        console.log("record already exist");
        res.json({
          message:"record already exist"
        });
      }else{
        await connection.query(insert_query,(err,result)=>{
          if(err) throw err;
          console.log("record inserted");
          res.json({
            message:"record inserted successfully",
            result:result
          })
          connection.release()
        })
      
      }
  });
})
});

BackendRouter.get("/cityShow", async (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM city";
    await connection.query(sqlSearch, (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query Executed",
        records: result,
      });
      connection.release();
    });
  });
});




//user id and password also for admin
BackendRouter.post('/user',async (req, res) => {
  const name= req.body.name;
  const category=req.body.category;
  const email = req.body.email;
  const password = req.body.password;
  const encryptpassword = await bcrypt.hash(password,8) 
  if(!name && !category && !email && !password ){
    return res.status(400).send({
       message:"Invalid name,email & password"
     })
   }
  // callback og getconnection is type of promise return type of callback.
  db.getConnection(async(err, connection) => {
      if (err) throw (err);

      // whenever this is called , we will search in database;
      // ? = this is placeholder
      const sqlSearch = "SELECT*FROM auth_db WHERE email=?"
      const search_query = mysql.format(sqlSearch, [email]);
      // whenever this is called we want to insert something to database;

      const sqlInsert = "INSERT INTO auth_db(name,category,email,password) VALUES(?,?,?,?)";
      const insert_query = mysql.format(sqlInsert, [name,category,email, encryptpassword]);

      // now asking the connection for sql database for the given email;
      await connection.query(search_query, async(err, result) => {
          if (err) throw (err);
          console.log("------>searching for result");
          console.log(result.length)
          if (result.length != 0) {
              // releasing the connection with database;
              connection.release();
              console.log("email already exists")
              res.json({
                  message:"email already exists"
              })
          } else {
              await connection.query(insert_query, (err, result) => {
                  if (err) throw (err);
                  console.log("data inserted");
                  res.json({
                      message: "data inserted successfully",
                      result:result
                  })
                  connection.release()
              })
          }
         
      })
      
  })
  
})
// user authentication => password
// bcrypt => comparison 
BackendRouter.post('/userAuth', (req, res) => {
  let email = req.body.email;
  let category=req.body.category;
  let password = req.body.password;
  if(!email && category && !password ){
    return res.status(400).send({
       message:"Invalid email & password"
     })
   }
  db.getConnection(async(err,connection) => {
      if (err) throw (err);
      const sqlSearch = "SELECT*FROM auth_db WHERE email=? && category=?"
      const search_query = mysql.format(sqlSearch, [email,category])    //searching for the given email
      await connection.query(search_query, async(err, result) => {
          if (err) throw (err);
          if (result.length == 0) {
              console.log("---------> User does not exist");
              // page redirect to login page
             res.json({message:"User does not exist"})

          } else {
              console.log('this is result',result);
              const hasedpassword = result[0].password;
              console.log(password);
              console.log(hasedpassword);
              let val= await bcrypt.compare(password+"", hasedpassword)
          if(val){
            // res.json({message:"authenticated"})
            console.log(category);
            const accessToken = await createAccessJwt(email);
                const refreshToken = await createRefreshJwt(email);
                res.json({
                    user:{email,category},
                    accessToken,
                    refreshToken,
                    message:category=="Admin"? "admin_authenticated" :"user_Authenticated"
                    
                    
                })
          }else{
            console.log("incorrect password");
            res.json({message:"incorrect password"})
          }
            
           
          }
      })
  })
})

BackendRouter.get("/validate", verifyJWT,(req,res) => {//authentication only verified user
  res.json({
       auth:true
   })
})



//user details
BackendRouter.post("/userSave", async (req, res) => {
  const mobile = req.body.mobile;
  const eng_name = req.body.eng_name;
  const cust_name = req.body.cust_name;
  const contactor_mobile = req.body.contactor_mobile;
  const contactor_name = req.body.contactor_name;
  const place = req.body.place;
  const city = req.body.city;
  const state_of_work = req.body.state_of_work;
  const no_of_storey = req.body.no_of_storey;
  const brand = req.body.brand;
  const visit_egg_name = req.body.visit_egg_name;
  const visit_egg_mobile = req.body.visit_egg_mobile;
  const meeting = req.body.meeting;
  const date = req.body.date;
  const comment = req.body.comment;
  // const encryptpassword=await bcrypt.hash(password,8);
  if(!mobile && !eng_name && !cust_name && !contactor_mobile && !contactor_name && !place && !city && !state_of_work && !no_of_storey && !brand && !visit_egg_name && !visit_egg_mobile && !meeting && !date && !comment){
    return res.status(400).send({
       message:"Invalid all details"
     })
   }
  // callback og getconnection is type of promise return type of callback.
  db.getConnection(async (err, connection) => {
    if (err) throw err;

    // whenever this is called , we will search in database;
    // ? = this is placeholder
    const sqlSearch =
      "SELECT *FROM usercustomerdetails WHERE mobile_num=? && eng_name=? && cust_name=?";
    const search_query = mysql.format(sqlSearch, [mobile, eng_name, cust_name]);
    // whenever this is called we want to insert something to database;

    const sqlInsert =
      "INSERT INTO usercustomerdetails(mobile_num,eng_name,cust_name,contactor_mobile,contactor_name,place,city,state_of_work,no_of_storey,brand,visit_egg_name,visit_egg_mobile,meeting,date_of,comment) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const insert_query = mysql.format(sqlInsert, [
      mobile,
      eng_name,
      cust_name,
      contactor_mobile,
      contactor_name,
      place,
      city,
      state_of_work,
      no_of_storey,
      brand,
      visit_egg_name,
      visit_egg_mobile,
      meeting,
      date,
      comment,
    ]);

    // now asking the connection for sql database for the given record;
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------>searching for result");
      console.log(result.length);
      if (result.length != 0) {
        // releasing the connection with database;
        connection.release();
        console.log("Record already exists");
        res.json({
          message: "Record already exists",
        });
      } else {
        await connection.query(insert_query, (err, result) => {
          if (err) throw err;
          console.log("Record inserted");
          res.json({
            message: "Record inserted successfully",
            result: result,
          });
          connection.release();
        });
      }
    });
  });
});

BackendRouter.patch("/userUpdate", async (req, res) => {
  const id = req.body.id;
  const mobile = req.body.mobile;
  const eng_name = req.body.eng_name;
  const cust_name = req.body.cust_name;
  const contactor_mobile = req.body.contactor_mobile;
  const contactor_name = req.body.contactor_name;
  const place = req.body.place;
  const city = req.body.city;
  const state_of_work = req.body.state_of_work;
  const no_of_storey = req.body.no_of_storey;
  const brand = req.body.brand;
  const visit_egg_name = req.body.visit_egg_name;
  const visit_egg_mobile = req.body.visit_egg_mobile;
  const meeting = req.body.meeting;
  const date = req.body.date;
  const comment = req.body.comment;
  if(!id && !mobile && !eng_name && !cust_name && !contactor_mobile && !contactor_name && !place && !city && !state_of_work && !no_of_storey && !brand && !visit_egg_name && !visit_egg_mobile && !meeting && !date && !comment){
    return res.status(400).send({
       message:"Invalid all details"
     })
   }
  
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlInsert = `UPDATE usercustomerdetails SET mobile_num=${mobile}, eng_name='${eng_name}', cust_name='${cust_name}', contactor_mobile=${contactor_mobile} ,contactor_name='${contactor_name}', place='${place}', city='${city}', state_of_work='${state_of_work}', no_of_storey=${no_of_storey}, brand='${brand}', visit_egg_name='${visit_egg_name}', visit_egg_mobile=${visit_egg_mobile}, meeting='${meeting}', date_of='${date}', comment='${comment}' WHERE id=${id}`;
    await connection.query(sqlInsert, (err, result) => {
      if (err) throw err;
      console.log("Record updated");
      res.json({
        message: "Record updated successfully",
        result: result,
      });
      connection.release();
    });
  });
});

BackendRouter.post("/userIdresult", (req, res) => {
  const id = req.body.id;
  console.log("--->id", id);
  // let password=req.body.password;
  if(!id){
    return res.status(400).send({
       message:"Invalid id"
     })
   }
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = `SELECT * FROM usercustomerdetails WHERE id='${id}'`;
    await connection.query(sqlSearch, async (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query executed",
        records: result,
      });
      connection.release();
    });
  });
});

BackendRouter.get("/userShow", async (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM usercustomerdetails";
    await connection.query(sqlSearch, (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query Executed",
        records: result,
      });
      connection.release();
    });
  });
});

BackendRouter.post("/userEngineername", (req, res) => {
  const eng_name = req.body.eng_name;
  // let password=req.body.password;
  if(!eng_name){
    return res.status(400).send({
       message:"Invalid Engineer Name"
     })
   }
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = `SELECT * FROM usercustomerdetails WHERE eng_name='${eng_name}'`;
    await connection.query(sqlSearch, async (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query executed",
        records: result,
      });
      connection.release();
    });
  });
});

BackendRouter.post("/userDate", (req, res) => {
  const fromdate = req.body.fromdate;
  const todate = req.body.todate;
  console.log("fromdate",fromdate,"todate",todate);
  // let password=req.body.password;
  if(!fromdate && !todate){
    return res.status(400).send({
       message:"Invalid date"
     })
   }
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = `SELECT * FROM usercustomerdetails WHERE date_of BETWEEN '${fromdate}' AND '${todate}'`;
    await connection.query(sqlSearch, async (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query executed",
        records: result,
      });
      connection.release();
    });
  });
});

BackendRouter.post("/userPlace", (req, res) => {
  const place = req.body.place;
  // let password=req.body.password;
  if(!place){
    return res.status(400).send({
       message:"Invalid place"
     })
   }
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = `SELECT * FROM usercustomerdetails WHERE place='${place}'`;
    await connection.query(sqlSearch, async (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query executed",
        records: result,
      });
      connection.release();
    });
  });
});

BackendRouter.post("/userCity", (req, res) => {
  const city = req.body.city;
  // let password=req.body.password;
  if(!city){
    return res.status(400).send({
       message:"Invalid city"
     })
   }
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = `SELECT * FROM usercustomerdetails WHERE city='${city}'`;
    await connection.query(sqlSearch, async (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Query executed",
        records: result,
      });
      connection.release();
    });
  });
});

module.exports = BackendRouter;
