export const initialStore=()=>{
  return{
    message: null,
    token: ""
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case "save_token":  //modifica la variable token que tengo declarada en el initialStore linea 4
      return {
        ...store,
        token: action.payload
      }
    default:
      throw Error('Unknown action.');
  }    
}
