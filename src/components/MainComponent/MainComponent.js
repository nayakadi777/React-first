import React , {Component}from 'react';
import Menu from '../MenuComponent/MenuComponent';
import DishDetail from '../DishdetailComponent/DishdetailComponent';
import Header from '../HeaderComponent/HeaderComponent';
import Footer from '../FooterComponent/FooterComponent';
import Contact from '../ContactComponent/ContactComponent';
import Home from '../HomeComponent/HomeComponent';
import About from '../AboutUsComponent/AboutUsComponent';
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
    const AboutPage = () => {
      return(
          <About  
          leaders={this.state.leaders}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

  return (
    <div>
   <Header />
   <Switch>
     <Route path="/home" component={HomePage} />
     <Route  exact path="/menu" component={()=> <Menu dishes={this.state.dishes} />} />
     <Route  path='/menu/:dishId' component={DishWithId} />
     <Route exact path='/contactus' component={Contact} />
     <Route exact path='/aboutus' component={AboutPage} />
       <Redirect to="/home" />
   </Switch>
   <Footer />
  </div>
  );
}

}

export default Main ;
