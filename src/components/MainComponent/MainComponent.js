import React , {Component}from 'react';
import Menu from '../MenuComponent/MenuComponent';
import DishDetail from '../DishdetailComponent/DishdetailComponent';
import Header from '../HeaderComponent/HeaderComponent';
import Footer from '../FooterComponent/FooterComponent';
import Contact from '../ContactComponent/ContactComponent';
import Home from '../HomeComponent/HomeComponent';
import About from '../AboutUsComponent/AboutUsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
   constructor(props){
    super(props);
    this.state ={
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
          dish={this.props.dishes.filter(dish => dish.featured)[0]}
          leader={this.props.leaders.filter(leader => leader.featured)[0]}
          promotion={this.props.promotions.filter(promo => promo.featured)[0]}
          />
      );
    }
    const AboutPage = () => {
      return(
          <About  
          leaders={this.props.leaders}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

  return (
    <div>
   <Header />
   <Switch>
     <Route path="/home" component={HomePage} />
     <Route  exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />} />
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

export default withRouter(connect(mapStateToProps) (Main)) ;
