import { CircularProgress, Grid, Typography } from "@mui/material";
import { useProducts } from "../../hooks/useProducts";

const Products = () => {
	const { data: items, isLoading } = useProducts();

	return (
		<Grid
			container
			p={2}
			sx={{
				border: '1px solid rgba(0, 0, 0, 0.1)', // borda fina com cor preta e 10% de transparência
				boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06)', // sombra moderna
			}}
		>
			<Grid item xs={12}>
				<Typography variant="h3" color="white">Produtos disponíveis</Typography>
			</Grid>
			{isLoading && (
				<Grid item xs={12} display='flex' justifyContent='center'>
					<CircularProgress size={60} sx={{color: 'white'}} />
				</Grid>
			)}
			{items && items?.map((item) => (
				<Grid item xs={3} key={item.product.id}>
					<Typography variant="h6" color="white">{item.product.name}</Typography>
					<Typography variant="h6" color="white">{item.product.price}</Typography>
				</Grid>
			))}
		</Grid>
	)
}

export default Products;