import React , {Component}from 'react';
import Menu from '../MenuComponent/MenuComponent';
// import DishDetail from '../DishdetailComponent/DishdetailComponent';
import Header from '../HeaderComponent/HeaderComponent';
import Footer from '../FooterComponent/FooterComponent';
import Contact from '../ContactComponent/ContactComponent';
import Home from '../HomeComponent/HomeComponent';
import { DISHES } from '../../Shared/dishes';
import { COMMENTS } from '../../Shared/comments';
import { PROMOTIONS } from '../../Shared/promotions';
import { LEADERS } from '../../Shared/leaders';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
   constructor(props){
    super(props);
    this.state ={
      dishes:DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
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
          dish={this.state.dishes.filter(dish => dish.featured)[0]}
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
          promotion={this.state.promotions.filter(promo => promo.featured)[0]}
          />
      );
    }
  return (
    <div>
   <Header />
   <Switch>
     <Route path="/home" component={HomePage} />
     <Route path="/menu" component={()=> <Menu dishes={this.state.dishes} />} />
     <Route exact path='/contactus' component={Contact} />} />
       <Redirect to="/home" />
   </Switch>
   <Footer />
  </div>
  );
}

}

export default Main ;
