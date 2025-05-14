import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - SurveySpark',
  description: 'Log in to your SurveySpark account.',
};

export default function LoginPage() {
  return <LoginForm />;
}
