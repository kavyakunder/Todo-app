import React, { useState } from "react";
import { Button, ListItem, TextField, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type TodoListProps = {
  item: string;
  deleteFn: (id: number) => void;
  id: number;
  handleChange: (id: number, editItem: string | null) => void;
};

export const TodoList = ({
  item,
  deleteFn,
  id,
  handleChange,
}: TodoListProps) => {
  const [editItem, setEditItem] = useState<string | null>(null);

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
    setEditItem(event.target.value.trim());
  };

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
          <Grid container item xs={4} justifyContent="flex-end">
            <Grid item xs={4}>
              <Button
                data-testid="btn-save"
                color="success"
                onClick={() => handleSave(id)}
                disabled={!editItem}
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
              <ListItem data-testid="list-item" key={id}>
                {item}
              </ListItem>
            </Grid>
            <Grid container item xs={4} justifyContent="flex-end">
              <Grid item xs={4}>
                <Button
                  data-testid="btn-edit"
                  color="info"
                  onClick={() => handleEdit()}
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
