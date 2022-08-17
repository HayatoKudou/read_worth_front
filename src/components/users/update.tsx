import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useRecoilState } from "recoil";
import Update, { UpdateUserRequestErrors, UpdateUserRequestPayload } from "../../api/user/update";
import { useMe } from "../../store/me";
import ConfirmDialog from "../parts/confirm_dialog";
import FormError from "../parts/form_error";
import Spinner from "../parts/spinner";

interface Props {
  open: boolean;
  user: User;
  onSuccess: () => void;
  onClose: () => void;
}

const UpdateUser = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [me] = useRecoilState(useMe);
  const [loading, setLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState<UpdateUserRequestPayload>({
    id: 0,
    name: "",
    email: "",
    roles: [],
    password: "",
    password_confirmation: "",
    apiToken: "",
  });
  const [updateUserRequestErrors, setUpdateUserRequestErrors] = React.useState<Partial<UpdateUserRequestErrors>>({});
  const [openUpdateConfirm, setOpenUpdateConfirm] = React.useState<boolean>(false);

  React.useEffect(() => {
    const roles: Array<string> = [];
    if (props.user.role.isAccountManager) roles.push("アカウント管理");
    if (props.user.role.isBookManager) roles.push("書籍管理");
    if (props.user.role.isClientManager) roles.push("組織管理");
    setFormValues({
      id: props.user.id,
      name: props.user.name,
      email: props.user.email,
      password: "",
      password_confirmation: "",
      roles: roles,
      apiToken: me.apiToken,
    });
  }, [props.open]);

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleMultiSelectChange = (event: any) => {
    const value = event.target.value;
    setFormValues({
      ...formValues,
      ["roles"]: typeof value === "string" ? value.split(",") : value,
    });
  };

  if (loading) return <Spinner />;

  const handleSubmit = () => {
    setLoading(true);
    Update(me.clientId, {
      id: formValues.id,
      name: formValues.name,
      email: formValues.email,
      roles: formValues.roles,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
      apiToken: formValues.apiToken,
    })
      .then((res) => {
        if (res.succeeded) {
          setUpdateUserRequestErrors({});
          enqueueSnackbar("ユーザーの更新に成功しました。", {
            variant: "success",
          });
          props.onSuccess();
          props.onClose();
        } else {
          setUpdateUserRequestErrors(res.errors);
          enqueueSnackbar(`ユーザー登録に失敗しました`, {
            variant: "error",
          });
        }
        setOpenUpdateConfirm(false);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        enqueueSnackbar(`ユーザーの登録に失敗しました`, { variant: "error" });
      });
  };

  const roles = ["is_account_manager", "isBookManager", "isClientManager"];
  const displayRoleName = (roleValue: string) => {
    switch (roleValue) {
      case "isAccountManager":
        return "アカウント管理";
      case "isBookManager":
        return "書籍管理";
      case "isClientManager":
        return "組織管理";
      default:
        return "unknown";
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <DialogTitle>ユーザー編集</DialogTitle>
      <DialogContent>
        <TextField margin={"dense"} autoFocus label="名前" name="name" value={formValues.name} onChange={handleChange} fullWidth variant="standard" />
        <FormError errors={updateUserRequestErrors?.name} />
        <TextField
          margin={"dense"}
          label="メールアドレス"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
        <FormError errors={updateUserRequestErrors?.email} />

        <FormControl sx={{ minWidth: 300, display: "block", marginTop: 1 }}>
          <InputLabel sx={{ left: "-15px" }}>ロール</InputLabel>
          <Select
            variant="standard"
            fullWidth
            multiple
            value={formValues.roles}
            onChange={handleMultiSelectChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {roles.map((role, index: number) => (
              <MenuItem key={index} value={displayRoleName(role)}>
                {displayRoleName(role)}
              </MenuItem>
            ))}
          </Select>
          <FormError errors={updateUserRequestErrors?.roles} />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} variant="contained" color={"error"}>
          キャンセル
        </Button>
        <Button onClick={() => setOpenUpdateConfirm(true)} variant="contained">
          更新する
        </Button>
        <ConfirmDialog
          message={"本当に更新しますか？"}
          open={openUpdateConfirm}
          onClose={() => setOpenUpdateConfirm(false)}
          handleSubmit={handleSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUser;
