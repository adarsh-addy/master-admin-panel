import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/esm/CloseButton";
import Loader from "./Loader";
import "../styles/engineermaster.css";

export default function Place() {
  const [error,setError]=useState(true)
  const [product, setProduct] = useState([]);
  let [place, setPlace] = useState("");
  console.log(place);

  const[isLoading,setIsLoading]=useState(false);

  async function handleClick(e) {
    setIsLoading(true)
    e.preventDefault();
    let info = await axios.post(
      "http://localhost:5800/backend/placeSave",
      { place }
    ).catch((err)=>{
      console.log(err.response);
      alert(err.response.data.message);
    });
    if(info){
      console.log(info.data);
      alert("Record Inserted successfully");
      // console.log(result.data.records);
      let result = await axios.get("http://localhost:5800/backend/placeShow");
      console.log(result.data.records);
    setProduct([...result.data.records]);
      };

    
    
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
                      <Form.Label>Place</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Place"
                        onChange={(e) => {setPlace(e.target.value);e.target.value? setError(false) : setError(true)}}
                      />
                    </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleClick}
                        disabled={error}
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
                    {/* <Th>Engineer</Th> */}
                    {/* <Th>Customer</Th> */}
                    <Th>Place</Th>
                    {/* <Th>City</Th> */}
                    {/* <Th>Meeting</Th>
                    <Th>Brand</Th> */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {product.length !== 0 ? (
                      product.map((ele, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{ele.id}</Td>
                            {/* <Td>{ele.mobile_num}</Td>
                            <Td>{ele.eng_name}</Td>
                            <Td>{ele.cust_name}</Td> */}
                            <Td>{ele.place}</Td>
                            {/* <Td>{ele.city}</Td> */}
                            {/* <Td>{ele.meeting}</Td>
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