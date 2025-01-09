// eslint-disable-next-line import/no-cycle
import { api } from '@/services/api'

export type DataSignInType = {
    username: string
    password: string
}

// type DataSignUpType = {
//     name: string
//     email: string
//     password: string
//     phone: string
//     terms_id: number
//     data_processing_policy_id: number
// }
//
// type DataConfirmMailCodeType = {
//     email: string
//     code: `${number}`
// }
//
// type DataResendMailCodeType = {
//     email: string
// }
//
// type DataSendResetPasswordCodeType = {
//     email: string
// }
//
// type DataVerifyResetPasswordCodeType = {
//     email: string
//     code: number | `${number}`
// }
//
// type DataResetPasswordType = {
//     email: string
//     password: string
// }
//
// type DataUpdateUser = {
//     name: string
//     last_name: string
//     phone: string
//     password: string
//     password_confirmation: string
// }
//
// type DataUpdatePhoto = {
//     image: File | Blob
// }

export const authService = {
    signIn: async (data: DataSignInType) => {
        const res = await api.post('/auth', data);
        return res;
    },
    // signUp: async (data: DataSignUpType) => {
    //     return api({
    //         method: 'POST',
    //         url: '/register',
    //         data,
    //     })
    // },
    // confirmMailCode: async (data: DataConfirmMailCodeType) => {
    //     return api({
    //         method: 'POST',
    //         url: '/verify',
    //         data,
    //     })
    // },
    // resendMailCode: async (data: DataResendMailCodeType) => {
    //     return api({
    //         method: 'POST',
    //         url: '/user/send-new-code-verify-email',
    //         data,
    //     })
    // },
    // sendResetPasswordCode: async (data: DataSendResetPasswordCodeType) => {
    //     return api({
    //         method: 'POST',
    //         url: '/reset-password/send-code',
    //         data,
    //     })
    // },
    // verifyResetPasswordCode: async (data: DataVerifyResetPasswordCodeType) => {
    //     return api({
    //         method: 'POST',
    //         url: '/reset-password/verify-code',
    //         data,
    //     })
    // },
    // resetPassword: async (data: DataResetPasswordType) => {
    //     return api({
    //         method: 'POST',
    //         url: '/reset-password/new-password',
    //         data,
    //     })
    // },
    // getUserData: async () => {
    //     return api<{ data: UserType }>({
    //         method: 'GET',
    //         url: '/user/me',
    //     })
    // },
}
