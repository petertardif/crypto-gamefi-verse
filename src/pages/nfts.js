import Head from "next/head";
import { Box, Container } from "@mui/material";
import { NFTListResults } from "../components/nft/nft-list-results";
import { NFTListToolbar } from "../components/nft/nft-list-toolbar";
import NftBlueChipList from "../components/nft/nft-list-bluechips";
import { DashboardLayout } from "../components/dashboard-layout";
// import { nfts } from "../__mocks__/nfts";

const NFTs = () => (
  <>
    <Head>
      <title>NFTs | CryptoGameFiVerse</title>
    </Head>
    {/* <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <NFTListToolbar />
        <Box sx={{ mt: 3 }}>
          <NFTListResults />
        </Box>
      </Container>
    </Box> */}
    <Box>
      <Container>
        <NftBlueChipList />
      </Container>
    </Box>
  </>
);
NFTs.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NFTs;
