import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import AccBar from "./AccBar";

const Header: FC = () => (
  <Navbar maxWidth="xl" isBordered position="static">
    <NavbarBrand>
      <Link href="/">
        <div className="uppercase font-bold">LOGO</div>
      </Link>
    </NavbarBrand>
    <NavbarContent justify="end">
      <AccBar />
    </NavbarContent>
  </Navbar>
);

export default Header;
