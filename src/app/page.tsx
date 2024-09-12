import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Atoschema</h1>
      <Link href="/login">Sign in</Link>
      <Link href="/signup">Sign up</Link>
    </div>
  );
}
