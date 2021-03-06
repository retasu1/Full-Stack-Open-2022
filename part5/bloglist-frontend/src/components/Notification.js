const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const style = {
    color: notification.type === 'alert' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style} className={notification.type === 'alert' ? 'error' : ''}>
      {notification.message}
    </div>
  )
}

Notification.displayName = 'Notification'

export default Notification