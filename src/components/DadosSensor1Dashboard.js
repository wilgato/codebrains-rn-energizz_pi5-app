import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const DadosSensor1Dashboard = ({ dados_sensor1 }) => {
  // Formate seus dados para o gráfico
  const dadosGrafico = dados_sensor1.map((item) => ({
    name: item.posting_time, // Use as datas como rótulos das fatias
    temperatura: item.temperatura, // Use os dados de temperatura aqui
    umidade: item.umidade, // Use os dados de umidade aqui
  }));

  // Separe os rótulos das fatias e os dados de temperatura e umidade
  const labels = dadosGrafico.map((item) => item.name);
  const dataTemperatura = dadosGrafico.map((item) => item.temperatura);
  const dataUmidade = dadosGrafico.map((item) => item.umidade);

  console.log(dados_sensor1);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Temperatura: {dados_sensor1[dados_sensor1.length - 1].temperatura} °C</Text>
        <Text style={styles.dataText}>Umidade: {dados_sensor1[dados_sensor1.length - 1].umidade}</Text>
        {/* Adicione mais informações do seu dashboard aqui */}
      </View>
      <PieChart
        data={[
          {
            name: 'Temperatura',
            population: dataTemperatura.reduce((acc, val) => acc + val, 0), // Soma de todas as temperaturas
            color: 'rgba(0, 0, 255, 0.7)', // Cor da fatia de temperatura
            legendFontColor: '#000',
            legendFontSize: 15,
          },
          {
            name: 'Umidade',
            population: dataUmidade.reduce((acc, val) => acc + val, 0), // Soma de todas as umidades
            color: 'rgba(255, 0, 0, 0.7)', // Cor da fatia de umidade
            legendFontColor: '#000',
            legendFontSize: 15,
          },
        ]}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.grafico}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grafico: {
    marginVertical: 8,
    borderRadius: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    marginVertical: 20,
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    borderRadius: 10,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DadosSensor1Dashboard;
