import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Grid(props) {
  const [data, setData] = useState([]);

  //------------------------------------------ Data Collection from DataBase--------------------------------------//
  useEffect(() => {
    getData();
  }, []);

  async function getData(event) {
    let response = await axios.get("http://localhost:3308/getdata");
    setData(response.data);
  }
  //---------------------------------- End of Data Collection from DataBase--------------------------------------//

  //----------------------------------------Delete Code-------------------------------------------------------//

  const Delete = async (event) => {
    await axios.delete(`http://localhost:3308/delete/${event}`);
    setData(data.filter((a) => a.id !== event));
  };
  //--------------------------------------End of Delete Code-------------------------------------------------//

  //--------------------------------Sorting Component-------------------------------------------------------//

  const [salaryCurrentSort, setSalaryCurrentSort] = useState("default");
  const [nameCurrentSort, setNameCurrentSort] = useState("default");

  const handleSort = (field) => {
    let currentSort = "";
    if (field === "salary") currentSort = salaryCurrentSort;
    else if (field === "name") currentSort = nameCurrentSort;

    let nextSort = "";

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    sortData(field, currentSort);

    if (field === "salary") setSalaryCurrentSort(nextSort);
    else if (field === "name") setNameCurrentSort(nextSort);
  };

  const sortTypes = {
    up: {
      class: "sort-up",

      fnSalary: (a, b) => a.salary - b.salary, //asc

      fnName: (a, b) => a.name.localeCompare(b.name),
    },

    down: {
      class: "sort-down",

      fnSalary: (a, b) => b.salary - a.salary, //desc

      fnName: (a, b) => b.name.localeCompare(a.name),
    },

    default: {
      class: "sort",

      fnSalary: (a, b) => a,

      fnName: (a, b) => a,
    },
  };

  const sortData = (field, type) => {
    if (field === "salary") setData([...data].sort(sortTypes[type].fnSalary));
    else if (field === "name") setData([...data].sort(sortTypes[type].fnName));
  };

  //-------------------------------- End of Sorting Component--------------------------------------------//
  //-------------------------------- Edit Component--------------------------------------------//
  const [newData, setNewData] = useState({
    id: -1,
    name: "",
    salary: "",
  });
  const [editContent, setEditContent] = useState(false);

  const edit = (curId) => {
    const { id, name, salary } = data.find((field) => field.id === curId);
    setNewData({
      id: id,
      name: name,
      salary: salary,
    });
    setEditContent(true);
  };
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setNewData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (id) => {
    await axios.patch(`http://localhost:3308/updateemp/${id}`, newData);
    const list = [...data];

    list.forEach((element, index) => {
      if (element.id === id) list[index] = newData;
    });
    setData([...list]);
    setEditContent(false);
  };
  //-------------------------------- End of Edit Component--------------------------------------------//
  //-------------------------------------Pagination---------------------------------------------------//
  const [perPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastEmp = currentPage * perPage; // 2 * 5 = 10
  const indexOfFirstEmp = indexOfLastEmp - perPage; // 10 - 5 = 5
  const currentEmp = data.slice(indexOfFirstEmp, indexOfLastEmp);
  //console.log(data.length);
  const end = Math.ceil(data.length / perPage);//no.of pages needed

  const setPage = (cur) => {
    let nextPage = currentPage + cur;
    setCurrentPage((0 < nextPage && nextPage <= end) ? nextPage : currentPage);
  }
  //----------------------------------End of Pagination----------------------------------------------//
  const style = {
    position: 'fixed',
    width: '100%',
    bottom: "0",
    fontSize: '25px',
    textAlign: 'center'
  }
  return (
    <>
      <div className="grid" align="center">
        <h1>{props.heading}</h1>
        <table style={{ border: "border: 2px solid" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>
                Name
                <button
                  className="sortButton"
                  onClick={() => handleSort("name")}
                >
                  <i
                    className={`fa-solid fa-${sortTypes[nameCurrentSort].class}`}
                  />
                </button>
              </th>
              <th>
                Salary
                <button
                  className="sortButton"
                  onClick={() => handleSort("salary")}
                >
                  <i
                    className={`fa-solid fa-${sortTypes[salaryCurrentSort].class}`}
                  />
                </button>
              </th>

              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmp.map((curElm) => (
              <tr key={curElm.id}>
                <td>{curElm.id}</td>
                {editContent && curElm.id === newData.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={newData.name}
                        onChange={onChangeHandler}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="salary"
                        value={newData.salary}
                        onChange={onChangeHandler}
                      />
                    </td>
                    <td>
                      <button
                        value={curElm.id}
                        className="btn btn-success"
                        onClick={() => handleSubmit(curElm.id)}
                      >
                        <i class="fa fa-check-circle" aria-hidden="true"></i>

                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => setEditContent(false)}
                      >
                        <i class="fa fa-times" aria-hidden="true"></i>

                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{curElm.name}</td>
                    <td>{curElm.salary}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => edit(curElm.id)}
                      >
                        <i class="fa fa-pencil-square" aria-hidden="true"></i>
                      </button>
                    </td>
                  </>
                )}

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => Delete(curElm.id)}
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav style={style} >
        <button className='btn btn-secondary mx-2' onClick={() => setPage(-1)} >
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
        <span className='btn btn-secondary rounded-pill'> {currentPage} </span>
         of <span className='btn btn-secondary rounded-pill'> {end !== 0 ? end : 1} </span> pages
        <button className='btn btn-secondary mx-2' onClick={() => setPage(+1)} >
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </nav>
    </>
  );
}
