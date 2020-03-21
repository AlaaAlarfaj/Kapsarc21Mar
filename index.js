import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

import React, { useState, useEffect } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'




class App extends Component {
  constructor() {
    super();
    this.state = {
      //Table
      columnDefs: [
        { headerName: "Date", field: "Date",sortable: true, filter: true,checkboxSelection: true},
        { headerName: "Crude Oil - WTI Cushing Oklahoma", field: "Price1",sortable: true, filter: true },
        { headerName: "Crude Oil - Brent Europe", field: "Price2",sortable: true, filter: true },
        { headerName: "Conventional Gasoline - NewYork Harbor", field: "Price3",sortable: true, filter: true },
        { headerName: "Conventional Gasoline - U.S. Gulf Coast", field: "Price4",sortable: true, filter: true },
        { headerName: "RBOB Regular Gasoline - Los Angeles", field: "Price5",sortable: true, filter: true },
        { headerName: "No.2 Heating Oil - NewYork Harbor", field: "Price6",sortable: true, filter: true },
        { headerName: "Ultra_Low_Sulfur No. 2 Diesel Fuel - NY Harbor", field: "Price7",sortable: true, filter: true },
        { headerName: "Ultra_Low_Sulfur No. 2 Diesel Fuel - U.S. Gulf Coast", field: "Price8",sortable: true, filter: true },
        { headerName: "Ultra_Low_Sulfur No. 2 Diesel Fuel - Los Angeles", field: "Price9",sortable: true, filter: true },
        { headerName: "Kerosene-Type Jet Fuel - U.S. Gulf Coast", field: "Price10",sortable: true, filter: true },
        { headerName: "Propane - Mont Belvieu, Texas", field: "Price11",sortable: true, filter: true },
        ],

     
    };
    


const App = () => {
  const [options, setOptions] = useState({
    chart: {
        height: 1000,
        
    },
    title: {
      text: "Chart"
    },
    yAxis: {
        tickInterval: 5
    },
    xAxis: {
      type: 'datetime',
      labels: {
            format: '{value:%Y}'
        }
    },
    series: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  });

useEffect(() => {
    fetch("https://api.myjson.com/bins/17c23o")
      .then(response => {
        return response.json();
      })
      .then(data => {
        const series = [
          {
            name: "Crude Oil - WTI Cushing Oklahoma",
            data: []
          },
          {
            name: "Crude Oil - Brent Europe",
            data: []
          },
          {
            name: "ConventionalGasoline - New York Harbor",
            data: []
          },
          {
            name: "Conventional Gasoline - U.S. Gulf Coast",
            data: []
          },
          {
            name: "RBOB Regular Gasoline - Los Angeles",
            data: []
          },
          {
            name: "No.2 Heating Oil - NewYork Harbor",
            data: []
          },
          {
            name: "Ultra_Low_Sulfur No. 2 Diesel Fuel - NY Harbor",
            data: []
          },
          {
            name: "Ultra_Low_Sulfur No. 2 Diesel Fuel - U.S. Gulf Coast",
            data: []
          },
          {
            name: "Ultra_Low_Sulfur No. 2 Diesel Fuel - Los Angeles",
            data: []
          },
          {
            name: "Kerosene-Type Jet Fuel - U.S. Gulf Coast",
            data: []
          },
          {
            name: "Propane - Mont Belvieu, Texas",
            data: []
          },
        ];
        let date;

        data.forEach(function(el) {
          date = new Date(el.Date).getTime();

          series[0].data.push([date, el.Price1]);
          series[1].data.push([date, el.Price2]);
          series[2].data.push([date, el.Price3]);
          series[3].data.push([date, el.Price4]);
          series[4].data.push([date, el.Price5]);
          series[5].data.push([date, el.Price6]);
          series[6].data.push([date, el.Price7]);
          series[7].data.push([date, el.Price8]);
          series[8].data.push([date, el.Price9]);
          series[9].data.push([date, el.Price10]);
          series[10].data.push([date, el.Price11]);
        });
        setOptions({ series: series });
      });
  }, []);

              
return <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
       </div>
       
};
render(<App />, document.getElementById('chart'))

            
  
};


  

  //Table
  componentDidMount() {
   fetch('https://api.myjson.com/bins/17c23o')
   .then(result => result.json())
   .then(rowData => this.setState({rowData}))
   .catch(err => console.log(err));

   
 }



 

 //delete from Table
onButtonClick = e => {
        
        var selectedData = this.gridApi.getSelectedRows();
        var res = this.gridApi.updateRowData({ remove: selectedData });
    };





  render() {
    return (



      <div>
        
            <div className="ag-theme-balham" style={ {height: '1000px'} }>
              <button onClick={this.onButtonClick}>Delete</button>
              <br/><br/>  
              <AgGridReact
                  onGridReady={ params => this.gridApi = params.api }
                  rowSelection="multiple"
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  defaultColDef={{
                    editable: true
                  }}
                  >
              </AgGridReact>
              {"\n"}
              {"\n"}
               </div>
              
            
          
           
      </div>

      );
  }
}

render(<App />, document.getElementById('root'));



//History
class App extends Component {
  constructor() {
    super();
    this.state = {
      //Table
      columnDefs: [
        { headerName: "Date", field: "Date",sortable: true, filter: true},
        { headerName: "Crude Oil - WTI Cushing Oklahoma", field: "Price1",sortable: true, filter: true }
       
        ],

     
    };
    

  }
  //Table
  componentDidMount() {
   fetch('https://api.myjson.com/bins/bmd0s')
   .then(result => result.json())
   .then(rowData => this.setState({rowData}))
   .catch(err => console.log(err));

   
 }
render() {
    return (



      <div>
        
            <div className="ag-theme-balham" style={ {height: '400px', width:'400px'} }>
              
              <AgGridReact
                  onGridReady={ params => this.gridApi = params.api }
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  defaultColDef={{
                    editable: true
                  }}
                  >
              </AgGridReact>
              {"\n"}
              {"\n"}
               </div>
              
            
          
           
      </div>

      );
  }
}

render(<App />, document.getElementById('history'));

