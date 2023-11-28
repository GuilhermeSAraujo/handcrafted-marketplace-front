import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { useState } from 'react';
import Products from './components/Products';
import { Pages } from './enum/pageEnum';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  const [page, setPage] = useState<Pages>(Pages.PRODUCTS);

  return (
    <QueryClientProvider client={queryClient}>
    <Grid container p={2}>
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
      <Grid item xs={12} display='flex' justifyContent='space-evenly' paddingY={5}>
        <Button variant='outlined' size='large' 
        onClick={() => setPage(Pages.PRODUCTS)}
        disabled={page === Pages.PRODUCTS}
        sx={{
          color: 'white',
          backgroundColor: "rgba(211, 211, 211, 0.5)",
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
            Produtos
        </Button>
        <Button variant='outlined' size='large' 
        onClick={() => setPage(Pages.PAYMENTS)}
        disabled={page === Pages.PAYMENTS}
        sx={{
          color: 'white',
          backgroundColor: "rgba(211, 211, 211, 0.5)",
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
            Pagamentos
        </Button>
      </Grid>
      <Grid item xs={12}>
        {page === Pages.PRODUCTS ? (
          <Products />
          ) : (
            <h1 style={{color:"white"}}>Pagamentos</h1>
            )}
      </Grid>
    </Grid>
</QueryClientProvider>
  );
};

export default App;
