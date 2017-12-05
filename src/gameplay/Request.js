import store from '@/store'
import bodyPool from '@/gameplay/bodyPool'

export default class RequestResponse {
    constructor (command, path, headers, body, code, expectedFile) {
        let newCommand = command || ['GET', 'POST']
        if (Array.isArray(newCommand)) {
            newCommand = this.randomFromArray(newCommand)
        }

        this.command = newCommand
        this.path = path || this.generateRandomPath()
        this.headers = headers || this.generateHeaders()
        this.body = body || this.generateBody()
        this.id = Date.now()
        this.files = []

        // Response data
        this.code = code || '200 OK'
        this.expectedFile = expectedFile || this.path.match(/[^/]*$/)[0]
        this.responseBody = []
        // this.expectedResponse = new Response(code || 200, this.expectedFile)

        // -1: not validated, 0: fail, 1: success
        this.validated = -1

        // Reason for validation failure
        this.failureReason = ''
    }

    validate () {
        let output = false

        const fileInStore = store.state.files.find(file => `/${file}` === this.path || this.path === `/${file.name}`)
        const is404 = !fileInStore
        const authHeader = this.headers.find(x => x.label === 'Authorization')
        const is403 = !is404 && fileInStore.hasOwnProperty('auth') && ((authHeader && authHeader.value !== fileInStore.auth) || !authHeader)

        if (is404) {
            output = this.code.includes('404')
            this.failureReason = `<code>${this.path}</code> doesn't exist - should be 404 Not Found.`
        } else if (is403) {
            output = this.code.includes('403')
            this.failureReason = `No or incorrect authorization - should be 403 Forbidden.`
        } else if (this.command === 'GET') {
            const filePath = typeof this.files[0] === 'string' ? this.files[0] : this.files[0].name
            // GET: we should have requested files attached
            output = `/${filePath}` === this.path
            this.failureReason = this.files.length
                ? `<code>${filePath}</code> does not match requested file <code>${this.path}</code>.`
                : `<code>${this.path}</code> requested, but no files attached.`
        } else if (this.command === 'POST') {
            // Handle POST validation
            output = this.responseBody.find(x => x.includes(`Data posted to <code>${this.path}</code>.`))
            this.failureReason = `Data not posted to <code>${this.path}</code>.`
        }

        this.validated = output ? 1 : 0
        return output
    }

    generateRandomPath () {
        // Weighted coin flip - will we be an existing file?
        let existing = true
        if (Math.random() < 0.3) {
            existing = false
        }

        // Pick a random value from our current files
        let output = this.randomFromArray(store.state.files)
        if (typeof output !== 'string') {
            output = output.name
        }
        if (!existing) {
            output = this.shuffleChars(output)
        }

        return '/' + output
    }

    generateHeaders () {
        let output = []

        const fileInStore = store.state.files.find(file => `/${file}` === this.path || this.path === `/${file.name}`)

        // if file has authorization requirements...
        if (fileInStore && fileInStore.auth) {
            // coin flip to generate permissions
            if (Math.random() < 0.75) {
                output.push({
                    label: 'Authorization',
                    value: Math.random() < 0.3 ? this.shuffleChars(fileInStore.auth) : fileInStore.auth
                })
            }
        }

        return output
    }

    generateBody () {
        let output = ''
        if (Math.random() > 0.7) {
            output = this.randomFromArray(bodyPool)
        }

        return output
    }

    randomFromArray (arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    shuffleChars (output) {
        const chars = output.split('')
        const index1 = Math.floor(Math.random() * chars.length)
        const index2 = Math.floor(Math.random() * chars.length)
        let holder = chars[index1]
        chars[index1] = chars[index2]
        chars[index2] = holder
        return chars.join('')
    }
}
