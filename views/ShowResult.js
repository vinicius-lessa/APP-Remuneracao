/**
 * File DOC
 * 
 * @Description Página considadera 'Home'. Aqui serão exibidos todos os Anúncios presentes no Banco de Dados em forma de Lista.
 * @ChangeLog 
 *  - Vinícius Lessa - 15/06/2022: Adaptação do arquivo para receber os parâmetros da página 'SearchCps' e em seguida carregar os itens via requisição API.
 * 
 */

import React, { useState, useEffect } from 'react';  // JSX Compilation
import { 
    Text ,
    View ,
    TouchableOpacity ,
    SafeAreaView ,
    ScrollView ,
} from 'react-native'; // Core Components

// API Sauce
import api from '../services/api';

import { css } from '../assets/css/css.js'; // Style - css

import LoadingIcon from './components/LoadingDefault'; // Loading Component

import * as Linking from 'expo-linking';


// Person Row Component
const ResultRow = (props) => {  

    let wage = props.wage;
    let formatedWage = "R$" + wage.replace(".",",");

    return (
        <View style = {[
            css.flexOne ,            
            css.centerVerticaly ,
            css.centerChildren ,
            css.p_Two,
            { minHeight: 90 }
        ]}>
            <Text style={[
                css.textBlack ,
                css.size14 ,
                css.m_OneY ,
            ]}>
                Nome: <Text style={[ css.textRed, css.size16, css.fontBold ]} >{props.name}</Text>
            </Text>

            <Text style={[
                css.textBlack ,
                css.size14 ,
                css.m_OneY ,
            ]}>
                Cargo: <Text style={[ css.textRed, css.size16, css.fontBold ]} >{props.ocupation}</Text>
            </Text>

            <Text style={[
                css.textBlack,
                css.size14,
                css.m_OneY ,
            ]}>
                Remuneração: <Text style={[ css.textRed, css.size16, css.fontBold ]} >{formatedWage}</Text>
            </Text>
            
        </View>
    );
};

const SearchCps = ( { route, navigation } ) => {

    const { maxSal, minSal, ocupation, personName } = route.params;

    // TradePost Hooks
    const [errorMessage , setErrorMessage] = useState(null);
    const [searchList   , setSearchList] = useState([]);

    // Iterate
    var counter = 0;    

    // Lista Anúncios
    

    // Similar ao componentDidMount e componentDidUpdate: 
    useEffect(() => {
        async function searchRequest() {

            let tokenUrl  = '16663056-351e723be15750d1cc90b4fcd' ;
            let route    = '/Remuneracao/?token=' + tokenUrl + '&name=' + personName + '&ocupation=' + ocupation + '&minSal=' + minSal + '&maxSal=' + maxSal;
    
            try {
                const response = await api.get(route);
    
                let a_Values = response.data;
                
                // Doesn't replace
                searchList.length == 0 && setSearchList( a_Values );
                                
                console.log(searchList);

                if ( searchList.data === null ) {
                    setErrorMessage("Erro: " + response.data.msg);
                }     
            
            } catch (response) {
                if ( response.data.msg ) {
                    setErrorMessage("Erro: " + response.data.msg);
                } else {
                    setErrorMessage("Erro Inesperado!");
                }
    
            }
        }
        
        searchRequest();
    });

    // Loading
    if (searchList.length == 0 && !errorMessage)
        return (
        <View style={css.container}>
            <LoadingIcon/>
        </View>
        ) ;    
    
    return (
        <View style = {[
            css.container ,
            { height: '92%' }
        ]}>

            {/* Log Messages */}
            { !!errorMessage &&
                <View style={[ 
                    css.container, 
                    css.centerVerticaly, 
                    css.centerChildren 
                ]}>                
                    <Text style={ [css.size18, css.textBlack, css.fontBold,  { marginVertical: 20 } ] }>
                        Desculpe, não conseguimos nos Conectar!
                    </Text>
                    <Text style={ [css.size20, css.textBlack, { marginVertical: 20 } ] }>
                        ¯\_(ツ)_/¯
                    </Text>
                    <Text style={ [css.size16, css.textRed, css.fontBold,  { marginVertical: 20 } ] }>
                        { errorMessage }
                    </Text>
                </View>
            }

            {/* Trade Posts List */}
            { (!errorMessage && searchList.data != null ) && 
                <SafeAreaView style={ [ css.flexOne ] }>
                    {/* Results Lenght */}
                    <View style = {[
                        css.centerVerticaly ,
                        { 
                            height: '6%',
                        }
                    ]}>
                        <Text style={[
                            css.textBlack ,
                            css.endtHorizontaly ,
                            css.size12 ,
                            css.m_TwoRight ,
                        ]}>
                            Nº resultados: {searchList.data.length}
                        </Text>
                    </View>
                    <ScrollView>
                        {
                        searchList.data.map(function(searchRow) {

                            return (
                                <View key={Math.floor(Math.random() * 100000).toString()}>
                                    <ResultRow
                                        name={searchRow.nome}
                                        ocupation={searchRow.cargo}
                                        wage={searchRow.remuneracao}
                                    />

                                    <View style={ css.hrDefault } />
                                </View>
                            );
                        })
                        }
                    </ScrollView>
                </SafeAreaView> 
            }
            {/* Developed By */}
            <View style = {[
                css.centerVerticaly ,
                { 
                    height: '8%',
                    borderTopColor: '#939494',
                    borderTopWidth: .5,
                }
            ]}>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://github.com/vinicius-lessa')}
                >
                    <Text style={ [css.textBlack, css.centerText, css.size12] }>
                        Developed by                     
                        <Text style={[ 
                            css.fontBold ,
                            css.textRed ,
                        ]}> LessLax</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SearchCps;