import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday', 'Sunday',
];

export default function RestaurantTimingModal({ visible, onClose, onSave }) {
  const [timings, setTimings] = useState(
    daysOfWeek.map(day => ({
      day,
      isOpen: false,
      from: '',
      to: '',
    }))
  );

  const [showTimePicker, setShowTimePicker] = useState({
    show: false,
    index: null,
    type: null,
  });

  const handleTimeChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowTimePicker({ show: false, index: null, type: null });
      return;
    }

    const date = selectedDate || new Date();
    const time = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const updated = [...timings];
    updated[showTimePicker.index][showTimePicker.type] = time;
    setTimings(updated);
    setShowTimePicker({ show: false, index: null, type: null });
  };

  const handleSave = () => {
    // onSave(timings);
    onClose();
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 12,
              width: '90%',
              maxHeight: '80%',
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Select Opening Times
            </Text>

            <ScrollView>
              {timings.map((item, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.day}</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: item.isOpen ? '#4caf50' : '#ccc',
                        padding: 6,
                        borderRadius: 6,
                        marginRight: 10,
                      }}
                      onPress={() => {
                        const updated = [...timings];
                        updated[index].isOpen = !updated[index].isOpen;
                        setTimings(updated);
                      }}>
                      <Text style={{ color: '#fff' }}>
                        {item.isOpen ? 'Open' : 'Closed'}
                      </Text>
                    </TouchableOpacity>

                    {item.isOpen && (
                      <>
                        <TouchableOpacity
                          onPress={() =>
                            setShowTimePicker({ show: true, index, type: 'from' })
                          }
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 6,
                            padding: 6,
                            marginRight: 10,
                          }}>
                          <Text>{item.from || 'From'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            setShowTimePicker({ show: true, index, type: 'to' })
                          }
                          style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 6,
                            padding: 6,
                          }}>
                          <Text>{item.to || 'To'}</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={{
                backgroundColor: '#e53935',
                padding: 10,
                marginTop: 10,
                borderRadius: 8,
              }}
              onPress={handleSave}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Save & Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showTimePicker.show && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
    </>
  );
}
