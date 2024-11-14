import Event from "./page"

describe("<Event />", () => {
  it("should render and display expected content", () => {
    cy.mount(<Event />)

    cy.get("h2").contains("EXPLORE INTEREST EVENTS")
  })
})
