import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@/mocks/@react-native-async-storage/async-storage";
import LoginScreen from "@/screens/login";

// Mock de expo-router
const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(),
    navigate: jest.fn(),
    setParams: jest.fn(),
    reload: jest.fn(),
  }),
}));

const mockLogin = jest.fn();
jest.mock("../context/authContext", () => ({
  useAuth: () => ({
    user: null,
    token: null,
    login: mockLogin,
    logout: jest.fn(),
  }),
}));

jest.mock("../auth/auth", () => ({
  authLogin: jest.fn(() =>
    Promise.resolve({ token: "fakeToken", user: { name: "fakeUser" } })
  ),
}));

describe("LoginScreen", () => {
  it("Renders correctly", () => {
    const { getByTestId, getByPlaceholderText } = render(<LoginScreen />);
    expect(getByTestId("sign-in-text")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
  });

  it("Should call login and navigate on successful login", async () => {
    const { getByPlaceholderText, getByTestId } = render(<LoginScreen />);

    // Simular entrada de datos
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");

    // Simular clic en el botón de inicio de sesión
    fireEvent.press(getByTestId("sign-in-button"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("fakeToken", "fakeUser");
    });

    expect(mockPush).toHaveBeenCalledWith("./home");
  });
});
