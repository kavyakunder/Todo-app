import React, { useState } from "react";
import { Button, ListItem, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function TodoList({ item, deleteFn, id, setList, list }) {
  const [editItem, setEditItem] = useState(null);

  const handleEdit = () => {
    setEditItem(item);
  };

  const handleCancel = () => {
    setEditItem(null);
  };

  const handleSave = (id) => {
    const updatedList = list.map((item, index) => {
      if (id === index) {
        return editItem;
      } else {
        return item;
      }
    });
    setList(updatedList);
    setEditItem(null);
  };

  const handleInputChange = (event) => {
    setEditItem(event.target.value);
  };

  return (
    <div className="list">
      {editItem ? (
        <>
          <TextField
            data-testid="input-edit"
            value={editItem}
            onChange={handleInputChange}
          />
          <Button
            data-testid="btn-save"
            color="success"
            onClick={() => handleSave(id)}
            disabled={!editItem}
          >
            <CheckCircleIcon />
          </Button>
          <Button data-testid="btn-cancel" color="error" onClick={handleCancel}>
            <CancelIcon />
          </Button>
        </>
      ) : (
        <>
          <ListItem data-testid="list-item" key={id}>
            {item}
          </ListItem>
          <Button
            data-testid="btn-edit"
            color="info"
            onClick={() => handleEdit(id)}
          >
            <EditIcon />
          </Button>
          <Button data-testid="btn-delete" onClick={() => deleteFn(id)}>
            <DeleteForeverIcon
              style={{ color: "grey" }}
              className="btn-black"
            />
          </Button>
        </>
      )}
    </div>
  );
}

export default TodoList;
