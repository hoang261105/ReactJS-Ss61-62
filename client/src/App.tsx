import React, { useEffect, useState } from "react";
import DeleteWork from "./components/DeleteWork";
import ErrorWork from "./components/ErrorWork";
import ListWork from "./components/ListWork";
import Work from "./components/Work";
import axios, { AxiosResponse } from "axios";
import Loading from "./components/Loading";
import ConcideWork from "./components/ConcideWork";
import EditWork from "./components/EditWork";

interface Work {
  id: number;
  name: string;
  status: boolean;
}

export default function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [works, setWorks] = useState<Work[]>([]);
  const [check, setCheck] = useState<boolean>(true);
  const [concide, setConcide] = useState<boolean>(false);
  const [selected, setSelected] = useState<Work | null>(null);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [edited, setEdited] = useState<Work | null>(null);
  const [editWork, setEditWork] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("all");

  const loadData = () => {
    setCheck(true);
    axios
      .get("http://localhost:8080/works")
      .then((data: AxiosResponse<Work[]>) => {
        setWorks(data.data);
        setTimeout(() => {
          setCheck(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [inputValue]);

  const resetWork = () => {
    setInputValue("");
  };

  const closeError = () => {
    setError(false);
  };

  const closeConcide = () => {
    setConcide(false);
  };

  // Hàm thêm công việc
  const handleCreate = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    const concideWork = works.find((item) => item.name === inputValue);
    if (inputValue) {
      if (!concideWork) {
        axios
          .post("http://localhost:8080/works", {
            id: Math.ceil(Math.random() * 10000),
            name: inputValue,
            status: false,
          })
          .then(() => {
            loadData();
            resetWork();
          })
          .catch((err) => console.log(err));
        setConcide(false);
      } else {
        setConcide(true);
      }
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(!e.target.value);
  };

  // Hàm xóa
  const handleDelete = () => {
    if (selected) {
      axios
        .delete(`http://localhost:8080/works/${selected.id}`)
        .then(() => {
          loadData();
          setDeleted(false);
          setSelected(null);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteClick = (work: Work) => {
    setSelected(work);
    setDeleted(true);
  };

  // Hàm sửa công việc
  const handleEdit = () => {
    if (edited) {
      axios
        .put(`http://localhost:8080/works/${edited.id}`, {
          ...edited,
          name: inputValue,
        })
        .then(() => {
          loadData();
          setEditWork(false);
          resetWork();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEditClick = (edit: Work) => {
    setEdited(edit);
    setInputValue(edit.name);
    setEditWork(true);
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdited({ ...edited, name: e.target.value } as Work);
    setInputValue(e.target.value);
  };

  // Hàm thay đổi trạng thái
  const handleChangeStatus = (id: number) => {
    const workToUpdate = works.find((work) => work.id === id);
    if (workToUpdate) {
      axios
        .put(`http://localhost:8080/works/${id}`, {
          ...workToUpdate,
          status: !workToUpdate.status,
        })
        .then(() => {
          setWorks((prevWorks) =>
            prevWorks.map((work) =>
              work.id === id ? { ...work, status: !work.status } : work
            )
          );
        })
        .catch((err) => console.log(err));
    }
  };

  // Hàm chuyển tab
  const handleTabClick = (tab: string) => {
    setTab(tab);
  };

  const filteredWorks = works.filter((work) => {
    if (tab === "completed") return work.status === true;
    if (tab === "incompleted") return work.status === false;
    return true;
  });
  return (
    <>
      {check ? <Loading /> : ""}
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <Work
                    handleChange={handleChange}
                    handleCreate={handleCreate}
                  />
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link ${tab === "all" ? "active" : ""}`}
                        onClick={() => handleTabClick("all")}
                      >
                        Tất cả
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link ${
                          tab === "completed" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("completed")}
                      >
                        Đã hoàn thành
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link ${
                          tab === "incompleted" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("incompleted")}
                      >
                        Chưa hoàn thành
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {filteredWorks.map((item) => (
                          <ListWork
                            work={item}
                            handleDeleteClick={handleDeleteClick}
                            handleEditClick={handleEditClick}
                            handleChangeStatus={handleChangeStatus}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    gap: 10,
                  }}
                >
                  <button
                    style={{
                      background: "red",
                      border: "none",
                      borderRadius: 5,
                      height: 40,
                      color: "white",
                    }}
                    onClick={() => console.log("Xóa công việc hoàn thành")}
                  >
                    Xóa công việc hoàn thành
                  </button>
                  <button
                    style={{
                      background: "red",
                      border: "none",
                      borderRadius: 5,
                      height: 40,
                      color: "white",
                    }}
                    onClick={() => console.log("Xóa tất cả công việc")}
                  >
                    Xóa tất cả công việc
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DeleteWork
          handleDelete={handleDelete}
          isDelete={deleted}
          onClose={() => setDeleted(false)}
          workname={selected?.name || ""}
        />
        <ErrorWork error={error} closeError={closeError} />
        <ConcideWork concide={concide} closeConcide={closeConcide} />
        <EditWork
          handleEdit={handleEdit}
          isEdit={editWork}
          onCloseEdit={() => setEditWork(false)}
          worknameEdit={edited?.name || ""}
          handleChangeEdit={handleChangeEdit}
        />
      </section>
    </>
  );
}
