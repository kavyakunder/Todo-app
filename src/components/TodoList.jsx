import React from "react";
import { Button, ListItem, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

function TodoList({ item, deleteFn, id }) {
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
          <TextField value={editItem} onChange={handleInputChange} />
          <Button color="success" onClick={handleSave} disabled={!editItem}>
            <CheckCircleIcon />
          </Button>
          <Button color="error" onClick={handleCancel} disabled={!editItem}>
            <CancelIcon />
          </Button>
        </>
      ) : (
        <>
          <ListItem key={id}>{editItem}</ListItem>
          <Button color="info" onClick={handleEdit}>
            <EditIcon />
          </Button>
          <Button color="dark" onClick={() => deleteFn(id)}>
            <DeleteForeverIcon className="btn-black" />
          </Button>
        </>
      )}
    </div>
  );
}

export default TodoList;
