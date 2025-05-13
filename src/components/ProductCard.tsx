import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ 
      borderRadius: 2, 
      boxShadow: 3, 
      height: 320, // 🔹 Define altura fixa para uniformidade
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-between",
    }}>
      <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
        <CardMedia
          component="img"
          height="160" // 🔹 Todas as imagens terão a mesma altura
          image={product.image}
          alt={product.title}
          sx={{
            objectFit: "contain", 
            p: 1,
            backgroundColor: "#f9f9f9",
            display: "block",
            margin: "0 auto", // 🔹 Centraliza a imagem
          }}
        />
        <CardContent sx={{ textAlign: "center", paddingBottom: 2 }}>  
          <Typography variant="h6" noWrap>
            {product.title}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
