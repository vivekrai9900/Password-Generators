import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import * as Yup from 'yup'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Formik } from 'formik'

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4,'should be minimum of 4 characters')
  .max(16,'should be max of 16 characters')
  .required('minimum of 4 and maximum to 16 characters are required')
})

export default function App() {
  const [password, setPassword]= useState('')
  const [isPasswordGenerated, setisPasswordGenerated ] = useState(false)
  const [lowerCase, setlowerCase]= useState(true)
  const [upperCase, setupperCase]= useState(false)
  const [numbers, setnumbers]= useState(false)
  const [symbols, setsymbols]= useState(false)


  const generatePasswordString =(passwordLength:number)=>{
    let characterList ='';

    const upperCasechars ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCasechars ='abcdefghijklmnopqrstuvwxyz';
    const digitchars ='1234567890';
    const specialchars ='!@#$%^&*()_+';


    if(upperCase){
      characterList+=upperCasechars;
    }
    if(lowerCase){
      characterList+=lowerCasechars;
    }
     
    if(numbers){
      characterList+=digitchars;
    }

    if(symbols){
      characterList+=specialchars;
    }

    const passwordResult = createPassword(characterList,passwordLength)


    setPassword(passwordResult)
    setisPasswordGenerated(true)
  }

  const createPassword =(character:string, passwordLength: number)=>{
    let result =''
    for(let i=0;i<passwordLength;i++){
      const characterIndex = Math.round(Math.random()*character.length)

      result += character.charAt(characterIndex)
    }

    return result
  }

  const resetPassword =()=>{

    setPassword('')
    setisPasswordGenerated(false)
    setlowerCase(false)
    setupperCase(false)
    setnumbers(false)
    setsymbols(false)



  }
  return (
   <ScrollView keyboardShouldPersistTaps="always">
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.formContainer}>
       <Text style={styles.title}>password Generator</Text>
       <Formik
       initialValues={{ passwordLength: ''}}
       validationSchema={passwordSchema}
       onSubmit={values =>{
        console.log(values)
        generatePasswordString(Number(values.passwordLength))
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
        <>
        <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
           <Text style={styles.heading}>Password Length</Text>
           {touched.passwordLength && errors.passwordLength &&(
            <Text style={styles.errorText}>
              {errors.passwordLength}
            </Text>
           )
           } 
           
          </View>

          <TextInput
           style={styles.inputStyle}
           value={values.passwordLength}
           onChangeText={handleChange('passwordLength')}
           placeholder='Ex. 9'
           keyboardType='numeric'
           />
        </View>
        <View style={styles.inputWrapper}>
         
          <Text style={styles.heading}>Include Lowercase</Text>
          <View>
          <BouncyCheckbox
          isChecked={lowerCase}
          onPress={()=> setlowerCase(!lowerCase)}
          fillColor='#29AB87'
          />
        </View>
        </View>
        <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Uppercase</Text>
          <View>
          <BouncyCheckbox
          isChecked={upperCase}
          onPress={()=>setupperCase(!upperCase)}
          fillColor='#FED850'
          />
        </View>
        </View>
        <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Numbers</Text>
          <View>
          <BouncyCheckbox
          isChecked={numbers}
          onPress={()=> setnumbers(!numbers)}
          fillColor='#C9A0DC'
          />
        </View>
        </View>
        <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Symbols</Text>
          <View>
          <BouncyCheckbox
          isChecked={symbols}
          onPress={()=> setsymbols(!symbols)}
          fillColor='#FC80A5'
          />
        </View>
        </View>


        <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn}
          onPress={handleSubmit}>
            <Text>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={()=>{
            handleReset();
            resetPassword()
          }}>
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
        </View>


        </>
       )}
       </Formik>
      </View>

      {
        isPasswordGenerated?(
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long Press to Copy</Text>
            <Text selectable style={styles.generatedPassword}>{password}</Text>
          </View>
        ): null}
    </SafeAreaView>

   </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});