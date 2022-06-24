import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
}

const ConfirmDialog = (props: Props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>本当に実行しますか？</DialogTitle>
      <DialogActions>
        <Button onClick={props.onClose}>いいえ</Button>
        <Button onClick={props.handleSubmit} autoFocus>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;