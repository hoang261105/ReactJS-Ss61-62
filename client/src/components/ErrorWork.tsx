import axios from "axios";

interface Error {
  error: boolean;
  closeError: () => void;
}

export default function ErrorWork({ error, closeError }: Error) {
  return (
    <div className="overlay" hidden={!error}>
      <div className="modal-custom">
        <div className="modal-header-custom">
          <h5>Cảnh báo</h5>
          <i className="fas fa-xmark" onClick={closeError} />
        </div>
        <div className="modal-body-custom">
          <p>Tên công việc không được phép để trống.</p>
        </div>
        <div className="modal-footer-footer">
          <button className="btn btn-light" onClick={closeError}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
