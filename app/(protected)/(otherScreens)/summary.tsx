import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useUserStore } from '@/store/useUserStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useVideoPlayer, VideoView } from 'expo-video';
import axios from 'axios';
import { BASEURL } from '@/constants/Api';

const RequestSummaryScreen = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [transcriptItems, setTranscriptItems] = useState([]);

  const { transcriptUrl, recordingUrl } = useUserStore();
  const token = useAuthStore((state) => state.token);

  const AiSearch = async (prompt: string) => {
    const result = await axios.get(
      `${BASEURL}/ai/searchAi?prompt=${encodeURIComponent(prompt)}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return result.data;
  };

  const handleRequestSummary = async () => {
    if (transcriptItems.length === 0) return;

    setLoading(true);
    setSummary('');

    const prompt = transcriptItems
      .map((item) => `${item?.speaker}: ${item?.text}`)
      .join('\n');

    try {
      const result = await AiSearch(prompt);
      setSummary(result?.summary || 'No summary returned.');
    } catch (error) {
      console.error('AI summary request failed:', error);
      setSummary('❌ Failed to fetch summary.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTranscript = async () => {
      if (!transcriptUrl) return;
      try {
        const response = await fetch(transcriptUrl);
        const text = await response.text();
        const lines = text.trim().split('\n');
        const items = lines.map((line) => JSON.parse(line));
        setTranscriptItems(items);
        handleRequestSummary(); // auto-trigger summary when transcript is ready
      } catch (err) {
        console.error('Transcript fetch failed:', err);
      }
    };
    fetchTranscript();
  }, [transcriptUrl]);

  const player = useVideoPlayer(recordingUrl, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Request Meeting Summary</Text>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRequestSummary}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Requesting...' : 'Get Summary'}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={styles.loader} size="small" />}

      {summary !== '' && (
        <View style={styles.resultBox}>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      )}

      {recordingUrl && (
        <View style={styles.playerContainer}>
          <Text style={styles.label}>📼 Meeting Recording</Text>
          <VideoView
            player={player}
            nativeControls={true}
            contentFit="contain"
            style={styles.video}
          />
        </View>
      )}

      {transcriptItems.length > 0 && (
        <View style={styles.transcriptContainer}>
          <Text style={styles.label}>🗣️ Transcript</Text>
          {transcriptItems.map((item, index) => (
            <Text key={index} style={styles.transcriptLine}>
              <Text style={{ fontWeight: '600' }}>{item?.speaker}: </Text>
              {item?.text}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f2f2f2',
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333'
  },
  button: {
    padding: 14,
    backgroundColor: '#007aff',
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#aaa'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  loader: {
    marginTop: 20
  },
  resultBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  summaryText: {
    fontSize: 16,
    color: '#444'
  },
  playerContainer: {
    marginTop: 24
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 8
  },
  transcriptContainer: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  transcriptLine: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333'
  }
});

export default RequestSummaryScreen;
