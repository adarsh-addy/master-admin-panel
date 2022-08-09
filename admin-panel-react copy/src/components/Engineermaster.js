import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
        <div className="container-sm w-50">
          <div className="row">
            <div className="col">
              <Card body className="mt-4">
              <Link to='/'><CloseButton style={{float:"right"}}/></Link>
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
          <div class="row ">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <table class="table table-striped">
                    <thead>
                      <th>ID</th>
                      {/* <th>Mobile</th> */}
                      <th>Engineer Name</th>
                      {/* <th>Customer Name</th>
                      <th>Place</th>
                      <th>City</th>
                      <th>Meeting</th>
                      <th>Brand</th> */}
                    </thead>
                    <tbody>
                      {product.length !== 0 ? (
                        product.map((ele, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{ele.id}</td>
                              {/* <td>{ele.mobile_num}</td> */}
                              <td>{ele.eng_name}</td>
                              {/* <td>{ele.cust_name}</td>
                              <td>{ele.place}</td>
                              <td>{ele.city}</td>
                              <td>{ele.meeting}</td>
                              <td>{ele.brand}</td> */}
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
    </>
  );
                      }
}
