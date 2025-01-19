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

    type Mutation {
        createItem(name: String!, price: Float!): Item
        updateItem(id: Int!, name: String, price: Float): Item
    }
`;