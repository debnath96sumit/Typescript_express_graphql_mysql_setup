import { HomeController } from '../../controllers'
import { userLoginInput, userRegisterInput } from '../../types';
import { graphqlContext, isAuthenticated } from '../context';

const homeCtrl = new HomeController();
export const authResolver = {

  Mutation: {
    userRegister: async (
      _: any, 
      { input }: { input: userRegisterInput }
    ) => {
      return await homeCtrl.userRegister(input);
    },
    userLogin: async (
      _: any, 
      { input }: { input: userLoginInput }
    ) => {
      return await homeCtrl.userLogin(input);
    },

    updateProfile: async (
      _: any,
      __: any,
      context: graphqlContext
    ) =>{
      isAuthenticated(context);

      return true;
    }
  },
};