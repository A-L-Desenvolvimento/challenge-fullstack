// eslint-disable-next-line import/no-cycle
import { getSession } from '@/utils/getSession'
import {CookieValueTypes, getCookie} from 'cookies-next'
import axios from 'axios'

export const api = axios.create({
    baseURL: "http://127.0.0.1/api",
    validateStatus(status) {
        return status <= 299
    },
})

api.defaults.headers.common['ngrok-skip-browser-warning'] = '1'
api.defaults.headers.common['Accept'] = 'application/json'
api.defaults.headers.common['x-app'] = 'web'

api.interceptors.request.use(
    async (config) => {
        let accessToken: string | Promise<CookieValueTypes> | undefined

        const isClient = typeof window !== 'undefined'

        const session = await getSession();

        if (isClient) {
            accessToken = getCookie('@accessToken') || session?.access_token
        } else {
            const session = await getSession()
            accessToken = session?.access_token
        }

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error),
)