import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { useRoute } from '@react-navigation/native';
import { getRankInfo } from './../components/rankInfo';
import { usePointContext } from './../components/pointContext';

const Achievement = ({route}) => {
  console.log('Received route params:', route.params);
  const { points, updatePoints } = usePointContext();
  const [achievements, setAchievements] = useState([]);
  const [showRewardButton, setShowRewardButton] = useState(false);
  const { budgetData } = route.params || { budgetData: { budget: 0 } };
  const { budget } = budgetData;
  const [selectedTab, setSelectedTab] = useState('history');
  const { rankImage, rankName } = getRankInfo(points);
  const [leaderboardData, setLeaderboardData] = useState([]);


  useEffect(() => {
    const updatedPoints = points + budget;
    updatePoints(updatedPoints);

    const achievementMessage = `${getMonth()} - Budget Left: $${budget}, Points Earned: +${budget}`;
    setAchievements([...achievements, achievementMessage]);

    checkRewardButton(updatedPoints);

    console.log('Rank Info:', getRankInfo(updatedPoints));
    console.log('Points:', updatedPoints);

    const initialLeaderboardData = [
    { name: 'John Smith', points: 1500 },
    { name: 'Jane Smith', points: 1200 },
    { name: 'Alex Johnson', points: 1000 },
    { name: 'David Johnson', points: 700 },
    { name: 'Jimmy Donaldson', points: 500 },
    { name: 'James Oh', points: 150 },
    { name: 'Casmond Lim', points: updatedPoints  }
  ];

  setLeaderboardData(initialLeaderboardData);

  }, [route.params]);




  const checkRewardButton = (updatedPoints) => {
    setShowRewardButton(updatedPoints >= 1500 && updatedPoints % 1500 === 0);
  };
  const claimReward = () => {
    Alert.alert('Reward Claimed!', 'Congratulations! You have claimed your reward.');

    // Hide the reward button
    setShowRewardButton(false);
  };


  const getProgress = () => {
    const { nextRankPoints } = getRankInfo(points);
    const progress = (points % nextRankPoints) / nextRankPoints;
    return progress;
  };


  const getRemainingPoints = () => {
    const nextRankPoints = getRankInfo(points).nextRankPoints;
    const remainingPoints = nextRankPoints - (points % nextRankPoints);
    return remainingPoints;
  };

  const getMonth = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    const currentDate = new Date();
    return months[currentDate.getMonth()];
  };

  return (
    <View style={styles.container}>
    <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabHistoryButton, selectedTab === 'history' && styles.selectedTab]}
          onPress={() => setSelectedTab('history')}
        >
          <Text style={styles.tabButtonText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabPersonalBestButton, selectedTab === 'personalBest' && styles.selectedTab]}
          onPress={() => setSelectedTab('personalBest')}
        >
          <Text style={styles.tabButtonText}>Personal Best</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabLeaderboardButton, selectedTab === 'leaderboard' && styles.selectedTab]}
          onPress={() => setSelectedTab('leaderboard')}
        >
          <Text style={styles.tabButtonText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'history' && (
      <>
        <View style={styles.rankContainer}>
          <View style={styles.rankBorder}>
            <Image source={getRankInfo(points).rankImage} style={styles.rankImage} />
          </View>
          <Text style={styles.rankNameText}>{getRankInfo(points).rankName}</Text>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{points} Points</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarWrapper}>
              <View style={[styles.progressBar, { width: `${getProgress() * 100}%` }]} />
            </View>
          </View>
          <Text style={styles.remainingPointsText}>
            {getRemainingPoints()} Points to next rank
          </Text>
        </View>
      </>
    )}

  {selectedTab === 'history' && (
  <View style={styles.historyBox}>
    <ImageBackground
      source={require('./../assets/greengradient.jpg')}
      style={styles.historyBoxBackground}
    >
      <ScrollView>
        <Text style={styles.historyHeader}>History: </Text>
        {achievements.map((achievement, index) => (
          <Text key={index} style={styles.achievementText}>
            {achievement}
          </Text>
        ))}
      </ScrollView>
    </ImageBackground>
  </View>
  )}

  {selectedTab === 'personalBest' && (
    <View style={styles.personalBestContainer}>
      <View style={styles.trophyContainer}>
        <Image source={require('./../assets/personalBest.png')} style={styles.personalBestImage}    />
      </View>
    <ImageBackground
      source={require('./../assets/greengradient.jpg')}
      style={styles.personalBestContainerBackground}
    >
      <ScrollView>
        <Text style={styles.personalBestHeader}>Personal Best: </Text>
        <Text style={styles.personalBestData}>1) June: 1000 Budget Left</Text>
        <Text style={styles.personalBestData}>2) Novemember: +500 Budget Left</Text>
        <Text style={styles.personalBestData}>3) May: +200 Budget Left</Text>
      </ScrollView>
      </ImageBackground>
    </View>
  )}

  {selectedTab === 'leaderboard' && (
  <View style={styles.leaderboardContainer}>
    <View style={styles.trophyContainer}>
       <Image source={require('./../assets/trophy.png')} style={styles.trophyImage}    />
     </View>
    <ImageBackground
      source={require('./../assets/greengradient.jpg')}
      style={styles.leaderboardContainerBackground}
    >
      <ScrollView>
        <Text style={styles.leaderboardHeader}>Leaderboard: </Text>
        {leaderboardData
    .sort((a, b) => b.points - a.points)
    .map((user, index) => (
      <View key={index} style={styles.leaderboardRow}>
        {index < 3 && (
          <Image
            source={
              index === 0
                ? require('./../assets/goldBadge.png')
                : index === 1
                ? require('./../assets/silverBadge.png')
                : index === 2
                ? require('./../assets/bronzeBadge.png')
                : null
            }
            style={styles.badgeImage}
          />
        )}
        <View style={styles.userDataContainer}>
          <Text style={styles.leaderboardData}>
            {index >= 3 ? `${index + 1}. ` : ''}
            {user.name}: {user.points} points
          </Text>
        </View>
      </View>
    ))}

      </ScrollView>
    </ImageBackground>
  </View>
)}

