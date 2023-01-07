import { UseCase } from '@shared/application/protocols';
import { Id } from '@shared/domain/value-objects';
import { NotFoundEntityError } from '@shared/application/errors';
import { TransactionRepository } from '@payment/application/repositories';
import { UpdateTransactionStatusInputDto } from '@payment/application/dtos';

export class UpdateTransactionStatusUseCase implements UseCase<UpdateTransactionStatusInputDto, void> {
  constructor (
    private readonly transactionRepository: TransactionRepository
  ) {}

  async exec (data: UpdateTransactionStatusInputDto): Promise<void> {
    const id = Id.create(data.transactionId);

    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundEntityError(id.getValue());
    }

    transaction.status = data.status;

    await this.transactionRepository.update(transaction);
  }
}
