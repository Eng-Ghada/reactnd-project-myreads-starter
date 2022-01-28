import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types';


class BookShelf extends Component
{   
    
     myPropTypes = {
        shelfName: PropTypes.string.isRequired,
        shelfBooks: PropTypes.array.isRequired,
        moveTo:PropTypes.func.isRequired
        
      }

 
    bookThumbnail=(book)=>{
       
        if(book.imageLinks)
        {
          return book.imageLinks.thumbnail
        }
       }  



    render()
    {
      return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2> 
                 <div className="bookshelf-books">
                     <ol className="books-grid">
                        { this.props.shelfBooks.map(book=> 
                                 <li key={book.id}> <Book bookId={book.id} book={book} bookTitle={book.title} bookAuther={book.authors} imgURL={this.bookThumbnail(book)} shelf={book.shelf} moveTo={this.props.moveTo} />
                                        </li>) } 
                    </ol> 
                               
                </div>
            </div>
        )
    }
}

export default BookShelf