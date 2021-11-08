import "./Prime.css"

function Prime() {
  return (
    <div className="prime">
      <div className="prime__hero">
        <img className="prime__heroImage" src="https://images-na.ssl-images-amazon.com/images/G/01/marketing/prime/Acq/CrossSite/VXD-1193_non-prime_evergreen_echo_hero_1500x300_v5.jpg" alt="" />
      </div>
      <div className="prime__heroExtended">
        <div>
          Just ask, "Alexa, sign up for Prime" on your Echo, Echo Dot, Echo Show, or Amazon Tap. Get amazing delivery benefits and exclusive ways to shop, stream and more. Cancel anytime.
        </div>
      </div>
      <div className="prime__body">
        <img src="https://images-na.ssl-images-amazon.com/images/G/01/Product/BetterTogether/VXD-1193_non-prime_evergreen_echo_750x375_music._V504229728_.jpg" alt="" />
        <img src="https://images-na.ssl-images-amazon.com/images/G/01/Product/BetterTogether/VXD-1193_non-prime_evergreen_echo_750x375_shopping.jpg" alt="" />
        <img src="https://images-na.ssl-images-amazon.com/images/G/01/Product/BetterTogether/VXD-1193_non-prime_evergreen_echo_750x375_deals.jpg" alt="" />
      </div>
    </div>
  )
}

export default Prime
