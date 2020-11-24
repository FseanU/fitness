import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Slider from '@react-native-community/slider';
import { gray } from '../utils/colors'

export default function FitnessSlider({ max, unit, step, value, onChange }) {
    return (
        <View style={styles.row}>
            <Slider
              style={{flex: 1}}
              step={step}
              value={value}
              maximumValue={max}
              minimumValue={0}
              onValueChange={onChange}
            />
            <View style={styles.metricCouter}>
              <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
              <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCouter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  }
})