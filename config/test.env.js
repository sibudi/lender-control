'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_URL:'"https://lender-uat.doitglotech.co.id/"',
  UPLOAD_IMAGE:'"https://lender-uat.doitglotech.co.id/api-upload/upload/image"',
  UPLOAD_FILE:'"https://lender-uat.doitglotech.co.id/api-upload/upload/file"',
  SHOW_IMAGE:'"https://lender-uat.doitglotech.co.id/api-upload/upload/showImage"',
  DOWNLOAD_ATTACHMENT :'"https://lender-uat.doitglotech.co.id/api-upload/upload/downloadAttachment"'
})
