const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')
const { struct } = require('pb-util')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../sample.proto'))
const SampleServiceDef = grpc.loadPackageDefinition(protoObject)

function SendEmail (messagePayload, callback) {
  const { request } = messagePayload;

  console.log('Received Message Payload', {
    ...request,
    parameters: struct.decode(request.parameters)
  })

  return callback(null, {})
}

const server = new grpc.Server()
server.addService(SampleServiceDef.SampleMessagingService.service, { SendEmail })

server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
server.start()
console.log('Listening')