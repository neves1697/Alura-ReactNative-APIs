import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import estilos from './estilos';
import { pegarRepositoriosDoUsuario } from '../../services/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const estaNaTela = useIsFocused();

    useEffect(() => {
        const buscarRepositorios = async () => {
            try {
                const resultado = await pegarRepositoriosDoUsuario(route.params.id);
                setRepo(resultado);
            } catch (error) {
                console.log(error);
            } finally {
                setCarregando(false);
            }
        };

        buscarRepositorios();
    }, [estaNaTela]);

    return (
        <View style={estilos.container}>
            <Text style={estilos.repositoriosTexto}>{repo.length > 0 ? `${repo.length} repositórios criados` : 'Nenhum repositório criado'}</Text>
            <TouchableOpacity
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio')}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>

            {carregando ? (
                <ActivityIndicator size="large" color="#000" style={estilos.indicador} />
            ) : (
                <FlatList
                    data={repo}
                    style={{ width: '100%' }}
                    keyExtractor={repo => repo.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={estilos.repositorio}
                            onPress={() => navigation.navigate('InfoRepositorio', { item })}
                        >
                            <Text style={estilos.repositorioNome}>{item.name}</Text>
                            <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}