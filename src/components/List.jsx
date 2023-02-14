import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

function List({ item, deleteFn, id }) {
  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState(item);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleSave = () => {
    setEdit(false);
  };

  const handleInputChange = (event) => {
    setEditItem(event.target.value);
  };

  return (
    <div className="list">
      {edit ? (
        <>
          <input
            value={editItem}
            onChange={handleInputChange}
            contentEditable
          />
          <Button onClick={handleSave}>
            <CheckCircleIcon className="btn-green" />
          </Button>
          <Button onClick={handleCancel}>
            <CancelIcon className="btn-red" />
          </Button>
        </>
      ) : (
        <>
          <li key={id}>{editItem}</li>
          <Button onClick={handleEdit}>
            <EditIcon className="btn-blue" />
          </Button>
          <Button onClick={() => deleteFn(id)}>
            <DeleteForeverIcon className="btn-black" />
          </Button>
        </>
      )}
    </div>
  );
}

export default List;
