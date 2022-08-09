const express = require("express");
const BackendRouter = express.Router();
const mysql = require("mysql");
// const bcrypt=require('bcrypt')

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
  if(!id && !mobile ){
   return res.status(400).send({
      message:"Invalid id & mobile no."
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

BackendRouter.post("/place", (req, res) => {
  const place = req.body.place;
  // let password=req.body.password;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = `SELECT * FROM customer_details WHERE place='${place}'`;
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

BackendRouter.post("/city", (req, res) => {
  const city = req.body.city;
  // let password=req.body.password;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = `SELECT * FROM customer_details WHERE city='${city}'`;
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
