// npm install @apollo/server express graphql cors
import express, {Express} from 'express';
import { connectDatabase } from './config/dbConnection';
import { PORT } from './config/variables';
import { createApolloServer } from './middleware/graphql.middleware';


const StartServer = async ()=>{

    const app: Express = express();

    await connectDatabase();

    const { middleware: apolloMiddleware } = await createApolloServer();

    app.use('/', apolloMiddleware);

    app.listen(PORT, ()=>{
      console.log(`🚀 Server ready at http://localhost:${PORT}/`);
    })
}

StartServer();
