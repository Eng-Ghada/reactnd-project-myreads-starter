import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import BookShelf from './BookShelf'

import {BrowserRouter,Route,Link,Switch} from "react-router-dom";


class BooksApp extends React.Component {


  state={
            
    bookArray:[],
    shelf:"",
    currentReadingBooks:[],
    wantToReadBooks:[],
    readBooks:[]

}
reRender = () => {
  this.forceUpdate();
};


componentDidMount=()=> {
  BooksAPI.getAll().then((data) =>{this.setState({bookArray:data});console.log("Book Array =",this.state.bookArray)
  this.shelfBooks()
                        })}



shelfBooks=()=>{this.setState({currentReadingBooks:this.state.bookArray.filter(book=>book.shelf==="currentlyReading")})
                this.setState({wantToReadBooks:this.state.bookArray.filter(book=>book.shelf==="wantToRead")})
                this.setState({readBooks:this.state.bookArray.filter(book=>book.shelf==="read")})
              }


 moveBookTo=(book,shelfName)=>{
  BooksAPI.update(book.id,shelfName);
  
  let newBookArr=[];
  newBookArr=this.state.bookArray.filter((book1)=>(book1.id!== book.id))
    
     if (shelfName !== "none") 
      {
       book.shelf=shelfName; 
       newBookArr=newBookArr.concat(book);
       console.log("boooook",book, newBookArr)
       
      }
      else
      {
        book.shelf=shelfName;
      }
  this.setState({bookArray:newBookArr},()=>{this.shelfBooks()});
  
     }
     
      


  render() { 
    
  
    return (
      <BrowserRouter>

      <Switch>
         <Route exact path='/' render={(renderProps)=>
         <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfName={"Currently Reading"} shelfBooks={this.state.currentReadingBooks} moveTo={this.moveBookTo}/>
                <BookShelf shelfName={"Want To Read"} shelfBooks={this.state.wantToReadBooks} moveTo={this.moveBookTo}/>
                <BookShelf shelfName={"Read"} shelfBooks={this.state.readBooks} moveTo={this.moveBookTo}/>

              </div>
            </div>


            {/*search button */}
            <div className="open-search">
             <Link to="/search"> <button onClick={this.reRender}>Add a book</button></Link>
            </div>
          </div>
        
      </div>}/> 
        <Route path='/search' render={(renderProps)=><SearchBook booksArray={this.state.bookArray} moveTo={this.moveBookTo}/>}/>

      </Switch>

      
      </BrowserRouter>
    )
  }
}

export default BooksApp
