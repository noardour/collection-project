import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => (
  <Navbar maxWidth="xl" isBordered position="static">
    <NavbarBrand>
      <Link href="/">
        <div className="uppercase font-bold">LOGO</div>
      </Link>
    </NavbarBrand>
    <NavbarContent justify="end">
      <Button variant="light">Log in</Button>
      <Button variant="light">Register</Button>
    </NavbarContent>
  </Navbar>
);

export default Header;
