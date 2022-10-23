const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')
const { struct } = require('pb-util')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../sample.proto'))
const SampleServiceDef = grpc.loadPackageDefinition(protoObject)

const client = new SampleServiceDef.SampleMessagingService('localhost:50051', grpc.credentials.createInsecure())

const payload = {
    email: 'joaopaulo11jp@gmail.com',
    parameters: struct.encode({
        name: 'John Paul',
        age: 25,
        isDev: true
    })
}

// Sending message
client.SendEmail(payload, (err, response) => {
  if (err) throw err
  console.log(response)
})


