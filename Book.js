import React from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'



class Book extends React.Component
{    
    myPropTypes = {
        bookTitle: PropTypes.string,
        bookAuther: PropTypes.string,
        
      }


    state={
        shelfValue:this.props.shelf
        }

    
     componentWillReceiveProps(nextProps) {
       if (nextProps.shelf !== this.state.shelfValue) {
            this.setState({ shelfValue: nextProps.shelf });
            }
        }
 
    handleChange=(e)=>{
        BooksAPI.update(this.props.book,e.target.value);
        this.props.moveTo(this.props.book,e.target.value)
        this.setState({shelfValue:e.target.value});

      

    }

    
    render(){
    return(
   
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.imgURL}")`  }}></div>
            <div className="book-shelf-changer">
                
            <select value={this.state.shelfValue}  onChange={this.handleChange}  >
                
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead" >Want to Read</option>
                <option value="read" >Read</option>
                <option value="none">None</option>
            </select>
            
            </div>
            </div>
            <div className="book-title">{this.props.bookTitle}</div>
            <div className="book-authors">{this.props.bookAuther}</div>
            
        </div>
    )}
}

export default Book