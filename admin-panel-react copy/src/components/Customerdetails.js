import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/customerdetails.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import CloseButton from "react-bootstrap/esm/CloseButton";
import Loader from "./Loader";

export default function Customerdetails() {
  
const[isLoading,setIsLoading]=useState(false);
  const [product, setProduct] = useState([]);
  const [error,setError]=useState(true)
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
  let [comment, setComment] = useState("");
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
  console.log(comment);

  async function handleClick(e) {
    setIsLoading(true)
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
      comment,
    });
    console.log(resp.data);
    let result = await axios.get("http://localhost:5800/backend/show");
    console.log(result.data.records);
    setProduct([...result.data.records]);
    // setTimeout(()=> setIsLoading(false),1000)
    setIsLoading(false)
   
  }

  // let [id,setId]=useState('')
  // console.log(id);
  //   async function handleClickId(idx){
  //     setId(idx);
  // let idResult= await axios.post("http://localhost:5800/backend/idresult",{id:idx})
  // console.log(idResult);
  //   }
let[id,setId]=useState('');
  async function handleClickId(idx) {
    setId(idx)//using this value for update query to need of id value 
    let idResult = await axios.post("http://localhost:5800/backend/idresult", {
      id: idx,
    });
    console.log(idResult.data.records[0]);
    const customer_data = idResult.data.records[0];
    setMobile(customer_data.mobile_num); //--->mobile_num is database column name & also we again overwrite the used for incoming use
    setEng_name(customer_data.eng_name);
    setCust_name(customer_data.cust_name);
    setContactor_mobile(customer_data.contactor_mobile);
    setContactor_name(customer_data.contactor_name);
    setPlace(customer_data.place);
    setCity(customer_data.city);
    setState_of_work(customer_data.state_of_work);
    setNo_of_storey(customer_data.no_of_storey);
    setBrand(customer_data.brand);
    setVisit_egg_name(customer_data.visit_egg_name);
    setVisit_egg_mobile(customer_data.visit_egg_mobile);
    setMeeting(customer_data.meeting);
    let dt=customer_data.date_of?customer_data.date_of.split('T')[0]:"";
    setDate(dt);
    setComment(customer_data.comment)

  }
  
  async function handleUpdate(e){
    setIsLoading(true)
    e.preventDefault()
    let resp = await axios.patch("http://localhost:5800/backend/update", {
    id,  
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
    }).catch((err)=>{//here we applying an error condition to using a update so we using catch for this to handle an error issue
      // console.log(err.response.data);
      alert(err.response.data.message);
    });
    if(resp){
    console.log(resp.data);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    async function res() {
      setIsLoading(true)
      let result = await axios.get("http://localhost:5800/backend/show");
    console.log(result.data.records);
    setProduct([...result.data.records]);
    // setTimeout(()=> setIsLoading(false),2000)
     setIsLoading(false)
    }
    res();
  }, []);

  if(isLoading){
    return <Loader/>
  }
  else{
  return (

     <div className="customer-details">
      <div className="container-sm w-50">
        <div className="row">
          <div className="col">
            <Card body className="mt-4">
            <Link to='/content'><CloseButton style={{float:"right"}}/></Link>
              <div className="row">
                <div className="col">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicMobile">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter mobile no."
                        onChange={(e) =>{ setMobile(e.target.value);e.target.value? setError(false) : setError(true)}}
                        value={mobile}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Engineer Name</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => setEng_name(e.target.value)}
                        value={eng_name}
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
                        value={cust_name}
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
                        value={contactor_mobile}
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
                        value={contactor_name}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Select Place</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => setPlace(e.target.value)}
                        value={place}
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
                        value={city}
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
                        value={state_of_work}
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
                        value={no_of_storey}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Select Brand</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand}
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
                        value={visit_egg_name}
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
                        value={visit_egg_mobile}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Select Meeting</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => setMeeting(e.target.value)}
                        value={meeting}
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
                        value={date}
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
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleClick}
                      disabled={error}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="primary ms-2"
                      type="submit"
                      onClick={handleUpdate}
                    >
                      Update
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
                          <tr key={idx} onClick={() => handleClickId(ele.id)}>
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