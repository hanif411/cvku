import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-2 px-2 md:px-20 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-primary">
        <Link href="/">MyCV</Link>
      </h1>
      <Button variant="default">
        <Link href="/templates">Create Resume</Link>
      </Button>
    </nav>
  );
}

export default Navbar;
