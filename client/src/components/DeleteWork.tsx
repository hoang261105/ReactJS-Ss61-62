import axios from "axios";

interface DeleteWork {
  isDelete: boolean;
  workname: string;
  onClose: () => void;
  handleDelete: () => void;
}

export default function DeleteWork({
  isDelete,
  workname,
  onClose,
  handleDelete,
}: DeleteWork) {
  if (!isDelete) return null;
  return (
    <div className="overlay">
      <div className="modal-custom">
        <div className="modal-header-custom">
          <h5>Xác nhận</h5>
          <i className="fas fa-xmark" onClick={onClose} />
        </div>
        <div className="modal-body-custom">
          <p>Bạn chắc chắn muốn xóa công việc {workname}?</p>
        </div>
        <div className="modal-footer-footer">
          <button className="btn btn-light" onClick={onClose}>
            Hủy
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
