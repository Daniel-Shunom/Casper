import { RoomInfo, UserName } from "@/api/types/types";
import MemberCard from "@/components/MemberCard";
import RoomCard from "@/components/RoomCard";
import { useCentralRoomStore } from "@/ctx/stores/rooms/roomStore";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, PanResponder, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const mockMembers = [
  { username: "@john_doe" as UserName, userdesc: { Some: "Software developer and coffee enthusiast" } },
  { username: "@alice_smith" as UserName, userdesc: { Some: "UI/UX designer with a passion for minimalism" } },
  { username: "@bob_wilson" as UserName, userdesc: { Some: "Data scientist exploring AI and ML" } },
  { username: "@charlie_brown" as UserName, userdesc: { Some: "Full-stack developer" } },
  { username: "@diana_ross" as UserName, userdesc: { Some: "Product manager and tech blogger" } },
  { username: "@eve_adams" as UserName, userdesc: { Some: "DevOps engineer" } },
  { username: "@frank_miller" as UserName, userdesc: { Some: "Mobile app developer" } },
  { username: "@grace_hopper" as UserName, userdesc: { Some: "Computer scientist and naval officer" } },
  { username: "@henry_ford" as UserName, userdesc: { Some: "Industrial engineer" } },
  { username: "@irene_curie" as UserName, userdesc: { Some: "Physicist and chemist" } },
  { username: "@jack_black" as UserName, userdesc: { Some: "Musician and actor" } },
  { username: "@karen_white" as UserName, userdesc: { Some: "Marketing specialist" } },
  { username: "@luke_skywalker" as UserName, userdesc: { Some: "Jedi Knight" } },
  { username: "@mary_jane" as UserName, userdesc: { Some: "Graphic designer" } },
  { username: "@nick_fury" as UserName, userdesc: { Some: "Director of S.H.I.E.L.D." } },
  { username: "@olivia_pope" as UserName, userdesc: { Some: "Crisis management expert" } },
  { username: "@peter_parker" as UserName, userdesc: { Some: "Friendly neighborhood photographer" } },
  { username: "@quinn_fabray" as UserName, userdesc: { Some: "High school student" } },
  { username: "@rachel_green" as UserName, userdesc: { Some: "Fashion enthusiast" } },
  { username: "@steve_rogers" as UserName, userdesc: { Some: "Super soldier" } },
  { username: "@tony_stark" as UserName, userdesc: { Some: "Genius, billionaire, playboy, philanthropist" } },
  { username: "@user_no_desc" as UserName, userdesc: { None: null } },
  { username: "@violet_beauregarde" as UserName, userdesc: { Some: "Gum chewing champion" } },
  { username: "@walter_white" as UserName, userdesc: { Some: "Chemistry teacher" } },
  { username: "@xavier_charles" as UserName, userdesc: { Some: "Professor and telepath" } },
];

export default function RoomDetailsPage() {
  const { rooms } = useLocalSearchParams();
  const metadata = useCentralRoomStore()
    .getGauranteedRoomMetadata(rooms as string)

  const [roomData, setRoomData] = useState<RoomInfo | null>(null);
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showJoinSessionButton, setShowJoinSessionButton] = useState<boolean>(true);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 20 && Math.abs(gesture.dy) < 20,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -50) {
          handleJoinSession();
        }
      },
    })
  ).current;

  useEffect(() => {
    const loadRoomData = () => {
      try {
        if (typeof rooms === 'string') {
          try {
            const parsedRoom = JSON.parse(decodeURIComponent(rooms));
            setRoomData(parsedRoom);
          } catch {
            fetchRoomById(rooms);
          }
        }
      } catch (error) {
        console.error('Error loading room data:', error);
        setRoomData(getMockRoomData(rooms as string));
      } finally {
        setLoading(false);
      }
    };

    loadRoomData();
  }, [rooms]);

  const fetchRoomById = async (roomId: string) => {
    try {
      setRoomData(getMockRoomData(roomId));
    } catch (error) {
      console.error('Error fetching room:', error);
      Alert.alert('Error', 'Failed to load room data');
    }
  };

  const getMockRoomData = (roomId: string): RoomInfo => ({
    roomname: `Room ${roomId}`,
    roomdesc: "This is a sample room description. Join us for interesting conversations and discussions about various topics.",
    roomcapacity: 25,
    roomowner: "@john_doe",
  });

  const handleJoinRoom = () => {
    if (!roomData) return;
    setIsJoined(true);
    Alert.alert('Success', `You joined ${roomData.roomname}!`);
  };

  const handleLeaveRoom = () => {
    if (!roomData) return;
    Alert.alert(
      'Leave Room',
      `Are you sure you want to leave ${roomData.roomname}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            setIsJoined(false);
          }
        }
      ]
    );
  };

  const handleJoinSession = () => {
    // We will wait for all the room data to load here.
    router.push(`/chat/${rooms}`);
  };

  const renderMemberItem = ({ item }: { item: typeof mockMembers[0] }) => (
    <MemberCard info={item} />
  );

  if (loading) {
    return (
      <View style={styles.container} {...panResponder.panHandlers}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading room...</Text>
        </View>
      </View>
    );
  }

  if (!roomData) {
    return (
      <View style={styles.container} {...panResponder.panHandlers}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Room not found</Text>
          <Text style={styles.errorSubtext}>
            Could not load room with ID: {rooms}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Fixed content at the top */}
      <View style={styles.fixedContent}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>{metadata.name}</Text>
            </View>
            {showJoinSessionButton && (
              <TouchableOpacity
                style={styles.joinSessionButton}
                onPress={handleJoinSession}
              >
                <Text style={styles.joinSessionButtonText}>Join Session</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <RoomCard
          info={roomData}
          isJoined={isJoined}
          onJoin={handleJoinRoom}
          onLeave={handleLeaveRoom}
        />

        {/* Additional room information */}
        <View style={styles.additionalInfo}>
          <Text style={styles.sectionTitle}>About this room</Text>
          <Text style={styles.infoText}>{metadata.description}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Owner:</Text>
            <Text style={styles.infoValue}>{metadata.owner}</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Members Section */}
      <View style={styles.membersSection}>
        <View style={styles.membersSectionHeader}>
          <Text style={styles.sectionTitle}>
            Members ({mockMembers.length}/{roomData.roomcapacity})
          </Text>
        </View>

        <FlatList
          data={mockMembers}
          renderItem={renderMemberItem}
          keyExtractor={(item) => item.username}
          style={styles.membersList}
          contentContainerStyle={styles.membersListContent}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2f33',
    borderTopLeftRadius: 20,
  },
  fixedContent: {
    // temp
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#40444b',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  roomId: {
    color: '#b9bbbe',
    fontSize: 14,
    fontWeight: '500',
  },
  joinSessionButton: {
    backgroundColor: '#5865f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 12,
    marginTop: 2,
  },
  joinSessionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#ed4245',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubtext: {
    color: '#b9bbbe',
    fontSize: 14,
    textAlign: 'center',
  },
  additionalInfo: {
    backgroundColor: '#36393f',
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoText: {
    color: '#b9bbbe',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#40444b',
  },
  infoLabel: {
    color: '#b9bbbe',
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  membersSection: {
    flex: 1, 
    backgroundColor: '#36393f',
    margin: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  membersSectionHeader: {
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#40444b',
  },
  membersList: {
    flex: 1, 
  },
  membersListContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
