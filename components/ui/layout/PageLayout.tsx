import Sidebar from "@/components/SideBar";
import { Ionicons } from '@expo/vector-icons';
import React, { memo, ReactNode, useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

// Sample room data - replace with your actual data source
const sampleRooms = [
  { id: '1', name: 'general', memberCount: 42, isActive: true },
  { id: '2', name: 'random', memberCount: 18, isActive: false },
  { id: '3', name: 'gaming', memberCount: 156, isActive: false },
  { id: '4', name: 'music', memberCount: 73, isActive: false },
  { id: '5', name: 'development', memberCount: 29, isActive: false },
];

const { width: screenWidth } = Dimensions.get('window');
const SIDEBAR_WIDTH = 280;

// Check if we're on mobile
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

// Mobile Hamburger Menu Button
function HamburgerMenu({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.hamburgerButton}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.7}
    >
      <Ionicons name="menu" size={24} color="#dcddde" />
    </TouchableOpacity>
  );
}

const MemoizedHamburgerMenu = memo(HamburgerMenu);

interface PageLayoutProps {
  children: ReactNode;
  rooms?: Array<{
    id: string;
    name: string;
    memberCount: number;
    isActive?: boolean;
  }>;
  currentRoomId?: string;
  onRoomEnter?: (roomId: string) => void;
  onSignOut?: () => void;
  title?: string;
  showHeader?: boolean; // Allow disabling header if needed
}

// Web Layout Component (fixed sidebar)
function WebLayout({ 
  children, 
  rooms = sampleRooms, 
  currentRoomId = '1', 
  onRoomEnter, 
  onSignOut 
}: Omit<PageLayoutProps, 'title'>) {
  const handleRoomEnter = useCallback((roomId: string) => {
    onRoomEnter?.(roomId);
    console.log(`Entering room: ${roomId}`);
  }, [onRoomEnter]);

  const handleSignOut = useCallback(() => {
    onSignOut?.();
    console.log('User signed out');
  }, [onSignOut]);

  return (
    <View style={styles.webContainer}>
      {/* Fixed Sidebar for Web */}
      <View style={styles.sidebarContainer}>
        <Sidebar
          rooms={rooms}
          currentRoomId={currentRoomId}
          onRoomEnter={handleRoomEnter}
          onSignOut={handleSignOut}
        />
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {children}
      </View>
    </View>
  );
}

// Mobile Layout Component (collapsible sidebar)
function MobileLayout({ 
  children, 
  rooms = sampleRooms, 
  currentRoomId = '1', 
  onRoomEnter, 
  onSignOut,
  title = "Chat App",
  showHeader = true
}: PageLayoutProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnimation = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;

  const showSidebar = useCallback(() => {
    setSidebarVisible(true);
    Animated.parallel([
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [sidebarAnimation, overlayAnimation]);

  const hideSidebar = useCallback(() => {
    Animated.parallel([
      Animated.timing(sidebarAnimation, {
        toValue: -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSidebarVisible(false);
    });
  }, [sidebarAnimation, overlayAnimation]);

  const handleRoomEnter = useCallback((roomId: string) => {
    onRoomEnter?.(roomId);
    console.log(`Entering room: ${roomId}`);
    // Auto-hide sidebar after room selection
    hideSidebar();
  }, [onRoomEnter, hideSidebar]);

  const handleSignOut = useCallback(() => {
    onSignOut?.();
    console.log('User signed out');
    hideSidebar();
  }, [onSignOut, hideSidebar]);

  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to horizontal swipes from the left edge
        return gestureState.dx > 10 && Math.abs(gestureState.dy) < 50 && evt.nativeEvent.pageX < 50;
      },
      onPanResponderGrant: () => {
        if (!sidebarVisible) {
          showSidebar();
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.mobileContainer} {...panResponder.panHandlers}>
      {/* Header with Hamburger Menu - conditionally render */}
      {showHeader && (
        <View style={styles.mobileHeader}>
          <MemoizedHamburgerMenu onPress={showSidebar} />
          <View style={styles.headerTitle}>
            <Ionicons name="chatbubbles" size={20} color="#dcddde" style={{ marginRight: 8 }} />
            {/* You can add title text here if needed */}
          </View>
        </View>
      )}

      {/* Main Content */}
      <View style={[styles.mobileMainContent, !showHeader && { paddingTop: 0 }]}>
        {children}
      </View>

      {/* Floating Hamburger Button when header is hidden */}
      {!showHeader && (
        <TouchableOpacity
          onPress={showSidebar}
          style={styles.floatingMenuButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={24} color="#dcddde" />
        </TouchableOpacity>
      )}

      {/* Overlay (when sidebar is visible) */}
      {sidebarVisible && (
        <TouchableWithoutFeedback onPress={hideSidebar}>
          <Animated.View 
            style={[
              styles.overlay,
              {
                opacity: overlayAnimation,
              }
            ]} 
          />
        </TouchableWithoutFeedback>
      )}

      {/* Animated Sidebar */}
      {sidebarVisible && (
        <Animated.View
          style={[
            styles.animatedSidebar,
            {
              transform: [{ translateX: sidebarAnimation }],
            }
          ]}
        >
          <Sidebar
            rooms={rooms}
            currentRoomId={currentRoomId}
            onRoomEnter={handleRoomEnter}
            onSignOut={handleSignOut}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

// Main Page Layout Component
const PageLayout: React.FC<PageLayoutProps> = (props) => {
  return isMobile ? <MobileLayout {...props} /> : <WebLayout {...props} />;
};

const styles = StyleSheet.create({
  // Web styles
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#202225',
  },
  sidebarContainer: {
    width: 280,
    minWidth: 280,
    maxWidth: 280,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#36393f',
  },
  
  // Mobile styles
  mobileContainer: {
    flex: 1,
    backgroundColor: '#36393f',
  },
  mobileHeader: {
    height: 60,
    backgroundColor: '#36393f',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#202225',
    paddingHorizontal: 16,
  },
  hamburgerButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 28, // Balance the hamburger button (padding + icon width)
  },
  mobileMainContent: {
    flex: 1,
    backgroundColor: '#36393f', // Ensure background color
    zIndex: 1, // Ensure content is above background but below sidebar/overlay
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  animatedSidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingMenuButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5865f2',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 998,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PageLayout;