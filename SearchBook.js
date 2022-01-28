import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book';

class SearchBook extends Component
{
    constructor()
    {
        super();
        this.state={
            inputValue:"",
            booksSearch:[]
        }
        this.changeHandler=this.changeHandler.bind(this);
        
    }

  

    changeHandler=(e)=>{
     
        this.setState({inputValue:e.target.value});
        if(e.target.value !== "")
       { BooksAPI.search(e.target.value).then((data)=>{this.setState({booksSearch:data});console.log("searchbooks",this.state.booksSearch)})}
    }



    shelfName=(book)=>
       {
         if(book.shelf)
         {return book.shelf}

         else{
           return "none"
         }
       }


       
       bookThumbnail=(book)=>{
       
        if(book.imageLinks)
        {
          return book.imageLinks.thumbnail
        }
       }  
      
   
    render()
    {
      let correctBooks=[]
      if(this.state.booksSearch.length>0)
      { correctBooks= this.state.booksSearch.map((bs)=>{this.props.booksArray.map((ba)=>{if(bs.id===ba.id){bs.shelf=ba.shelf}return ba;});return bs})}

        return(

            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/"> <button className="close-search" >Close</button></Link>
                  <div className="search-books-input-wrapper">
                
                    <input type="text" placeholder="Search by title or author"  onChange={this.changeHandler}  />

                  </div>
              </div>
            
            <div className="search-books-results">
             
              <ol className="books-grid">
              
              {
                (this.state.inputValue !== "")?
                (correctBooks.map((book)=>(<li key={book.id}> <Book bookTitle={book.title} book={book} shelf={this.shelfName(book)}  bookAuther={book.authors} imgURL={this.bookThumbnail(book) }  moveTo={this.props.moveTo}/>
                    </li>)) ):(<li></li>)
                    
              }                            
                           
              </ol>

            </div>
          </div>

        )
    }
       
  }

export default SearchBook