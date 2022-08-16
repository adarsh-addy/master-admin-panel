import React from "react";
import {Link} from 'react-router-dom';
import Card from "react-bootstrap/Card";
import "../styles/maincontent.css";

export default function Maincontent() {
  return (
    <div className="maincontent">
      <div className="container-sm">
        <div className="row">
          <div className="col">
            <Card body className='mt-4'>
              <div className="row">
                <div className="col">
                  <div className="parent-btn">
                    <button type="submit" className="btn1">
                      <span className="plusSymbol">+</span>
                      <br />
                      <span className="btn1-name">New Lead</span>
                    </button>

                    <button type="submit" className="btn1">
                      <Link to='/leadview'>
                      <span className="plusSymbol">+</span>
                      <br />
                      <span className="btn1-name">View/Modify</span>
                      </Link>
                    </button>
                    <button type="submit" className="btn1">
                      <Link to='/engineermaster'>
                      <span className="plusSymbol">+</span>
                      <br />
                      <span className="btn1-name">Engineer Master</span>
                      </Link>
                    </button>

                    <button type="submit" className="btn1">
                      <Link to='/customerdetail'>

                      <span className="plusSymbol">+</span>
                      <br />
                      <span className="btn1-name">Customer details</span>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="parent-btn">
                    <button type="submit" className="btn1">

                    <Link to='/place'>
                      <span className="plusSymbol">+</span>
                      <br />
                      <span className="btn1-name">Place</span>
                      </Link>
                    </button>

                    <button type="submit" className="btn1">
                      <Link to='/city'>
                      <span className="plusSymbol">+</span>
                      <br />
                      <span className="btn1-name">City</span>
                      </Link>
                    </button>
                    <button type="submit" className="btn1">
                      <span className="plusSymbol">+</span>
                      <br />
                      <span className="btn1-name">New Lead</span>
                    </button>

                    <button type="submit" className="btn1">
                      <span className="plusSymbol">+</span>
                      <br />
                      <span className="btn1-name">New Lead</span>
                    </button>
                  </div>
                </div>
              </div>


            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
