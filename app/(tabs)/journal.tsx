import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useJournal } from '../../context/JournalContext';
import { Trade } from '../../types/types';

export default function JournalScreen() {
  const { trades, isLoading, addTrade, updateTrade, deleteTrade } = useJournal();

  // --- Add Modal State ---
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newPair, setNewPair] = useState('');
  const [newDirection, setNewDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [newPnl, setNewPnl] = useState('');
  const [newNote, setNewNote] = useState('');

  // --- Detail/Edit Modal State ---
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [editPair, setEditPair] = useState('');
  const [editPnl, setEditPnl] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editStatus, setEditStatus] = useState<'WIN' | 'LOSS' | 'BEP' | 'OPEN'>('OPEN');

  // --- Handlers ---
  const handleAddTrade = () => {
    const pnlValue = parseFloat(newPnl || '0');
    const status = pnlValue > 0 ? 'WIN' : pnlValue < 0 ? 'LOSS' : 'BEP';
    addTrade({
      pair: newPair || 'Pair',
      direction: newDirection,
      entryPrice: 0,
      stopLossPrice: null,
      takeProfitPrice: null,
      pnl: pnlValue,
      status,
      note: newNote,
      capitalAtRisk: null,
      riskRewardRatio: null,
    });
    // Reset form
    setNewPair('');
    setNewDirection('LONG');
    setNewPnl('');
    setNewNote('');
    setAddModalVisible(false);
  };

  const openDetail = (trade: Trade) => {
    setSelectedTrade(trade);
    setEditPair(trade.pair);
    setEditPnl(trade.pnl.toString());
    setEditNote(trade.note);
    setEditStatus(trade.status);
    setDetailModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!selectedTrade) return;
    const pnlValue = parseFloat(editPnl || '0');
    updateTrade(selectedTrade.id, {
      pair: editPair || 'Pair',
      pnl: pnlValue,
      note: editNote,
      status: editStatus,
    });
    setDetailModalVisible(false);
  };

  const handleDeleteTrade = (id: number) => {
    Alert.alert(
      "Hapus Jurnal",
      "Apakah Anda yakin ingin menghapus trade ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            deleteTrade(id);
            setDetailModalVisible(false);
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-main items-center justify-center">
        <ActivityIndicator size="large" color="#D97757" />
        <Text className="text-slate-400 mt-4">Memuat jurnal...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-main">
      <ScrollView className="flex-1 p-4">
        <View className="flex-row justify-between items-center mb-6 mt-2">
          <Text className="text-slate-50 text-2xl font-bold">Trade Journal</Text>
          <TouchableOpacity
            className="bg-primary/20 border border-primary/50 px-4 py-2 rounded-xl flex-row items-center"
            onPress={() => alert('AI is reviewing your recent trades...')}
          >
            <FontAwesome5 name="robot" size={16} color="#D97757" />
            <Text className="text-primary font-semibold ml-2">AI Review</Text>
          </TouchableOpacity>
        </View>

        {trades.length === 0 && (
          <View className="bg-card rounded-2xl p-8 border border-subtle items-center">
            <FontAwesome5 name="book-open" size={40} color="#44403C" />
            <Text className="text-slate-400 mt-4 text-center">Belum ada trade. Tap + untuk menambah jurnal pertamamu!</Text>
          </View>
        )}

        {trades.map((trade, index) => (
          <TouchableOpacity
            key={trade.id}
            className="bg-card rounded-2xl p-5 mb-4 border border-subtle shadow-sm"
            onPress={() => openDetail(trade)}
          >
            {/* Header: Trade #X, Pair, Tanggal (Same Font Size) */}
            <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-subtle/50">
              <View className="flex-row items-center">
                <Text className="text-slate-300 text-sm font-semibold mr-2">Trade #{trades.length - index}</Text>
                <Text className="text-slate-50 text-sm font-bold bg-subtle px-2 py-0.5 rounded-md">{trade.pair}</Text>
              </View>
              <Text className="text-slate-300 text-sm font-semibold">{trade.date}</Text>
            </View>

            {/* Content */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className={`px-3 py-1 rounded-full ${trade.direction === 'LONG' ? 'bg-emerald-500/20' : 'bg-red-500/20'} mr-3`}>
                  <Text className={`text-xs font-bold ${trade.direction === 'LONG' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {trade.direction}
                  </Text>
                </View>
                <Text className={`text-sm font-semibold ${trade.status === 'WIN' ? 'text-emerald-500' : trade.status === 'LOSS' ? 'text-red-500' : 'text-amber-500'}`}>
                  {trade.status}
                </Text>
              </View>
              <View className="items-end">
                <Text className={`font-mono font-bold text-xl ${trade.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                  {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => setAddModalVisible(true)}
      >
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* ===== Add Trade Modal ===== */}
      <Modal visible={addModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-card rounded-t-3xl p-6 border-t border-subtle">
            <Text className="text-slate-50 text-xl font-bold mb-4">Tambah Trade Baru</Text>

            <View className="mb-4 flex-row justify-between">
              <View className="flex-1 mr-2">
                <Text className="text-slate-400 text-sm mb-2 font-medium">Pair</Text>
                <TextInput
                  className="bg-main border border-subtle rounded-xl p-3 text-slate-50 font-mono"
                  placeholderTextColor="#64748B"
                  placeholder="BTC/USDT"
                  value={newPair}
                  onChangeText={setNewPair}
                />
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-slate-400 text-sm mb-2 font-medium">Profit/Loss ($)</Text>
                <TextInput
                  className="bg-main border border-subtle rounded-xl p-3 text-slate-50 font-mono"
                  keyboardType="numeric"
                  placeholderTextColor="#64748B"
                  placeholder="0.00"
                  value={newPnl}
                  onChangeText={setNewPnl}
                />
              </View>
            </View>

            {/* Direction Toggle */}
            <View className="flex-row mb-4">
              <TouchableOpacity
                className={`flex-1 py-3 rounded-xl mr-2 items-center ${newDirection === 'LONG' ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-main border border-subtle'}`}
                onPress={() => setNewDirection('LONG')}
              >
                <Text className={`font-bold ${newDirection === 'LONG' ? 'text-emerald-400' : 'text-slate-400'}`}>LONG</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 rounded-xl ml-2 items-center ${newDirection === 'SHORT' ? 'bg-red-500/20 border border-red-500/50' : 'bg-main border border-subtle'}`}
                onPress={() => setNewDirection('SHORT')}
              >
                <Text className={`font-bold ${newDirection === 'SHORT' ? 'text-red-400' : 'text-slate-400'}`}>SHORT</Text>
              </TouchableOpacity>
            </View>

            <View className="mb-6">
              <Text className="text-slate-400 text-sm mb-2 font-medium">Catatan Analisis & Psikologi Trading</Text>
              <TextInput
                className="bg-main border border-subtle rounded-xl p-3 text-slate-50 font-sans"
                style={{ minHeight: 100 }}
                placeholderTextColor="#64748B"
                placeholder="Bagaimana emosi Anda saat eksekusi trade ini?"
                multiline
                textAlignVertical="top"
                value={newNote}
                onChangeText={setNewNote}
              />
            </View>

            <View className="flex-row justify-end">
              <TouchableOpacity className="py-3 px-6 mr-2" onPress={() => setAddModalVisible(false)}>
                <Text className="text-slate-400 font-semibold">Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-primary py-3 px-6 rounded-xl shadow-sm" onPress={handleAddTrade}>
                <Text className="text-white font-semibold">Simpan Jurnal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ===== Detail/Edit Trade Modal ===== */}
      <Modal visible={detailModalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center bg-black/70 p-4">
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View className="bg-card rounded-3xl p-6 border border-subtle shadow-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-slate-50 text-xl font-bold">Edit Trade</Text>
                <TouchableOpacity onPress={() => handleDeleteTrade(selectedTrade?.id ?? 0)}>
                  <FontAwesome5 name="trash-alt" size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>

              {/* Pair (editable) */}
              <View className="mb-4">
                <Text className="text-slate-400 text-sm mb-2 font-medium">Pair</Text>
                <TextInput
                  className="bg-main border border-subtle rounded-xl p-3 text-slate-50 font-mono"
                  value={editPair}
                  onChangeText={setEditPair}
                  placeholder="Pair"
                  placeholderTextColor="#64748B"
                />
              </View>

              {/* PnL (editable) */}
              <View className="mb-4">
                <Text className="text-slate-400 text-sm mb-2 font-medium">Profit/Loss ($)</Text>
                <TextInput
                  className="bg-main border border-subtle rounded-xl p-3 text-slate-50 font-mono"
                  keyboardType="numeric"
                  value={editPnl}
                  onChangeText={setEditPnl}
                  placeholder="0.00"
                  placeholderTextColor="#64748B"
                />
              </View>

              {/* Status Toggle */}
              <View className="mb-4">
                <Text className="text-slate-400 text-sm mb-2 font-medium">Status</Text>
                <View className="flex-row">
                  {(['WIN', 'LOSS', 'BEP', 'OPEN'] as const).map((s) => (
                    <TouchableOpacity
                      key={s}
                      className={`flex-1 py-2 mx-1 rounded-xl items-center ${
                        editStatus === s
                          ? s === 'WIN' ? 'bg-emerald-500/20 border border-emerald-500/50'
                          : s === 'LOSS' ? 'bg-red-500/20 border border-red-500/50'
                          : 'bg-amber-500/20 border border-amber-500/50'
                          : 'bg-main border border-subtle'
                      }`}
                      onPress={() => setEditStatus(s)}
                    >
                      <Text className={`text-xs font-bold ${
                        editStatus === s
                          ? s === 'WIN' ? 'text-emerald-400'
                          : s === 'LOSS' ? 'text-red-400'
                          : 'text-amber-400'
                          : 'text-slate-500'
                      }`}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Entry/SL/TP Info (read-only) */}
              {selectedTrade?.entryPrice !== undefined && selectedTrade.entryPrice > 0 && (
                <View className="mb-4 bg-main rounded-xl p-4 border border-subtle">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-slate-400 text-xs">Entry Price</Text>
                    <Text className="text-slate-50 font-mono text-sm">${selectedTrade.entryPrice.toLocaleString()}</Text>
                  </View>
                  {selectedTrade.capitalAtRisk !== null && (
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-slate-400 text-xs">Capital at Risk</Text>
                      <Text className="text-loss font-mono text-sm">${selectedTrade.capitalAtRisk.toFixed(2)}</Text>
                    </View>
                  )}
                  {selectedTrade.riskRewardRatio !== null && (
                    <View className="flex-row justify-between">
                      <Text className="text-slate-400 text-xs">RRR</Text>
                      <Text className="text-primary font-mono text-sm">1:{selectedTrade.riskRewardRatio.toFixed(2)}</Text>
                    </View>
                  )}
                </View>
              )}

              {/* Notes (editable) */}
              <View className="mb-6">
                <Text className="text-slate-400 text-sm mb-2 font-medium">Catatan Analisis & Psikologi</Text>
                <TextInput
                  className="bg-main border border-subtle rounded-xl p-3 text-slate-50 font-sans"
                  style={{ minHeight: 100 }}
                  multiline
                  textAlignVertical="top"
                  value={editNote}
                  onChangeText={setEditNote}
                  placeholder="Tulis catatan analisis & psikologi..."
                  placeholderTextColor="#64748B"
                />
              </View>

              <View className="flex-row justify-end">
                <TouchableOpacity className="py-3 px-6 mr-2" onPress={() => setDetailModalVisible(false)}>
                  <Text className="text-slate-400 font-semibold">Batal</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-primary py-3 px-6 rounded-xl shadow-sm" onPress={handleSaveEdit}>
                  <Text className="text-white font-semibold">Simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
