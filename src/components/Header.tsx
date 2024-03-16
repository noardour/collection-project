import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import AuthBar from "./AuthBar";

const Header: FC = () => (
  <Navbar maxWidth="xl" isBordered position="static">
    <NavbarBrand>
      <Link href="/">
        <div className="uppercase font-bold">LOGO</div>
      </Link>
    </NavbarBrand>
    <NavbarContent justify="end">
      <AuthBar />
    </NavbarContent>
  </Navbar>
);

export default Header;
