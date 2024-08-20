const URL_BASE = 'http://localhost:5124'

export default {
  async getParkingItems() {
    return await this.get(`${URL_BASE}/parking`)
  },

  async sendVehicleEntry(body) {
    await this.post(`${URL_BASE}/parking/entry`, body)
  },

  async sendVehicleDeparture(body) {
    return await this.post(`${URL_BASE}/parking/departure`, body)
  },

  async getPricingItems() {
    return await this.get(`${URL_BASE}/pricing`)
  },

  async sendPricing(body) {
    return await this.post(`${URL_BASE}/pricing`, body)
  },

  async get(url) {
    const response = await fetch(url)
    return await response.json()
  },

  async post(url, body) {
    const header = new Headers()
    header.append('accept', 'application/json')
    header.append('content-type', 'application/json')

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ ...body }),
      headers: header
    }).then((payload) => {
      if (payload.status !== 200) {
        console.log(payload)
        throw new Error(payload.statusText)
      }
    })
  }
}
