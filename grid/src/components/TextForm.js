import React, { useState } from "react";
import axios from "axios";

export default function TextForm(props) {
  const [Text, setText] = useState("");
  const [Salary, setSalary] = useState("");
  const DataSaved = async (event) => {
    if (Text !== "" && Salary !== "") {
      await axios.post("http://localhost:3308/create", {
        name: Text,
        salary: Salary,
      });
    } else {
      console.log("object");
    }

    setText("");
    setSalary("");
  };
  const handelName = (event) => {
    setText(event.target.value);
  };
  const handelSalary = (event) => {
    setSalary(event.target.value);
  };
  let formdata = {
    backgroundColor: "#8cbdb1",
    width: "40%",
    height: "300px",
    borderRadius: "5%",
    display: "inline-block",
    marginLeft: "30%",
    marginTop: "5%",
  };

  return (
    <>
      <div className="form-group" style={formdata}>
        <h2 style={{ textAlign: "center" }}>{props.heading}</h2>

        <div className="col-xs-3">
          <label
            htmlFor="name"
            className="name"
            style={{ fontWeight: "bold", margin: "0 0 0 15%" }}
          >
            Name
          </label>
          <input
            type="text"
            value={Text}
            style={{ width: "75%", margin: "0px 0px 0px 15%" }}
            onChange={handelName}
            className="form-control"
            required
          />
        </div>
        <div className="col-xs-3">
          <label
            htmlFor="salary"
            className="salary"
            style={{ fontWeight: "bold", margin: "5% 0 0 15%" }}
          >
            Salary
          </label>
          <input
            type="text"
            style={{ width: "75%", margin: "0px 0px 0px 15%" }}
            value={Salary}
            onChange={handelSalary}
            className="form-control"
            required
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={DataSaved}
          style={{ margin: "5% 10px 10px 45%" }}
        >
          submit
        </button>
      </div>
    </>
  );
}
