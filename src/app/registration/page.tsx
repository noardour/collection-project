import RegistrationForm from "@/components/auth/RegistrationForm";

export const metadata = {
  title: "Login Page",
};

export default function Page() {
  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-8">Registration</h1>

      <RegistrationForm />
    </div>
  );
}
