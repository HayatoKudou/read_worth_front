import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { BookPurchaseAppliesListResponseBookPurchaseAppliesInner } from "../../../../../../../api_client";
import AcceptAPI from "../../../../../../api/book/purchase_apply/accept";
import Refuse from "../../../../../../api/book/purchase_apply/refuse";
import { useChoseWorkspace } from "../../../../../../store/choseWorkspace";
import { useMe } from "../../../../../../store/me";
import ConfirmDialog from "../../../../../parts/confirm_dialog";
import Spinner from "../../../../../parts/spinner";
import styles from "./styles.module.scss";

interface Props {
  bookImage: Blob | null;
  purchaseApply: BookPurchaseAppliesListResponseBookPurchaseAppliesInner;
  onSuccess: () => void;
  onClose: () => void;
}

export const Accept = (props: Props) => {
  const me = useRecoilValue(useMe);
  const choseWorkspace = useRecoilValue(useChoseWorkspace);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const [openAcceptConfirm, setOpenAcceptConfirm] = React.useState<boolean>(false);
  const [openRefuseConfirm, setOpenRefuseConfirm] = React.useState<boolean>(false);

  if (loading) return <Spinner />;

  const handleRefuse = () => {
    setLoading(true);
    Refuse(choseWorkspace.workspaceId, props.purchaseApply.book.id, {
      apiToken: me.apiToken,
    })
      .then(() => {
        enqueueSnackbar("却下しました", { variant: "success" });
        setOpenAcceptConfirm(false);
        setLoading(false);
        props.onSuccess();
        props.onClose();
      })
      .catch(() => {
        enqueueSnackbar(`却下に失敗しました`, { variant: "error" });
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    setLoading(true);
    AcceptAPI(choseWorkspace.workspaceId, props.purchaseApply.book.id, {
      apiToken: me.apiToken,
    })
      .then(() => {
        enqueueSnackbar("承認しました", { variant: "success" });
        setOpenAcceptConfirm(false);
        setLoading(false);
        props.onSuccess();
      })
      .catch(() => {
        enqueueSnackbar(`承認に失敗しました`, { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <>
      <ConfirmDialog
        message={"本当に承認しますか？"}
        open={openAcceptConfirm}
        onClose={() => setOpenAcceptConfirm(false)}
        handleSubmit={handleSubmit}
      />
      <ConfirmDialog
        message={"本当に却下しますか？"}
        open={openRefuseConfirm}
        onClose={() => setOpenRefuseConfirm(false)}
        handleSubmit={handleRefuse}
      />
      <DialogContent>
        <Grid container>
          <Grid item xs={4} className={styles.accept__imageContainer}>
            {props.bookImage && props.bookImage instanceof Blob ? (
              <img className={styles.accept__image} src={URL.createObjectURL(props.bookImage)} alt={"書籍画像"} />
            ) : (
              <ImageNotSupportedIcon fontSize="large" />
            )}
          </Grid>
          <Grid item xs={8}>
            <Box className={styles.accept__detailContainer}>
              <Typography className={styles.accept__detailItem}>申請者</Typography>
              <Typography>{props.purchaseApply.user.name}</Typography>
            </Box>
            <Box className={styles.accept__detailContainer}>
              <Typography className={styles.accept__detailItem}>価格</Typography>
              <Typography>{"¥ " + props.purchaseApply.price}</Typography>
            </Box>
            <Box className={styles.accept__detailContainer}>
              <Typography className={styles.accept__detailItem}>タイトル</Typography>
              <Typography>{props.purchaseApply.book.title}</Typography>
            </Box>
            <Box className={styles.accept__detailContainer}>
              <Typography className={styles.accept__detailItem}>URL</Typography>
              {props.purchaseApply.book.url && (
                <Link target="_blank" className={styles.accept__detailUrl} href={props.purchaseApply.book.url}>
                  {props.purchaseApply.book.url}
                </Link>
              )}
            </Box>
            <Box className={styles.accept__detailContainer}>
              <Typography className={styles.accept__detailItem}>申請理由</Typography>
              <Typography>{props.purchaseApply.reason}</Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenRefuseConfirm(true)} variant="contained" sx={{ width: "100px" }} color={"error"}>
          {"却下"}
        </Button>
        <Button onClick={() => setOpenAcceptConfirm(true)} variant="contained" sx={{ width: "100px" }}>
          {"承認"}
        </Button>
      </DialogActions>
    </>
  );
};
