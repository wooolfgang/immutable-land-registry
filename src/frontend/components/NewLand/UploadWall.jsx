import React from 'react';
import { observer } from 'mobx-react';
import { Upload, Icon, Modal } from 'antd';
import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'ljmhp1fy';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dj0r2ov4f/upload';

@observer
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  sendData = (e) => {
    this.handleChange(e);
    this.uploadToCloudinary(e);
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  uploadToCloudinary = async (data) => {
    this.props.onChange('ownerImg', data.file.name);
    const formData = new FormData();
    formData.append('file', data.file.originFileObj);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('public_id', data.file.name);

    await axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    });
  }

  render() {
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload </div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.sendData}
        >
          {this.state.fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
