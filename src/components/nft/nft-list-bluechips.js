import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { Avatar, Box, Button, ButtonGroup } from "@mui/material";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Project",
  },
  {
    id: "market_cap",
    numeric: true,
    disablePadding: false,
    label: "Market Cap",
  },
  {
    id: "num_owners",
    numeric: true,
    disablePadding: false,
    label: "Owners / Supply Percent",
  },
  {
    id: "floor_price",
    numeric: true,
    disablePadding: false,
    label: "Floor",
  },
  {
    id: "sales",
    numeric: true,
    disablePadding: false,
    label: "Sales",
  },
  {
    id: "change",
    numeric: true,
    disablePadding: false,
    label: "Change",
  },
  {
    id: "average_price",
    numeric: true,
    disablePadding: false,
    label: "Avg. Price",
  },
  {
    id: "volume",
    numeric: true,
    disablePadding: false,
    label: "Volume",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, salesDateRange } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const transformSalesDateRangeText = (salesDateRange) => {
    if (salesDateRange == "one_day") {
      return "24H ";
    } else if (salesDateRange == "seven_day") {
      return "7D ";
    } else {
      return "30D ";
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all projects",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {["Sales", "Change", "Avg. Price", "Volume"].includes(headCell.label)
                ? transformSalesDateRangeText(salesDateRange)
                : ""}
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, handleChangeDateRange, salesDateRange } = props;
  const highlightColor = "#f0f6ff";

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          NFTs
        </Typography>
      )}

      {numSelected > 0 ? (
        <></>
      ) : (
        <>
          <ButtonGroup size="small" aria-label="small button group">
            <Button
              key="one_day"
              value="one_day"
              onClick={handleChangeDateRange}
              sx={{ backgroundColor: salesDateRange === "one_day" ? highlightColor : "white" }}
            >
              24H
            </Button>
            <Button
              key="seven_day"
              value="seven_day"
              onClick={handleChangeDateRange}
              sx={{ backgroundColor: salesDateRange === "seven_day" ? highlightColor : "white" }}
            >
              7D
            </Button>
            <Button
              key="thirty_day"
              value="thirty_day"
              onClick={handleChangeDateRange}
              sx={{ backgroundColor: salesDateRange === "thirty_day" ? highlightColor : "white" }}
            >
              30D
            </Button>
          </ButtonGroup>
        </>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function NftBlueChipList() {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("market_cap");
  const [selected, setSelected] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [salesDateRange, setSalesDateRange] = useState("one_day");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = nfts.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangeDateRange = (event) => {
    let newDateRange = event.target.value;
    setSalesDateRange(newDateRange);
    updateDateRangeInStateForTableSort(newDateRange);
  };

  const updateDateRangeInStateForTableSort = (newDateRange) => {
    let updatedCollectionsWithDateRange = [];
    nfts.map((nft) => {
      let updatedNft = { ...nft };
      console.log(nfts);
      switch (newDateRange) {
        case "one_day":
          updatedNft.average_price = nft.one_day_average_price;
          updatedNft.change = nft.one_day_change;
          updatedNft.sales = nft.one_day_sales;
          updatedNft.volume = nft.one_day_volume;
          break;
        case "seven_day":
          updatedNft.average_price = nft.seven_day_average_price;
          updatedNft.change = nft.seven_day_change;
          updatedNft.sales = nft.seven_day_sales;
          updatedNft.volume = nft.seven_day_volume;
          break;
        default:
          updatedNft.average_price = nft.thirty_day_average_price;
          updatedNft.change = nft.thirty_day_change;
          updatedNft.sales = nft.thirty_day_sales;
          updatedNft.volume = nft.thirty_day_volume;
      }

      updatedCollectionsWithDateRange.push(updatedNft);
    });
    setNfts(updatedCollectionsWithDateRange);
  };

  const nestedTernary = (condition, then, otherwise) => (condition ? then : otherwise);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - nfts.length) : 0;

  useEffect(() => {
    setLoading(true);
    const options = { method: "GET", headers: { Accept: "application/json" } };
    const blueChips = [
      "boredapeyachtclub",
      "fidenza-by-tyler-hobbs",
      "mutant-ape-yacht-club",
      "world-of-women-nft",
      "rtfkt-creators",
      "cool-cats-nft",
      "doodles-official",
      "meebits",
      "jrny-club-official",
      "supducks",
      "the-wanderers",
      "planet-pass",
      "the-doge-pound",
      "cyberkongz",
      "veefriends",
    ];
    let statsToAddToCollection = [
      "market_cap",
      "count",
      "floor_price",
      "num_owners",
      "one_day_average_price",
      "one_day_change",
      "one_day_sales",
      "one_day_volume",
      "seven_day_average_price",
      "seven_day_change",
      "seven_day_sales",
      "seven_day_volume",
      "thirty_day_average_price",
      "thirty_day_change",
      "thirty_day_sales",
      "thirty_day_volume",
      "total_sales",
      "total_supply",
      "total_volume",
    ];
    let collectionStats = [];

    blueChips.forEach((collection) => {
      fetch(`https://api.opensea.io/api/v1/collection/${collection}`, options)
        .then((res) => res.json())
        .then((data) => {
          // remove one, seven, thirty day stats from stats object so table can sort data
          statsToAddToCollection.map((stat) => {
            data.collection[stat] = data.collection.stats[stat];
          });
          // initially set 4 fields for dynamic filters in table (average_price, change, sales, volume)
          data.collection["average_price"] = data.collection.stats.one_day_average_price;
          data.collection["change"] = data.collection.stats.one_day_change;
          data.collection["sales"] = data.collection.stats.one_day_sales;
          data.collection["volume"] = data.collection.stats.one_day_volume;
          // push mutated API call into state
          collectionStats.push(data.collection);

          // set state
          setNfts([...collectionStats]);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleChangeDateRange={handleChangeDateRange}
          salesDateRange={salesDateRange}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={nfts.length}
              salesDateRange={salesDateRange}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 nfts.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(nfts, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Avatar
                          sx={{
                            height: 30,
                            width: 30,
                            ml: 1,
                            margin: 0,
                          }}
                          src={row.image_url}
                        >
                          <UserCircleIcon fontSize="small" />
                        </Avatar>
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        ${new Intl.NumberFormat().format(row.market_cap.toFixed(0))}
                      </TableCell>
                      <TableCell align="right">
                        {row.num_owners} / {row.total_supply}
                        <br />
                        <>{((row.num_owners / row.total_supply) * 100).toFixed(0)}%</>
                      </TableCell>
                      <TableCell align="right">{row.floor_price.toFixed(2)}</TableCell>
                      <TableCell align="right">{row.sales.toFixed(2)}</TableCell>
                      <TableCell align="right">{row.change.toFixed(2)}</TableCell>
                      <TableCell align="right">{row.average_price.toFixed(2)}</TableCell>
                      <TableCell align="right">{row.volume.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={nfts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
