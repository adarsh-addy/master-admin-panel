import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/customerdetails.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function Customerdetails() {
  useEffect(() => {
    async function res() {
      let resp = await axios.get("http://localhost:5800/");
      console.log(resp.data);
    }
    res();
  }, []);

  const [product, setProduct] = useState([]);
  let [mobile, setMobile] = useState("");
  let [eng_name, setEng_name] = useState("");
  let [cust_name, setCust_name] = useState("");
  let [contactor_mobile, setContactor_mobile] = useState("");
  let [contactor_name, setContactor_name] = useState("");
  let [place, setPlace] = useState("");
  let [city, setCity] = useState("");
  let [state_of_work, setState_of_work] = useState("");
  let [no_of_storey, setNo_of_storey] = useState("");
  let [brand, setBrand] = useState("");
  let [visit_egg_name, setVisit_egg_name] = useState("");
  let [visit_egg_mobile, setVisit_egg_mobile] = useState("");
  let [meeting, setMeeting] = useState("");
  let [date, setDate] = useState("");
  console.log(mobile);
  console.log(eng_name);
  console.log(cust_name);
  console.log(contactor_mobile);
  console.log(contactor_name);
  console.log(place);
  console.log(city);
  console.log(state_of_work);
  console.log(no_of_storey);
  console.log(brand);
  console.log(visit_egg_name);
  console.log(visit_egg_mobile);
  console.log(meeting);
  console.log(date);

  async function handleClick(e) {
    e.preventDefault();
    let resp = await axios.post("http://localhost:5800/backend/save", {
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
    });
    console.log(resp.data);
    let result = await axios.get("http://localhost:5800/backend/show");
    console.log(result.data.records);
    setProduct([...result.data.records]);
  }

  return (
    <div className="customer-details">
      <div className="container-sm w-50">
        <div className="row">
          <div className="col">
            <Card body className="mt-4">
              <div className="row">
                <div className="col">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicMobile">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter mobile no."
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </Form.Group>

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

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCustomerName"
                    >
                      <Form.Label>Customer Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Customer Name"
                        onChange={(e) => setCust_name(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicContactorMobile"
                    >
                      <Form.Label>Contactor Mobile</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Contactor Mobile"
                        onChange={(e) => setContactor_mobile(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicContactorName"
                    >
                      <Form.Label>Contactor Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Contactor Name"
                        onChange={(e) => setContactor_name(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Select Place</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => setPlace(e.target.value)}
                      >
                        <option>Select</option>
                        <option>Select1</option>
                        <option>Select2</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Select City</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option>Select</option>
                        <option>Select1</option>
                        <option>Select2</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicStateOfWork"
                    >
                      <Form.Label>State of Work</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="State of work"
                        onChange={(e) => setState_of_work(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicNoOfStorey"
                    >
                      <Form.Label>No of Storey</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="No of Storey"
                        onChange={(e) => setNo_of_storey(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Select Brand</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        <option>Select</option>
                        <option>Select1</option>
                        <option>Select2</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicVisitEggName"
                    >
                      <Form.Label>Visit Egg Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Visit Egg Name"
                        onChange={(e) => setVisit_egg_name(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicVisitEggMobile"
                    >
                      <Form.Label>Visit Egg Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Visit Egg mobile"
                        onChange={(e) => setVisit_egg_mobile(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Select Meeting</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => setMeeting(e.target.value)}
                      >
                        <option>Select</option>
                        <option>Select1</option>
                        <option>Select2</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Control
                        type="Date"
                        placeholder="Date"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Comments"
                      >
                        <Form.Control
                          as="textarea"
                          placeholder="Leave a comment here"
                          style={{ height: "100px" }}
                        />
                      </FloatingLabel>
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
