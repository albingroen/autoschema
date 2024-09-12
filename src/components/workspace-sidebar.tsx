"use client";

import { BlocksIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Stack from "./ui/stack";
import { TypographyP } from "./ui/typography";
import Link from "next/link";

export default function WorkspaceSidebar(props: { workspaceId: string }) {
  const pathname = usePathname();

  const pages = [
    {
      label: "Schemas",
      icon: BlocksIcon,
      href: `/app/${props.workspaceId}/schemas`,
    },
    {
      label: "Members",
      icon: UsersIcon,
      href: `/app/${props.workspaceId}/members`,
    },
    {
      label: "Settings",
      icon: SettingsIcon,
      href: `/app/${props.workspaceId}/settings`,
    },
  ];

  console.log(pathname);

  return (
    <ul className="flex-1 max-w-36 flex flex-col gap-3">
      {pages.map((page) => (
        <li
          key={page.href}
          className="group"
          data-active={page.href === pathname}
        >
          <Link href={page.href}>
            <Stack align="center">
              <page.icon
                size={20}
                className="stroke-muted-foreground group-hover:stroke-foreground group-data-[active=true]:stroke-foreground transition"
              />

              <TypographyP className="text-muted-foreground group-hover:text-foreground group-data-[active=true]:text-foreground group-data-[active=true]:font-medium transition">
                {page.label}
              </TypographyP>
            </Stack>
          </Link>
        </li>
      ))}
    </ul>
  );
}
