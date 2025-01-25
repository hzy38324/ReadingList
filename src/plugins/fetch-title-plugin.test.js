import fetchTitlePlugin from './fetch-title-plugin'
import axios from 'axios'
import http from 'http'

describe('fetchTitlePlugin', () => {
  let server
  let port

  beforeAll((done) => {
    const plugin = fetchTitlePlugin()
    server = http.createServer((req, res) => {
      plugin.configureServer({
        middlewares: {
          use: (path, handler) => handler(req, res)
        }
      })
    })
    
    server.listen(0, () => {
      port = server.address().port
      done()
    })
  })

  afterAll(() => {
    server.close()
  })

  it('should fetch title from valid URL', async () => {
    const response = await axios.get(`http://localhost:${port}/api/fetch-title`, {
      params: {
        url: 'https://example.com'
      }
    })
    expect(response.data.title).toBe('Example Domain')
  })

  it('should handle invalid URL', async () => {
    try {
      await axios.get(`http://localhost:${port}/api/fetch-title`, {
        params: {
          url: 'invalid-url'
        }
      })
    } catch (error) {
      expect(error.response.status).toBe(400)
      expect(error.response.data.error).toBe('Invalid URL')
    }
  })
})