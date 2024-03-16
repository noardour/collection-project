import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login Page",
};

export default function Page() {
  return (
    <div className="relative">
      <h1 className="text-3xl font-bold mb-8">Log in</h1>

      <LoginForm />
    </div>
  );
}
