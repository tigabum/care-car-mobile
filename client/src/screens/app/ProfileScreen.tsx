import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../../store/slices/authSlice';
import {AppDispatch, RootState} from '../../store';

const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: RootState) => state.auth);

  const handleSignOut = async () => {
    try {
      await dispatch(signOut()).unwrap();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const ProfileOption = ({
    title,
    value,
    onPress,
  }: {
    title: string;
    value?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <Text style={styles.optionTitle}>{title}</Text>
      {value ? (
        <Text style={styles.optionValue}>{value}</Text>
      ) : (
        <Text style={styles.optionArrow}>›</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Text style={styles.editAvatarText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user?.fullName}</Text>
        <Text style={styles.role}>{user?.role}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <ProfileOption title="Full Name" value={user?.fullName} />
        <ProfileOption title="Email" value={user?.email} />
        <ProfileOption title="Phone Number" value={user?.phoneNumber} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <ProfileOption title="Notifications" />
        <ProfileOption title="Language" value="English" />
        <ProfileOption title="Dark Mode" value="Off" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <ProfileOption title="Help Center" />
        <ProfileOption title="Terms of Service" />
        <ProfileOption title="Privacy Policy" />
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    backgroundColor: '#007AFF',
    padding: 5,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  editAvatarText: {
    color: 'white',
    fontSize: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  role: {
    fontSize: 16,
    color: '#666',
    textTransform: 'capitalize',
  },
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 15,
    marginBottom: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
  },
  optionValue: {
    fontSize: 16,
    color: '#666',
  },
  optionArrow: {
    fontSize: 20,
    color: '#666',
  },
  signOutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
