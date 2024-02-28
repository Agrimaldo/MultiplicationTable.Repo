import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NumbersValidator } from '../../../util/validators';
import { MultiplicationService } from '../../service/multiplication.service';
import { CalculateResponse } from '../../../types/CalculateResponse';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multiplication',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatButtonModule, ReactiveFormsModule, MatDividerModule, MatListModule, CommonModule ],
  templateUrl: './multiplication.component.html',
  styleUrl: './multiplication.component.scss'
})
export class MultiplicationComponent {

  private multiplicationService = inject(MultiplicationService);
  public validate: boolean = false;
  public numberList: FormControl = new FormControl('', [Validators.required, NumbersValidator()]);
  public calculateList: CalculateResponse[] = [];

  getErrorMessage() {
    if (this.numberList.hasError('required')) {
      return 'Campo deve ser preenchido';
    }

    if (this.numberList.hasError('onlyNumbers'))
    {
      return 'O campo deve ser preenchido apenas com números separados por vírgula';
    }

    if (this.numberList.hasError('equalNumbers')  ) {
      return 'O campo deve conter números únicos';
    }

    this.validate = true;
    return null;
  }

  SendNumbersClick(): void {
    this.getErrorMessage();

    if (this.validate)
    {
      //console.log(`SendNumbersClick > testes >> ${(this.numberList.value!).split(',').map( => +a)}`);

      this.multiplicationService.calculate((this.numberList.value!).split(',').map((a: string) => +a)).subscribe((result: CalculateResponse[]) => {
        this.calculateList = result;
        //this.showSnackBar(result, 'Tarefa removida com sucesso');
      });
    }
    
  }
}
