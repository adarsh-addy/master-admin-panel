import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
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
  const [error1,setError1]=useState(true)
  const [error2,setError2]=useState(true)
  const [error3,setError3]=useState(true)
  const [error4,setError4]=useState(true)
  const [error5,setError5]=useState(true)
  const [error6,setError6]=useState(true)
  const [error7,setError7]=useState(true)
  const [error8,setError8]=useState(true)
  const [error9,setError9]=useState(true)
  const [error10,setError10]=useState(true)
  const [error11,setError11]=useState(true)
  const [error12,setError12]=useState(true)
  const [error13,setError13]=useState(true)
  const [error14,setError14]=useState(true)
  const [error15,setError15]=useState(true)
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
    setId(idx)//using This value for update query to need of id value 
    let idResult = await axios.post("http://localhost:5800/backend/idresult", {
      id: idx,
    });
    console.log(idResult.data.records[0]);
    const customer_data = idResult.data.records[0];
    setMobile(customer_data.mobile_num); //--->mobile_num is database column name & also we again overwrite The used for incoming use
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
    }).catch((err)=>{//here we applying an error condition to using a update so we using catch for This to handle an error issue
      // console.log(err.response.data);
      alert(err.response.data.message);
    });
    if(resp){
    console.log(resp.data);
    }
    await getData()
    setMobile("")
    setEng_name("")
    setCust_name("")
    setContactor_mobile("")
    setContactor_name("")
    setPlace("")
    setCity("")
    setState_of_work("")
    setNo_of_storey("")
    setBrand("")
    setVisit_egg_name("")
    setVisit_egg_mobile("")
    setMeeting("")
    setDate("")
    setComment("")
    setIsLoading(false)
  }
async function getData(){
  let result = await axios.get("http://localhost:5800/backend/show");
    // console.log(result.data.records);
    setProduct([...result.data.records]);
}
  useEffect(() => {
    async function res() {
      setIsLoading(true)
      await getData()
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
                        onChange={(e) =>{ setMobile(e.target.value);e.target.value? setError1(false) : setError1(true)}}
                        value={mobile}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Engineer Name</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => {setEng_name(e.target.value);e.target.value? setError2(false) : setError2(true)}}
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
                        onChange={(e) => {setCust_name(e.target.value);e.target.value? setError3(false) : setError3(true)}}
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
                        onChange={(e) => {setContactor_mobile(e.target.value);e.target.value? setError4(false) : setError4(true)}}
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
                        onChange={(e) => {setContactor_name(e.target.value);e.target.value? setError5(false) : setError5(true)}}
                        value={contactor_name}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Select Place</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => {setPlace(e.target.value);e.target.value? setError6(false) : setError6(true)}}
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
                        onChange={(e) => {setCity(e.target.value);e.target.value? setError7(false) : setError7(true)}}
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
                        onChange={(e) => {setState_of_work(e.target.value);e.target.value? setError8(false) : setError8(true)}}
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
                        onChange={(e) => {setNo_of_storey(e.target.value);e.target.value? setError9(false) : setError9(true)}}
                        value={no_of_storey}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Select Brand</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => {setBrand(e.target.value);e.target.value? setError10(false) : setError10(true)}}
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
                        onChange={(e) => {setVisit_egg_name(e.target.value);e.target.value? setError11(false) : setError11(true)}}
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
                        onChange={(e) => {setVisit_egg_mobile(e.target.value);e.target.value? setError12(false) : setError12(true)}}
                        value={visit_egg_mobile}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="Select">Select Meeting</Form.Label>
                      <Form.Select
                        id="Select"
                        onChange={(e) => {setMeeting(e.target.value);e.target.value? setError13(false) : setError13(true)}}
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
                        onChange={(e) => {setDate(e.target.value);e.target.value? setError14(false) : setError14(true)}}
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
                          onChange={(e) => {setComment(e.target.value);e.target.value? setError15(false) : setError15(true)}}
                          value={comment}
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleClick}
                      disabled={error1 || error2 ||error3 ||error4 ||error5  ||error6 ||error7 ||error8 ||error9 ||error10 ||error11 ||error12 ||error13 ||error14 ||error15}
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
                          <Tr key={idx} onClick={() => handleClickId(ele.id)}>
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