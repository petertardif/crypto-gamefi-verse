import { useEffect, useState } from "react";
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
  TableSortLabel,
  Typography,
} from "@mui/material";
// import { getInitials } from "../../utils/get-initials";

export const NFTListResults = ({ ...rest }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
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
    let collectionStats = [];

    blueChips.forEach((collection) => {
      fetch(`https://api.opensea.io/api/v1/collection/${collection}`, options)
        .then((res) => res.json())
        .then((data) => {
          collectionStats.push(data.collection);
          setNfts([...collectionStats]);
          console.log(data.collection);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    });
  }, []);

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
                <TableCell>
                  {/* <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  > */}
                  Project
                  {/* </TableSortLabel> */}
                </TableCell>
                <TableCell>Supply</TableCell>
                <TableCell>OS Floor</TableCell>
                <TableCell>Avg. Price</TableCell>
                <TableCell># Sales</TableCell>
                <TableCell>USD Volume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nfts.map((nft) => (
                <TableRow hover key={nft.name} selected={selectedNftIds.indexOf(nft) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedNftIds.indexOf(nft) !== -1}
                      onChange={(event) => handleSelectOne(event, nft)}
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
                  <TableCell>{nft.stats.count}</TableCell>
                  <TableCell>{nft.stats.floor_price}</TableCell>
                  <TableCell>{nft.stats.one_day_average_price}</TableCell>
                  <TableCell>{nft.stats.one_day_sales}</TableCell>
                  <TableCell>{nft.stats.one_day_volume}</TableCell>
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

// NFTListResults.propTypes = {
//   nfts: PropTypes.array.isRequired,
// };
