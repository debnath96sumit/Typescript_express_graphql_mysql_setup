import { gql} from "graphql-tag"
export const authSchema = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        createdAt: String!
        updatedAt: String!
    }
    type LoginData {
        user: User
        token: String!
    }

    type LoginApiResponse {
        success: Boolean!
        message: String!
        data: LoginData
    }
    type ApiResponse {
        success: Boolean!
        message: String!
        data: User
    }
    input registerInput{
        name: String!
        email: String!
        password: String!
    }
    input loginInput{
        email: String!
        password: String!
    }
    type Mutation {
        userRegister(input: registerInput!): ApiResponse
        userLogin(input: loginInput!): LoginApiResponse

        updateProfile: Boolean
    }
`;