import React from "react";
import { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/engineermaster.css";

export default function Place() {
  const [product, setProduct] = useState([]);
  let [place, setPlace] = useState("");
  console.log(place);

  async function handleClick(e) {
    e.preventDefault();
    let result = await axios.post(
      "http://localhost:5800/backend/place",
      { place }
    );
    console.log(result.data.records);
    setProduct([...result.data.records]);
  }

  return (
    <>
      <div className="engineermaster">
        <div className="container-sm w-50">
          <div className="row">
            <div className="col">
              <Card body className="mt-4">
                <div className="row">
                  <div className="col">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="Select">Place</Form.Label>
                        <Form.Select
                          id="Select"
                          onChange={(e) => setPlace(e.target.value)}
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
                      {/* <th>Engineer Name</th>
                      <th>Customer Name</th> */}
                      <th>Place</th>
                      {/* <th>City</th>
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
                              {/* <td>{ele.eng_name}</td>
                              <td>{ele.cust_name}</td> */}
                              <td>{ele.place}</td>
                              {/* <td>{ele.city}</td>
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
