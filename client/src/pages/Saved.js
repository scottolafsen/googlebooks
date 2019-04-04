import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { SavedBookItem, SavedBook } from "../components/SavedBooks";
import API from "../utils/API";

class Saved extends Component {
  state = {
    savedBooks: []
  };
  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    API.getBooks()
      .then(res => this.setState({ savedBooks: res.data }),
      console.log(this.state.savedBooks)
      )
      .catch(err => console.log(err));
  }

  deleteBook = id => {
    console.log(id)
    API.deleteBook(id)
      .then(res =>  this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Saved Books
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
            <Col size="xs-12">
              {!this.state.savedBooks.length ? (
                <h1 className="text-center">No Books to Display</h1>
              ) : (
                <SavedBook>
                  {this.state.savedBooks.map(book => {
                    return (
                      <SavedBookItem
                        key={book._id}
                        title={book.title}
                        authors={book.authors}
                        href={book.href}
                        description={book.description}
                        thumbnail={book.src}
                        id ={book.id}
                        deleteBook={() => this.deleteBook(book._id)}
                       />
                    );
                  })}
                </SavedBook>
              )}
            </Col>
          </Row>
      </Container>
    );
  }
}

export default Saved;
