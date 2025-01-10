'use client'
import { signOut } from 'next-auth/react'
import {Button, Link} from "@nextui-org/react";

const LogoutButton = () => {

    return (
        <Button as={Link} color="primary" onClick={() => signOut()} variant="flat">
            Sair
        </Button>
    );
}

export default LogoutButton;