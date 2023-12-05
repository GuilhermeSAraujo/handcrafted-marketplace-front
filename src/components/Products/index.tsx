import { CircularProgress, Grid, Typography } from "@mui/material";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import ModalBuyProduct from "./components/ModalBuyProcut";
import { ProductData } from "../../models/product";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState<ProductData | null>(null);
  const { data: items, isLoading } = useProducts();

  return (
    <>
      <ModalBuyProduct
        openModal={openModal}
        setOpenModal={setOpenModal}
        productData={product}
        setProductData={setProduct}
      />
      <Grid
        container
        p={2}
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow:
            "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06)",
        }}
      >
        <Grid item xs={12} pb={2}>
          <Typography variant="h3" color="white">
            Produtos disponíveis
          </Typography>
        </Grid>
        {isLoading && (
          <Grid item xs={12} display="flex" justifyContent="center">
            <CircularProgress size={60} sx={{ color: "white" }} />
          </Grid>
        )}
        <Grid
          container
          item
          xs={12}
          display="flex"
          gap={2}
          justifyContent="space-evenly"
        >
          {items &&
            items?.map((item) => (
              <Grid
                container
                item
                xs={5}
                key={item.product.id}
                p={2}
                sx={{
                  display: "flex",
                  color: "white",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  border: "1px solid gray",
                  borderRadius: "15px",
                  textAlign: "center",
                  ":hover": { cursor: "pointer" },
                  backgroundImage: 'linear-gradient(to right top, #569f73, #49a36b, #3aa762, #29ab57, #0bae4b)'
                }}
                onClick={() => {
                  setOpenModal(true);
                  setProduct(item);
                }}
              >
                <Grid item xs={6}>
                  <Typography
                    variant="h6"
                    color="white"
                    sx={{ fontWeight: "bold" }}
                  >
                    Produto
                  </Typography>
                  <Typography
                    variant="h6"
                    color="white"
                    sx={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    {item.product.name}
                  </Typography>
                  <Typography variant="h6" color="white">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.product.price)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h6"
                    color="white"
                    sx={{ fontWeight: "bold" }}
                  >
                    Loja
                  </Typography>
                  <Typography
                    variant="h6"
                    color="white"
                    sx={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    {item.store.name}
                  </Typography>
                  <Typography variant="h6" color="white">
                    {item.store.cnpj}
                  </Typography>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Products;
