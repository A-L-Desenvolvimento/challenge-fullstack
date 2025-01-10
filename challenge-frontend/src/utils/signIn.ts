import { signIn as nextAuthSignIn } from 'next-auth/react'

type SignInType = {
    email: string
    password: string
}

export const signIn = (data: SignInType) => {
    console.log(data)
    return nextAuthSignIn('credentials', { ...data, redirect: false })
}
