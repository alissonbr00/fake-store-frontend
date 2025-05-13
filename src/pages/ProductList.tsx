import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Pagination,
  Avatar,
  Box,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Drawer,
} from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import api from "../services/api";
import type { Product } from "../types/Product";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/products?limit=10&page=${page}`);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Resposta inesperada:", res.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRowClick = (product: Product) => {
    console.log("Produto selecionado:", product);
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  return (
    <>
      {/* Barra superior com avatar fictício */}
      <AppBar position="static" sx={{ background: "linear-gradient(135deg, #3f51b5, #9c27b0)" }}>
        <Toolbar>
          <Avatar src="/assets/avatar.png" sx={{ mr: 2 }} /> {/* Insira a URL ou um arquivo local */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Produtos</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")}
          >
            {viewMode === "table" ? "Ver Cards" : "Ver Tabela"}
          </Button>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Container principal */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Lista de Produtos</Typography>

        {/* Alterna entre tabela e cards */}
        {viewMode === "table" ? (
          <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Nome</strong></TableCell>
                  <TableCell><strong>Categoria</strong></TableCell>
                  <TableCell><strong>Preço</strong></TableCell>
                  <TableCell><strong>Disponibilidade</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} hover onClick={() => handleRowClick(product)} sx={{ cursor: "pointer" }}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={product.rating?.count > 10 ? "Em Estoque" : "Limitado"}
                        color={product.rating?.count > 10 ? "success" : "warning"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <CardActionArea onClick={() => handleRowClick(product)}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={product.image}
                      alt={product.title}
                      sx={{ objectFit: "contain", p: 1, backgroundColor: "#f9f9f9" }}
                    />
                    <CardContent>
                      <Typography variant="h6" noWrap gutterBottom>
                        {product.title}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="bold">
                        ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Paginação */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination count={5} page={page} onChange={(e, value) => setPage(value)} color="primary" />
        </Box>
      </Container>

      {/* Drawer lateral para exibição de detalhes do produto */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          {selectedProduct ? (
            <>
              <Typography variant="h5">{selectedProduct.title}</Typography>
              <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: "100%", borderRadius: 8 }} />
              <Typography variant="body1" mt={2}>{selectedProduct.description}</Typography>
              <Typography variant="h6" mt={2} color="primary">${selectedProduct.price.toFixed(2)}</Typography>
            </>
          ) : (
            <Typography variant="body1">Nenhum produto selecionado.</Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default ProductList;
