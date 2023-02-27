import React, { useState } from "react";
import { Button, ListItem, TextField, Grid, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTodoListStyles } from "./TodoList.style";
import { TodoListItemType } from "../App";

export type TodoListProps = {
  item: TodoListItemType;
  deleteItemFromList: (id: number) => void;
  updateItemFromList: (item: TodoListItemType) => void;
};

export const TodoList = ({
  item,
  deleteItemFromList,
  updateItemFromList,
}: TodoListProps) => {
  const [editItem, setEditItem] = useState<string | null>(null);
  const classes = useTodoListStyles();

  const { name, id, checked } = item;

  const handleEditItem = () => {
    setEditItem(name);
  };

  const handleCancel = () => {
    setEditItem(null);
  };

  const handleSave = () => {
    updateItemFromList({ ...item, name: editItem || "" });
    setEditItem(null);
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setEditItem(inputValue);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateItemFromList({
      ...item,
      checked: event.target.checked,
    });
  };

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
                disabled={!editItem.trim()}
                onClick={handleSave}
              >
                <CheckCircleIcon />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="error"
                data-testid="btn-cancel"
                onClick={handleCancel}
              >
                <CancelIcon />
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={8} paddingLeft={10}>
            <Grid
              display="flex"
              className={checked ? classes.listChecked : classes.listUnchecked}
            >
              <Checkbox
                checked={checked}
                color="secondary"
                name="cb"
                data-testid="checkbox"
                onChange={handleCheckboxChange}
              />

              <ListItem data-testid="list-item" key={id}>
                {name}
              </ListItem>
            </Grid>
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            <Grid item xs={4}>
              <Button
                data-testid="btn-edit"
                color="info"
                name="btnq"
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
                <DeleteForeverIcon className={classes.deleteIcon} />
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};
