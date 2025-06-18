import PageLayout from '@/components/ui/layout/PageLayout'; // Your component with the sidebar
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <PageLayout showHeader={true}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </PageLayout>
  );
}