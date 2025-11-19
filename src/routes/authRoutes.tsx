import AuthPage from "@pages/AuthPage";
import LoginForm from "@components/Auth/LoginForm";
import RegisterForm from "@components/Auth/RegisterForm";

export const authRoutes = [
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
    ],
  },
];
