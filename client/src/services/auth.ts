import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  role: 'customer' | 'washer';
}

export const AuthService = {
  // Sign up
  async signUp({email, password, fullName, phoneNumber, role}: SignUpData) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      // Create user profile in Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        email,
        fullName,
        phoneNumber,
        role,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Sign in
  async signIn(email: string, password: string) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  },

  // Get current user
  getCurrentUser() {
    return auth().currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: FirebaseAuthTypes.User | null) => void) {
    return auth().onAuthStateChanged(callback);
  },
};
