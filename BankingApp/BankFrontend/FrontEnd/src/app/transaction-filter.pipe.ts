import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from './Interfaces/transaction';


@Pipe({
  name: 'TransactionFilterPipe',
})
export class TransactionFilterPipe implements PipeTransform {
  transform(transactions: Transaction[]): Transaction[] {
    if (!transactions) {
      return [];
    }
    return transactions.filter((transac) => transac.status == 0);
  }
}