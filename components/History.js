import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Agenda as UdaciFitnessCalendar } from 'react-native-calendars'
import { receiveEntries, addEntry } from '../actions'
import MetricCard from './MetricCard'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { white } from '../utils/colors'

class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetchCalendarResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })
  }
  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today
        ? <Text style={styles.noDataText}>{JSON.stringify(today)}</Text>
        : <TouchableOpacity>
            <MetricCard metrics={metrics} />
          </TouchableOpacity>}
    </View>
  )

  renderEmptyDate(formattedDate) {
    return (
      <View style={styles.item}>
        <Text style={styles.noDataText}>
          You didn't log any data on this day.
        </Text>
      </View>
    )
  }

  render() {
    const { entries } = this.props

    return (   
      <UdaciFitnessCalendar 
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  }
})

function mapStateToProps (entries) {
  return {
    entries
  }
}

export default connect(mapStateToProps)(History)