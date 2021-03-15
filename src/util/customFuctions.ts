  function generateKey() {
    return Math.random().toString(36).substring(7);
  };

  function formatValue(value: number): string {
    return (value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); 
  }

  export { generateKey, formatValue };