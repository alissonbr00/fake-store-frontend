// src/components/ErrorBoundary.tsx
import React from "react";
import { Typography, Button, Container } from "@mui/material";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container sx={{ marginTop: 4 }}>
          <Typography variant="h4" color="error" gutterBottom>
            Ocorreu um erro inesperado!
          </Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
