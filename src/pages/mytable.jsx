import React from 'react';
import Table from "react-table-lite";

function UserData(props){
     let Users = [
      {
        id: 1,
        name: "John Doe",
        department: "Finance",        
        selected: true,
        email: "john_doe@somedomain.com",
      },
      {
        id: 2,
        name: "Kazuki Yashiro",
        department: "Finance",        
        email: "y_kazuki@somedomain.com"
      },
      {
        id: 3,
        name: "Eddie Memon",
        department: "Customer Support",        
        email: "eddie254@somedomain.com"
      },
      {
        id: 4,
        name: "Ashiq Nuri",
        department: "Human Resource",
        email: "an452@somedomain.com"
      }
    ];
      return(
        <Table
           data = {Users}		
           // Array of JSONObjects(required)
           headers = {["id","name","department","email"]}  
           // Headers should be same as data JSON Object's keys (required)
           sortBy = {["name", "department"]}
           // keys for sorting should be present in headers array
           customHeaders = {{"name":"employee"}}
           // custom header label in JSON        
           searchable = {true}
           // Enable table search field
           searchBy = {["name", "email"]}
           // keys for sorting should be present in headers array
           downloadable = {true}
           // Pass true to enable download button
           csvKeys = {["name","department","email"]} 
           // The CSV file will include these fields only
           downloadCsvButtonRef = {customDownloadButtonRef}
           // Here customDownloadButtonRef is a ref of custom button element
           searchFormRef = {customSearchFormRef}
           // Here customSearchFormRef is a ref of custom form element
           fileName = {"Table_Data"}
           // Default name of downloaded csv file
           noDataMessage = {"my custom no data"}
           // Custom no data string.            
           showActions = {true}
           // Enable Row Operation
           showPagination = {true}
           // Enable Pagination
           totalPages = {10} 
           // Total Pages of data
           currentPage = {1}
           // Current Page number
           showNumberofPages = {5}
           // Range for show page number 
           showPerPageLimitOptions = {true}
           // Show selection to change per page item limit
           currentPerPageLimit = {10}
           // Set current per page item limit
           actionTypes = {["edit","delete","view"]} 
           // Type of Row Operation (case insensitive)
           showMultiSelect = {true}
           // Enable Multi-select
           checkedKey = {"selected"}
           // Key present in data to mark row checked
           disableCheckedKey = {"selectDisabled"}
           // Key present in data to make row checkbox disabled
           perPageLimitOptions = {[10, 30, 50, 100]}
           // Array of numbers for options in per page limit selection
           containerStyle = {{}}
           // Customize table container style           
           tableStyle = {{}}
           // Customize table style
           headerStyle = {{}}
           // Customize table header style
           rowStyle = {{}}
           // Customize table row style
           cellStyle = {{}}
           // Customize table data cell style
           customRenderCell = {{
              name: (row) => (
                <a href={'/employee-profile/' + row.id} className='custom-class'> {row.name} </a>
              ),
              department: (row) => (
                <span className='custom-class'> {row.department} </span>
              )
           }}
           // Custom render function in JSON Object for table cells
           // it will render any custom element in place of default value of cell in column
           // in this case an <a> element will be rendered at each row in name column
           // and a <span> element will be rendered at each row in department column 
           customRenderActions = {{
              view: (row) => (
                <button onClick={event => customViewRow(event, row)}> view </button>
              ),
              edit: (row) => (
                <button onClick={event => customEditRow(event, row)}> Edit </button>
              ),
              delete: (row) => (
                <button onClick={event => customDeleteRow(event, row)}> Delete </button>
              ),
           }}
           // Custom render function in JSON Object for action buttons
           // it will render any custom element in place of view, edit and delete action button
           onSort = {(event, data, sortedBy, direction) => {
            console.log(event, data, sortedBy, direction);  
             // 'data' returns new sorted data
             // 'sortedBy' returns the sorting key
             // 'direction' is asc (ascending) or dsc (descending)
             // **if onSort prop is passed, sorting will not update the table view
           }}
           onRowSelect = {(args, event, row) => {
            console.log(event, row);
            // 'row' returns row object 
            // any arguments passed will be before 'event' and 'row'
           }}
           onAllRowSelect = {(args, event, allrows) => {
            console.log(event, allrows);
            // 'allrows' returns JSON objects of all rows of table
            // any arguments passed will be before 'event' and 'allrows'
           }}
           onRowDelete = {(args, event, row) => {
            console.log(event, row);
            // 'row' returns row object
            // any arguments passed will be before 'event' and 'row'
           }}
           onRowEdit = {(args, event, row) => {
            console.log(event, row);
            // 'row' returns row object
            // any arguments passed will be before 'event' and 'row'
           }}
           onRowView = {(args, event, row) => {
            console.log(event, row);
            // 'row' returns row object
            // any arguments passed will be before 'event' and 'row'
           }}
           onDownload = {(event) => {
            console.log(event);
             // Callback run after download csv button is clicked
           }}
           onPaginate = {(args, event, currentPage) => {
            console.log(event, currentPage);
            // 'currentPage' returns updated current page;
            // any arguments passed will be before 'event' and 'currentPage'
           }}
           onPerPageLimitSelect = {(args, event, limit) => {
            console.log(event, limit);
            // 'limit' returns the selected item limit from the menu;
            // any arguments passed will be before 'event' and 'limit'
           }}
        />
      );
  }