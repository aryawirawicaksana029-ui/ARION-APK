import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { calculatePositionSize } from '../../utils/calculator';
import { useJournal } from '../../context/JournalContext';

export default function CalculatorScreen() {
  const router = useRouter();
  const { addTrade } = useJournal();

  const [accountBalance, setAccountBalance] = useState('1000');
  const [riskPercent, setRiskPercent] = useState('1');
  const [entryPrice, setEntryPrice] = useState('65000');

  const [useSL, setUseSL] = useState(true);
  const [stopLossPrice, setStopLossPrice] = useState('64000');

  const [useTP, setUseTP] = useState(false);
  const [takeProfitPrice, setTakeProfitPrice] = useState('68000');

  // Run calculator engine (memoized to avoid recalc on every render)
  const result = useMemo(() => {
    return calculatePositionSize({
      totalCapital: parseFloat(accountBalance || '0'),
      riskPercentage: parseFloat(riskPercent || '0'),
      entryPrice: parseFloat(entryPrice || '0'),
      stopLossPrice: useSL ? parseFloat(stopLossPrice || '0') : undefined,
      takeProfitPrice: useTP ? parseFloat(takeProfitPrice || '0') : undefined,
    });
  }, [accountBalance, riskPercent, entryPrice, useSL, stopLossPrice, useTP, takeProfitPrice]);

  const handleSaveToJournal = () => {
    const entry = parseFloat(entryPrice || '0');
    if (entry <= 0) {
      Alert.alert("Error", "Harga Entry harus lebih dari 0.");
      return;
    }

    Alert.alert(
      "Simpan ke Jurnal",
      `Simpan trade ini ke jurnal?\n\nEntry: $${entry.toLocaleString()}\nRisk: $${result.capitalAtRisk.toFixed(2)}${result.riskRewardRatio ? `\nRRR: 1:${result.riskRewardRatio.toFixed(2)}` : ''}`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Simpan",
          onPress: () => {
            addTrade({
              pair: 'Pair',
              direction: 'LONG',
              entryPrice: entry,
              stopLossPrice: useSL ? parseFloat(stopLossPrice || '0') : null,
              takeProfitPrice: useTP ? parseFloat(takeProfitPrice || '0') : null,
              pnl: 0,
              status: 'OPEN',
              note: '',
              capitalAtRisk: result.capitalAtRisk,
              riskRewardRatio: result.riskRewardRatio,
            });
            Alert.alert("Berhasil!", "Trade berhasil disimpan ke Jurnal.", [
              { text: "Lihat Jurnal", onPress: () => router.push('/(tabs)/journal') },
              { text: "OK" },
            ]);
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-main p-4">
      <Text className="text-slate-50 text-2xl font-bold mb-6 mt-2">Risk Calculator</Text>

      <View className="bg-card rounded-2xl p-5 border border-subtle mb-6 shadow-sm">

        {/* Input Form */}
        <View className="mb-4">
          <Text className="text-slate-400 text-sm mb-2 font-medium">Total Modal ($)</Text>
          <TextInput
            className="bg-main border border-subtle rounded-xl p-3 text-slate-50 font-mono text-lg"
            keyboardType="numeric"
            value={accountBalance}
            onChangeText={setAccountBalance}
            placeholder="1000"
            placeholderTextColor="#64748B"
          />
        </View>

        <View className="mb-4 flex-row justify-between">
          <View className="flex-1 mr-2">
            <Text className="text-slate-400 text-sm mb-2 font-medium">Risk (%)</Text>
            <TextInput
              className="bg-main border border-subtle rounded-xl p-3 text-slate-50 font-mono text-lg"
              keyboardType="numeric"
              value={riskPercent}
              onChangeText={setRiskPercent}
              placeholder="1"
              placeholderTextColor="#64748B"
            />
          </View>
          <View className="flex-1 ml-2">
            <Text className="text-slate-400 text-sm mb-2 font-medium">Harga Entry</Text>
            <TextInput
              className="bg-main border border-subtle rounded-xl p-3 text-slate-50 font-mono text-lg"
              keyboardType="numeric"
              value={entryPrice}
              onChangeText={setEntryPrice}
              placeholder="65000"
              placeholderTextColor="#64748B"
            />
          </View>
        </View>

        {/* Toggles for SL and TP */}
        <View className="mb-4 p-4 border border-subtle rounded-xl bg-main/50">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-slate-300 font-semibold">Gunakan Stop Loss (SL)</Text>
            <Switch
              value={useSL}
              onValueChange={setUseSL}
              trackColor={{ false: "#44403C", true: "#D97757" }}
              thumbColor={"#F8FAFC"}
            />
          </View>
          {useSL && (
            <TextInput
              className="bg-card border border-subtle rounded-xl p-3 text-loss font-mono text-lg mb-2"
              keyboardType="numeric"
              value={stopLossPrice}
              onChangeText={setStopLossPrice}
              placeholder="Harga SL"
              placeholderTextColor="#64748B"
            />
          )}

          <View className="w-full h-px bg-subtle my-2" />

          <View className="flex-row justify-between items-center mb-3 mt-1">
            <Text className="text-slate-300 font-semibold">Gunakan Take Profit (TP)</Text>
            <Switch
              value={useTP}
              onValueChange={setUseTP}
              trackColor={{ false: "#44403C", true: "#D97757" }}
              thumbColor={"#F8FAFC"}
            />
          </View>
          {useTP && (
            <TextInput
              className="bg-card border border-subtle rounded-xl p-3 text-profit font-mono text-lg"
              keyboardType="numeric"
              value={takeProfitPrice}
              onChangeText={setTakeProfitPrice}
              placeholder="Harga TP"
              placeholderTextColor="#64748B"
            />
          )}
        </View>

        {/* Output Calculation */}
        <View className="bg-main rounded-xl p-5 border border-subtle mt-2 shadow-sm">
          <View className="flex-row justify-between mb-4 pb-4 border-b border-subtle/50">
            <Text className="text-slate-400">Nilai Resiko:</Text>
            <Text className="text-loss font-mono text-lg font-bold">${result.capitalAtRisk.toFixed(2)}</Text>
          </View>

          {/* SL/TP Distance & RRR */}
          {(result.distanceToSL !== null || result.distanceToTP !== null) && (
            <View className="mb-4 pb-4 border-b border-subtle/50">
              {result.distanceToSL !== null && (
                <View className="flex-row justify-between mb-2">
                  <Text className="text-slate-400 text-sm">Jarak ke SL:</Text>
                  <Text className="text-loss font-mono font-semibold">{result.distanceToSL.toFixed(2)}%</Text>
                </View>
              )}
              {result.distanceToTP !== null && (
                <View className="flex-row justify-between mb-2">
                  <Text className="text-slate-400 text-sm">Jarak ke TP:</Text>
                  <Text className="text-profit font-mono font-semibold">{result.distanceToTP.toFixed(2)}%</Text>
                </View>
              )}
              {result.riskRewardRatio !== null && (
                <View className="flex-row justify-between">
                  <Text className="text-slate-400 text-sm">Risk:Reward (RRR):</Text>
                  <Text className="text-primary font-mono font-bold">1 : {result.riskRewardRatio.toFixed(2)}</Text>
                </View>
              )}
            </View>
          )}

          <Text className="text-slate-300 font-semibold mb-3">Rekomendasi Position Size</Text>
          <View className="flex-row justify-between mb-3">
            <View>
              <Text className="text-emerald-400 text-xs mb-1 font-bold">KONSERVATIF ({result.leverageConservative}x)</Text>
              <Text className="text-slate-50 font-mono text-xl font-bold">
                {result.positionSizeConservative > 0 ? result.positionSizeConservative.toFixed(4) : '0.0000'}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-primary text-xs mb-1 font-bold">AGRESIF ({result.leverageAggressive}x)</Text>
              <Text className="text-slate-50 font-mono text-xl font-bold">
                {result.positionSizeAggressive > 0 ? result.positionSizeAggressive.toFixed(4) : '0.0000'}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          className="bg-primary py-4 rounded-xl items-center mt-6 shadow-sm"
          onPress={handleSaveToJournal}
        >
          <Text className="text-white font-bold text-lg">Simpan ke Jurnal</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}
