import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "./Loader";
import CloseButton from "react-bootstrap/esm/CloseButton";
import "../styles/engineermaster.css";

export default function Engineermaster() {
  const [product, setProduct] = useState([]);
  let [eng_name, setEng_name] = useState("");
  console.log(eng_name);
  const[isLoading,setIsLoading]=useState(false);
  async function handleClick(e) {
    setIsLoading(true)
    e.preventDefault();
    let result = await axios.post(
      "http://localhost:5800/backend/engineername",
      { eng_name }
    );
    console.log(result.data.records);
    setProduct([...result.data.records]);
    setIsLoading(false)
  }
  if(isLoading){
    return <Loader/>
  }
  else{
  return (
    <>
      <div className="engineermaster">
        <div className="container-sm w-63">
          <div className="row">
            <div className="col">
              <Card body className="mt-4">
              <Link to='/content'><CloseButton style={{float:"right"}}/></Link>
                <div className="row">
                  <div className="col">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="Select">Engineer Name</Form.Label>
                        <Form.Select
                          id="Select"
                          onChange={(e) => setEng_name(e.target.value)}
                        >
                          <option>Something</option>
                          <option>Select1</option>
                          <option>Select2</option>
                        </Form.Select>
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleClick}
                      >
                        Submit
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
                    {/* <Th>Mobile</Th> */}
                    <Th>Engineer</Th>
                    {/* <Th>Customer</Th>
                    <Th>Place</Th>
                    <Th>City</Th>
                    <Th>Meeting</Th>
                    <Th>Brand</Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {product.length !== 0 ? (
                      product.map((ele, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{ele.id}</Td>
                            {/* <Td>{ele.mobile_num}</Td> */}
                            <Td>{ele.eng_name}</Td>
                            {/* <Td>{ele.cust_name}</Td>
                            <Td>{ele.place}</Td>
                            <Td>{ele.city}</Td>
                            <Td>{ele.meeting}</Td>
                            <Td>{ele.brand}</Td> */}
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
    </>
  );
                      }
}
