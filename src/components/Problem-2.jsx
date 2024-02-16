import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ModalContent from "./ModalContent";

const Problem2 = () => {
  const navigate = useNavigate();
  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);
  const [modal, setModal] = useState(null);
  const [allContactPageCount, setAllContactPageCount] = useState(1);
  const [usContactPageCount, setUSContactPageCount] = useState(1);
  const [checkbox, setCheckBox] = useState(false);
  const [inputTextAllContact, setInputTextAllContact] = useState("");
  console.log("🚀 ~ Problem2 ~ inputTextAllContact:", inputTextAllContact);
  const [inputTextUsContact, setInputTextUsContact] = useState("");
  console.log("🚀 ~ Problem2 ~ inputTextUsContact:", inputTextUsContact);

  console.log("🚀 ~ Problem2 ~ checkbox:", checkbox);
  console.log("🚀 ~ Problem2 ~ pageCount:", allContactPageCount);
  console.log("🚀 ~ Problem2 ~ usContactPageCount:", usContactPageCount);
  console.log("🚀 ~ Problem2 ~ modal:", modal);

  const fetchData = async (value) => {
    setModal(value === "all" ? 1 : 2);
    try {
      const res = await fetch(
        value === "all"
          ? `https://contact.mediusware.com/api/contacts/?page=${allContactPageCount}`
          : `https://contact.mediusware.com/api/country-contacts/United States/?page=${usContactPageCount}`
      );
      const data = await res.json();
      if (data.next !== null) {
        value === "all"
          ? setAllContacts([...allContacts, ...data.results])
          : setUSContacts([...usContacts, ...data.results]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(modal == 1 ? "all" : "us");
    console.log("UseEffect Triggered");
  }, [allContactPageCount, usContactPageCount]);

  // search by api call
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const searchData = async (value) => {
      try {
        const res = await fetch(
          value === "all"
            ? `https://contact.mediusware.com/api/contacts/?search=${inputTextAllContact}`
            : `https://contact.mediusware.com/api/country-contacts/United States/?search=${inputTextUsContact}`,
          { signal }
        );
        const data = await res.json();
        console.log("🚀 ~ searchData ~ data:", data);
        value === "all"
          ? setAllContacts(data.results)
          : setUSContacts(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    searchData(modal == 1 ? "all" : "us");
    return () => {
      abortController.abort();
    };
  }, [inputTextAllContact, inputTextUsContact]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <NavLink to={"all-contacts"}>
            <button
              className="btn btn-lg btn-outline-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                fetchData("all");
              }}
              // onClick={() => }
            >
              All Contacts
            </button>
          </NavLink>
          <NavLink to={"us-contacts"}>
            <button
              className="btn btn-lg btn-outline-warning"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
              onClick={() => {
                fetchData("us");
              }}
            >
              US Contacts
            </button>
          </NavLink>
        </div>

        {/* Modal 1 */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className={
                    modal == 1 ? "btn btn-primary" : "btn btn-outline-primary"
                  }
                >
                  All Contacts
                </button>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  data-bs-target="#exampleModal2"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    navigate("us-contacts");
                    fetchData("us");
                  }}
                >
                  US Contacts
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-dismiss="modal"
                  onClick={() => navigate("./")}
                >
                  Close
                </button>
              </div>
              <div className="d-flex gap-4 justify-content-center align-items-center p-2">
                <h6 style={{ margin: 0 }}>Search</h6>
                <input
                  type="text"
                  style={{ width: 250 }}
                  placeholder="search by phone number"
                  onChange={(e) => setInputTextAllContact(e.target.value)}
                />
              </div>
              <ModalContent
                modalName={"modal-1"}
                contacts={allContacts}
                setAllContactPageCount={setAllContactPageCount}
                checkbox={checkbox}
              />
              <div className="modal-footer justify-content-start">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={checkbox}
                  onChange={() => setCheckBox(!checkbox)}
                />
                <label htmlFor="checkbox">Only even</label>
              </div>
            </div>
          </div>
        </div>

        {/* Modal 2 */}
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel2"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    navigate("all-contacts");
                    fetchData("all");
                  }}
                >
                  All Contacts
                </button>
                <button
                  type="button"
                  className={
                    modal == 2 ? "btn btn-warning" : "btn btn-outline-warning"
                  }
                >
                  US Contacts
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-dismiss="modal"
                  onClick={() => navigate("./")}
                >
                  Close
                </button>
              </div>
              <div className="d-flex gap-4 justify-content-center align-items-center p-2">
                <h6 style={{ margin: 0 }}>Search</h6>
                <input
                  type="text"
                  style={{ width: 250 }}
                  placeholder="search by phone number"
                  onChange={(e) => setInputTextUsContact(e.target.value)}
                />
              </div>
              <ModalContent
                modalName={"modal-2"}
                contacts={usContacts}
                setUSContactPageCount={setUSContactPageCount}
                checkbox={checkbox}
              />
              <div className="modal-footer justify-content-start">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={checkbox}
                  onChange={() => setCheckBox(!checkbox)}
                />
                <label htmlFor="checkbox">Only even</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Outlet /> */}
    </div>
  );
};

export default Problem2;
