import { Grid, Typography } from "@mui/material";

const App = () => {
  return (
    <Grid container>
      <Grid item xs={12} textAlign='center'>
        <Typography variant="h1" color="white">
          Handcrafted Marketplace
        </Typography>
      </Grid>
    </Grid>
  );
};

export default App;
