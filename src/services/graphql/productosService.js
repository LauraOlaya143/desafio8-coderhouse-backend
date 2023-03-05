import { buildSchema } from 'graphql';
import { getAllProductsCtr, getProductByIdCtr, newProductoCtr, editarProductoCtr, eliminarProductoCtr} from '../../controller/graphql/productosController.js';

export const graphqlSchema = buildSchema(`
    input InputProduct{
        title: String!
        price: Int!
        thumbnail: String!
        descripcion: String!
        stock: Int!
    }
    type product{
        id: String!
        title: String!
        price: Int!
        thumbnail: String!
        descripcion: String!
        stock: Int!
    }
    type Query{
        getAllProductsCtr:[product]
        getProductByIdCtr(id:String!):product
    }
    type Mutation{
        newProductoCtr(data: InputProduct):product
        editarProductoCtr(id: String!, data: InputProduct):product
        eliminarProductoCtr(id: String!):String
    }
`)

export const graphqlRoot = {
    getAllProductsCtr, 
    getProductByIdCtr, 
    newProductoCtr, 
    editarProductoCtr, 
    eliminarProductoCtr
}