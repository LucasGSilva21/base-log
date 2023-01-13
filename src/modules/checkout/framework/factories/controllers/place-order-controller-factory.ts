import { PlaceOrderController } from '@checkout/presentation/controllers';
import { PlaceOrderValidation } from '@checkout/presentation/validations';
import { makePlaceOrderUseCase } from '@checkout/framework/factories/usecases';

export const makePlaceOrderController = (): PlaceOrderController => {
  const placeOrderUseCase = makePlaceOrderUseCase();
  const placeOrderValidation = new PlaceOrderValidation();
  return new PlaceOrderController(placeOrderUseCase, placeOrderValidation);
};
