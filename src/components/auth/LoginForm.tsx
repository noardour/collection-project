"use client";

import { login, LoginState } from "@/lib/auth/authActions";
import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import { useFormState } from "react-dom";

const LoginForm: FC = () => {
  const initialState: LoginState = {};
  const [state, dispatch] = useFormState(login, initialState);

  return (
    <form action={dispatch} className="flex flex-col gap-4 xl:w-[75%]">
      {state?.formErrors?.length ? <div className="text-danger mb-4 font-bold">{state?.formErrors.join(". ") + "."}</div> : undefined}
      <Input
        label="Email"
        type="text"
        name="email"
        isInvalid={!!state?.fieldErrors?.email}
        errorMessage={state?.fieldErrors?.email?.join(". ")?.concat(".")}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        isInvalid={!!state?.fieldErrors?.password}
        errorMessage={state?.fieldErrors?.password?.join(". ")?.concat(".")}
      />
      <Button className="self-start" type="submit" color="primary">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
