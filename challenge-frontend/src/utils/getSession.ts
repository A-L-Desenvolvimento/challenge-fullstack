// eslint-disable-next-line import/no-cycle
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth/next'
import { getSession as getClientSession } from 'next-auth/react'

export const getSession = async () => {
    const isClient = typeof window !== 'undefined'

    const session = isClient
        ? await getClientSession()
        : await getServerSession(authOptions)

    return session
}
