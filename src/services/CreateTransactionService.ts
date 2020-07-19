import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Tipo de transação não permitida');
    }

    const balance = this.transactionsRepository.getBalance().total;
    if (type === 'outcome' && value > balance) {
      throw Error('Transação não permitida, saldo insuficiente');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
