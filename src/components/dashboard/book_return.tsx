import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { BooksResponseBooksInner } from "../../../api_client";
import BookReturn from "../../api/book/return";
import { useChoseWorkspace } from "../../store/choseWorkspace";
import { useMe } from "../../store/me";
import ConfirmDialog from "../parts/confirm_dialog";
import Spinner from "../parts/spinner";

interface Props {
  bookInfo: BooksResponseBooksInner;
  success: () => void;
}

const BookReturnForm = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const me = useRecoilValue(useMe);
  const choseWorkspace = useRecoilValue(useChoseWorkspace);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpenConfirm(true);
  };

  const handleConfirmClose = () => {
    setOpenConfirm(false);
  };

  if (loading) return <Spinner />;

  const handleSubmit = () => {
    setLoading(true);
    BookReturn(choseWorkspace.workspaceId, props.bookInfo.id, {
      apiToken: me.apiToken,
    })
      .then(() => {
        props.success();
        enqueueSnackbar("返却しました。", {
          variant: "success",
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        enqueueSnackbar(`返却に失敗しました`, { variant: "error" });
      });
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen} sx={{ width: "100px", marginTop: 2, minWidth: "100px" }} endIcon={<KeyboardReturnIcon />}>
        返却
      </Button>
      <ConfirmDialog message={"本当に返却しますか？"} open={openConfirm} onClose={handleConfirmClose} handleSubmit={handleSubmit} />
    </>
  );
};

export default BookReturnForm;
