import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { ProductData } from "../../../models/product";
import { queryClient } from "../../../App";

interface ModalBuyProductProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  productData: ProductData | null;
  setProductData: (productData: ProductData) => void;
}

interface IBuyProduct {
  name: string;
  cpf: string;
  accountNumber: string;
  agency: string;
}

const buyProductSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  cpf: Yup.string()
    .required("Campo obrigatório")
    .max(14, "CPF informado é inválido")
    .min(14, "CPF informado é inválido"),
  accountNumber: Yup.string()
    .required("Campo obrigatório")
    .min(6, "A conta deve ter 6 dígitos")
    .max(6, "A conta deve ter 6 dígitos"),
  agency: Yup.string()
    .required("Campo obrigatório")
    .min(4, "Número da agência inválido")
    .max(4, "Número da agência inválido"),
});

const ModalBuyProduct = ({
  openModal,
  setOpenModal,
  productData,
}: ModalBuyProductProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isValid, errors },
  } = useForm<IBuyProduct>({
    mode: "onBlur",
    resolver: yupResolver(buyProductSchema),
    defaultValues: { cpf: "" },
  });

  const submitForm = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const body = {
        cpfUsuario: data.cpf.replace(/\D/g, ""),
        nome: data.name,
        idProduto: productData?.product.id ?? 0,
        dadosPagamento: {
          contaCorrente: data.accountNumber,
          agencia: data.agency,
        },
      };
      await axios.post(
        "https://handcrafted-marketplace.azurewebsites.net/payment",
        body
      );
        queryClient.invalidateQueries("payments");
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
      }}
    >
      <Box sx={modalStyle}>
        {isLoading ? (
          <Box textAlign="center">
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container>
            {productData != null && (
              <>
                <Grid item xs={5} textAlign="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {productData?.product.name}
                  </Typography>
                  <Typography variant="h6">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(productData.product.price)}
                  </Typography>
                </Grid>
                <Grid item xs={5} textAlign="center">
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {productData?.store.name}
                  </Typography>
                  <Typography variant="h6">
                    {productData?.store.cnpj}
                  </Typography>
                </Grid>
                <form onSubmit={submitForm} style={{ width: "100%" }}>
                  <Grid item xs={12} pt={2}>
                    <TextField
                      fullWidth
                      label="Nome completo"
                      variant="outlined"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                      {...register("name")}
                      sx={{ paddingBottom: 2 }}
                    />
                    <Controller
                      name="cpf"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          onChange={(e) => onChange(cpfMask(e.target.value))}
                          value={value}
                          label="CPF"
                          fullWidth
                          required
                          error={Boolean(errors.cpf)}
                          helperText={errors.cpf?.message}
                          sx={{ paddingBottom: 2 }}
                        />
                      )}
                    />
                    <TextField
                      fullWidth
                      label="Número da conta"
                      variant="outlined"
                      error={Boolean(errors.accountNumber)}
                      helperText={errors.accountNumber?.message}
                      {...register("accountNumber")}
                      sx={{ paddingBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Número da agência"
                      variant="outlined"
                      error={Boolean(errors.agency)}
                      helperText={errors.agency?.message}
                      {...register("agency")}
                      sx={{ paddingBottom: 2 }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      disabled={!isValid}
                    >
                      Comprar
                    </Button>
                  </Grid>
                </form>
              </>
            )}
          </Grid>
        )}
      </Box>
    </Modal>
  );
};

const cpfMask = (value: string) =>
  value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 2.5,
  borderRadius: "10px",
  boxShadow: "10px 17px 20px 8px rgba(0,0,0,0.25)",
};

export default ModalBuyProduct;
