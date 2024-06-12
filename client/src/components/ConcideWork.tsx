import React from "react";

interface ConcideWork {
  concide: boolean;
  closeConcide: () => void;
}

export default function ConcideWork({ concide, closeConcide }: ConcideWork) {
  return (
    <div className="overlay" hidden={!concide}>
      <div className="modal-custom">
        <div className="modal-header-custom">
          <h5>Cảnh báo</h5>
          <i className="fas fa-xmark" onClick={closeConcide} />
        </div>
        <div className="modal-body-custom">
          <p>Tên công việc không được phép trùng.</p>
        </div>
        <div className="modal-footer-footer">
          <button className="btn btn-light" onClick={closeConcide}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
