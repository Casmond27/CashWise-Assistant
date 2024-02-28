import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Settings = ({}) => {
  const goToSettingScreen = (settingName) => {
    console.log(`Navigating to ${settingName} screen`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('./../assets/money_tree.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Casmond</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => goToSettingScreen('Profile')}
        >
          <View style={styles.iconContainer}>
            <Icon name="user-circle" size={20} style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Profile</Text>
          </View>
          <Icon name="chevron-right" size={20} style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => goToSettingScreen('Theme')}
        >
          <View style={styles.iconContainer}>
            <Icon name="paint-brush" size={20} style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Theme and Appearance</Text>
          </View>
          <Icon name="chevron-right" size={20} style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => goToSettingScreen('Language')}
        >
          <View style={styles.iconContainer}>
            <Icon name="language" size={20} style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Language</Text>
          </View>
          <Icon name="chevron-right" size={20} style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => goToSettingScreen('Notifications')}
        >
          <View style={styles.iconContainer}>
            <Icon name="bell" size={20} style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Notifications</Text>
          </View>
          <Icon name="chevron-right" size={20} style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => goToSettingScreen('Privacy')}
        >
          <View style={styles.iconContainer}>
            <Icon name="lock" size={20} style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Privacy</Text>
          </View>
          <Icon name="chevron-right" size={20} style={styles.chevron} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => goToSettingScreen('Feedback')}
        >
          <View style={styles.iconContainer}>
            <Icon name="comment" size={20} style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Feedback And Support</Text>
          </View>
          <Icon name="chevron-right" size={20} style={styles.chevron} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: 'green',
    borderWidth: 2,
    marginRight: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  menuContainer: {
    backgroundColor: '#2b2b2b',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
    color: 'white',
  },
  chevron: {
    color: 'white',
  },
});

export default Settings;
