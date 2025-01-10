'use client'

import React, {useState} from "react";
import {Input} from "@nextui-org/input";
import {Button, Divider} from "@nextui-org/react";
import { signIn } from '@/utils/signIn'
import { useRouter } from 'next/navigation'
import MyLogo from "@/assets/icons/MyLogo";
import {Spinner} from "@nextui-org/spinner";

const Login = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false)
    const [invalidCredentials, setInvalidCredentials] = useState(false)


    const [email, setEmail] = useState('test@example.com')
    const [password, setPassword] = useState('password')



    const onSubmit = async () => {
        try {
            setLoading(true)
            setInvalidCredentials(false)
            const response = await signIn({
                email,
                password
            })

            if (response?.status === 401) throw new Error('Invalid credentials')

            router.push('/produtos')
            window.location.href = '/produtos'
        } catch {
            setInvalidCredentials(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={"grid h-svh md:grid-cols-2 flex-col w-full"}>
            <div
                className={"flex items-center justify-center bg-gradient-to-r from-red-500 via-orange-600 to-gray-500-500"}>
                <div className={"flex items-center justify-center border-red-50 border-2 p-8 rounded-full w-48 h-48 "}>
                    <MyLogo key={"logo"} size={96} color={"white"} />
                </div>
            </div>
            <div className={"flex flex-col px-10 justify-center items-center"}>
                <div className={"flex flex-col space-y-2 my-4 w-full"}>
                    <h1 className={"text-2xl text-gray-600 font-bold"}>Entre</h1>
                    <h2 className={"text-sm text-gray-300"}>Faça o login para ter acesso a todas as funcionalidades</h2>
                </div>
                <div className={"container"}>
                    {
                        invalidCredentials && <p className={"self-center text-red-500 font-semibold"}>Credenciais inválidas</p>
                    }
                    <form className={"flex flex-col items-center justify-center w-full space-y-4"}>

                        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <Input type="email"
                                   value={email}
                                   description={!email ? "* Campo obrigatório" : ""}
                                   label="Email"
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <Input type="password"
                                   value={password}
                                   description={!password ? "* Campo obrigatório" : ""}
                                   label="Senha"
                                   onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button className={"bg-orange-600 text-white w-full  font-bold"} onClick={onSubmit}>
                            Entrar
                        </Button>
                        <p className={"text-gray-500 font-semibold"}>Esqueceu sua senha? <a href={"#"}
                                                                                            className={"underline text-gray-600 font-bold"}>Clique
                            aqui</a></p>

                        <Divider/>
                    </form>
                    <div className={"flex items-center justify-center w-full my-2"}>
                        {
                            loading && <Spinner/>
                        }
                    </div>
                </div>

            </div>

        </div>

    );
}

export default Login;