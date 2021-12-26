"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = exports.uploadFile = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const fs_1 = __importDefault(require("fs"));
const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;
const s3 = new s3_1.default({
    region: bucketRegion,
    accessKeyId: accessKey,
    secretAccessKey: secretKey
});
// upload to s3 bucket
const uploadFile = (file) => {
    const fileStream = fs_1.default.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    };
    return s3.upload(uploadParams).promise();
};
exports.uploadFile = uploadFile;
// download from s3 bucket
const getFile = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    };
    return s3.getObject(downloadParams).createReadStream();
};
exports.getFile = getFile;
