import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { JournalProvider } from '../context/JournalContext';
import { CourseProvider } from '../context/CourseContext';
import '../global.css';

export default function RootLayout() {
  return (
    <JournalProvider>
      <CourseProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </CourseProvider>
    </JournalProvider>
  );
}