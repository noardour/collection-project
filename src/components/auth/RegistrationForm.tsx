"use client";

import { register } from "@/lib/auth/authActions";
import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import { useFormState } from "react-dom";

const RegistrationForm: FC = () => {
  const [state, dispatch] = useFormState(register, undefined);

  return (
    <form action={dispatch} className="flex flex-col gap-4 xl:w-[75%]">
      <Input label="Name" type="text" name="name" isInvalid={!!state?.errors?.name} errorMessage={state?.errors?.name?.join(" ")} />
      <Input label="Email" type="text" name="email" isInvalid={!!state?.errors?.email} errorMessage={state?.errors?.email?.join(" ")} />
      <Input
        label="Password"
        type="password"
        name="password"
        isInvalid={!!state?.errors?.password}
        errorMessage={state?.errors?.password?.join(" ")}
      />
      <Input
        label="Confirm password"
        type="password"
        name="confirm-password"
        isInvalid={!!state?.errors?.confirmPassword}
        errorMessage={state?.errors?.confirmPassword?.join(" ")}
      />
      <Button className="self-start" type="submit" color="primary">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
