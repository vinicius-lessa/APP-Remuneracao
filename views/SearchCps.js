/**
 * File DOC
 * 
 * @Description Página de formulário 'SeachCPS'. A partir daqui o usuário poderá preencher os Inputs do formulário para consulta dos Servidores Públicos.
 * @ChangeLog 
 *  - Vinícius Lessa - 14/06/2022: Adaptação do arquivo anterior para o formulário utilizado neste projeto.
 *  - Vinícius Lessa - 15/06/2022: Continuação da adaptação da Página para ler os Inputs após o Submit, e realizar a consulta em seguida.
 * 
 */

import React, { useEffect, useState } from 'react';  // JSX Compilation
import { 
    View ,
    Text ,
    TextInput ,
    TouchableOpacity ,
    SafeAreaView ,
    ScrollView ,
    Alert ,    
} from 'react-native'; // Core Components

// import { css, pickerSelectStyles } from '../assets/css/css.js'; // Style - css

import { css } from '../assets/css/css.js'; // Style - css

// Form Features
import MaskInput, { Masks } from 'react-native-mask-input';

import * as Linking from 'expo-linking';


// Input Msg Model
const ErrorMsg = (props) => {
    return(
        <Text style = { [ 
            css.textRed, 
            css.size12, 
            css.m_OneTop, 
            css.m_OneLeft 
        ] }>
            {props.msg}
        </Text>
    );
};

