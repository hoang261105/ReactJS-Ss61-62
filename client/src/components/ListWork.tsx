import axios from "axios";

interface Work {
  id: number;
  name: string;
  status: boolean;
}

interface Works {
  work: Work;
  handleDeleteClick: (work: Work) => void;
  handleEditClick: (edit: Work) => void;
  handleChangeStatus: (id: number) => void;
}

export default function ListWork({
  work,
  handleDeleteClick,
  handleEditClick,
  handleChangeStatus,
}: Works) {
  const handleChecked = (id: number) => {
    handleChangeStatus(id);
  };
  return (
    <>
      <li
        key={work.id}
        className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
        style={{ backgroundColor: "#f4f6f7" }}
      >
        <div style={{ width: "100%" }}>
          <input
            className="form-check-input me-2"
            type="checkbox"
            checked={work.status}
            onChange={() => handleChecked(work.id)}
          />
          <label htmlFor="">
            {work.status ? <s>{work.name}</s> : <p>{work.name}</p>}
          </label>
        </div>
        <div className="d-flex gap-3">
          {!work.status ? (
            <i
              className="fas fa-pen-to-square text-warning"
              onClick={() => handleEditClick(work)}
            />
          ) : (
            <></>
          )}
          <i
            className="far fa-trash-can text-danger"
            onClick={() => handleDeleteClick(work)}
          />
        </div>
      </li>
    </>
  );
}
