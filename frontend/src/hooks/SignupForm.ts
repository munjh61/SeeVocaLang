import { useState } from "react";
import { ID_REGEX, PASSWORD_REGEX } from "../types/Regex.ts";

const idRegex = ID_REGEX;
const pwRegex = PASSWORD_REGEX;

export const useSignupForm = () => {
  const [form, setForm] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    name: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      id: "",
      password: "",
      passwordCheck: "",
      nickname: "",
    });
    setValidation({
      id: false,
      password: false,
      passwordMatch: false,
      nickname: false,
    });
  };

  const [validation, setValidation] = useState({
    id: false,
    password: false,
    passwordMatch: false,
    nickname: false,
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));

    if (field === "id") {
      setValidation(prev => ({ ...prev, id: idRegex.test(value) }));
    }

    if (field === "password") {
      setValidation(prev => ({
        ...prev,
        password: pwRegex.test(value),
        passwordMatch: value === form.passwordCheck,
      }));
    }

    if (field === "passwordCheck") {
      setValidation(prev => ({
        ...prev,
        passwordMatch: value === form.password,
      }));
    }
  };

  return {
    form,
    validation,
    handleChange,
    setValidation,
    resetForm,
  };
};
