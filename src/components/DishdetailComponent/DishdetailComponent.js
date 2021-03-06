import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem ,Button , Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
  import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from '../LoadingComponent/LoadingComponent';
import { baseUrl } from '../../Shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


  function RenderDish(props) {
  if (props.dish != null)
      return (
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <Card>
          <CardImg top src={baseUrl + props.dish.image} alt={props.dish.name} />
          <CardBody>
            <CardTitle>{props.dish.name}</CardTitle>
            <CardText>{props.dish.description}</CardText>
          </CardBody>
        </Card>
        </FadeTransform>
      );
    else return <div></div>;
  }
  function RenderComments({comments}) {
    return (
      <div >
          <ul className="list-unstyled">
          <Stagger in>
            {comments.map((comment, index) => {
              return (
              <Fade in>
                <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  {`-- ${comment.author} , ${new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}`}</p>
                </li>
                </Fade>   
                );
                  })}
            </Stagger>
            </ul>
      </div>
    )
  }

  const DishDetail = (props) => {
    console.log(props)
    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  } else
    if (props.dish != null)
      return (
        <div className="container">
              <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <h4>Comments</h4>
              <RenderComments comments ={props.comments} />
              <CommentForm postComment={props.postComment}
        dishId={props.dish.id}/>
            </div>
          </div>
        </div>
     
      );
    else return <div></div>;
  }

  const required = (val) => val && val.length;
  const maxLength= (len) => (val)=> !(val) || val.length <= len;
  const minLength = (len) => (val) => val && (val.length >= len);
  class CommentForm  extends Component {
    constructor(props){
      super(props);
      this.state ={
        isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(){
      this.setState({
          isModalOpen:!this.state.isModalOpen
      })
  }

    handleSubmit(values) {
      this.toggleModal();
      this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
      console.log('Current State is: ' + JSON.stringify(values));
     // alert('Current State is: ' + JSON.stringify(values));
  }
  render(){
    return(
      <div className="col-12 col-md-9">
         <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil "></span>
           Submit Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                 <ModalHeader  toggle={this.toggleModal}>
                 Submit Comment
                 </ModalHeader>
                 <ModalBody>
                 <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                             <Row className="form-group">
                             <Col md={12}>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" name="rating"
                                        className="form-control"
                                        validators={{
                                          required
                                        }}>
                                      <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    </Col>
                            </Row>
                            <Row className="form-group">
                            <Col md={12}>
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".name" id="name" name="name"
                              placeholder="Your Name"
                                  className="form-control" 
                                  validators={{
                                      minLength: minLength(3),maxLength: maxLength(15),required
                                  }}/>
                                  <Errors 
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                      minLength: 'Must be greater than 2 characters',
                                      maxLength: 'Must be 15 characters or less'
                                    }}
                                  />
                                  </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" 
                                        validators={{
                                          required
                                        }}/>
                                </Col>
                                </Row>
                                <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                       Submit
                                    </Button>
                                </Col>    
                            </Row>
                        </LocalForm>
                 </ModalBody>
             </Modal>
      </div>
    );
  }
  }

export default DishDetail;
