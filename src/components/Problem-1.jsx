import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });
  const [userData, setUserData] = useState([]);
  const [sortedUserData, setSortedUserData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData([...userData, formData]);

    // clear the current input field
    setFormData({
      name: "",
      status: "",
    });
  };

  // Sorting data for different state
  const filterData = () => {
    if (show === "active") {
      let data = userData?.filter(
        (item) => item.status.toLowerCase() === "active"
      );
      setSortedUserData(data);
    } else if (show === "completed") {
      let data = userData?.filter(
        (item) => item.status.toLowerCase() === "completed"
      );
      setSortedUserData(data);
    } else {
      const order = ["active", "completed", "pending", "archive"];
      const data = userData
        .filter((item) => order.includes(item.status.toLowerCase()))
        .sort(
          (a, b) =>
            order.indexOf(a.status.toLowerCase()) -
            order.indexOf(b.status.toLowerCase())
        );
      //   console.log("🚀 ~ filterData ~ data:", data);
      setSortedUserData(data);
    }
  };

  useEffect(() => {
    filterData();
  }, [show, userData]);

  const handleClick = (val) => {
    // console.log("🚀 ~ handleClick ~ val:", val)
    setShow(val);
  };

  useEffect(() => {
    console.log("🚀 ~ Problem1 ~ userData:", userData);
  }, [userData]);

  //   console.log("🚀 ~ Problem1 ~ formData:", formData);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                required
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-primary"
                // onClick={handleClick}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedUserData?.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
