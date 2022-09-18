import AddIcon from "@mui/icons-material/Add";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ClientsResponseInner, WorkspaceCreateValidateErrorResponse } from "../../../api_client";
import ApiClient from "../../lib/apiClient";
import { useChoseClient } from "../../store/choseClient";
import { useMe } from "../../store/me";
import ConfirmDialog from "../parts/confirm_dialog";
import Spinner from "../parts/spinner";
import ListItemButton from "./listItemButton";

const MenuList = (props: { open: boolean }) => {
  const { enqueueSnackbar } = useSnackbar();
  const me = useRecoilValue(useMe);
  const [choseClient, setChoseClient] = useRecoilState(useChoseClient);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [clients, setClients] = React.useState<null | Array<ClientsResponseInner>>(null);
  const [openClient, setOpenClient] = React.useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);
  const [createWorkspaceRequestErrors, setCreateWorkspaceRequestErrors] = React.useState<WorkspaceCreateValidateErrorResponse>();
  const [formValues, setFormValues] = React.useState({
    name: "",
  });

  React.useEffect(() => {
    fetchClient();
  }, []);

  if (loading) return <Spinner />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const fetchClient = () => {
    console.log("fetchClient");
    setLoading(true);
    ApiClient(me.apiToken)
      .apiWorkspaceIdClientsGet(choseClient.clientId)
      .then((res) => {
        setClients(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        enqueueSnackbar("エラーが発生しました", {
          variant: "error",
        });
      });
  };

  const createClient = () => {
    setLoading(true);
    ApiClient(me.apiToken)
      .apiWorkspaceIdClientPost(choseClient.clientId, { name: formValues.name })
      .then((res) => {
        setLoading(false);
        enqueueSnackbar("ワークスペースを追加しました", { variant: "success" });
        setCreateWorkspaceRequestErrors({});
        setOpenConfirm(false);
        fetchClient();
      })
      .catch((res) => {
        setLoading(false);
        setCreateWorkspaceRequestErrors(res.response.data.errors);
        enqueueSnackbar("エラーが発生しました", { variant: "error" });
      });
  };

  const handleSelect = (workspaceId: number) => {
    setChoseClient({ clientId: workspaceId });
  };

  return (
    <List component="div">
      {clients?.map((client, index) => (
        <Tooltip title={client.name} key={index} placement={"right"}>
          <ListItemButton
            open={props.open}
            listItemText={client.name}
            selected={choseClient.clientId == client.id}
            icon={<ApartmentIcon />}
            handleSelect={() => handleSelect(client.id)}
          />
        </Tooltip>
      ))}
      <ListItemButton open={props.open} selected={false} icon={<AddIcon />} handleSelect={() => setOpenClient(true)} />

      <Dialog open={openClient} onClose={() => setOpenClient(false)} fullWidth scroll={"paper"}>
        <DialogTitle>ワークスペース追加</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChange}
            value={formValues.name}
            name="name"
            label="名前"
            fullWidth
            variant="standard"
            required
            helperText={createWorkspaceRequestErrors?.name}
            error={createWorkspaceRequestErrors?.name !== undefined}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(true)} type={"submit"} variant={"contained"}>
            追加
          </Button>
        </DialogActions>
        <ConfirmDialog message={"追加しますか？"} open={openConfirm} onClose={() => setOpenConfirm(false)} handleSubmit={createClient} />
      </Dialog>
    </List>
  );
};

export default MenuList;
