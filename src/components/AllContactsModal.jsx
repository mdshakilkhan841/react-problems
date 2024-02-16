import React from "react";

const AllContactsModal = () => {
  return (
    <div className="text-secondary">Hi</div>
    // <div
    //   className="modal fade"
    //   id="exampleModal"
    //   tabindex="-1"
    //   aria-labelledby="exampleModalLabel"
    //   aria-hidden="true"
    // >
    //   <div className="modal-dialog modal-dialog-scrollable">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <button
    //           type="button"
    //           className={
    //             modal == 1 ? "btn btn-primary" : "btn btn-outline-primary"
    //           }
    //         >
    //           All Contacts
    //         </button>
    //         <button
    //           type="button"
    //           className="btn btn-outline-warning"
    //           data-bs-target="#exampleModal2"
    //           data-bs-toggle="modal"
    //           data-bs-dismiss="modal"
    //           onClick={() => fetchData("us")}
    //         >
    //           US Contacts
    //         </button>
    //         <button
    //           type="button"
    //           className="btn btn-outline-primary"
    //           data-bs-dismiss="modal"
    //         >
    //           Close
    //         </button>
    //       </div>
    //       <div className="modal-body">
    //         {allContacts.map((item) => (
    //           <div key={item.id} className="d-flex justify-content-between">
    //             <div className="col-6">Phone: {item.phone}</div>
    //             <div className="col-6">Country: {item.country.name}</div>
    //           </div>
    //         ))}
    //       </div>
    //       <div className="modal-footer">Footer</div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AllContactsModal;