{showRewardButton && (
  <TouchableOpacity style={styles.rewardButton} onPress={claimReward}>
    <Text style={styles.rewardButtonText}>Claim Reward</Text>
  </TouchableOpacity>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  rankContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  rankImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',

  },
  rankBorder: {
   borderWidth: 2,
   borderColor: 'green',
   borderRadius: 50,
   overflow: 'hidden',
 },
  pointsContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  pointsText: {
    color: 'white',
    fontSize: 20,
  },
  historyHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  historyBox: {
    display: 'flex',
    flex: 1,
    margin: 10,
    marginBottom: 50,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: 'white'
  },
  achievementText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  rewardButton: {
    position: 'absolute',
    bottom: 20,
    right: 150,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
  },
  rewardButtonText: {
    color: 'white',
  },
  personalBestContainer: {
    display: 'flex',
    flex: 1,
    margin: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  personalBestHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  tabHistoryButton: {
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  tabLeaderboardButton: {
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  tabPersonalBestButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  selectedTab: {
    backgroundColor: 'green',
  },
  tabButtonText: {
    color: 'white',
  },
  rankNameText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  progressBarWrapper: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    height: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  remainingPointsText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  personalBestData:{
    color: 'white',
    padding: 5,
    fontSize: 20
  },
    leaderboardContainer: {
    flex: 1,
    padding: 10,
  },
  leaderboardHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  leaderboardData: {
  color: 'white',
  padding: 10,
  fontSize: 20,

},
  gold: {
  color: 'gold',
  padding: 10,
  fontSize: 20
  },
  silver: {
    color: 'silver',
    padding: 0,
    fontSize: 20
  },
  bronze: {
    color: '#cd7f32',
    padding: 10,
    fontSize: 20
  },
  white: {
    color: 'white',
    padding: 10,
    fontSize: 20
  },
  historyBoxBackground: {
  flex: 1,
  padding: 20,

},
personalBestContainerBackground: {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 15,
  borderRadius: 30,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: 'white'
},
leaderboardContainerBackground: {
  display: 'flex',
  flex: 1,
  padding: 10,
  borderRadius: 30,
  overflow: 'hidden',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'white'
},
trophyContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  margin: 10,
  backgroundColor: 'green',
  borderRadius: 40,
  padding: 10,
  width: 100,
  height: 100,
  overflow: 'hidden',
  alignSelf: 'center',

},
  trophyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    margin: 10
  },
  personalBestImage: {
    width: '300%',
    height: '300%',
    resizeMode: 'contain',
    margin: 10
  },
  leaderboardRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 20,
  paddingBottom: 10,
},
badgeImage: {
  width: 40,
  height: '150%',
  marginRight: 10,
},
userDataContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},






});

export default Achievement;
