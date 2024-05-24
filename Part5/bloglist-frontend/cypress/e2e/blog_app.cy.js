describe("Blog app", () => {
  // We create a hook to login before each test
  beforeEach(function() {
    cy.visit("http://localhost:5173");
  });

  it("frontpage can be opened", function() {
    cy.contains("login");
    cy.contains("username");
    cy.contains("password");
    cy.contains("Blog App");
  });

  it("login form can be opened", function() {
    cy.get("input:first").type("Mika54");
    cy.get("input:last").type("test2test2");
    cy.contains("login").click();

    // If we have multiple forms we need to add id to them
    //
    cy.contains("Mika54 logged in");
    cy.contains("logout");
    cy.contains("Create new blog");
  });

  describe("When logged in", function() {
    beforeEach(function() {
      cy.get("input:first").type("Mika54");
      cy.get("input:last").type("test2test2");
      cy.contains("login").click();
    });

    it("a new blog can be created", function() {
      cy.contains("Create new blog").click();
      cy.get("input:first").type("BlogTest");
      cy.get("input:last").type("http://testBlog.com");
      //cy.contains("create").click();
      cy.contains("BlogTest");
    });

    it("a blog can be viewed", function() {
      cy.contains("View").click();
      cy.contains("added by Mika54");
      cy.contains("like").click();
      cy.contains("delete").click();
    });
  });

  describe("Fails login", function() {
    it("fails with wrong username", function() {
      cy.get("input:first").type("Mika64");
      cy.get("input:last").type("test2test2");
      cy.contains("login").click();
      cy.contains("Wrong");
    });
    it("fails with wrong password", function() {
      cy.get("input:first").type("Mika54");
      cy.get("input:last").type("test2est2");
      cy.contains("login").click();
      cy.contains("Wrong");
    });
  });
  // Only login once and stay logged in for the rest of the tests -> recommended by Cypress docs
  describe("When logged in 2", function() {
    beforeEach(function() {
      // We use cy.request to login, create a new blog, delete and all the REST API calls
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "Mika54",
        password: "test2test2",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("http://localhost:5173");
      });
    });

    it("a new blog can be created", function() {
      cy.contains("Create new blog").click();
      cy.contains("BlogTest");
    });
  });
});
