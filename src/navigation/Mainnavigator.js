import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './Bottomtabnavigator';
import EMIDetailsScreen from '../screens/Emidetailsscreen';
import LoanDetailsScreen from '../screens/Loandetailsscreen';
import EMIRepaymentScheduleScreen from '../screens/Emirepaymentschedulescreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#1a1a1a' },
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="EMIDetails" component={EMIDetailsScreen} />
      <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
      <Stack.Screen name="EmiRepaymentSchedule" component={EMIRepaymentScheduleScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;