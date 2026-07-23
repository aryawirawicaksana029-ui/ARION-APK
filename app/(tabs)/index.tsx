import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen() {
  const [winstreak, setWinstreak] = useState(12);
  const [xp, setXp] = useState(450);
  const xpMax = 1000;

  return (
    <ScrollView className="flex-1 bg-main p-4">
      {/* Header Section */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-slate-400 text-sm">Welcome back,</Text>
          <Text className="text-slate-50 text-2xl font-bold">Novice Trader</Text>
        </View>
        <View className="flex-row items-center bg-card px-3 py-1.5 rounded-full border border-subtle">
          <FontAwesome5 name="fire" size={16} color="#F97316" />
          <Text className="text-slate-50 font-bold ml-2">{winstreak}</Text>
        </View>
      </View>

      {/* XP Progress Card */}
      <View className="bg-card rounded-2xl p-5 mb-6 border border-subtle">
        <View className="flex-row justify-between items-end mb-2">
          <Text className="text-slate-100 font-semibold text-lg">Level 2</Text>
          <Text className="text-slate-400 text-sm">{xp} / {xpMax} XP</Text>
        </View>
        <View className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <View 
            className="h-full bg-xp" 
            style={{ width: `${(xp / xpMax) * 100}%` }}
          />
        </View>
      </View>

      {/* Daily Task Card */}
      <View className="bg-card rounded-2xl p-5 border border-subtle mb-6">
        <View className="flex-row items-center mb-3">
          <View className="bg-primary/20 p-3 rounded-full mr-4">
            <FontAwesome5 name="tasks" size={20} color="#D97757" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-100 font-semibold text-lg">Daily Quiz</Text>
            <Text className="text-slate-400 text-sm">Identify 3 Bullish Patterns</Text>
          </View>
        </View>
        <TouchableOpacity 
          className="bg-primary py-3 px-4 rounded-xl items-center"
          onPress={() => setWinstreak(winstreak + 1)}
        >
          <Text className="text-white font-semibold">Start Quiz (+50 XP)</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats Grid */}
      <Text className="text-slate-100 font-semibold text-lg mb-4">Quick Stats</Text>
      <View className="flex-row justify-between">
        <View className="bg-card p-4 rounded-2xl border border-subtle flex-1 mr-2">
          <Text className="text-slate-400 text-xs mb-1">Win Rate</Text>
          <Text className="text-profit font-mono text-xl font-bold">64.5%</Text>
        </View>
        <View className="bg-card p-4 rounded-2xl border border-subtle flex-1 ml-2">
          <Text className="text-slate-400 text-xs mb-1">Profit Factor</Text>
          <Text className="text-profit font-mono text-xl font-bold">1.8</Text>
        </View>
      </View>
    </ScrollView>
  );
}
