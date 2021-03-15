const minLength = (min: number) => {
    return (input: string) => input.length < min 
    ? `Deve ter no mínimo ${min} caracteres.` 
    : null;
  };
  
  const isEmail = () => {
    const re = /\S+@\S+\.\S+/;
    return (input: string) => re.test(input)
    ? null
    : "Deve ser um e-mail válido.";
  }
  
  export { minLength, isEmail };