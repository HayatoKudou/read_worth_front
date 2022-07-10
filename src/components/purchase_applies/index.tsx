import { useSnackbar } from "notistack";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Config from "../../../config";
import usePurchaseApplies from "../../api/book/purchase_apply/list";
import { useBookCategories } from "../../store/book/categories";
import { useMe } from "../../store/me";
import Spinner from "../parts/spinner";
import CustomTable from "./table";

const Books = () => {
  const me = useRecoilValue(useMe);
  const { enqueueSnackbar } = useSnackbar();
  const [, setBookCategory] = useRecoilState(useBookCategories);
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const [selectedEditBook, setSelectedEditBook] = React.useState<Book>();
  const [selectedBookIds, setSelectedBookIds] = React.useState<number[]>([]);
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState<boolean>(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);
  const [csvUploadDialogOpen, setCsvUploadDialogOpen] = React.useState<boolean>(false);
  const { loading, error, response, mutate } = usePurchaseApplies();

  React.useEffect(() => {
    if (response) {
      setBookCategory(response.bookCategories);
    }
  }, [response]);

  if (loading || deleting || error) return <Spinner />;

  const handleEditBook = (e: { stopPropagation: any }, book: Book) => {
    e.stopPropagation();
    setSelectedEditBook(book);
    setUpdateDialogOpen(true);
  };

  const handleClickCreateButton = () => {
    setCreateDialogOpen(true);
  };

  const handleClickCsvUploadButton = () => {
    setCsvUploadDialogOpen(true);
  };

  const handleClickDeleteButton = () => {
    setOpenDeleteConfirm(true);
  };

  const handleConfirmClose = () => {
    setOpenDeleteConfirm(false);
  };

  const handleSuccess = () => {
    mutate(`${Config.apiOrigin}/api/${me.clientId}/books`);
  };
  console.log(response);

  return (
    <>
      <CustomTable bookPurchaseApplies={response.bookPurchaseApplies} selected={selectedBookIds} setSelected={setSelectedBookIds} />
    </>
  );
};

export default Books;
