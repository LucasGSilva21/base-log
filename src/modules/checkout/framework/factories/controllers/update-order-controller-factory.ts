import { UpdateOrderController } from '@checkout/presentation/controllers';
import { UpdateOrderValidation } from '@checkout/presentation/validations';
import { makeUpdateOrderUseCase } from '@checkout/framework/factories/usecases';

export const makeUpdateOrderController = (): UpdateOrderController => {
  const updateOrderUseCase = makeUpdateOrderUseCase();
  const updateOrderValidation = new UpdateOrderValidation();
  return new UpdateOrderController(updateOrderUseCase, updateOrderValidation);
};
