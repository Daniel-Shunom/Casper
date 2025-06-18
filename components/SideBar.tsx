import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

interface Room {
  id: string;
  name: string;
  memberCount: number;
  isActive?: boolean;
}

interface SidebarProps {
  rooms: Room[];
  currentRoomId?: string;
  onRoomEnter: (roomId: string) => void;
  onSignOut: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  rooms, 
  currentRoomId, 
  onRoomEnter, 
  onSignOut 
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Image 
              source={require('../assets/icons/send.png')}
              style={styles.avatarImage}
              resizeMode="cover"
            />
            <View style={styles.statusIndicator} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.username} numberOfLines={1}>
              JohnDoe#1234
            </Text>
            <Text style={styles.userStatus}>
              Online
            </Text>
          </View>
          
          <Pressable style={styles.profileSettings}>
            <Image 
              source={require('../assets/icons/send.png')}
              style={styles.settingsIcon}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>

      {/* Rooms List Section */}
      <View style={styles.roomsSection}>
        <Text style={styles.sectionTitle}>ROOMS</Text>
        
        <ScrollView 
          style={styles.roomsList}
          showsVerticalScrollIndicator={false}
        >
          {rooms.map((room) => (
            <Pressable
              key={room.id}
              style={({ pressed }) => [
                styles.roomItem,
                currentRoomId === room.id && styles.roomItemActive,
                pressed && styles.roomItemPressed
              ]}
              onPress={() => onRoomEnter(room.id)}
            >
              <View style={styles.roomIcon}>
                <Text style={styles.roomIconText}>#</Text>
              </View>
              
              <View style={styles.roomInfo}>
                <Text 
                  style={[
                    styles.roomName,
                    currentRoomId === room.id && styles.roomNameActive
                  ]} 
                  numberOfLines={1}
                >
                  {room.name}
                </Text>
                <Text style={styles.roomMembers}>
                  {room.memberCount} members
                </Text>
              </View>
              
              <Pressable
                style={({ pressed }) => [
                  styles.enterButton,
                  currentRoomId === room.id && styles.enterButtonActive,
                  pressed && styles.enterButtonPressed
                ]}
                onPress={() => onRoomEnter(room.id)}
              >
                <Image 
                  source={require('../assets/icons/send.png')}
                  style={[
                    styles.enterIcon,
                    { tintColor: currentRoomId === room.id ? '#5865f2' : '#b9bbbe' }
                  ]}
                  resizeMode="contain"
                />
              </Pressable>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Sign Out Section */}
      <View style={styles.signOutSection}>
        <Pressable
          style={({ pressed }) => [
            styles.signOutButton,
            pressed && styles.signOutButtonPressed
          ]}
          onPress={onSignOut}
        >
          <Image 
            source={require('../assets/icons/send.png')}
            style={styles.signOutIcon}
            resizeMode="contain"
          />
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f3136',
    borderRightWidth: 1,
    borderRightColor: '#202225',
  },
  
  // Profile Section
  profileSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#202225',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#36393f',
    borderRadius: 12,
    padding: 12,
  },
  avatar: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5865f2',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3ba55c',
    borderWidth: 2,
    borderColor: '#36393f',
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  userStatus: {
    color: '#b9bbbe',
    fontSize: 12,
  },
  profileSettings: {
    padding: 4,
  },
  settingsIcon: {
    width: 18,
    height: 18,
    tintColor: '#b9bbbe',
  },
  
  // Rooms Section
  roomsSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    color: '#8e9297',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  roomsList: {
    flex: 1,
  },
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 2,
  },
  roomItemActive: {
    backgroundColor: '#5865f2',
  },
  roomItemPressed: {
    backgroundColor: '#40444b',
  },
  roomIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#5865f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  roomIconText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    color: '#b9bbbe',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  roomNameActive: {
    color: '#ffffff',
  },
  roomMembers: {
    color: '#72767d',
    fontSize: 11,
  },
  enterButton: {
    padding: 6,
    borderRadius: 4,
  },
  enterButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  enterButtonPressed: {
    backgroundColor: '#40444b',
  },
  enterIcon: {
    width: 16,
    height: 16,
  },
  
  // Sign Out Section
  signOutSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#202225',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ed4245',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  signOutButtonPressed: {
    backgroundColor: '#c73e40',
    transform: [{ scale: 0.98 }],
  },
  signOutIcon: {
    width: 18,
    height: 18,
    tintColor: '#ffffff',
    marginRight: 8,
  },
  signOutText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Sidebar;