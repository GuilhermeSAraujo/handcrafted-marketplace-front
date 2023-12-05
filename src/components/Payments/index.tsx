import { CircularProgress, Grid, Typography } from "@mui/material";
import { usePayments } from "../../hooks/usePayments";

const Payments = () => {
  const { data: items, isLoading } = usePayments();
  console.log("itemsaaa", items);

  return (
    <Grid container display="flex" justifyContent="space-around" gap={1}>
      <Grid item xs={12}>
        <Typography variant="h2" color="white">
          Pagamentos
        </Typography>
      </Grid>
      {isLoading && (
          <Grid item xs={12} display="flex" justifyContent="center">
          <CircularProgress size={60} sx={{ color: "white" }} />
        </Grid>
      )}
      {items &&
        items.map((item) => (
          <Grid
          mb={2}
            item
            xs={3.5}
            key={item.pagamento.id}
            sx={{
              color: "white",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              border: "1px solid gray",
              borderRadius: "15px",
              textAlign: "center",
              backgroundImage: 'linear-gradient(to right top, #569f73, #49a36b, #3aa762, #29ab57, #0bae4b)'
            }}
          >
            <Typography variant="h6" color="white">
              ID pagamento: {item.pagamento.id}
            </Typography>
            <Typography variant="h6" color="white">
              Conta Corrente: {item.pagamento.contaCorrente}
            </Typography>
            <Typography variant="h6" color="white">
              Agência: {item.pagamento.agencia}
            </Typography>
            <Typography variant="h6" color="white">
              Status: <span style={{ fontWeight: 'bold' }}>{item.pagamento.status}</span>
            </Typography>
            <Typography variant="h6" color="white">
              Produto: {item.produto.nome}
            </Typography>
            <Typography variant="h6" color="white">
              Preço:{" "}
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.produto.preco)}
            </Typography>
            <Typography variant="h6" color="white">
              Loja: {item.loja.nome}
            </Typography>
            <Typography variant="h6" color="white">
              CNPJ: {item.loja.cnpj}
            </Typography>
            <Typography variant="h6" color="white">
              Usuário: {item.usuario.nome}
            </Typography>
            <Typography variant="h6" color="white">
              CPF: {item.usuario.cpf}
            </Typography>
          </Grid>
        ))}
    </Grid>
  );
};

export default Payments;
