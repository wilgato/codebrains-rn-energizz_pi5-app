import { Button, Divider, List, Spinner, Text, TopNavigation } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { createDadosSensor1, deleteDadosSensor1, loadDadosSensor1, updateDadosSensor1 } from '../services/dados_sensor1Service';
import DadosSensor1Item from './DadosSensor1Item';
import { StyleSheet, View } from 'react-native'; // Importe "View"
import DadosSensor1Form from './DadosSensor1Form';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DadosSensor1Dashboard from './DadosSensor1Dashboard'; // Importe o novo componente

const DadosSensor1List = ({ navigation }) => { // Certifique-se de passar a prop "navigation"
    const [refreshing, setRefreshing] = useState(false);
    const [dados_sensor1, setDadosSensor1] = useState([]);
    const [showDashboard, setShowDashboard] = useState(false); // Inicialmente, não mostramos a dashboard

    const handleFormSubmit = (dados_sensor1) => {
        console.log('Todo to create', dados_sensor1);
        createDadosSensor1(dados_sensor1).then((dados_sensor1) => onRefresh());
    };
    const handleRemoveDadosSensor1 = (dados_sensor1) => {
        console.log('Todo to remove', dados_sensor1);
        deleteDadosSensor1(dados_sensor1.id).then((dados_sensor1) => onRefresh());
    };

    const handleToggleDadosSensor1Status = (dados_sensor1) => {
        console.log('Todo to toggle', dados_sensor1);
        dados_sensor1.temperatura = !dados_sensor1.temperatura;
        updateDadosSensor1(dados_sensor1).then((dados_sensor1) => onRefresh());
    };

    const refresh = async () => {
        await loadDadosSensor1().then((dados_sensor1) => {
            setDadosSensor1(dados_sensor1);
            console.log('DadosSensor1', dados_sensor1);
        });
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refresh().then(() => setRefreshing(false));
        console.log('Refreshing state', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh]);

    return (
        <>
            {/* Personalize o título e estilo da barra de navegação superior */}
            <TopNavigation
                title='Dados Sensor IOT com ESP32'
                style={styles.topNavigation}
                titleStyle={styles.titleStyle}
            />
            <Divider />
            <DadosSensor1Form onFormSubmit={handleFormSubmit} />
            <Divider />
            {refreshing ? (
                <Spinner />
            ) : (
                <>
                    {dados_sensor1.length > 0 ? (
                        <List
                            data={dados_sensor1}
                            ItemSeparatorComponent={Divider}
                            renderItem={(item) => DadosSensor1Item(item, handleRemoveDadosSensor1, handleToggleDadosSensor1Status)}
                            // Adicione o botão para mostrar/ocultar a dashboard
                            ListFooterComponent={() => (
                                <View style={styles.dashboardContainer}>
                                    <Button onPress={() => setShowDashboard(!showDashboard)}>
                                        {showDashboard ? 'Ocultar Dashboard' : 'Mostrar Dashboard'}
                                    </Button>
                                    {showDashboard && <DadosSensor1Dashboard dados_sensor1={dados_sensor1} />}
                                </View>
                            )}
                        />
                    ) : (
                        <Text>Não dados do sensor found</Text>
                    )}
                </>
            )}
        </>
    );
};

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='DadosSensor1List'>
                <Stack.Screen name='DadosSensor1List' component={DadosSensor1List} />
                <Stack.Screen name='Dashboard' component={DadosSensor1Dashboard} /> {/* Use o componente correto */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

/// Estilos personalizados
const styles = StyleSheet.create({
    topNavigation: {
        backgroundColor: '#3366FF', // Cor de fundo desejada
    },
    titleStyle: {
        color: '#FFFFFF', // Cor do texto desejada (branco)
        fontSize: 44, // Tamanho da fonte desejado
        marginTop: 10, // Espaço superior para baixar a barra de título
        marginBottom: 10, // Espaço inferior para afastar o título da parte superior
    },
    input: {
        flex: 1,
        margin: 2,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    controlContainer: {
        borderRadius: 4,
        margin: 2,
        padding: 6,
        backgroundColor: '#3366FF',
    },
    dashboardContainer: {
        padding: 16,
        alignItems: 'center',
    },
});

export default DadosSensor1List;