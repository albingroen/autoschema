import Navbar from "@/components/navbar";
import Stack from "@/components/ui/stack";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Stack
      spacing="none"
      direction="vertical"
      className="max-w-screen-xl mx-auto px-6"
    >
      <Navbar />
      {props.children}
    </Stack>
  );
}
