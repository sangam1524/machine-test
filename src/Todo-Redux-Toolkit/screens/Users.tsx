import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { deleteUser } from '../redux/UserSlice';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Users = () => {
  const navigation:any = useNavigation();
  const users:any = useSelector((state:any) => state.user);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  console.log(users);
  return (
     <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={users.data}
        renderItem={({item, index}) => {
          return (
            <View style={styles.userRow}>
              <View>
                <Text>{'Name: ' + item.name}</Text>
                <Text>{'Email: ' + item.email}</Text>
                <Text>{'Mobile: ' + item.mobile}</Text>
                <Text>{'Address: ' + item.address}</Text>
              </View>
              <View style={styles.actions}>
                <Text
                  style={styles.edit}
                  onPress={() => {
                    navigation.navigate('AddUser', {
                      type: 'edit',
                      data: item,
                      index: index,
                    });
                  }}>
                  Edit
                </Text>
                <Text
                  style={styles.delete}
                  onPress={() => {
                    dispatch(deleteUser(index));
                  }}>
                  Delete
                </Text>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.addButton, {bottom: insets.bottom}]}
        onPress={() => {
          navigation.navigate('AddUser', {type: 'add'});
        }}>
        <Text style={styles.addButtonText}>Add New User</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userRow: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  actions: {
    marginRight: 10,
  },
  edit: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'blue',
    color: 'blue',
  },
  delete: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'red',
    color: 'red',
    marginTop: 10,
  },
  addButton: {
    width: '80%',
    height: 50,
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});