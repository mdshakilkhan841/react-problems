import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ModalContent = ({
  modalName,
  contacts,
  setAllContactPageCount,
  setUSContactPageCount,
  checkbox,
}) => {
  console.log("🚀 ~ checkbox:", checkbox);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const div = scrollRef.current;

    if (div.scrollTop + div.clientHeight >= div.scrollHeight) {
      // Reached the end of the scrollable div
      console.log("Reached the end!");
      modalName === "modal-1"
        ? setAllContactPageCount((preValue) => preValue + 1)
        : setUSContactPageCount((preValue) => preValue + 1);
    }
  };

  useEffect(() => {
    const div = scrollRef.current;
    console.log("🚀 ~ useEffect ~ div:", div);
    div.addEventListener("scroll", handleScroll);

    return () => {
      div.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={scrollRef} className="modal-body" style={{ height: 400 }}>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Phone</th>
            <th scope="col">Country</th>
          </tr>
        </thead>
        <tbody>
          {contacts
            .filter((item) => (checkbox ? item.id % 2 === 0 : item.id))
            .map((item, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target={`#Modal${item.id}${modalName}`}
              >
                <th scope="row">{item.id}</th>
                <td>{item.phone}</td>
                <td>{item.country.name}</td>

                {/* modal 3 */}
                <div
                  className="modal fade"
                  id={`Modal${item.id}${modalName}`}
                  tabindex="-1"
                  aria-labelledby={`Modal${item.id}${modalName}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header justify-content-center">
                        <h1 className="modal-title fs-5">
                          Full Contact Details
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => navigate("./")}
                        ></button>
                      </div>
                      <div className="modal-body text-center">
                        {JSON.stringify(item)}
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModalContent;
