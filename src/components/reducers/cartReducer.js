import Item1 from '../../images/1.jfif'
import Item2 from '../../images/2.jfif'
import Item3 from '../../images/3.jfif'
import Item4 from '../../images/4.jfif'
import Item5 from '../../images/5.jfif'
import Item6 from '../../images/6.jfif'
import Item7 from '../../images/7.jfif'
import Item8 from '../../images/8.jfif'
import Item9 from '../../images/9.jfif'
import Item10 from '../../images/10.jfif'
import Item11 from '../../images/11.jfif'
import Item12 from '../../images/12.jfif'
import Item13 from '../../images/13.jfif'
import Item14 from '../../images/14.jfif'
import Item15 from '../../images/15.jfif'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Margherita', desc: "Herbed Onion & green capsicum, sweet corn, tomato & mushroom", price:110,img:Item1},
        {id:2,title:'Chicken Krispy Burger', desc: "Delicious chicken value burgers", price:80,img: Item2},
        {id:3,title:'Chicken Crispy', desc: "Non Veg Combos includes one signature wrap along with Choice of Cookie ",price:120,img: Item3},
        {id:4,title:'Hamburger', desc: "Very Delicious", price:260,img:Item4},
        {id:5,title:'Cheesburger', desc: "Delicious and tasty", price:160,img: Item5},
        {id:6,title:'Sliders', desc: "You'll love it",price:90,img: Item6},
        {id:7,title:'Sandwich', desc: "Taste it once",price:100,img: Item7},
        {id:8,title:'Limeade', desc: "Sweet & Salty",price:300,img: Item8},
        {id:9,title:'Frosty', desc: "Wanna have some?",price:600,img: Item9},
        {id:10,title:'Spice Latte', desc: "Very Very Delicious",price:700,img: Item10},
        {id:11,title:'Doughnuts', desc: "Awesome one",price:800,img: Item11},
        {id:12,title:'Fries', desc: "Best in the market",price:450,img: Item12},
        {id:13,title:'Whataburger', desc: "Awesome one",price:550,img: Item13},
        {id:14,title:'Pepperoni', desc: "Take it once",price:350,img: Item14},
        {id:15,title:'Panera Mac', desc: "Very Delicious",price:400,img: Item15}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 50
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 50
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer