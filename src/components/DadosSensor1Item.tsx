import {ListItem, Icon, Layout, CheckBox, Button, Text} from '@ui-kitten/components'
import { useState } from 'react';
import { StyleSheet } from 'react-native';


const DadosSensor1Item = ({item}, handleRemoveDadosSensor1, handleToggleDadosSensor1Status) => {
    console.log('Remove', handleRemoveDadosSensor1);
    console.log('Toggle', handleToggleDadosSensor1Status);
    return (
        <ListItem
            title={
                <Layout style={styles.rowContainer}>
                    <Text category="s1">Temperatura: {item.temperatura}</Text>
                </Layout>
            }
            description={
                <Layout style={styles.rowContainer}>
                    <Text category="s1">Umidade: {item.umidade}</Text>

                    <Text style={styles.divider} />
                </Layout>
            }
            accessoryRight={
                <RenderAccessory
                    dados_sensor1={item}
                    onToggle={handleToggleDadosSensor1Status}
                    onDelete={handleRemoveDadosSensor1}
                />
            }
        />    
    )
}

const RenderAccessory = ({ dados_sensor1, onToggle, onDelete }) => {
    const [checked, setChecked] = useState(dados_sensor1.temperatura);

    const DeleteIcon = (props) => (
        <Icon {...props} name='trash-2-outline' />
    );

    return (
        <Layout style={styles.container}>
            <Layout style={styles.layout} level="1">
                <CheckBox
                    checked={checked}
                    onChange={nextChecked => {
                        setChecked(nextChecked);
                        onToggle(dados_sensor1);
                    }} />
            </Layout>
            <Layout style={styles.layout} level="1">
                <Button
                    size='tiny'
                    accessoryLeft={DeleteIcon}
                    onPress={() => onDelete(dados_sensor1)}
                />
            </Layout>
        </Layout>

    );
};

export default DadosSensor1Item;
const styles = StyleSheet.create({
    input: {
        flex: 1,
        margin: 2,
    },
    // Resto dos estilos...
    divider: {
        flex: 1,
        borderBottomWidth: 1, // Espessura da linha
        borderBottomColor: '#3366FF', // Cor do risco
        marginHorizontal: 8, // Espaçamento horizontal
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
    button: {
    },
    container: {
        flex: .5,
        flexDirection: 'row',
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        allignItems: 'center',
    }
});