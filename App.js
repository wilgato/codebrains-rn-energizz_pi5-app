import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components'; // Adicione o import do IconRegistry
import { SafeAreaView } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import DadosSensor1List from './src/components/DadosSensor1List';

const HomeScreen = () => (
  <Layout style={{flex: 1}}>
    <SafeAreaView>
      <Text style={{ marginTop: 40, fontSize: 24 }}> SMC-Monitoramento Saúde Corporal</Text>
      <DadosSensor1List></DadosSensor1List>
    </SafeAreaView>
  </Layout>
);

export default () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <HomeScreen />
      </ApplicationProvider>
    </>
  );
}