import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";

export default SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      return status;
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setProfilePhoto(result.uri);
      }
    } catch (error) {
      console.log("Error @pickImage: ", error);
    }
  };

  const addProfilePhoto = async () => {
    const status = await getPermission();

    if (status !== "granted") {
      alert("We need permission to access your camara roll.");

      return;
    }
    pickImage();
  };

  const signUp = async () => {
    const user = { username, email, password, profilePhoto };

    try {
      const createdUser = await firebase.createUser(user);
      setUser({ ...createdUser, isLoggedIn: true });
    } catch (error) {
      console.log("Error @signUp: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Sign up to get started.</Text>
      </View>

      <TouchableOpacity
        style={styles.profilePhotoContainer}
        onPress={addProfilePhoto}
      >
        {profilePhoto ? (
          <Image style={styles.profilePhoto} source={{ uri: profilePhoto }} />
        ) : (
          <View style={styles.defaultProfilePhoto}>
            <AntDesign name="plus" size={24} color="#fff" />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.auth}>
        <View style={styles.authContainer}>
          <Text style={styles.authText}>Username</Text>
          <TextInput
            style={styles.authField}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            onChangeText={(username) => setUsername(username.trim())}
            value={username}
          />
        </View>

        <View style={styles.authContainer}>
          <Text style={styles.authText}>Email</Text>
          <TextInput
            style={styles.authField}
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
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

      <TouchableOpacity style={styles.signUpContainer} onPress={signUp}>
        <Text style={styles.textButton}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={{ textAlign: "center", fontSize: 13, fontWeight: "300" }}>
          Already have an account?{" "}
          <Text style={{ fontWeight: "700", color: "#8022d9" }}>Sign In</Text>
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
    marginTop: 160,
  },
  profilePhotoContainer: {
    backgroundColor: "#e1e2e6",
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginTop: 16,
    overflow: "hidden",
  },
  defaultProfilePhoto: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  profilePhoto: {
    flex: 1,
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
    margin: (16, 32, 32),
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
  signUpContainer: {
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
