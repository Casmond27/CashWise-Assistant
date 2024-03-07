// ResultCalculator.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const closeResultModal = () => {
  setIsResultModalVisible(false);
};



const ResultCalculator = ({ calculatedData, retirementSavings, requiredSavings, closeModal }) => {

  const [selectedCurrency, setSelectedCurrency] = useState('SGD');
  const [conversionRate, setConversionRate] = useState(null);
  const [currencies, setCurrencies] = useState(['AUD','CAD','JPY','USD', 'CNY', 'SGD']);
  const [apiKey] = useState('e24967beb7369cdfa6cc3114e0e0d1b8');

  useEffect(() => {
    fetchConversionRate();
  }, []);

  const fetchConversionRate = async () => {
    try {
      const response = await fetch(
        `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`
      );
      const data = await response.json();
      console.log('API Response:', data);

      if (data.success) {
        const rates = data.rates;
        console.log('Conversion Rates:', rates);
        setConversionRate(rates);
      } else {
        console.error('API Error:', data.error.info);

      }
    } catch (error) {
      console.error('Error fetching conversion rate:', error);

    }
  };


  const convertCurrency = () => {
    if (conversionRate === null) {
      Alert.alert('Conversion rate not available. Please try again later.');
      return;
    }
     console.log('Selected Currency:', selectedCurrency);
    const convertedValue = (parseFloat(retirementSavings) * conversionRate).toFixed(2);
    setConvertedRetirementSavings(convertedValue);

    // Update required savings as well
    if (requiredSavings !== null) {
      const convertedRequiredSavings = (parseFloat(requiredSavings) * conversionRate).toFixed(2);
      setRequiredSavings(convertedRequiredSavings);
    }

    // Update the currency in calculatedData if it's already calculated
    if (calculatedData.length > 0) {
      const updatedCalculatedData = calculatedData.map(item => {
        return {
          ...item,
          currency: selectedCurrency
        };
      });
      setCalculatedData(updatedCalculatedData);
    }
  };

  const convertAmountToSelectedCurrency = (amount, rate) => {
   return (amount * rate).toFixed(2);
 };

 const renderCurrencyAmount = (amount) => {
  if (!conversionRate) {
    return 'Loading...';
  }


  let convertedAmount;
  switch (selectedCurrency) {
    case 'SGD':
      convertedAmount = amount * conversionRate.SGD;
      break;
    case 'USD':
      convertedAmount = amount * conversionRate.USD;
      break;
    case 'AUD':
      convertedAmount = amount * conversionRate.AUD;
      break;
    case 'CAD':
      convertedAmount = amount * conversionRate.CAD;
      break;
    case 'JPY':
      convertedAmount = amount * conversionRate.JPY;
      break;
    case 'CNY':
      convertedAmount = amount * conversionRate.CNY;
      break;
    default:
      convertedAmount = amount;
  }

  return `${selectedCurrency === 'AUD' ? 'A$' : selectedCurrency === 'CAD' ? 'C$' : selectedCurrency === 'JPY' || selectedCurrency === 'CNY' ? '¥' : '$'}${convertedAmount.toFixed(2)}`;
};




 const renderItem = ({ item }) => {
   return (
     <View style={styles.tableRow}>
       <Text style={styles.tableCell}>{item.age}</Text>
       <Text style={styles.tableCell}>{renderCurrencyAmount(convertAmountToSelectedCurrency(item.retirementSavings, 1))}</Text>
       <Text style={styles.tableCell}>{renderCurrencyAmount(convertAmountToSelectedCurrency(item.requiredSavings, 1))}</Text>*

       <Text style={styles.tableCell}>${(retirementSavings)}</Text>
       <Text style={styles.tableCell}>${(requiredSavings)}</Text>
     </View>
   );
 };
  return (
    <SafeAreaView>
      <View style={styles.modalContent}>
        <Text style={styles.modalHeaderText}>Results:</Text>

        {/* Currency Selection */}
        <View style={styles.currencyContainer}>
          <Text style={styles.label}>Currency: </Text>
          <Picker
            selectedValue={selectedCurrency}
            style={styles.pickerContainer}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
          >
            <Picker.Item label="SGD" value="SGD" />
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="AUD" value="AUD" />
            <Picker.Item label="CAD" value="CAD" />
            <Picker.Item label="JPY" value="JPY" />
            <Picker.Item label="CNY" value="CNY" />
          </Picker>
        </View>


        <Text style={styles.resultText}>
          Estimated Retirement Savings: {renderCurrencyAmount(convertAmountToSelectedCurrency(retirementSavings, 1))}
        </Text>

        {requiredSavings !== null && (
          <Text style={styles.resultText}>
          Savings Needed at Retirement Age: {renderCurrencyAmount(convertAmountToSelectedCurrency(requiredSavings, 1))}
          </Text>
        )}

        {/* Graphical Representation */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.resultText}>Graphical Representation:</Text>
          <View>
            <Text style={styles.label}>Estimated Retirement Savings:</Text>
            <View style={styles.progressBarWrapper}>
              <View
                style={[
                  styles.progressBar,
                  {
                  width: `${(parseFloat(renderCurrencyAmount(retirementSavings)) / 100000000) * 100 + 10}%`,
                  },
                ]}
              >
                <Text style={styles.progressBarText}>{renderCurrencyAmount(retirementSavings)}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.label}>Savings Needed:</Text>
          <View style={styles.progressBarWrapper}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${(parseFloat(renderCurrencyAmount(requiredSavings)) / 100000000) * 100 + 10}%`,
                },
              ]}
            >
              <Text style={styles.progressBarText}>{renderCurrencyAmount(requiredSavings)}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
          <Text style={styles.closeModalButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 20,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  resultText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  progressBarWrapper: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  progressBarText: {
    color: 'white',
    paddingRight: 5,
  },
  closeModalButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeModalButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerContainer: {
  width: '60%',
  marginLeft: 10,
  borderRadius: 10,
  backgroundColor: '#e0e0e0',
},
pickerItem: {
  width: '200',
  height: 100,
  fontSize: 16,
},


});

export default ResultCalculator;
