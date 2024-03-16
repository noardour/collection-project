"use client";

import { RegistrationState, register } from "@/actions/userActions";
import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import { useFormState } from "react-dom";

const RegistrationForm: FC = () => {
  const initialState: RegistrationState = {};
  const [state, dispatch] = useFormState(register, initialState);

  return (
    <form action={dispatch} className="flex flex-col gap-4 xl:w-[75%]">
      <Input label="Name" type="text" name="name" isInvalid={!!state.errors?.name} errorMessage={state.errors?.name} />
      <Input label="Email" type="text" name="email" isInvalid={!!state.errors?.email} errorMessage={state.errors?.email} />
      <Input label="Password" type="password" name="password" isInvalid={!!state.errors?.password} errorMessage={state.errors?.password} />
      <Input
        label="Confirm password"
        type="password"
        name="confirm-password"
        isInvalid={!!state.errors?.confirmPassword}
        errorMessage={state.errors?.confirmPassword}
      />
      <Button className="self-start" type="submit" color="primary">
        Register
      </Button>
      {state?.msg && <div>{state.msg}</div>}
    </form>
  );
};

export default RegistrationForm;
