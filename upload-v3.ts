import { S3Storage } from "coze-coding-dev-sdk";
import { readFileSync } from "fs";

async function uploadCode() {
  const storage = new S3Storage({
    endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
    accessKey: "",
    secretKey: "",
    bucketName: process.env.COZE_BUCKET_NAME,
    region: "cn-beijing",
  });

  const fileContent = readFileSync("/workspace/rcstyle-club-v3.tar.gz");
  
  const key = await storage.uploadFile({
    fileContent,
    fileName: "rcstyle-club-v3.tar.gz",
    contentType: "application/gzip",
  });

  console.log("上传成功，文件key:", key);

  const downloadUrl = await storage.generatePresignedUrl({
    key,
    expireTime: 604800,
  });

  console.log("下载链接:", downloadUrl);
}

uploadCode().catch(console.error);
