import { HomeController } from '../../controllers'
import { userRegisterInput } from '../../types';

const homeCtrl = new HomeController();
export const authResolver = {

  Mutation: {
    userRegister: async (
      _: any, 
      { input }: { input: userRegisterInput }
    ) => {
      return await homeCtrl.userRegister(input);
    },
  },
};