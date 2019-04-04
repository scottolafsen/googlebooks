import React, { Component } from "react";
// import Button from "../components/Button";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import { BookList, BookListItem } from "../components/BookItem";

class Books extends Component {
  state = {
    books: [],
    query: "",
    
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchBook(this.state.query)
      .then(res =>
        this.setState({ books: res.data.items, title: "", author: "", synopsis: "" }),
        console.log(this.state.books)
      )
      .catch(err => console.log(err));
  };

  handleSave = id => {
    const bookSave = this.state.books.filter(book => book.id === id);
    console.log("button works" + id)
    console.log();
    API.saveBook({
      title: bookSave[0].volumeInfo.title,
      src: bookSave[0].volumeInfo.imageLinks.thumbnail,
      authors: bookSave[0].volumeInfo.authors[0],
      description: bookSave[0].volumeInfo.description,
      href: bookSave[0].volumeInfo.infoLink,
      id: bookSave[0].id,
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Row>
            <Jumbotron>
              <h1>
                React Google Book Search!
              </h1>
            </Jumbotron>
          </Row>
          <Col size="md-12">
            <form>
              <Container>
                <Row>
                  <Col size="xs-9 sm-10">
                    <Input
                      value={this.state.query}
                      onChange={this.handleInputChange}
                      name="query"
                      placeholder="Book Title (required)"
                    />
                  </Col>
                  <Col size="xs-3 sm-2">
                    <FormBtn
                      onClick={this.handleFormSubmit}
                    >
                      Submit Book Search
              </FormBtn>
                  </Col>
                </Row>
              </Container>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
            { this.state.books === [] ? (
              <h1 className="text-center">No Books to Display</h1>
            ) : (
                <BookList>
                  {this.state.books.map(book => {
                    return (
                      <BookListItem
                        key={book.id}
                        title={book.volumeInfo.title}
                        authors={book.volumeInfo.authors}
                        href={book.volumeInfo.infoLink}
                        description={book.volumeInfo.description}
                        thumbnail={book.volumeInfo.imageLinks.thumbnail}
                        id={book.id}
                        handleSave={this.handleSave}
                      />
                    );
                  })}
                </BookList>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
