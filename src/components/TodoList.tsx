import React, { useEffect, useState } from "react";
import { Button, ListItem, TextField, Grid, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export type TodoListProps = {
  deleteItemFromList: (id: number) => void;
  updateItemFromList: (id: number, editItem: string | null) => void;
  id: number;
  item: string;
};

export const TodoList = ({
  deleteItemFromList,
  updateItemFromList,
  id,
  item,
}: TodoListProps) => {
  const [editItem, setEditItem] = useState<string | null>(null);
  const [done, setDone] = useState<boolean>(false);

  const handleEditItem = () => {
    setEditItem(item);
  };

  const handleEditCancel = () => {
    setEditItem(null);
  };

  const handleEditSave = (id: number) => {
    updateItemFromList(id, editItem);
    setEditItem(null);
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValEdit = event.target.value;
    inputValEdit.trim();
    setEditItem(inputValEdit);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const doneValue = event.target.checked;
    console.log("event", event.target);
    console.log("doneVal", doneValue);
    setDone(doneValue);
    localStorage.setItem(`${id}`, JSON.stringify(doneValue));
  };

  useEffect(() => {
    setDone(JSON.parse(localStorage.getItem(`${id}`) || "false"));
  }, [id]);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      {editItem ? (
        <>
          <Grid item xs={4} marginLeft={2}>
            <TextField
              inputProps={{ "data-testid": "input-edit" }}
              onChange={handleEditInputChange}
              value={editItem}
            />
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            <Grid item xs={4}>
              <Button
                color="success"
                data-testid="btn-save"
                disabled={!editItem}
                onClick={() => handleEditSave(id)}
              >
                <CheckCircleIcon />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="error"
                data-testid="btn-cancel"
                onClick={handleEditCancel}
              >
                <CancelIcon />
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={8} paddingLeft={10}>
            <Grid display="flex">
              <Checkbox
                checked={done}
                color="secondary"
                data-testid="checkbox"
                onChange={handleCheckboxChange}
              />
              <ListItem
                data-testid="list-item"
                key={id}
                style={{
                  textDecoration: done ? "line-through" : "none",
                }}
              >
                {item}
              </ListItem>
            </Grid>
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            <Grid item xs={4}>
              <Button
                data-testid="btn-edit"
                color="info"
                onClick={handleEditItem}
              >
                <EditIcon />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                data-testid="btn-delete"
                onClick={() => deleteItemFromList(id)}
              >
                <DeleteForeverIcon
                  className="btn-black"
                  style={{ color: "#2A3038" }}
                />
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};