const ShowResult = (props) => {

    // Search Hooks
    // Form
    const [personName   , setNameInput]         = useState(null);
    const [ocupation    , setOcupationInput]    = useState(null);
    const [minSal       , setMinSalInput]       = useState(null);
    const [maxSal       , setMaxSalInput]       = useState(null);
    
    const [errorMessage , setErrorMessage]      = useState(null);
    // const [searchList   , setSearchList]        = useState([]);

    // Loading Bool
    const [isLoading  , setIsLoading]   = useState(false);
    
    // Form Style/Validation
    
    const [nameError        , setNameError]         = useState(null);
    const [ocupationError   , setOcupationError]    = useState(null);
    const [minSalError      , setMinSalError]       = useState(null);
    const [maxSalError      , setMaxSalError]       = useState(null);

    // New Trade Post Function
    async function SearchEngine() {

        let isError = false;

        // Validations                
        if ( (personName === "" || personName === null) &&
             (ocupation === "" || ocupation === null ) &&
             ( minSal === "" || minSal === null ) &&
             ( maxSal === "" || maxSal === null )
            )
        {
            setNameError(true);
            setOcupationError(true);
            setMinSalError(true);
            setMaxSalError(true);

            isError = true;
        } else {            
            setNameError(false);
            setOcupationError(false);
            setMinSalError(false);
            setMaxSalError(false);
        }

        if ( isError ){
            console.log("Formulário Inválido!");
            return false;
        }
        
        return props.navigation.navigate('Resultados', {
            personName: personName ,
            ocupation: ocupation ,
            minSal: minSal ,
            maxSal: maxSal ,
        })
    }

    return (
        <SafeAreaView style={css.container}>
            <View style = {[
                { height: '92%' }
            ]}>
                <ScrollView>

                    {/* Briefing */}
                    <View style={[ 
                        css.centerVerticaly,
                        { height: 90 }
                    ]}>
                        <Text style={ [ 
                            css.size15 ,
                            css.textBlack ,
                            css.centerText ,
                        ]}>
                            Para fazer uma Busca, informe os Campos abaixo:
                        </Text>
                    </View>            
                    
                    {/* Form */}
                    <View>
                        {/* API Error Messages */}
                        { !!errorMessage && 
                            <View>
                                <Text style={[ css.loginMsg, css.size16, css.centerSelf ]}>{errorMessage}</Text>
                            </View>
                        }

                        {/* Inputs */}
                        <View style={css.p_Two}>
                            
                            {/* Nome */}
                            <View style = {[css.m_ThreeX, css.m_TwoBottom]}>
                                <Text style={[
                                    css.textBlack,
                                    css.size14,
                                    css.m_One
                                ]}>Nome
                                </Text>
                                <TextInput
                                    placeholder="Ex.: Pedro"
                                    maxLength={30}                                    
                                    style={css.inputDefault}
                                    onChangeText={text=>setNameInput(text)}
                                />
                                { !!nameError && 
                                    <ErrorMsg 
                                        msg="Por favor, preencha ao menos um dos Campos"
                                    />
                                }
                            </View>

                            {/* Cargo */}
                            <View style = {[css.m_ThreeX, css.m_TwoY]}>
                                <Text style={[
                                    css.textBlack,
                                    css.size14,
                                    css.m_One
                                ]}>Cargo
                                </Text>
                                <TextInput
                                    placeholder="Ex.: Professor"
                                    maxLength={30}                                    
                                    style={css.inputDefault}
                                    onChangeText={text=>setOcupationInput(text)}
                                />
                                { !!ocupationError && 
                                    <ErrorMsg 
                                        msg="Por favor, preencha ao menos um dos Campos"
                                    />
                                }
                            </View>                           

                            {/* Max. Salario */}
                            <View style = {[css.m_ThreeX, css.m_TwoY]}>
                                <Text style={[
                                    css.textBlack,
                                    css.size14,
                                    css.m_One
                                ]}>Salário de
                                </Text>
                                <MaskInput
                                    maxLength={12}
                                    keyboardType="number-pad"
                                    value={minSal}
                                    style={css.inputDefault}
                                    onChangeText={(masked, unmasked) => {

                                        var finalValue = unmasked;                                        

                                        // Add '.' character
                                        if ( unmasked.length > 2 ) {
                                            var valueOne = '';
                                            var valueTwo = '';
                                            
                                            valueOne = finalValue.substring(0, finalValue.length-2);
                                            valueTwo = ('.' + finalValue.slice(-2));

                                            finalValue = valueOne + valueTwo;                                            
                                        }

                                        setMinSalInput(finalValue);
                                    }}
                                    mask={Masks.BRL_CURRENCY}
                                />
                                { !!minSalError && 
                                    <ErrorMsg 
                                        msg="Por favor, preencha ao menos um dos Campos"
                                    />
                                }
                            </View>

                            {/* MAX. Salario */}
                            <View style = {[css.m_ThreeX, css.m_TwoY]}>
                                <Text style={[
                                    css.textBlack,
                                    css.size14,
                                    css.m_One
                                ]}>Salário até
                                </Text>
                                <MaskInput
                                    maxLength={12}
                                    keyboardType="number-pad"
                                    value={maxSal}
                                    style={css.inputDefault}
                                    onChangeText={(masked, unmasked) => {

                                        var finalValue = unmasked;                                        

                                        // Add '.' character
                                        if ( unmasked.length > 2 ) {
                                            var valueOne = '';
                                            var valueTwo = '';
                                            
                                            valueOne = finalValue.substring(0, finalValue.length-2);
                                            valueTwo = ('.' + finalValue.slice(-2));

                                            finalValue = valueOne + valueTwo;                                            
                                        }

                                        setMaxSalInput(finalValue);
                                    }}
                                    mask={Masks.BRL_CURRENCY}
                                />
                                { !!maxSalError && 
                                    <ErrorMsg 
                                        msg="Por favor, preencha ao menos um dos Campos"
                                    />
                                }
                            </View>
                        </View>

                        {/* Bottom of Page */}                        
                        <View style = { [ css.m_ThreeY ] }>
                            <TouchableOpacity
                                style={ [css.buttonDefault, css.p_TwoY, { width: '55%' }] }
                                onPress={()=>SearchEngine()}
                                //   onPress={()=>{Alert.alert("Função em Desenvolvimento!")}}
                            >
                                <Text style={ [css.size18, css.textWhite, css.fontBold] }>
                                    BUSCAR
                                </Text>
                            </TouchableOpacity>
                        </View>                        
                    </View>
                </ScrollView>
            </View>

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
        </SafeAreaView>
    );
}

export default ShowResult;