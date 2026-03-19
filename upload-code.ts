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

  // 读取压缩包
  const fileContent = readFileSync("/workspace/rcstyle-club.tar.gz");
  
  // 上传文件
  const key = await storage.uploadFile({
    fileContent,
    fileName: "rcstyle-club.tar.gz",
    contentType: "application/gzip",
  });

  console.log("上传成功，文件key:", key);

  // 生成下载链接（有效期7天）
  const downloadUrl = await storage.generatePresignedUrl({
    key,
    expireTime: 604800, // 7天
  });

  console.log("下载链接:", downloadUrl);
}

uploadCode().catch(console.error);
