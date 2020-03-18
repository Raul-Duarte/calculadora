import React, { Component } from 'react';
import './Calculator.css'
import Button from './components/Button'
import Display from './components/Display'

/*
Construção de valores (PADRÃO)
*/
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}
export default class main extends Component {
    /* Fazendo um clone dos valores padrões*/
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)

    }
    clearMemory() {
        /* voltando ao estado inicial */
        this.setState({ ...initialState })
    }

    // Essa função so é chamada quando clicamos em alguma operação
    setOperation(operation) {
        //Se o indice do array estiver apontando para o '0'
        if(this.state.current ===0){
            //Recebe a operação, troca para o indice '1' e limpa o display
            this.setState({operation,current:1,clearDisplay:true})
        }else{
            const equals = operation === '=' //capitura se a operação foi clicada no '='
            const currentOperation = this.state.operation // Captura a operação
            const values = [...this.state.values] // clone dos valores
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e){
                values [0] = this.state.values[0]
            }
            
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    //Essa função so recebe digitos e o '.'(PONTO)
    addDigit(n) {

        // Verifica se o '.' (PONTO) ja foi inserido
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        /*Pode existir dois senarios: 
        Quando no display ja existe o numeral '0'(ZERO) e eu vou querer adicionar outro digito;
        Ou QUando a variavel 'clearDisplay' estiver true;*/
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        // Valor corrente vai depender se o display vai ser limpo ou não
        const currentValue = clearDisplay ? '' : this.state.displayValue

        //Vai recaber o valor corrente mais o valor digitado
        const displayValue = currentValue + n

        // Atribuindo novo estado para aplicação
        this.setState({ displayValue, clearDisplay: false })

        // Se for diferente de '.' então é um numero
        if(n !== '.'){
            const i = this.state.current //vai receber o indice
            const newValue = parseFloat(displayValue) //Transforma em float
            const values = [...this.state.values] // clona 
            values[i] = newValue
            this.setState({values})
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} /> {/* Exibendo o valor do estado da aplicação*/}
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}
