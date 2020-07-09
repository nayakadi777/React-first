import React , {Component}from 'react';
import Menu from '../MenuComponent/MenuComponent';
// import DishDetail from '../DishdetailComponent/DishdetailComponent';
import Header from '../HeaderComponent/HeaderComponent';
import Footer from '../FooterComponent/FooterComponent';
import Home from '../HomeComponent/HomeComponent';
import { DISHES } from '../../Shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
   constructor(props){
    super(props);
    this.state ={
      dishes:DISHES,
      selectedDish:null
    }
   }

   onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }
  
   render (){
    const HomePage = () => {
      return(
          <Home 
          />
      );
    }
  return (
    <div>
   <Header />
   <Switch>
     <Route path="/home" component={HomePage} />
     <Route path="/menu" component={()=> <Menu dishes={this.state.dishes} />} />
       <Redirect to="/home" />
   </Switch>
   <Footer />
  </div>
  );
}

}

export default Main ;
