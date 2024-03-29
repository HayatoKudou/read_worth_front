import { useSnackbar } from "notistack";
import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BooksResponseBooksInner } from "../../../api_client";
import ApiClient from "../../lib/apiClient";
import { useBookCategories } from "../../store/book/categories";
import { useChoseWorkspace } from "../../store/choseWorkspace";
import { useMe } from "../../store/me";
import ConfirmDialog from "../parts/confirm_dialog";
import Spinner from "../parts/spinner";
import { Create } from "./elements/Create";
import { CsvUpload } from "./elements/CsvUpload";
import { Edit } from "./elements/Edit";
import { List } from "./elements/List";

const Books = () => {
  const me = useRecoilValue(useMe);
  const choseWorkspace = useRecoilValue(useChoseWorkspace);
  const [, setBookCategories] = useRecoilState(useBookCategories);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedEditBook, setSelectedEditBook] = React.useState<BooksResponseBooksInner>();
  const [selectedBookIds, setSelectedBookIds] = React.useState<Array<number>>([]);
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState<boolean>(false);
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);
  const [csvUploadDialogOpen, setCsvUploadDialogOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [books, setBooks] = React.useState<Array<BooksResponseBooksInner>>([]);

  React.useEffect(() => {
    fetchBooks();
  }, [choseWorkspace]);

  if (loading) return <Spinner />;

  const fetchBooks = () => {
    setLoading(true);
    ApiClient(me.apiToken)
      .apiWorkspaceIdBooksGet(choseWorkspace.workspaceId)
      .then((res) => {
        setBooks(res.data.books);
        setBookCategories(res.data.bookCategories);
        setLoading(false);
      })
      .catch(() => {
        enqueueSnackbar("エラーが発生しました", { variant: "error" });
        setLoading(false);
      });
  };

  const handleEditBook = (e: { stopPropagation: any }, book: BooksResponseBooksInner) => {
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

  const handleDeleteBook = () => {
    setLoading(true);
    ApiClient(me.apiToken)
      .apiWorkspaceIdBookDelete(choseWorkspace.workspaceId, {
        bookIds: selectedBookIds,
      })
      .then(() => {
        setLoading(false);
        setOpenDeleteConfirm(false);
        fetchBooks();
        enqueueSnackbar("書籍の削除に成功しました。", { variant: "success" });
      })
      .catch(() => {
        setLoading(false);
        setOpenDeleteConfirm(false);
        enqueueSnackbar("エラーが発生しました", { variant: "error" });
      });
  };

  return (
    <>
      <CsvUpload open={csvUploadDialogOpen} handleClose={() => setCsvUploadDialogOpen(false)} handleSuccess={fetchBooks} />
      <Create open={createDialogOpen} setClose={() => setCreateDialogOpen(false)} success={fetchBooks} />
      {selectedEditBook && <Edit book={selectedEditBook} open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} onSuccess={fetchBooks} />}
      <ConfirmDialog message={"本当に削除しますか？"} open={openDeleteConfirm} onClose={handleConfirmClose} handleSubmit={handleDeleteBook} />
      <List
        books={books}
        handleCsvUpload={handleClickCsvUploadButton}
        handleCreate={handleClickCreateButton}
        handleEdit={handleEditBook}
        handleDelete={handleClickDeleteButton}
        selected={selectedBookIds}
        setSelected={setSelectedBookIds}
      />
    </>
  );
};

export default Books;
