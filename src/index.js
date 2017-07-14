import React from 'react';
import ReactDOM from 'react-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import $ from 'jquery';

var UserList = React.createClass({
  getInitialState: function() {
    return {
    username: [],
    source: '',
    key: 1,
    all: [],
    open: [],
    merged: [],
    pull: []
  };
  },

  handleChange: function(e) {
    var check = e.target.value;
    var link = check.split(',');
    this.setState({source:"https://api.github.com/search/repositories?q="+link[0]+"&sort="+link[1]+"&order="+link[2] });
    console.log(this.state.source);
  },

  handleClick: function() {

    $.get(this.state.source,function(result) {
      var search = result;

      if (this.isMounted()) {
        this.setState({
          username: assign
        });
      }
    }.bind(this));
  },




showPullRequest: function(i) {
  console.log(i);
  $.get(i,function(result) {
    var request= result;
    console.log(request);

    if (this.isMounted()) {
      this.setState({
        pull: request
      });
    }this.pullRequests();
  }.bind(this));
},

pullRequests: function() {
  var opened = [];
  var closed = [];
  var every  = [];

  console.log(this.state.pull);
  this.state.pull.map(function(user,i) {
    every.push(user.url);
    if(user.state == "open") {
      opened.push(user.url);
    } else {
      closed.push(user.url);
    }
  })

  if(closed.length === 0 ){
    closed.push("No closed pull requests")
  }

  if(opened.length === 0) {
    opened.push("No open pull requests")
  }

  if(every.length === 0){
    every.push("No pull requests")
  }

  this.setState({
      all: every,
      open:opened,
      merged:closed
    });
},

render: function() {
    return (
    <div>
      <Tabs id="Tab1" forceRenderTabPanel={true} ref="sm" >
        <TabList>
          <Tab> Repositories </Tab>
          <Tab>Pull Request</Tab>
        </TabList>
        <TabPanel>
          <div>
              <input type="text"  onChange={this.handleChange} />
              <input type="button" value="search" onClick={this.handleClick} />
                <table >
                <tbody>
                <tr>
                  <th>Name</th>
                  <th>Owner</th>
                  <th>No.of Stars</th>
                  <th>No.of forks</th>
                  <th>Pull Request</th>
                </tr>
                { this.state.username.map( ( item, index ) => (

                  <tr key={index}>
                    <td>
                      <a href={item.html_url} target="_blank">{ item.name }</a>
                    </td>
                    <td>
                      { item.owner.login }
                    </td>
                    <td>
                      { item.stargazers_count }
                    </td>
                    <td>
                      { item.forks }
                    </td>
                    <td>
                      <button  onClick={this.showPullRequest.bind(null,item.pulls_url.slice(0, item.pulls_url.indexOf('{/')) )}>Show</button>

                    </td>
                  </tr>
                ))}
                </tbody>
              </table>

          </div>
        </TabPanel>
        <TabPanel>
          <Tabs>
            <TabList>
              <Tab id="all" >All</Tab>
              <Tab id="open" >Open</Tab>
              <Tab id="merged">Merged</Tab>
            </TabList>
            <TabPanel>
              <ol>
              { this.state.all.map( ( item, index ) => (
                <li key={index}><a href={item} target="_blank" >{item}</a></li>
                ))}
              </ol>
            </TabPanel>
            <TabPanel>
               <ol>
              { this.state.open.map( ( item, index ) => (
                <li key={index}><a href={item} target="_blank" >{item}</a></li>
                ))}
              </ol>
            </TabPanel>
            <TabPanel>
               <ol>
              { this.state.merged.map( ( item, index ) => (
                <a href={item} key={index} target="_blank">{item}</a>
                ))}
              </ol>
            </TabPanel>
          </Tabs>

        </TabPanel>
      </Tabs>



    </div>
  );
}
});




export default UserList;
ReactDOM.render(
<UserList />,
  document.getElementById('root')
);
