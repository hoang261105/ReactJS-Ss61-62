import React from "react";

interface EditWork {
  isEdit: boolean;
  handleEdit: () => void;
  onCloseEdit: () => void;
  worknameEdit: string;
  handleChangeEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditWork({
  isEdit,
  handleEdit,
  onCloseEdit,
  worknameEdit,
  handleChangeEdit,
}: EditWork) {
  if (!isEdit) return null;
  return (
    <div className="overlay">
      <div className="modal-custom">
        <div className="modal-header-custom">
          <h5>Sửa công việc</h5>
          <i className="fas fa-xmark" onClick={onCloseEdit} />
        </div>
        <div>
          <input
            type="text"
            style={{ width: "100%" }}
            value={worknameEdit}
            onChange={handleChangeEdit}
          />
        </div>
        <div className="modal-footer-footer">
          <button className="btn btn-light" onClick={onCloseEdit}>
            Hủy
          </button>
          <button className="btn btn-primary" onClick={handleEdit}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
