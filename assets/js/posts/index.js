/** @jsx React.DOM */
var React = require('react'),
  $     = require('jquery'),

  Item  = require('./item'),

  List;



// var backup = window.location + 'backup-data.json';
// console.log(backup);

List = React.createClass({
  getInitialState: function () {
    return { posts: [] };
  },
  componentWillMount: function () {
      this.fetchLatestNews();
  },
  // componentWillMount: function() {
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     success: function(data) {
  //     this.setState({data: data});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //     console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  fetchLatestNews: function () {
    $.ajax({
      url:       'http://api.ihackernews.com/page',
      dataType:  'jsonp',
      data:      { format: 'jsonp' },

      success: function (result) {
        this.setState({ posts: result.items });
      }.bind(this),

      error: function () {
        console.log('nope');
        this.fetchbackupData();
      }.bind(this)
    });
  },

  fetchbackupData: function() {
    $.ajax({
      url:       'backup-data.json',
      dataType:  'json',
      data:      { format: 'json' },

      success: function (result) {
        this.setState({ posts: result.items });
      }.bind(this),
      
      error: function () {
        console.log('no backup data found');
      }.bind(this)
    });
  },

  render: function () {
    return <ol className="posts">
      {this.state.posts.map(function (post) {
        return <Item key={post.id} post={post}/>
      })}
    </ol>;
  }
});

module.exports = List;
