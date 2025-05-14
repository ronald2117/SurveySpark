import { SignupForm } from "@/components/auth/signup-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - SurveySpark',
  description: 'Create your SurveySpark account.',
};

export default function SignupPage() {
  return <SignupForm />;
}
