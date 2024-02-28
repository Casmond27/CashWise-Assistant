import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useBudgetContext } from './../components/budgetContext';

const BudgetExpenses = ({navigation}) => {
  const [monthYear, setMonthYear] = useState('December 2023');
  const { budget, updateBudget } = useBudgetContext();
  const [newBudget, setNewBudget] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState(0);
  const [budgetHistory, setBudgetHistory] = useState([]);
  const [selectedExpenseType, setSelectedExpenseType] = useState('Food');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]); 
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('budget');
  const [currentDate, setCurrentDate] = useState('');
  const [points, setPoints] = useState(0);
  const addPoints = (amount) => {
    setPoints((prevPoints) => prevPoints + amount);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    setCurrentDate(formattedDate);
  };

  const handleAddBudget = () => {
    setModalType('budget');
    setModalVisible(true);
  };

  const handleAddExpense = () => {
    getCurrentDate();
    setModalType('expense');
    setModalVisible(true);
  };


  const handleSave = () => {
    if (modalType === 'budget') {
    if (newBudget !== '') {
      updateBudget((prevBudget) => {
        const updatedBudget = prevBudget + parseFloat(newBudget);
        getCurrentDate();
        // Add individual budget amount to the history
        setBudgetHistory((prevHistory) => [
          { amount: parseFloat(newBudget), date: currentDate },
          ...prevHistory,
        ]);
        return updatedBudget;
      });

      setNewBudget('');
      setModalVisible(false);
    }
  } else if (modalType === 'expense') {
      if (expenseAmount !== '') {
        // Update expenses list
        const newExpense = {
          type: selectedExpenseType,
          amount: parseFloat(expenseAmount),
        };
        setExpenses(prevExpenses => [...prevExpenses, { ...newExpense, date: currentDate }]);

        // Deduct expense amount from the budget
        updateBudget((prevBudget) => {
        const updatedBudget = prevBudget - parseFloat(expenseAmount);
        console.log(updatedBudget);
        return updatedBudget;
      });

        setExpenseAmount('');
        setModalVisible(false);
      }
    }
  };

  const handleSubmit = () => {

    const budgetData = {
      budget,

    };
    console.log('Submitting budget data:', budgetData);
    navigation.navigate('Achievement', { budgetData });
  }


  const handleCancel = () => {
    setNewBudget('');
    setExpenseAmount('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthYearText}>{monthYear}</Text>
        <View style={styles.progressBarContainer}>
          <Text style={styles.budgetText}>Budget:</Text>
          <View style={styles.progressBarWrapper}>
            <View style={[styles.progressBar, { width: `${(budget / 1000) * 100}%`, backgroundColor: budget < 0 ? 'red' : 'green', }]}></View>
          </View>
          <Text style={styles.amountText}>${budget}</Text>
        </View>
        <TouchableOpacity style={styles.plusButton} onPress={handleAddBudget}>
          <Text style={styles.plusButtonText}>Add Budget</Text>
        </TouchableOpacity>
      </View>

        <Text style={styles.budgetHeader}>Budget: </Text>
        <View style={styles.budgetContainer}>
        {budgetHistory.map((item, index) => (
            <Text key={index} style={styles.expenseItem}>
              {`Budget added ${item.date}: $${item.amount}`}
            </Text>
            ))}
          </View>


      <View style={styles.expensesHeaderContainer}>
        <Text style={styles.expensesHeader}>Expenses</Text>
        <TouchableOpacity style={styles.expenseButton} onPress={handleAddExpense}>
          <Text style={styles.expenseButtonText}>Add Expense</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.expenseContainer}>
          <Text style={styles.currentDate}>{currentDate}:</Text>
          {expenses.map((expense, index) => (
            <Text key={index} style={styles.expenseItem}>
              {`${expense.type}: $${expense.amount}`}
            </Text>
          ))}
        </View>



      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.plusButtonText}>Submit budget</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalType === 'budget' ? (
              <>
              <Text style={styles.modalHeaderText}>Add Budget:</Text>
                <TextInput
                  style={styles.budgetInput}
                  placeholder="Enter Additional Budget"
                  keyboardType="numeric"
                  value={newBudget}
                  onChangeText={(text) => setNewBudget(text)}
                />
              </>
            ) : (
              <>
                <Text style={styles.modalHeaderText}>Add Expense</Text>
                <Text style={styles.modalSubHeader}>Expenses Type:</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedExpenseType}
                  onValueChange={(itemValue) => setSelectedExpenseType(itemValue)}
                >
                  <Picker.Item label="Food" value="Food" icon={() => <Icon name="cutlery" size={20} color="black" />}/>
                  <Picker.Item label="Transportation" value="Transportation" />
                  <Picker.Item label="Housing" value="Housing" />
                  <Picker.Item label="Utilities" value="Utilities" />
                  <Picker.Item label="Insurance" value="Insurance" />
                  <Picker.Item label="Debt Payment" value="Debt Payment" />
                  <Picker.Item label="Personal Care" value="Personal Care" />
                  <Picker.Item label="Entertainment" value="Entertainment" />
                  <Picker.Item label="Education" value="Education" />
                </Picker>
                <Text style={styles.modalSubHeader}>Amount:</Text>
                <TextInput
                  style={styles.budgetInput}
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  value={expenseAmount}
                  onChangeText={(text) => setExpenseAmount(text)}
                />
              </>
            )}
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={handleCancel} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetText:{
    color: 'white',
    fontSize: 16,
    marginTop: 5,
    marginRight: 5
  },
  monthYearText: {
    color: 'white',
    fontSize: 20,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  progressBarWrapper: {
    width: '70%',
    backgroundColor: '#2b2b2b',
    borderRadius: 10,
    overflow: 'hidden',
    height: 10,
    marginTop: 10,
    shadowColor: '#1a1a1a',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  amountText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  plusButton: {
    marginTop: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#1a1a1a',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  plusButtonText: {
    color: 'white',
    fontSize: 14,
  },
  budgetHeader: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  },
  budgetContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#2b2b2b',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#1a1a1a',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  expensesHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  expensesHeader: {
    color: 'white',
    fontSize: 20,
  },
  expenseContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#2b2b2b',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#1a1a1a',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  currentDate: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  expenseItem: {
    color: 'white',
    fontSize: 15,
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    right: 150,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#1a1a1a',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  expenseButton: {
    right: 160,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#1a1a1a',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  expenseButtonText: {
    color: 'white'
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
  budgetInput: {
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
  picker: {
    height: 40,
    width: '100%',
    marginBottom: 90,
    color: 'black',
  },
  modalHeaderText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
});

export default BudgetExpenses;
