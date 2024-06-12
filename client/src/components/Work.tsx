import axios from "axios";
import React from "react";

interface Work {
  id: number;
  name: string;
  status: boolean;
}

interface Works {
  handleCreate: (e: React.FormEvent<Element>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Work({ handleChange, handleCreate }: Works) {
  return (
    <form
      className="d-flex justify-content-center align-items-center mb-4"
      onSubmit={handleCreate}
    >
      <div className="form-outline flex-fill">
        <input
          type="text"
          id="form2"
          className="form-control"
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="form2">
          Nhập tên công việc
        </label>
      </div>
      <button type="submit" className="btn btn-info ms-2">
        Thêm
      </button>
    </form>
  );
}
