import store from '@/store'

export default class RequestResponse {
    constructor (command, path, headers, body, code, expectedFile) {
        this.command = command || 'GET'
        this.path = path || './'
        this.headers = headers || []
        this.body = body || ''
        this.id = Date.now()
        this.files = []

        // Response data
        this.code = code || '200 OK'
        this.expectedFile = expectedFile || this.path.match(/[^/]*$/)[0]
        // this.expectedResponse = new Response(code || 200, this.expectedFile)

        // -1: not validated, 0: fail, 1: success
        this.validated = -1
    }

    validate () {
        let output = false

        // Handle GET validation
        if (this.command === 'GET') {
            // if the file exists...
            if (store.state.files.find(file => `/${file}` === this.path)) {
                // ... we should have requested files attached
                output = `/${this.files[0]}` === this.path
            } else {
                // otherwise, there should be a 404
                output = this.code.includes('404')
            }
        }

        this.validated = output ? 1 : 0
        return output
    }
}
