import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../Loader";
import CloseButton from 'react-bootstrap/CloseButton';

import "../../styles/leadview.css";

export default function UserLeadview() {
  const [product, setProduct] = useState([]);
  let [fromdate, setFromDate] = useState("");
  let [todate, setToDate] = useState("");
  console.log(fromdate);
  console.log(todate);

  const[isLoading,setIsLoading]=useState(false);

  async function handleClick(e) {
    setIsLoading(true)
    e.preventDefault();
    console.log(fromdate,todate);
    let result = await axios.post("http://localhost:5800/backend/userDate", {
      fromdate,
      todate,
    });
    console.log(result.data.records);
    setProduct([...result.data.records]);
    setIsLoading(false)
  }

  if(isLoading){
    return <Loader/>
  }
  else{
  return (
    <div className="leadview">
      <div className="container-sm w-50">

        <div className="row">
          <div className="col">
            <Card body className="mt-4">
        <Link to='/content'><CloseButton style={{float:"right"}}/></Link>
              <div className="row">
                <div className="col">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>From Date</Form.Label>
                      <Form.Control
                        type="Date"
                        placeholder="Date"
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>To Date</Form.Label>
                      <Form.Control
                        type="Date"
                        placeholder="Date"
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleClick}
                    >
                      Show
                    </Button>
                  </Form>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="container-sm w-75 mt-4">
        <div className="row ">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <th>ID</th>
                    <th>Mobile</th>
                    <th>Engineer Name</th>
                    <th>Customer Name</th>
                    <th>Place</th>
                    <th>City</th>
                    <th>Meeting</th>
                    <th>Brand</th>
                  </thead>
                  <tbody>
                    {product.length !== 0 ? (
                      product.map((ele, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{ele.id}</td>
                            <td>{ele.mobile_num}</td>
                            <td>{ele.eng_name}</td>
                            <td>{ele.cust_name}</td>
                            <td>{ele.place}</td>
                            <td>{ele.city}</td>
                            <td>{ele.meeting}</td>
                            <td>{ele.brand}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>NO data</tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}
