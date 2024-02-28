import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView, TouchableOpacity, Modal, TextInput, Button, Image } from 'react-native';
import { getRankInfo } from './../components/rankInfo';
import { usePointContext } from './../components/pointContext';
import { useBudgetContext } from './../components/budgetContext';

const Home = ({route}) => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [userName, setUserName] = useState('Casmond');
  const [userGoal, setUserGoal] = useState('Your Goal Here');
  const { points } = usePointContext();
  const { budget } = useBudgetContext();

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateString = now.toLocaleDateString('en-US', dateOptions);
      setCurrentDate(dateString);
    };

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
    };

    updateDate();
    updateTime();


    const timeInterval = setInterval(() => {
      updateDate();
      updateTime();
    }, 60000);

    const quotes = [
      "We cannot solve problems with the kind of thinking we employed when we came up with them. - Albert Einstein",
      "Learn as if you will live forever, live like you will die tomorrow. - Mahatma Gandhi",
      "Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too. - Mark Twain",
    ];

    const setRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setMotivationalQuote(quotes[randomIndex]);
    };

    setRandomQuote();

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

    const [isModalVisible, setModalVisible] = useState(false);
    const [newGoalText, setNewGoalText] = useState('');

    const handleAddGoal = () => {
      setModalVisible(true);
    };

    const handleSaveGoal = () => {
      setUserGoal(newGoalText);
      setModalVisible(false);
    };

    const handleCancelGoal = () => {
      setModalVisible(false);
    };

  const { rankImage, rankName } = getRankInfo(points);
  return (
    <ImageBackground
      source={require('./../assets/tree-money.jpg')}
      style={styles.backgroundImage}
      onError={(e) => console.log('Error loading image', e.nativeEvent.error)}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.dateText}>Date: {currentDate}</Text>
          <Text style={styles.timeText}>Time: {currentTime}</Text>
          <Text style={styles.welcomeText}>Welcome {userName}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.containerRow}>
            <View style={styles.customContainer}>
            <ImageBackground
                source={require('./../assets/greengradient.jpg')}
                style={styles.quoteBackgroundImage}

              />
              <ScrollView style={styles.scroll}>
              <Text style={styles.customHeaderText}>Quote of the Day</Text>
              <Text style={styles.customText}>{motivationalQuote}</Text>
              </ScrollView>
            </View>

            <View style={styles.customContainer}>
            <ImageBackground
                source={require('./../assets/greengradient.jpg')}
                style={styles.quoteBackgroundImage}

              />
             <ScrollView style={styles.scroll}>
              <Text style={styles.customHeaderText}>Saving Goal</Text>
              <Text style={styles.customText}>{userGoal}</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>

          <View style={styles.containerRow}>
            <View style={styles.customContainer}>
            <ImageBackground
                source={require('./../assets/greengradient.jpg')}
                style={styles.quoteBackgroundImage}

              />
              <Text style={styles.customHeaderText}>Assets:</Text>
              <Text style={styles.assetsValue}>${budget}</Text>
            </View>

            <View style={styles.customContainer}>
            <ImageBackground
                source={require('./../assets/greengradient.jpg')}
                style={styles.quoteBackgroundImage}

              />
              <Text style={styles.customHeaderText}>Current Rank:</Text>
              <Image source={rankImage} style={styles.rankImage} />
              <Text style={styles.rankNameText}>{rankName}</Text>
            </View>
          </View>
        </View>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>Add New Goal</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Goal"
              value={newGoalText}
              onChangeText={(text) => setNewGoalText(text)}
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleSaveGoal} />
              <Button title="Cancel" onPress={handleCancelGoal} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 0,
    position: 'relative',
  },
  topContainer: {
    zIndex: 1,
  },
  dateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  timeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
  },
  welcomeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 5,
    marginLeft: 10,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'flex-start',
    marginTop: 90,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 20,
  },
  containerRow: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginTop: 10,
   marginBottom: 20
 },
 customContainer: {
   maxHeight:200,
   width: "48%",
   position: "relative",
   borderRadius: 30,
   display: "flex",
   flexDirection: "column",
   justifyContent: "center",
   alignItems: "center",
   overflow: "hidden",

 },
 scroll: {
   padding: 20,
 },
  customHeaderText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  customText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#2b2b2b',
    borderRadius: 80,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    right: -10,
    bottom: -100,

    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  modalHeaderText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  modalInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  quoteBackgroundImage: {
    width: '100%',
    height: '100%',
    position: "absolute",
    top: 0,
    left: 0,

  },
  rankImage: {
   width: 120,
   height: 120,
   resizeMode: 'contain', 
   borderRadius: 50
 },
 rankNameText: {
   color: 'white',
   padding: 10,
   fontSize: 20
 },
 assetsValue: {
   color: 'white',
   fontSize: 24,
   padding: 10
 }
};



export default Home;
