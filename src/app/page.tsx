import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Prisma Schema Builder</h1>
      <Link href="/app/login">Log in</Link>
      <Link href="/app/signup">Sign up</Link>
    </div>
  );
}
