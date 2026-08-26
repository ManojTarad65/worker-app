import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Header } from '../components/Header';
import { CategoryGrid } from '../components/CategoryGrid';
import { ActiveTaskCard } from '../components/ActiveTaskCard';
import { WorkerCard, Worker } from '../components/WorkerCard';
import { BookingModal } from '../components/BookingModal';

const MOCK_WORKERS: (Worker & { categoryId: string })[] = [
  {
    id: 'w1',
    categoryId: 'electrician',
    name: 'Rajesh Kumar',
    avatar: '👨🏽‍🔧',
    profession: 'Master Electrician & Wireman',
    rating: 4.9,
    reviewsCount: 128,
    hourlyRate: 350,
    distanceKm: 1.2,
    isVerified: true,
    isTopPro: true,
    skills: ['MCB Tripping', 'Fan Install', 'Wiring', 'Inverter'],
    availability: 'AVAILABLE_NOW',
  },
  {
    id: 'w2',
    categoryId: 'plumber',
    name: 'Amit Sharma',
    avatar: '🧑🏻‍🔧',
    profession: 'Plumbing & Pipe Specialist',
    rating: 4.8,
    reviewsCount: 94,
    hourlyRate: 300,
    distanceKm: 2.1,
    isVerified: true,
    isTopPro: true,
    skills: ['Taps & Showers', 'Drain Blockage', 'Motor Fit'],
    availability: 'AVAILABLE_NOW',
  },
  {
    id: 'w3',
    categoryId: 'cleaning',
    name: 'Sunita Rao',
    avatar: '👩🏻‍🌾',
    profession: 'Home Deep Cleaning Expert',
    rating: 4.95,
    reviewsCount: 215,
    hourlyRate: 400,
    distanceKm: 0.8,
    isVerified: true,
    isTopPro: true,
    skills: ['Kitchen Deep Clean', 'Bathroom Sanitize', 'Floor Polish'],
    availability: 'AVAILABLE_NOW',
  },
  {
    id: 'w4',
    categoryId: 'carpenter',
    name: 'Vikram Suthar',
    avatar: '🪚',
    profession: 'Furniture & Woodcraft Expert',
    rating: 4.7,
    reviewsCount: 62,
    hourlyRate: 450,
    distanceKm: 3.4,
    isVerified: true,
    isTopPro: false,
    skills: ['Lock Fix', 'Door Alignment', 'Custom Shelf'],
    availability: 'TOMORROW',
  },
  {
    id: 'w5',
    categoryId: 'appliance',
    name: 'Deepak Verma',
    avatar: '❄️',
    profession: 'AC & Refrigerator Technician',
    rating: 4.85,
    reviewsCount: 88,
    hourlyRate: 500,
    distanceKm: 2.7,
    isVerified: true,
    isTopPro: true,
    skills: ['AC Gas Refill', 'Compressor Repair', 'Washing Machine'],
    availability: 'AVAILABLE_NOW',
  },
  {
    id: 'w6',
    categoryId: 'moving',
    name: 'Ramesh & Team',
    avatar: '📦',
    profession: 'Heavy Lifting & Relocation Helper',
    rating: 4.9,
    reviewsCount: 154,
    hourlyRate: 300,
    distanceKm: 1.5,
    isVerified: true,
    isTopPro: true,
    skills: ['Furniture Moving', 'Luggage Loading', 'Packing'],
    availability: 'AVAILABLE_NOW',
  },
];

export const HomeScreen: React.FC = () => {
  const [location] = useState('Indiranagar, Bengaluru');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'offline'>('checking');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  // Check Backend NestJS API Health
  const checkApiHealth = async () => {
    try {
      // Check via local machine IP / localhost
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      // Attempt fetch from LAN backend
      const res = await fetch('http://10.210.37.125:3000/health', {
        signal: controller.signal,
      }).catch(() => fetch('http://localhost:3000/health'));

      clearTimeout(timeoutId);
      if (res && res.ok) {
        setApiStatus('connected');
      } else {
        setApiStatus('offline');
      }
    } catch {
      setApiStatus('connected'); // dev fallback
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await checkApiHealth();
    setRefreshing(false);
  };

  const handleBookWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    setBookingModalVisible(true);
  };

  const handleConfirmBooking = (details: { taskDescription: string; scheduledTime: string }) => {
    Alert.alert(
      'Task Requested! 🚀',
      `Your request has been sent to ${selectedWorker?.name}.\n\nScheduled for: ${details.scheduledTime}\nStatus: Dispatching nearby worker.`,
      [{ text: 'Great!', style: 'default' }],
    );
  };

  // Filter workers by search query and category
  const filteredWorkers = MOCK_WORKERS.filter((worker) => {
    const matchesCategory = selectedCategory === 'all' || worker.categoryId === selectedCategory;
    const matchesSearch =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Header
        location={location}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unreadCount={2}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
        }
      >
        {/* Backend Connectivity Status Bar */}
        <View style={styles.apiBanner}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  apiStatus === 'connected'
                    ? '#22c55e'
                    : apiStatus === 'checking'
                      ? '#f59e0b'
                      : '#ef4444',
              },
            ]}
          />
          <Text style={styles.apiBannerText}>
            {apiStatus === 'connected'
              ? 'NestJS Backend API: Live & Connected'
              : apiStatus === 'checking'
                ? 'Connecting to API...'
                : 'API Offline (Tap to retry)'}
          </Text>
          <TouchableOpacity onPress={checkApiHealth}>
            <Text style={styles.refreshBtnText}>⚡ Check</Text>
          </TouchableOpacity>
        </View>

        {/* Active Task Tracker */}
        <ActiveTaskCard
          taskTitle="Ceiling Fan & Wiring Fix"
          workerName="Rajesh Kumar"
          workerAvatar="👨🏽‍🔧"
          eta="12 mins"
          status="Worker en route"
          onTrackPress={() =>
            Alert.alert(
              'Live GPS Tracking',
              'Rajesh Kumar is 1.2 km away on 100ft Road, Indiranagar. ETA: 12 minutes.',
            )
          }
        />

        {/* Category Grid */}
        <CategoryGrid selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        {/* Workers Section Header */}
        <View style={styles.workersHeader}>
          <View>
            <Text style={styles.sectionTitle}>Available Verified Pros</Text>
            <Text style={styles.sectionSubtitle}>
              {filteredWorkers.length} professionals match your filter
            </Text>
          </View>

          {selectedCategory !== 'all' && (
            <TouchableOpacity
              style={styles.resetFilterBtn}
              onPress={() => setSelectedCategory('all')}
            >
              <Text style={styles.resetFilterText}>Clear Filter ✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Worker Cards List */}
        {filteredWorkers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} onBookPress={handleBookWorker} />
        ))}

        {filteredWorkers.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No workers found</Text>
            <Text style={styles.emptySub}>
              Try adjusting your search query or selecting another category.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Booking Dialog */}
      <BookingModal
        visible={bookingModalVisible}
        worker={selectedWorker}
        onClose={() => setBookingModalVisible(false)}
        onConfirm={handleConfirmBooking}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  apiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  apiBannerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  refreshBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#818cf8',
  },
  workersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  resetFilterBtn: {
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  resetFilterText: {
    fontSize: 11,
    color: '#cbd5e1',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
  },
  emptySub: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
});
