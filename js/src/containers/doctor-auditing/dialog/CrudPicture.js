/**
 * Created by jiangyukun on 2016/12/26.
 */
import React, {Component, PropTypes} from 'react'
import AddPicture from './AddPicture'

class CrudPicture extends Component {

  render() {
    if (this.props.url) {
      return (
        <div className="picture-container">
          <img src={this.props.url}/>
        </div>
      )
    }
    return <AddPicture onPictureUpdated={this.props.onPictureUpdated}/>
  }
}

CrudPicture.propTypes = {
  url: PropTypes.string
}

export default CrudPicture
