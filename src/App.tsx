import { Avatar, Grid, Typography } from "@mui/material";
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

const App = () => {
  return (
    <Grid container>
      <Grid item xs={12} display='flex' alignItems='center' justifyContent='center' gap={2}>
        <Avatar
          sx={{ width: 75, height: 75, bgcolor: "#45a97b" }}
        >
          <StorefrontTwoToneIcon  sx={{ width: 60, height: 60 }} />
        </Avatar>
        <Typography variant="h1" color="white">
          Handcrafted Marketplace
        </Typography>
      </Grid>
      <Grid item xs={12} display='flex' justifyContent='space-evenly'>
      <Typography variant="h5" color="white">
          Produtos
        </Typography>
      <Typography variant="h5" color="white">
          Meus produtos
        </Typography>
      </Grid>
    </Grid>
  );
};

export default App;
