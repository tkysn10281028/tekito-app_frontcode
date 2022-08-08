<template>
  <div id="upload-file-view">
    <div class="drop-area-group">
      <h1>簡易なアップロード機能を作ってみた</h1>
    </div>
    <div class="drop-area-group">
      <div
        class="drop-area"
        @dragover.prevent="dragOver"
        @dragenter="isEnter = true"
        :class="{ enter: isEnter }"
        @dragleave="isEnter = false"
        @drop.prevent="dropFile"
      >
        <label>
          <input type="file" title @change="onChange" />
          <p>ドラッグアンドドロップ<br />もしくはクリック</p>
        </label>
      </div>
    </div>
    <ul id="file-list-area">
      <li v-for="item in fileList" :key="item.fileInfoId">
        <p @click="download(item)">{{ item.fileName }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import constFunc from "../constFunc.js";
export default {
  data() {
    return {
      isEnter: false,
      image: "",
      fileName: "",
      base64Data: "",
      mimeTypeString: "",
      fileList: [],
    };
  },
  created: function () {
    constFunc.WhoAmI();
    this.achieveFileInfo();
  },
  methods: {
    readFile(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const res = reader.result.split(",");
        this.base64Data = res[1];
        this.mimeTypeString = res[0]
          .replace("data:", "")
          .replace(";base64", "");
        this.send();
      };
      reader.onerror = () => {
        return;
      };
    },
    dragOver() {},
    dropFile(event) {
      this.isEnter = false;
      const files = event.dataTransfer.files;
      if (files.length !== 1) {
        return;
      }
      console.log(files[0].size);
      this.fileName = files[0].name;
      this.readFile(files[0]);
    },
    send() {
      const url = location.origin + "/api/v1/postFile";
      if (
        this.fileName == null ||
        this.base64Data == null ||
        this.mimeTypeString == null
      ) {
        return;
      }
      const params = new URLSearchParams();
      params.append("fileName", this.fileName);
      params.append("base64Data", this.base64Data);
      params.append("mimeTypeString", this.mimeTypeString);
      params.append("userId", "001");
      params.append("postedDate", new Date().toLocaleDateString());
      this.axios
        .post(url, params, this.serverPass + "login")
        .then((response) => {
          console.log(response);
          this.achieveFileInfo();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onChange(event) {
      const files = event.target.files;
      if (
        files.length !== 1 ||
        files[0].size >= 10000000 ||
        files[0].type.indexOf("image") >= 0
      ) {
        window.alert(
          "投稿失敗しました。ファイルが指定の条件を満たしていません。"
        );
        return;
      }
      this.fileName = files[0].name;
      this.readFile(files[0]);
    },
    achieveFileInfo() {
      const url = location.origin + "/api/v1/getFileInfoByUserId";
      const params = new URLSearchParams();
      params.append("userId", "001");
      params.append("date", new Date().toLocaleDateString());
      this.axios
        .post(url, params, this.serverPass + "login")
        .then((response) => {
          console.log(response);
          this.fileList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    download(item) {
      console.log(item);
      const fileName = item.fileName;
      const fileContent = atob(item.fileContent);
      const mimeType = item.mimeType;
      var blob = new Blob([fileContent], { type: mimeType });
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, fileName);
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        const link = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = fileName;
        link.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 300);
      }
    },
  },
};
</script>
<style>
.drop-area-group {
  display: flex;
  justify-content: center;
  align-items: center;
}
.drop-area {
  color: gray;
  font-weight: bold;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  border: 5px dotted springgreen;
  border-radius: 15px;
}
.enter {
  border: 5px solid springgreen;
}
input[type="file"] {
  display: none;
}
</style>