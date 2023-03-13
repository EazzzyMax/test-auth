import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { LoginApiResponse } from "../types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParamList";
import { AuthContext } from "../AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken, name, setName } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    setIsLoading(true);

    const options = {
      method: "POST",
      url: "http://restapi.adequateshop.com/api/authaccount/login",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ email, password }),
    };

    await axios(options)
      .then((response: { data: LoginApiResponse }) => {
        setToken(response.data.data.Token);
        setName(response.data.data.Name);
        navigation.navigate("Google");
      })
      .catch((error) => {
        setError("Неправильный логин или пароль");
      });
    setIsLoading(false);
  };

  const handleLogout = () => {
    setToken(null);
    setName(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name || "Вход"}</Text>
      {!token && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Почта"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!token ? (
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={styles.buttonText}>Загрузка...</Text>
          ) : (
            <Text style={styles.buttonText}>Войти</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Выйти</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 25,
    width: "80%",
    height: 40,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#C03050",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
