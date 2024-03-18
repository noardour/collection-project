"use client";

import { LoginState, login } from "@/actions/userActions";
import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const initialState: LoginState = {};
  const [state, dispatch] = useFormState(login, initialState);

  return (
    <form action={dispatch} className="flex flex-col gap-4 xl:w-[75%]">
      <Input label="Email" type="text" name="email" isInvalid={!!state?.errors?.email} errorMessage={state?.errors?.email} />
      <Input label="Password" type="password" name="password" isInvalid={!!state?.errors?.password} errorMessage={state?.errors?.password} />
      <Button className="self-start" type="submit" color="primary">
        Log in
      </Button>
      {state?.msg && <div>{state.msg}</div>}
    </form>
  );
};

export default LoginForm;
