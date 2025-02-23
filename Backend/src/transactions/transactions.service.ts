import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import * as fs from 'fs';
import { customAlphabet } from 'nanoid';
import * as moment from 'moment-timezone';

@Injectable()
export class TransactionsService {
  private TRANSACTIONS_FILE_PATH = 'src/data/transactions.json';
  private transactions = JSON.parse(fs.readFileSync(process.env.TRANSACTIONS_FILE_PATH || this.TRANSACTIONS_FILE_PATH, 'utf8'));

  create(createTransactionDto: CreateTransactionDto) {
    const newId = this.generateUniqueId();
    const transactionDateTime = moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
    const newTransaction = { id: newId, ...createTransactionDto, transactionDateTime, currency: 'USD' };
    this.transactions.push(newTransaction);
    fs.writeFileSync(this.TRANSACTIONS_FILE_PATH, JSON.stringify(this.transactions, null, 2));
    return newTransaction;
  }

  findAll() {
    return this.transactions;
  }

  findOne(id: string) {
    const transaction = this.transactions.find(transaction => transaction.id === id);
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return transaction;
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transactionIndex = this.transactions.findIndex(transaction => transaction.id === id);
    if (transactionIndex === -1) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    this.transactions[transactionIndex] = { ...this.transactions[transactionIndex], ...updateTransactionDto };
    fs.writeFileSync(this.TRANSACTIONS_FILE_PATH, JSON.stringify(this.transactions, null, 2));
    return this.transactions[transactionIndex];
  }

  remove(id: string) {
    const transactionIndex = this.transactions.findIndex(transaction => transaction.id === id);
    if (transactionIndex === -1) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    const removedTransaction = this.transactions.splice(transactionIndex, 1);
    fs.writeFileSync(this.TRANSACTIONS_FILE_PATH, JSON.stringify(this.transactions, null, 2));
    return removedTransaction[0];
  }

  private generateUniqueId(): string {
    const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()', 10);
    return `txn-${nanoid()}`;
  }

  getSummary() {
    const summary = this.transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = {
          totalAmount: 0,
          transactions: []
        };
      }
      acc[transaction.category].totalAmount += transaction.amount;
      acc[transaction.category].transactions.push({
        id: transaction.id,
        amount: this.formatCurrency(transaction.amount),
        transactionDateTime: transaction.transactionDateTime,
        status: transaction.status
      });
      return acc;
    }, {});

    // Sort transactions by transactionDateTime within each category
    Object.keys(summary).forEach(category => {
      summary[category].transactions.sort((a, b) => {
        return new Date(a.transactionDateTime).getTime() - new Date(b.transactionDateTime).getTime();
      });
    });

    return summary;
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
}