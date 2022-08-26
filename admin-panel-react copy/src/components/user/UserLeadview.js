import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../Loader";
import CloseButton from 'react-bootstrap/CloseButton';

import "../../styles/leadview.css";

export default function UserLeadview() {
  const [error1,setError1]=useState(true)
  const [error2,setError2]=useState(true)
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
    }).catch((err)=>{
      console.log(err.response.data.message);
      alert(err.response.data.message);
    });
    if(result){
      console.log(result.data.records);
      alert("Record Loaded successfully");
    setProduct([...result.data.records]);
      }
    setIsLoading(false)
  }

  if(isLoading){
    return <Loader/>
  }
  else{
  return (
    <div className="leadview">
      <div className="container-sm w-63">

        <div className="row">
          <div className="col">
            <Card body className="mt-4">
        <Link to='/usercontent'><CloseButton style={{float:"right"}}/></Link>
              <div className="row">
                <div className="col">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>From Date</Form.Label>
                      <Form.Control
                        type="Date"
                        placeholder="Date"
                        onChange={(e) => {setFromDate(e.target.value);e.target.value? setError1(false) : setError1(true)}}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>To Date</Form.Label>
                      <Form.Control
                        type="Date"
                        placeholder="Date"
                        onChange={(e) => {setToDate(e.target.value);e.target.value? setError2(false) : setError2(true)}}
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleClick}
                      disabled={error1 || error2}
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
            <div className="card-body Table-responsive">
                <Table className="Table">
                  <Thead>
                    <Tr>
                    <Th>ID</Th>
                    <Th>Mobile</Th>
                    <Th>Engineer</Th>
                    <Th>Customer</Th>
                    <Th>Place</Th>
                    <Th>City</Th>
                    <Th>Meeting</Th>
                    <Th>Brand</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {product.length !== 0 ? (
                      product.map((ele, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{ele.id}</Td>
                            <Td>{ele.mobile_num}</Td>
                            <Td>{ele.eng_name}</Td>
                            <Td>{ele.cust_name}</Td>
                            <Td>{ele.place}</Td>
                            <Td>{ele.city}</Td>
                            <Td>{ele.meeting}</Td>
                            <Td>{ele.brand}</Td>
                          </Tr>
                        );
                      })
                    ) : (
                      <Tr><Td>NO data</Td></Tr>
                    )}
                  </Tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}
