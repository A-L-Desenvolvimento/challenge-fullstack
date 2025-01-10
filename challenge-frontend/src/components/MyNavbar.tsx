'use client'
import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import LogoutButton from "@/components/LogoutButton";
import MyLogo from "@/assets/icons/MyLogo";

interface User {
    name?: string | null | undefined;
    email?: string | null | undefined;
}

interface MyNavbarProps {
    user?: User | User[];
}

export default function MyNavbar({ user }: MyNavbarProps) {
    return (
        <Navbar isBordered>
            <NavbarBrand>
                <MyLogo key={"logo"} size={24} />
                <p className="font-bold text-inherit">MMJ</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/produtos">
                        Produtos
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <p className={"font-semibold"}>{user ? user[0]?.name : ""}</p>
                </NavbarItem>
                {
                    user ? (
                        <NavbarItem>
                            <LogoutButton />
                        </NavbarItem>
                    ) : <NavbarItem>
                        <Button as={Link} color="primary" href="/login" variant="flat">
                            Entrar
                        </Button>
                    </NavbarItem>
                }

            </NavbarContent>
        </Navbar>
    );
}