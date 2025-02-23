import { Injectable, NotFoundException, BadRequestException, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import * as fs from 'fs';
import { customAlphabet } from 'nanoid';
import * as moment from 'moment-timezone';
import { FabricService } from '../fabric/fabric.service';

@Injectable()
export class TransactionsService implements OnModuleInit, OnModuleDestroy {
  private TRANSACTIONS_FILE_PATH = 'src/data/transactions.json';
  private CATEGORIES_FILE_PATH = 'src/data/categories.json';
  private transactions = JSON.parse(fs.readFileSync(process.env.TRANSACTIONS_FILE_PATH || this.TRANSACTIONS_FILE_PATH, 'utf8'));
  private categories = JSON.parse(fs.readFileSync(this.CATEGORIES_FILE_PATH, 'utf8'));

  constructor(private readonly fabricService: FabricService) {}

  async onModuleInit() {
    await this.fabricService.init();
  }

  async onModuleDestroy() {
    await this.fabricService.disconnect();
  }

  createCategory(createCategoryDto: CreateCategoryDto) {
    const categoryId = this.generateUniqueCategoryId();
    const newCategory = { id: categoryId, ...createCategoryDto };
    this.categories.push(newCategory);
    fs.writeFileSync(this.CATEGORIES_FILE_PATH, JSON.stringify(this.categories, null, 2));
    return newCategory;
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const category = this.categories.find(cat => cat.name === createTransactionDto.category);
    if (!category) {
      throw new BadRequestException(`Category ${createTransactionDto.category} does not exist. Please create the category first.`);
    }
    const newId = this.generateUniqueId();
    const transactionDateTime = moment().tz('America/New_York').format('YYYY-MM-DD HH:mm:ss');
    const newTransaction = { id: newId, ...createTransactionDto, transactionDateTime, currency: 'USD', categoryId: category.id };
    this.transactions.push(newTransaction);
    fs.writeFileSync(this.TRANSACTIONS_FILE_PATH, JSON.stringify(this.transactions, null, 2));

    // Submit transaction to the blockchain
    await this.fabricService.submitTransaction('TransactionContract', 'createTransaction', JSON.stringify(newTransaction));

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

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transactionIndex = this.transactions.findIndex(transaction => transaction.id === id);
    if (transactionIndex === -1) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    this.transactions[transactionIndex] = { ...this.transactions[transactionIndex], ...updateTransactionDto };
    fs.writeFileSync(this.TRANSACTIONS_FILE_PATH, JSON.stringify(this.transactions, null, 2));

    // Submit transaction to the blockchain
    await this.fabricService.submitTransaction('TransactionContract', 'updateTransaction', id, JSON.stringify(updateTransactionDto));

    return this.transactions[transactionIndex];
  }

  remove(id: string) {
    const transactionIndex = this.transactions.findIndex(transaction => transaction.id === id);
    if (transactionIndex === -1) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    const removedTransaction = this.transactions.splice(transactionIndex, 1);
    fs.writeFileSync(this.TRANSACTIONS_FILE_PATH, JSON.stringify(this.transactions, null, 2));

    // Submit transaction to the blockchain
    this.fabricService.submitTransaction('TransactionContract', 'deleteTransaction', id);

    return removedTransaction[0];
  }

  private generateUniqueId(): string {
    const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()', 10);
    return `txn-${nanoid()}`;
  }

  private generateUniqueCategoryId(): string {
    const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 5);
    return `cat-${nanoid()}`;
  }

  getSummary() {
    const summary = this.transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = {
          categoryId: transaction.categoryId,
          totalAmount: 0,
          transactions: []
        };
      }
      if (transaction.status === 'Approved') {
        acc[transaction.category].totalAmount += transaction.amount;
      }
      acc[transaction.category].transactions.push({
        id: transaction.id,
        amount: transaction.amount,
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
}