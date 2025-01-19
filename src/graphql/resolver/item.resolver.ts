import { prisma } from "../../config/dbConnection"
import { HomeController } from '../../controllers'

const homeCtrl = new HomeController();
export const itemResolver = {
  Query: {
    getItems: async () => await prisma.item.findMany(),
    getItem: async (_: any, { id }: { id: number }) => await prisma.item.findUnique({ where: { id } }),
  },
  Mutation: {
    createItem: async (
      _: any, 
      { name, price }: { name: string; price: number }
    ) => {
      return await homeCtrl.createItem(name, price);
    },
    updateItem: async (
      _: any, 
      { id, name, price }: { id: number; name?: string; price?: number }
    ) => {
      return await homeCtrl.updateItem(id, {name, price});
    },
  },
};