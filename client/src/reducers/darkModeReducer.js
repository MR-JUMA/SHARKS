
 const initialState = { 
   darkMode: false,
   alerts: null
   };
 /* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
 switch (action.type) {
    case "LIGHT": 
      return {
        ...state ,  
        darkMode : false 
      };
    
    case "DARK": 
      return {
        ...state ,  
        darkMode : true 
      };
    
    case "TOGGLE": 
      return {
        ...state ,  
        darkMode : !state.darkMode 
      };
    
    case "SET_ALERT": 
      return {
        ...state ,  
        alerts : action.payload 
      };
    
    case "CLEAR_ALERTS": 
      return {
        ...state ,  
        alerts : null 
      };
    
    default:
      return {
        ...state
      }
  }
};