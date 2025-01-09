import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Formato de e-mail inválido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export const registerValidationSchema = Yup.object({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().email('Formato de e-mail inválido').required('O e-mail é obrigatório'),
  password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem coincidir')
    .required('A confirmação da senha é obrigatória'),
});
