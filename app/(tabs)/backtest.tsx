import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function BacktestScreen() {
  return (
    <ScrollView className="flex-1 bg-main p-4">
      <Text className="text-slate-50 text-2xl font-bold mb-4">Backtest Engine</Text>

      {/* Mockup of TradingView Chart */}
      <View className="bg-card h-64 rounded-2xl border border-subtle overflow-hidden mb-6 justify-center items-center">
        {/* Placeholder for actual Lightweight Charts webview */}
        <FontAwesome5 name="chart-area" size={64} color="#334155" />
        <Text className="text-slate-400 mt-4 font-mono">TradingView Lightweight Charts</Text>
        <Text className="text-slate-500 text-xs">(Mockup Placeholder)</Text>
      </View>

      {/* Strategy Control Panel */}
      <View className="bg-card rounded-2xl p-5 border border-subtle mb-6">
        <Text className="text-slate-100 font-semibold text-lg mb-4">Strategy Parameters</Text>
        
        <View className="flex-row justify-between mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-slate-400 text-sm mb-1">Asset Pair</Text>
            <View className="bg-main border border-subtle rounded-xl p-3">
              <Text className="text-slate-50 font-mono">BTC/USDT</Text>
            </View>
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-slate-400 text-sm mb-1">Timeframe</Text>
            <View className="bg-main border border-subtle rounded-xl p-3">
              <Text className="text-slate-50 font-mono">1H</Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between mb-6">
          <View className="flex-1 mr-2">
            <Text className="text-slate-400 text-sm mb-1">Starting Balance</Text>
            <View className="bg-main border border-subtle rounded-xl p-3">
              <Text className="text-slate-50 font-mono">$10,000</Text>
            </View>
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-slate-400 text-sm mb-1">Risk per Trade</Text>
            <View className="bg-main border border-subtle rounded-xl p-3">
              <Text className="text-slate-50 font-mono">1%</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity className="bg-primary py-4 rounded-xl items-center flex-row justify-center">
          <FontAwesome5 name="play" size={16} color="white" />
          <Text className="text-white font-bold text-lg ml-2">Run Backtest</Text>
        </TouchableOpacity>
      </View>

      {/* Mock Results */}
      <View className="bg-card rounded-2xl p-5 border border-emerald-500/30 mb-8">
        <Text className="text-emerald-400 font-bold mb-3">Latest Result: MA Crossover</Text>
        <View className="flex-row justify-between">
          <View>
            <Text className="text-slate-400 text-xs">Total Trades</Text>
            <Text className="text-slate-50 font-mono font-bold">142</Text>
          </View>
          <View>
            <Text className="text-slate-400 text-xs">Win Rate</Text>
            <Text className="text-slate-50 font-mono font-bold">58.5%</Text>
          </View>
          <View>
            <Text className="text-slate-400 text-xs">Net Profit</Text>
            <Text className="text-profit font-mono font-bold">+$2,450</Text>
          </View>
        </View>
      </View>
      
    </ScrollView>
  );
}
