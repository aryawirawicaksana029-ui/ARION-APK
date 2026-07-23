import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>🚀 ARION TRADER ONLINE!</Text>
            <Text style={styles.subtitle}>Dashboard Frontend Berhasil Menyala!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#38bdf8',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: 16,
    },
});