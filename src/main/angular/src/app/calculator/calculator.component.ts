import {Component, OnInit} from '@angular/core';
import {CalculatorService} from './calculator.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  calculatorForm: FormGroup;
  result: number;
  isNoEmptyFirstNumber = true;
  isNoEmptySecondNumber = true;
  hasGoodFormatFirstNumber = true;
  hasGoodFormatSecondNumber = true;
  divisionByZero = false;
  hasSpacesFirstNumber = false;
  hasSpacesSecondNumber = false;


  constructor(private calculatorService: CalculatorService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this._createForm();
  }

  private _createForm(): void {
    this.calculatorForm = this.formBuilder.group({
      firstNumber: ['', [Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
      action: ['+', [Validators.required, Validators.minLength(1)]],
      secondNumber: ['', [Validators.required, Validators.minLength(1), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]]
    })
  }

  checkIfNotEmptyFirstNumber() {
    if (this.calculatorForm.controls['firstNumber'].value !== '') {
      this.isNoEmptyFirstNumber = true;
    } else {
      this.isNoEmptyFirstNumber = false;
    }
  }

  checkFormatFirstNumber() {
    if (isNaN(this.calculatorForm.controls['firstNumber'].value) === false) {
      this.hasGoodFormatFirstNumber = true;
    } else {
      this.hasGoodFormatFirstNumber = false;
    }
  }

  checkIfNotEmptySecondNumber() {
    if (this.calculatorForm.controls['secondNumber'].value !== '') {
      this.isNoEmptySecondNumber = true;
    } else {
      this.isNoEmptySecondNumber = false;
    }
  }

  checkFormatSecondNumber() {
    if (isNaN(this.calculatorForm.controls['secondNumber'].value) === false) {
      this.hasGoodFormatSecondNumber = true;
    } else {
      this.hasGoodFormatSecondNumber = false;
    }
  }

  checkDivisionByZero() {
    if (Number(this.calculatorForm.controls['secondNumber'].value) === 0 && this.calculatorForm.controls['action'].value === '/') {
      this.divisionByZero = true;
    } else {
      this.divisionByZero = false;
    }
  }

  checkSpacesFirstNumber() {
    var string = this.calculatorForm.controls['firstNumber'].value,
      substring = " ";
    if (string.includes(substring)) {
      this.hasSpacesFirstNumber = true;
    } else {
      this.hasSpacesFirstNumber = false;
    }
  }

  checkSpacesSecondNumber() {
    var string = this.calculatorForm.controls['secondNumber'].value,
      substring = " ";
    if (string.includes(substring)) {
      this.hasSpacesSecondNumber = true;
    } else {
      this.hasSpacesSecondNumber = false;
    }
  }

  onSubmit() {
    if(this.calculatorForm.controls['action'].value !=='+'){
    this.calculatorService.doCalculation(this.calculatorForm.controls['firstNumber'].value, this.calculatorForm.controls['action'].value, this.calculatorForm.controls['secondNumber'].value)
      .subscribe(
        data => {
          this.result = data;
        }
      )
  }else{
      this.calculatorService.doCalculation(this.calculatorForm.controls['firstNumber'].value, 'add', this.calculatorForm.controls['secondNumber'].value)
        .subscribe(
          data => {
            this.result = data;
          }
        )
    }}

}
