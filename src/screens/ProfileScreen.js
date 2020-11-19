import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

export default ProfileScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  return (
    <View style={styles.container}>
      <View style={styles.profilePhotoContainer}>
        <Image
          source={
            user.profilePhotoUrl === "default"
              ? require("../../assets/default.png")
              : { uri: user.profilePhotoUrl }
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 64,
  },
  profilePhotoContainer: {
    shadowOpacity: 0.8,
    shadowRadius: 30,
    shadowColor: "#222",
  },
  profilePhoto: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
});
