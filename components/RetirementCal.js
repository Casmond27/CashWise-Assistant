import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ResultCalculator from './../components/calculatorResult';

const RetirementCal = () => {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [lifeExpectancy, setLifeExpectancy] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [rateOfReturn, setRateOfReturn] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [retirementSavings, setRetirementSavings] = useState(null);
  const [requiredSavings, setRequiredSavings] = useState(null);
  const [yearlySalary, setYearlySalary] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [convertedRetirementSavings, setConvertedRetirementSavings] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [calculatedData, setCalculatedData] = useState([]);


  const ModalContent = () => (
  <View style={styles.modalContent}>
    <Text style={styles.modalHeaderText}>
      Understanding Retirement Calculator Output:
    </Text>

    <Text style={styles.modalSubHeader}>Future Value of Contributions:</Text>
    <Text style={styles.modalText}>
      This value represents the estimated future value of your monthly contributions to your retirement savings. It accounts for the compounding effect of your monthly contributions with the specified rate of return over the years leading up to your retirement age.
    </Text>

    <Text style={styles.modalSubHeader}>Future Value of Current Savings:</Text>
    <Text style={styles.modalText}>
      This value represents the estimated future value of your existing savings (initial investment) at the time of retirement. It takes into account the impact of inflation on the current savings.
    </Text>

    <Text style={styles.modalSubHeader}>Total Future Value:</Text>
    <Text style={styles.modalText}>
      This value is the sum of the future value of contributions and the future value of current savings. It represents the total estimated retirement savings at the time of retirement.
    </Text>

    <Text style={styles.modalSubHeader}>Required Savings at Retirement Age:</Text>
    <Text style={styles.modalText}>
      This value represents the amount of savings needed at your planned retirement age to meet your financial goals. It takes into account the future value of contributions, the future value of current savings, and adjusts for inflation.
    </Text>

    <TouchableOpacity
      style={styles.closeModalButton}
      onPress={() => setIsModalVisible(false)}
    >
      <Text style={styles.closeModalButtonText}>Close</Text>
    </TouchableOpacity>
  </View>
);


  const openResultModal = () => {
    setIsResultModalVisible(true);
  };

  const closeResultModal = () => {
    setIsResultModalVisible(false);
  };

  const calculateRetirementSavings = () => {
    // Parse input values
    const age = parseInt(currentAge);
    const retiringAge = parseInt(retirementAge);
    const expectancyAge = parseInt(lifeExpectancy);
    const currentSavingsValue = parseFloat(currentSavings);
    const monthlyContribute = parseFloat(monthlyContribution);
    const rateReturn = parseFloat(rateOfReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const yearlySalaryValue = parseFloat(yearlySalary);
    const monthlyExpensesValue = parseFloat(monthlyExpenses);
    const debtValue = parseFloat(debtAmount);

    // Calculate future value of monthly contributions with inflation adjustment
    const numOfYears = retiringAge - age;
    const totalMonths = numOfYears * 12;
    const monthlyInterestRate = rateReturn / 12;
    const futureValueContributions =
        monthlyContribute *
        ((Math.pow(1 + monthlyInterestRate, totalMonths) - 1) /
            monthlyInterestRate);

    // Calculate future value of current savings with inflation adjustment
    const futureValueSavings = currentSavingsValue * Math.pow(1 + inflation, numOfYears);

    // Calculate future value of income after subtracting monthly expenses
    const adjustedYearlyIncome = yearlySalaryValue - (monthlyExpensesValue * 12);
    const futureValueIncome = adjustedYearlyIncome * (Math.pow(1 + inflation, numOfYears) - 1) / (rateReturn / 12);

    // Calculate future value of adjusted monthly contributions with inflation adjustment
    const futureValueAdjustedContributions =
        futureValueIncome *
        ((Math.pow(1 + monthlyInterestRate, totalMonths) - 1) /
            monthlyInterestRate);

    // Sum up the future values with inflation adjustment
    let futureValue = futureValueSavings + futureValueAdjustedContributions;

    // Adjust future value based on debt
    if (debtValue > 0) {
        futureValue -= debtValue;
    }

    // Set the state with the calculated values
    setRetirementSavings(futureValue.toFixed(2));

    const requiredSavingsValue =
        futureValue / Math.pow(1 + monthlyInterestRate, totalMonths);
    setRequiredSavings(requiredSavingsValue.toFixed(2));

    // Set the state with the calculated values
    setCalculatedData(calculatedData);
};




  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const clearInputs = () => {
  setCurrentAge('');
  setRetirementAge('');
  setLifeExpectancy('');
  setCurrentSavings('');
  setMonthlyContribution('');
  setRateOfReturn('');
  setInflationRate('');
  setYearlySalary('');
  setMonthlyExpenses('');
  setDebtAmount('');
  setRetirementSavings(null);
  setRequiredSavings(null);
};

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.inputContainer}
        activeOpacity={1}
        onPress={handleTouchablePress}
      >
      {/* Result Container */}
      <View style={styles.resultContainer}>
            <Text style={styles.label}>Advance Retirement Calculator</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <View>
            {/* Personal Information Category */}
            <Text style={styles.categoryLabel}>Personal Information:</Text>
            <Text style={styles.label}>Current Age:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter current age"
              value={currentAge}
              onChangeText={(text) => setCurrentAge(text)}
            />

            <Text style={styles.label}>Planned Retirement Age:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter planned retirement age"
              value={retirementAge}
              onChangeText={(text) => setRetirementAge(text)}
            />

            <Text style={styles.label}>Life Expectancy:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter life expectancy"
              value={lifeExpectancy}
              onChangeText={(text) => setLifeExpectancy(text)}
            />
          </View>

          <View>
            {/* Savings Category */}
            <Text style={styles.categoryLabel}>Savings:</Text>
            <Text style={styles.label}>Current Savings ($):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter current savings"
              value={currentSavings}
              onChangeText={(text) => setCurrentSavings(text)}
            />

            <Text style={styles.label}>Monthly Contribution ($):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter monthly contribution"
              value={monthlyContribution}
              onChangeText={(text) => setMonthlyContribution(text)}
            />
          </View>

          <View>
            {/* Investment Details Category */}
            <Text style={styles.categoryLabel}>Investment Details:</Text>
            <Text style={styles.label}>
              Rate of Return on Investment (%):
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter rate of return"
              value={rateOfReturn}
              onChangeText={(text) => setRateOfReturn(text)}
            />

            <Text style={styles.label}>Inflation Rate (%):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter inflation rate"
              value={inflationRate}
              onChangeText={(text) => setInflationRate(text)}
            />
          </View>

          <View>
          {/* Income Category */}
          <Text style={styles.categoryLabel}>Income:</Text>
          <Text style={styles.label}>Yearly Salary ($):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter yearly salary"
            value={yearlySalary}
            onChangeText={(text) => setYearlySalary(text)}
          />

          {/* Expenses Category */}
          <Text style={styles.categoryLabel}>Expenses:</Text>
          <Text style={styles.label}>Monthly Expenses ($):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter monthly expenses"
            value={monthlyExpenses}
            onChangeText={(text) => setMonthlyExpenses(text)}
          />
        </View>
        <View>
          {/* Debt Category */}
          <Text style={styles.categoryLabel}>Debt:</Text>
          <Text style={styles.label}>Debt Amount ($):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter debt amount"
            value={debtAmount}
            onChangeText={(text) => setDebtAmount(text)}
          />
        </View>



        </ScrollView>

        <Modal
       animationType="slide"
       transparent={true}
       visible={isResultModalVisible}
       onRequestClose={closeResultModal}
     >
       <View style={styles.modalContainer}>
           <ResultCalculator
            calculatedData={calculatedData}
            retirementSavings={retirementSavings}
            requiredSavings={requiredSavings}
            currentAge={parseInt(currentAge)}
            retirementAge={parseInt(retirementAge)}
            closeModal={closeResultModal}
          />

       </View>
      </Modal>


        {/* Calculation Button */}
      <View style={styles.buttonsContainer}>

        <TouchableOpacity
        style={styles.calculateButton}
        onPress={() => {
          calculateRetirementSavings();
          openResultModal(); // Show the result modal after calculation
        }}
      >
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>

          {/* Clear Button */}
          <TouchableOpacity
          style={styles.clearButton}
          onPress={clearInputs}
          >
        <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>

      {/* Question Mark Button */}
        <TouchableOpacity
          style={styles.questionMarkButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.questionMarkButtonText}>?</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>


    {/* Modal */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <ModalContent />
      </View>
    </Modal>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  categoryLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 20,
    margin: 40,
    borderRadius: 20,
    width: '100%',
  },
  scrollView: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    color: 'white',
    paddingHorizontal: 10,
  },
  result: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
  resultContainer: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    minHeight: 40,
    minWidth: 300,
    marginBottom: 10
  },
  calculatorInput: {
    height: 40,
    width: 100,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    paddingHorizontal: 10,
  },
  calculateButton: {
   backgroundColor: 'green',
   paddingVertical: 12,
   paddingHorizontal: 20,
   borderRadius: 10,
   marginTop: 20,
   marginRight: 10,
   elevation: 3,
 },
 calculateButtonText: {
   color: 'white',
   fontSize: 16,
   fontWeight: 'bold',
 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 5,
    elevation: 3,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'green',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2
  },

  closeModalButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,

  },

  closeModalButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  questionMarkButton: {
    backgroundColor: '#222222',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginLeft: 20,
    marginBottom: 10,
    bottom: -20,
    right:  -30
  },
  questionMarkButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // Adjust the color as needed
  },
  modalSubHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white', // Adjust the color as needed
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    color: 'white', // Adjust the color as needed
  },
  convertCurrencyButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 10
  },
  convertCurrencyButtonText: {
    color: 'white',
    fontSize: 12
  },
  currencyContainer: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'flex-start', // Align items at the start of the row
    alignItems: 'center', // Align items vertically
    bottom: -20,
    left: -100
  },

  currencyPicker: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    marginRight: 10,
    padding: 10
  },
  currencyPickerText: {
    color: 'black',
  },
  currencyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  currencyText: {
    fontSize: 16,
    color: 'black',

  },
});



export default RetirementCal;
