import React, { useState } from "react";
import TextInput from "../shared/inputs/TextInput";
import InputError from "../shared/inputs/InputError";
import CustomButton from "../shared/buttons/CustomButton";
import { Link } from "react-router-dom";

const RegisterForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.name) newErrors.name = "O nome é obrigatório.";
    if (!formValues.email) newErrors.email = "O e-mail é obrigatório.";
    if (!formValues.password) newErrors.password = "A senha é obrigatória.";
    if (formValues.password !== formValues.password_confirmation) {
      newErrors.password_confirmation = "As senhas não coincidem.";
    }
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formValues);
      onSubmit(formValues);
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <TextInput
              label="Nome"
              value={formValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            {errors.name && <InputError message={errors.name} />}
          </div>
          <div>
            <TextInput
              label="E-mail"
              value={formValues.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
            {errors.email && <InputError message={errors.email} />}
          </div>
          <div>
            <TextInput
              label="Senha"
              type={showPassword ? "text" : "password"}
              value={formValues.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
            {errors.password && <InputError message={errors.password} />}
          </div>
          <div>
            <TextInput
              label="Confirmar Senha"
              type={showPassword ? "text" : "password"}
              value={formValues.password_confirmation}
              onChange={(e) =>
                handleChange("password_confirmation", e.target.value)
              }
              required
            />
            {errors.password_confirmation && (
              <InputError message={errors.password_confirmation} />
            )}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              Mostrar Senha
            </label>
          </div>

          <div className="flex justify-between items-center">
            <div className="inline-block text-sm text-gray-600">
              Você já tem conta?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </div>
            <CustomButton label="Register" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
