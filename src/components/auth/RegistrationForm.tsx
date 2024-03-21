"use client";

import { register } from "@/lib/auth/authActions";
import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import { useFormState } from "react-dom";

const RegistrationForm: FC = () => {
  const [state, dispatch] = useFormState(register, undefined);

  return (
    <form action={dispatch} className="flex flex-col gap-4 xl:w-[75%]">
      {state?.formErrors?.length ? <div className="text-danger mb-4 font-bold">{state?.formErrors.join(". ") + "."}</div> : undefined}
      <Input
        label="Name"
        type="text"
        name="name"
        isInvalid={!!state?.fieldErrors?.name}
        errorMessage={state?.fieldErrors?.name?.join(". ").concat(".")}
      />
      <Input
        label="Email"
        type="text"
        name="email"
        isInvalid={!!state?.fieldErrors?.email}
        errorMessage={state?.fieldErrors?.email?.join(". ").concat(".")}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        isInvalid={!!state?.fieldErrors?.password}
        errorMessage={state?.fieldErrors?.password?.join(". ").concat(".")}
      />
      <Input
        label="Confirm password"
        type="password"
        name="confirm-password"
        isInvalid={!!state?.fieldErrors?.confirmPassword}
        errorMessage={state?.fieldErrors?.confirmPassword?.join(". ").concat(".")}
      />
      <Button className="self-start" type="submit" color="primary">
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
