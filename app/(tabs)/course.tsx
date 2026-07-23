import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCourse } from '../../context/CourseContext';

export default function CourseScreen() {
  const { modules, isLoading, completeModule } = useCourse();

  const handlePress = (id: number, title: string, unlocked: boolean, progress: number) => {
    if (!unlocked) {
      Alert.alert("Terkunci", "Selesaikan modul sebelumnya untuk membuka kunci.");
      return;
    }
    if (progress === 100) {
      Alert.alert("Sudah Selesai", `Anda sudah menyelesaikan "${title}". 🎉`);
      return;
    }
    Alert.alert(
      "Mulai Modul",
      `Tandai "${title}" sebagai selesai?`,
      [
        { text: "Batal", style: "cancel" },
        { text: "Selesai ✓", onPress: () => completeModule(id) },
      ]
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-main items-center justify-center">
        <ActivityIndicator size="large" color="#D97757" />
        <Text className="text-slate-400 mt-4">Memuat kursus...</Text>
      </View>
    );
  }

  const completedCount = modules.filter((m) => m.progress === 100).length;

  return (
    <ScrollView className="flex-1 bg-main p-4">
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <View>
          <Text className="text-slate-50 text-2xl font-bold">E-Course</Text>
          <Text className="text-slate-400 text-sm mt-1">
            {completedCount}/{modules.length} modul selesai
          </Text>
        </View>
        <View className="bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-1.5 rounded-full shadow-sm">
          <Text className="text-slate-900 font-bold text-xs">PRO UNLOCKED</Text>
        </View>
      </View>

      <View className="flex-row flex-wrap justify-between pb-10">
        {modules.map((course) => (
          <TouchableOpacity
            key={course.id}
            className={`w-[48%] bg-card rounded-2xl p-4 mb-4 border border-subtle ${!course.unlocked && 'opacity-60'}`}
            onPress={() => handlePress(course.id, course.title, course.unlocked, course.progress)}
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="bg-subtle px-2 py-1 rounded-md">
                <Text className="text-slate-300 text-[10px] font-bold uppercase tracking-wider">{course.category}</Text>
              </View>
              {!course.unlocked ? (
                <FontAwesome5 name="lock" size={14} color="#64748B" />
              ) : course.progress === 100 ? (
                <FontAwesome5 name="check-circle" size={16} color="#10B981" />
              ) : (
                <MaterialCommunityIcons name="book-open-variant" size={18} color="#D97757" />
              )}
            </View>

            <Text className="text-slate-100 font-semibold text-base mb-1" numberOfLines={2}>
              {course.title}
            </Text>

            <View className="flex-row items-center mb-4 mt-1">
              <FontAwesome5 name="clock" size={10} color="#94A3B8" />
              <Text className="text-slate-400 text-xs ml-1">{course.time}</Text>
            </View>

            <View className="w-full bg-main h-1.5 rounded-full overflow-hidden">
              <View
                className={`h-full ${course.progress === 100 ? 'bg-profit' : 'bg-primary'}`}
                style={{ width: `${course.progress}%` }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
