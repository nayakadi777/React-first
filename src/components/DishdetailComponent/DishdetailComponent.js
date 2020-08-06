import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem ,Button , Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
  import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


  function RenderDish({dish}) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }
  function RenderComments({comments}) {
    return comments.map((comment, index) => (
      <div key={index}>
        <ul className="list-unstyled">
          <li>{comment.comment}</li>
          <li>
            {" "}
            {`-- ${comment.author} , ${new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}`}
          </li>
        </ul>
      </div>
    ));
  }

  const DishDetail = (props) => {
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
              <CommentForm addComment={props.addComment}
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
      this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
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
