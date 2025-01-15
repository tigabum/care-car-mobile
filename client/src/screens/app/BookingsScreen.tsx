import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

type BookingStatus =
  | 'pending'
  | 'accepted'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

interface Booking {
  id: string;
  status: BookingStatus;
  scheduledFor: string;
  location: string;
  price: number;
  washerName?: string;
}

const BookingsScreen = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [refreshing, setRefreshing] = useState(false);
  const {user} = useSelector((state: RootState) => state.auth);

  // Dummy data - replace with actual API calls
  const bookings: Booking[] = [
    {
      id: '1',
      status: 'pending',
      scheduledFor: '2024-03-20 14:00',
      location: '123 Main St',
      price: 29.99,
    },
    {
      id: '2',
      status: 'in-progress',
      scheduledFor: '2024-03-19 15:30',
      location: '456 Oak Ave',
      price: 34.99,
      washerName: 'John Doe',
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Add API call to refresh bookings
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusColor = (status: BookingStatus) => {
    const colors = {
      pending: '#FFA500',
      accepted: '#4CAF50',
      'in-progress': '#2196F3',
      completed: '#4CAF50',
      cancelled: '#F44336',
    };
    return colors[status];
  };

  const renderBookingItem = ({item}: {item: Booking}) => (
    <TouchableOpacity style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingDate}>{item.scheduledFor}</Text>
        <Text
          style={[styles.bookingStatus, {color: getStatusColor(item.status)}]}>
          {item.status.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.bookingLocation}>{item.location}</Text>
      {item.washerName && (
        <Text style={styles.washerName}>Washer: {item.washerName}</Text>
      )}
      <Text style={styles.bookingPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const filteredBookings = bookings.filter(booking =>
    activeTab === 'active'
      ? ['pending', 'accepted', 'in-progress'].includes(booking.status)
      : ['completed', 'cancelled'].includes(booking.status),
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText,
            ]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookings found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bookingDate: {
    fontSize: 16,
    fontWeight: '500',
  },
  bookingStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bookingLocation: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5,
  },
  washerName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default BookingsScreen;
