const SimpleStorage = artifacts.require("./SimpleStorage.sol")
import expectThrow from './helpers/expectThrow';

contract('SimpleStorage', (accounts) => {
  let simpleStorage;

  beforeEach(async function () {
    simpleStorage = await SimpleStorage.new();
  })

  it("sets sender as owner", async () => {
    const owner = await simpleStorage.owner()

    assert.equal(owner, accounts[0])
  })

  describe("#setValue", () => {
    it("sets value", async () => {
      await simpleStorage.setValue(10)
      const value = await simpleStorage.value()

      assert.equal(parseInt(value), 10)
    })
  })
})