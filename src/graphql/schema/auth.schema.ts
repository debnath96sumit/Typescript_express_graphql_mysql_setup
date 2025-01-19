import { gql} from "graphql-tag"
export const authSchema = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        createdAt: String!
        updatedAt: String!
    }

    type ApiResponse {
        success: Boolean!
        message: String!
        data: User
    }
    input registerInput{
        name: String!
        email: String!
    }
    type Mutation {
        userRegister(input: registerInput!): ApiResponse
    }
`;