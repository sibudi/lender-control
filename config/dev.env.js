'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL:'"https://lender-uat.doitglotech.co.id/"',
  UPLOAD_IMAGE:'"https://lender-uat.doitglotech.co.id/api-upload/upload/image"',
  UPLOAD_FILE:'"https://lender-uat.doitglotech.co.id/api-upload/upload/file"',
  SHOW_IMAGE:'"https://lender-uat.doitglotech.co.id/api-upload/upload/showImage"',
  DOWNLOAD_ATTACHMENT :'"https://lender-uat.doitglotech.co.id/api-upload/upload/downloadAttachment"'
})
