import CompleteSignupForm from "@/components/complete-signup-form";

export default async function Page({ params }: { params: { token: string } }) {
  return <CompleteSignupForm token={params.token} />;
}
