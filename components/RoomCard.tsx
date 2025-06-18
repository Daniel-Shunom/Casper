import { RoomInfo } from "@/api/types/types";
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface RoomCardProps {
  info: RoomInfo;
  isJoined?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  info, 
  isJoined = false, 
  onJoin, 
  onLeave 
}) => {
  const handleButtonPress = () => {
    if (isJoined) {
      onLeave?.();
    } else {
      onJoin?.();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.roomIcon}>
        <Text style={styles.roomIconText}>#</Text>
      </View>
     
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.roomName} numberOfLines={1}>
            {info.roomname}
          </Text>
          <Text style={styles.roomCapacity}>
            {info.roomcapacity} {
              info.roomcapacity == 1
              ? 'member'
              : 'members'
            }
          </Text>
        </View>
       
        <Text style={styles.roomDescription} numberOfLines={2}>
          {info.roomdesc}
        </Text>
       
        <View style={styles.footer}>
          <Text style={styles.roomOwner}>
            Created by: {info.roomowner}
          </Text>
          
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              isJoined ? styles.leaveButton : styles.joinButton,
              pressed && styles.buttonPressed
            ]}
            onPress={handleButtonPress}
          >
            <Image 
              source={
                isJoined 
                  ? require('@/assets/icons/send.png') 
                  : require('@/assets/icons/send.png')
              }
              style={[
                styles.buttonIcon,
                { tintColor: isJoined ? '#ed4245' : '#ffffff' }
              ]}
              resizeMode="contain"
            />
            <Text style={[
              styles.buttonText,
              { color: isJoined ? '#ed4245' : '#ffffff' }
            ]}>
              {isJoined ? 'Leave' : 'Join'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2f3136',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  roomIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#5865f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  roomIconText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  roomName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  roomCapacity: {
    color: '#b9bbbe',
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: '#40444b',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  roomDescription: {
    color: '#b9bbbe',
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 6,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  roomOwner: {
    color: '#72767d',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  joinButton: {
    backgroundColor: '#5865f2',
  },
  leaveButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ed4245',
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  buttonIcon: {
    width: 14,
    height: 14,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default RoomCard;