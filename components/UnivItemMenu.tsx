import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ItemsListCardProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  modalType?: 'full' | 'half';
}

const UnivItemMenu: React.FC<ItemsListCardProps> = ({
  title,
  children,
  subtitle,
  icon = 'settings',
  modalType = 'half',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const isHalf = modalType === 'half';
  const modalHeight = isHalf ? SCREEN_HEIGHT * 0.5 : SCREEN_HEIGHT;

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      {/* Main Card */}
      <TouchableOpacity style={styles.card} onPress={openModal} activeOpacity={0.7}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons name={icon} size={24} color="#7289da" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#b9bbbe" />
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {/* Full-screen overlay with proper background */}
        <View
          style={[
            styles.modalOverlay,
            { justifyContent: isHalf ? 'flex-end' : 'flex-start' },
          ]}
        >
          {/* Modal container with safe area insets */}
          <View
            style={[
              styles.modalContainer,
              {
                height: modalHeight,
                borderTopLeftRadius: isHalf ? 20 : 0,
                borderTopRightRadius: isHalf ? 20 : 0,
                backgroundColor: '#2c2f33',
                paddingTop: isHalf ? 0 : insets.top,
                paddingLeft: insets.left,
                paddingRight: insets.right,
              },
            ]}
          >
            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderLeft}>
                <View style={styles.modalIconContainer}>
                  <MaterialIcons name={icon} size={20} color="#7289da" />
                </View>
                <Text style={styles.modalTitle}>{title}</Text>
              </View>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#b9bbbe" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>

            {/* Footer */}
            <View style={[styles.modalFooter, { paddingBottom: Math.max(insets.bottom, 20) }]}>
              <TouchableOpacity style={styles.doneButton} onPress={closeModal}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2c2f33',
    borderRadius: 20,
    marginVertical: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  iconContainer: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#36393f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#b9bbbe',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4f545c',
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalIconContainer: {
    marginRight: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#36393f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#4f545c',
  },
  doneButton: {
    backgroundColor: '#7289da',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UnivItemMenu;