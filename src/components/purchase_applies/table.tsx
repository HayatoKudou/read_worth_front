import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import styles from "../../styles/components/purchase_applies/table.module.scss";
import { getComparator, stableSort } from "../../util/table";
import TableHead from "../parts/table_head";

type Order = "asc" | "desc";

interface Props {
  bookPurchaseApplies: Array<any>;
  selected: Array<any>;
  setSelected: Dispatch<SetStateAction<any>>;
  handleEdit: (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, book: Book) => void;
}

const headCells: readonly TableHeadCell[] = [
  {
    id: "userName",
    numeric: false,
    label: "申請者",
  },
  {
    id: "title",
    numeric: false,
    label: "タイトル",
  },
  {
    id: "reason",
    numeric: false,
    label: "申請理由",
  },
];

const CustomTable = (props: Props) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState("status");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.bookPurchaseApplies.map((n: any) => n.id);
      props.setSelected(newSelecteds);
      return;
    }
    props.setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = props.selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(props.selected.slice(1));
    } else if (selectedIndex === props.selected.length - 1) {
      newSelected = newSelected.concat(props.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(props.selected.slice(0, selectedIndex), props.selected.slice(selectedIndex + 1));
    }
    props.setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => props.selected.indexOf(id) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.bookPurchaseApplies.length) : 0;

  return (
    <Paper>
      <Typography className={styles.booksTable__toolBar} variant="h5">
        申請管理
      </Typography>
      <TableContainer>
        <Table className={styles.booksTable} size="small">
          <TableHead
            numSelected={props.selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={props.bookPurchaseApplies.length}
            headCells={headCells}
            showActionIcon={true}
            showCheckBox={false}
          />
          <TableBody>
            {stableSort(props.bookPurchaseApplies, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((purchaseApply: any, index) => {
                return (
                  <TableRow key={purchaseApply.book.id}>
                    <TableCell>
                      <IconButton onClick={(e) => props.handleEdit(e, purchaseApply)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">{purchaseApply.user.name}</TableCell>
                    <TableCell className={styles.booksTable__title}>{purchaseApply.book.title}</TableCell>
                    <TableCell className={styles.booksTable__title}>{purchaseApply.reason}</TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={props.bookPurchaseApplies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

// @ts-ignore
export default CustomTable;
