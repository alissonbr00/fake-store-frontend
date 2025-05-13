// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "../services/api";
import type { Product } from "../types/Product";

const ProductDetail = () => {
  // Recupera o parâmetro "id" da URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Estado para armazenar os detalhes do produto e o loading
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ marginTop: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h6">Produto não encontrado.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        Voltar
      </Button>
      <Card sx={{ marginTop: 2 }}>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            ${product.price.toFixed(2)}
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1">{product.description}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;

