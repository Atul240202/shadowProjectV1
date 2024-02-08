import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height='';
    weight='';
    bmi='';
    result='';

    inputHander(event){
        const {name, value} = event.target;  // name: "height" or "weight", value: the current entered text in the field
        if(name==="height"){
            this.height = event.target.value;
        }
        if(name==="weight"){
            this.weight = event.target.value;
        }
        
    }

    submitHandler(event){
        event.preventDefault();
        console.log('Height: ' + this.height);
        console.log('Weight: ' + this.weight);
        console.log('BMI is ->' + this.bmi);
        this.bmiResult();
    }

    bmiResult(){
        const heightInMeters = parseFloat(this.height) / 100; 
        const weightInKg = parseFloat(this.weight);
        this.bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2); 
        if(this.bmi <= 18.5){
            this.result = "Underweight";
        } else if (this.bmi > 18.5 && this.bmi <= 25){
            this.result = "Normal weight";
        }else if (this.bmi > 25 && this.bmi <=30){
            this.result = "Overweight";
        }else{
            this.result = "Obese";
        }
        console.log('BMI result is: ' + this.result);
    }

    recalculate(){
        this.height = ''
        this.weight = ''
        this.bmi = ''
        this.result = ''
    }
}