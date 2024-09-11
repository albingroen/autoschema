"use client";

import { logout } from "@/actions/auth";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { startTransition } from "react";

export default function LogoutDropdownItem() {
  function handleLogOut() {
    startTransition(() => {
      logout();
    });
  }

  return <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>;
}
