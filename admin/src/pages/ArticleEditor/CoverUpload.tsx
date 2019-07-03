import React from "react";
import { useTranslation } from "react-i18next";
import { Icon, Upload, Modal } from "antd";
import { UploadFile } from "antd/es/upload/interface";

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const fileList: UploadFile[] = [
  {
    uid: "-1",
    name: "xxx.png",
    status: "done",
    size: 0,
    type: "jpg",
    url:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  }
];

const uploadButton = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

export const CoverUpload: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ paddingBottom: 20 }}>
      <h3>{t("articleCover")}</h3>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        // onPreview={this.handlePreview}
        // onChange={this.handleChange}
      >
        {fileList.length >= 3 ? null : uploadButton}
      </Upload>
      <Modal
        // visible={previewVisible}
        footer={null}
        // onCancel={this.handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};
