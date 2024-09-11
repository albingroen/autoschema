import Navbar from "@/components/navbar";
import Stack from "@/components/ui/stack";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Stack
      spacing="none"
      direction="vertical"
      className="max-w-screen-md mx-auto"
    >
      <Navbar />
      {props.children}
    </Stack>
  );
}
