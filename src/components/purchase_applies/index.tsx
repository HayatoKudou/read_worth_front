import { useSnackbar } from "notistack";
import * as React from "react";
import { useRecoilValue } from "recoil";
import { BookPurchaseAppliesListResponse, BookPurchaseAppliesListResponseBookPurchaseAppliesInner } from "../../../api_client";
import InitBookPurchase from "../../api/book/purchase_apply/init";
import ApiClient from "../../lib/apiClient";
import { useChoseWorkspace } from "../../store/choseWorkspace";
import { useMe } from "../../store/me";
import ConfirmDialog from "../parts/confirm_dialog";
import Spinner from "../parts/spinner";
import { Approval } from "./elements/Approval";
import { List } from "./elements/List";

const PurchaseApplies = () => {
  const me = useRecoilValue(useMe);
  const choseWorkspace = useRecoilValue(useChoseWorkspace);
  const [selectedInitPurchaseApply, setSelectedInitPurchaseApply] = React.useState<BookPurchaseAppliesListResponseBookPurchaseAppliesInner>();
  const [selectedEditPurchaseApply, setSelectedEditPurchaseApply] = React.useState<BookPurchaseAppliesListResponseBookPurchaseAppliesInner>();
  const [approvalOpen, setApprovalOpen] = React.useState<boolean>(false);
  const [openInitConfirm, setOpenInitConfirm] = React.useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState<null | BookPurchaseAppliesListResponse>(null);

  const fetchPurchaseApplies = () => {
    setLoading(true);
    ApiClient(me.apiToken)
      .apiWorkspaceIdBookPurchaseAppliesGet(choseWorkspace.workspaceId)
      .then((res) => {
        setLoading(false);
        setResponse(res.data);
        if (selectedEditPurchaseApply) {
          setSelectedEditPurchaseApply(
            res.data.bookPurchaseApplies.find((bookPurchaseApply) => bookPurchaseApply.book.id === selectedEditPurchaseApply.book.id)
          );
        }
      })
      .catch(() => {
        setLoading(false);
        enqueueSnackbar("エラーが発生しました", { variant: "error" });
      });
  };

  React.useEffect(() => {
    fetchPurchaseApplies();
  }, [choseWorkspace]);

  if (loading || !response) return <Spinner />;

  const handleEdit = (e: { stopPropagation: any }, purchaseApply: any) => {
    e.stopPropagation();
    setSelectedEditPurchaseApply(purchaseApply);
    setApprovalOpen(true);
  };

  const handleInitClick = (purchaseApply: BookPurchaseAppliesListResponseBookPurchaseAppliesInner) => {
    setOpenInitConfirm(true);
    setSelectedInitPurchaseApply(purchaseApply);
  };

  const handleInit = () => {
    if (!selectedInitPurchaseApply) {
      return;
    }
    setLoading(true);
    InitBookPurchase(choseWorkspace.workspaceId, selectedInitPurchaseApply.book.id, {
      apiToken: me.apiToken,
    })
      .then(() => {
        enqueueSnackbar("申請却下を取り消しました", { variant: "success" });
        setLoading(false);
        setOpenInitConfirm(false);
        fetchPurchaseApplies();
      })
      .catch(() => {
        enqueueSnackbar(`エラーが発生しました`, { variant: "error" });
        setLoading(false);
        setOpenInitConfirm(false);
      });
  };

  return (
    <>
      <ConfirmDialog
        message={"申請却下を取り消しますか？"}
        open={openInitConfirm}
        onClose={() => setOpenInitConfirm(false)}
        handleSubmit={handleInit}
      />
      {selectedEditPurchaseApply && (
        <Approval
          canNotification={response.slackCredentialExists}
          purchaseApply={selectedEditPurchaseApply}
          open={approvalOpen}
          onClose={() => setApprovalOpen(false)}
          onSuccess={() => fetchPurchaseApplies()}
        />
      )}
      <List bookPurchaseApplies={response.bookPurchaseApplies} handleEdit={handleEdit} handleInit={handleInitClick} />
    </>
  );
};

export default PurchaseApplies;
