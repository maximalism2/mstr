import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cnames from 'classnames';

const notificationShowDuration = 10 * 1000;

class Notification extends Component {
  constructor() {
    super();

    this.timeoutToDelete = null;

    this.deleteNow = this.deleteNow.bind(this);
    this.deleteNotification = this.deleteNotification.bind(this);
  }

  deleteNotification() {
    let { deleteNotification, data } = this.props;
    console.log('deleted', data.id);
    deleteNotification(data.id);
    window.clearTimeout(this.timeoutToDelete);
  }

  deleteNow() {
    console.log('from now');
    window.clearTimeout(this.timeoutToDelete);
    this.deleteNotification();
  }


  componentDidMount() {
    this.intervalToDelete = setTimeout(() => {
      console.log('from timeout');
      this.deleteNotification();
      window.clearTimeout(this.timeoutToDelete);
    }, notificationShowDuration);
  }

  render() {
    let { data } = this.props;

    let notificationCName = cnames({
      "notification": true,
      [`is-${data.type}`]: data.type !== null
    });

    return (
      <div className={notificationCName}>
        <button
          className="delete"
          onClick={() => this.deleteNow()}
        ></button>
        <p>{data.message}</p>
      </div>
    );
  }
}

Notification.propTypes = {
  data: PropTypes.object.isRequired,
  deleteNotification: PropTypes.func.isRequired
}

class Notifications extends Component {
  renderNotifications() {
    let { notifications } = this.props;
    if (notifications.length) {
      return notifications.map((note, index) => {
        return (
          <Notification
            key={index}
            data={note}
            deleteNotification={this.props.deleteNotification}
          />
        );
      });
    } else {
      return <span></span>;
    }
  }

  render() {
    return (
      <div className="notification-box">
        {/*<ReactCSSTransitionGroup
          component="div"
          transitionName="notification"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >*/}
          {this.renderNotifications()}
        {/*</ReactCSSTransitionGroup>*/}
      </div>
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  deleteNotification: PropTypes.func.isRequired
}

export default Notifications;