import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome back.</Text>
      </View>

      <View style={styles.auth}>
        <View style={styles.authContainer}>
          <Text style={styles.authText}>Email</Text>
          <TextInput
            style={styles.authField}
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email.trim())}
            value={email}
          />
        </View>

        <View style={styles.authContainer}>
          <Text style={styles.authText}>Password</Text>
          <TextInput
            style={styles.authField}
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password.trim())}
            value={password}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.signInContainer}>
        <Text style={styles.textButton}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={{ textAlign: "center", fontSize: 13, fontWeight: "300" }}>
          New user?{" "}
          <Text style={{ fontWeight: "700", color: "#8022d9" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.headerGraphic}>
        <View style={styles.rightCircle}></View>
        <View style={styles.leftCircle}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    marginTop: 192,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "200",
  },
  headerGraphic: {
    position: "absolute",
    width: 100,
    top: -50,
    zIndex: -100,
  },
  rightCircle: {
    backgroundColor: "#8022d9",
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: 200,
    left: 100,
    top: -200,
  },
  leftCircle: {
    backgroundColor: "#23a6d5",
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    left: -50,
    top: -50,
  },
  auth: {
    margin: (64, 32, 32),
  },
  authContainer: {
    marginBottom: 32,
  },
  authText: {
    color: "#8e93a1",
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "300",
  },
  authField: {
    borderBottomColor: "#8e93a1",
    borderBottomWidth: 0.5,
    height: 48,
  },
  signInContainer: {
    margin: (0, 32),
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8022d9",
    borderRadius: 6,
  },
  textButton: {
    color: "#fff",
    fontWeight: "600",
  },
});
