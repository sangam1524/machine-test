import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addUser, updateUser} from '../redux/UserSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const AddUser = () => {
  const route:any = useRoute();
  const [name, setName] = useState(
    route.params?.type == 'edit' ? route.params?.data?.name : '',
  );
  const [email, setEmail] = useState(
    route.params?.type == 'edit' ? route.params?.data?.email : '',
  );
  const [mobile, setMobile] = useState(
    route.params?.type == 'edit' ? route.params?.data?.mobile : '',
  );
  const [address, setAddress] = useState(
    route.params?.type == 'edit' ? route.params?.data?.address : '',
  );

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const dispatch: any = useDispatch();

  const validate = () => {
    let valid = true;
    if (name == '') {
      valid = false;
    }
    if (email == '') {
      valid = false;
    }
    if (mobile == '') {
      valid = false;
    }
    if (address == '') {
      valid = false;
    }

    return valid;
  };
  return (
    <SafeAreaView style={styles.container} edges={['top','bottom']}>
      <TextInput
        placeholder="User Name"
        placeholderTextColor="#8E8E93"
        value={name}
        onChangeText={txt => setName(txt)}
        style={styles.input}
      />
      <TextInput
        placeholder="User Email"
        placeholderTextColor="#8E8E93"
        value={email}
        onChangeText={txt => setEmail(txt)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="User Mobile"
        placeholderTextColor="#8E8E93"
        value={mobile}
        onChangeText={txt => setMobile(txt)}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={10}
      />
      <TextInput
        placeholder="User Address"
        placeholderTextColor="#8E8E93"
        value={address}
        onChangeText={txt => setAddress(txt)}
        style={styles.input}
      />
      <TouchableOpacity
        style={[styles.button, { marginBottom: insets.bottom }]}
        onPress={() => {
          if (validate()) {
            if (route.params?.type == 'edit') {
              dispatch(
                updateUser({
                  name: name,
                  email: email,
                  mobile: mobile,
                  address: address,
                  index: route.params?.index,
                } as any) as any,
              );
            } else {
              dispatch(addUser({name, email, address, mobile} as any) as any);
            }

            navigation.goBack();
          } else {
            Alert.alert('Please Fill Correct Data');
          }
        }}>
        <Text style={styles.buttonText}>Save User</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 16,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 10,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
});