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
    }

    validate () {
        // Handle GET validation
        if (this.command === 'GET') {
            // should have requested files attached
            return `/${this.files[0]}` === this.path
        }

        return false
    }
}
