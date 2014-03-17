/** @jsx React.DOM */
var React = require('react'),

  Footer,
  Item;

Footer = React.createClass({
  render: function () {
    var post = this.props.post;
    return <small>
        
        {post.points} points by {post.postedBy + ' ' + post.postedAgo} |{' '}
        <a href={'https://news.ycombinator.com/item?id=' + post.id} target="_blank">
          { post.commentCount } { post.commentCount === 1 ? ' comment' : ' comments' }
        </a>
      </small>;
  }
});

Item = React.createClass({
  render: function () {
    var post = this.props.post;
    return <li>
      <a href={post.url} target="_blank">{post.title}</a>
      <Footer post={post}/>
     </li>;
  }
});

module.exports = Item;
