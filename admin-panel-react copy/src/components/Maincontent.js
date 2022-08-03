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
                    <button type="submit" class="btn1">
                      <span class="plusSymbol">+</span>
                      <br />
                      <span class="btn1-name">New Lead</span>
                    </button>

                    <button type="submit" class="btn1">
                      <Link to='/leadview'>
                      <span class="plusSymbol">+</span>
                      <br />
                      <span class="btn1-name">View/Modify</span>
                      </Link>
                    </button>
                    <button type="submit" class="btn1">
                      <Link to='/engineermaster'>
                      <span class="plusSymbol">+</span>
                      <br />
                      <span class="btn1-name">Engineer Master</span>
                      </Link>
                    </button>

                    <button type="submit" class="btn1">
                      <Link to='/customerdetail'>

                      <span class="plusSymbol">+</span>
                      <br />
                      <span class="btn1-name">Customer details</span>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="parent-btn">
                    <button type="submit" class="btn1">
                      <span class="plusSymbol">+</span>
                      <br />
                      <span class="btn1-name">New Lead</span>
                    </button>

                    <button type="submit" class="btn1">
                      <span class="plusSymbol">+</span>
                      <br />
                      <span class="btn1-name">New Lead</span>
                    </button>
                    <button type="submit" class="btn1">
                      <span class="plusSymbol">+</span>
                      <br />
                      <span class="btn1-name">New Lead</span>
                    </button>

                    <button type="submit" class="btn1">
                      <span class="plusSymbol">+</span>
                      <br />
                      <span class="btn1-name">New Lead</span>
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
