import React, { useEffect, useState } from "react";
import {
  Button,
  ListItem,
  TextField,
  Grid,
  Checkbox,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export type TodoListProps = {
  deleteFn: (id: number) => void;
  handleChange: (id: number, editItem: string | null) => void;
  id: number;
  item: string;
};

export const TodoList = ({
  deleteFn,
  handleChange,
  id,
  item,
}: TodoListProps) => {
  const [editItem, setEditItem] = useState<string | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const handleEdit = () => {
    setEditItem(item);
  };

  const handleCancel = () => {
    setEditItem(null);
  };

  const handleSave = (id: number) => {
    handleChange(id, editItem);
    setEditItem(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValEdit = event.target.value;
    inputValEdit.trim();
    setEditItem(inputValEdit);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const doneValue = event.target.checked;
    setDone(doneValue);
    localStorage.setItem(`item${id}`, JSON.stringify(doneValue));
  };

  useEffect(() => {
    setDone(JSON.parse(localStorage.getItem(`item${id}`) || "false"));
  }, []);

  return (
    <>
      {editItem ? (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={4}>
            <TextField
              inputProps={{ "data-testid": "input-edit" }}
              value={editItem}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4} justifyContent="flex-end">
            <Grid item xs={4}>
              <Button
                data-testid="btn-save"
                color="success"
                onClick={() => handleSave(id)}
                disabled={!editItem || /^\s*$/.test(editItem)}
              >
                <CheckCircleIcon />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                data-testid="btn-cancel"
                color="error"
                onClick={handleCancel}
              >
                <CancelIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={8} paddingLeft={10}>
              <Box display="flex">
                <Checkbox
                  data-testid="checkbox"
                  color="secondary"
                  onChange={handleCheckboxChange}
                  checked={done}
                />
                <ListItem
                  data-testid="list-item"
                  key={id}
                  style={{
                    textDecoration: done ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </ListItem>
              </Box>
            </Grid>
            <Grid container item xs={4} justifyContent="flex-end">
              <Grid item xs={4}>
                <Button
                  data-testid="btn-edit"
                  color="info"
                  onClick={handleEdit}
                >
                  <EditIcon />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button data-testid="btn-delete" onClick={() => deleteFn(id)}>
                  <DeleteForeverIcon
                    style={{ color: "#2A3038" }}
                    className="btn-black"
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
