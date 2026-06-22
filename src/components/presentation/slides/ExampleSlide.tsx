import { SlideShell } from "../SlideShell";
import { CodeBlock } from "../CodeBlock";


const code = `import { useForm } from "react-hook-form";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // UseForm -> Inicializa o formulario

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          {...register("name", {
            required: "Campo obrigatório",
          })}
        />
        {errors.name && <p>{errors.name?.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Campo obrigatório",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && <p>{errors.email?.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Campo obrigatório",
            minLength: {
              value: 8,
              message: "Mínimo de 8 caracteres",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">
          Cadastrar
      </button>
    </form>
  );
}`;

export function ExampleSlide() {
  return (
    <SlideShell
      kicker="Seção 07"
      title={
        <>
          Exemplo <span className="text-gradient">prático</span>
        </>
      }
    >
      <div className="grid h-full gap-6 ">
      

        <CodeBlock code={code} language="jsx" className="text-xs" />
      </div>
    </SlideShell>
  );
}
