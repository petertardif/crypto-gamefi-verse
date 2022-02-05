import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
// import { getInitials } from "../../utils/get-initials";

export const NFTListResults = ({ nfts, ...rest }) => {
  const [selectedNftIds, setSelectedNftIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedNftIds;

    if (event.target.checked) {
      newSelectedNftIds = nfts.map((nft) => nft.id);
    } else {
      newSelectedNftIds = [];
    }

    setSelectedNftIds(newSelectedNftIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedNftIds.indexOf(id);
    let newSelectedNftIds = [];

    if (selectedIndex === -1) {
      newSelectedNftIds = newSelectedNftIds.concat(selectedNftIds, id);
    } else if (selectedIndex === 0) {
      newSelectedNftIds = newSelectedNftIds.concat(selectedNftIds.slice(1));
    } else if (selectedIndex === selectedNftIds.length - 1) {
      newSelectedNftIds = newSelectedNftIds.concat(selectedNftIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedNftIds = newSelectedNftIds.concat(
        selectedNftIds.slice(0, selectedIndex),
        selectedNftIds.slice(selectedIndex + 1)
      );
    }

    setSelectedNftIds(newSelectedNftIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedNftIds.length === nfts.length}
                    color="primary"
                    indeterminate={selectedNftIds.length > 0 && selectedNftIds.length < nfts.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Supply</TableCell>
                <TableCell>OS Floor</TableCell>
                <TableCell>Avg. Price</TableCell>
                <TableCell># Sales</TableCell>
                <TableCell>USD Volume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nfts.slice(0, limit).map((nft) => (
                <TableRow hover key={nft.id} selected={selectedNftIds.indexOf(nft.id) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedNftIds.indexOf(nft.id) !== -1}
                      onChange={(event) => handleSelectOne(event, nft.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {/* <Avatar src={nft.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(nft.name)}
                      </Avatar> */}
                      <Typography color="textPrimary" variant="body1">
                        {nft.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{nft.supply}</TableCell>
                  <TableCell>{nft.osFloor}</TableCell>
                  <TableCell>{nft.avgPrice}</TableCell>
                  <TableCell>{nft.numSales}</TableCell>
                  <TableCell>{nft.volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={nfts.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Card>
  );
};

NFTListResults.propTypes = {
  nfts: PropTypes.array.isRequired,
};
