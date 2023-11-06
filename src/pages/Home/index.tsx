export function Home() {
  /*   const [variant, setVariant] = useState<"primary" | "secondary">("secondary");

  const changeVariant = () => {
    setVariant((variant) => (variant === "primary" ? "secondary" : "primary"));
  }; */

  return (
    <div className="w-full h-full flex items-center justify-center gap-4">
      <div className="text-4x1 font-bold text-zinc-900 text-center">
        <h1>Bem Vindo ao Portal de Massas</h1>
      </div>
    </div>
  );
}

/*    <Button>Variant 1</Button>

      <Button rounded="full" variant={variant} onClick={changeVariant}>
        Variant 2
      </Button> */
