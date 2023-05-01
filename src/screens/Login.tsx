import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  // All the states are here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   // Below code is for only one time purpose and only related to send the admin and password to firebase\

  //   // firestore()
  //   //   .collection('admin')
  //   //   .add({email: 'admin@gmail.com', password: 'admin@1234'})
  //   //   .then(() => {
  //   //     console.log('admin added!');
  //   //   });

  //   // Now for getting the data from firebase
  //   adminLogin();
  // }, []);

  // const adminLogin = async () => {
  //   const users = await firestore().collection('admin').get();
  //   console.log(users.docs[0]._data); // It will give the object consists of email and password
  //   if (email === users.email && password === users.password) {
  //     navigation.navigate('Dashboard');
  //   } else {
  //     Alert.alert('Wrong email and password');
  //   }
  // };
  const adminLogin = async () => {
    const users = await firestore().collection('admin').get();
    console.log(users.docs[0]._data); // It will give the object consists of email and password
    // console.log(users.password + '  ' + password);

    // if (
    //   email === users.docs[0]._data.email &&
    //   password === users.docs[0]._data.password
    // ) {
    //   navigation.navigate('Dashboard');
    // } else {
    //   Alert.alert('Wrong email and password');
    // }
    if (
      email == users.docs[0]._data.email &&
      password == users.docs[0]._data.password
    ) {
      await AsyncStorage.setItem('EMAIL', email);
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Wrong email and password');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Email Id'}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Password '}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== '' && password !== '') {
            adminLogin();
          } else {
            Alert.alert('Please Enter Data');
          }
        }}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginTop: 100,
    alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
  },
  loginBtn: {
    backgroundColor: 'orange',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});
