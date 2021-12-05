import S3 from "aws-sdk/clients/s3"
import fs from "fs"

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region: bucketRegion,
    accessKeyId: accessKey,
    secretAccessKey: secretKey
})

// upload to s3 bucket
export const uploadFile = (file: any) => {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

// download from s3 bucket
export const getFile = (fileKey: string) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}
