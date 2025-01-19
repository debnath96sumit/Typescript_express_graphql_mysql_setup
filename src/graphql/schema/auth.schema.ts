import { gql} from "graphql-tag"
export const itemSchema = gql`
    type Item {
        id: Int!
        name: String!
        price: Float!
    }

    type Query {
        getItems: [Item!]
        getItem(id: Int!): Item
    }

    ApiResponse {
        success: Boolean!
        message: String!
        data: User
    }
    input registerInput{
        name: String!
        email: String!
    }
    type Mutation {
        userRegister(input: registerInput!): Item
        updateItem(id: Int!, name: String, price: Float): Item
    }
`;